import { useEffect, useRef, useState } from "react";
import { motion, useReducedMotion, useScroll, useSpring, useTransform } from "framer-motion";

const NAV = [["About", "about"], ["Toolkit", "skills"], ["Journey", "experience"], ["Work", "projects"], ["Achievements", "achievements"], ["Certifications", "certifications"]];
const SKILLS = [
  ["Languages", ["Python", "Java", "C++", "C", "TypeScript"]],
  ["AI & Data", ["Scikit-learn", "Pandas", "Transformers", "TensorFlow", "SQL"]],
  ["Web", ["React", "Next.js", "JavaScript", "HTML / CSS", "Tailwind CSS"]],
  ["Tools", ["FastAPI", "REST APIs", "Docker", "AWS", "Git"]],
];
const EXPERIENCE = [
  { period: "2024", title: "AI-ML Virtual Internship", org: "Google for Developers / EduSkills", body: "A hands-on learning program focused on practical AI and machine learning, model development, and applying the fundamentals to real problems.", tags: ["AI", "Machine Learning", "Python", "TensorFlow"] },
  { period: "2024 - NOW", title: "Learning by building", org: "Independent practice", body: "Growing across full-stack development, data science, and machine learning by turning ideas into small, practical projects.", tags: ["React", "Python", "Data", "Product"] },
];
const PROJECTS = [
  { no: "01", name: "FastAPI Docs Assistant", kind: "RAG CHATBOT", text: "A retrieval-augmented chatbot that answers FastAPI questions from official docs with citations, declines unsupported questions, and includes a 42-question evaluation harness.", tags: ["Python", "FastAPI", "Hybrid retrieval", "Reranking", "ChromaDB", "Groq", "Streamlit", "pytest"], art: "fastapi-rag" },
  { no: "02", name: "AgroFarm", kind: "AGRICULTURE WEB APP", text: "An agriculture-focused web application, available to explore through its live deployment.", tags: ["Agriculture", "Web application", "Live deployment"], art: "agrofarm", url: "https://agro-farm-final.vercel.app/login" },
];
const ACHIEVEMENTS = [
  { no: "01", title: "GH Raisoni Hackathon", result: "Final round · Top 29", level: "NATIONAL HACKATHON", body: "Selected among the Top 29 teams to reach the final round of this national-level hackathon.", art: "raisoni", mark: "29" },
  { no: "02", title: "CREST CTF", result: "4th place · Offline", level: "NATIONAL CTF", body: "Placed fourth at the offline national-level CTF organized by Pimpri Chinchwad University (PCU).", art: "crest", mark: "04" },
  { no: "03", title: "Green Quest", result: "1st place · Winner", level: "INTERNAL HACKATHON", body: "Won first place at an internal hackathon with Team Agrofarm.", art: "green", mark: "01" },
];
const CERTIFICATIONS = [
  { no: "01", category: "DATA ANALYSIS", title: "Exploratory Data Analysis", issuer: "NASSCOM · FutureSkills Prime", completed: "Nov 2, 2026", summary: "Coursework in exploratory data analysis, issued through FutureSkills Prime and NASSCOM IT-ITeS SSC.", mark: "NS", file: "/certificates/nasscom-exploratory-data-analysis.pdf", preview: "/certificate-previews/nasscom-exploratory-data-analysis.jpg" },
  { no: "02", category: "APPLIED MACHINE LEARNING & AI", title: "Foundational Course on Applied Machine Learning and AI", issuer: "CII · HP Centre for AI", completed: "Oct 24, 2026", summary: "Foundational training in applied machine learning and AI from the CII and HP Centre for AI.", mark: "HP", file: "/certificates/cii-applied-machine-learning-ai.jpg", preview: "/certificate-previews/cii-applied-machine-learning-ai.jpg" },
  { no: "03", category: "CYBERSECURITY", title: "Foundations of Cybersecurity", issuer: "Google · Coursera", completed: "Apr 3, 2025", certificateDate: "Certificate dated Apr 4, 2025", summary: "Security fundamentals, common attack patterns, ethics, and tools used by cybersecurity analysts.", mark: "G", file: "/certificates/google-foundations-of-cybersecurity.pdf", preview: "/certificate-previews/google-foundations-of-cybersecurity.jpg", verify: "https://coursera.org/verify/PGS5LA0SG7HL" },
  { no: "04", category: "BACK-END DEVELOPMENT", title: "Django Web Framework", issuer: "Meta · Coursera", completed: "Mar 10, 2026", summary: "Building web servers and applications with Django, data modeling, and web security practices.", mark: "M", file: "/certificates/meta-django-web-framework.pdf", preview: "/certificate-previews/meta-django-web-framework.jpg", verify: "https://coursera.org/verify/DSQGYUFENGF9" },
  { no: "05", category: "4-COURSE SPECIALIZATION", title: "Introduction to Operating Systems", issuer: "Codio · Coursera", completed: "Aug 6, 2025", summary: "A four-course foundation in virtualization, memory management, concurrency, and persistence.", mark: "OS", modules: [
    { title: "Virtualization", completed: "Aug 5, 2025", file: "/certificates/codio-os-01-virtualization.pdf", preview: "/certificate-previews/codio-os-01-virtualization.jpg", verify: "https://coursera.org/verify/AY57S5EZ3I90" },
    { title: "Memory Management", completed: "Aug 6, 2025", file: "/certificates/codio-os-02-memory-management.pdf", preview: "/certificate-previews/codio-os-02-memory-management.jpg", verify: "https://coursera.org/verify/ELXEISC1C0VW" },
    { title: "Concurrency", completed: "Aug 5, 2025", file: "/certificates/codio-os-03-concurrency.pdf", preview: "/certificate-previews/codio-os-03-concurrency.jpg", verify: "https://coursera.org/verify/9LVK5OF3AREN" },
    { title: "Persistence", completed: "Aug 5, 2025", file: "/certificates/codio-os-04-persistence.pdf", preview: "/certificate-previews/codio-os-04-persistence.jpg", verify: "https://coursera.org/verify/QEOR7FECEFFE" },
  ] },
];
const SOCIALS = [
  ["GitHub", "codewithvishhh", "https://github.com/codewithvishhh"],
  ["LinkedIn", "VishnuKumar16", "https://www.linkedin.com/in/VishnuKumar16"],
  ["LeetCode", "LeetVishh", "https://leetcode.com/u/LeetVishh/"],
];

