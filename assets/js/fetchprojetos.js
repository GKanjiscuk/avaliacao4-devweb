console.log('Script projetos.js carregado!');

// Seleciona o contêiner principal de todos os cards
const projetosContainer = document.querySelector('.projetos-itens');
// Seleciona a mensagem de carregamento fora do container
const loadingMessage = document.getElementById('loading-projetos-message');

async function fetchProjetos() {
    console.log('Iniciando fetch para Projetos...');
    try {
        const url = 'http://localhost:3000/projetos?perfil_id=1';
        console.log('URL da requisição de projetos:', url);

        const response = await fetch(url);
        console.log('Resposta do fetch de projetos recebida:', response);

        if (!response.ok) {
            const errorText = await response.text();
            console.error(`ERRO HTTP! Status: ${response.status}, Mensagem: ${errorText}`);
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const projetos = await response.json();
        console.log('Dados JSON de projetos recebidos:', projetos);

        // Remove a mensagem de carregamento uma vez que os dados foram buscados
        if (loadingMessage) {
            loadingMessage.remove();
        }

        if (projetosContainer) {
            if (projetos.length === 0) {
                // Se não houver projetos reais, adiciona uma mensagem no início
                const noProjectsMessage = document.createElement('p');
                noProjectsMessage.textContent = 'Nenhum projeto real encontrado. Os cards "Em Breve" aguardam!';
                noProjectsMessage.style.width = '100%'; // Para que a mensagem ocupe a largura total
                noProjectsMessage.style.textAlign = 'center';
                projetosContainer.prepend(noProjectsMessage); 
                return;
            }

            // Itera sobre cada projeto recebido do backend
            // Percorre de trás para frente para usar prepend e manter a ordem original dos projetos
            for (let i = projetos.length - 1; i >= 0; i--) {
                const projeto = projetos[i];
                const projetoDiv = document.createElement('div');
                projetoDiv.classList.add('pro'); // Adiciona a classe 'pro'

                const linkElement = document.createElement('a');
                linkElement.href = projeto.link;
                linkElement.target = '_blank';

                const imgElement = document.createElement('img');
                imgElement.src = projeto.imagem_url || 'assets/img/placeholder-projeto.jpg';
                imgElement.alt = `Projeto: ${projeto.link}`;

                linkElement.appendChild(imgElement);
                projetoDiv.appendChild(linkElement);

                // Adiciona o novo projeto NO INÍCIO do container .projetos-itens
                projetosContainer.prepend(projetoDiv); 
            }
            console.log('Projetos carregados e exibidos com sucesso!');
        } else {
            console.error('ERRO: Elemento HTML com classe ".projetos-itens" não encontrado no DOM!');
        }

    } catch (error) {
        console.error('Erro geral ao buscar projetos:', error);
        // Em caso de erro, remove a mensagem de carregamento e mostra uma mensagem de erro
        if (loadingMessage) {
            loadingMessage.remove();
        }
        if (projetosContainer) {
            const errorMessage = document.createElement('p');
            errorMessage.textContent = 'Erro ao carregar projetos. Tente novamente mais tarde.';
            errorMessage.style.width = '100%';
            errorMessage.style.textAlign = 'center';
            projetosContainer.prepend(errorMessage);
        }
    }
}

fetchProjetos(); // CHAMA A FUNÇÃO!