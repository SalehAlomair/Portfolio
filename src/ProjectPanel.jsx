import { useEffect, useRef } from "react";
import { createSpring } from "./motion";
import ProjectDiagrams from "./ProjectDiagrams";
import { email, github, linkedin, moreProjects } from "./projects";
import { resumeUrl } from "./config";

export default function ProjectPanel({ selection, onClose, onRest }) {
  const dialog = useRef(null),
    content = useRef(null),
    close = useRef(null),
    spring = useRef(null);
  const active = useRef(selection),
    opening = Boolean(selection);
  if (selection) active.current = selection;
  const project = active.current;
  useEffect(() => {
    const node = dialog.current;
    spring.current = createSpring(
      (value) => {
        node.style.setProperty("--panel-progress", String(value));
      },
      (target) => {
        if (target === 0 && node.open) {
          node.close();
          onRest?.();
        }
      },
    );
    return () => spring.current.stop();
  }, [onRest]);
  useEffect(() => {
    const node = dialog.current;
    if (opening && !node.open) {
      node.showModal();
      close.current?.focus();
    }
    if (opening) content.current?.scrollTo({ top: 0, behavior: "instant" });
    const media = matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => spring.current.to(opening ? 1 : 0, media.matches);
    update();
    media.addEventListener("change", update);
    return () => media.removeEventListener("change", update);
  }, [opening, selection]);
  useEffect(() => {
    if (!opening) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previous;
    };
  }, [opening]);
  function backdrop(event) {
    if (event.target !== dialog.current) return;
    const r = dialog.current.getBoundingClientRect();
    if (
      event.clientX < r.left ||
      event.clientX > r.right ||
      event.clientY < r.top ||
      event.clientY > r.bottom
    )
      onClose();
  }
  const about = project?.slug === "about";
  return (
    <dialog
      ref={dialog}
      className="project-panel"
      aria-labelledby="panel-title"
      onCancel={(e) => {
        e.preventDefault();
        onClose();
      }}
      onClick={backdrop}
    >
      <div className="panel-toolbar">
        <span>{about ? "Background & experience" : "Project overview"}</span>
        <button
          ref={close}
          className="icon-button"
          onClick={onClose}
          aria-label="Close project details"
        >
          ×
        </button>
      </div>
      <div className="panel-scroll" ref={content}>
        {project &&
          (about ? (
            <>
              <h2 id="panel-title">A little background.</h2>
              <p className="panel-lead">
                I’m a Computer Science graduate from Qassim University, focused
                on retrieval, agentic systems and Arabic NLP.
              </p>
              <section>
                <h3>Experience</h3>
                <p>
                  <strong>AI Engineer Intern · Smart Methods</strong>
                  <br />
                  June–August 2025
                </p>
                <p>
                  Built an Arabic voice assistant and a webcam-based driver
                  fatigue detection system.
                </p>
              </section>
              <section>
                <h3>Education</h3>
                <p>
                  <strong>B.Sc. Computer Science · Qassim University</strong>
                  <br />
                  Graduated June 2026 · GPA 4.28 / 5.00
                </p>
                <p>
                  <strong>
                    AI Solutions Development Bootcamp · Tuwaiq Academy
                  </strong>
                  <br />
                  July–September 2026. Baseerah team capstone.
                </p>
              </section>
              <section>
                <h3>Technical background</h3>
                <p>
                  Python, PyTorch, TensorFlow, scikit-learn, RAG, tool calling,
                  LlamaIndex, LangGraph, FAISS, FastAPI, Docker, SQL and Linux.
                </p>
                <p>
                  Currently exploring agent evaluation frameworks and production
                  LLM observability.
                </p>
              </section>
              <section>
                <h3>Further learning</h3>
                <p>
                  Machine Learning with Python, IBM. Introduction to Deep
                  Learning & Neural Networks with Keras, IBM. Complete Machine
                  Learning & Data Science, Udemy.
                </p>
              </section>
              <section>
                <h3>More work</h3>
                <p>
                  Additional repositories across retrieval, computer vision and
                  applied machine learning.
                </p>
                <div className="repository-list">
                  {[
                    [
                      "EvidenceOps",
                      "Governed research agent",
                      "evidenceops-agent",
                    ],
                    [
                      "Metro RAG",
                      "Bilingual transit retrieval",
                      "riyadh-metro-rag-ai-assistant",
                    ],
                    [
                      "Air quality",
                      "Team MLOps project",
                      "Riyadh-Air-Quality-Intelligence-Platform",
                    ],
                    ...moreProjects,
                  ].map(([name, description, repo]) => (
                    <a
                      key={repo}
                      href={`${github}/${repo}`}
                      target="_blank"
                      rel="noreferrer"
                    >
                      <span>
                        {name}
                        <small>{description}</small>
                      </span>
                      <span aria-hidden="true">↗</span>
                    </a>
                  ))}
                </div>
              </section>
              <div className="panel-actions">
                <a
                  className="button primary"
                  href={resumeUrl}
                  download
                >
                  Download resume ↓
                </a>
                <a
                  className="button"
                  href={linkedin}
                  target="_blank"
                  rel="noreferrer"
                >
                  LinkedIn ↗
                </a>
                <a href={`mailto:${email}`}>Email Saleh</a>
              </div>
            </>
          ) : (
            <>
              <h2 id="panel-title">{project.name}</h2>
              <p className="panel-subtitle">{project.subtitle}</p>
              <p className="panel-lead">{project.overview}</p>
              <div className="panel-diagram">
                <ProjectDiagrams kind={project.slug} />
              </div>
              <section>
                <h3>My contribution</h3>
                <p>{project.contribution}</p>
              </section>
              <section>
                <h3>How it works</h3>
                <ul>
                  {project.decisions.map((decision) => (
                    <li key={decision}>{decision}</li>
                  ))}
                </ul>
              </section>
              <section>
                <h3>Technology</h3>
                <p>{project.stack.join(", ")}</p>
              </section>
              <section className="project-limits">
                <h3>Status & scope</h3>
                <p>{project.limit}</p>
              </section>
              <div className="panel-actions">
                <a
                  className="button primary"
                  href={project.href}
                  target={
                    project.href.startsWith("https:") ? "_blank" : undefined
                  }
                  rel="noreferrer"
                >
                  {project.cta} ↗
                </a>
                {project.source && (
                  <a
                    className="button"
                    href={project.source}
                    target="_blank"
                    rel="noreferrer"
                  >
                    Inspect implementation ↗
                  </a>
                )}
              </div>
            </>
          ))}
      </div>
    </dialog>
  );
}
