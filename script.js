
/* ================= DATA REPOSITORY ================= */
const portfolioData = {
  projects: [
    {
      id: 'food-truck',
      title: 'Food Truck Delivery System',
      category: 'MCA Project',
      status: 'Completed',
      stack: ['Python', 'FastAPI', 'Java', 'Android (XML)', 'SQL/SQLite', 'Retrofit', 'Docker'],
      description: 'Comprehensive ordering and delivery platform designed with three native Android apps for customers, food-truck owners, and delivery riders.',
      details: 'Planned and architected an end-to-end delivery ecosystem. Designed backend APIs using Python FastAPI with JWT authentication and WhatsApp OTP login workflows. Integrated real-time order tracking and location support using WebSockets, paired with native Android clients built in Java.',
      contributions: 'Full-stack development, FastAPI backend architecture, REST APIs, database schema design, and Android app integration via Retrofit.',
      github: 'https://github.com/shettygautham6',
      demo: null,
      imageBg: 'linear-gradient(135deg, #1f3c88, #111)'
    },
    {
      id: 'agro-fertility',
      title: 'AgroFertility Smart Agriculture Platform',
      category: 'MCA Project',
      status: 'Completed',
      stack: ['PHP 8.3', 'MySQL', 'Apache', 'Role-Based Access Control'],
      description: 'Agricultural e-commerce and recommendation platform providing soil, crop, and season-based fertilizer recommendations.',
      details: 'Developed a robust web platform featuring cart and order management workflows, delivery-agent tracking, government scheme information repository, and automated GST invoice generation.',
      contributions: 'Backend engineering in PHP 8.3, relational database design in MySQL, RBAC security implementation, and recommendation logic.',
      github: 'https://github.com/shettygautham6',
      demo: null,
      imageBg: 'linear-gradient(135deg, #28527a, #111)'
    },
    {
      id: 'autohub-info',
      title: 'AutoHub Info',
      category: 'BCA Project',
      status: 'Completed',
      stack: ['HTML', 'CSS', 'JavaScript', 'PHP', 'MySQL'],
      description: 'Car information portal featuring brand and model specifications, price filtering, comparison tools, and test-drive booking.',
      details: 'Built a responsive automotive web platform with dynamic car comparisons, an integrated EMI calculator, and a database-backed test-drive booking interface.',
      contributions: 'Frontend UI design, PHP server-side scripting, database queries, and interactive calculator logic.',
      github: 'https://github.com/shettygautham6',
      demo: null,
      imageBg: 'linear-gradient(135deg, #881f1f, #111)'
    }
  ],
  skills: [
    { id: 'python-fastapi', title: 'Python & FastAPI', category: 'Backend', desc: 'Building high-performance async REST APIs, robust routing, and secure endpoints.' },
    { id: 'php-mysql', title: 'PHP & MySQL', category: 'Backend & DB', desc: 'Server-side scripting, relational database management, and structured queries.' },
    { id: 'js-web', title: 'JavaScript, HTML & CSS', category: 'Frontend', desc: 'Responsive web interfaces, DOM manipulation, and modern styling.' },
    { id: 'java-android', title: 'Java & Android (XML)', category: 'Mobile', desc: 'Native Android application development and UI layout design.' },
    { id: 'sql-sqlite', title: 'SQL & SQLite', category: 'Database', desc: 'Database design, normalization, and embedded mobile data storage.' },
    { id: 'git-docker', title: 'Git, GitHub & Docker', category: 'DevOps & Tools', desc: 'Version control, repository management, and containerized deployment workflows.' }
  ],
  education: [
    { id: 'mca', title: 'Master of Computer Applications (MCA)', institution: 'Poornaprajna Institute of Management, Udupi', date: 'In progress', desc: 'Advanced computer applications, software engineering, and systems architecture.' },
    { id: 'bca', title: 'Bachelor of Computer Applications (BCA)', institution: 'Mahatma Gandhi Memorial College, Udupi (Mangalore University)', date: 'June 2025', desc: 'CGPA 8.25 | 74.31% aggregate score in core computer science.' },
    { id: 'pu', title: 'Pre-University Education', institution: 'S R Pre University College, Hebri', date: 'Completed', desc: 'Achieved 92.83% academic standing.' },
    { id: 'sslc', title: 'SSLC / Class 10 (CBSE)', institution: 'Sr Public School, Hebri', date: 'Completed', desc: 'Achieved 74.1% academic standing.' }
  ],
  strengths: [
    { id: 'problem-solving', title: 'Problem Solving', category: 'Strength', desc: 'Analytical approach to breaking down complex technical requirements into modular solutions.' },
    { id: 'full-stack', title: 'Full-Stack Thinking', category: 'Strength', desc: 'Comprehensive understanding of database design, backend APIs, and frontend interfaces.' },
    { id: 'database-design', title: 'Database Design', category: 'Strength', desc: 'Designing optimized relational schemas, efficient queries, and secure data storage.' },
    { id: 'documentation', title: 'Documentation', category: 'Strength', desc: 'Clear code documentation, architectural mapping, and thorough project reporting.' }
  ]
};

