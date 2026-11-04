import { useState } from "react";
import ProjectDiagrams from "./ProjectDiagrams";
import { featuredProjects } from "./featured-projects";
import { email, github, linkedin, moreProjects, projects } from "./projects";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "./components/ui/accordion";

const caseNotes = {
  baseerah: {
    problem:
      "A paper can describe a research limitation that newer work has already addressed. Finding a candidate gap is only the start; a researcher also needs evidence that it remains open.",
    scope:
      "Tuwaiq Academy team capstone. The source is private, and the project includes staged execution and mock recommendation paths. A walkthrough is available on request.",
  },
  support: {
    problem:
      "A factual question, a diagnostic request and a case needing human help should not follow the same path. The workflow needs to select the right capability and preserve context between steps.",
    scope:
      "A repository-backed demonstration with component tests, training artifacts and router evaluation outputs. Diagnostic tools are demo tools. Langfuse tracing is optional.",
  },
  "digital-twin": {
    problem:
      "A portfolio gives a quick overview, but recruiters often have specific questions about project decisions, experience or fit. An assistant needs grounded context and a clear route to contact the person behind the work.",
    scope:
      "Adapted from the original Python / Gradio twin into a small FastAPI backend. The public portfolio now uses live DeepSeek answers; unanswered questions are not stored on the hosted service.",
  },
};
const expertise = [
  [
    "Retrieval & agents",
    "RAG, multilingual embeddings, vector search, tool calling and explicit agent workflows.",
    "LlamaIndex · LangGraph · FAISS",
    "See the research workflow",
    "#case-baseerah",
  ],
  [
    "Machine learning",
    "Model training, classification, transfer learning and parameter-efficient fine-tuning.",
    "PyTorch · TensorFlow · scikit-learn · LoRA",
    "Explore the support system",
    "#case-support",
  ],
  [
    "APIs & delivery",
    "Python services, containerized applications and connecting models to usable interfaces.",
    "FastAPI · Docker · AWS · CI/CD",
    "Inside the Digital Twin",
    "#case-digital-twin",
  ],
  [
    "Data & language",
    "Arabic NLP, bilingual retrieval, data preparation and evaluation of project-specific behavior.",
    "Python · SQL · Linux",
    "Browse more work",
    "#more-work",
  ],
];

