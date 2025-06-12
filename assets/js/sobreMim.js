console.log('Script sobreMim.js carregado!'); // Nova linha no topo

const sobreMimTextElement = document.querySelector('.texto-backend-sobre-mim'); 

let sobreMimId = null; // Variável para guardar o ID do registro (útil para PUT/DELETE)

async function fetchSobreMim() {
    try {
        const response = await fetch('http://localhost:3000/sobre?perfil_id=1');

        if (!response.ok) {
            // Se a resposta não for 2xx (ex: 404), lança um erro
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json(); // Converte a resposta para JSON

        if (sobreMimTextElement) {
            // Usa innerHTML para que as tags HTML do banco de dados sejam renderizadas
            sobreMimTextElement.innerHTML = data.texto; 
            sobreMimId = data.id; // Armazena o ID do registro de "Sobre Mim"
        }
        console.log('Texto "Sobre Mim" carregado:', data);

    } catch (error) {
        console.error('Erro ao buscar texto "Sobre Mim":', error);
        if (sobreMimTextElement) {
            sobreMimTextElement.innerHTML = '<p>Erro ao carregar o texto "Sobre Mim". Tente novamente mais tarde.</p>';
        }
    }
}

fetchSobreMim();