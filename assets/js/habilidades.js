// Remova o array estático sobreSkill se ainda existir no seu arquivo
// const sobreSkill = [ ... ]; // <-- Remova esta linha

// Seleciona o container direto das skill-boxs usando o ID da seção e a classe do container
const skillsContainer = document.querySelector('#habilidades .container-skills');
// Seleciona o parágrafo onde a descrição da habilidade será exibida
const descricao = document.querySelector('.texto-descricao');

let hardskillsData = []; // Variável para armazenar as hard skills do backend

// Funções de tratamento de evento separadas para facilitar remoção/adição e manter o código limpo
function handleMouseOver() {
    if (this.dataset.description) {
        descricao.innerHTML = this.dataset.description;
    } else {
        descricao.innerHTML = '<p>Passe o mouse por cima de alguma habilidade para ler a descrição.</p>';
    }
}

function handleMouseOut() {
    descricao.innerHTML = ' < Passe o mouse por cima de alguma habilidade para ler a descrição />';
}

// Função para buscar as hard skills do backend
async function fetchHardskills() {
    try {
        const response = await fetch('http://localhost:3000/hardskills');
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        hardskillsData = await response.json();
        console.log('Hard skills carregadas:', hardskillsData);

        populateHardskills(); // Chama a função para popular as habilidades
    } catch (error) {
        console.error('Erro ao buscar hard skills:', error);
        descricao.innerHTML = '<p>Erro ao carregar habilidades. Tente novamente mais tarde.</p>';
    }
}

// Função para popular as habilidades nos elementos HTML existentes e adicionar listeners
function populateHardskills() {
    if (!skillsContainer) {
        console.error("Contêiner de habilidades não encontrado. Verifique o seletor '#habilidades .container-skills'");
        return;
    }

    const existingSkillBoxes = skillsContainer.querySelectorAll('.skill-box');

    existingSkillBoxes.forEach(skillBox => {
        // Encontra a classe específica da skill que NÃO seja 'skill-box'
        // Iteramos sobre as classes e procuramos a que *começa* com 'skill-' mas não é EXATAMENTE 'skill-box'
        let specificSkillClass = null;
        for (const cls of skillBox.classList) {
            if (cls.startsWith('skill-') && cls !== 'skill-box') {
                specificSkillClass = cls;
                break; // Encontrou a específica, pode parar
            }
        }

        // Se o loop acima não encontrou uma classe específica, mas a skill-box tem 'skill-box'
        // e essa é a única classe relevante (ex: <div class="skill-box">)
        // Isso não deveria acontecer se você tem skill-html, skill-css, etc.
        if (!specificSkillClass && skillBox.classList.contains('skill-box')) {
             // Este caso deveria ser evitado tendo classes específicas como skill-html, skill-js
             // Se cair aqui, significa que só existe a classe 'skill-box' sem uma 'skill-nome'.
             console.warn(`skill-box encontrada sem uma classe específica como 'skill-html', 'skill-js', etc. Verifique o HTML.`);
             // Ainda assim, vamos tentar usar um nome genérico se o HTML estiver malformado
             // Ou force a exibição de um placeholder específico para "caixa genérica"
             // Por simplicidade, vamos usar 'generic-skill' como nome para o backend
             // Mas o ideal é que TODAS as suas skill-box tenham uma classe como skill-html, skill-js.
             skillBox.dataset.description = `<p>Habilidade Genérica</p> <br> <p>Classe de habilidade específica faltando no HTML.</p>`;

             const img = document.createElement('img');
             img.classList.add('icones-habilidades');
             img.src = 'assets/img/placeholder-skill.svg'; // Ícone padrão para falta de classe específica
             img.alt = `Habilidade Genérica`;
             skillBox.appendChild(img);

             // Adiciona listeners mesmo para caixas genéricas
             skillBox.removeEventListener('mouseover', handleMouseOver);
             skillBox.removeEventListener('mouseout', handleMouseOut);
             skillBox.addEventListener('mouseover', handleMouseOver);
             skillBox.addEventListener('mouseout', handleMouseOut);
             return; // Pula para a próxima skillBox
        }


        // Limpa o conteúdo atual da skill-box ANTES de adicionar o novo, incluindo imagens estáticas do HTML
        skillBox.innerHTML = ''; // <-- Esta linha é a que "some" a imagem se o carregamento falhar

        if (specificSkillClass) { // Se uma classe específica (ex: skill-html, skill-js) for encontrada
            let skillNameFromClass = specificSkillClass.replace('skill-', ''); // ex: 'html', 'js', 'ts'

            // Mapeamento para lidar com inconsistências de nome entre HTML e DB
            switch (skillNameFromClass) {
                case 'js':
                    skillNameFromClass = 'javascript';
                    break;
                case 'ts':
                    skillNameFromClass = 'typescript';
                    break;
                case 'nodejs':
                    skillNameFromClass = 'node.js';
                    break;
                case 'github': // Para garantir o match com GitHub no DB
                    skillNameFromClass = 'github';
                    break;
            }

            const foundSkill = hardskillsData.find(skill =>
                skill.nome.toLowerCase() === skillNameFromClass.toLowerCase()
            );

            if (foundSkill) {
                const img = document.createElement('img');
                img.classList.add('icones-habilidades');
                img.src = foundSkill.icone; // Usa o link do ícone do backend
                img.alt = `${foundSkill.nome} icon`;
                skillBox.appendChild(img);

                // Adiciona um data-attribute com a descrição completa
                skillBox.dataset.description = `<p>${foundSkill.nome}</p> <br> <p>${foundSkill.descricao}</p>`;
            } else {
                console.warn(`Habilidade '${specificSkillClass}' (convertido para '${skillNameFromClass}') NÃO encontrada nos dados do backend.`);
                skillBox.dataset.description = `<p>${skillNameFromClass}</p> <br> <p>Descrição não disponível do backend.</p>`;

                // Adiciona uma imagem de placeholder genérica para indicar que não foi encontrada
                const img = document.createElement('img');
                img.classList.add('icones-habilidades');
                img.src = 'assets/img/placeholder-skill.svg'; // Crie este arquivo SVG!
                img.alt = `${skillNameFromClass} (Não encontrado)`;
                skillBox.appendChild(img);
            }

        } else {
            // Este `else` só será acionado se `specificSkillClass` for `null` ou `undefined`
            // após a lógica de busca de classe no início do loop.
            // Isso indica um problema no HTML, onde a skill-box não tem uma classe específica.
            console.error(`ERRO CRÍTICO: skill-box sem classe específica de habilidade encontrada e não tratada. skillBox.classList:`, skillBox.classList);
            skillBox.dataset.description = `<p>Habilidade Desconhecida</p> <br> <p>Erro na identificação da habilidade.</p>`;
            const img = document.createElement('img');
            img.classList.add('icones-habilidades');
            img.src = 'assets/img/error-icon.svg'; // Considere um ícone de erro para este caso
            img.alt = `Erro`;
            skillBox.appendChild(img);
        }

        // Adiciona/Atualiza os event listeners para CADA skillBox
        // Certifique-se de que estes listeners são aplicados APÓS a imagem ser adicionada
        skillBox.removeEventListener('mouseover', handleMouseOver);
        skillBox.removeEventListener('mouseout', handleMouseOut);
        skillBox.addEventListener('mouseover', handleMouseOver);
        skillBox.addEventListener('mouseout', handleMouseOut);
    });
}


// Chama a função para buscar as hard skills assim que o script é carregado
fetchHardskills();

