import { useEffect, useRef, useState } from 'react'
import './Landing.css'
import marigAvatar from './assets/marig.jpg'

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

// Composants pour les animations individuelles
function SkillCard({ skill, index }: { skill: { name: string; type: string; level?: string }, index: number }) {
  const cardRef = useScrollAnimation({ threshold: 0.1, rootMargin: '0px 0px -50px 0px' })
  
  const getIcon = () => {
    if (skill.type === "Language") {
      // Drapeaux pour les langues
      const flagMap: { [key: string]: string } = {
        "French": "https://flagcdn.com/w40/fr.png",
        "English": "https://flagcdn.com/w40/gb.png",
        "Spanish": "https://flagcdn.com/w40/es.png"
      }
      return (
        <img 
          src={flagMap[skill.name] || "https://flagcdn.com/w40/xx.png"} 
          alt={skill.name}
          className="skill-flag"
        />
      )
    } else if (skill.type === "Software") {
      // Logos des outils via Simple Icons
      const logoMap: { [key: string]: string } = {
        "Hubspot": "hubspot",
        "Airtable": "airtable",
        "Notion": "notion",
        "Metabase": "metabase",
        "Smart Recruiters": "smart",
        "SQL": "mysql"
      }
      const iconName = logoMap[skill.name] || skill.name.toLowerCase().replace(/\s+/g, '')
      return (
        <img 
          src={`https://cdn.simpleicons.org/${iconName}/8b5cf6`}
          alt={skill.name}
          className="skill-logo"
          onError={(e) => {
            // Fallback vers icône SVG générique
            e.currentTarget.style.display = 'none'
            const fallback = e.currentTarget.parentElement
            if (fallback) {
              fallback.innerHTML = '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><rect x="3" y="3" width="18" height="18" rx="2" stroke="currentColor" strokeWidth="2"/><path d="M9 9H15M9 15H15" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/></svg>'
            }
          }}
        />
      )
    } else {
      // Icônes pour les expertises basées sur les mots-clés
      const expertiseIcons: { [key: string]: React.ReactElement } = {
        "Product Management": (
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect x="3" y="3" width="18" height="18" rx="2" stroke="currentColor" strokeWidth="2"/>
            <path d="M9 9h6v6H9z" fill="currentColor"/>
          </svg>
        ),
        "Sales Operations": (
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M3 3v18h18" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
            <path d="M7 16l4-4 4 4 4-4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        ),
        "People strategy": (
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="12" cy="8" r="4" stroke="currentColor" strokeWidth="2"/>
            <path d="M6 21v-2a4 4 0 0 1 4-4h4a4 4 0 0 1 4 4v2" stroke="currentColor" strokeWidth="2"/>
          </svg>
        ),
        "CRM implementation (+ATS)": (
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect x="3" y="4" width="18" height="16" rx="2" stroke="currentColor" strokeWidth="2"/>
            <path d="M3 10h18" stroke="currentColor" strokeWidth="2"/>
            <circle cx="7" cy="7" r="1" fill="currentColor"/>
          </svg>
        ),
        "Change Management": (
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="2"/>
            <path d="M12 1v6m0 6v6M23 12h-6M7 12H1" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
          </svg>
        ),
        "Data analysis": (
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M3 3v18h18" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
            <path d="M7 16l4-8 4 4 4-8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        ),
        "Knowledge Management": (
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M12 2L2 7l10 5 10-5-10-5z" stroke="currentColor" strokeWidth="2" strokeLinejoin="round"/>
            <path d="M2 17l10 5 10-5M2 12l10 5 10-5" stroke="currentColor" strokeWidth="2" strokeLinejoin="round"/>
          </svg>
        ),
        "Learning & Development": (
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
            <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" stroke="currentColor" strokeWidth="2"/>
          </svg>
        ),
        "Project Management": (
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect x="3" y="4" width="18" height="18" rx="2" stroke="currentColor" strokeWidth="2"/>
            <path d="M3 10h18M9 4v6" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
          </svg>
        ),
        "Team Management": (
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" stroke="currentColor" strokeWidth="2"/>
            <circle cx="9" cy="7" r="4" stroke="currentColor" strokeWidth="2"/>
            <path d="M23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" stroke="currentColor" strokeWidth="2"/>
          </svg>
        ),
        "Talent acquisition": (
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M12 2L2 7l10 5 10-5-10-5z" stroke="currentColor" strokeWidth="2" strokeLinejoin="round"/>
            <path d="M2 17l10 5 10-5M2 12l10 5 10-5" stroke="currentColor" strokeWidth="2" strokeLinejoin="round"/>
            <circle cx="12" cy="12" r="1" fill="currentColor"/>
          </svg>
        )
      }
      
      return expertiseIcons[skill.name] || (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2"/>
          <path d="M12 6v6l4 2" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
        </svg>
      )
    }
  }
  
  return (
    <div
      ref={cardRef.ref}
      className={`skill-bubble ${cardRef.isVisible ? 'animate-in' : ''} skill-${skill.type.toLowerCase()}`}
      style={{ 
        animationDelay: `${index * 0.05}s`,
        '--float-delay': `${index * 0.3}s`
      } as React.CSSProperties}
    >
      <div className="skill-bubble-icon">
        {getIcon()}
      </div>
      <div className="skill-bubble-info">
        <span className="skill-bubble-name">{skill.name}</span>
        {skill.level && <span className="skill-bubble-level">{skill.level}</span>}
      </div>
    </div>
  )
}

function ProjectCard({ project, index }: { project: { name: string; category: string; description: string; tools: string[] }, index: number }) {
  const cardRef = useScrollAnimation({ threshold: 0.1, rootMargin: '0px 0px -50px 0px' })
  
  // Map tools to their icons
  const getToolIcon = (tool: string) => {
    const softwareIcons: { [key: string]: string } = {
      "Hubspot": "hubspot",
      "Airtable": "airtable",
      "Notion": "notion",
      "Smart Recruiters": "smart",
    }
    
    if (softwareIcons[tool]) {
      return (
        <img 
          src={`https://cdn.simpleicons.org/${softwareIcons[tool]}/8b5cf6`}
          alt={tool}
          className="tool-icon-img"
          onError={(e) => { e.currentTarget.style.display = 'none' }}
        />
      )
    }
    
    // Default folder icon for expertise
    return (
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <rect x="3" y="3" width="18" height="18" rx="2"/>
        <path d="M9 9h6M9 15h6"/>
      </svg>
    )
  }
  
  return (
    <div
      ref={cardRef.ref}
      className={`project-card ${cardRef.isVisible ? 'animate-in' : ''}`}
      style={{ animationDelay: `${index * 0.08}s` }}
    >
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

function TestimonialCard({ testimonial, index }: { testimonial: { name: string; role: string; text: string }, index: number }) {
  const cardRef = useScrollAnimation({ threshold: 0.1, rootMargin: '0px 0px -50px 0px' })
  return (
    <div
      ref={cardRef.ref}
      className={`testimonial-card ${cardRef.isVisible ? 'animate-in' : ''}`}
      style={{ animationDelay: `${index * 0.1}s` }}
    >
      <div className="testimonial-quote-mark">"</div>
      <p className="testimonial-text">{testimonial.text}</p>
      <div className="testimonial-author">
        <div className="author-info">
          <div className="author-name">{testimonial.name}</div>
          <div className="author-role">{testimonial.role}</div>
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
  const [activeSkillCategory, setActiveSkillCategory] = useState<'Expertise' | 'Software' | 'Language'>('Expertise')

  const [activeProjectCategory, setActiveProjectCategory] = useState<string>('All')
  
  const projects = [
    {
      name: "End-to-end CRM deployment at Alter Solutions",
      category: "Product",
      description: "Across five countries, teams were using different CRM and ATS tools. The mission was to centralise and standardise operations, resulting in the full deployment of HubSpot for sales and SmartRecruiters for recruitment, reporting directly to the CEOs.",
      tools: ["CRM implementation (+ATS)", "Hubspot", "Smart Recruiters", "Airtable", "Change Management"]
    },
    {
      name: "Customer Success Strategy & MVP Launch at Le Wagon",
      category: "Product",
      description: "Strategic development and launch of customer success initiatives with MVP implementation.",
      tools: ["Product", "Sales"]
    },
    {
      name: "Redesign of a soft skills learning experience at Le Wagon",
      category: "People",
      description: "Complete redesign of the soft skills curriculum and learning experience for bootcamp students.",
      tools: ["Learning & Development", "Product Management"]
    },
    {
      name: "Development an internal candidate-matching system at Amaris",
      category: "People",
      description: "Built an internal system to match candidates with job opportunities more efficiently.",
      tools: ["Talent acquisition", "Data analysis", "Airtable"]
    },
    {
      name: "No code CRM at White Wave",
      category: "Sales",
      description: "Development of a no-code CRM solution tailored for business needs.",
      tools: ["No code", "CRM", "Airtable", "Notion"]
    }
  ]
  
  const projectCategories = ['All', 'Product', 'People', 'Sales', 'Data']
  const filteredProjects = activeProjectCategory === 'All' 
    ? projects 
    : projects.filter(p => p.category === activeProjectCategory)

  const skills = [
    { name: "Product Management", type: "Expertise" },
    { name: "Sales Operations", type: "Expertise" },
    { name: "People strategy", type: "Expertise" },
    { name: "CRM implementation (+ATS)", type: "Expertise" },
    { name: "Change Management", type: "Expertise" },
    { name: "Data analysis", type: "Expertise" },
    { name: "Knowledge Management", type: "Expertise" },
    { name: "Learning & Development", type: "Expertise" },
    { name: "Project Management", type: "Expertise" },
    { name: "Team Management", type: "Expertise" },
    { name: "Talent acquisition", type: "Expertise" },
    { name: "Hubspot", type: "Software" },
    { name: "Airtable", type: "Software" },
    { name: "Notion", type: "Software" },
    { name: "Metabase", type: "Software" },
    { name: "Smart Recruiters", type: "Software" },
    { name: "SQL", type: "Software" },
    { name: "French", type: "Language", level: "Native" },
    { name: "English", type: "Language", level: "C1" },
    { name: "Spanish", type: "Language", level: "B2" }
  ]

  const testimonials = [
    {
      name: "Antonin Goisque",
      role: "Founder at White Wave",
      text: "Marig brought exceptional expertise in sales operations and CRM implementation. Her ability to understand complex business needs and translate them into efficient systems is remarkable."
    },
    {
      name: "Thomas Bouttefort",
      role: "VP Products & Ops",
      text: "Working with Marig on product management and data analysis has been a game-changer. Her strategic thinking and technical skills create real impact."
    },
    {
      name: "Edward Schults",
      role: "CTO",
      text: "Marig's expertise in product management and knowledge management helped us build better systems. Her approach is both methodical and creative."
    }
  ]

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
              Expertise
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
            <a href="https://airtable.com/appJLiWmb5Ix5hoLV/pagLQjfRe0JhDbmXv/form" target="_blank" rel="noopener noreferrer" className="nav-link nav-link-cta">
              <span className="nav-link-icon">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M22 2L11 13M22 2l-7 20-4-9-9-4 20-7z"/>
                </svg>
              </span>
              Contact
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
              <h2 className="skills-title">Expertise & Tools</h2>
              <p className="skills-description">
                A versatile skill set spanning operations, product, and technology
              </p>
            </div>
            <div className="skills-tabs-wrapper">
              <div className="skills-tabs">
                {(['Expertise', 'Software', 'Language'] as const).map((category) => {
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
            <div className="skills-cloud">
              {skills.filter(skill => skill.type === activeSkillCategory).map((skill, index, arr) => {
                const total = arr.length;
                const goldenAngle = Math.PI * (3 - Math.sqrt(5)); // ~137.5 degrees
                
                // Adapter le rayon selon le nombre d'éléments
                // Peu d'éléments = plus compact, beaucoup = plus étalé
                const maxRadius = total <= 3 ? 20 : total <= 6 ? 28 : 35;
                const startRadius = total <= 3 ? 12 : total <= 6 ? 10 : 8;
                
                const angle = index * goldenAngle;
                const radius = startRadius + Math.sqrt(index / total) * maxRadius;
                
                // Jitter réduit pour les petits groupes
                const jitterScale = total <= 3 ? 0.5 : 1;
                const jitterX = (((index * 7) % 5) - 2) * jitterScale;
                const jitterY = (((index * 11) % 5) - 2) * jitterScale;
                
                const x = 50 + Math.cos(angle) * radius + jitterX;
                const y = 50 + Math.sin(angle) * radius + jitterY;
                
                return (
                  <div 
                    key={`${activeSkillCategory}-${skill.name}-${index}`}
                    className="cloud-bubble"
                    style={{ 
                      left: `${Math.max(15, Math.min(85, x))}%`,
                      top: `${Math.max(20, Math.min(80, y))}%`,
                      animationDelay: `${index * 0.05}s`,
                      '--float-delay': `${(index * 0.4) % 4}s`,
                      '--float-duration': `${5 + (index % 3)}s`
                    } as React.CSSProperties}
                  >
                    <SkillCard skill={skill} index={index} />
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="section projects-section">
        <div className="container">
          <div 
            ref={projectsRef.ref}
            className={`projects-header ${projectsRef.isVisible ? 'animate-in' : ''}`}
          >
            <h2 className="projects-title">Projects</h2>
            <div className="projects-filters">
              <div className="projects-tabs">
                {projectCategories.map((category) => (
                  <button
                    key={category}
                    className={`project-tab ${activeProjectCategory === category ? 'active' : ''}`}
                    onClick={() => setActiveProjectCategory(category)}
                  >
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z"/>
                    </svg>
                    {category}
                  </button>
                ))}
              </div>
            </div>
          </div>
          <div className="projects-grid">
            {filteredProjects.map((project, index) => (
              <ProjectCard key={`${activeProjectCategory}-${project.name}`} project={project} index={index} />
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section id="testimonials" className="section testimonials-section">
        <div className="container">
          <div 
            ref={testimonialsRef.ref}
            className={`section-header ${testimonialsRef.isVisible ? 'animate-in' : ''}`}
          >
            <div className="section-badge">Testimonials</div>
            <h2 className="section-title">What clients say</h2>
            <p className="section-subtitle">
              Trusted by teams and leaders across industries
            </p>
          </div>
          <div className="testimonials-grid">
            {testimonials.map((testimonial, index) => (
              <TestimonialCard key={index} testimonial={testimonial} index={index} />
            ))}
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
              Whether it's operations, product strategy, or CRM implementation, I'm here to help bring your vision to life.
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
    </div>
  )
}

export default Landing
