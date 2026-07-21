document.addEventListener('DOMContentLoaded', () => {
    const menuIcon = document.querySelector('.menu-icon');
    const navLinks = document.querySelector('.nav-links');

    if (menuIcon && navLinks) {
        menuIcon.addEventListener('click', (e) => {
            e.stopPropagation();
            navLinks.classList.toggle('nav-links--open');
            menuIcon.textContent = navLinks.classList.contains('nav-links--open') ? '✕' : '☰';
        });

        navLinks.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                navLinks.classList.remove('nav-links--open');
                menuIcon.textContent = '☰';
            });
        });

        document.addEventListener('click', (e) => {
            if (navLinks.classList.contains('nav-links--open') &&
                !navLinks.contains(e.target) &&
                !menuIcon.contains(e.target)) {
                navLinks.classList.remove('nav-links--open');
                menuIcon.textContent = '☰';
            }
        });
    }

    const viewWorkBtn = document.querySelector('.hero-buttons .primary');
    const playGameBtn = document.querySelector('.hero-buttons .secondary');

    if (viewWorkBtn) {
        viewWorkBtn.addEventListener('click', () => {
            window.location.href = 'projects.html';
        });
    }

    if (playGameBtn) {
        playGameBtn.addEventListener('click', () => {
            window.location.href = 'play.html';
        });
    } 
    
    const featuredProjects = [
    {
        id: 1,
        title: "Static Mind",
        description: "A psychological horror game centred around focus, rising static, and corrupted systems that gradually break the player's trust in the game world.",
        fullDescription: "Static Mind is a psychological horror prototype that explores how a single continuous input mechanic can create tension, uncertainty, and player distrust. Players must manage an ever-increasing static resource by focusing on designated zones and navigating increasingly corrupted environments. As the game progresses through eight levels, new mechanics are introduced that deliberately undermine the player's expectations, including corrupted focus zones, fake focus zones, phantom enemies, delayed safe zones, false exits, and deceptive UI feedback. Narrative progression is delivered through memory fragments unlocked at the end of each level, gradually revealing the true nature of the system. The final level combines all previously introduced mechanics into a timed collapse sequence where players must survive a fully corrupted environment while uncovering the remaining fragments of the story.",
        image: "https://placehold.co/600x400/BCE3E0/00A19C?text=Static+Mind",
        category: "design",
        year: "2026",
        tags: ["Psychological Horror", "Unity", "Game Design", "Level Design", "Narrative Design", "Player Psychology"],
        technologies: ["Unity", "C#", "Tilemaps", "UI Toolkit"],
        role: "Solo Developer",
        duration: "12 Weeks",
        engine: "Unity",
        platform: "PC (Windows)",
    },
    {
        id: 2,
        title: "Morabara Online",
        description: "A digital adaptation of the traditional African strategy board game Morabara, featuring online multiplayer and AI opponents with three difficulty levels.",
        fullDescription: "Morabara Online is a digital implementation of the traditional African strategy board game Morabara (also known as Twelve Men's Morris), a variant of the ancient game Nine Men's Morris popular in South Africa and Lesotho. The game supports three board variants: the standard twelve-piece Morabara, Nine Men's Morris, and Six Men's Morris. Players can compete against each other online using Unity Relay for connection management and lobby creation, or against an AI opponent with three distinct difficulty levels. The AI implements strategic decision-making including mill completion prioritisation, opponent mill blocking, and potential mill preservation, with behaviour scaling appropriately across Easy, Normal, and Hard difficulties. I was responsible for implementing the piece system using ScriptableObjects to enable efficient data management across variants, designing the user interface using Unity UI Toolkit for the setup screen and in-game HUD, and producing comprehensive user and technical documentation. The project follows a server-authoritative multiplayer architecture where all moves are validated on the host before being broadcast to clients, ensuring fair play and preventing cheating.",
        image: "https://placehold.co/600x400/BCE3E0/00A19C?text=Morabara+Online",
        category: "design",
        year: "2026",
        tags: ["Strategy", "Multiplayer", "AI", "UI Design", "Technical Documentation", "Unity", "Localisation/African Games"],
        technologies: ["Unity", "C#", "UI Toolkit", "Unity Netcode", "Unity Relay", "Git"],
        role: "UI Designer & Programmer",
        duration: "12 Weeks",
        engine: "Unity",
        platform: "PC (Windows)",
    },
    {
        id: 3,
        title: "e-plantShopping Page",
        description: "A React-based e-commerce web application where users can browse and purchase houseplants with a fully functional shopping cart system.",
        fullDescription: "e-plantShopping is a React-based e-commerce web application that allows users to browse a curated selection of houseplants and add them to a shopping cart. The application demonstrates component-based architecture, state management using Redux Toolkit, and dynamic UI rendering. Users can filter and view plant categories, add items to their cart, update quantities, and remove products. The cart state is managed globally using Redux, ensuring consistent updates across the application. The project also includes a responsive UI built with HTML and CSS, and implements key e-commerce features such as dynamic cart totals, product categorisation, and interactive user feedback. The system architecture follows modern React patterns including reusable components, unidirectional data flow, and global state management for scalability.",
        image: "https://placehold.co/600x400/BCE3E0/00A19C?text=e-plantShopping",
        category: "development",
        year: "2026",
        tags: ["React","Redux","E-Commerce","Frontend Development","State Management","UI Design"],
        technologies: ["React","Redux Toolkit","JavaScript","CSS","HTML" ],
        role: "Solo Developer",
        duration: "Project-Based (Academic Module)",
        engine: "React Framework",
        platfom: "Web (browser)",
    }
    ];

    function populateProjects() {
        const projectList = document.querySelector('.project-list');

        if(!projectList) return;

projectList.innerHTML = featuredProjects.map(project => 
            `<div class="project-card" data-id="${project.id}">
                <img class="project-card-image" src="${project.image}" alt="${project.title}" loading="lazy">
                <div class="project-card-content">
                    <span class="project-card-category">${project.category.toUpperCase()}</span>
                    <h3 class="project-card-title">${project.title}</h3>
                    <p class="project-card-description">${project.description.substring(0, 100)}${project.description.length > 100 ? '...' : ''}</p>
                    <div class="project-card-tags">
                        ${project.tags.slice(0, 3).map(tag => `<span class="project-tag">${tag}</span>`).join('')}
                    </div>
                    <button class="project-card-btn view-project" data-id="${project.id}">
                        View Project →
                    </button>
                </div>
            </div>
        `).join('');

        attachProjectEvents();
    }

    function attachProjectEvents() {
        document.querySelectorAll('.view-project').forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.stopPropagation();
                const id = btn.getAttribute('data-id');
                window.location.href = `projects.html?id=${id}`;
            });
        });

        document.querySelectorAll('.project-card').forEach(card => {
            card.addEventListener('click', () => {
                const id = card.getAttribute('data-id');
                window.location.href = `projects.html?id=${id}`;
            });
        });
    }

    const sections = document.querySelectorAll('section');

    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if(entry.isIntersecting) {
                entry.target.classList.add('show');
            }
        });
    }, {threshold: 0.1});

    sections.forEach(section => {
        section.classList.add('hidden');
        observer.observe(section);
    });

    const backBtn = document.createElement('button');
    backBtn.textContent = '↑';
    backBtn.className = 'back-to-top';
    document.body.appendChild(backBtn);

    Object.assign(backBtn.style, {
        position: 'fixed',
        bottom: '20px',
        right: '20px',
        display: 'none',
        padding: '10px',
        borderRadius: '50%',
        border: 'none',
        background: 'var(--accent)',
        color: 'white',
        cursor: 'pointer'
    });

    window.addEventListener('scroll', () => {
        backBtn.style.display = window.scrollY > 300 ? 'block' : 'none';
    });

    backBtn.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });

    function setActiveNavLink() {
        const current = window.location.pathname.split('/').pop();
        document.querySelectorAll('.nav-links a').forEach(link => {
            if (link.getAttribute('href') === current) {
                link.classList.add('active');
            }
        });
    }

    populateProjects();

    const readMoreBtn = document.querySelector('.about .btn.primary');

    if (readMoreBtn) {
        readMoreBtn.addEventListener('click', () => {
            window.location.href = 'about.html';
        });
    }

});
