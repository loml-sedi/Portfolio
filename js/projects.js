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

    const projectsData = [
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
        repoUrl: "ADD_LINK_HERE",
        demoUrl: "ADD_LINK_HERE",
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
        repoUrl: "ADD_LINK_HERE",
        demoUrl: "ADD_LINK_HERE",
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
        platform: "Web (Browser)",
        repoUrl: "ADD_LINK_HERE",
        demoUrl: "ADD_LINK_HERE",
},
{
    id: 4,
    title: "Mental",
    description: "A psychological experience exploring bipolar disorder through shifting moods, unstable perception, and dynamic gameplay systems that reflect emotional extremes.",
    fullDescription: "Mental is a psychological game that explores the lived experience of bipolar disorder through interactive systems that shift between contrasting emotional states. The player navigates environments that dynamically change based on mood fluctuations, altering visuals, mechanics, audio, and controls to reflect manic and depressive phases. During manic states, the game accelerates with heightened sensitivity, rapid movement, and overwhelming sensory input, while depressive states slow down interaction, reduce visibility, and restrict player agency. The project uses environmental storytelling and system-driven design to communicate emotional instability without explicit exposition. I was responsible for designing the core mood-switching system, implementing gameplay state transitions, and balancing the contrast between emotional phases to ensure both playability and thematic impact. The game aims to create empathy through mechanic-driven narrative design rather than dialogue or traditional storytelling.",
    image: "https://placehold.co/600x400/BCE3E0/00A19C?text=Mental",
    category: "design",
    year: "2026",
    tags: ["Psychological", "Narrative Design", "Game Mechanics", "Emotion Systems", "Unity", "Experimental Gameplay"],
    technologies: ["Unity", "C#", "UI Toolkit", "ScriptableObjects"],
    role: "Game Designer & Programmer",
    duration: "2 Weeks",
    engine: "Unity",
    platform: "PC (Windows)",
    repoUrl: "ADD_LINK_HERE",
    demoUrl: "ADD_LINK_HERE",
},
{
    id: 5,
    title: "Echoes of the Deep",
    description: "An atmospheric echo-location exploration game where players navigate unknown environments using sound waves instead of vision.",
    fullDescription: "Echoes of the Deep is an atmospheric exploration game built around echo-location mechanics, where the player navigates a dark, unknown environment using sound pulses instead of visual input. The world is intentionally obscured, forcing players to interpret spatial information through returning echoes that briefly reveal geometry, hazards, and points of interest. The core gameplay loop revolves around emitting sound waves, interpreting echo feedback, and gradually building a mental map of the environment. As the game progresses, environmental complexity increases, introducing layered spaces, misleading echoes, and sound-based puzzles that challenge spatial reasoning and memory. I was responsible for designing and implementing the echo-location system, including ray-based sound propagation, timed reveal mechanics, and environmental interaction feedback. The project focuses on sensory substitution as a core gameplay mechanic, translating vision-based navigation into an audio-driven experience that emphasises tension, uncertainty, and discovery.",
    image: "https://placehold.co/600x400/BCE3E0/00A19C?text=Echoes+of+the+Deep",
    category: "design",
    year: "2026",
    tags: ["Echo Location", "Puzzle", "Atmospheric", "Experimental Gameplay", "Level Design", "Audio Design"],
    technologies: ["Unity", "C#", "Audio Systems", "Raycasting"],
    role: "Game Designer & Programmer",
    duration: "2 Weeks",
    engine: "Unity",
    platform: "PC (Windows)",
    repoUrl: "ADD_LINK_HERE",
    demoUrl: "ADD_LINK_HERE",
},
{
    id: 6,
    title: "Portfolio Website — Design & Development Case Study",
    description: "A comprehensive UI/UX and front-end development case study for my personal portfolio, documenting the design process, technical implementation, and key decisions.",
    fullDescription: "This portfolio website was designed and developed as a personal branding project to demonstrate both technical and creative abilities. The objective was to create a responsive, accessible platform that would effectively showcase projects to potential employers and collaborators. The website features dynamic project cards generated from JavaScript data structures, category filtering, pagination, and interactive project modals. The interface uses a warm pastel colour palette to communicate creativity while maintaining readability, with typography choices that reflect modern design sensibilities. All content is generated dynamically, ensuring maintainability and scalability as new projects are added. The development process followed a mobile-first approach, with careful attention to responsive layouts, semantic HTML, and reusable CSS architecture. The project demonstrates component-based thinking without frameworks, showcasing vanilla JavaScript proficiency and CSS architecture skills.",
    image: "https://placehold.co/600x400/BCE3E0/00A19C?text=Portfolio+Website",
    category: "ui/ux",
    year: "2026",
    tags: ["UI Design", "UX Research", "Front-End Development", "Responsive Design", "JavaScript", "CSS Architecture", "Accessibility"],
    technologies: ["HTML5", "CSS3", "JavaScript", "Figma", "Git", "GitHub"],
    role: "UI/UX Designer & Front-End Developer",
    duration: "3 Weeks",
    engine: "Vanilla JS",
    platform: "Web (Browser)",
    repoUrl: "https://github.com/loml-sedi/Portfolio",
    demoUrl: "https://loml-sedi.github.io/Portfolio/",
    problem: "Existing portfolio templates often lacked personality or were overly complex, making it difficult to highlight work effectively. Many portfolios focus heavily on aesthetics but fail to help recruiters quickly understand the developer's skills and projects. The challenge was to create a portfolio that showcases projects clearly, is easy to navigate, demonstrates responsive web development, and reflects personal branding.",
    process: [
        "Research — Analysed portfolios from developers, designers, and creative technologists to identify patterns in navigation, layouts, and content presentation",
        "Wireframing — Created low-fidelity wireframes to establish page hierarchy, navigation structure, and responsive layouts before development",
        "Visual Design — Developed a warm pastel colour palette (peach, coral, teal, mint) with Poppins for headings and Inter for body text to balance creativity with readability",
        "Development — Built the interface using semantic HTML, modular CSS with custom properties, and vanilla JavaScript for dynamic content generation, filtering, pagination, and modals",
        "Testing — Validated responsive behaviour across devices, form validation functionality, and accessibility considerations including semantic HTML, colour contrast, and keyboard accessibility"
    ],
    outcome: "The completed portfolio successfully demonstrates both design and development skills, serving as a project showcase and practical JavaScript demonstration. Key outcomes include a fully responsive interface, maintainable dynamic content system, interactive filtering and pagination, and reusable CSS architecture using custom properties. The website effectively communicates the developer's capabilities to potential employers through thoughtful design and clean implementation."
},
{
    id: 7,
    title: "Professional Company Website (Work in Progress)",
    description: "Designing and developing a modern, responsive corporate website focused on professionalism, usability, and brand identity.",
    fullDescription: "This ongoing project involves the complete design and development of a professional company website. The goal is to create a clean, trustworthy, and responsive online presence that effectively communicates the company's services while maintaining a strong visual identity. The website is currently in development, with branding, interface design, and front-end implementation actively being refined.",
    image: "images/wip.jpeg",
    category: "ui/ux",
    year: "2026",
    tags: ["UI/UX Design","Web Design","Responsive Design","Front-End Development", "Brand Identity" ],
    role: "UI/UX Designer & Front-End Developer",
    duration: "Ongoing",
    tools: [ "Figma","HTML5","CSS3","JavaScript" ],
    repoUrl: "ADD_LINK_HERE",
    demoUrl: "ADD_LINK_HERE",
    problem: "The client required a modern and professional website that establishes credibility, showcases their services clearly, and provides an intuitive user experience across desktop and mobile devices. The existing online presence lacked visual hierarchy, consistent branding, and responsive layouts.",
    process: [
        "Research — Analysed modern corporate websites, competitor designs, and current UI/UX best practices to establish design direction.",
        "Branding & Design — Developed a professional colour palette based on the company's logo (#E6A026 and #0A0A0A), selected typography, created wireframes, and designed responsive page layouts in Figma.",
        "Development — Implemented the interface using HTML, CSS, and JavaScript with a focus on accessibility, responsiveness, and reusable components.",
        "Iteration — Continuously refining layouts, animations, navigation, and visual hierarchy based on ongoing testing and feedback."],
    outcome: "The project is currently a work in progress. Core branding, layouts, and responsive front-end components have been established, with ongoing improvements focused on performance, accessibility, visual polish, and user experience before final deployment."
}
];