export default function PortfolioSections({ resume, onOpenChat }) {
  const [archiveOpen, setArchiveOpen] = useState(false);
  return (
    <div className="extended-portfolio">
      <div className="about-page">
        <nav
          className="section-navigation page-width"
          aria-label="Portfolio sections"
        >
          <a href="#about">About</a>
          <a href="#case-studies">Case studies</a>
          <a href="#more-work">More work</a>
          <a href="#experience">Experience</a>
          <a href="#expertise">Expertise</a>
          <a href="#contact">Contact</a>
        </nav>
        <section
          id="about"
          className="about-section page-width content-section"
          aria-labelledby="about-title"
        >
          <div className="section-intro">
            <h2 id="about-title">About Saleh.</h2>
            <p>
              I build AI systems around retrieval, explicit workflows and useful
              applications.
            </p>
          </div>
          <div className="about-copy">
            <p className="large-copy">
              I’m an AI Engineer based in Riyadh and a Computer Science graduate
              from Qassim University.
            </p>
            <p>
              My work spans research-gap verification, multi-model support agents
              and Arabic language applications. I’m interested in how models
              connect to evidence, how tools are selected, and how the result
              becomes a usable product.
            </p>
            <p>
              At Tuwaiq Academy, I contributed to Baseerah’s gap verification,
              search embeddings and AWS deployment. During my internship at Smart
              Methods, I worked on an Arabic voice assistant and driver fatigue
              detection.
            </p>
            <div className="text-actions">
              <a href={resume} download>
                Download my resume ↓
              </a>
              <a href={linkedin} target="_blank" rel="noreferrer">
                Connect on LinkedIn ↗
              </a>
            </div>
          </div>
        </section>
      </div>

      <section
        id="case-studies"
        className="case-studies content-section"
        aria-labelledby="cases-title"
      >
        {featuredProjects.map((project) => (
          <div className="case-page" key={project.slug}>
            {project.slug === "baseerah" && (
              <div className="section-intro page-width cases-intro">
                <h2 id="cases-title">Inside the work.</h2>
                <p>
                  The problems, engineering decisions and my contribution to each
                  featured project.
                </p>
              </div>
            )}
            <article
              id={`case-${project.slug}`}
              className={`full-case case-${project.slug}`}
              aria-labelledby={`case-title-${project.slug}`}
            >
              <div className="page-width">
                <header className="case-heading">
                  <div>
                    <h3 id={`case-title-${project.slug}`}>{project.name}</h3>
                    <p>{project.subtitle}</p>
                  </div>
                  <a
                    className="button"
                    href={project.href}
                    target={
                      project.href.startsWith("https:") ? "_blank" : undefined
                    }
                    rel="noreferrer"
                  >
                    {project.cta} <span aria-hidden="true">↗</span>
                  </a>
                </header>
                <div className="case-overview">
                  <p>{project.overview}</p>
                  <div className="case-workflow">
                    <ProjectDiagrams kind={project.slug} />
                  </div>
                </div>
                <div className="case-editorial-grid">
                  <section>
                    <h4>The problem</h4>
                    <p>{caseNotes[project.slug].problem}</p>
                  </section>
                  <section>
                    <h4>My contribution</h4>
                    <p>{project.contribution}</p>
                  </section>
                </div>
                <section className="case-decisions">
                  <h4>Engineering decisions</h4>
                  <ul>
                    {project.decisions.map((decision) => (
                      <li key={decision}>{decision}</li>
                    ))}
                  </ul>
                </section>
                <div className="case-meta">
                  <section>
                    <h4>Built with</h4>
                    <p>{project.stack.join(" · ")}</p>
                  </section>
                  <section>
                    <h4>Project status</h4>
                    <p>{caseNotes[project.slug].scope}</p>
                    {project.source && (
                      <a
                        className="text-link"
                        href={project.source}
                        target="_blank"
                        rel="noreferrer"
                      >
                        Read the implementation ↗
                      </a>
                    )}
                    {project.slug === "digital-twin" && (
                      <button
                        className="text-link"
                        onClick={onOpenChat}
                        aria-haspopup="dialog"
                      >
                        Try the portfolio assistant ↗
                      </button>
                    )}
                  </section>
                </div>
              </div>
            </article>
          </div>
        ))}
      </section>

      <section
        id="more-work"
        className="more-work page-width content-section"
        aria-labelledby="more-title"
      >
        <div className="section-intro">
          <h2 id="more-title">More work.</h2>
          <p>
            Further projects in grounded research, bilingual retrieval and
            applied machine learning.
          </p>
        </div>
        <div className="additional-projects">
          {projects
            .filter((project) => project.slug !== "support")
            .map((project) => (
              <article className="additional-project" key={project.slug}>
                <div>
                  <h3>{project.name}</h3>
                  <p className="additional-category">{project.category}</p>
                </div>
                <div>
                  <p>{project.description}</p>
                  {project.credit && (
                    <p className="additional-credit">
                      Team project. My contribution: the weather and pollution
                      data pipeline and threshold calibration.
                    </p>
                  )}
                  <p className="additional-stack">{project.stack}</p>
                </div>
                <a
                  className="text-link"
                  href={`${github}/${project.repo}`}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={`View ${project.name} repository`}
                >
                  View source ↗
                </a>
              </article>
            ))}
        </div>
        <Accordion type="single" collapsible variant="ghost" indicator="plus" className="project-archive"
          value={archiveOpen ? 'repositories' : ''} onValueChange={value => setArchiveOpen(Boolean(value))}>
          <AccordionItem value="repositories">
          <AccordionTrigger className="archive-trigger">
            More experiments & repositories
          </AccordionTrigger>
          <AccordionContent forceMount inert={!archiveOpen} aria-hidden={!archiveOpen} className="archive-content">
          <div className="archive-grid">
            {moreProjects.map(([name, description, repo]) => (
              <a
                href={`${github}/${repo}`}
                target="_blank"
                rel="noreferrer"
                key={repo}
              >
                <span>
                  {name}
                  <small>{description}</small>
                </span>
                <span aria-hidden="true">↗</span>
              </a>
            ))}
          </div>
          </AccordionContent>
          </AccordionItem>
        </Accordion>
      </section>

      <section
        id="experience"
        className="experience-section content-section"
        aria-labelledby="experience-title"
      >
        <div className="page-width">
          <div className="section-intro">
            <h2 id="experience-title">Experience & education.</h2>
            <p>
              A foundation in computer science, developed through practical AI
              projects.
            </p>
          </div>
          <div className="experience-layout">
            <div className="experience-list">
              <article className="experience-entry">
                <p className="entry-date">July–September 2026</p>
                <div>
                  <h3>Tuwaiq Academy</h3>
                  <p className="entry-role">
                    AI Solutions Development Bootcamp
                  </p>
                  <p>
                    Developed applied AI projects and contributed to Baseerah as
                    a team capstone, focusing on research-gap verification,
                    search embeddings and AWS deployment with CI/CD.
                  </p>
                  <a className="text-link" href="#case-baseerah">
                    Explore the capstone ↗
                  </a>
                </div>
              </article>
              <article className="experience-entry">
                <p className="entry-date">June–August 2025</p>
                <div>
                  <h3>Smart Methods</h3>
                  <p className="entry-role">AI Engineer Intern</p>
                  <p>
                    Built an Arabic voice assistant with speech recognition and
                    spoken responses, and a webcam-based driver fatigue
                    detection system.
                  </p>
                  <div className="text-actions">
                    <a
                      href={`${github}/Saleh-Arabic-AI-Voice-Assistant`}
                      target="_blank"
                      rel="noreferrer"
                    >
                      Voice assistant ↗
                    </a>
                    <a
                      href={`${github}/fatigue-monitor`}
                      target="_blank"
                      rel="noreferrer"
                    >
                      Fatigue monitor ↗
                    </a>
                  </div>
                </div>
              </article>
            </div>
            <aside
              className="education-column"
              aria-label="Education and further learning"
            >
              <section>
                <h3>Qassim University</h3>
                <p className="entry-role">B.Sc. Computer Science</p>
                <p>Graduated June 2026</p>
                <p className="education-grade">GPA 4.28 / 5.00</p>
              </section>
              <section>
                <h3>Further learning</h3>
                <ul className="learning-list">
                  <li>
                    Machine Learning with Python <span>IBM</span>
                  </li>
                  <li>
                    Introduction to Deep Learning & Neural Networks with Keras{" "}
                    <span>IBM</span>
                  </li>
                  <li>
                    Complete Machine Learning & Data Science <span>Udemy</span>
                  </li>
                </ul>
              </section>
            </aside>
          </div>
        </div>
      </section>

      <section
        id="expertise"
        className="expertise-section page-width content-section"
        aria-labelledby="technical-title"
      >
        <div className="section-intro">
          <h2 id="technical-title">Technical expertise.</h2>
          <p>Tools and methods connected to the work above.</p>
        </div>
        <div className="expertise-grid">
          {expertise.map(([name, description, tools, action, href]) => (
            <article key={name}>
              <h3>{name}</h3>
              <p>{description}</p>
              <p className="expertise-tools">{tools}</p>
              <a className="text-link" href={href}>
                {action} ↗
              </a>
            </article>
          ))}
        </div>
      </section>

      <section
        id="contact"
        className="contact-section content-section"
        aria-labelledby="full-contact-title"
      >
        <div className="page-width contact-layout">
          <div>
            <h2 id="full-contact-title">Let’s talk.</h2>
            <p>
              Have an AI engineering role or a project in mind? I’d be happy to
              discuss my work and how I can contribute.
            </p>
            <p className="contact-location">Based in Riyadh, Saudi Arabia.</p>
            <a
              className="button primary"
              href={`mailto:${email}?subject=AI%20engineering%20opportunity`}
            >
              Get in touch <span aria-hidden="true">↗</span>
            </a>
          </div>
          <div className="contact-directory">
            <a href={`mailto:${email}`}>
              <span>
                Email<small>{email}</small>
              </span>
              <span aria-hidden="true">↗</span>
            </a>
            <a href={linkedin} target="_blank" rel="noreferrer">
              <span>
                LinkedIn<small>Connect with Saleh</small>
              </span>
              <span aria-hidden="true">↗</span>
            </a>
            <a href={github} target="_blank" rel="noreferrer">
              <span>
                GitHub<small>Explore the source</small>
              </span>
              <span aria-hidden="true">↗</span>
            </a>
            <a href={resume} download>
              <span>
                Resume<small>Download PDF</small>
              </span>
              <span aria-hidden="true">↓</span>
            </a>
            <button onClick={onOpenChat} aria-haspopup="dialog">
              <span>
                AI Digital Twin
                <small>Ask about my background and projects</small>
              </span>
              <span aria-hidden="true">↗</span>
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
