// Injetar CSS de tema dinamicamente
const themeStyles = `
    /* Transição suave entre temas */
    body {
        transition: background-color 0.4s ease, color 0.4s ease;
    }

    /* Estilo do botão de alternância de tema */
    #theme-toggle {
        margin-left: auto;
        padding: 0.5rem 0.9rem;
        background-color: rgba(255, 255, 255, 0.15);
        border: 1px solid #fff;
        color: #fff;
        border-radius: 4px;
        cursor: pointer;
        font-size: 0.9rem;
        transition: background-color 0.3s ease, color 0.3s ease, border-color 0.3s ease;
    }

    #theme-toggle:hover {
        background-color: rgba(255, 255, 255, 0.3);
    }

    /* Tema claro */
    body.light-mode {
        background-color: #f4f7fb;
        color: #1c2130;
    }

    body.light-mode nav {
        background-color: rgba(255, 255, 255, 0.92);
    }

    body.light-mode footer {
        background-color: rgba(255, 255, 255, 0.9);
    }

    body.light-mode .profiles h1,
    body.light-mode .profile p,
    body.light-mode .add-profile p,
    body.light-mode .manage-button,
    body.light-mode footer p,
    body.light-mode .github a {
        color: #1c2130;
    }

    body.light-mode .profile:hover img,
    body.light-mode .add-profile:hover img {
        border-color: #1c2130;
    }

    body.light-mode .manage-button {
        color: #1c2130;
        border-color: #1c2130;
    }

    body.light-mode .manage-button:hover {
        background-color: #1c2130;
        color: #fff;
    }

    body.light-mode #theme-toggle {
        background-color: rgba(0, 0, 0, 0.08);
        border-color: #1c2130;
        color: #1c2130;
    }

    body.light-mode #theme-toggle:hover {
        background-color: rgba(0, 0, 0, 0.15);
    }
`;

// Injetar estilos de tema no documento
function injectThemeStyles() {
    const styleElement = document.createElement('style');
    styleElement.textContent = themeStyles;
    document.head.appendChild(styleElement);
}

// Definir tema e salvar preferência
function setTheme(theme) {
    const themeToggle = document.getElementById('theme-toggle');
    
    if (theme === 'light') {
        document.body.classList.add('light-mode');
        themeToggle.textContent = 'Modo Escuro';
    } else {
        document.body.classList.remove('light-mode');
        themeToggle.textContent = 'Modo Claro';
    }
    
    localStorage.setItem('theme-preference', theme);
}

// Alternar entre temas
function toggleTheme() {
    const isLightMode = document.body.classList.contains('light-mode');
    setTheme(isLightMode ? 'dark' : 'light');
}

// Salvar perfil ativo no localStorage
function setActiveProfile(name, imageSrc) {
    try {
        const imageUrl = new URL(imageSrc, window.location.href).href;
        localStorage.setItem('perfilAtivoNome', name);
        localStorage.setItem('perfilAtivoImagem', imageUrl);
    } catch (error) {
        console.warn('Erro salvando perfil ativo:', error);
    }
}

// Inicializar seleção de perfil
function initializeProfiles() {
    const profileLinks = document.querySelectorAll('.profiles-list a');

    profileLinks.forEach((link) => {
        const profileLi = link.querySelector('.profile');
        if (!profileLi) return;

        const nameEl = profileLi.querySelector('p');
        const imgEl = profileLi.querySelector('img');
        if (!nameEl || !imgEl) return;

        const profileName = nameEl.textContent.trim();
        const profileImage = imgEl.getAttribute('src');

        link.addEventListener('click', () => {
            setActiveProfile(profileName, profileImage);
        });
    });
}

// Inicializar tema ao carregar a página
function initializeTheme() {
    injectThemeStyles();
    
    const themeToggle = document.getElementById('theme-toggle');
    themeToggle.addEventListener('click', toggleTheme);
    
    const savedTheme = localStorage.getItem('theme-preference');
    const defaultTheme = (!savedTheme && window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) ? 'dark' : 'light';
    
    setTheme(savedTheme || defaultTheme);
}

// Chamar inicialização quando o DOM estiver pronto
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        initializeTheme();
        initializeProfiles();
    });
} else {
    initializeTheme();
    initializeProfiles();
}
