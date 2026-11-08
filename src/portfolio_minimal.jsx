import { useState, useEffect, useRef } from "react";
import { motion, useInView } from "framer-motion";

// ─── ANIMATED BACKGROUND ──────────────────────────────────────────────────────
function AnimatedBackground() {
  const canvasRef = useRef(null);
  const particlesRef = useRef([]);
  
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    
    // Initialize particles
    const particles = [];
    const particleCount = 50;
    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.5,
        vy: (Math.random() - 0.5) * 0.5,
        size: Math.random() * 2,
        opacity: Math.random() * 0.5 + 0.2,
      });
    }
    particlesRef.current = particles;
    
    const animate = () => {
      // Clear and create gradient background
      const gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
      gradient.addColorStop(0, '#000000');
      gradient.addColorStop(0.5, '#0a0a1a');
      gradient.addColorStop(1, '#000000');
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      
      // Draw and update particles
      particles.forEach((p) => {
        p.x += p.vx;
        p.y += p.vy;
        
        // Bounce off walls
        if (p.x < 0 || p.x > canvas.width) p.vx *= -1;
        if (p.y < 0 || p.y > canvas.height) p.vy *= -1;
        
        // Keep in bounds
        p.x = Math.max(0, Math.min(canvas.width, p.x));
        p.y = Math.max(0, Math.min(canvas.height, p.y));
        
        // Draw particle
        ctx.fillStyle = `rgba(255, 255, 255, ${p.opacity})`;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fill();
        
        // Draw connections
        particles.forEach((p2) => {
          const dx = p.x - p2.x;
          const dy = p.y - p2.y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          if (distance < 150) {
            ctx.strokeStyle = `rgba(255, 255, 255, ${0.1 * (1 - distance / 150)})`;
            ctx.lineWidth = 0.5;
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.stroke();
          }
        });
      });
      
      requestAnimationFrame(animate);
    };
    
    animate();
    
    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);
  
  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        pointerEvents: 'none',
        zIndex: 1,
      }}
    />
  );
}

// ─── CUSTOM CURSOR ────────────────────────────────────────────────────────────
function CustomCursor() {
  const [pos, setPos] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);

  useEffect(() => {
    const handleMouseMove = (e) => {
      setPos({ x: e.clientX, y: e.clientY });
    };

    const handleMouseEnter = (e) => {
      const target = e.target;
      if (!(target instanceof Element)) {
        return;
      }

      if (
        target.tagName === 'A' ||
        target.tagName === 'BUTTON' ||
        target.closest('button') ||
        target.closest('a')
      ) {
        setIsHovering(true);
      }
    };

    const handleMouseLeave = (e) => {
      const target = e.target;
      if (target instanceof Element && (target.tagName === 'A' || target.tagName === 'BUTTON' || target.closest('button') || target.closest('a'))) {
        setIsHovering(false);
      } else if (!(target instanceof Element)) {
        setIsHovering(false);
      }
    };

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseover', handleMouseEnter, true);
    document.addEventListener('mouseout', handleMouseLeave, true);

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseover', handleMouseEnter, true);
      document.removeEventListener('mouseout', handleMouseLeave, true);
    };
  }, []);

  return (
    <>
      <motion.div
        animate={{ x: pos.x, y: pos.y }}
        transition={{ type: 'spring', stiffness: 800, damping: 35 }}
        style={{
          position: 'fixed',
          width: 6,
          height: 6,
          background: '#ffffff',
          borderRadius: '50%',
          pointerEvents: 'none',
          zIndex: 9999,
          marginLeft: -3,
          marginTop: -3,
          boxShadow: '0 0 8px rgba(255, 255, 255, 0.6)',
        }}
      />
      <style>
        {`
          * {
            cursor: none;
          }
        `}
      </style>
    </>
  );
}

// ─── COLORS ───────────────────────────────────────────────────────────────────
const COLORS = {
  bg: "#000000",
  surface: "#111111",
  border: "#333333",
  text: "#ffffff",
  muted: "#b0b0b0",
  accent: "#000000",
  accentLight: "#1a1a1a",
  highlight: "#ffffff",
};

