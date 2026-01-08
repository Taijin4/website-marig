import { useEffect, useRef, useState } from 'react'
import './Landing.css'
import marigAvatar from './assets/marig.jpg'

// Contenu des expertises
const expertiseContent: { [key: string]: { title: string; intro: string; items: string[]; footer: string } } = {
  "Change Management": {
    title: "Change Management",
    intro: "Type of change-management projects, I have worked on:",
    items: [
      "Organisational transformation (restructuring, new operating models)",
      "Digital transformation adoption (ERP/CRM rollouts, new tools, automation)",
      "Process change & optimisation (Lean, Agile, workflow redesign)",
      "Post-merger integration (harmonising teams, processes)",
      "Training & capability building (skills development, training programs)",
      "Communication & engagement strategy (campaigns, messaging, storytelling)"
    ],
    footer: "For more details, you can explore the projects linked to this expertise."
  },
  "Product Management": {
    title: "Product Management",
    intro: "Types of Product Management projects, I have worked on:",
    items: [
      "Product strategy & vision definition (aligning product roadmap with business goals)",
      "Market research & competitive analysis (user research, competitor benchmarking)",
      "Product roadmap planning & prioritisation (feature planning, backlog management)",
      "New product development (from ideation to MVP to launch)",
      "Feature design & delivery (requirements gathering, user stories, acceptance criteria)",
      "Agile delivery & sprint management (collaboration with development teams, sprint planning)",
      "Product performance & analytics (tracking KPIs, user behaviour, adoption metrics)",
      "Launch execution & user trainings (communication plan, launch campaigns, enablement)",
      "Product optimisation & continuous improvement (A/B testing, iteration, feedback loops)",
      "Stakeholder management & alignment (cross-functional coordination, leadership reporting)"
    ],
    footer: "Business domains: Recruitment, Referral, Sales, Training, Communities. For more details, you can explore the projects linked to this expertise."
  },
  "Sales Operations": {
    title: "Sales Operations",
    intro: "Types of sales operations missions, I worked on:",
    items: [
      "Sales process optimisation (pipeline management, qualification, workflows, sales cycle)",
      "Sales & CRM tooling implementation (Salesforce, HubSpot, automation, scoring)",
      "Sales performance analytics (KPIs, dashboards, forecasting, reporting)"
    ],
    footer: "For more details, you can explore the projects linked to this expertise."
  },
  "People strategy": {
    title: "People Strategy",
    intro: "Types of people-strategy missions, I have worked on:",
    items: [
      "HR strategy design (vision, priorities, roadmap)",
      "Workforce planning (skills forecasting, capacity planning, succession mapping)",
      "Talent acquisition strategy (employer branding, sourcing model, recruiting processes)",
      "Learning & development strategy (skills frameworks, training plans, leadership development)",
      "Performance management redesign (OKRs, KPIs, review cycles, feedback culture)",
      "People analytics & HR dashboards (KPIs, insights, predictive analytics)"
    ],
    footer: "For more details, you can explore the projects linked to this expertise."
  },
  "Knowledge Management": {
    title: "Knowledge Management",
    intro: "Types of knowledge management missions, I worked on:",
    items: [
      "Documentation audit & optimisation (review, consolidation, and standardisation of existing content)",
      "Knowledge base & information architecture (design and implementation of structured, easy-to-use repositories)",
      "Process & workflow documentation (capturing procedures, SOPs, and operational processes)",
      "Governance & adoption (ownership, maintenance, training, and continuous improvement)"
    ],
    footer: "For more details, you can explore the projects linked to this expertise."
  },
  "Learning & Development": {
    title: "Learning & Development",
    intro: "Types of L&D missions, I worked on:",
    items: [
      "Training needs analysis & Skills mapping (identifying gaps and defining learning priorities)",
      "Learning Management System (LMS) setup & configuration (platform deployment, user setup, course integration)",
      "Learning cycle & program management (onboarding, upskilling, reskilling, and ongoing learning initiatives)",
      "Training adoption & change support (communication, coaching, and supporting learner engagement)"
    ],
    footer: "For more details, you can explore the projects linked to this expertise."
  },
  "CRM implementation (+ATS)": {
    title: "CRM Implementation (+ATS)",
    intro: "Types of CRM/ATS implementation missions, I worked on:",
    items: [
      "System selection & requirements analysis (defining needs, evaluating CRM/ATS options)",
      "Configuration & setup (custom fields, workflows, pipelines, permissions, automation)",
      "Data migration & cleansing (auditing, cleaning, and importing existing data)",
      "Process design & alignment (adapting sales, recruitment, or operational processes to the system)",
      "Integration with existing tools (connecting CRM/ATS with marketing, billing, or internal platforms)",
      "User training & adoption support (guides, workshops, onboarding)",
      "Testing, QA & go-live support (ensuring functionality and smooth deployment)",
      "Post-launch optimization (performance monitoring, process improvements, feature enhancements)"
    ],
    footer: "For more details, you can explore the projects linked to this expertise."
  },
  "Data analysis": {
    title: "Data Analysis",
    intro: "Types of data analysis projects I have worked on:",
    items: [
      "Business & operational analytics (performance tracking, decision support)",
      "KPI definition & dashboarding (executive and operational dashboards)",
      "Data exploration & insights (trend analysis, root-cause analysis)",
      "Data quality & structuring (cleaning, modelling, consistency)",
      "Adoption & impact measurement (usage, ROI, efficiency metrics)"
    ],
    footer: "For more details, you can explore the projects linked to this expertise."
  },
  "Project Management": {
    title: "Project Management",
    intro: "Types of project management missions I have worked on:",
    items: [
      "End-to-end project delivery (from planning to execution and closure)",
      "Scope, timeline & budget management",
      "Risk & dependency management",
      "Cross-functional coordination (business, tech, HR, stakeholders)",
      "Agile & hybrid methodologies (Scrum, Kanban, Waterfall)",
      "Project governance & reporting (status tracking, decision support)"
    ],
    footer: "For more details, you can explore the projects linked to this expertise."
  },
  "Talent acquisition": {
    title: "Talent Acquisition",
    intro: "Types of talent acquisition projects I have worked on:",
    items: [
      "Recruitment strategy & process design",
      "Employer branding & candidate experience",
      "Sourcing & hiring funnel optimisation",
      "ATS implementation & optimisation",
      "Recruiter & hiring manager enablement",
      "Recruitment performance analytics (time-to-hire, quality of hire)"
    ],
    footer: "For more details, you can explore the projects linked to this expertise."
  },
  "Team Management": {
    title: "Team Management",
    intro: "Types of team management missions I have worked on:",
    items: [
      "Team structuring & role definition",
      "People leadership & coaching",
      "Performance management & goal setting",
      "Cross-functional team coordination",
      "Change leadership & team engagement",
      "Remote & hybrid team management"
    ],
    footer: "For more details, you can explore the projects linked to this expertise."
  }
}