function Arrow({ up = false }) {
  return <svg width="16" height="16" viewBox="0 0 20 20" fill="none" aria-hidden="true">{up ? <path d="M5 15 15 5M6 5h9v9" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" /> : <path d="M3 10h13m-5-5 5 5-5 5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />}</svg>;
}
function DownloadIcon() {
  return <svg width="15" height="15" viewBox="0 0 20 20" fill="none" aria-hidden="true"><path d="M10 3v9m-4-4 4 4 4-4M4 14v3h12v-3" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" /></svg>;
}
function Reveal({ children, delay = 0, className = "" }) {
  const reduce = useReducedMotion();
  return <motion.div className={className} initial={reduce ? false : { opacity: 0, y: 24, scale: .99 }} whileInView={{ opacity: 1, y: 0, scale: 1 }} viewport={{ once: true, amount: .18 }} transition={{ duration: reduce ? 0 : .64, delay, ease: [0.2, .8, .2, 1] }}>{children}</motion.div>;
}
function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  return <motion.div className="scroll-progress" style={{ scaleX: scrollYProgress }} aria-hidden="true" />;
}
function InteractiveBackdrop() {
  const canvasRef = useRef(null);
  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas?.getContext("2d");
    if (!canvas || !context) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const pointer = { x: -1000, y: -1000 };
    let width = 0, height = 0, ratio = 1, nodes = [], frame = 0, lastFrameTime = 0, scrollY = window.scrollY;
    const resize = () => {
      width = window.innerWidth; height = window.innerHeight;
      ratio = Math.min(window.devicePixelRatio || 1, 1.25);
      canvas.width = Math.round(width * ratio); canvas.height = Math.round(height * ratio);
      canvas.style.width = `${width}px`; canvas.style.height = `${height}px`;
      context.setTransform(ratio, 0, 0, ratio, 0, 0);
      const count = Math.min(46, Math.max(18, Math.round(width * height / 24000)));
      nodes = Array.from({ length: count }, () => ({ x: Math.random() * width, y: Math.random() * height, vx: (Math.random() - .5) * .18, vy: (Math.random() - .5) * .18 }));
      draw();
    };
    const draw = () => {
      context.clearRect(0, 0, width, height);
      const grid = 88, offset = (scrollY * .045) % grid;
      context.lineWidth = 1;
      context.strokeStyle = "rgba(131, 163, 159, .05)";
      context.beginPath();
      for (let x = 0; x < width; x += grid) { context.moveTo(x, 0); context.lineTo(x, height); }
      for (let y = -grid + offset; y < height + grid; y += grid) { context.moveTo(0, y); context.lineTo(width, y); }
      context.stroke();
      for (const node of nodes) {
        if (!reduce) {
          const dx = pointer.x - node.x, dy = pointer.y - node.y, distance = Math.hypot(dx, dy);
          if (distance < 185 && distance > 1) { const force = (185 - distance) * .00055; node.vx += dx * force; node.vy += dy * force; }
          node.x += node.vx; node.y += node.vy; node.vx *= .989; node.vy *= .989;
          if (node.x < -8 || node.x > width + 8) node.vx *= -1;
          if (node.y < -8 || node.y > height + 8) node.vy *= -1;
        }
      }
      for (let i = 0; i < nodes.length; i++) for (let j = i + 1; j < nodes.length; j++) {
        const a = nodes[i], b = nodes[j], distance = Math.hypot(a.x - b.x, a.y - b.y);
        if (distance < 122) {
          context.strokeStyle = `rgba(132, 170, 164, ${(1 - distance / 122) * .2})`;
          context.beginPath(); context.moveTo(a.x, a.y); context.lineTo(b.x, b.y); context.stroke();
        }
      }
      for (const node of nodes) {
        context.fillStyle = "rgba(176, 199, 174, .54)";
        context.beginPath(); context.arc(node.x, node.y, 1.3, 0, Math.PI * 2); context.fill();
      }
      if (pointer.x > 0) {
        context.strokeStyle = "rgba(166, 197, 184, .26)"; context.lineWidth = 1;
        context.beginPath(); context.arc(pointer.x, pointer.y, 14, 0, Math.PI * 2); context.stroke();
      }
    };
    const animate = time => { if (time - lastFrameTime >= 1000 / 30) { draw(); lastFrameTime = time; } frame = window.requestAnimationFrame(animate); };
    const start = () => { if (!reduce && !document.hidden && !frame) { lastFrameTime = 0; frame = window.requestAnimationFrame(animate); } };
    const stop = () => { if (frame) window.cancelAnimationFrame(frame); frame = 0; lastFrameTime = 0; };
    const onPointerMove = event => {
      pointer.x = event.clientX; pointer.y = event.clientY;
      if (reduce) draw();
    };
    const onPointerLeave = () => { pointer.x = -1000; pointer.y = -1000; if (reduce) draw(); };
    const onScroll = () => { scrollY = window.scrollY; if (reduce) draw(); };
    const onVisibility = () => { if (document.hidden) stop(); else start(); };
    resize(); start();
    window.addEventListener("resize", resize); window.addEventListener("pointermove", onPointerMove, { passive: true });
    window.addEventListener("pointerleave", onPointerLeave); window.addEventListener("scroll", onScroll, { passive: true });
    document.addEventListener("visibilitychange", onVisibility);
    return () => {
      stop(); window.removeEventListener("resize", resize); window.removeEventListener("pointermove", onPointerMove);
      window.removeEventListener("pointerleave", onPointerLeave); window.removeEventListener("scroll", onScroll);
      document.removeEventListener("visibilitychange", onVisibility);
    };
  }, []);
  return <div className="interactive-backdrop" aria-hidden="true"><canvas ref={canvasRef} /></div>;
}
function Heading({ no, label, title, detail }) {
  return <div className="section-heading"><div><div className="eyebrow"><span>{no}</span>{label}</div><h2>{title}</h2></div>{detail && <p>{detail}</p>}</div>;
}