// ─── DATA ─────────────────────────────────────────────────────────────────────
const NAV = ["About", "Skills", "Work", "Projects", "Contact"];

const SKILLS = [
  { cat: "Languages", items: ["Python", "Java", "C++", "C", "TypeScript"] },
  { cat: "AI/ML", items: ["Scikit-learn", "Pandas", "Transformers", "TensorFlow", "Deep Learning"] },
  { cat: "Backend", items: ["FastAPI", "REST APIs", "Database Design", "API Development"] },
  { cat: "Frontend", items: ["React", "Next.js", "Tailwind CSS", "JavaScript", "HTML/CSS"] },
  { cat: "Database", items: ["SQL", "Data Management", "Query Optimization"] },
  { cat: "Tools", items: ["Git", "AWS", "REST API", "VS Code", "Docker"] },
];

const TIMELINE = [
  {
    year: "2024",
    title: "AI-ML Virtual Internship",
    org: "Google for Developers (Ministry of Education)",
    desc: "Comprehensive AI and Machine Learning training program focusing on practical applications, model development, and real-world problem solving.",
    tags: ["AI", "ML", "Python", "TensorFlow"],
  },
  {
    year: "2024 - Present",
    title: "Learning & Building",
    org: "Self-Taught Developer / EduSkills",
    desc: "Mastering full-stack development, machine learning, and data science through hands-on projects and continuous learning.",
    tags: ["Python", "React", "ML", "Web Dev"],
  },
];

const PROJECTS = [
];

const BLOG_ARTICLES = [
  {
    id: 1,
    title: "Getting Started with Machine Learning",
    excerpt: "A beginner's guide to understanding ML fundamentals and building your first model with Python and scikit-learn.",
    content: "Machine Learning is transforming how we solve problems. In this article, we'll explore the basics of ML, key concepts like supervised learning, and how to get started with popular libraries like scikit-learn and TensorFlow. Perfect for anyone starting their ML journey!",
    category: "ML",
    readTime: "8 min read",
    date: "Jan 15, 2025",
    tags: ["Python", "Scikit-learn", "Beginner"],
  },
  {
    id: 2,
    title: "Latest AI Trends in 2025",
    excerpt: "Exploring the most significant AI developments including LLMs, generative models, and their real-world applications.",
    content: "2025 is an exciting year for AI with rapid advancements in Large Language Models, Generative AI, and multimodal systems. We'll discuss how these technologies are reshaping industries, ethical considerations, and how developers can leverage these tools effectively.",
    category: "AI",
    readTime: "12 min read",
    date: "Jan 20, 2025",
    tags: ["AI", "LLMs", "Trends"],
  },
  {
    id: 3,
    title: "Python Best Practices for Clean Code",
    excerpt: "Master Python best practices, design patterns, and techniques for writing maintainable and efficient code.",
    content: "Writing clean Python code is an art. Learn about naming conventions, PEP 8 standards, decorators, context managers, and testing strategies. Discover how to structure your projects for scalability and maintainability, making your codebase a joy to work with.",
    category: "Python",
    readTime: "10 min read",
    date: "Jan 22, 2025",
    tags: ["Python", "Best Practices", "Code Quality"],
  },
];

// ─── HOOKS ────────────────────────────────────────────────────────────────────
function useScrollActive() {
  const [active, setActive] = useState("About");
  useEffect(() => {
    const onScroll = () => {
      const sections = NAV.map((n) => document.getElementById(n.toLowerCase()));
      for (let i = sections.length - 1; i >= 0; i--) {
        if (sections[i] && sections[i].getBoundingClientRect().top <= 120) {
          setActive(NAV[i]);
          return;
        }
      }
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  return active;
}

// ─── COMPONENTS ───────────────────────────────────────────────────────────────
function FadeUp({ children, delay = 0 }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay, ease: "easeOut" }}
    >
      {children}
    </motion.div>
  );
}