let currentProfile = 'recruiter';
let browsingHistory = [];
let introTimeout = null;

/* ================= INITIALIZATION & INTRO LOGIC ================= */
window.addEventListener('DOMContentLoaded', () => {
  const introPlayed = sessionStorage.getItem('gautham_intro_played');
  if (introPlayed) {
    const intro = document.getElementById('cinematic-intro');
    if (intro) intro.style.display = 'none';
    const profileScreen = document.getElementById('profile-screen');
    if (profileScreen) profileScreen.classList.remove('hidden');
  } else {
    introTimeout = setTimeout(() => {
      skipIntro();
    }, 3500);
  }

  const skipBtn = document.getElementById('skip-intro-btn');
  if (skipBtn) skipBtn.addEventListener('click', skipIntro);

  window.addEventListener('scroll', () => {
    const navbar = document.getElementById('navbar');
    if (navbar) {
      if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
      } else {
        navbar.classList.remove('scrolled');
      }
    }
  });

  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      closeModal();
      closeSearch();
    }
  });

  loadContentRows();
  loadBrowsingHistory();
});

function skipIntro() {
  if (introTimeout) clearTimeout(introTimeout);
  const intro = document.getElementById('cinematic-intro');
  if (!intro || intro.style.display === 'none') return;
  intro.classList.add('fade-out');
  try {
    sessionStorage.setItem('gautham_intro_played', 'true');
  } catch (err) {
    console.warn('SessionStorage error:', err);
  }
  setTimeout(() => {
    intro.style.display = 'none';
    const profileScreen = document.getElementById('profile-screen');
    if (profileScreen) profileScreen.classList.remove('hidden');
  }, 800);
}

function replayIntro(e) {
  if (e) e.preventDefault();
  const intro = document.getElementById('cinematic-intro');
  const mainApp = document.getElementById('main-app');
  const profileScreen = document.getElementById('profile-screen');
  
  if (mainApp) mainApp.classList.remove('active');
  if (profileScreen) profileScreen.classList.add('hidden');
  if (intro) {
    intro.style.display = 'flex';
    intro.classList.remove('fade-out');
  }
  
  introTimeout = setTimeout(() => {
    skipIntro();
  }, 3500);
}

/* ================= PROFILE SELECTION ================= */
function selectProfile(profile) {
  currentProfile = profile;
  const profileScreen = document.getElementById('profile-screen');
  const mainApp = document.getElementById('main-app');

  if (profileScreen) profileScreen.classList.add('hidden');
  if (mainApp) mainApp.classList.add('active');

  const avatarContainer = document.getElementById('current-profile-avatar');
  if (avatarContainer) {
    if (profile === 'recruiter') {
      avatarContainer.innerHTML = '<i class="fa-solid fa-briefcase"></i>';
    } else if (profile === 'developer') {
      avatarContainer.innerHTML = '<i class="fa-solid fa-code"></i>';
    } else {
      avatarContainer.innerHTML = '<i class="fa-solid fa-compass"></i>';
    }
  }

  updateRecommendations();
}

function switchProfile() {
  const mainApp = document.getElementById('main-app');
  const profileScreen = document.getElementById('profile-screen');
  if (mainApp) mainApp.classList.remove('active');
  if (profileScreen) profileScreen.classList.remove('hidden');
}