function Navbar() {
  const [active, setActive] = useState("about");
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const scroll = () => setScrolled(window.scrollY > 20);
    scroll(); window.addEventListener("scroll", scroll, { passive: true });
    const observer = new IntersectionObserver(entries => entries.forEach(e => { if (e.isIntersecting) setActive(e.target.id); }), { rootMargin: "-28% 0px -62% 0px" });
    NAV.forEach(([, id]) => { const el = document.getElementById(id); if (el) observer.observe(el); });
    return () => { window.removeEventListener("scroll", scroll); observer.disconnect(); };
  }, []);
  const close = () => setOpen(false);
  return <header className={"site-nav" + (scrolled ? " scrolled" : "")}><nav className="nav-inner shell" aria-label="Main navigation">
    <a className="brand" href="#home" aria-label="Vishnu Kumar home" onClick={close}>VK<span>.</span></a>
    <div className="nav-links">{NAV.map(([label, id]) => <a key={id} className={active === id ? "active" : ""} href={"#" + id}>{label}</a>)}</div>
    <div className="nav-actions"><a className="nav-cta" href="/Vishnu_Kumar_Resume.pdf" download="Vishnu_Kumar_Resume.pdf">Download Resume <DownloadIcon /></a><button className={"menu-toggle" + (open ? " open" : "")} onClick={() => setOpen(!open)} aria-label={open ? "Close menu" : "Open menu"} aria-expanded={open}><i /><i /></button></div>
  </nav>{open && <div className="mobile-nav shell">{NAV.map(([label, id], i) => <a key={id} href={"#" + id} onClick={close}><span>0{i + 1}</span>{label}<Arrow up /></a>)}<a href="/Vishnu_Kumar_Resume.pdf" download="Vishnu_Kumar_Resume.pdf" onClick={close}><span>07</span>Download Resume<DownloadIcon /></a><a href="#contact" onClick={close}><span>08</span>Get in touch<Arrow up /></a></div>}</header>;
}

