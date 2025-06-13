const skillsContainer = document.querySelector('#habilidades .container-skills');
const descricao = document.querySelector('.texto-descricao');

let hardskillsData = [];

function handleMouseOver() {
  descricao.innerHTML = this.dataset.description || 'Sem descrição disponível.';
}

function handleMouseOut() {
  descricao.innerHTML = ' < Passe o mouse por cima de alguma habilidade para ler a descrição />';
}

async function fetchHardskills() {
  try {
    const response = await fetch('http://localhost:3000/hardskills');
    if (!response.ok) throw new Error(`Erro HTTP! Status: ${response.status}`);
    hardskillsData = await response.json();
    renderSkills();
  } catch (error) {
    console.error('Erro ao buscar hard skills:', error);
    descricao.innerHTML = '<p>Erro ao carregar habilidades. Tente novamente mais tarde.</p>';
  }
}

function renderSkills() {
  if (!skillsContainer) {
    console.error('Contêiner de habilidades não encontrado.');
    return;
  }

  skillsContainer.innerHTML = ''; // Limpa qualquer conteúdo fixo

  hardskillsData.forEach(skill => {
    const skillBox = document.createElement('div');
    skillBox.classList.add('skill-box');

    const img = document.createElement('img');
    img.classList.add('icones-habilidades');
    img.src = skill.icone || 'assets/img/placeholder-skill.svg';
    img.alt = `${skill.nome} icon`;

    skillBox.dataset.description = `<p><strong>${skill.nome}</strong></p><p>${skill.descricao}</p>`;
    skillBox.appendChild(img);

    skillBox.addEventListener('mouseover', handleMouseOver);
    skillBox.addEventListener('mouseout', handleMouseOut);

    skillsContainer.appendChild(skillBox);
  });
}

fetchHardskills();
