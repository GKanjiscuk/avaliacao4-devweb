console.log('Script sobreMim.js carregado!');

const sobreMimTextElement = document.querySelector('.texto-backend-sobre-mim');
let sobreMimId = null;

async function fetchSobreMim() {
  try {
    const response = await fetch('http://localhost:3000/sobre');

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const dataArray = await response.json();

    if (Array.isArray(dataArray) && dataArray.length > 0) {
      const data = dataArray[0]; // Usa o primeiro item retornado
      if (sobreMimTextElement) {
        sobreMimTextElement.innerHTML = data.texto || '';
        sobreMimId = data.id;
      }
      console.log('Texto "Sobre Mim" carregado:', data);
    } else {
      console.warn('Nenhum texto "Sobre Mim" encontrado.');
      sobreMimTextElement.innerHTML = '<p>Nenhum texto encontrado.</p>';
    }
  } catch (error) {
    console.error('Erro ao buscar texto "Sobre Mim":', error);
    if (sobreMimTextElement) {
      sobreMimTextElement.innerHTML = '<p>Erro ao carregar o texto "Sobre Mim". Tente novamente mais tarde.</p>';
    }
  }
}

fetchSobreMim();