function HeroArtwork() {
  const reduce = useReducedMotion();
  const panelRef = useRef(null);
  const movePanel = event => {
    if (reduce || !panelRef.current) return;
    const rect = panelRef.current.getBoundingClientRect();
    const x = (event.clientX - rect.left) / rect.width - .5;
    const y = (event.clientY - rect.top) / rect.height - .5;
    panelRef.current.style.setProperty("--tilt-x", `${-y * 3.5}deg`);
    panelRef.current.style.setProperty("--tilt-y", `${x * 4}deg`);
  };
  const resetPanel = () => {
    if (!panelRef.current) return;
    panelRef.current.style.setProperty("--tilt-x", "0deg");
    panelRef.current.style.setProperty("--tilt-y", "0deg");
  };
  return <div className="hero-art dev-art" aria-label="Vishnu Kumar's developer profile card with portrait and code">
    <motion.div className="dev-panel-motion" initial={reduce ? false : { opacity: 0, y: 30, rotateX: 5 }} animate={{ opacity: 1, y: 0, rotateX: 0 }} transition={{ duration: reduce ? 0 : .9, delay: reduce ? 0 : .24, ease: [0.2, .8, .2, 1] }} whileHover={reduce ? undefined : { scale: 1.012 }}>
    <div ref={panelRef} className="dev-panel" onMouseMove={movePanel} onMouseLeave={resetPanel}>
      <div className="dev-panel-bar"><span className="window-dots"><i /><i /><i /></span><span>vishnu-kumar / portfolio.jsx</span><b><i /> LIVE</b></div>
      <div className="dev-panel-content">
        <div className="code-snippet" aria-hidden="true">
          <div><i>01</i><code><em>const</em> developer = &#123;</code></div>
          <div><i>02</i><code>  name: <b>"Vishnu Kumar"</b>,</code></div>
          <div><i>03</i><code>  focus: [</code></div>
          <div><i>04</i><code>    <b>"software"</b>,</code></div>
          <div><i>05</i><code>    <b>"machine learning"</b></code></div>
          <div><i>06</i><code>  ],</code></div>
          <div><i>07</i><code>  status: <b>"building"</b></code></div>
          <div><i>08</i><code>&#125;;<span className="code-cursor" /></code></div>
        </div>
        <div className="dev-avatar"><img src="/images/vishnu-portrait.jpg" alt="Vishnu Kumar" /><div className="avatar-scanline" /><span>VK / INDIA</span></div>
      </div>
      <div className="dev-panel-footer"><span><i /> OPEN TO OPPORTUNITIES</span><span>REACT · PYTHON · ML</span></div>
    </div></motion.div>
    <span className="art-caption">01 — PROFILE / 2026</span>
  </div>;
}

