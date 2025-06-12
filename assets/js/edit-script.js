console.log("edit-script.js carregado!");

const API_BASE_URL = "http://localhost:3000"; // Base URL da sua API
// const PERFIL_ID = 1; // Removido, pois não será usado como filtro de rota

let perfilData = null; // Para armazenar os dados do perfil coletados (o loadPerfil ainda pode ser útil para coletar o nome, etc.)

// === Funções auxiliares para requisições API ===
async function fetchData(url) {
  try {
    const response = await fetch(url);
    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`HTTP error! status: ${response.status} - ${errorText}`);
    }
    return await response.json();
  } catch (error) {
    console.error(`Erro ao buscar dados de ${url}:`, error);
    showStatusMessage(
      `Erro ao carregar dados. Detalhes: ${error.message}`,
      "error"
    );
    throw error;
  }
}

async function postData(url, data) {
  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    const responseData = await response.json();
    if (!response.ok) {
      throw new Error(
        `HTTP error! status: ${response.status} - ${JSON.stringify(
          responseData
        )}`
      );
    }
    return responseData;
  } catch (error) {
    console.error("Erro ao enviar dados (POST):", error);
    showStatusMessage("Erro ao adicionar item.", "error");
    throw error;
  }
}

async function putData(url, data) {
  try {
    const response = await fetch(url, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    const responseData = await response.json();
    if (!response.ok) {
      throw new Error(
        `HTTP error! status: ${response.status} - ${JSON.stringify(
          responseData
        )}`
      );
    }
    return responseData;
  } catch (error) {
    console.error("Erro ao atualizar dados (PUT):", error);
    showStatusMessage("Erro ao salvar item.", "error");
    throw error;
  }
}

async function deleteData(url) {
  try {
    const response = await fetch(url, {
      method: "DELETE",
    });
    const responseData = await response.json();
    if (!response.ok) {
      throw new Error(
        `HTTP error! status: ${response.status} - ${JSON.stringify(
          responseData
        )}`
      );
    }
    return responseData;
  } catch (error) {
    console.error("Erro ao deletar dados (DELETE):", error);
    showStatusMessage("Erro ao deletar item.", "error");
    throw error;
  }
}

// === Função para exibir mensagens de status ===
const globalStatusMessage = document.getElementById("global-status-message");

function showStatusMessage(message, type = "info") {
  if (!globalStatusMessage) {
    console.warn(
      "Elemento #global-status-message não encontrado. Mensagens de status não serão exibidas."
    );
    return;
  }
  globalStatusMessage.textContent = message;
  globalStatusMessage.className = `status-message ${type}`;
  globalStatusMessage.style.display = "block";
  setTimeout(() => {
    globalStatusMessage.style.display = "none";
    globalStatusMessage.className = "status-message"; // Resetar classes
  }, 5000); // Esconde a mensagem após 5 segundos
}

// ==============================================================================
// Variáveis DOM globais
const formSobreMim = document.getElementById("form-sobre-mim");
const sobreMimTextoInput = document.getElementById("sobre-mim-texto");
const hardskillsListContainer = document.getElementById(
  "hardskills-list-container"
);
const formHardskill = document.getElementById("form-hardskill");
const hardskillIdInput = document.getElementById("hardskill-id");
const hardskillNomeInput = document.getElementById("hardskill-nome");
const hardskillDescricaoInput = document.getElementById("hardskill-descricao");
const btnCancelHardskill = document.getElementById("btn-cancel-hardskill");
const softskillsListContainer = document.getElementById(
  "softskills-list-container"
);
const formSoftskill = document.getElementById("form-softskill");
const softskillIdInput = document.getElementById("softskill-id");
const softskillNomeInput = document.getElementById("softskill-nome");
const btnCancelSoftskill = document.getElementById("btn-cancel-softskill");
const certificacoesListContainer = document.getElementById(
  "certificacoes-list-container"
);
const formCertificacao = document.getElementById("form-certificacao");
const certificacaoIdInput = document.getElementById("certificacao-id");
const certificacaoNomeInput = document.getElementById("certificacao-nome");
const btnCancelCertificacao = document.getElementById(
  "btn-cancel-certificacao"
);
const projetosListContainer = document.getElementById(
  "projetos-list-container"
);
const formProjeto = document.getElementById("form-projeto");
const projetoIdInput = document.getElementById("projeto-id");
const projetoLinkInput = document.getElementById("projeto-link");
const projetoNomeInput = document.getElementById("projeto-nome");
const projetoImagemInput = document.getElementById("projeto-imagem");
const btnCancelProjeto = document.getElementById("btn-cancel-projeto");

// ==============================================================================
// Lógica para Perfil (Apenas coleta os dados, sem exibição ou edição na página)
// Mantemos a função, mas a forma de buscar um perfil específico pode depender
// de como você irá obter o ID do perfil a ser coletado (ex: da URL, de um login).
// Por enquanto, faremos uma chamada genérica que pode ser ajustada.
async function loadPerfil() {
  try {
    // Se houver apenas um perfil, ou se você quiser o primeiro, pode usar /perfil
    const perfis = await fetchData(`${API_BASE_URL}/perfil`);
    if (perfis && perfis.length > 0) {
      perfilData = perfis[0]; // Assume que queremos o primeiro perfil se houver vários
      console.log("Dados do perfil coletados:", perfilData);
    } else {
      console.warn("Nenhum perfil encontrado no backend.");
    }
  } catch (error) {
    console.error("Falha ao coletar dados do perfil:", error);
  }
}

// ==============================================================================
// Lógica para Sobre Mim
let sobreMimDataId = null;

async function loadSobreMim() {
  try {
    if (!sobreMimTextoInput) return;

    // Agora busca todos os "sobremim" e pega o primeiro (ou o que você quiser)
    const sobreMimArray = await fetchData(`${API_BASE_URL}/sobre`);

    if (Array.isArray(sobreMimArray) && sobreMimArray.length > 0) {
      sobreMimTextoInput.value = sobreMimArray[0].texto;
      sobreMimDataId = sobreMimArray[0].id;
    } else {
      console.log(
        'Texto "Sobre Mim" não encontrado. Adicione um texto inicial no banco de dados.',
        "info"
      );
      sobreMimTextoInput.value = "";
      sobreMimDataId = null;
    }
  } catch (error) {
    // Erro já tratado em fetchData
  }
}

if (formSobreMim) {
  formSobreMim.addEventListener("submit", async (e) => {
    e.preventDefault();
    const newText = sobreMimTextoInput.value;

    if (!sobreMimDataId) {
      showStatusMessage(
        'Erro: Não foi possível determinar o ID para salvar "Sobre Mim". Crie um registro "Sobre Mim" no banco de dados primeiro.',
        "error"
      );
      return;
    }

    try {
      // PUT para atualizar um registro existente
      await putData(`${API_BASE_URL}/sobre`, {
        texto: newText,
      });
      showStatusMessage('Texto "Sobre Mim" salvo com sucesso!', "success");
    } catch (error) {
      // Erro já tratado em putData
    }
  });
}

// ==============================================================================
// Lógica para Hard Skills
let currentHardskills = [];

async function loadHardSkills() {
  try {
    // Remove o filtro por perfil_id
    const hardskills = await fetchData(`${API_BASE_URL}/hardskills`);
    currentHardskills = hardskills;
    renderHardSkills(hardskills);
  } catch (error) {
    if (hardskillsListContainer) {
      hardskillsListContainer.innerHTML =
        '<p class="loading-message">Erro ao carregar Hard Skills.</p>';
    }
  }
}

if (formHardskill) {
  formHardskill.addEventListener("submit", async (e) => {
    e.preventDefault();
    const id = hardskillIdInput.value; // Isso captura o ID do campo oculto
    const nome = hardskillNomeInput.value;
    const descricao = hardskillDescricaoInput.value;

    // Dados para enviar no corpo da requisição
    const data = { nome, descricao };
    // Para POST, o perfil_id é adicionado ao data. Para PUT, o backend pode ignorá-lo se não precisar no WHERE.
    // A lógica do frontend já envia perfil_id para POST

    if (id) {
      // Editando: ID presente no campo oculto
      try {
        // A URL para PUT já está correta, usando o ID do item: /hardskills/:id
        await putData(`${API_BASE_URL}/hardskills/${id}`, data);
        showStatusMessage("Hard Skill atualizada com sucesso!", "success");
      } catch (error) {
        // Erro já tratado
      }
    } else {
      // Adicionando: ID ausente
      try {
        // Para POST, adicionamos o perfil_id ao objeto de dados
        await postData(`${API_BASE_URL}/hardskills`, {
          ...data,
          perfil_id: perfilData ? perfilData.id : 1,
        });
        showStatusMessage("Hard Skill adicionada com sucesso!", "success");
      } catch (error) {
        // Erro já tratado
      }
    }
    resetHardskillForm();
    loadHardSkills();
  });
}

function editHardSkill(id) {
  const skillToEdit = currentHardskills.find((s) => s.id == id);
  if (
    skillToEdit &&
    hardskillIdInput &&
    hardskillNomeInput &&
    hardskillDescricaoInput &&
    btnCancelHardskill
  ) {
    hardskillIdInput.value = skillToEdit.id;
    hardskillNomeInput.value = skillToEdit.nome;
    hardskillDescricaoInput.value = skillToEdit.descricao;
    btnCancelHardskill.style.display = "inline-block";
    document.getElementById("btn-save-hardskill").textContent = "Salvar Edição";
  }
}

async function deleteHardSkill(id) {
  if (confirm("Tem certeza que deseja excluir esta Hard Skill?")) {
    try {
      // A URL para DELETE já está correta, usando o ID do item: /hardskills/:id
      await deleteData(`${API_BASE_URL}/hardskills/${id}`);
      showStatusMessage("Hard Skill excluída com sucesso!", "success");
      loadHardSkills();
    } catch (error) {
      // Erro já tratado
    }
  }
}

// ... (Restante do código de renderização e reset do formulário de Hard Skills)
function renderHardSkills(hardskills) {
  if (!hardskillsListContainer) return;
  hardskillsListContainer.innerHTML = "";
  if (hardskills.length === 0) {
    hardskillsListContainer.innerHTML =
      '<p class="loading-message">Nenhuma Hard Skill cadastrada.</p>';
    return;
  }
  hardskills.forEach((skill) => {
    const itemDiv = document.createElement("div");
    itemDiv.className = "list-item";
    itemDiv.innerHTML = `
            <span class="item-text">
                <strong>${skill.nome}</strong><br>
                ${skill.descricao}
            </span>
            <div class="actions">
                <button class="edit-button" data-id="${skill.id}">Editar</button>
                <button class="delete-button" data-id="${skill.id}">Excluir</button>
            </div>
        `;
    hardskillsListContainer.appendChild(itemDiv);
  });
  hardskillsListContainer.querySelectorAll(".edit-button").forEach((button) => {
    button.addEventListener("click", (e) => editHardSkill(e.target.dataset.id));
  });
  hardskillsListContainer
    .querySelectorAll(".delete-button")
    .forEach((button) => {
      button.addEventListener("click", (e) =>
        deleteHardSkill(e.target.dataset.id)
      );
    });
}
if (btnCancelHardskill) {
  btnCancelHardskill.addEventListener("click", resetHardskillForm);
}
function resetHardskillForm() {
  if (formHardskill && hardskillIdInput && btnCancelHardskill) {
    formHardskill.reset();
    hardskillIdInput.value = "";
    btnCancelHardskill.style.display = "none";
    document.getElementById("btn-save-hardskill").textContent =
      "Adicionar/Salvar";
  }
}

// ==============================================================================
// Lógica para Soft Skills
let currentSoftskills = [];

async function loadSoftSkills() {
  try {
    // Remove o filtro por perfil_id
    const softskills = await fetchData(`${API_BASE_URL}/softskills`);
    currentSoftskills = softskills;
    renderSoftSkills(softskills);
  } catch (error) {
    if (softskillsListContainer) {
      softskillsListContainer.innerHTML =
        '<p class="loading-message">Erro ao carregar Soft Skills.</p>';
    }
  }
}

if (formSoftskill) {
  formSoftskill.addEventListener("submit", async (e) => {
    e.preventDefault();
    const id = softskillIdInput.value;
    const nome = softskillNomeInput.value;
    const data = { nome };

    if (id) {
      // Editando
      try {
        await putData(`${API_BASE_URL}/softskills/${id}`, data); // ID no link
        showStatusMessage("Soft Skill atualizada com sucesso!", "success");
      } catch (error) {
        // Erro já tratado
      }
    } else {
      // Adicionando
      try {
        await postData(`${API_BASE_URL}/softskills`, {
          ...data,
          perfil_id: perfilData ? perfilData.id : 1,
        }); // Assume perfil_id 1
        showStatusMessage("Soft Skill adicionada com sucesso!", "success");
      } catch (error) {
        // Erro já tratado
      }
    }
    resetSoftskillForm();
    loadSoftSkills();
  });
}

function editSoftSkill(id) {
  const skillToEdit = currentSoftskills.find((s) => s.id == id);
  if (
    skillToEdit &&
    softskillIdInput &&
    softskillNomeInput &&
    btnCancelSoftskill
  ) {
    softskillIdInput.value = skillToEdit.id;
    softskillNomeInput.value = skillToEdit.nome;
    btnCancelSoftskill.style.display = "inline-block";
    document.getElementById("btn-save-softskill").textContent = "Salvar Edição";
  }
}

async function deleteSoftSkill(id) {
  if (confirm("Tem certeza que deseja excluir esta Soft Skill?")) {
    try {
      await deleteData(`${API_BASE_URL}/softskills/${id}`); // ID no link
      showStatusMessage("Soft Skill excluída com sucesso!", "success");
      loadSoftSkills();
    } catch (error) {
      // Erro já tratado
    }
  }
}

// ... (Restante do código de renderização e reset do formulário de Soft Skills)
function renderSoftSkills(softskills) {
  if (!softskillsListContainer) return;
  softskillsListContainer.innerHTML = "";
  if (softskills.length === 0) {
    softskillsListContainer.innerHTML =
      '<p class="loading-message">Nenhuma Soft Skill cadastrada.</p>';
    return;
  }
  softskills.forEach((skill) => {
    const itemDiv = document.createElement("div");
    itemDiv.className = "list-item";
    itemDiv.innerHTML = `
            <span class="item-text">${skill.nome}</span>
            <div class="actions">
                <button class="edit-button" data-id="${skill.id}">Editar</button>
                <button class="delete-button" data-id="${skill.id}">Excluir</button>
            </div>
        `;
    softskillsListContainer.appendChild(itemDiv);
  });
  softskillsListContainer.querySelectorAll(".edit-button").forEach((button) => {
    button.addEventListener("click", (e) => editSoftSkill(e.target.dataset.id));
  });
  softskillsListContainer
    .querySelectorAll(".delete-button")
    .forEach((button) => {
      button.addEventListener("click", (e) =>
        deleteSoftSkill(e.target.dataset.id)
      );
    });
}
if (btnCancelSoftskill) {
  btnCancelSoftskill.addEventListener("click", resetSoftskillForm);
}
function resetSoftskillForm() {
  if (formSoftskill && softskillIdInput && btnCancelSoftskill) {
    formSoftskill.reset();
    softskillIdInput.value = "";
    btnCancelSoftskill.style.display = "none";
    document.getElementById("btn-save-softskill").textContent =
      "Adicionar/Salvar";
  }
}

// ==============================================================================
// Lógica para Certificações
let currentCertificacoes = [];

async function loadCertificacoes() {
  try {
    // Remove o filtro por perfil_id
    const certificacoes = await fetchData(`${API_BASE_URL}/certificacoes`);
    currentCertificacoes = certificacoes;
    renderCertificacoes(certificacoes);
  } catch (error) {
    if (certificacoesListContainer) {
      certificacoesListContainer.innerHTML =
        '<p class="loading-message">Erro ao carregar Certificações.</p>';
    }
  }
}

if (formCertificacao) {
  formCertificacao.addEventListener("submit", async (e) => {
    e.preventDefault();
    const id = certificacaoIdInput.value;
    const nome = certificacaoNomeInput.value;
    const data = { nome };

    if (id) {
      // Editando
      try {
        await putData(`${API_BASE_URL}/certificacoes/${id}`, data); // ID no link
        showStatusMessage("Certificação atualizada com sucesso!", "success");
      } catch (error) {
        // Erro já tratado
      }
    } else {
      // Adicionando
      try {
        await postData(`${API_BASE_URL}/certificacoes`, {
          ...data,
          perfil_id: perfilData ? perfilData.id : 1,
        }); // Assume perfil_id 1
        showStatusMessage("Certificação adicionada com sucesso!", "success");
      } catch (error) {
        // Erro já tratado
      }
    }
    resetCertificacaoForm();
    loadCertificacoes();
  });
}

function editCertificacao(id) {
  const certToEdit = currentCertificacoes.find((c) => c.id == id);
  if (
    certToEdit &&
    certificacaoIdInput &&
    certificacaoNomeInput &&
    btnCancelCertificacao
  ) {
    certificacaoIdInput.value = certToEdit.id;
    certificacaoNomeInput.value = certToEdit.nome;
    btnCancelCertificacao.style.display = "inline-block";
    document.getElementById("btn-save-certificacao").textContent =
      "Salvar Edição";
  }
}

async function deleteCertificacao(id) {
  if (confirm("Tem certeza que deseja excluir esta Certificação?")) {
    try {
      await deleteData(`${API_BASE_URL}/certificacoes/${id}`); // ID no link
      showStatusMessage("Certificação excluída com sucesso!", "success");
      loadCertificacoes();
    } catch (error) {
      // Erro já tratado
    }
  }
}

// ... (Restante do código de renderização e reset do formulário de Certificações)
function renderCertificacoes(certificacoes) {
  if (!certificacoesListContainer) return;
  certificacoesListContainer.innerHTML = "";
  if (certificacoes.length === 0) {
    certificacoesListContainer.innerHTML =
      '<p class="loading-message">Nenhuma Certificação cadastrada.</p>';
    return;
  }
  certificacoes.forEach((cert) => {
    const itemDiv = document.createElement("div");
    itemDiv.className = "list-item";
    itemDiv.innerHTML = `
            <span class="item-text">${cert.nome}</span>
            <div class="actions">
                <button class="edit-button" data-id="${cert.id}">Editar</button>
                <button class="delete-button" data-id="${cert.id}">Excluir</button>
            </div>
        `;
    certificacoesListContainer.appendChild(itemDiv);
  });
  certificacoesListContainer
    .querySelectorAll(".edit-button")
    .forEach((button) => {
      button.addEventListener("click", (e) =>
        editCertificacao(e.target.dataset.id)
      );
    });
  certificacoesListContainer
    .querySelectorAll(".delete-button")
    .forEach((button) => {
      button.addEventListener("click", (e) =>
        deleteCertificacao(e.target.dataset.id)
      );
    });
}
if (btnCancelCertificacao) {
  btnCancelCertificacao.addEventListener("click", resetCertificacaoForm);
}
function resetCertificacaoForm() {
  if (formCertificacao && certificacaoIdInput && btnCancelCertificacao) {
    formCertificacao.reset();
    certificacaoIdInput.value = "";
    btnCancelCertificacao.style.display = "none";
    document.getElementById("btn-save-certificacao").textContent =
      "Adicionar/Salvar";
  }
}

// ==============================================================================
// Lógica para Projetos
let currentProjetos = [];

async function loadProjetos() {
  try {
    // Remove o filtro por perfil_id
    const projetos = await fetchData(`${API_BASE_URL}/projetos`);
    currentProjetos = projetos;
    renderProjetos(projetos);
  } catch (error) {
    if (projetosListContainer) {
      projetosListContainer.innerHTML =
        '<p class="loading-message">Erro ao carregar Projetos.</p>';
    }
  }
}

if (formProjeto) {
  formProjeto.addEventListener("submit", async (e) => {
    e.preventDefault();
    const id = projetoIdInput.value;
    const link = projetoLinkInput.value;
    const nome = projetoNomeInput ? projetoNomeInput.value : "";
    const imagem_url = projetoImagemInput ? projetoImagemInput.value : "";

    const data = { link, nome, imagem_url };

    if (id) {
      // Editando
      try {
        await putData(`${API_BASE_URL}/projetos/${id}`, data); // ID no link
        showStatusMessage("Projeto atualizado com sucesso!", "success");
      } catch (error) {
        // Erro já tratado
      }
    } else {
      // Adicionando
      try {
        await postData(`${API_BASE_URL}/projetos`, {
          ...data,
          perfil_id: perfilData ? perfilData.id : 1,
        }); // Assume perfil_id 1
        showStatusMessage("Projeto adicionado com sucesso!", "success");
      } catch (error) {
        // Erro já tratado
      }
    }
    resetProjetoForm();
    loadProjetos();
  });
}

function editProjeto(id) {
  const projetoToEdit = currentProjetos.find((p) => p.id == id);
  if (projetoToEdit && projetoIdInput && projetoLinkInput && btnCancelProjeto) {
    projetoIdInput.value = projetoToEdit.id;
    projetoLinkInput.value = projetoToEdit.link;
    if (projetoNomeInput) projetoNomeInput.value = projetoToEdit.nome || "";
    if (projetoImagemInput)
      projetoImagemInput.value = projetoToEdit.imagem_url || "";

    btnCancelProjeto.style.display = "inline-block";
    document.getElementById("btn-save-projeto").textContent = "Salvar Edição";
  }
}

async function deleteProjeto(id) {
  if (confirm("Tem certeza que deseja excluir este Projeto?")) {
    try {
      await deleteData(`${API_BASE_URL}/projetos/${id}`); // ID no link
      showStatusMessage("Projeto excluído com sucesso!", "success");
      loadProjetos();
    } catch (error) {
      // Erro já tratado
    }
  }
}

// ... (Restante do código de renderização e reset do formulário de Projetos)
function renderProjetos(projetos) {
  if (!projetosListContainer) return;
  projetosListContainer.innerHTML = "";
  if (projetos.length === 0) {
    projetosListContainer.innerHTML =
      '<p class="loading-message">Nenhum Projeto cadastrado.</p>';
    return;
  }
  projetos.forEach((projeto) => {
    const itemDiv = document.createElement("div");
    itemDiv.className = "list-item";
    itemDiv.innerHTML = `
            <span class="item-text">
                <a href="${projeto.link}" target="_blank">${projeto.link}</a>
                ${projeto.nome ? `<br><strong>${projeto.nome}</strong>` : ""}
                ${
                  projeto.imagem_url
                    ? `<br><img src="${projeto.imagem_url}" alt="Imagem do projeto" style="max-width: 100px; margin-top: 5px;">`
                    : ""
                }
            </span>
            <div class="actions">
                <button class="edit-button" data-id="${
                  projeto.id
                }">Editar</button>
                <button class="delete-button" data-id="${
                  projeto.id
                }">Excluir</button>
            </div>
        `;
    projetosListContainer.appendChild(itemDiv);
  });
  projetosListContainer.querySelectorAll(".edit-button").forEach((button) => {
    button.addEventListener("click", (e) => editProjeto(e.target.dataset.id));
  });
  projetosListContainer.querySelectorAll(".delete-button").forEach((button) => {
    button.addEventListener("click", (e) => deleteProjeto(e.target.dataset.id));
  });
}
if (btnCancelProjeto) {
  btnCancelProjeto.addEventListener("click", resetProjetoForm);
}
function resetProjetoForm() {
  if (formProjeto && projetoIdInput && btnCancelProjeto) {
    formProjeto.reset();
    projetoIdInput.value = "";
    btnCancelProjeto.style.display = "none";
    document.getElementById("btn-save-projeto").textContent =
      "Adicionar/Salvar";
    if (projetoNomeInput) projetoNomeInput.value = "";
    if (projetoImagemInput) projetoImagemInput.value = "";
  }
}

// ==============================================================================
// Funções de Inicialização
document.addEventListener("DOMContentLoaded", () => {
  // Definir min-height para #edicao
  const edicaoDiv = document.getElementById("edicao");
  if (edicaoDiv) {
    edicaoDiv.style.minHeight = "100vh";
    edicaoDiv.style.display = "flex";
    edicaoDiv.style.flexDirection = "column";
    edicaoDiv.style.alignItems = "center";
  }

  // Carregar todos os dados ao iniciar a página
  loadPerfil(); // Ainda pode ser útil para pegar um perfil padrão, mesmo sem ID fixo na URL
  loadSobreMim();
  loadHardSkills();
  loadSoftSkills();
  loadCertificacoes();
  loadProjetos();
});