// Navbar
function Navbar() {
  const active = useScrollActive();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", fn, { passive: true });
    return () => window.removeEventListener("scroll", fn);
  }, []);

  const scrollTo = (id) => {
    document.getElementById(id.toLowerCase())?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <motion.nav
      initial={{ y: -60, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        zIndex: 100,
        background: scrolled ? "rgba(0, 0, 0, 0.95)" : "rgba(0, 0, 0, 0.85)",
        backdropFilter: "blur(10px)",
        borderBottom: scrolled ? `1px solid ${COLORS.border}` : "1px solid transparent",
        transition: "all 0.3s ease",
        padding: "16px 24px",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
      }}
    >
      <motion.div
        whileHover={{ scale: 1.05 }}
        style={{
          fontSize: 18,
          fontWeight: 700,
          color: COLORS.text,
          letterSpacing: -0.5,
          cursor: "pointer",
        }}
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      >
        VK
      </motion.div>

      <div style={{ display: "flex", gap: 2 }}>
        {NAV.map((n) => (
          <button
            key={n}
            onClick={() => scrollTo(n)}
            style={{
              background: "transparent",
              border: "none",
              color: active === n ? "#ffffff" : "#a0a0a0",
              padding: "8px 14px",
              cursor: "pointer",
              fontSize: 13,
              fontWeight: 500,
              transition: "all 0.2s ease",
              borderBottom: active === n ? `2px solid #ffffff` : "2px solid transparent",
            }}
            onMouseEnter={(e) => {
              if (active !== n) e.target.style.color = "#ffffff";
            }}
            onMouseLeave={(e) => {
              if (active !== n) e.target.style.color = "#a0a0a0";
            }}
          >
            {n}
          </button>
        ))}
      </div>
    </motion.nav>
  );
}

// Hero
function Hero() {
  return (
    <section style={{ padding: "120px 24px 80px", maxWidth: 800, margin: "0 auto" }}>
      <FadeUp>
        <h1
          style={{
            fontSize: "clamp(36px, 6vw, 56px)",
            fontWeight: 700,
            color: COLORS.text,
            lineHeight: 1.1,
            marginBottom: 16,
          }}
        >
          Hi, I'm <span style={{ fontWeight: 400, color: COLORS.muted }}>Vishnu</span>
        </h1>
      </FadeUp>
      <FadeUp delay={0.1}>
        <p
          style={{
            fontSize: 18,
            color: COLORS.muted,
            lineHeight: 1.6,
            maxWidth: 600,
          }}
        >
          Software/ML engineer passionate about building intelligent applications. I specialize in machine learning, data science, and full-stack development. I love solving complex problems with clean code and modern technologies.
        </p>
      </FadeUp>
      <FadeUp delay={0.2}>
        <div style={{ display: "flex", gap: 12, marginTop: 32 }}>
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => document.getElementById("projects")?.scrollIntoView({ behavior: "smooth" })}
            style={{
              padding: "12px 24px",
              background: COLORS.accent,
              color: "white",
              border: "none",
              borderRadius: 4,
              fontSize: 14,
              fontWeight: 500,
              cursor: "pointer",
            }}
          >
            View My Work
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })}
            style={{
              padding: "12px 24px",
              background: "transparent",
              color: "#ffffff",
              border: `1px solid #ffffff`,
              borderRadius: 4,
              fontSize: 14,
              fontWeight: 500,
              cursor: "pointer",
              transition: "all 0.2s",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = COLORS.accentLight;
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = "transparent";
            }}
          >
            Get in Touch
          </motion.button>
        </div>
      </FadeUp>
    </section>
  );
}

// About
function About() {
  return (
    <section id="about" style={{ padding: "80px 24px", maxWidth: 800, margin: "0 auto" }}>
      <FadeUp>
        <h2 style={{ fontSize: 28, fontWeight: 600, color: COLORS.text, marginBottom: 24 }}>
          About
        </h2>
      </FadeUp>
      <FadeUp delay={0.1}>
        <p
          style={{
            fontSize: 16,
            color: COLORS.muted,
            lineHeight: 1.8,
            marginBottom: 16,
          }}
        >
          I'm a fresher software and ML engineer with a passion for building intelligent solutions. I specialize in machine learning, data analysis, and full-stack web development. Currently exploring AI/ML technologies and building projects that solve real-world problems.
        </p>
        <p
          style={{
            fontSize: 16,
            color: COLORS.muted,
            lineHeight: 1.8,
          }}
        >
          When I'm not coding, you'll find me exploring new AI/ML frameworks, contributing to projects, or learning about emerging technologies in software development.
        </p>
      </FadeUp>
    </section>
  );
}