function Hero() {
  const reduce = useReducedMotion();
  const titleLine = { hidden: { y: "115%", opacity: 0 }, visible: { y: "0%", opacity: 1, transition: { duration: reduce ? 0 : .9, ease: [0.22, 1, 0.36, 1] } } };
  return <section className="hero shell" id="home"><div className="hero-copy">
    <Reveal><div className="availability"><i /> OPEN TO OPPORTUNITIES <b>INDIA / REMOTE</b></div></Reveal>
    <Reveal delay={.06}><p className="hero-kicker">SOFTWARE DEVELOPER / MACHINE LEARNING</p></Reveal>
    <motion.h1 className="animated-title" initial={reduce ? false : "hidden"} animate="visible" variants={{ hidden: {}, visible: { transition: { delayChildren: reduce ? 0 : .18, staggerChildren: reduce ? 0 : .16 } } }}><span className="title-line"><motion.span variants={titleLine}>Hello, I'm</motion.span></span><span className="title-line"><motion.em variants={titleLine}>Vishnu Kumar.</motion.em></span></motion.h1>
    <Reveal delay={.12}><p className="hero-text">I build web and machine-learning projects, turning early ideas into useful software. Right now, I'm exploring AI, data, and product engineering.</p></Reveal>
    <Reveal delay={.18}><div className="hero-actions"><a className="button primary" href="#projects">Explore selected work <Arrow /></a><a className="button quiet" href="https://www.linkedin.com/in/VishnuKumar16" target="_blank" rel="noreferrer">Contact me <Arrow up /></a></div></Reveal>
  </div><Reveal className="hero-art-wrap" delay={.1}><HeroArtwork /></Reveal>
  <motion.a className="scroll-cue" href="#about" initial={reduce ? false : { opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: reduce ? 0 : 1 }}><i /> SCROLL A LITTLE</motion.a>
  </section>;
}

function About() {
  return <section className="section shell" id="about"><Reveal><Heading no="01" label="A LITTLE ABOUT ME" title={<>A bit about<br /><em>me.</em></>} /></Reveal>
    <div className="about-grid"><Reveal><div className="about-copy"><p className="lead">I like the moment when something you have been learning finally clicks into a thing someone can use.</p><p>I'm exploring machine learning, data, and full-stack development through hands-on projects. Away from a tutorial, I enjoy following a question until it becomes a small, working experiment.</p></div></Reveal>
    </div>
  </section>;
}

function Skills() {
  return <section className="section shell" id="skills"><Reveal><Heading no="02" label="THINGS I WORK WITH" title={<>A toolkit that<br /><em>keeps growing.</em></>} detail="A practical mix of languages, frameworks, and tools I use while learning and building." /></Reveal>
    <div className="skill-grid">{SKILLS.map(([title, items], i) => <Reveal key={title} delay={i * .05}><article className="skill-card"><div className="skill-head"><span>0{i + 1}</span><i>+</i></div><h3>{title}</h3><div className="pills">{items.map(x => <span key={x}>{x}</span>)}</div></article></Reveal>)}</div>
  </section>;
}

function Experience() {
  return <section className="section shell" id="experience"><Reveal><Heading no="03" label="THE JOURNEY SO FAR" title={<>Progress through<br /><em>practice.</em></>} detail="A growing path across structured learning and independent work." /></Reveal>
    <div className="timeline">{EXPERIENCE.map((x, i) => <Reveal key={x.title} delay={i * .06}><article className="timeline-item"><div className="timeline-period">{x.period}<i /></div><div className="timeline-content"><div className="timeline-meta"><span>{i === 0 ? "LEARNING" : "INDEPENDENT"}</span><b>0{i + 1}</b></div><h3>{x.title}</h3><div className="timeline-org">{x.org}</div><p>{x.body}</p><div className="tags">{x.tags.map(t => <span key={t}>{t}</span>)}</div></div></article></Reveal>)}</div>
  </section>;
}