/* ================= CONTENT RENDERING ================= */
function loadContentRows() {
  const projectsRow = document.getElementById('projects-row');
  if (projectsRow) {
    projectsRow.innerHTML = portfolioData.projects.map(p => `
      <div class="poster-card" onclick="openProjectModal('${p.id}')" onkeydown="if(event.key==='Enter'||event.key===' '){event.preventDefault();openProjectModal('${p.id}');}" tabindex="0" role="button" aria-label="${escapeHtml(p.title)}">
        <div class="poster-img-container" style="background: ${p.imageBg}">
          <div class="poster-badge">${escapeHtml(p.status)}</div>
          <div>
            <div class="poster-title">${escapeHtml(p.title)}</div>
            <div class="poster-tags">${escapeHtml(p.category)} • ${escapeHtml(p.stack.slice(0,3).join(', '))}</div>
            <div class="poster-meta"><i class="fa-solid fa-check"></i> Project Details</div>
          </div>
        </div>
      </div>
    `).join('');
  }

  const skillsRow = document.getElementById('skills-row');
  if (skillsRow) {
    skillsRow.innerHTML = portfolioData.skills.map(s => `
      <div class="poster-card" onclick="openSkillModal('${s.id}')" onkeydown="if(event.key==='Enter'||event.key===' '){event.preventDefault();openSkillModal('${s.id}');}" tabindex="0" role="button" aria-label="${escapeHtml(s.title)}">
        <div class="poster-img-container" style="background: linear-gradient(135deg, #2b2b2b, #111);">
          <div class="poster-badge">${escapeHtml(s.category)}</div>
          <div>
            <div class="poster-title">${escapeHtml(s.title)}</div>
            <div class="poster-tags">${escapeHtml(s.desc)}</div>
            <div class="poster-meta"><i class="fa-solid fa-layer-group"></i> Core Skill</div>
          </div>
        </div>
      </div>
    `).join('');
  }

  const educationRow = document.getElementById('education-row');
  if (educationRow) {
    educationRow.innerHTML = portfolioData.education.map(e => `
      <div class="poster-card tall" onclick="openEducationModal('${e.id}')" onkeydown="if(event.key==='Enter'||event.key===' '){event.preventDefault();openEducationModal('${e.id}');}" tabindex="0" role="button" aria-label="${escapeHtml(e.title)}">
        <div class="poster-img-container" style="background: linear-gradient(135deg, #333, #141414);">
          <div class="poster-badge">${escapeHtml(e.date)}</div>
          <div>
            <div class="poster-title" style="font-size: 1rem; margin-bottom: 8px;">${escapeHtml(e.title)}</div>
            <div style="font-size: 0.85rem; color: #b3b3b3; margin-bottom: 10px;">${escapeHtml(e.institution)}</div>
          </div>
          <div class="poster-meta"><i class="fa-solid fa-graduation-cap"></i> Academic Record</div>
        </div>
      </div>
    `).join('');
  }

  const strengthsRow = document.getElementById('strengths-row');
  if (strengthsRow) {
    strengthsRow.innerHTML = portfolioData.strengths.map(st => `
      <div class="poster-card" onclick="openStrengthModal('${st.id}')" onkeydown="if(event.key==='Enter'||event.key===' '){event.preventDefault();openStrengthModal('${st.id}');}" tabindex="0" role="button" aria-label="${escapeHtml(st.title)}">
        <div class="poster-img-container" style="background: linear-gradient(135deg, #1f1f1f, #0a0a0a);">
          <div class="poster-badge">Strength</div>
          <div>
            <div class="poster-title">${escapeHtml(st.title)}</div>
            <div class="poster-tags">${escapeHtml(st.desc)}</div>
            <div class="poster-meta"><i class="fa-solid fa-shield-halved"></i> Competency</div>
          </div>
        </div>
      </div>
    `).join('');
  }
}