// Skills
function Skills() {
  const [activeCategory, setActiveCategory] = useState(null);

  return (
    <section id="skills" style={{ padding: "80px 24px", maxWidth: 1000, margin: "0 auto" }}>
      <FadeUp>
        <h2 style={{ fontSize: 28, fontWeight: 600, color: COLORS.text, marginBottom: 50 }}>
          Tech Stack
        </h2>
      </FadeUp>

      {/* Category Tabs */}
      <div style={{ display: "flex", flexWrap: "wrap", gap: 12, marginBottom: 40, justifyContent: "center" }}>
        {SKILLS.map((skill, idx) => (
          <motion.button
            key={skill.cat}
            onClick={() => setActiveCategory(activeCategory === skill.cat ? null : skill.cat)}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            style={{
              padding: "10px 20px",
              background: activeCategory === skill.cat ? "rgba(255, 255, 255, 0.15)" : "transparent",
              border: activeCategory === skill.cat ? "1px solid rgba(255, 255, 255, 0.3)" : "1px solid rgba(255, 255, 255, 0.1)",
              color: COLORS.text,
              borderRadius: 20,
              cursor: "pointer",
              fontSize: 13,
              fontWeight: 500,
              transition: "all 0.3s ease",
              backdropFilter: "blur(10px)",
            }}
            onMouseEnter={(e) => {
              if (activeCategory !== skill.cat) {
                e.currentTarget.style.background = "rgba(255, 255, 255, 0.08)";
                e.currentTarget.style.border = "1px solid rgba(255, 255, 255, 0.2)";
              }
            }}
            onMouseLeave={(e) => {
              if (activeCategory !== skill.cat) {
                e.currentTarget.style.background = "transparent";
                e.currentTarget.style.border = "1px solid rgba(255, 255, 255, 0.1)";
              }
            }}
          >
            {skill.cat}
          </motion.button>
        ))}
      </div>

      {/* Skills Display */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))", gap: 20 }}>
        {SKILLS.map((skill) => (
          <motion.div
            key={skill.cat}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: activeCategory === null || activeCategory === skill.cat ? 1 : 0.3, y: 0 }}
            transition={{ duration: 0.3 }}
            style={{
              pointerEvents: activeCategory !== null && activeCategory !== skill.cat ? "none" : "auto",
            }}
          >
            <FadeUp>
              <div style={{ marginBottom: 16 }}>
                <h3 style={{ 
                  fontSize: 13, 
                  fontWeight: 600, 
                  color: COLORS.text, 
                  marginBottom: 12, 
                  textTransform: "uppercase",
                  letterSpacing: 1,
                  opacity: 0.7,
                }}>
                  {skill.cat}
                </h3>
                <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                  {skill.items.map((item) => (
                    <motion.div
                      key={item}
                      whileHover={{ scale: 1.05, y: -2 }}
                      style={{
                        padding: "7px 13px",
                        background: "rgba(255, 255, 255, 0.05)",
                        border: "1px solid rgba(255, 255, 255, 0.1)",
                        borderRadius: 8,
                        fontSize: 12,
                        color: COLORS.muted,
                        cursor: "pointer",
                        transition: "all 0.2s ease",
                        backdropFilter: "blur(10px)",
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.background = "rgba(255, 255, 255, 0.1)";
                        e.currentTarget.style.borderColor = "rgba(255, 255, 255, 0.2)";
                        e.currentTarget.style.color = COLORS.text;
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.background = "rgba(255, 255, 255, 0.05)";
                        e.currentTarget.style.borderColor = "rgba(255, 255, 255, 0.1)";
                        e.currentTarget.style.color = COLORS.muted;
                      }}
                    >
                      {item}
                    </motion.div>
                  ))}
                </div>
              </div>
            </FadeUp>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

// Timeline
function Timeline() {
  return (
    <section id="work" style={{ padding: "80px 24px", maxWidth: 800, margin: "0 auto" }}>
      <FadeUp>
        <h2 style={{ fontSize: 28, fontWeight: 600, color: COLORS.text, marginBottom: 40 }}>
          Work Experience
        </h2>
      </FadeUp>
      <div style={{ position: "relative" }}>
        {TIMELINE.map((item, i) => (
          <FadeUp key={i} delay={i * 0.08}>
            <div style={{ marginBottom: 40, paddingLeft: 32, position: "relative" }}>
              <div
                style={{
                  position: "absolute",
                  left: 0,
                  top: 0,
                  width: 12,
                  height: 12,
                  background: COLORS.accent,
                  borderRadius: "50%",
                  border: `3px solid ${COLORS.surface}`,
                }}
              />
              <div
                style={{
                  fontSize: 12,
                  color: COLORS.muted,
                  fontWeight: 500,
                  marginBottom: 4,
                  textTransform: "uppercase",
                  letterSpacing: 0.5,
                }}
              >
                {item.year}
              </div>
              <h3 style={{ fontSize: 16, fontWeight: 600, color: COLORS.text, marginBottom: 4 }}>
                {item.title}
              </h3>
              <div style={{ fontSize: 14, color: COLORS.muted, marginBottom: 8 }}>
                {item.org}
              </div>
              <p style={{ fontSize: 14, color: COLORS.muted, lineHeight: 1.6, marginBottom: 12 }}>
                {item.desc}
              </p>
              <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
                {item.tags.map((tag) => (
                  <span
                    key={tag}
                    style={{
                      fontSize: 12,
                      padding: "3px 8px",
                      background: COLORS.accentLight,
                      border: `1px solid ${COLORS.border}`,
                      borderRadius: 3,
                      color: COLORS.text,
                    }}
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </FadeUp>
        ))}
      </div>
    </section>
  );
}

// Social Stats
function SocialStats() {
  const socials = [
    { icon: "🔗", label: "GitHub", value: "codewithvishhh", link: "https://github.com/codewithvishhh" },
    { icon: "💼", label: "LinkedIn", value: "VishnuKumar16", link: "https://www.linkedin.com/in/VishnuKumar16" },
    { icon: "💻", label: "LeetCode", value: "LeetVishh", link: "https://leetcode.com/u/LeetVishh/" },
  ];

  return (
    <section id="socials" style={{ padding: "80px 24px", maxWidth: 900, margin: "0 auto" }}>
      <FadeUp>
        <h2 style={{ fontSize: 28, fontWeight: 600, color: COLORS.text, marginBottom: 40 }}>
          Connect With Me
        </h2>
      </FadeUp>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: 20 }}>
        {socials.map((social, i) => (
          <FadeUp key={social.label} delay={i * 0.08}>
            <motion.a
              href={social.link}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.05, backgroundColor: COLORS.accentLight }}
              style={{
                display: "block",
                padding: 24,
                background: COLORS.surface,
                border: `1px solid ${COLORS.border}`,
                borderRadius: 8,
                textDecoration: "none",
                cursor: "pointer",
                transition: "all 0.3s ease",
              }}
            >
              <div style={{ fontSize: 32, marginBottom: 12 }}>{social.icon}</div>
              <h3 style={{ fontSize: 14, fontWeight: 600, color: COLORS.text, marginBottom: 4 }}>
                {social.label}
              </h3>
              <p style={{ fontSize: 13, color: COLORS.muted }}>
                {social.value}
              </p>
            </motion.a>
          </FadeUp>
        ))}
      </div>
    </section>
  );
}

// Projects
function Projects() {
  return (
    <section id="projects" style={{ padding: "80px 24px", maxWidth: 900, margin: "0 auto" }}>
      <FadeUp>
        <h2 style={{ fontSize: 28, fontWeight: 600, color: COLORS.text, marginBottom: 40 }}>
          Featured Projects
        </h2>
      </FadeUp>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: 24 }}>
        {PROJECTS.map((project, i) => (
          <FadeUp key={project.name} delay={i * 0.1}>
            <motion.a
              href={project.link}
              whileHover={{ y: -4 }}
              style={{
                display: "block",
                padding: 24,
                background: COLORS.surface,
                border: `1px solid ${COLORS.border}`,
                borderRadius: 8,
                textDecoration: "none",
                transition: "all 0.2s ease",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = COLORS.accent;
                e.currentTarget.style.background = "rgba(255, 255, 255, 0.1)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = COLORS.border;
                e.currentTarget.style.background = COLORS.surface;
              }}
            >
              <h3 style={{ fontSize: 16, fontWeight: 600, color: COLORS.text, marginBottom: 8 }}>
                {project.name} →
              </h3>
              <p style={{ fontSize: 14, color: COLORS.muted, lineHeight: 1.6, marginBottom: 16 }}>
                {project.desc}
              </p>
              <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
                {project.tags.map((tag) => (
                  <span
                    key={tag}
                    style={{
                      fontSize: 12,
                      padding: "3px 8px",
                      background: COLORS.border,
                      borderRadius: 3,
                      color: COLORS.muted,
                    }}
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </motion.a>
          </FadeUp>
        ))}
      </div>
    </section>
  );
}

// Blog
function Blog() {
  const [selectedCategory, setSelectedCategory] = useState(null);

  const categories = [...new Set(BLOG_ARTICLES.map((a) => a.category))];

  const filteredArticles =
    selectedCategory === null
      ? BLOG_ARTICLES
      : BLOG_ARTICLES.filter((a) => a.category === selectedCategory);

  return (
    <section id="blog" style={{ padding: "80px 24px", maxWidth: 900, margin: "0 auto" }}>
      <FadeUp>
        <h2 style={{ fontSize: 28, fontWeight: 600, color: COLORS.text, marginBottom: 20 }}>
          Articles & Insights
        </h2>
        <p style={{ fontSize: 14, color: COLORS.muted, marginBottom: 40 }}>
          Thoughts on AI, ML, Python, and software development
        </p>
      </FadeUp>

      {/* Category Filter */}
      <div style={{ display: "flex", gap: 10, marginBottom: 40, flexWrap: "wrap" }}>
        <motion.button
          onClick={() => setSelectedCategory(null)}
          whileHover={{ scale: 1.05 }}
          style={{
            padding: "8px 16px",
            background: selectedCategory === null ? "rgba(255, 255, 255, 0.15)" : "transparent",
            border: selectedCategory === null ? "1px solid rgba(255, 255, 255, 0.3)" : "1px solid rgba(255, 255, 255, 0.1)",
            color: COLORS.text,
            borderRadius: 20,
            cursor: "pointer",
            fontSize: 12,
            fontWeight: 500,
            transition: "all 0.3s ease",
          }}
        >
          All Articles
        </motion.button>
        {categories.map((cat) => (
          <motion.button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            whileHover={{ scale: 1.05 }}
            style={{
              padding: "8px 16px",
              background: selectedCategory === cat ? "rgba(255, 255, 255, 0.15)" : "transparent",
              border: selectedCategory === cat ? "1px solid rgba(255, 255, 255, 0.3)" : "1px solid rgba(255, 255, 255, 0.1)",
              color: COLORS.text,
              borderRadius: 20,
              cursor: "pointer",
              fontSize: 12,
              fontWeight: 500,
              transition: "all 0.3s ease",
            }}
          >
            {cat}
          </motion.button>
        ))}
      </div>

      {/* Articles Grid */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: 24 }}>
        {filteredArticles.map((article, i) => (
          <FadeUp key={article.id} delay={i * 0.08}>
            <motion.div
              whileHover={{ y: -8 }}
              style={{
                padding: 24,
                background: COLORS.surface,
                border: `1px solid ${COLORS.border}`,
                borderRadius: 12,
                cursor: "pointer",
                transition: "all 0.3s ease",
                display: "flex",
                flexDirection: "column",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = "rgba(255, 255, 255, 0.08)";
                e.currentTarget.style.borderColor = "rgba(255, 255, 255, 0.2)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = COLORS.surface;
                e.currentTarget.style.borderColor = COLORS.border;
              }}
            >
              <div style={{ marginBottom: 12 }}>
                <span
                  style={{
                    display: "inline-block",
                    padding: "4px 10px",
                    background: "rgba(255, 255, 255, 0.1)",
                    border: "1px solid rgba(255, 255, 255, 0.2)",
                    borderRadius: 4,
                    fontSize: 11,
                    color: COLORS.muted,
                    textTransform: "uppercase",
                    letterSpacing: 0.5,
                  }}
                >
                  {article.category}
                </span>
              </div>

              <h3
                style={{
                  fontSize: 18,
                  fontWeight: 700,
                  color: COLORS.text,
                  marginBottom: 12,
                  lineHeight: 1.4,
                }}
              >
                {article.title}
              </h3>

              <p
                style={{
                  fontSize: 14,
                  color: COLORS.muted,
                  lineHeight: 1.6,
                  marginBottom: 16,
                  flex: 1,
                }}
              >
                {article.excerpt}
              </p>

              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: "auto" }}>
                <span style={{ fontSize: 12, color: COLORS.muted }}>
                  {article.readTime}
                </span>
                <span style={{ fontSize: 12, color: COLORS.muted }}>
                  {article.date}
                </span>
              </div>

              <div style={{ display: "flex", gap: 6, flexWrap: "wrap", marginTop: 12 }}>
                {article.tags.map((tag) => (
                  <span
                    key={tag}
                    style={{
                      fontSize: 11,
                      padding: "3px 8px",
                      background: "rgba(255, 255, 255, 0.05)",
                      border: "1px solid rgba(255, 255, 255, 0.1)",
                      borderRadius: 3,
                      color: COLORS.muted,
                    }}
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </motion.div>
          </FadeUp>
        ))}
      </div>
    </section>
  );
}

// Contact
function Contact() {
  const [form, setForm] = useState({ name: "", email: "", msg: "" });
  const [sent, setSent] = useState(false);

  return (
    <section id="contact" style={{ padding: "80px 24px 120px", maxWidth: 600, margin: "0 auto" }}>
      <FadeUp>
        <h2 style={{ fontSize: 28, fontWeight: 600, color: COLORS.text, marginBottom: 16 }}>
          Let's Work Together
        </h2>
      </FadeUp>
      <FadeUp delay={0.1}>
        <p style={{ fontSize: 14, color: COLORS.muted, lineHeight: 1.6, marginBottom: 32 }}>
          Have a project in mind or just want to chat? I'd love to hear from you. Send me a message and I'll get back to you as soon as possible.
        </p>
      </FadeUp>

      <FadeUp delay={0.15}>
        {sent ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            style={{
              textAlign: "center",
              padding: "40px 0",
              fontSize: 16,
              color: COLORS.text,
            }}
          >
            ✓ Message sent — I'll reply within 24 hours!
          </motion.div>
        ) : (
          <motion.div initial={{ opacity: 1 }} exit={{ opacity: 0 }}>
            {[
              { label: "Name", key: "name", type: "text", placeholder: "Your name" },
              { label: "Email", key: "email", type: "email", placeholder: "you@example.com" },
            ].map(({ label, key, type, placeholder }) => (
              <div key={key} style={{ marginBottom: 20 }}>
                <label style={{ display: "block", fontSize: 12, fontWeight: 600, color: COLORS.text, marginBottom: 6, textTransform: "uppercase", letterSpacing: 0.5 }}>
                  {label}
                </label>
                <input
                  type={type}
                  placeholder={placeholder}
                  value={form[key]}
                  onChange={(e) => setForm((f) => ({ ...f, [key]: e.target.value }))}
                  style={{
                    width: "100%",
                    padding: "10px 12px",
                    background: COLORS.surface,
                    border: `1px solid ${COLORS.border}`,
                    borderRadius: 4,
                    color: COLORS.text,
                    fontSize: 14,
                    outline: "none",
                    boxSizing: "border-box",
                    transition: "border-color 0.2s",
                  }}
                  onFocus={(e) => (e.target.style.borderColor = COLORS.accent)}
                  onBlur={(e) => (e.target.style.borderColor = COLORS.border)}
                />
              </div>
            ))}
            <div style={{ marginBottom: 24 }}>
              <label style={{ display: "block", fontSize: 12, fontWeight: 600, color: COLORS.text, marginBottom: 6, textTransform: "uppercase", letterSpacing: 0.5 }}>
                Message
              </label>
              <textarea
                rows={5}
                placeholder="Tell me about your project..."
                value={form.msg}
                onChange={(e) => setForm((f) => ({ ...f, msg: e.target.value }))}
                style={{
                  width: "100%",
                  padding: "10px 12px",
                  background: COLORS.surface,
                  border: `1px solid ${COLORS.border}`,
                  borderRadius: 4,
                  color: COLORS.text,
                  fontSize: 14,
                  outline: "none",
                  resize: "vertical",
                  boxSizing: "border-box",
                  transition: "border-color 0.2s",
                  fontFamily: "inherit",
                }}
                onFocus={(e) => (e.target.style.borderColor = COLORS.accent)}
                onBlur={(e) => (e.target.style.borderColor = COLORS.border)}
              />
            </div>
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => {
                if (form.name && form.email && form.msg) {
                  setSent(true);
                  setTimeout(() => {
                    setForm({ name: "", email: "", msg: "" });
                    setSent(false);
                  }, 3000);
                }
              }}
              style={{
                width: "100%",
                padding: "12px 16px",
                background: COLORS.accent,
                border: "none",
                borderRadius: 4,
                color: "white",
                fontSize: 14,
                fontWeight: 500,
                cursor: "pointer",
                transition: "all 0.2s",
              }}
            >
              Send Message
            </motion.button>
          </motion.div>
        )}
      </FadeUp>

      <FadeUp delay={0.2}>
        <div style={{ display: "flex", gap: 16, justifyContent: "center", marginTop: 40 }}>
          {[
            { label: "GitHub", href: "https://github.com/codewithvishhh" },
            { label: "LinkedIn", href: "https://www.linkedin.com/in/VishnuKumar16" },
            { label: "LeetCode", href: "https://leetcode.com/u/LeetVishh/" },
          ].map(({ label, href }) => (
            <motion.a
              key={label}
              href={href}
              whileHover={{ y: -2 }}
              style={{
                fontSize: 13,
                color: COLORS.muted,
                textDecoration: "none",
                fontWeight: 500,
                transition: "all 0.2s",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.color = COLORS.accent;
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.color = COLORS.muted;
              }}
            >
              {label}
            </motion.a>
          ))}
        </div>
      </FadeUp>
    </section>
  );
}