function ScrollInterlude() {
  const sceneRef = useRef(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: sceneRef, offset: ["start start", "end end"] });
  const primaryX = useTransform(scrollYProgress, [0, 1], reduce ? ["0vw", "0vw"] : ["9vw", "-43vw"]);
  const secondaryX = useTransform(scrollYProgress, [0, 1], reduce ? ["0vw", "0vw"] : ["-14vw", "21vw"]);
  const cardX = useTransform(scrollYProgress, [0, .5, 1], reduce ? [0, 0, 0] : [-42, 14, 78]);
  const cardY = useTransform(scrollYProgress, [0, .5, 1], reduce ? [0, 0, 0] : [32, -14, -82]);
  const cardRotate = useTransform(scrollYProgress, [0, .5, 1], reduce ? [0, 0, 0] : [-7, 0, 8]);
  const cardScale = useTransform(scrollYProgress, [0, .45, 1], reduce ? [1, 1, 1] : [.82, 1, .88]);
  const cardOpacity = useTransform(scrollYProgress, [0, .2, .78, 1], reduce ? [1, 1, 1, 1] : [.35, 1, 1, .45]);
  const progress = useSpring(scrollYProgress, { stiffness: 105, damping: 28, restDelta: .001 });
  return <section ref={sceneRef} className="scroll-interlude" aria-label="Scroll-driven build sequence" style={{ height: "175svh" }}>
    <div className="scroll-interlude-sticky">
      <div className="interlude-top"><span>SCROLL SEQUENCE / 01</span><span>SCROLL CONTROLLED / V.01</span></div>
      <div className="interlude-orbit orbit-a" /><div className="interlude-orbit orbit-b" />
      <motion.div className="interlude-wordline interlude-wordline-main" style={{ x: primaryX }}><span>IDEAS INTO</span><em> SOFTWARE</em></motion.div>
      <motion.div className="interlude-wordline interlude-wordline-sub" style={{ x: secondaryX }}><span>DESIGN · ENGINEER · SHIP · LEARN ·</span></motion.div>
      <motion.div className="interlude-terminal" style={{ x: cardX, y: cardY, rotate: cardRotate, scale: cardScale, opacity: cardOpacity }}>
        <div className="interlude-terminal-head"><span><i /><i /><i /></span><b>vishnu@studio:~</b><em>LIVE BUILD</em></div>
        <div className="interlude-terminal-code"><div><i>01</i><code><em>const</em> idea = <b>"curiosity"</b>;</code></div><div><i>02</i><code><em>const</em> craft = <b>"practice"</b>;</code></div><div><i>03</i><code><em>return</em> idea + craft;</code></div><div><i>04</i><code><span className="interlude-cursor" /></code></div></div>
        <div className="interlude-terminal-foot"><span>OUTPUT</span><b>useful software</b><i>↗</i></div>
      </motion.div>
      <div className="interlude-bottom"><span>SCROLL TO SHAPE THE NEXT FRAME</span><div><motion.i style={{ scaleX: progress }} /></div></div>
    </div>
  </section>;
}

function ProjectArtwork({ type }) {
  if (type === "venture") return <div className="project-art venture-art" aria-hidden="true"><span className="art-index">01 / IDEA STUDY</span><div className="venture-letters">Venture<em>IQ</em></div><div className="venture-scribble"><i /><i /><i /><i /><b>think it<br />through</b></div><span className="art-side-note">A STARTUP EVALUATION TOOL</span></div>;
  if (type === "closet") return <div className="project-art closet-art" aria-hidden="true"><span className="art-index">02 / DAILY EDIT</span><div className="closet-title">Closet<br /><em>Verse</em></div><div className="swatches"><i /><i /><i /><i /></div><div className="hanger"><svg viewBox="0 0 140 100" fill="none"><path d="M67 20c-5-13 7-18 14-13 8 7 0 15-6 20L15 70c-5 4-3 10 3 10h105c7 0 9-7 3-11L70 42" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg></div></div>;
  if (type === "fastapi-rag") return <div className="project-art rag-art" aria-hidden="true">
    <span className="art-index">01 / DOCS ASSISTANT</span>
    <div className="rag-query"><small>QUESTION</small><b>How do I add dependencies?</b></div>
    <div className="rag-retrieval"><span>VECTOR</span><i>+</i><span>BM25</span><i>→</i><span>RERANK</span></div>
    <div className="rag-answer"><small>GROUNDED ANSWER</small><b>From the official FastAPI docs</b><span>[1] Cited source</span></div>
    <span className="rag-citation"><i /> SOURCES VERIFIED</span>
  </div>;
  if (type === "agrofarm") return <div className="project-art agrofarm-art" aria-hidden="true"><span className="art-index">02 / AGROFARM</span><div className="agrofarm-wordmark"><span>AF / 01</span><b>Agro<em>Farm</em></b><small>GROW WITH PURPOSE</small></div><div className="agrofarm-field"><svg viewBox="0 0 520 360" fill="none"><path d="M-40 320C83 208 174 216 264 132S426 31 570 74M-20 365C91 251 181 262 275 174S441 72 588 112M2 407C103 298 198 310 289 217S457 111 604 153M23 447C120 346 218 357 303 263S473 151 622 195" stroke="currentColor" strokeWidth="1.2"/><path d="M65 342C135 277 194 279 274 203S432 89 512 116" stroke="currentColor" strokeWidth="1.2" strokeDasharray="3 7"/></svg><i className="field-marker marker-one"/><i className="field-marker marker-two"/></div><div className="agrofarm-live"><i /> LIVE PROJECT <span>02</span></div></div>;
  return <div className="project-art tasks-art" aria-hidden="true"><span className="art-index">03 / MAKE A LIST</span><div className="tasks-title">One thing<br /><em>at a time.</em></div><div className="paper-stack"><span><i />Review project notes</span><span><i />Ship a useful version</span><span><i />Make room to learn</span></div></div>;
}