function updateRecommendations() {
  const recRow = document.getElementById('recommendations-row');
  const recTitle = document.getElementById('recommendations-title');
  if (!recRow || !recTitle) return;
  
  let items = [];
  if (currentProfile === 'recruiter') {
    recTitle.innerHTML = 'Recommended for Recruiters <span>Strongest projects & resume highlights</span>';
    items = [portfolioData.projects[0], portfolioData.projects[1], portfolioData.skills[0], portfolioData.education[1]];
  } else if (currentProfile === 'developer') {
    recTitle.innerHTML = 'Recommended for Developers <span>Architecture, stack & source code</span>';
    items = [portfolioData.projects[0], portfolioData.skills[0], portfolioData.skills[4], portfolioData.skills[5]];
  } else {
    recTitle.innerHTML = 'Recommended for Explorers <span>Background, learning journey & vision</span>';
    items = [portfolioData.education[0], portfolioData.projects[1], portfolioData.strengths[0], portfolioData.strengths[1]];
  }

  recRow.innerHTML = items.map(item => `
    <div class="poster-card" onclick="handleRecommendationClick('${item.id}')" onkeydown="if(event.key==='Enter'||event.key===' '){event.preventDefault();handleRecommendationClick('${item.id}');}" tabindex="0" role="button" aria-label="${escapeHtml(item.title)}">
      <div class="poster-img-container" style="background: linear-gradient(135deg, #381d1d, #141414);">
        <div class="poster-badge">Curated</div>
        <div>
          <div class="poster-title">${escapeHtml(item.title)}</div>
          <div class="poster-tags">${escapeHtml(item.description || item.institution || item.desc)}</div>
          <div class="poster-meta"><i class="fa-solid fa-star"></i> Profile Match</div>
        </div>
      </div>
    </div>
  `).join('');
}

function handleRecommendationClick(id) {
  if (portfolioData.projects.some(p => p.id === id)) {
    openProjectModal(id);
  } else if (portfolioData.skills.some(s => s.id === id)) {
    openSkillModal(id);
  } else if (portfolioData.education.some(e => e.id === id)) {
    openEducationModal(id);
  } else if (portfolioData.strengths.some(st => st.id === id)) {
    openStrengthModal(id);
  }
}

function scrollRow(rowId, direction) {
  const row = document.getElementById(rowId);
  if (row) {
    const scrollAmount = 320 * direction;
    row.scrollBy({ left: scrollAmount, behavior: 'smooth' });
  }
}

/* ================= MODAL EXPERIENCES ================= */
function openProjectModal(projectId) {
  const project = portfolioData.projects.find(p => p.id === projectId);
  if (!project) return;

  addToHistory({ id: project.id, title: project.title, type: 'Project' });

  const modalArea = document.getElementById('modal-content-area');
  if (modalArea) {
    modalArea.innerHTML = `
      <div class="modal-hero" style="background: ${project.imageBg}">
        <div class="modal-hero-content">
          <div class="hero-badge">${escapeHtml(project.category)} • ${escapeHtml(project.status)}</div>
          <h2 class="modal-title" id="modal-title">${escapeHtml(project.title)}</h2>
          <div class="modal-actions">
            <a href="${project.github}" target="_blank" rel="noopener noreferrer" class="btn-netflix primary"><i class="fa-brands fa-github"></i> View Repository</a>
            <button class="btn-netflix secondary" onclick="closeModal()">Back to Browse</button>
          </div>
        </div>
      </div>
      <div class="modal-body">
        <div class="modal-grid">
          <div>
            <h3 class="modal-section-title">Project Overview</h3>
            <p class="modal-text">${escapeHtml(project.description)}</p>
            <h3 class="modal-section-title">Implementation Details</h3>
            <p class="modal-text">${escapeHtml(project.details)}</p>
            <h3 class="modal-section-title">My Contribution</h3>
            <p class="modal-text">${escapeHtml(project.contributions)}</p>
          </div>
          <div>
            <h3 class="modal-section-title">Technology Stack</h3>
            <div class="modal-tag-list">
              ${project.stack.map(t => `<span class="modal-tag">${escapeHtml(t)}</span>`).join('')}
            </div>
            <h3 class="modal-section-title">Status</h3>
            <p class="modal-text"><strong>${escapeHtml(project.status)}</strong> (Verified against project implementation)</p>
          </div>
        </div>
      </div>
    `;
  }

  const modal = document.getElementById('detail-modal');
  if (modal) modal.classList.add('active');
}

