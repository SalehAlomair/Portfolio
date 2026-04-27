import { useEffect, useRef, useState } from 'react';

const projects = [
  {
    id: '01',
    title: 'Student Grading System',
    problem:
      'Academic teams need a clean way to manage grades, access, and reporting without jumping between spreadsheets and disconnected tools.',
    solution:
      'A Java-based desktop application with role-aware dashboards, structured student records, and database-backed workflows for day-to-day grading operations.',
    impact:
      'Makes the grading process more organized, reduces repetitive manual work, and presents a more production-like internal tool for academic use.',
    stack: ['Java', 'GUI', 'Database Design', 'Role-Based Access'],
    link: 'https://github.com/SalehAlomair/StudentGradingSystem',
  },
  {
    id: '02',
    title: 'Teachable Machine Classifier',
    problem:
      'Early-stage ML experiments often need a practical inference layer before they can be demoed, tested, or shared with others.',
    solution:
      'A Python/TensorFlow command-line classifier that wraps model inference into a simple workflow for image prediction and experimentation.',
    impact:
      'Turns a machine learning model into a usable product surface and shows the ability to work from model output to a working developer tool.',
    stack: ['Python', 'TensorFlow', 'CLI', 'Machine Learning'],
    link: 'https://github.com/SalehAlomair/CatDogClassifier',
  },
  {
    id: '03',
    title: 'Personal Portfolio Redesign',
    problem:
      'A technical profile needs more than a list of links. Recruiters want a strong narrative, product thinking, and evidence of polish.',
    solution:
      'A premium React and Tailwind experience with a monochrome brand system, concise storytelling, and project cards that read like real products.',
    impact:
      'Creates a stronger first impression, communicates focus, and gives a clearer view of the way I think about software and presentation.',
    stack: ['React', 'Tailwind CSS', 'Responsive UI', 'Motion Design'],
    link: 'https://github.com/SalehAlomair/MyWebsite',
  },
];

const skills = [
  'Java',
  'Python',
  'Machine Learning',
  'Data Science',
  'TensorFlow',
  'SQL',
  'React',
  'Tailwind CSS',
  'UI Systems',
  'GitHub',
];

const principles = [
  {
    title: 'Problem framing',
    text: 'Start by defining what the user actually needs, then shape the tool around that outcome.',
  },
  {
    title: 'Clean execution',
    text: 'Prefer a small number of deliberate interactions over noisy features that dilute the message.',
  },
  {
    title: 'Measured impact',
    text: 'Treat every project like something that should solve a real workflow or communicate a clear value.',
  },
];

function useReveal() {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const node = ref.current;

    if (!node) {
      return undefined;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.2 },
    );

    observer.observe(node);

    return () => observer.disconnect();
  }, []);

  return [ref, visible];
}