function Projects() {
  const sceneRef = useRef(null);
  const [activeSlide, setActiveSlide] = useState(0);
  const [viewportWidth, setViewportWidth] = useState(() => window.innerWidth);
  const { scrollYProgress } = useScroll({ target: sceneRef, offset: ["start start", "end end"] });
  const slideTravel = useTransform(scrollYProgress, value => Math.min(PROJECTS.length - 1, value * PROJECTS.length));
  const trackX = useTransform(slideTravel, value => -value * viewportWidth);
  const slideProgress = useTransform(slideTravel, value => value / (PROJECTS.length - 1));
  const progress = useSpring(slideProgress, { stiffness: 120, damping: 30, restDelta: .001 });
  useEffect(() => scrollYProgress.on("change", value => setActiveSlide(Math.min(PROJECTS.length - 1, Math.round(value * PROJECTS.length)))), [scrollYProgress]);
  useEffect(() => { const resize = () => setViewportWidth(window.innerWidth); window.addEventListener("resize", resize); return () => window.removeEventListener("resize", resize); }, []);
  return <>
    <section ref={sceneRef} className="project-scroll-scene" id="projects" style={{ height: `${PROJECTS.length * 95 + 100}svh` }}>
      <div className="project-sticky-stage">
        <div className="project-stage-top shell"><Reveal><Heading no="04" label="PROJECTS / BUILDS" title={<>Selected<br /><em>work.</em></>} detail="A retrieval-augmented documentation assistant and an agriculture web app." /></Reveal><div className="project-stage-status"><span>SCROLL SEQUENCE</span><b>0{activeSlide + 1}<i> / 0{PROJECTS.length}</i></b></div></div>
        <div className="project-stage-rail"><motion.div className="project-track" style={{ x: trackX }}>{PROJECTS.map(project => <ProjectSlide key={project.name} project={project} />)}</motion.div></div>
        <div className="project-stage-footer shell"><span>SCROLL TO EXPLORE</span><div className="project-progress-track"><motion.i style={{ scaleX: progress }} /></div><b>0{activeSlide + 1}<small> / 0{PROJECTS.length}</small></b></div>
      </div>
    </section>
    <div className="project-after shell"><a className="repo-link" href="https://github.com/codewithvishhh" target="_blank" rel="noreferrer">More on GitHub <Arrow up /></a></div>
  </>;
}

function ProjectSlide({ project }) {
  const reduce = useReducedMotion();
  return <div className="project-slide"><motion.article className="project-card project-slide-card" whileHover={reduce ? undefined : { scale: 1.008 }} transition={{ type: "spring", stiffness: 260, damping: 24 }}><div className="project-art-viewport"><div className="project-art-parallax"><ProjectArtwork type={project.art} /></div></div><div className="project-info"><div className="project-meta"><span>{project.no} / {project.kind}</span><i><Arrow up /></i></div><h3>{project.name}</h3><p>{project.text}</p><div className="tags">{project.tags.map(t => <span key={t}>{t}</span>)}</div>{project.url ? <a className="project-live-link" href={project.url} target="_blank" rel="noopener noreferrer"><span>VISIT LIVE PROJECT</span><Arrow up /></a> : <span className="project-built-label">BUILT / INDEPENDENT PROJECT</span>}</div></motion.article></div>;
}

function AchievementArtwork({ item }) {
  return <div className={`achievement-art achievement-${item.art}`} aria-hidden="true">
    <span className="achievement-edition">{item.level}</span>
    <span className="achievement-mark">{item.mark}</span>
    <span className="achievement-orbit orbit-one" /><span className="achievement-orbit orbit-two" />
    <span className="achievement-stamp">{item.art === "green" ? "WIN" : item.art === "crest" ? "CTF" : "FINAL"}</span>
    <span className="achievement-index">{item.no} / RECOGNITION</span>
  </div>;
}

function Achievements() {
  const reduce = useReducedMotion();
  return <section className="section shell" id="achievements"><Reveal><Heading no="05" label="MILESTONES & COMPETITIONS" title={<>A few proud<br /><em>moments.</em></>} detail="Teamwork, problem-solving, and a few milestones worth remembering." /></Reveal>
    <div className="achievement-grid">{ACHIEVEMENTS.map((item, i) => <Reveal key={item.title} delay={i * .07}><motion.article className={`achievement-card achievement-card-${item.art}`} whileHover={reduce ? undefined : { y: -7 }} transition={{ type: "spring", stiffness: 260, damping: 22 }}><AchievementArtwork item={item} /><div className="achievement-info"><div className="achievement-result"><span>{item.no} / ACHIEVEMENT</span><b>{item.result}</b></div><h3>{item.title}</h3><p>{item.body}</p></div></motion.article></Reveal>)}</div>
    <Reveal><a className="repo-link achievement-link" href="https://www.linkedin.com/in/VishnuKumar16" target="_blank" rel="noreferrer">More about me on LinkedIn <Arrow up /></a></Reveal>
  </section>;
}