let currentPage = 1;
let currentFilter = "all";
const itemsPerPage = 6;
let filteredProjects = [...projectsData];

const projectsGrid = document.getElementById('projectsGrid');
const paginationContainer = document.getElementById('pagination');
const filterButtons = document.querySelectorAll('.filter-btn');

function filterProjects() {
    if (currentFilter === "all") {
        filteredProjects = [...projectsData];
} else {
        filteredProjects = projectsData.filter(project => project.category === currentFilter);
    }
    currentPage = 1;
    renderProjects();
    renderPagination();
}

function getPaginatedProjects() {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return filteredProjects.slice(startIndex, endIndex);
}

function getTotalPages() {
    return Math.ceil(filteredProjects.length / itemsPerPage);
}

function renderProjects() {
    const paginatedProjects = getPaginatedProjects();

    if (paginatedProjects.length === 0) {
        projectsGrid.innerHTML = `
            <div class="no-projects">
                <p>No projects found in "${currentFilter}" category.</p>
                <button class="btn secondary" onclick="resetFilter()">View All Projects</button>
            </div>
        `;
        return;
    }
projectsGrid.innerHTML = paginatedProjects.map(project => `
        <div class="project-card" data-project-id="${project.id}">
            <img class="project-card-image" src="${project.image}" alt="${project.title}" loading="lazy">
            <div class="project-card-content">
                <span class="project-card-category">${project.category.toUpperCase()}</span>
                <h3 class="project-card-title">${project.title}</h3>
                <p class="project-card-description">${project.description.substring(0, 100)}${project.description.length > 100 ? '...' : ''}</p>
                <div class="project-card-tags">
                    ${project.tags.slice(0, 3).map(tag => `<span class="project-tag">${tag}</span>`).join('')}
                </div>
                <button class="project-card-btn view-project" data-id="${project.id}">View Project →</button>
            </div>
        </div>
    `).join('');

    document.querySelectorAll('.view-project').forEach(btn => {
    btn.addEventListener('click', function (e) {
        e.stopPropagation();
        const projectId = parseInt(this.getAttribute('data-id'));
        openProjectModal(projectId);
    });
});

document.querySelectorAll('.project-card').forEach(card => {
    card.addEventListener('click', function (e) {
        if (
            !e.target.classList.contains('view-project') &&
            !e.target.classList.contains('project-card-btn')
        ) {
            const projectId = parseInt(this.getAttribute('data-project-id'));
            openProjectModal(projectId);
        }
    });
});
}