function openSkillModal(skillId) {
  const skill = portfolioData.skills.find(s => s.id === skillId);
  if (!skill) return;

  addToHistory({ id: skill.id, title: skill.title, type: 'Skill' });

  const modalArea = document.getElementById('modal-content-area');
  if (modalArea) {
    modalArea.innerHTML = `
      <div class="modal-hero" style="background: linear-gradient(135deg, #111, #333);">
        <div class="modal-hero-content">
          <div class="hero-badge">Technical Competency</div>
          <h2 class="modal-title" id="modal-title">${escapeHtml(skill.title)}</h2>
          <div class="modal-actions">
            <button class="btn-netflix secondary" onclick="closeModal()">Back to Browse</button>
          </div>
        </div>
      </div>
      <div class="modal-body">
        <h3 class="modal-section-title">Category</h3>
        <p class="modal-text">${escapeHtml(skill.category)}</p>
        <h3 class="modal-section-title">Description</h3>
        <p class="modal-text">${escapeHtml(skill.desc)}</p>
        <h3 class="modal-section-title">Practical Application</h3>
        <p class="modal-text">Applied across academic projects including full-stack web applications, REST APIs, and database-backed platforms.</p>
      </div>
    `;
  }

  const modal = document.getElementById('detail-modal');
  if (modal) modal.classList.add('active');
}

function openEducationModal(eduId) {
  const edu = portfolioData.education.find(e => e.id === eduId);
  if (!edu) return;

  addToHistory({ id: edu.id, title: edu.title, type: 'Education' });

  const modalArea = document.getElementById('modal-content-area');
  if (modalArea) {
    modalArea.innerHTML = `
      <div class="modal-hero" style="background: linear-gradient(135deg, #111, #442222);">
        <div class="modal-hero-content">
          <div class="hero-badge">Academic Milestone</div>
          <h2 class="modal-title" id="modal-title">${escapeHtml(edu.title)}</h2>
          <div class="modal-actions">
            <button class="btn-netflix secondary" onclick="closeModal()">Back to Browse</button>
          </div>
        </div>
      </div>
      <div class="modal-body">
        <h3 class="modal-section-title">Institution</h3>
        <p class="modal-text">${escapeHtml(edu.institution)}</p>
        <h3 class="modal-section-title">Timeline & Status</h3>
        <p class="modal-text">${escapeHtml(edu.date)}</p>
        <h3 class="modal-section-title">Details</h3>
        <p class="modal-text">${escapeHtml(edu.desc)}</p>
      </div>
    `;
  }

  const modal = document.getElementById('detail-modal');
  if (modal) modal.classList.add('active');
}

function openStrengthModal(strengthId) {
  const strength = portfolioData.strengths.find(st => st.id === strengthId);
  if (!strength) return;

  addToHistory({ id: strength.id, title: strength.title, type: 'Strength' });

  const modalArea = document.getElementById('modal-content-area');
  if (modalArea) {
    modalArea.innerHTML = `
      <div class="modal-hero" style="background: linear-gradient(135deg, #222, #111);">
        <div class="modal-hero-content">
          <div class="hero-badge">Professional Competency</div>
          <h2 class="modal-title" id="modal-title">${escapeHtml(strength.title)}</h2>
          <div class="modal-actions">
            <button class="btn-netflix secondary" onclick="closeModal()">Back to Browse</button>
          </div>
        </div>
      </div>
      <div class="modal-body">
        <h3 class="modal-section-title">Core Competency</h3>
        <p class="modal-text">${escapeHtml(strength.desc)}</p>
        <h3 class="modal-section-title">Engineering Approach</h3>
        <p class="modal-text">Demonstrated through structured problem solving, robust architecture design, and comprehensive documentation in academic and practical applications.</p>
      </div>
    `;
  }

  const modal = document.getElementById('detail-modal');
  if (modal) modal.classList.add('active');
}