function Reveal({ children, delay = 0, className = '' }) {
  const [ref, visible] = useReveal();

  return (
    <div
      ref={ref}
      className={`transition-all duration-700 ease-out ${visible ? 'translate-y-0 opacity-100' : 'translate-y-6 opacity-0'} ${className}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
}

function SectionHeading({ eyebrow, title, description }) {
  return (
    <div className="mx-auto max-w-3xl text-center">
      <p className="mb-4 text-xs font-semibold uppercase tracking-[0.35em] text-white/50">{eyebrow}</p>
      <h2 className="font-display text-3xl font-semibold tracking-tight text-white sm:text-4xl">{title}</h2>
      <p className="mt-5 text-base leading-7 text-white/65 sm:text-lg">{description}</p>
    </div>
  );
}

function ProductCard({ item }) {
  return (
    <article className="group relative overflow-hidden rounded-[28px] border border-white/10 bg-white/[0.03] p-6 shadow-glow backdrop-blur-xl transition duration-500 hover:-translate-y-1 hover:border-white/20 hover:bg-white/[0.05] sm:p-8">
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/50 to-transparent opacity-60" />
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-sm font-medium tracking-[0.35em] text-white/35">{item.id}</p>
          <h3 className="mt-3 font-display text-2xl font-semibold tracking-tight text-white">{item.title}</h3>
        </div>
        <span className="rounded-full border border-white/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.3em] text-white/55">
          Featured
        </span>
      </div>

      <div className="mt-8 grid gap-5 lg:grid-cols-3">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-white/35">Problem</p>
          <p className="mt-3 text-sm leading-7 text-white/70">{item.problem}</p>
        </div>
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-white/35">Solution</p>
          <p className="mt-3 text-sm leading-7 text-white/70">{item.solution}</p>
        </div>
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-white/35">Impact</p>
          <p className="mt-3 text-sm leading-7 text-white/70">{item.impact}</p>
        </div>
      </div>

      <div className="mt-8 flex flex-wrap gap-2.5">
        {item.stack.map((tech) => (
          <span key={tech} className="rounded-full border border-white/10 bg-white/[0.04] px-3 py-1 text-xs font-medium text-white/70 transition group-hover:border-white/20 group-hover:bg-white/[0.06]">
            {tech}
          </span>
        ))}
      </div>

      <a
        href={item.link}
        target="_blank"
        rel="noreferrer"
        className="mt-8 inline-flex items-center gap-2 text-sm font-semibold text-white/85 transition group-hover:translate-x-1 group-hover:text-white"
      >
        View project
        <span aria-hidden="true">↗</span>
      </a>
    </article>
  );
}

function App() {
  return (
    <div className="relative min-h-screen overflow-hidden bg-ink-950 text-white selection:bg-white selection:text-black">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(255,255,255,0.12),_transparent_24%),radial-gradient(circle_at_80%_20%,_rgba(255,255,255,0.07),_transparent_20%),radial-gradient(circle_at_bottom,_rgba(255,255,255,0.05),_transparent_30%)]" />
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.035)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.035)_1px,transparent_1px)] bg-[size:64px_64px] opacity-20" />

      <header className="sticky top-0 z-50 border-b border-white/10 bg-black/70 backdrop-blur-2xl">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4 sm:px-6 lg:px-8">
          <a href="#top" className="font-display text-lg font-semibold tracking-[0.28em] text-white">
            SALEH
          </a>
          <nav className="hidden items-center gap-8 text-sm font-medium text-white/60 md:flex">
            <a className="transition hover:text-white" href="#work">
              Work
            </a>
            <a className="transition hover:text-white" href="#approach">
              Approach
            </a>
            <a className="transition hover:text-white" href="#contact">
              Contact
            </a>
          </nav>
          <a
            href="mailto:salehomair1424@gmail.com"
            className="rounded-full border border-white/15 bg-white px-4 py-2 text-sm font-semibold text-black transition hover:scale-[1.02] hover:bg-white/90"
          >
            Let’s talk
          </a>
        </div>
      </header>

      <main id="top" className="relative">
        <section className="mx-auto flex min-h-[calc(100vh-73px)] max-w-7xl flex-col justify-center px-5 py-20 sm:px-6 lg:px-8">
          <div className="grid items-center gap-16 lg:grid-cols-[1.15fr_0.85fr]">
            <Reveal className="max-w-3xl">
              <p className="mb-5 inline-flex rounded-full border border-white/10 bg-white/[0.04] px-4 py-2 text-xs font-semibold uppercase tracking-[0.35em] text-white/55">
                Computer Science • AI • Data Science
              </p>
              <h1 className="font-display text-5xl font-semibold tracking-tight text-white sm:text-6xl lg:text-7xl">
                Building intelligent products with a clean, premium point of view.
              </h1>
              <p className="mt-6 max-w-2xl text-lg leading-8 text-white/65 sm:text-xl">
                I am Saleh Alomair, a Computer Science student focused on AI, Data Science, Java,
                Python, and machine learning. I design work that feels precise, credible, and ready
                for serious technical evaluation.
              </p>

              <div className="mt-10 flex flex-col gap-4 sm:flex-row">
                <a
                  href="#work"
                  className="inline-flex items-center justify-center rounded-full bg-white px-6 py-3.5 text-sm font-semibold text-black transition duration-300 hover:-translate-y-0.5 hover:bg-white/90"
                >
                  Explore featured work
                </a>
                <a
                  href="#contact"
                  className="inline-flex items-center justify-center rounded-full border border-white/12 bg-white/[0.03] px-6 py-3.5 text-sm font-semibold text-white transition duration-300 hover:-translate-y-0.5 hover:border-white/25 hover:bg-white/[0.06]"
                >
                  Contact and profiles
                </a>
              </div>

              <dl className="mt-12 grid gap-4 sm:grid-cols-3">
                {[
                  ['Focus', 'AI / Data Science'],
                  ['Stack', 'Java / Python / React'],
                  ['Style', 'Minimal / Product-first'],
                ].map(([label, value]) => (
                  <div key={label} className="rounded-3xl border border-white/10 bg-white/[0.03] p-5">
                    <dt className="text-xs uppercase tracking-[0.3em] text-white/35">{label}</dt>
                    <dd className="mt-3 font-display text-lg font-semibold text-white">{value}</dd>
                  </div>
                ))}
              </dl>
            </Reveal>

            <Reveal delay={150} className="lg:justify-self-end">
              <div className="relative mx-auto w-full max-w-xl rounded-[32px] border border-white/10 bg-white/[0.04] p-6 shadow-glow backdrop-blur-2xl">
                <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/60 to-transparent" />
                <div className="flex items-center justify-between text-xs uppercase tracking-[0.35em] text-white/40">
                  <span>Profile snapshot</span>
                  <span>2026</span>
                </div>
                <div className="mt-8 rounded-[24px] border border-white/10 bg-black/40 p-6">
                  <p className="text-sm font-medium uppercase tracking-[0.35em] text-white/35">
                    Brand signal
                  </p>
                  <h2 className="mt-4 font-display text-3xl font-semibold tracking-tight text-white">
                    Intelligent. Structured. Recruiter-ready.
                  </h2>
                  <p className="mt-4 text-sm leading-7 text-white/65">
                    This portfolio is designed to communicate more than code. It frames the work as
                    a set of purposeful products with clear outcomes and a refined visual identity.
                  </p>
                </div>
                <div className="mt-6 grid gap-4 sm:grid-cols-2">
                  <div className="rounded-[22px] border border-white/10 bg-white/[0.03] p-5">
                    <p className="text-xs uppercase tracking-[0.3em] text-white/35">Primary tools</p>
                    <p className="mt-3 text-sm leading-6 text-white/70">Java, Python, TensorFlow, React, Tailwind CSS</p>
                  </div>
                  <div className="rounded-[22px] border border-white/10 bg-white/[0.03] p-5">
                    <p className="text-xs uppercase tracking-[0.3em] text-white/35">Working style</p>
                    <p className="mt-3 text-sm leading-6 text-white/70">Clear problem framing, calm execution, polished delivery</p>
                  </div>
                </div>
              </div>
            </Reveal>
          </div>
        </section>

        <section id="work" className="mx-auto max-w-7xl px-5 py-24 sm:px-6 lg:px-8 lg:py-32">
          <Reveal>
            <SectionHeading
              eyebrow="Selected work"
              title="Projects presented as real products, not just repositories."
              description="Each project below is framed around the problem it solves, the way it works, and the impact it creates. That is the level recruiters expect from a strong technical portfolio."
            />
          </Reveal>

          <div className="mt-16 grid gap-6">
            {projects.map((project, index) => (
              <Reveal key={project.id} delay={index * 120}>
                <ProductCard item={project} />
              </Reveal>
            ))}
          </div>
        </section>

        <section id="approach" className="mx-auto max-w-7xl px-5 py-24 sm:px-6 lg:px-8 lg:py-32">
          <Reveal>
            <SectionHeading
              eyebrow="Design approach"
              title="Minimal surface area, high signal, strong attention to detail."
              description="The visual system uses black, white, and subtle gray gradients to keep the site sharp and premium while staying focused on the work."
            />
          </Reveal>

          <div className="mt-16 grid gap-6 lg:grid-cols-3">
            {principles.map((principle, index) => (
              <Reveal key={principle.title} delay={index * 100}>
                <div className="h-full rounded-[28px] border border-white/10 bg-white/[0.03] p-7 shadow-glow backdrop-blur-xl transition duration-300 hover:-translate-y-1 hover:border-white/20">
                  <p className="text-sm font-semibold uppercase tracking-[0.3em] text-white/35">0{index + 1}</p>
                  <h3 className="mt-5 font-display text-2xl font-semibold tracking-tight text-white">{principle.title}</h3>
                  <p className="mt-4 text-sm leading-7 text-white/68">{principle.text}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-5 py-24 sm:px-6 lg:px-8 lg:py-32">
          <Reveal>
            <div className="rounded-[36px] border border-white/10 bg-white/[0.03] p-8 shadow-glow backdrop-blur-xl sm:p-10 lg:p-12">
              <div className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:items-start">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.35em] text-white/35">Skills</p>
                  <h2 className="mt-4 font-display text-3xl font-semibold tracking-tight text-white">
                    Focused on the stack that supports modern AI product work.
                  </h2>
                </div>
                <div className="flex flex-wrap gap-3">
                  {skills.map((skill) => (
                    <span
                      key={skill}
                      className="rounded-full border border-white/10 bg-black/40 px-4 py-2 text-sm font-medium text-white/72 transition hover:border-white/20 hover:bg-white/[0.06]"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </Reveal>
        </section>

        <section id="contact" className="mx-auto max-w-7xl px-5 pb-24 sm:px-6 lg:px-8 lg:pb-32">
          <Reveal>
            <SectionHeading
              eyebrow="Contact"
              title="Open to roles, collaborations, and serious product conversations."
              description="If you want a portfolio that feels concise, intelligent, and globally competitive, this is the right direction."
            />
          </Reveal>

          <div className="mt-16 grid gap-6 md:grid-cols-2">
            {[
              {
                label: 'Email',
                value: 'salehomair1424@gmail.com',
                href: 'mailto:salehomair1424@gmail.com',
              },
              {
                label: 'GitHub',
                value: '@SalehAlomair',
                href: 'https://github.com/SalehAlomair',
              },
              {
                label: 'LinkedIn',
                value: 'Saleh-Alomair',
                href: 'https://www.linkedin.com/in/saleh-alomair-0aa833361/',
              },
              {
                label: 'X / Twitter',
                value: '@RedModule',
                href: 'https://twitter.com/RedModule',
              },
            ].map((contact) => (
              <Reveal key={contact.label}>
                <a
                  href={contact.href}
                  target={contact.href.startsWith('http') ? '_blank' : '_self'}
                  rel={contact.href.startsWith('http') ? 'noreferrer' : undefined}
                  className="group flex h-full items-center justify-between rounded-[26px] border border-white/10 bg-white/[0.03] p-6 transition duration-300 hover:-translate-y-1 hover:border-white/20 hover:bg-white/[0.06]"
                >
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-[0.3em] text-white/35">{contact.label}</p>
                    <p className="mt-3 font-display text-xl font-semibold tracking-tight text-white">{contact.value}</p>
                  </div>
                  <span className="text-xl text-white/40 transition duration-300 group-hover:translate-x-1 group-hover:-translate-y-1 group-hover:text-white">
                    ↗
                  </span>
                </a>
              </Reveal>
            ))}
          </div>
        </section>
      </main>

      <footer className="border-t border-white/10 px-5 py-8 text-center text-sm text-white/40 sm:px-6 lg:px-8">
        Built for a cleaner first impression. Designed for recruiters who expect clarity.
      </footer>
    </div>
  );
}

export default App;
