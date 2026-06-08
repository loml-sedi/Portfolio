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
        image: "images/staticmind-cover.png",
        category: "design",
        year: "2026",
        tags: ["Psychological Horror", "Unity", "Game Design", "Level Design", "Narrative Design", "Player Psychology"],
        technologies: ["Unity", "C#", "Tilemaps", "UI Toolkit"],
        role: "Solo Developer",
        duration: "12 Weeks",
        engine: "Unity 6",
        platform: "PC",
    },
    {
        id: 2,
        title: "Morabara Online",
        description: "A digital adaptation of the traditional African strategy board game Morabara, featuring online multiplayer and AI opponents with three difficulty levels.",
        fullDescription: "Morabara Online is a digital implementation of the traditional African strategy board game Morabara (also known as Twelve Men's Morris), a variant of the ancient game Nine Men's Morris popular in South Africa and Lesotho. The game supports three board variants: the standard twelve-piece Morabara, Nine Men's Morris, and Six Men's Morris. Players can compete against each other online using Unity Relay for connection management and lobby creation, or against an AI opponent with three distinct difficulty levels. The AI implements strategic decision-making including mill completion prioritisation, opponent mill blocking, and potential mill preservation, with behaviour scaling appropriately across Easy, Normal, and Hard difficulties. I was responsible for implementing the piece system using ScriptableObjects to enable efficient data management across variants, designing the user interface using Unity UI Toolkit for the setup screen and in-game HUD, and producing comprehensive user and technical documentation. The project follows a server-authoritative multiplayer architecture where all moves are validated on the host before being broadcast to clients, ensuring fair play and preventing cheating.",
        image: "images/morabara-cover.png",
        category: "design",
        year: "2026",
        tags: ["Strategy", "Multiplayer", "AI", "UI Design", "Technical Documentation", "Unity", "Localisation/African Games"],
        technologies: ["Unity", "C#", "UI Toolkit", "Unity Netcode", "Unity Relay", "Git"],
        role: "UI Designer & Programmer",
        duration: "12 Weeks",
        engine: "Unity 6000.3.6f1",
        platform: "PC (Windows)",
    },

    {
    id: 3,
    title: "e-plantShopping Page",
    description: "A React-based e-commerce web application where users can browse and purchase houseplants with a fully functional shopping cart system.",
    fullDescription: "e-plantShopping is a React-based e-commerce web application that allows users to browse a curated selection of houseplants and add them to a shopping cart. The application demonstrates component-based architecture, state management using Redux Toolkit, and dynamic UI rendering. Users can filter and view plant categories, add items to their cart, update quantities, and remove products. The cart state is managed globally using Redux, ensuring consistent updates across the application. The project also includes a responsive UI built with HTML and CSS, and implements key e-commerce features such as dynamic cart totals, product categorisation, and interactive user feedback. The system architecture follows modern React patterns including reusable components, unidirectional data flow, and global state management for scalability.",
    image: "images/e-plantshopping-cover.png",
    category: "development",
    year: "2026",
    tags: [
        "React",
        "Redux",
        "E-Commerce",
        "Frontend Development",
        "State Management",
        "UI Design"
    ],
    technologies: [
        "React",
        "Redux Toolkit",
        "JavaScript",
        "CSS",
        "HTML"
    ],
    role: "Solo Developer",
    duration: "Project-Based (Academic Module)",
    engine: "React Framework",
    platform: "Web (Browser)"
},
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

                <div class="modal-section">
                    <h3>Project Details</h3>
                    <p><strong>Duration:</strong> ${project.duration}</p>
                    <p><strong>Engine:</strong> ${project.engine}</p>
                    <p><strong>Platform:</strong> ${project.platform}</p>
                </div>

                <div class="modal-section">
                    <h3>Technologies</h3>
                    <div class="modal-tags">
                        ${project.technologies.map(t => `
                            <span class="project-tag">${t}</span>
                        `).join('')}
                    </div>
                </div>

                <div class="modal-section">
                    <h3>Tags</h3>
                    <div class="modal-tags">
                        ${project.tags.map(t => `
                            <span class="project-tag">${t}</span>
                        `).join('')}
                    </div>
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

function init() {
    if (projectsGrid) {
        renderProjects();
        renderPagination();
        attachPaginationListeners();
    }

    setActiveNavLink();
}

window.resetFilter = resetFilter;

document.addEventListener('DOMContentLoaded', init);

    