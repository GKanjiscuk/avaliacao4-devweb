// ... (Seu código existente para Hard Skills em habilidades.js) ...

// ==============================================================================
// Para Soft Skills:
async function fetchSoftskills() {
    console.log('Iniciando fetch para Soft Skills...');
    try {
        const url = 'http://localhost:3000/softskills?perfil_id=1'; 
        console.log('URL da requisição de soft skills:', url);

        const response = await fetch(url);
        console.log('Resposta do fetch de soft skills recebida:', response);

        if (!response.ok) {
            const errorText = await response.text();
            console.error(`ERRO HTTP! Status: ${response.status}, Mensagem: ${errorText}`);
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const softskills = await response.json();
        console.log('Dados JSON de soft skills recebidos:', softskills);

        const softskillsContainer = document.getElementById('soft-skills-list');
        if (softskillsContainer) {
            // Limpa completamente o conteúdo do contêiner (incluindo "Carregando soft skills...")
            softskillsContainer.innerHTML = ''; 

            if (softskills.length === 0) {
                softskillsContainer.innerHTML = '<p>Nenhuma soft skill encontrada no momento.</p>';
                return;
            }

            softskills.forEach(skill => {
                const p = document.createElement('p');
                p.textContent = `- ${skill.nome}`; // Adiciona o hífen e o nome da skill
                softskillsContainer.appendChild(p);
            });
            console.log('Soft skills carregadas e exibidas com sucesso!');
        } else {
            console.error('ERRO: Elemento HTML com ID "soft-skills-list" não encontrado no DOM!');
        }

    } catch (error) {
        console.error('Erro geral ao buscar soft skills:', error);
        const softskillsContainer = document.getElementById('soft-skills-list');
        if (softskillsContainer) {
            softskillsContainer.innerHTML = '<p>Erro ao carregar soft skills. Tente novamente mais tarde.</p>';
        }
    }
}

// Chama a função para carregar as soft skills assim que o script é executado
fetchSoftskills();