function Certifications() {
  const reduce = useReducedMotion();
  return <section className="section shell" id="certifications"><Reveal><Heading no="06" label="CERTIFICATIONS & CREDENTIALS" title={<>Learning, made<br /><em>official.</em></>} detail="Selected courses across applied AI, data analysis, cybersecurity, back-end development, and computer science." /></Reveal>
    <div className="certification-grid">{CERTIFICATIONS.map((item, i) => <Reveal key={item.no} delay={i * .06}><motion.article className={`certification-card certification-card-${item.mark.toLowerCase()}`} whileHover={reduce ? undefined : { y: -5 }} transition={{ type: "spring", stiffness: 250, damping: 23 }}>
      <div className="certification-card-top"><span>{item.no} / {item.category}</span><b>{item.mark}</b></div>
      <h3>{item.title}</h3><p className="certification-issuer">{item.issuer}</p>
      {item.modules ? <div className="certification-previews certification-previews-grid">{item.modules.map(module => <a className="certification-preview certification-preview-mini" key={module.title} href={module.file} target="_blank" rel="noopener noreferrer" aria-label={`Open ${module.title} certificate PDF`}><img src={module.preview} alt={`${module.title} certificate`} loading="lazy" /><span>{module.title}</span></a>)}</div> : <a className="certification-preview certification-preview-main" href={item.file} target="_blank" rel="noopener noreferrer" aria-label={`Open full ${item.title} certificate`}><img src={item.preview} alt={`${item.title} certificate`} loading="lazy" /></a>}
      <p className="certification-summary">{item.summary}</p>
      <div className="certification-date"><span>COMPLETED</span><b>{item.completed}</b>{item.certificateDate && <small>{item.certificateDate}</small>}</div>
      {item.modules ? <details className="certification-modules"><summary>VIEW 4 COURSE CERTIFICATES <Arrow /></summary><div>{item.modules.map(module => <div className="certification-module" key={module.title}><span><b>{module.title}</b><small>{module.completed}</small></span><a href={module.file} target="_blank" rel="noopener noreferrer">PDF</a><a href={module.verify} target="_blank" rel="noopener noreferrer" aria-label={`Verify ${module.title}`}><Arrow up /></a></div>)}</div></details> : <div className="certification-actions"><a href={item.file} target="_blank" rel="noopener noreferrer">VIEW CERTIFICATE <Arrow up /></a>{item.verify && <a href={item.verify} target="_blank" rel="noopener noreferrer">VERIFY <Arrow up /></a>}</div>}
    </motion.article></Reveal>)}</div>
  </section>;
}

function Contact() {
  return <section className="section shell contact-section" id="contact"><Reveal><div className="contact-card"><div className="contact-copy"><div className="eyebrow"><span>07</span> THE NEXT CHAPTER</div><h2>Have a good<br /><em>problem to solve?</em></h2><p>I'm open to opportunities, collaborations, and conversations about building useful things with technology.</p><a className="button primary" href="https://www.linkedin.com/in/VishnuKumar16" target="_blank" rel="noreferrer">Find me on LinkedIn <Arrow up /></a></div><div className="social-list"><small>ELSEWHERE</small>{SOCIALS.map(([label, value, href], i) => <a key={label} href={href} target="_blank" rel="noreferrer"><span>0{i + 1}</span><b>{label}</b><em>{value}</em><Arrow up /></a>)}</div></div></Reveal></section>;
}

function Footer() {
  return <footer className="footer shell"><a className="brand" href="#home">VK<span>.</span></a><span>CRAFTED WITH CODE · INDIA.</span><span>© {new Date().getFullYear()} VISHNU KUMAR</span></footer>;
}

export default function Portfolio() {
  return <div className="portfolio"><InteractiveBackdrop /><ScrollProgress /><Navbar /><main><Hero /><About /><Skills /><Experience /><ScrollInterlude /><Projects /><Achievements /><Certifications /><Contact /></main><Footer /></div>;
}
