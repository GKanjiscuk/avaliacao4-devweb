document.addEventListener('DOMContentLoaded', () => {
    const meuNome = document.querySelector('.meu-nome');
    const fName = meuNome.innerHTML;
    const botaoVerMais = document.querySelector('.github-link button');
    const projetosEscondidos = document.querySelectorAll('.pro.escondido');
  
    meuNome.innerHTML = '';
    let i = 0;
    function typeWriter() {
      if (i < fName.length) {
        meuNome.innerHTML += fName.charAt(i);
        i++;
        setTimeout(typeWriter, 75);
      }
    }
    typeWriter();
  
    function cliqueVer() {
      const algumEscondido = Array.from(projetosEscondidos).some(proj => proj.classList.contains('escondido'));
  
      projetosEscondidos.forEach(proj => {
        proj.classList.toggle('escondido');
      });
  
      botaoVerMais.innerText = algumEscondido ? 'Ver menos' : 'Ver mais';
    }
  
    botaoVerMais.addEventListener('click', cliqueVer);
  });
  