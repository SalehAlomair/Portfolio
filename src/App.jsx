"use client";

import { useState } from "react";
import Chat from "./Chat";
import TwinLauncher from "./TwinLauncher";
import LandingDiagram from "./LandingDiagram";
import PortfolioSections from "./PortfolioSections";
import { featuredProjects } from "./featured-projects";
import { email, github, linkedin } from "./projects";
import { resumeUrl as resume } from "./config";
import { usePortfolioMotion } from "./usePortfolioMotion";

const actions = ["Explore Baseerah", "Explore support", "Explore AI twin"];
const summaries = {
  baseerah: "Evidence-backed research gaps.",
  support: "Support routing with LangGraph.",
  "digital-twin": "A personal AI guide to my work.",
};
export default function App() {
  const [chatOpen, setChatOpen] = useState(false);
  const mainRef = usePortfolioMotion();
  return (
    <>
      <a className="skip-link" href="#main">
        Skip to content
      </a>
      <header className="site-header page-width">
        <a className="wordmark" href="#main">
          Saleh Alomair
        </a>
        <nav aria-label="Main navigation">
          <a href="#work">Work</a>
          <a href="#about">About</a>
          <a href="#contact">Contact</a>
          <a href={resume} download>
            Resume <span aria-hidden="true">↓</span>
          </a>
        </nav>
      </header>
      <main id="main" ref={mainRef}>
        <div className="landing-overview">
          <section className="hero page-width" aria-labelledby="hero-title">
            <h1 id="hero-title">Saleh Alomair</h1>
            <div className="hero-bottom">
              <div className="positioning">
                <p>
                  <span className="hero-description-full">
                    AI Engineer. RAG, agents and applied machine learning.
                  </span>
                  <span className="hero-description-short">
                    AI Engineer. RAG & agent systems.
                  </span>
                </p>
                <p className="location">Riyadh, Saudi Arabia</p>
              </div>
              <div className="hero-actions">
                <a className="button primary" href="#work">
                  View work <span aria-hidden="true">→</span>
                </a>
                <a className="button" href={resume} download>
                  Resume <span aria-hidden="true">↓</span>
                </a>
                <a className="button" href="#contact">
                  Contact
                </a>
              </div>
            </div>
          </section>
          <section
            id="work"
            className="project-list"
            aria-label="Selected projects"
          >
            {featuredProjects.map((project, index) => (
              <article
                className={`project-row ${index === 0 ? "featured" : ""}`}
                id={project.slug}
                key={project.slug}
                aria-labelledby={`${project.slug}-title`}
              >
                <div className="project-inner page-width">
                  <div className="project-identity">
                    <h2 id={`${project.slug}-title`}>{project.name}</h2>
                    <p>{summaries[project.slug]}</p>
                  </div>
                  <div className="project-visual">
                    <LandingDiagram kind={project.slug} onOpenChat={() => setChatOpen(true)} />
                  </div>
                  <div className="project-action">
                    <a
                      className="button"
                      href={`#case-${project.slug}`}
                      aria-label={actions[index]}
                    >
                      Explore <span aria-hidden="true">↗</span>
                    </a>
                  </div>
                </div>
              </article>
            ))}
          </section>
          <div className="page-width site-footer overview-strip">
            <section className="expertise" aria-labelledby="expertise-title">
              <h2 id="expertise-title">Expertise</h2>
              <ul>
                {[
                  "Python",
                  "LlamaIndex",
                  "LangGraph",
                  "FAISS",
                  "FastAPI",
                  "Docker",
                ].map((skill) => (
                  <li key={skill}>{skill}</li>
                ))}
              </ul>
            </section>
            <section className="contact" aria-labelledby="contact-title">
              <h2 id="contact-title">Contact</h2>
              <div>
                <a className="email" href={`mailto:${email}`}>
                  {email}
                </a>
                <div className="social-links">
                  <a href={github} target="_blank" rel="noreferrer">
                    GitHub ↗
                  </a>
                  <a href={linkedin} target="_blank" rel="noreferrer">
                    LinkedIn ↗
                  </a>
                </div>
              </div>
            </section>
          </div>
        </div>
        <PortfolioSections
          resume={resume}
          onOpenChat={() => setChatOpen(true)}
        />
      </main>
      <footer className="page-width closing-footer">
        <a className="wordmark" href="#main">
          Saleh Alomair
        </a>
        <p>Riyadh, Saudi Arabia</p>
        <a href="#main">Back to top ↑</a>
      </footer>
      <TwinLauncher open={chatOpen} onOpen={() => setChatOpen(true)} />
      <Chat open={chatOpen} setOpen={setChatOpen} />
    </>
  );
}
