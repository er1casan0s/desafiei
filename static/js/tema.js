// ============================================================
// TEMA + ACESSIBILIDADE — Ciclo de temas, fonte e contraste
// ============================================================
// Este arquivo cuida de:
//   1) Aplicar/alternar TEMA (claro, escuro, rosa, verde, oceano, meianoite, fogo)
//   2) Ciclar TAMANHO DA FONTE (normal → grande → gigante → normal)
//   3) Alternar CONTRASTE (normal ↔ alto)
//   4) Resetar tudo ao padrão
//   5) Abrir/fechar o painel de acessibilidade
// ============================================================


// ============================================================
// CONSTANTES — listas e nomes amigáveis
// ============================================================

// Tamanhos possíveis de fonte
const FONTES = ["normal", "grande", "gigante"];

// Modos de contraste
const CONTRASTES = ["normal", "alto"];

// Temas disponíveis (o botão cicla por todos nesta ordem)
const TEMAS = ["claro", "escuro", "rosa", "verde", "oceano", "meianoite", "fogo"];

// Nomes amigáveis que aparecem nos botões
const NOMES_TEMAS = {
    "claro":      "☀️ Claro",
    "escuro":     "🌙 Escuro",
    "rosa":       "🌸 Rosa",
    "verde":      "🌿 Verde",
    "oceano":     "🌊 Oceano",
    "meianoite":  "🌌 Meia-noite",
    "fogo":       "🔥 Fogo"
};


// ============================================================
// TEMA
// ============================================================

/**
 * Aplica um tema específico.
 * Salva no localStorage e atualiza os botões.
 */
function aplicarTema(tema) {
    if (!TEMAS.includes(tema)) tema = "claro";

    document.documentElement.setAttribute("data-tema", tema);
    localStorage.setItem("desafiei_tema", tema);
    atualizarBotoes();
}

/**
 * Alterna para o próximo tema da lista (ciclo).
 */
function alternarTema() {
    const atual = document.documentElement.getAttribute("data-tema") || "claro";
    const idx = TEMAS.indexOf(atual);
    const proximo = TEMAS[(idx + 1) % TEMAS.length];   // se chegar no fim, volta ao começo
    aplicarTema(proximo);
}


// ============================================================
// FONTE
// ============================================================

/**
 * Aplica um tamanho de fonte específico.
 */
function aplicarFonte(tamanho) {
    if (!FONTES.includes(tamanho)) tamanho = "normal";

    document.documentElement.setAttribute("data-fonte", tamanho);
    localStorage.setItem("desafiei_fonte", tamanho);
    atualizarBotoes();
}

/**
 * Cicla entre os tamanhos de fonte: normal → grande → gigante → normal
 */
function ciclarFonte() {
    const atual = document.documentElement.getAttribute("data-fonte") || "normal";
    const idx = FONTES.indexOf(atual);
    const proximo = FONTES[(idx + 1) % FONTES.length];
    aplicarFonte(proximo);
}


// ============================================================
// CONTRASTE
// ============================================================

/**
 * Aplica um modo de contraste específico.
 */
function aplicarContraste(modo) {
    if (!CONTRASTES.includes(modo)) modo = "normal";

    document.documentElement.setAttribute("data-contraste", modo);
    localStorage.setItem("desafiei_contraste", modo);
    atualizarBotoes();
}

/**
 * Alterna entre contraste normal e alto.
 */
function ciclarContraste() {
    const atual = document.documentElement.getAttribute("data-contraste") || "normal";
    const proximo = atual === "normal" ? "alto" : "normal";
    aplicarContraste(proximo);
}


// ============================================================
// RESET — Volta tudo ao padrão
// ============================================================
function resetarAcessibilidade() {
    aplicarTema("claro");
    aplicarFonte("normal");
    aplicarContraste("normal");
    atualizarBotoes();
}


// ============================================================
// ATUALIZA OS TEXTOS DOS BOTÕES
// ============================================================
/**
 * Atualiza o texto de TODOS os botões relacionados a tema/fonte/contraste.
 * Suporta tanto os botões do MENU quanto os do PAINEL.
 */
function atualizarBotoes() {
    const tema      = document.documentElement.getAttribute("data-tema") || "claro";
    const fonte     = document.documentElement.getAttribute("data-fonte") || "normal";
    const contraste = document.documentElement.getAttribute("data-contraste") || "normal";

    const textoBotaoTema = NOMES_TEMAS[tema] || "☀️ Claro";

    // 🔥 Botão do tema no MENU (id="btn-tema")
    const btnTemaMenu = document.getElementById("btn-tema");
    if (btnTemaMenu) btnTemaMenu.textContent = textoBotaoTema;

    // 🔥 Botão do tema no PAINEL (id="btn-tema-painel")
    const btnTemaPainel = document.getElementById("btn-tema-painel");
    if (btnTemaPainel) btnTemaPainel.textContent = textoBotaoTema;

    // 🔤 Botão de fonte
    const btnFonte = document.getElementById("btn-fonte");
    if (btnFonte) {
        const labels = { normal: "A", grande: "A+", gigante: "A++" };
        btnFonte.textContent = `🔤 ${labels[fonte] || "A"}`;
    }

    // 🔲 Botão de contraste
    const btnContraste = document.getElementById("btn-contraste");
    if (btnContraste) {
        btnContraste.textContent = contraste === "alto" ? "🔲 Alto" : "🔲 Normal";
    }
}


// ============================================================
// PAINEL DE ACESSIBILIDADE (abre/fecha)
// ============================================================

/**
 * Abre/fecha o painel de acessibilidade.
 * Chamado pelo botão ♿ (id="btn-acessibilidade").
 */
function alternarPainelAcessibilidade(event) {
    if (event) event.stopPropagation();   // evita que o clique feche o painel imediatamente

    const painel = document.getElementById("painel-acessibilidade");
    if (!painel) return;
    painel.classList.toggle("aberto");
}

// Fecha o painel ao clicar FORA dele
document.addEventListener("click", (e) => {
    const painel = document.getElementById("painel-acessibilidade");
    const botao  = document.getElementById("btn-acessibilidade");
    if (!painel || !botao) return;

    // Se o clique foi fora do painel E fora do botão, fecha
    if (!painel.contains(e.target) && !botao.contains(e.target)) {
        painel.classList.remove("aberto");
    }
});

// Fecha o painel ao apertar ESC
document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
        const painel = document.getElementById("painel-acessibilidade");
        if (painel) painel.classList.remove("aberto");
    }
});


// ============================================================
// INICIALIZAÇÃO — Roda quando a página carrega
// ============================================================
window.addEventListener("DOMContentLoaded", () => {

    // Carrega as preferências salvas no localStorage
    const temaSalvo      = localStorage.getItem("desafiei_tema")      || "claro";
    const fonteSalva     = localStorage.getItem("desafiei_fonte")     || "normal";
    const contrasteSalvo = localStorage.getItem("desafiei_contraste") || "normal";

    // Aplica cada uma (isso já chama atualizarBotoes no final)
    aplicarTema(temaSalvo);
    aplicarFonte(fonteSalva);
    aplicarContraste(contrasteSalvo);

    // Atualiza os botões mais uma vez para garantir
    atualizarBotoes();

    // Log de confirmação (útil para debug)
    console.log("🎨 tema.js carregado. Tema atual:", temaSalvo);
});