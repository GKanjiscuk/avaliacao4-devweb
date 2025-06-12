console.log('Script certificacoes.js carregado!');

// Seleciona o contêiner onde TODAS as certificações serão inseridas
const certificacoesListContainer = document.getElementById('certificacoes-list-container');

async function fetchCertificacoes() {
    console.log('Iniciando fetch para Certificações...');
    try {
        const url = 'http://localhost:3000/certificacoes?perfil_id=1';
        console.log('URL da requisição de certificações:', url);

        const response = await fetch(url);
        console.log('Resposta do fetch de certificações recebida:', response);

        if (!response.ok) {
            const errorText = await response.text();
            console.error(`ERRO HTTP! Status: ${response.status}, Mensagem: ${errorText}`);
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const certificacoes = await response.json();
        console.log('Dados JSON de certificações recebidos:', certificacoes);

        if (certificacoesListContainer) {
            // Limpa completamente o conteúdo do contêiner (incluindo "Carregando certificações...")
            certificacoesListContainer.innerHTML = ''; 

            if (certificacoes.length === 0) {
                certificacoesListContainer.innerHTML = '<p>Nenhuma certificação encontrada no momento.</p>';
                return;
            }

            // Cria e insere os elementos <p> para cada certificação
            certificacoes.forEach(certificacao => {
                const certificacaoP = document.createElement('p');
                certificacaoP.textContent = certificacao.nome;

                certificacoesListContainer.appendChild(certificacaoP);
                // Adiciona um <br> para espaçamento após cada item, se desejar replicar o seu estilo original
                certificacoesListContainer.appendChild(document.createElement('br')); 
            });
            // Remove o último <br> para evitar espaçamento extra no final
            if (certificacoes.length > 0) {
                certificacoesListContainer.removeChild(certificacoesListContainer.lastChild);
            }

            console.log('Certificações carregadas e exibidas com sucesso!');
        } else {
            console.error('ERRO: Elemento HTML com ID "certificacoes-list-container" não encontrado no DOM!');
        }

    } catch (error) {
        console.error('Erro geral ao buscar certificações:', error);
        if (certificacoesListContainer) {
            certificacoesListContainer.innerHTML = '<p>Erro ao carregar certificações. Tente novamente mais tarde.</p>';
        }
    }
}

fetchCertificacoes(); // CHAMA A FUNÇÃO!