// Footer
function Footer() {
  return (
    <div
      style={{
        borderTop: `1px solid ${COLORS.border}`,
        padding: "24px",
        textAlign: "center",
        color: COLORS.muted,
        fontSize: 12,
      }}
    >
      © {new Date().getFullYear()} Vishnu. All rights reserved.
    </div>
  );
}

// ─── APP ───────────────────────────────────────────────────────────────────────
export default function Portfolio() {
  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap');
        * { margin: 0; padding: 0; box-sizing: border-box; }
        html { scroll-behavior: smooth; }
        body { background: ${COLORS.bg}; color: ${COLORS.text}; font-family: 'Inter', sans-serif; overflow-x: hidden; }
        ::-webkit-scrollbar { width: 6px; }
        ::-webkit-scrollbar-track { background: ${COLORS.bg}; }
        ::-webkit-scrollbar-thumb { background: ${COLORS.border}; border-radius: 3px; }
        ::-webkit-scrollbar-thumb:hover { background: ${COLORS.muted}; }
        ::selection { background: ${COLORS.accentLight}; color: ${COLORS.accent}; }
        input::placeholder, textarea::placeholder { color: ${COLORS.muted}; }
        a { color: inherit; }
      `}</style>

      <AnimatedBackground />
      <CustomCursor />
      <Navbar />
      <main style={{ position: "relative", zIndex: 2 }}>
        <Hero />
        <About />
        <Skills />
        <Timeline />
        <SocialStats />
        <Projects />
        <Blog />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