function openResumeModal(e) {
  if (e) e.preventDefault();
  const modalArea = document.getElementById('modal-content-area');
  if (modalArea) {
    modalArea.innerHTML = `
      <div class="modal-hero" style="background: linear-gradient(135deg, #141414, #2b2b2b);">
        <div class="modal-hero-content">
          <div class="hero-badge">Professional Resume</div>
          <h2 class="modal-title" id="modal-title">Gautham R Shetty — Resume</h2>
          <div class="modal-actions">
            <a href="extracted_files/Gautham_Resume.pdf" download="Gautham_Resume.pdf" class="btn-netflix primary"><i class="fa-solid fa-download"></i> Download PDF Resume</a>
            <button class="btn-netflix secondary" onclick="closeModal()">Close</button>
          </div>
        </div>
      </div>
      <div class="modal-body" style="font-family: monospace; font-size: 0.9rem; line-height: 1.6; color: #ddd;">
        <h3 style="color:var(--netflix-red); margin-bottom:10px;">CONTACT</h3>
        <p>Email: shettygautham6@gmail.com</p>
        <p>LinkedIn: linkedin.com/in/gautham-shetty-9a00a7321</p>
        <p>GitHub: github.com/shettygautham6</p>
        
        <h3 style="color:var(--netflix-red); margin:20px 0 10px;">PROFESSIONAL SUMMARY</h3>
        <p>Computer Applications graduate, currently completing an MCA, with hands-on project experience across the full stack: web information systems, an agricultural e-commerce and recommendation platform, and a multi-app Android food ordering and delivery system. Skilled in Python (FastAPI), PHP, JavaScript and relational databases, with practical exposure to authentication (JWT, OTP), real-time updates via WebSockets, and role-based access.</p>

        <h3 style="color:var(--netflix-red); margin:20px 0 10px;">TECHNICAL SKILLS</h3>
        <p>HTML, CSS, JavaScript | PHP & MySQL | Python & FastAPI | Java & Android (XML) | SQL/SQLite | REST APIs | JWT Authentication | WebSockets | Docker, Retrofit | Git & GitHub</p>

        <h3 style="color:var(--netflix-red); margin:20px 0 10px;">EDUCATION</h3>
        <p><strong>Master of Computer Applications (MCA)</strong> - Poornaprajna Institute of Management, Udupi</p>
        <p><strong>Bachelor of Computer Applications (BCA)</strong> - Mahatma Gandhi Memorial College, Udupi | Mangalore University (74.31% | CGPA 8.25)</p>
      </div>
    `;
  }

  const modal = document.getElementById('detail-modal');
  if (modal) modal.classList.add('active');
}

function closeModal() {
  const modal = document.getElementById('detail-modal');
  if (modal) modal.classList.remove('active');
}

/* ================= SEARCH & HISTORY LOGIC ================= */
function openSearch() {
  const overlay = document.getElementById('search-overlay');
  if (overlay) overlay.classList.add('active');
  const input = document.getElementById('search-input');
  if (input) input.focus();
}

function closeSearch() {
  const overlay = document.getElementById('search-overlay');
  if (overlay) overlay.classList.remove('active');
}

function handleSearch(e) {
  const query = e.target.value.toLowerCase().trim();
  const resultsGrid = document.getElementById('search-results-grid');
  if (!resultsGrid) return;

  if (!query) {
    resultsGrid.innerHTML = '';
    return;
  }

  const matchedProjects = portfolioData.projects.filter(p => 
    p.title.toLowerCase().includes(query) || 
    p.description.toLowerCase().includes(query) ||
    p.stack.some(st => st.toLowerCase().includes(query))
  );

  const matchedSkills = portfolioData.skills.filter(s =>
    s.title.toLowerCase().includes(query) ||
    s.desc.toLowerCase().includes(query)
  );

  const matchedEdu = portfolioData.education.filter(ed =>
    ed.title.toLowerCase().includes(query) ||
    ed.institution.toLowerCase().includes(query)
  );

  const matchedStrengths = portfolioData.strengths.filter(st =>
    st.title.toLowerCase().includes(query) ||
    st.desc.toLowerCase().includes(query)
  );

  const allMatches = [...matchedProjects, ...matchedSkills, ...matchedEdu, ...matchedStrengths];

  if (allMatches.length === 0) {
    resultsGrid.innerHTML = `<div style="grid-column: 1/-1; text-align: center; color: var(--netflix-gray); padding: 40px;">No results found for "${escapeHtml(query)}"</div>`;
    return;
  }

  resultsGrid.innerHTML = allMatches.map(m => `
    <div class="poster-card" onclick="handleSearchResultClick('${m.id}')" tabindex="0" role="button">
      <div class="poster-img-container" style="background: linear-gradient(135deg, #222, #111);">
        <div class="poster-badge">${escapeHtml(m.category || m.type || 'Result')}</div>
        <div>
          <div class="poster-title">${escapeHtml(m.title)}</div>
          <div class="poster-tags">${escapeHtml(m.description || m.desc || m.institution)}</div>
        </div>
      </div>
    </div>
  `).join('');
}