// Hook pour les animations au scroll
function useScrollAnimation(options: { threshold?: number; rootMargin?: string; once?: boolean } = {}) {
  const [isVisible, setIsVisible] = useState(false)
  const ref = useRef<HTMLDivElement>(null)
  const { threshold = 0.1, rootMargin = '0px 0px -100px 0px', once = true } = options

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
          if (once && ref.current) {
            observer.unobserve(ref.current)
          }
        } else if (!once) {
          setIsVisible(false)
        }
      },
      { threshold, rootMargin }
    )

    const currentRef = ref.current
    if (currentRef) {
      observer.observe(currentRef)
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef)
      }
    }
  }, [threshold, rootMargin, once])

  return { ref, isVisible }
}

// Composant Modal pour les expertises
function ExpertiseModal({ expertise, onClose }: { expertise: string | null; onClose: () => void }) {
  const content = expertise ? expertiseContent[expertise] : null
  
  useEffect(() => {
    if (expertise) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => {
      document.body.style.overflow = ''
    }
  }, [expertise])

  if (!expertise || !content) return null

  return (
    <div className="expertise-modal-overlay" onClick={onClose}>
      <div className="expertise-modal" onClick={(e) => e.stopPropagation()}>
        <button className="expertise-modal-close" onClick={onClose}>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M18 6L6 18M6 6l12 12" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>
        <div className="expertise-modal-header">
          <span className="expertise-modal-category">Expertise</span>
          <h2 className="expertise-modal-title">{content.title}</h2>
        </div>
        <div className="expertise-modal-content">
          <div className="expertise-modal-section">
            <h3 className="expertise-modal-section-title">Overview</h3>
            <p className="expertise-modal-intro">{content.intro}</p>
          </div>
          <div className="expertise-modal-section">
            <h3 className="expertise-modal-section-title">Types of projects</h3>
            <ul className="expertise-modal-list">
              {content.items.map((item, idx) => (
                <li key={idx} className="expertise-modal-item">{item}</li>
              ))}
            </ul>
          </div>
          <p className="expertise-modal-footer">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="12" cy="12" r="10"/>
              <path d="M12 16v-4M12 8h.01"/>
            </svg>
            {content.footer}
          </p>
        </div>
      </div>
    </div>
  )
}