function renderPagination() {
    const totalPages = getTotalPages();
    const pageInfo = document.getElementById('page-info');
    const prevBtn = document.getElementById('prev-btn');
    const nextBtn = document.getElementById('next-btn');

    if(pageInfo) {
        pageInfo.textContent = `Page ${currentPage} of ${totalPages || 1}`;
    }

    if(prevBtn) {
        prevBtn.disabled = currentPage === 1;
    }

    if(nextBtn){
        nextBtn.disabled = currentPage === totalPages || totalPages === 0;
    }
}

function changePage(direction) {
    const totalPages = getTotalPages();
    const newPage = currentPage + direction;

    if (newPage >= 1 && newPage <= totalPages) {
        currentPage = newPage;
        renderProjects();
        renderPagination();

        document.querySelector('.projects-grid-section').scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
}

function setFilter(filterValue){
    currentFilter = filterValue;

    filterProjects();
}

filterButtons.forEach(btn => {
    btn.addEventListener('click', function () {
        const filterValue = this.getAttribute('data-filter');
        setFilter(filterValue);
    });
});

function resetFilter() {
    setFilter("all");
}

function openProjectModal(id) {
    const project = projectsData.find(p => p.id === id);
    if (!project) return;

    document.querySelector('.project-modal')?.remove();

    const modal = document.createElement('div');
    modal.className = 'project-modal';

    modal.innerHTML = `
        <div class="modal-overlay"></div>

        <div class="modal-content">

            <button class="modal-close">&times;</button>

            <div class="modal-image">
                <img src="${project.image}" alt="${project.title}">
            </div>

            <div class="modal-info">

                <h2>${project.title}</h2>

                <div class="modal-meta">
                    <span class="modal-category">${project.category}</span>
                    <span class="modal-year">${project.year}</span>
                </div>

                <p class="modal-description">
                    ${project.fullDescription}
                </p>

                <div class="modal-section">
                    <h3>Role</h3>
                    <p>${project.role}</p>
                </div>

                ${project.problem ? `
                <div class="modal-section">
                    <h3>Problem</h3>
                    <p>${project.problem}</p>
                </div>` : ''}

                ${project.process ? `
                <div class="modal-section">
                    <h3>Process</h3>
                    <ul class="modal-process-list">
                        ${project.process.map(step => `<li>${step}</li>`).join('')}
                    </ul>
                </div>` : ''}

                ${project.outcome ? `
                <div class="modal-section">
                    <h3>Outcome</h3>
                    <p>${project.outcome}</p>
                </div>` : ''}

                ${(project.duration || project.engine || project.platform) ? `
                <div class="modal-section">
                    <h3>Project Details</h3>
                    ${project.duration ? `<p><strong>Duration:</strong> ${project.duration}</p>` : ''}
                    ${project.engine ? `<p><strong>Engine:</strong> ${project.engine}</p>` : ''}
                    ${project.platform ? `<p><strong>Platform:</strong> ${project.platform}</p>` : ''}
                </div>` : ''}

                ${(project.technologies || project.tools) ? `
                <div class="modal-section">
                    <h3>${project.technologies ? 'Technologies' : 'Tools'}</h3>
                    <div class="modal-tags">
                        ${(project.technologies || project.tools).map(t => `
                            <span class="project-tag">${t}</span>
                        `).join('')}
                    </div>
                </div>` : ''}

                <div class="modal-section">
                    <h3>Tags</h3>
                    <div class="modal-tags">
                        ${project.tags.map(t => `
                            <span class="project-tag">${t}</span>
                        `).join('')}
                    </div>
                </div>

                <div class="modal-links">
                    ${project.demoUrl && project.demoUrl !== 'ADD_LINK_HERE' ? `<a class="btn primary" href="${project.demoUrl}" target="_blank" rel="noopener noreferrer">View Live</a>` : ''}
                    ${project.repoUrl && project.repoUrl !== 'ADD_LINK_HERE' ? `<a class="btn secondary" href="${project.repoUrl}" target="_blank" rel="noopener noreferrer">View Code</a>` : ''}
                </div>

                <div class="modal-actions">
                    <button class="btn primary close-modal">Close</button>
                </div>

            </div>
        </div>
    `;

    document.body.appendChild(modal);
    document.body.style.overflow = 'hidden';

    const close = () => {
        modal.remove();
        document.body.style.overflow = '';
    };

    modal.querySelector('.modal-close').addEventListener('click', close);
    modal.querySelector('.close-modal').addEventListener('click', close);
    modal.querySelector('.modal-overlay').addEventListener('click', close);

    document.addEventListener('keydown', function esc(e) {
        if (e.key === 'Escape') {
            close();
            document.removeEventListener('keydown', esc);
        }
    });
}

function attachPaginationListeners() {
    const prevBtn = document.getElementById('prev-btn');
    const nextBtn = document.getElementById('next-btn');

    if (prevBtn) {
        prevBtn.addEventListener('click', () => changePage(-1));
    }

    if (nextBtn) {
        nextBtn.addEventListener('click', () => changePage(1));
    }
}

function setActiveNavLink() {
    const currentPage = window.location.pathname.split('/').pop();
    const navLinks = document.querySelectorAll('.nav-links a');
    
    navLinks.forEach(link => {
        const linkHref = link.getAttribute('href');
        if (linkHref === currentPage) {
            link.classList.add('active');
        }
    });
}

function openProjectFromURL() {
    const params = new URLSearchParams(window.location.search);
    const id = parseInt(params.get('id'));
    if (id) {
        openProjectModal(id);
    }
}

function init() {
    if (projectsGrid) {
        renderProjects();
        renderPagination();
        attachPaginationListeners();
    }

    setActiveNavLink();
    openProjectFromURL();
}

window.resetFilter = resetFilter;

document.addEventListener('DOMContentLoaded', init);

    