function handleSearchResultClick(id) {
  closeSearch();
  if (portfolioData.projects.some(p => p.id === id)) {
    openProjectModal(id);
  } else if (portfolioData.skills.some(s => s.id === id)) {
    openSkillModal(id);
  } else if (portfolioData.education.some(e => e.id === id)) {
    openEducationModal(id);
  } else if (portfolioData.strengths.some(st => st.id === id)) {
    openStrengthModal(id);
  }
}

function addToHistory(item) {
  if (!browsingHistory.some(h => h.id === item.id)) {
    browsingHistory.unshift(item);
    if (browsingHistory.length > 6) browsingHistory.pop();
    
    try {
      localStorage.setItem('gautham_browsing_history', JSON.stringify(browsingHistory));
    } catch (err) {
      console.warn('LocalStorage error:', err);
    }
    renderContinueExploring();
  }
}

function loadBrowsingHistory() {
  try {
    const stored = localStorage.getItem('gautham_browsing_history');
    if (stored) {
      browsingHistory = JSON.parse(stored);
      renderContinueExploring();
    }
  } catch (err) {
    console.warn('Failed to parse browsing history:', err);
    browsingHistory = [];
  }
}

function renderContinueExploring() {
  const section = document.getElementById('continue-row-section');
  const row = document.getElementById('continue-row');
  if (!section || !row) return;

  if (browsingHistory.length === 0) {
    section.style.display = 'none';
    return;
  }

  section.style.display = 'block';
  row.innerHTML = browsingHistory.map(h => `
    <div class="poster-card" onclick="handleSearchResultClick('${h.id}')" tabindex="0" role="button">
      <div class="poster-img-container" style="background: linear-gradient(135deg, #1b365d, #111);">
        <div class="poster-badge">${escapeHtml(h.type)}</div>
        <div>
          <div class="poster-title">${escapeHtml(h.title)}</div>
          <div class="poster-tags">Recently Viewed</div>
        </div>
      </div>
    </div>
  `).join('');
}

function clearBrowsingHistory() {
  browsingHistory = [];
  try {
    localStorage.removeItem('gautham_browsing_history');
  } catch (err) {
    console.warn('LocalStorage error:', err);
  }
  const section = document.getElementById('continue-row-section');
  if (section) section.style.display = 'none';
  alert('Browsing history cleared successfully.');
}

/* ================= CONTACT FORM HANDLING ================= */
function handleContactSubmit(e) {
  e.preventDefault();
  const nameEl = document.getElementById('contact-name');
  const emailEl = document.getElementById('contact-email');
  const messageEl = document.getElementById('contact-message');
  const statusDiv = document.getElementById('form-status');
  const submitBtn = document.getElementById('submit-btn');

  if (!nameEl || !emailEl || !messageEl || !statusDiv || !submitBtn) return;

  const name = nameEl.value.trim();
  const email = emailEl.value.trim();
  const message = messageEl.value.trim();

  // Basic email validation regex
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!name || !email || !message) {
    statusDiv.className = 'form-status error';
    statusDiv.innerText = 'Please fill in all required fields.';
    return;
  }

  if (!emailRegex.test(email)) {
    statusDiv.className = 'form-status error';
    statusDiv.innerText = 'Please enter a valid email address.';
    return;
  }

  submitBtn.disabled = true;
  submitBtn.innerText = 'Preparing mailto...';

  setTimeout(() => {
    statusDiv.className = 'form-status success';
    statusDiv.innerText = `Thank you, ${name}! Your message draft has been prepared for shettygautham6@gmail.com. Opening your email app...`;
    
    const mailtoLink = document.createElement('a');
    mailtoLink.href = `mailto:shettygautham6@gmail.com?subject=Portfolio Inquiry from ${encodeURIComponent(name)}&body=${encodeURIComponent(message + "\n\nFrom: " + email)}`;
    mailtoLink.click();

    const form = document.getElementById('contact-form');
    if (form) form.reset();
    submitBtn.disabled = false;
    submitBtn.innerText = 'Send Message';
  }, 800);
}

/* ================= UTILS ================= */
function escapeHtml(str) {
  if (!str) return '';
  return str.replace(/&/g, "&amp;")
            .replace(/</g, "&lt;")
            .replace(/>/g, "&gt;")
            .replace(/"/g, "&quot;")
            .replace(/'/g, "&#039;");
}