// Composant pour afficher juste l'icône d'une expertise
function SkillIcon({ skillName }: { skillName: string }) {
  const expertiseIcons: { [key: string]: React.ReactElement } = {
    "Product Management": (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect x="3" y="3" width="18" height="18" rx="2" stroke="currentColor" strokeWidth="2"/>
        <path d="M9 9h6v6H9z" fill="currentColor"/>
      </svg>
    ),
    "Sales Operations": (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M3 3v18h18" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
        <path d="M7 16l4-4 4 4 4-4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
    "People strategy": (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="12" cy="8" r="4" stroke="currentColor" strokeWidth="2"/>
        <path d="M6 21v-2a4 4 0 0 1 4-4h4a4 4 0 0 1 4 4v2" stroke="currentColor" strokeWidth="2"/>
      </svg>
    ),
    "CRM implementation (+ATS)": (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect x="3" y="4" width="18" height="16" rx="2" stroke="currentColor" strokeWidth="2"/>
        <path d="M3 10h18" stroke="currentColor" strokeWidth="2"/>
        <circle cx="7" cy="7" r="1" fill="currentColor"/>
      </svg>
    ),
    "Change Management": (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="2"/>
        <path d="M12 1v6m0 6v6M23 12h-6M7 12H1" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
      </svg>
    ),
    "Data analysis": (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M3 3v18h18" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
        <path d="M7 16l4-8 4 4 4-8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
    "Knowledge Management": (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M12 2L2 7l10 5 10-5-10-5z" stroke="currentColor" strokeWidth="2" strokeLinejoin="round"/>
        <path d="M2 17l10 5 10-5M2 12l10 5 10-5" stroke="currentColor" strokeWidth="2" strokeLinejoin="round"/>
      </svg>
    ),
    "Learning & Development": (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
        <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" stroke="currentColor" strokeWidth="2"/>
      </svg>
    ),
    "Project Management": (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect x="3" y="4" width="18" height="18" rx="2" stroke="currentColor" strokeWidth="2"/>
        <path d="M3 10h18M9 4v6" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
      </svg>
    ),
    "Team Management": (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" stroke="currentColor" strokeWidth="2"/>
        <circle cx="9" cy="7" r="4" stroke="currentColor" strokeWidth="2"/>
        <path d="M23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" stroke="currentColor" strokeWidth="2"/>
      </svg>
    ),
    "Talent acquisition": (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="11" cy="11" r="8" stroke="currentColor" strokeWidth="2"/>
        <path d="M21 21l-4.35-4.35" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
        <path d="M11 8v6M8 11h6" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
      </svg>
    )
  }
  
  return expertiseIcons[skillName] || (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2"/>
      <path d="M12 6v6l4 2" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
    </svg>
  )
}

function ProjectCard({ project, index, onClick }: { project: { name: string; category: string[]; description: string; tools: string[] }, index: number, onClick?: () => void }) {
  const cardRef = useScrollAnimation({ threshold: 0.1, rootMargin: '0px 0px -50px 0px' })
  
  // Map tools to their icons
  const getToolIcon = (tool: string) => {
    const simpleIconMap: { [key: string]: string } = {
      "Hubspot": "hubspot",
      "Airtable": "airtable",
      "Notion": "notion",
      "Metabase": "metabase",
      "SQL": "mysql",
      "Google/Office suites": "google",
      "Make": "make",
      "Asana": "asana",
      "Slack": "slack"
    }
    
    const directLogoMap: { [key: string]: string } = {
      "Smart Recruiters": "https://www.google.com/s2/favicons?domain=smartrecruiters.com&sz=64",
      "Teamtailor": "https://www.google.com/s2/favicons?domain=teamtailor.com&sz=64",
      "Softr": "https://www.google.com/s2/favicons?domain=softr.io&sz=64",
      "Lemlist": "https://www.google.com/s2/favicons?domain=lemlist.com&sz=64",
      "The growth machine": "https://www.google.com/s2/favicons?domain=lagrowthmachine.com&sz=64",
      "Huntr": "https://www.google.com/s2/favicons?domain=huntr.co&sz=64",
      "Sales Navigator": "https://galleryapplogos1.azureedge.net/app-logo/linkedinsalesnavigator_8640528F_215.png",
      "Recruiter Lite": "https://static.licdn.com/aero-v1/sc/h/al2o9zrvru7aqj8e1x2rzsrca"
    }
    
    if (simpleIconMap[tool]) {
      return (
        <img 
          src={`https://cdn.simpleicons.org/${simpleIconMap[tool]}`}
          alt={tool}
          className="tool-icon-img"
        />
      )
    }
    
    if (directLogoMap[tool]) {
      return (
        <img 
          src={directLogoMap[tool]}
          alt={tool}
          className="tool-icon-img tool-icon-direct"
        />
      )
    }
    
    // Expertise icons (SVG)
    const expertiseIcons: { [key: string]: React.ReactNode } = {
      "Product Management": (
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/>
          <rect x="3" y="14" width="7" height="7" rx="1"/><rect x="14" y="14" width="7" height="7" rx="1"/>
        </svg>
      ),
      "Sales Operations": (
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M3 3v18h18"/><path d="M18 9l-5 5-4-4-3 3"/>
        </svg>
      ),
      "People strategy": (
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <circle cx="12" cy="7" r="4"/><path d="M5 21v-2a7 7 0 0114 0v2"/>
        </svg>
      ),
      "CRM implementation (+ATS)": (
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <rect x="2" y="3" width="20" height="14" rx="2"/><path d="M8 21h8M12 17v4"/>
        </svg>
      ),
      "Change Management": (
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83"/>
        </svg>
      ),
      "Data analysis": (
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M3 3v18h18"/><rect x="7" y="10" width="3" height="8"/><rect x="14" y="6" width="3" height="12"/>
        </svg>
      ),
      "Knowledge Management": (
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M4 19.5A2.5 2.5 0 016.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 014 19.5v-15A2.5 2.5 0 016.5 2z"/>
        </svg>
      ),
      "Learning & Development": (
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M22 10v6M2 10l10-5 10 5-10 5z"/><path d="M6 12v5c0 2 6 3 6 3s6-1 6-3v-5"/>
        </svg>
      ),
      "Project Management": (
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <rect x="3" y="4" width="18" height="18" rx="2"/><path d="M16 2v4M8 2v4M3 10h18"/>
        </svg>
      ),
      "Team Management": (
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <circle cx="9" cy="7" r="3"/><circle cx="17" cy="7" r="3"/><path d="M3 21v-2a4 4 0 014-4h4a4 4 0 014 4v2"/><path d="M17 11a4 4 0 014 4v2"/>
        </svg>
      ),
      "Talent acquisition": (
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <circle cx="11" cy="11" r="8"/><path d="M21 21l-4.35-4.35"/><path d="M11 8v6M8 11h6"/>
        </svg>
      )
    }
    
    if (expertiseIcons[tool]) {
      return expertiseIcons[tool]
    }
    
    // Default icon for unknown items
    return (
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <circle cx="12" cy="12" r="10"/><path d="M12 8v4M12 16h.01"/>
      </svg>
    )
  }
  
  return (
    <div
      ref={cardRef.ref}
      className={`project-card ${cardRef.isVisible ? 'animate-in' : ''}`}
      style={{ animationDelay: `${index * 0.08}s` }}
      onClick={onClick}
      role="button"
      tabIndex={0}
    >
      <span className="card-click-indicator">
        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M7 17L17 7M17 7H7M17 7V17" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </span>
      <h3 className="project-title">{project.name}</h3>
      {project.description && (
        <p className="project-description">{project.description}</p>
      )}
      <div className="project-tools">
        {project.tools.map((tool, toolIndex) => (
          <span key={toolIndex} className="project-tool">
            <span className="tool-icon">{getToolIcon(tool)}</span>
            {tool}
          </span>
        ))}
      </div>
    </div>
  )
}

// Composant Modal pour les témoignages
function TestimonialModal({ testimonial, onClose }: { testimonial: { name: string; role: string; text: string; lang: string; expertises?: string[] } | null; onClose: () => void }) {
  useEffect(() => {
    if (testimonial) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => {
      document.body.style.overflow = ''
    }
  }, [testimonial])

  if (!testimonial) return null

  const getInitials = (name: string) => {
    return name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2)
  }

  return (
    <div className="testimonial-modal-overlay" onClick={onClose}>
      <div className="testimonial-modal" onClick={(e) => e.stopPropagation()}>
        <button className="testimonial-modal-close" onClick={onClose}>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M18 6L6 18M6 6l12 12" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>
        <div className="testimonial-modal-header">
          <div className="testimonial-avatar large">
            {getInitials(testimonial.name)}
          </div>
          <div className="testimonial-modal-meta">
            <div className="author-name">{testimonial.name}</div>
            <div className="author-role">{testimonial.role}</div>
          </div>
        </div>
        <div className="testimonial-modal-content">
          <p className="testimonial-modal-text">"{testimonial.text}"</p>
          {testimonial.expertises && testimonial.expertises.length > 0 && (
            <div className="testimonial-modal-expertises">
              <div className="testimonial-modal-expertises-label">Related expertises</div>
              <div className="testimonial-modal-tags">
                {testimonial.expertises.map((exp, idx) => (
                  <span key={idx} className="testimonial-modal-tag">{exp}</span>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

// Type pour les projets
type Project = {
  name: string;
  category: string[]; // Array pour supporter plusieurs catégories
  description: string;
  tools: string[];
  details: {
    context: string;
    reporting: string;
    missions: string[];
  };
}

// Composant Modal pour les projets
function ProjectModal({ project, onClose }: { project: Project | null; onClose: () => void }) {
  useEffect(() => {
    if (project) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => {
      document.body.style.overflow = ''
    }
  }, [project])

  if (!project) return null

  return (
    <div className="project-modal-overlay" onClick={onClose}>
      <div className="project-modal" onClick={(e) => e.stopPropagation()}>
        <button className="project-modal-close" onClick={onClose}>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M18 6L6 18M6 6l12 12" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>
        <div className="project-modal-header">
          <span className="project-modal-category">{Array.isArray(project.category) ? project.category.join(' · ') : project.category}</span>
          <h2 className="project-modal-title">{project.name}</h2>
        </div>
        <div className="project-modal-content">
          <div className="project-modal-section">
            <h3 className="project-modal-section-title">Mission context</h3>
            <p className="project-modal-text">{project.details.context}</p>
            <p className="project-modal-reporting"><em>{project.details.reporting}</em></p>
          </div>
          <div className="project-modal-section">
            <h3 className="project-modal-section-title">Mission details</h3>
            <ul className="project-modal-list">
              {project.details.missions.map((mission, index) => (
                <li key={index} className="project-modal-item">{mission}</li>
              ))}
            </ul>
          </div>
          <div className="project-modal-tools">
            <h3 className="project-modal-section-title">Tools & Expertises</h3>
            <div className="project-modal-tools-list">
              {project.tools.map((tool, index) => (
                <span key={index} className="project-modal-tool">{tool}</span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

function Landing() {
  const heroRef = useScrollAnimation()
  const skillsRef = useScrollAnimation()
  const projectsRef = useScrollAnimation()
  const testimonialsRef = useScrollAnimation()
  const ctaRef = useScrollAnimation()
  const carouselRef = useRef<HTMLDivElement>(null)
  const [activeSkillCategory, setActiveSkillCategory] = useState<'Expertises' | 'Tools' | 'Languages'>('Expertises')
  const [selectedExpertise, setSelectedExpertise] = useState<string | null>(null)
  const [selectedProject, setSelectedProject] = useState<Project | null>(null)
  
  const scrollCarousel = (direction: 'left' | 'right') => {
    if (carouselRef.current) {
      const scrollAmount = 350
      carouselRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth'
      })
    }
  }

  const [activeProjectCategory, setActiveProjectCategory] = useState<string>('All')
  
  const projects = [
    {
      name: "No-Code CRM implementation at White Wave",
      category: ["Product", "Sales"],
      description: "Designed and implemented a scalable no-code CRM to structure outbound sales, clean data, and align sales processes with Lemlist for a fast-growing startup.",
      tools: ["CRM implementation (+ATS)", "Airtable", "Notion", "Lemlist", "Sales Operations", "Data analysis"],
      details: {
        context: "White Wave is an early-stage company (less than one year old) specializing in LinkedIn lead generation. The founders, Antonin and Leo, needed a structured and reliable CRM to support their outbound sales efforts, improve data quality, and formalize their sales processes as the company scaled.",
        reporting: "Role: Ops & systems Lead",
        missions: [
          "Audited existing tools and workflows (mainly Notion and Lemlist)",
          "Designed a clear and scalable sales process for contacts, companies, and deals using Whimsical",
          "Built three interconnected Airtable databases with lookups to create a clean and functional CRM",
          "Migrated and cleaned data from multiple Notion tables and Google Sheets into Airtable",
          "Set up and monitored a test phase to validate usability and adoption",
          "Iterated on the CRM based on real usage and defined automation and dashboard requirements",
          "Ensured dashboard and automation consistency with Lemlist setup and reporting",
          "Guided the founders in defining relevant KPIs to track sales activity and performance",
          "Implemented final automations and dashboards"
        ]
      }
    },
    {
      name: "No-code CRM & process optimisation at WeBlame",
      category: ["Data", "Product"],
      description: "Built a centralised CRM and operational processes to help a new association manage volunteers and testimonies efficiently with limited resources.",
      tools: ["CRM implementation (+ATS)", "Notion", "Airtable", "Knowledge Management", "Project Management"],
      details: {
        context: "WeBlame is a newly created association facing rapid operational needs with very limited resources. Helene and Marline, working only two days per week, urgently needed a way to manage two distinct data sources—volunteers and victims' testimonies—while Epitech students were developing a long-term platform. The goal was to deliver a quick, reliable operational solution and ensure continuity between tools and teams.",
        reporting: "Role: Ops & systems Lead",
        missions: [
          "Rapidly audited existing data sources (email-based form submissions and Google Forms/Sheets)",
          "Defined clear end-to-end processes for each population (volunteers and victims) to structure data and anticipate automations using Whimsical",
          "Designed and built the core Airtable databases (volunteers, testimonies) to centralize and clean data",
          "Migrated data sources to Airtable forms to standardize and secure incoming information",
          "Documented all operational processes in Notion, including automation and AI hypotheses",
          "Presented the CRM architecture and documentation to Epitech students to ensure a smooth handover",
          "Collaborated with the development team to align operational needs and technical implementation",
          "(Ongoing) Act as CRM and operations referent, overseeing student work as a project manager and ensuring long-term process sustainability for the association"
        ]
      }
    },
    {
      name: "End-to-end launch of a new function at Amaris",
      category: ["People", "Sales"],
      description: "Led the design, testing, and international rollout of a new recruitment function to better serve strategic, high-volume clients.",
      tools: ["Project Management", "Change Management", "Talent acquisition", "English"],
      details: {
        context: "At Amaris, client needs were traditionally handled by business managers working in pairs with recruitment specialists. As the company grew, this model became less effective for strategic clients or those with more than 100 hiring needs per year. The objective was to design and deploy a new, more efficient function to address these complex, high-volume accounts. I led this project end to end.",
        reporting: "Role: Project Manager",
        missions: [
          "Analyzed strengths and weaknesses of the existing delivery model",
          "Compared performance across clients from various sectors (SNCF, BNP, Bouygues Telecom, Santander, McKinsey, Rolex) and countries (France, Singapore, Tunisia, Spain, Canada, Switzerland)",
          "Designed a new operational process and role tailored to strategic, high-volume clients",
          "Presented and validated the proposed model with the executive committee",
          "Defined the new function in detail: job description, recruitment criteria, onboarding, career path, KPIs, compensation, and promotion framework",
          "Launched a first pilot on an account within my scope, including recruiter training and change management with sales teams",
          "Monitored performance metrics to validate efficiency and reassure stakeholders",
          "Secured executive validation of results",
          "Rolled out the model to five additional strategic accounts across different countries",
          "Led change management, training, and team coordination across sales and recruitment teams worldwide",
          "Delivered final documentation and training to regional leadership to integrate the new function sustainably across geographies"
        ]
      }
    },
    {
      name: "Defined and optimized team structures to ensure scalability at Le Wagon",
      category: ["Data", "People"],
      description: "Redesigned and scaled Career Services team structures across multiple campuses to support global growth while enabling flexibility and future scalability.",
      tools: ["People strategy", "Change management", "Learning & Development", "Notion", "English"],
      details: {
        context: "Le Wagon is a coding bootcamp that expanded through franchises. Around 2022, the founders acquired 25+ campuses worldwide to create a core structure capable of scaling globally. I was hired to lead the Career Services department and design a scalable structure that would meet both current needs and future growth. Prior to this, existing roles and missions were tailored to local campus activity, not global expansion.",
        reporting: "Role: Head of",
        missions: [
          "Conducted an audit of existing Career Services operations across local campuses and regional offices",
          "Benchmarked Career Services models at similar bootcamps to identify best practices",
          "Segmented B2B and B2C offerings to define clear skill sets required for each service line",
          "Designed new roles and career paths that addressed both current needs and scalability, ensuring the team could grow without adding staff for every 100 new students",
          "Developed new processes, workflows, and databases aligned with the updated team structure",
          "Led the transition from the old system (System A) to the new structure (System B), including change management, individual development plans, and onboarding for existing staff",
          "Recruited additional team members to expand Career Services into regions without prior presence",
          "After one year, completed team deployment while maintaining flexibility and role-centered design, ensuring no skill or responsibility was tied to a single individual"
        ]
      }
    },
    {
      name: "Development of an internal candidate-matching system at Amaris",
      category: ["Data", "Product"],
      description: "Built an internal candidate-matching tool to automatically generate shortlists from a 2M+ CV database, streamlining recruitment operations for new client needs.",
      tools: ["Product Management", "Data analysis", "Project Management", "Change Management", "English"],
      details: {
        context: "Amaris maintains a database of over 2 million CVs. The goal of this project was to develop an in-house candidate-matching system that automatically generates a shortlist for each new client need based on predefined criteria, reducing manual recruitment effort and improving speed and accuracy.",
        reporting: "Role: Project Manager",
        missions: [
          "Defined realistic matching criteria based on available candidate and job data, refined with input from operations teams",
          "Conducted a months-long data cleaning project to ensure the database could support accurate matching",
          "Developed documentation, communication, and change management plans to maintain ongoing data quality",
          "Acted as Product Owner in Agile development, collaborating closely with developers to build the interface",
          "Conducted extensive testing to validate functionality and accuracy",
          "Launched the tool to operations teams, providing training and adoption support",
          "Measured ROI by comparing manual shortlisting time saved and recruitment efficiency improvements"
        ]
      }
    },
    {
      name: "Improvement of legal reporting and compliance at Le Wagon",
      category: ["Data"],
      description: "Redesigned reporting processes to deliver accurate, automated, and visually appealing reports for certification, compliance, and marketing purposes.",
      tools: ["Data analysis", "Product Management", "Knowledge Management", "Change Management", "Notion", "English"],
      details: {
        context: "Le Wagon needed accurate and attractive reports to respond to tenders, obtain certifications (Qualiopi in France for instance but also UK, Germany, Argentina, Singapore), and support marketing efforts. Existing reporting was slow, manual, and error-prone, relying on large Excel files. The objective was to create a clean, automated process that maximizes efficiency and reliability.",
        reporting: "Role: Project Manager",
        missions: [
          "Collaborated with all departments (Sales, Admissions, Marketing, Legal, B2B, Executive Committee) to define reporting needs in terms of data, format, and design",
          "Led a major data-cleaning initiative with the Head of Data to ensure reliability of the source data",
          "Mapped data sources, identified missing information, and defined standardized calculations for all KPIs",
          "Built initial dashboards in Metabase to validate data and visualize trends",
          "Worked with Legal to define mandatory text, disclaimers, and compliance mentions for each report template",
          "Partnered with Marketing to design visually appealing templates optimized for different media channels, ensuring compliance with brand and legal standards",
          "Collaborated with the CTO to automate the process from database to final report templates",
          "Conducted training and communication to ensure correct use of templates across teams",
          "Documented all processes, templates, and reports in Notion, creating a clear, audit-ready space for internal and external review"
        ]
      }
    },
    {
      name: "Redesign of soft skills learning experience at Le Wagon",
      category: ["Product", "People"],
      description: "Redesigned Le Wagon's soft skills learning experience into a fully digital, gamified, and self-paced model to improve career guidance and job placement outcomes.",
      tools: ["Product Management", "Change Management", "Learning & Development", "Huntr", "Make"],
      details: {
        context: "Le Wagon is a coding bootcamp that expanded globally through franchises. By 2022, with 25+ campuses worldwide, students faced increasing difficulty securing their first jobs despite strong technical training. The goal of this mission was to redesign the soft skills learning journey, enhance career guidance, and improve—or at least stabilize—the bootcamp's job placement outcomes in a challenging market.",
        reporting: "Role: Head of",
        missions: [
          "Audited existing learning content and delivery methods versus company expectations",
          "Conducted interviews with alumni (past and current) to understand needs and engagement gaps",
          "Gathered input from other departments to assess perceptions of Career Services and benchmarked best practices from other bootcamps",
          "Designed a 360° transformation, creating a fully digital, gamified, self-paced learning experience",
          "Reviewed and optimized content formats: e-learning modules, group online courses, on-site workshops, and individual coaching with expert freelancers",
          "Collaborated with the CTO to improve the in-house learning platform and integrate new features",
          "Integrated a CRM module using Huntr to track student progress and gamification engagement metrics",
          "Redesigned the presentation of the service externally (media interviews, website content, YouTube videos) and internally to ensure adoption and understanding",
          "Implemented a fully data-tracked system to measure ROI and inform future program improvements"
        ]
      }
    },
    {
      name: "Customer Success strategy & MVP launch at Le Wagon",
      category: ["Product", "Sales"],
      description: "Designed and launched a B2B Customer Success MVP, centralizing company data in a CRM and testing a new talent-accessibility offering for businesses.",
      tools: ["Sales Operations", "Change Management", "Product Management", "HubSpot", "Airtable", "Softr", "Lemlist", "The growth machine", "Huntr", "Make"],
      details: {
        context: "Le Wagon's Career Services B2B efforts were unstructured: job fairs and company contacts existed but without a clear sales strategy. The goal was to define an offer and implement a sales process for corporate clients while testing its effectiveness with a no-code MVP.",
        reporting: "Role: Head of",
        missions: [
          "Audited existing company data and history (partnerships, alumni hires, employer branding collaborations)",
          "Centralized all B2B data into HubSpot, separating it from B2C pipelines",
          "Managed CRM cleaning, documentation, and segmentation for Career Services and corporate offerings",
          "Defined the product angle and MVP with a focus on **talent accessibility** rather than hiring services",
          "Developed the MVP using Airtable and Softr; integrated Huntr and in-house systems with automation via Make",
          "Conducted market benchmarking to refine the offering",
          "Managed data migration, system configuration, and team training",
          "Updated external positioning: website, marketing content, and sales communications"
        ]
      }
    },
    {
      name: "End-to-End CRM deployment at Alter Solutions",
      category: ["Data", "Product"],
      description: "Deployed a harmonized CRM across five countries, including data migration, automation setup, and adoption support for sales and recruitment teams.",
      tools: ["Project Management", "Change Management", "Data analysis", "HubSpot", "English"],
      details: {
        context: "Alter Solutions operated in five countries (France, Germany, Portugal, Spain, Belgium) with autonomous operations. The objective was to standardize CRM usage to enable scalable operations across recruitment and sales.",
        reporting: "Role: Project Manager",
        missions: [
          "Audited all systems across countries (BoundManager, HubSpot, Airtable, Excel)",
          "Benchmarked solutions and selected HubSpot for sales, SmartRecruiters for recruitment",
          "Configured both tools and automated workflows between them",
          "Prepared and migrated data from country-specific systems",
          "Deployed CRM country by country, including training, change management, dashboards, adoption follow-up, and system adjustments",
          "Measured ROI and reported outcomes to founders"
        ]
      }
    },
    {
      name: "Assuring fusion with a new venture at Le Wagon",
      category: ["People"],
      description: "Integrated newly acquired South American campuses into the existing Career Services structure, ensuring alignment while respecting local contexts.",
      tools: ["Change Management", "Learning & Development", "People strategy"],
      details: {
        context: "Two years after the global expansion, Le Wagon acquired all remaining South American franchises (Brazil, Argentina, Chile, Mexico). The goal was to integrate these new teams into the existing Career Services structure while considering local contexts and building engagement.",
        reporting: "Role: Head of",
        missions: [
          "Built relationships with new teams to understand local practices, markets, and constraints",
          "Identified 2–3 key strategic priorities to focus on first, avoiding overloading the teams with changes",
          "Aligned local directors with overall department objectives before implementing operational adjustments",
          "Collaborated closely with teams to make gradual, day-to-day improvements ensuring smooth integration",
          "Organized team dynamics and ambassador roles to support natural adoption of new practices",
          "Provided documentation in local languages and prioritized local team needs to foster trust and alignment"
        ]
      }
    }
  ]
  
  const projectCategories = ['Product', 'People', 'Sales', 'Data', 'All']
  
  // Logique de filtrage : 
  // - Pour "All" : afficher uniquement les 10 projets uniques (sans doublons)
  // - Pour une catégorie spécifique : dupliquer les projets si nécessaire
  const filteredProjects = activeProjectCategory === 'All' 
    ? projects.slice(0, 10) // Limiter à 10 projets uniques pour "All"
    : projects.flatMap(p => 
        p.category.includes(activeProjectCategory) 
          ? [{ ...p, displayCategory: activeProjectCategory }] 
          : []
      )

  const skills = [
    { name: "Product Management", type: "Expertises" },
    { name: "Sales Operations", type: "Expertises" },
    { name: "People strategy", type: "Expertises" },
    { name: "CRM implementation (+ATS)", type: "Expertises" },
    { name: "Change Management", type: "Expertises" },
    { name: "Data analysis", type: "Expertises" },
    { name: "Knowledge Management", type: "Expertises" },
    { name: "Learning & Development", type: "Expertises" },
    { name: "Project Management", type: "Expertises" },
    { name: "Team Management", type: "Expertises" },
    { name: "Talent acquisition", type: "Expertises" },
    { name: "Airtable", type: "Tools" },
    { name: "Asana", type: "Tools" },
    { name: "Google/Office suites", type: "Tools" },
    { name: "Hubspot", type: "Tools" },
    { name: "Huntr", type: "Tools" },
    { name: "Lemlist", type: "Tools" },
    { name: "Make", type: "Tools" },
    { name: "Metabase", type: "Tools" },
    { name: "Notion", type: "Tools" },
    { name: "Recruiter Lite", type: "Tools" },
    { name: "Sales Navigator", type: "Tools" },
    { name: "Slack", type: "Tools" },
    { name: "Smart Recruiters", type: "Tools" },
    { name: "Softr", type: "Tools" },
    { name: "SQL", type: "Tools" },
    { name: "Teamtailor", type: "Tools" },
    { name: "The growth machine", type: "Tools" },
    { name: "French", type: "Languages", level: "Native" },
    { name: "English", type: "Languages", level: "C1" },
    { name: "Spanish", type: "Languages", level: "B2" }
  ]

  const testimonials = [
    {
      name: "Clotilde Sauzade",
      role: "Chief of Staff",
      text: "Dans le cadre de mon développement professionnel, Marig m'a accompagnée dans la clarification de mon rôle de manager, ce qui m'a permis de mieux me positionner face à des profils seniors et de définir une vision stratégique adaptée à mon contexte. Grâce à son expertise, j'ai pu anticiper les attentes de ma direction et progresser dans ma montée en compétences, jusqu'à prendre des responsabilités correspondant à un rôle de Chief Of. Elle a également su m'apporter des outils pratiques pour anticiper les besoins de ma direction et renforcer mes compétences en gestion des talents. Sa capacité à comprendre les enjeux RH et à proposer des solutions adaptées fait d'elle une ressource précieuse pour toute organisation.",
      lang: "French",
      expertises: ["People strategy", "Team Management", "Change Management"]
    },
    {
      name: "Alexandra Crespo",
      role: "Senior Account Executive",
      text: "Marig is a true global leader who knows how to adapt to both regional and local needs. I was truly impressed by how she was able to understand the reality of my region, Latin America, and design strategies that helped me not only achieve but exceed my goals. There's nothing more fulfilling than working with someone who helps you unlock your potential, listens to you, and gives you autonomy and creative freedom. That's why I firmly believe Marig is a natural leader who has also been enriched by her vast experience, inspiring her team members to think big and act strategically. I also want to highlight her adaptability to change and how quickly she implements new initiatives, making things happen and ensuring everyone is on the same page despite the differences in challenges across regions.",
      lang: "English",
      expertises: ["Sales Operations", "Team Management", "Change Management"]
    },
    {
      name: "Edward Schults",
      role: "CTO",
      text: "As VP of Engineering, I collaborated with Marig on multiple projects where her ability to synthesize and express clearly the problems to solve and her determination to refine and iterate the solutions we built were a strong driver for my team. She continuously sought out innovative ways to enhance the student outcomes, whether through data-driven insights or by streamlining processes. In many cases, Marig built new processes from scratch using no-code, allowing her to involve Engineering with very specific and concrete needs and documented insights on usage. I highly recommend her to any organization looking for a dedicated, forward-thinking, and results-driven professional.",
      lang: "English",
      expertises: ["Product Management", "Data analysis", "Project Management"]
    },
    {
      name: "Thomas Bouttefort",
      role: "VP Products & Ops",
      text: "She was key in transforming our career services, leading the redesign of our operational model from analysis to strategic development and implementation. Her analytical rigor and strategic vision streamlined processes and aligned them with business goals. Marig's ability to execute complex projects with clarity makes her an invaluable asset to any organization. With a strong 'get things done' mentality, you can always count on her to drive projects forward. I highly recommend her.",
      lang: "English",
      expertises: ["Change Management", "Project Management", "Data analysis"]
    },
    {
      name: "Imen Saidi",
      role: "Senior Product Manager",
      text: "Marig and I worked on multiple projects together. She has always proven to be an excellent project manager and leader with effective communication skills, strong leadership throughout the project from initiation to Closing. A key element in Marig's project management methodology also, is her ability to share her vision clearly with project team and stakeholders where everyone understood perfectly the global picture and his own tasks and area of action. Being super organized and proactive it has been a real pleasure everytime we were teamed up for a project.",
      lang: "English",
      expertises: ["Project Management", "Product Management", "Team Management"]
    },
    {
      name: "Yannick Ollivier",
      role: "Head of Sales & Partnerships",
      text: "Marig is a thoughtful and collaborative professional who brings a strong balance of strategic thinking and practical execution. She provided valuable guidance in defining our acquisition strategy and demonstrated great leadership throughout the process. Her clear mindset and ability to focus on what matters make her a reliable and effective team member.",
      lang: "English",
      expertises: ["Sales Operations", "Talent acquisition", "Team Management"]
    },
    {
      name: "Antonin Goisque",
      role: "Founder",
      text: "J'ai travaillé avec Marig sur deux missions stratégiques. Elle identifie très rapidement les besoins clients et apporte des retours extrêmement pertinents sur le produit, toujours adaptés aux contraintes techniques. Grâce à un système de KPIs et de suivi construit sur Airtable, elle nous a permis d'analyser notre performance de lead generation et d'ajuster nos stratégies business très rapidement. Marig est à la fois très structurée, orientée résultats, et dotée d'une forte culture produit et tech.",
      lang: "French",
      expertises: ["Product Management", "Sales Operations", "Data analysis"]
    },
    {
      name: "Marvin Haddad",
      role: "Sales Manager",
      text: "J'ai eu le plaisir de travailler avec Marig sur un projet de digitalisation de notre process de lead generation pour le département Sales. Elle a su rapidement analyser nos parcours, identifier les points de friction et mettre en place des automatisations simples, efficaces et directement opérationnelles. Grâce à son approche très structurée et orientée impact, nous avons gagné en visibilité, en performance et en fiabilité dans notre acquisition commerciale.",
      lang: "French",
      expertises: ["Sales Operations", "CRM implementation (+ATS)", "Change Management"]
    }
  ]
  
  const [selectedTestimonial, setSelectedTestimonial] = useState<{ name: string; role: string; text: string; lang: string; expertises?: string[] } | null>(null)

  return (
    <div className="landing">
      {/* Navigation */}
      <nav className="nav">
        <div className="nav-container">
          <div className="nav-pill">
            <a href="#expertise" className="nav-link">
              <span className="nav-link-icon">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/>
                </svg>
              </span>
              Skills
            </a>
            <a href="#projects" className="nav-link">
              <span className="nav-link-icon">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <rect x="3" y="3" width="18" height="18" rx="2" ry="2"/>
                  <line x1="3" y1="9" x2="21" y2="9"/>
                  <line x1="9" y1="21" x2="9" y2="9"/>
                </svg>
              </span>
              Projects
            </a>
            <a href="#testimonials" className="nav-link">
              <span className="nav-link-icon">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
                </svg>
              </span>
              Testimonials
            </a>
            <div className="nav-divider"></div>
            <a href="https://cal.com/marig-sarrazin-xktoid/30min?user=marig-sarrazin-xktoid" target="_blank" rel="noopener noreferrer" className="nav-link nav-link-cta">
              <span className="nav-link-icon">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <rect x="3" y="4" width="18" height="18" rx="2" ry="2"/>
                  <line x1="16" y1="2" x2="16" y2="6"/>
                  <line x1="8" y1="2" x2="8" y2="6"/>
                  <line x1="3" y1="10" x2="21" y2="10"/>
                </svg>
              </span>
              Book a call
            </a>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="hero">
        <div className="hero-background">
          <div className="gradient-orb orb-1"></div>
          <div className="gradient-orb orb-2"></div>
          <div className="gradient-orb orb-3"></div>
          <div className="particles"></div>
        </div>
        <div className="hero-container">
          <div 
            ref={heroRef.ref}
            className={`hero-content ${heroRef.isVisible ? 'animate-in' : ''}`}
          >
            {/* <div className="hero-badge">
              <span className="badge-dot"></span>
              Operations & Product Specialist
            </div> */}
            <div className="hero-main">
              <div className="hero-avatar-section">
                <div className="avatar-wrapper">
                  <img 
                    src={marigAvatar} 
                    alt="Marig Sarrazin" 
                    className="avatar"
                  />
                </div>
              </div>
              <div className="hero-text-section">
                <h1 className="hero-title">
                  Hello, I'm <span className="title-accent">Marig Sarrazin</span>.
                </h1>
                <div className="hero-text">
                  <p>
                    I started my career in recruitment and consulting, and over time I grew into <strong>operations and product roles</strong>, driven by a <strong>passion for tech</strong>. After <strong>Le Wagon</strong>, I chose to focus on freelance work with associations and <strong>socially-engaged</strong> companies, <strong>bringing expertise</strong> in people strategy, sales ops, product management or CRM integration.
                  </p>
                  <p>
                    I love <strong>data</strong>, I can talk for hours about <strong>talent development</strong>, and I'm fascinated by <strong>product design and delivery</strong>. I'm curious by nature and don't want to do just one thing—I thrive at the intersection of <strong>people, processes, and technology</strong>.
                  </p>
                </div>
                <div className="hero-cta-group">
                  <a href="https://cal.com/marig-sarrazin-xktoid/30min?user=marig-sarrazin-xktoid" target="_blank" rel="noopener noreferrer" className="cta-primary">
                    Book a call
                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                      <path d="M7.5 15L12.5 10L7.5 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </a>
                  <a href="https://airtable.com/appJLiWmb5Ix5hoLV/pagLQjfRe0JhDbmXv/form" target="_blank" rel="noopener noreferrer" className="cta-secondary">
                    Contact me
                  </a>
                  <a href="https://linkedin.com/in/marig-sarrazin" target="_blank" rel="noopener noreferrer" className="cta-linkedin" aria-label="LinkedIn Profile">
                    <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                    </svg>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section id="expertise" className="section skills-section">
        <div className="container">
          <div 
            ref={skillsRef.ref}
            className={`skills-header ${skillsRef.isVisible ? 'animate-in' : ''}`}
          >
            <div className="skills-intro">
              <span className="skills-label">What I bring</span>
              <h2 className="skills-title">Skills</h2>
            </div>
            <div className="skills-tabs-wrapper">
              <div className="skills-tabs">
                {(['Expertises', 'Tools', 'Languages'] as const).map((category) => {
                  const count = skills.filter(s => s.type === category).length;
                  return (
                    <button 
                      key={category}
                      className={`skill-tab ${activeSkillCategory === category ? 'active' : ''}`}
                      onClick={() => setActiveSkillCategory(category)}
                    >
                      <span className="skill-tab-name">{category}</span>
                      <span className="skill-tab-count">{count}</span>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
          <div className="skills-container">
            {activeSkillCategory === 'Expertises' ? (
              // Mind Map Layout for Expertises
              <div className="mindmap-container">
                <svg className="mindmap-lines" viewBox="0 0 800 500">
                  {/* Lines from center to each node */}
                  {skills.filter(s => s.type === 'Expertises').map((_, index) => {
                    const total = 11;
                    const angle = (index / total) * 2 * Math.PI - Math.PI / 2;
                    const radius = 180;
                    const x2 = 400 + Math.cos(angle) * radius;
                    const y2 = 250 + Math.sin(angle) * radius;
                    return (
                      <line
                        key={index}
                        x1="400"
                        y1="250"
                        x2={x2}
                        y2={y2}
                        className="mindmap-line"
                        style={{ animationDelay: `${index * 0.1}s` }}
                      />
                    );
                  })}
                </svg>
                <div className="mindmap-center">
                  <span>Expertises</span>
                </div>
                <div className="mindmap-nodes">
                  {skills.filter(s => s.type === 'Expertises').map((skill, index) => {
                    const total = 11;
                    const angle = (index / total) * 2 * Math.PI - Math.PI / 2;
                    const radius = 42; // percentage from center
                    const x = 50 + Math.cos(angle) * radius;
                    const y = 50 + Math.sin(angle) * radius;
                    return (
                      <div
                        key={skill.name}
                        className="mindmap-node"
                        style={{ 
                          left: `${x}%`, 
                          top: `${y}%`,
                          animationDelay: `${index * 0.08}s`
                        }}
                        onClick={() => setSelectedExpertise(skill.name)}
                        role="button"
                        tabIndex={0}
                      >
                        <div className="mindmap-node-icon">
                          <SkillIcon skillName={skill.name} />
                        </div>
                        <span className="mindmap-node-label">{skill.name}</span>
                        <span className="card-click-indicator mindmap-node-indicator">
                          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <path d="M7 17L17 7M17 7H7M17 7V17" strokeLinecap="round" strokeLinejoin="round"/>
                          </svg>
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>
            ) : (
              // Grid Layout for Tools and Languages
              (() => {
                const filteredSkills = skills.filter(skill => skill.type === activeSkillCategory);
                const categoryClass = activeSkillCategory === 'Tools' 
                  ? 'skills-gallery-tools' 
                  : 'skills-gallery-languages';
                
                return (
                  <div className={`skills-gallery ${categoryClass}`}>
                    {filteredSkills.map((skill, index) => (
                      <div 
                        key={skill.name}
                        className="skill-card-pill"
                        style={{ animationDelay: `${index * 0.03}s` }}
                      >
                        <div className="skill-card-pill-icon">
                    {skill.type === 'Expertises' ? (
                      <SkillIcon skillName={skill.name} />
                    ) : skill.type === 'Languages' ? (
                      <img 
                        src={`https://flagcdn.com/w40/${skill.name === 'French' ? 'fr' : skill.name === 'English' ? 'gb' : 'es'}.png`}
                        alt={skill.name}
                        className="skill-flag-icon"
                      />
                    ) : (
                      <>
                        {(() => {
                          // Simple Icons slugs
                          const simpleIconMap: Record<string, string> = {
                            "Hubspot": "hubspot",
                            "Airtable": "airtable",
                            "Notion": "notion",
                            "Metabase": "metabase",
                            "SQL": "mysql",
                            "Google/Office suites": "google",
                            "Make": "make",
                            "Asana": "asana",
                            "Slack": "slack"
                          };
                          // Direct logo URLs for tools not on Simple Icons
                          const directLogoMap: Record<string, string> = {
                            "Smart Recruiters": "https://www.google.com/s2/favicons?domain=smartrecruiters.com&sz=64",
                            "Teamtailor": "https://www.google.com/s2/favicons?domain=teamtailor.com&sz=64",
                            "Softr": "https://www.google.com/s2/favicons?domain=softr.io&sz=64",
                            "Lemlist": "https://www.google.com/s2/favicons?domain=lemlist.com&sz=64",
                            "The growth machine": "https://www.google.com/s2/favicons?domain=lagrowthmachine.com&sz=64",
                            "Huntr": "https://www.google.com/s2/favicons?domain=huntr.co&sz=64",
                            "Sales Navigator": "https://galleryapplogos1.azureedge.net/app-logo/linkedinsalesnavigator_8640528F_215.png",
                            "Recruiter Lite": "https://static.licdn.com/aero-v1/sc/h/al2o9zrvru7aqj8e1x2rzsrca"
                          };
                          
                          if (simpleIconMap[skill.name]) {
                            return (
                              <img 
                                src={`https://cdn.simpleicons.org/${simpleIconMap[skill.name]}`}
                                alt={skill.name}
                                className="skill-tool-icon"
                              />
                            );
                          }
                          if (directLogoMap[skill.name]) {
                            return (
                              <img 
                                src={directLogoMap[skill.name]}
                                alt={skill.name}
                                className="skill-tool-icon skill-tool-icon-direct"
                              />
                            );
                          }
                          return <span className="tool-fallback">{skill.name.charAt(0).toUpperCase()}</span>;
                        })()}
                      </>
                    )}
                  </div>
                          <span className="skill-card-pill-title">{skill.name}</span>
                          {skill.level && <span className="skill-card-pill-level">{skill.level}</span>}
                        </div>
                    ))}
                  </div>
                );
              })()
            )}
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="section projects-section">
        <div className="container">
          <div 
            ref={projectsRef.ref}
            className={`skills-header ${projectsRef.isVisible ? 'animate-in' : ''}`}
          >
            <div className="skills-intro">
              <span className="skills-label">What I have done</span>
              <h2 className="skills-title">Projects</h2>
            </div>
            <div className="skills-tabs-wrapper">
              <div className="skills-tabs">
                {projectCategories.map((category) => {
                  const count = category === 'All' 
                    ? Math.min(projects.length, 10) // Limiter à 10 pour "All"
                    : projects.filter(p => p.category.includes(category)).length;
                  return (
                    <button
                      key={category}
                      className={`skill-tab ${activeProjectCategory === category ? 'active' : ''}`}
                      onClick={() => setActiveProjectCategory(category)}
                    >
                      <span className="skill-tab-icon">
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z"/>
                        </svg>
                      </span>
                      {category}
                      <span className="skill-tab-count">{count}</span>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
          <div className="projects-grid">
            {filteredProjects.map((project, index) => {
              // Pour les projets dupliqués, utiliser la catégorie d'affichage dans la clé
              const displayKey = (project as any).displayCategory 
                ? `${activeProjectCategory}-${project.name}-${(project as any).displayCategory}`
                : `${activeProjectCategory}-${project.name}`;
              return (
                <ProjectCard 
                  key={displayKey} 
                  project={project} 
                  index={index} 
                  onClick={() => setSelectedProject(project)}
                />
              );
            })}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section id="testimonials" className="section testimonials-section">
        <div className="container">
          <div 
            ref={testimonialsRef.ref}
            className={`section-header-centered ${testimonialsRef.isVisible ? 'animate-in' : ''}`}
          >
            <span className="skills-label">Words from people I've worked with</span>
            <h2 className="skills-title">Testimonials</h2>
          </div>
          <div className="testimonials-carousel-wrapper">
            <button 
              className="carousel-arrow carousel-arrow-left" 
              onClick={() => scrollCarousel('left')}
              aria-label="Previous testimonials"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <polyline points="15 18 9 12 15 6"/>
              </svg>
            </button>
            <div className="testimonials-carousel" ref={carouselRef}>
              <div className="testimonials-track">
                {[...testimonials, ...testimonials, ...testimonials].map((testimonial, index) => (
                  <div 
                    key={`${testimonial.name}-${index}`} 
                    className="testimonial-slide"
                    onClick={() => setSelectedTestimonial(testimonial)}
                  >
                    <span className="card-click-indicator testimonial-indicator">
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M7 17L17 7M17 7H7M17 7V17" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </span>
                    <div className="testimonial-slide-flag">
                      {testimonial.lang === 'French' ? '🇫🇷' : '🇬🇧'}
                    </div>
                    <p className="testimonial-slide-text">
                      "{testimonial.text.slice(0, 180)}..."
                    </p>
                    <div className="testimonial-slide-author">
                      <span className="testimonial-slide-name">{testimonial.name}</span>
                      <span className="testimonial-slide-role">{testimonial.role}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <button 
              className="carousel-arrow carousel-arrow-right" 
              onClick={() => scrollCarousel('right')}
              aria-label="Next testimonials"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <polyline points="9 18 15 12 9 6"/>
              </svg>
            </button>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section cta-section">
        <div className="container">
          <div 
            ref={ctaRef.ref}
            className={`cta-content ${ctaRef.isVisible ? 'animate-in' : ''}`}
          >
            <div className="cta-badge">
              <span className="badge-dot"></span>
              Let's connect
            </div>
            <h2 className="cta-title">Ready to build something together?</h2>
            <p className="cta-description">
              Whether it's operations, people strategy, or CRM implementation, I'm here to help bring your vision to life.
            </p>
            <div className="cta-buttons">
              <a href="https://cal.com/marig-sarrazin-xktoid/30min?user=marig-sarrazin-xktoid" target="_blank" rel="noopener noreferrer" className="cta-primary cta-large">
                Book a call
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                  <path d="M7.5 15L12.5 10L7.5 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </a>
              <a href="https://airtable.com/appJLiWmb5Ix5hoLV/pagLQjfRe0JhDbmXv/form" target="_blank" rel="noopener noreferrer" className="cta-secondary cta-large">
                Contact me
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <div className="container">
          <div className="footer-content">
            <div className="footer-logo">Marig Sarrazin</div>
            <p className="footer-text">
              © 2024. Built with care.
            </p>
          </div>
        </div>
      </footer>

      {/* Modal Expertise */}
      <ExpertiseModal 
        expertise={selectedExpertise} 
        onClose={() => setSelectedExpertise(null)} 
      />

      {/* Modal Project */}
      <ProjectModal 
        project={selectedProject} 
        onClose={() => setSelectedProject(null)} 
      />

      {/* Modal Testimonial */}
      <TestimonialModal 
        testimonial={selectedTestimonial} 
        onClose={() => setSelectedTestimonial(null)} 
      />
    </div>
  )
}

export default Landing
