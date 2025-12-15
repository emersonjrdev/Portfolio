import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";
import {
  FiGithub,
  FiExternalLink,
  FiArrowUp,
  FiLinkedin,
  FiInstagram,
  FiMail,
  FiUser,
  FiMessageSquare,
  FiX,
  FiSun,
  FiMoon,
  FiLoader,
  FiCode,
  FiZap,
  FiTrendingUp,
} from "react-icons/fi";
import {
  SiReact,
  SiNodedotjs,
  SiSpring,
  SiFlutter,
  SiTypescript,
  SiFigma,
  SiTailwindcss,
  SiNextdotjs,
} from "react-icons/si";
import ReactPlayer from "react-player/lazy";
import { TypeAnimation } from "react-type-animation";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import emailjs from '@emailjs/browser';
import Particles from "react-tsparticles";
import { loadFull } from "tsparticles";
import Scene3D from "./components/Scene3D";
import SpaceGame from "./components/SpaceGame";
import Terminal from "./components/Terminal";
import HologramCard from "./components/HologramCard";
import Timeline3D from "./components/Timeline3D";

// Componente de contador animado
function CounterCard({ metric, delay }) {
  const [count, setCount] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !isVisible) {
          setIsVisible(true);
        }
      },
      { threshold: 0.5 }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current);
      }
    };
  }, [isVisible]);

  useEffect(() => {
    if (!isVisible) return;

    const duration = 2000;
    const steps = 60;
    const increment = metric.value / steps;
    const stepDuration = duration / steps;

    let current = 0;
    const timer = setInterval(() => {
      current += increment;
      if (current >= metric.value) {
        setCount(metric.value);
        clearInterval(timer);
      } else {
        setCount(Math.floor(current));
      }
    }, stepDuration);

    return () => clearInterval(timer);
  }, [isVisible, metric.value]);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20, scale: 0.9 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true }}
      transition={{ delay, duration: 0.5 }}
      whileHover={{ scale: 1.05, y: -5 }}
      className="p-8 backdrop-blur-md bg-white/10 dark:bg-gray-800/50 rounded-2xl hover:bg-white/20 dark:hover:bg-gray-700/50 transition-all border border-white/20 dark:border-gray-700 shadow-xl relative overflow-hidden group"
    >
      {/* Efeito de brilho no hover */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent"
        initial={{ x: "-100%" }}
        whileHover={{ x: "100%" }}
        transition={{ duration: 0.6 }}
      />
      
      <div className="relative z-10">
        <motion.div
          className="text-amber-300 mb-4 flex justify-center"
          whileHover={{ rotate: 360, scale: 1.2 }}
          transition={{ duration: 0.5 }}
        >
          {metric.icon}
        </motion.div>
        <motion.p
          className="text-5xl md:text-6xl font-extrabold mb-2 bg-gradient-to-r from-white to-amber-200 bg-clip-text text-transparent"
          key={count}
          initial={{ scale: 1.2, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.2 }}
        >
          {count}{metric.suffix}
        </motion.p>
        <p className="text-lg opacity-90">{metric.label}</p>
      </div>
    </motion.div>
  );
}

export default function Portfolio() {
  const [showTopBtn, setShowTopBtn] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [showThankYouModal, setShowThankYouModal] = useState(false);
  const [activeFilter, setActiveFilter] = useState("all");
  const [darkMode, setDarkMode] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [formErrors, setFormErrors] = useState({});
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [isVideoLoaded, setIsVideoLoaded] = useState(false);
  const formRef = useRef(null);

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [cursorVariant, setCursorVariant] = useState("default");
  const heroRef = useRef(null);
  const { scrollYProgress } = useScroll();
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);

  // Simular loading
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1800);
    return () => clearTimeout(timer);
  }, []);

  // Mouse tracking para efeitos interativos
  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  // Configuração de partículas
  const particlesInit = async (main) => {
    await loadFull(main);
  };

  const particlesOptions = {
    background: {
      color: {
        value: "transparent",
      },
    },
    fpsLimit: 120,
    interactivity: {
      events: {
        onClick: {
          enable: true,
          mode: "push",
        },
        onHover: {
          enable: true,
          mode: "repulse",
        },
        resize: true,
      },
      modes: {
        push: {
          quantity: 4,
        },
        repulse: {
          distance: 200,
          duration: 0.4,
        },
      },
    },
    particles: {
      color: {
        value: "#14b8a6",
      },
      links: {
        color: "#14b8a6",
        distance: 150,
        enable: true,
        opacity: 0.3,
        width: 1,
      },
      collisions: {
        enable: true,
      },
      move: {
        direction: "none",
        enable: true,
        outModes: {
          default: "bounce",
        },
        random: false,
        speed: 1,
        straight: false,
      },
      number: {
        density: {
          enable: true,
          area: 800,
        },
        value: 50,
      },
      opacity: {
        value: 0.5,
      },
      shape: {
        type: "circle",
      },
      size: {
        value: { min: 1, max: 3 },
      },
    },
    detectRetina: true,
  };

  // Verificar preferência do sistema para dark mode
  useEffect(() => {
    if (typeof window !== "undefined") {
      const isDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
      const savedMode = localStorage.getItem("darkMode");
      setDarkMode(savedMode ? JSON.parse(savedMode) : isDark);
    }
  }, []);

  // Aplicar dark mode
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
      document.body.classList.add("dark-mode");
    } else {
      document.documentElement.classList.remove("dark");
      document.body.classList.remove("dark-mode");
    }
  }, [darkMode]);

  // Configurações do carrossel
  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
    adaptiveHeight: true,
    autoplay: true,
    autoplaySpeed: 5000,
    cssEase: "cubic-bezier(0.645, 0.045, 0.355, 1)",
    responsive: [
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          centerMode: false,
          infinite: true,
        },
      },
    ],
  };

  // Efeitos de scroll
  useEffect(() => {
    const handleScroll = () => {
      setShowTopBtn(window.pageYOffset > 300);
      const totalHeight = document.body.scrollHeight - window.innerHeight;
      setScrollProgress((window.scrollY / totalHeight) * 100);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
    if (!menuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
  };

  const toggleDarkMode = () => {
    const newMode = !darkMode;
    setDarkMode(newMode);
    localStorage.setItem("darkMode", JSON.stringify(newMode));
  };

  const validateForm = () => {
    const errors = {};
    if (!formData.name.trim()) errors.name = "Nome é obrigatório";
    if (!formData.email.trim()) {
      errors.email = "Email é obrigatório";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      errors.email = "Email inválido";
    }
    if (!formData.message.trim()) errors.message = "Mensagem é obrigatória";
    return errors;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    // Clear error when typing
    if (formErrors[name]) {
      setFormErrors((prev) => ({
        ...prev,
        [name]: null,
      }));
    }
  };

 const handleSubmit = async (e) => {
  e.preventDefault();
  const errors = validateForm();

  if (Object.keys(errors).length > 0) {
    setFormErrors(errors);
    return;
  }

  setIsSubmitting(true);
  setSubmitError(null);

  try {
    await emailjs.sendForm(
      'service_b2z9q76', // Service ID
      'template_0l66x1j', // Template ID (apenas o ID, não a URL)
      formRef.current,    // Referência do formulário
      'M2Oi0QCK_uZqjog2H' // Public Key
    );

    setShowThankYouModal(true);
    setFormData({ name: "", email: "", message: "" });
  } catch (error) {
    console.error("Erro ao enviar:", error);
    setSubmitError("Ocorreu um erro. Tente novamente mais tarde.");
  } finally {
    setIsSubmitting(false);
  }
};

  // Animation variants
  const sectionVariant = {
    hidden: { opacity: 0, y: 40 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: [0.1, 0.25, 0.3, 1],
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariant = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut",
      },
    },
  };

  // Data
  const skills = [
    {
      name: "React/React Native",
      icon: <SiReact className="text-[#61DAFB]" size={28} />,
      color: "from-[#61DAFB] to-[#2a93d5]",
    },
    {
      name: "Node.js",
      icon: <SiNodedotjs className="text-[#339933]" size={28} />,
      color: "from-[#339933] to-[#1f6f1f]",
    },
    {
      name: "UI/UX Design",
      icon: <SiFigma className="text-[#f24f1eee]" size={28} />,
      color: "from-[#F24E1E] to-[#f24f1e3f]",
    },
    {
      name: "Java/Spring",
      icon: <SiSpring className="text-[#6DB33F]" size={28} />,
      color: "from-[#6DB33F] to-[#4a8a2a]",
    },
    {
      name: "Flutter",
      icon: <SiFlutter className="text-[#02569B]" size={28} />,
      color: "from-[#02569B] to-[#013a6b]",
    },
    {
      name: "TypeScript",
      icon: <SiTypescript className="text-[#3178C6]" size={28} />,
      color: "from-[#3178C6] to-[#1e56a3]",
    },
    {
      name: "Tailwind CSS",
      icon: <SiTailwindcss className="text-[#06B6D4]" size={28} />,
      color: "from-[#06B6D4] to-[#0891B2]",
    },
    {
      name: "Next.js",
      icon: (
        <SiNextdotjs className="text-[#000000] dark:text-[#FFFFFF]" size={28} />
      ),
      color:
        "from-[#000000] to-[#475569] dark:from-[#FFFFFF] dark:to-[#94A3B8]",
    },
  ];

  const projects = [
    {
      id: 1,
      title: "ConnectWork",
      description:
        "Plataforma profissional para conexão e colaboração entre freelancers e empresas com sistema de matchmaking inteligente.",
      tags: ["React", "Node.js", "MySQL", "Tailwind"],
      category: "web",
      image: "/connect.png",
      links: {
        demo: "https://connectwork.site",
        code: "https://github.com/emersonjrdev",
      },
      metrics: "Aumentou engajamento em 40%",
      features: ["ChatBot", "Sistema de vagas"],
      challenges: "Garantir a experiência entre empresas e alunos",
    },
    {
      id: 2,
      title: "Portfolio Moderno",
      description:
        "Template de portfólio profissional com design responsivo, modo escuro/claro e animações fluidas.",
      tags: ["React", "Tailwind CSS", "Framer Motion"],
      category: "web",
      image: "/Portfolio1.png",
      links: {
        demo: "https://emersondev.vercel.app",
        code: "https://github.com/emersonjrdev",
      },
      metrics: "Melhorou conversão em 25%",
      features: ["Design responsivo", "Modo escuro/claro", "SEO otimizado"],
      challenges: "Criar animações fluidas sem prejudicar performance",
    },
    {
      id: 3,
      title: "ConnectWork App",
      description:
        "Aplicativo móvel da plataforma ConnectWork com notificações em tempo real e chat integrado.",
      tags: ["React Native", "Node.js", "MySQL"],
      category: "mobile",
      image: "/Mobile.png",
      links: {
        demo: "#",
        code: "https://github.com/emersonjrdev",
      },
      metrics: "4.8/5 avaliações na Play Store",
      features: ["Notificações push", "Offline-first"],
      challenges: "Garantir experiência consistente entre plataformas",
    },
  ];

  const testimonials = [
    {
      quote:
        "Trabalho excepcional! Entregou além do esperado com ótima comunicação e atenção aos detalhes.",
      author: "João Souza",
      role: "CEO, TechSolutions",
      avatar: "/avatar1.jpg",
    },
    {
      quote:
        "Solução perfeita para nossas necessidades com ótimo custo-benefício e prazos cumpridos rigorosamente.",
      author: "Maria Clara",
      role: "Gerente de Projetos, InovaCorp",
      avatar: "/avatar2.jpg",
    },
    {
      quote:
        "Profissional altamente qualificado e comprometido com os resultados. Superou todas as expectativas.",
      author: "Paulo Henrique",
      role: "CTO, DigitalMind",
      avatar: "/avatar3.jpg",
    },
  ];

  const filteredProjects =
    activeFilter === "all"
      ? projects
      : projects.filter((project) => project.category === activeFilter);

  // Loading Screen
  if (isLoading) {
    return (
      <div className="fixed inset-0 bg-gradient-to-br from-teal-900 to-emerald-900 flex flex-col items-center justify-center z-50">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="flex flex-col items-center"
        >
          <motion.div
            animate={{
              rotate: 360,
              scale: [1, 1.2, 1],
            }}
            transition={{
              rotate: {
                repeat: Infinity,
                duration: 2,
                ease: "linear",
              },
              scale: {
                repeat: Infinity,
                repeatType: "reverse",
                duration: 1,
                ease: "easeInOut",
              },
            }}
            className="mb-6"
          >
            <FiLoader className="text-amber-300" size={48} />
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="text-3xl md:text-4xl font-bold text-white mb-2"
          >
            Emerson Morales Jr
          </motion.h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="text-white/80 text-lg"
          >
            Carregando portfólio...
          </motion.p>

          <motion.div
            initial={{ width: 0 }}
            animate={{ width: "50%" }}
            transition={{ delay: 0.9, duration: 1.5, ease: "easeInOut" }}
            className="h-1 bg-amber-300 mt-6 rounded-full"
          />
        </motion.div>
      </div>
    );
  }

  return (
    <div
      className={`min-h-screen ${
        darkMode ? "dark bg-gray-900 text-gray-100" : "bg-gray-50 text-gray-900"
      } font-sans selection:bg-teal-500 selection:text-white transition-colors duration-300 overflow-x-hidden relative`}
    >
      {/* Partículas de fundo */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <Particles
          id="tsparticles"
          init={particlesInit}
          options={particlesOptions}
          className="w-full h-full"
        />
      </div>

      {/* Cursor personalizado */}
      <motion.div
        className="fixed top-0 left-0 w-6 h-6 bg-teal-500 rounded-full pointer-events-none z-[100] mix-blend-difference"
        animate={{
          x: mousePosition.x - 12,
          y: mousePosition.y - 12,
        }}
        transition={{
          type: "spring",
          stiffness: 500,
          damping: 28,
        }}
      />

      {/* Scroll progress bar melhorado */}
      <motion.div
        className="fixed top-0 left-0 h-1 bg-gradient-to-r from-teal-500 via-emerald-500 to-teal-500 z-50 shadow-lg"
        style={{ width: `${scrollProgress}%` }}
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ duration: 0.3 }}
      />

      {/* Dark Mode Toggle */}
      <button
        onClick={toggleDarkMode}
        className={`fixed top-8 left-8 p-2 rounded-full ${
          darkMode
            ? "bg-white/10 text-amber-300"
            : "bg-gray-900/10 text-gray-900"
        } backdrop-blur-sm z-50 hover:bg-white/20 transition-all shadow-lg`}
        aria-label={darkMode ? "Light mode" : "Dark mode"}
      >
        {darkMode ? <FiSun size={20} /> : <FiMoon size={20} />}
      </button>

      {/* Thank You Modal */}
      <AnimatePresence>
        {showThankYouModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4 backdrop-blur-sm"
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ type: "spring", damping: 20 }}
              className={`${
                darkMode
                  ? "dark:bg-gray-800 dark:border-gray-700"
                  : "bg-white border-gray-100"
              } rounded-xl w-full max-w-xs sm:max-w-sm md:max-w-md mx-2 p-6 md:p-8 relative shadow-2xl border`}
            >
              <button
                onClick={() => setShowThankYouModal(false)}
                className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 dark:hover:text-gray-300 transition"
                aria-label="Fechar modal"
              >
                <FiX size={24} />
              </button>

              <div className="text-center">
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.2 }}
                  className={`w-20 h-20 ${
                    darkMode ? "dark:bg-emerald-900/30" : "bg-emerald-50"
                  } rounded-full flex items-center justify-center mx-auto mb-6`}
                >
                  <svg
                    className="w-10 h-10 text-emerald-500"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M5 13l4 4L19 7"
                    ></path>
                  </svg>
                </motion.div>

                <h3
                  className={`text-2xl md:text-3xl font-bold mb-3 ${
                    darkMode ? "dark:text-white" : "text-gray-800"
                  }`}
                >
                  Mensagem Enviada!
                </h3>
                <p
                  className={`${
                    darkMode ? "dark:text-gray-300" : "text-gray-600"
                  } mb-6`}
                >
                  Obrigado pelo seu contato. Responderei o mais breve possível.
                </p>

                {/* <motion.button
                  type="submit"
                  disabled={isSubmitting}
                  whileHover={{ scale: isSubmitting ? 1 : 1.02 }}
                  className={`w-full bg-gradient-to-r from-teal-600 to-emerald-600 text-white py-3 px-6 rounded-lg font-bold hover:shadow-lg transition-all ${
                    isSubmitting ? "opacity-80 cursor-not-allowed" : ""
                  }`}
                >
                  {isSubmitting ? (
                    <span className="flex items-center justify-center gap-2">
                      <FiLoader className="animate-spin" />
                      Enviando...
                    </span>
                  ) : (
                    "Enviar Mensagem"
                  )}
                </motion.button> */}

                {submitError && (
                  <motion.p
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mt-4 text-red-500 text-center"
                  >
                    {submitError}
                  </motion.p>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Mobile Menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "tween", ease: [0.76, 0, 0.24, 1] }}
            className="fixed inset-0 bg-gradient-to-br from-teal-900 to-emerald-900 z-40 flex flex-col items-center justify-center md:hidden"
          >
            <button
              onClick={toggleMenu}
              className="absolute top-8 right-8 z-50 p-2 text-white hover:text-amber-300 transition-colors"
              aria-label="Fechar menu"
            >
              <FiX size={28} />
            </button>

            <div className="flex flex-col items-center justify-center h-full w-full px-6">
              <nav className="flex flex-col items-center gap-8 text-white text-2xl">
                {["sobre", "projetos", "contato"].map((item) => (
                  <motion.a
                    key={item}
                    href={`#${item}`}
                    onClick={toggleMenu}
                    className="relative overflow-hidden py-2 group"
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{
                      delay:
                        0.1 * ["sobre", "projetos", "contato"].indexOf(item),
                    }}
                  >
                    <span className="relative z-10 capitalize group-hover:text-amber-300 transition-colors">
                      {item}
                    </span>
                    <motion.span
                      className="absolute bottom-0 left-0 w-full h-0.5 bg-amber-400"
                      initial={{ scaleX: 0 }}
                      whileHover={{ scaleX: 1 }}
                      transition={{ duration: 0.3 }}
                    />
                  </motion.a>
                ))}
              </nav>

              <motion.div
                className="mt-12 flex gap-6"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
              >
                {[
                  {
                    icon: <FiLinkedin size={28} />,
                    url: "https://www.linkedin.com/in/emerson-morales-junior-6469b8231/",
                  },
                  {
                    icon: <FiInstagram size={28} />,
                    url: "https://www.instagram.com/emersxn_jr",
                  },
                  {
                    icon: <FiGithub size={28} />,
                    url: "https://github.com/emersonjrdev",
                  },
                ].map((social, index) => (
                  <motion.a
                    key={index}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ y: -5, scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    className="text-white hover:text-amber-300 transition-colors p-2 rounded-full hover:bg-white/10"
                  >
                    {social.icon}
                  </motion.a>
                ))}
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Header Section - Futurista com 3D */}
      <header 
        ref={heroRef}
        className="relative bg-gradient-to-br from-gray-900 via-teal-900 to-emerald-900 flex flex-col md:flex-row items-center text-white pt-24 pb-16 px-6 md:px-12 lg:px-24 min-h-screen overflow-hidden"
      >
        {/* Cena 3D de fundo - Ocultar em mobile para performance */}
        <div className="hidden md:block absolute inset-0 z-0 opacity-30">
          <Scene3D />
        </div>
        {/* Efeito de gradiente animado */}
        <div className="absolute inset-0 bg-gradient-to-r from-teal-600/20 via-emerald-600/20 to-teal-600/20 animate-gradient-xy"></div>
        
        {/* Grid pattern de fundo */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{
            backgroundImage: `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
                              linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`,
            backgroundSize: '50px 50px'
          }}></div>
        </div>

        {/* Desktop Navigation - Melhorado */}
        <nav className="hidden md:flex absolute top-8 right-12 gap-8 text-white z-50">
          {["sobre", "projetos", "contato"].map((item) => (
            <motion.a
              key={item}
              href={`#${item}`}
              className="relative group overflow-hidden py-2 px-4 rounded-full backdrop-blur-sm bg-white/10 hover:bg-white/20 transition-all"
              aria-label={`Ir para seção ${item}`}
              whileHover={{ scale: 1.1, y: -2 }}
              whileTap={{ scale: 0.95 }}
            >
              <span className="capitalize relative z-10 font-medium">{item}</span>
              <motion.span
                className="absolute bottom-0 left-0 w-full h-full bg-gradient-to-r from-amber-400 to-yellow-400 rounded-full"
                initial={{ scaleX: 0 }}
                whileHover={{ scaleX: 1 }}
                transition={{ duration: 0.3 }}
                style={{ originX: 0 }}
              />
            </motion.a>
          ))}
        </nav>

        {/* Mobile Menu Button */}
        <button
          onClick={toggleMenu}
          className="md:hidden absolute top-8 right-6 z-50"
          aria-label="Menu"
        >
          <div
            className={`w-6 flex flex-col gap-1.5 ${
              menuOpen ? "opacity-0" : "opacity-100"
            } transition-opacity`}
          >
            <span className="h-0.5 w-full bg-white"></span>
            <span className="h-0.5 w-full bg-white"></span>
            <span className="h-0.5 w-full bg-white"></span>
          </div>
        </button>

        {/* Profile Image - Futurista com holograma */}
        <motion.div
          initial={{ scale: 0, rotate: -15, opacity: 0 }}
          animate={{ scale: 1, rotate: 0, opacity: 1 }}
          transition={{ delay: 0.2, type: "spring", stiffness: 100 }}
          className="relative mb-8 md:mb-0 md:mr-12 z-10 w-40 h-40 md:w-56 md:h-56"
          whileHover={{ scale: 1.1, rotate: 5 }}
        >
          {/* Efeito holográfico */}
          <div className="absolute inset-0 rounded-full border-4 border-teal-400/50 animate-pulse" style={{
            boxShadow: '0 0 30px rgba(20, 184, 166, 0.5), 0 0 60px rgba(16, 185, 129, 0.3)'
          }} />
          {/* Anel animado ao redor */}
          <motion.div
            className="absolute inset-0 rounded-full border-4 border-amber-400/50"
            animate={{
              rotate: 360,
              scale: [1, 1.1, 1],
            }}
            transition={{
              rotate: {
                repeat: Infinity,
                duration: 20,
                ease: "linear",
              },
              scale: {
                repeat: Infinity,
                duration: 2,
                ease: "easeInOut",
              },
            }}
          />
          
          <div className="w-full h-full rounded-full overflow-hidden shadow-2xl border-4 border-white/30 relative backdrop-blur-sm">
            <img
              src="/foto-pessoal.jpeg"
              alt="Emerson Morales"
              className="w-full h-full object-cover object-center"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-gradient-to-br from-teal-600/30 to-emerald-600/30 mix-blend-overlay"></div>
            {/* Efeito de brilho */}
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
              animate={{
                x: ['-100%', '100%'],
              }}
              transition={{
                repeat: Infinity,
                duration: 3,
                ease: "linear",
              }}
            />
          </div>
          
          <motion.div
            animate={{
              scale: [1, 1.15, 1],
              rotate: [0, 5, -5, 0],
            }}
            transition={{
              repeat: Infinity,
              duration: 3,
              ease: "easeInOut",
            }}
            className="absolute -bottom-2 -right-2 bg-gradient-to-r from-amber-400 to-yellow-400 text-teal-900 px-4 py-2 rounded-full text-xs font-bold shadow-xl backdrop-blur-sm"
          >
            <span className="flex items-center gap-1">
              <motion.span
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ repeat: Infinity, duration: 1 }}
              >
                ✨
              </motion.span>
              Disponível!
            </span>
          </motion.div>
        </motion.div>

        {/* Header Content - Melhorado */}
        <motion.div 
          className="text-center md:text-left z-10 relative"
          style={{ y }}
        >
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            {/* Badge animado */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
              className="inline-flex items-center gap-2 px-4 py-2 mb-6 bg-white/10 backdrop-blur-md rounded-full border border-white/20"
            >
              <motion.span
                animate={{ rotate: [0, 360] }}
                transition={{ repeat: Infinity, duration: 2, ease: "linear" }}
              >
                <FiCode className="text-amber-300" />
              </motion.span>
              <span className="text-sm font-medium">Desenvolvedor Full Stack</span>
            </motion.div>

            <div className="relative">
              <TypeAnimation
                sequence={[
                  "Emerson Morales Jr",
                  1000,
                  "Desenvolvedor Full Stack",
                  1000,
                  "UI/UX Designer",
                  1000,
                  "Criador de Experiências",
                  1000,
                  "Futurista Digital",
                  1000,
                ]}
                wrapper="h1"
                cursor={true}
                repeat={Infinity}
                style={{ display: "inline-block" }}
                className="text-5xl md:text-6xl lg:text-7xl font-extrabold leading-tight mb-4 bg-gradient-to-r from-teal-400 via-emerald-400 to-teal-400 bg-clip-text text-transparent bg-[length:200%_auto] animate-gradient relative z-10"
                deletionSpeed={70}
              />
              {/* Efeito de brilho neon */}
              <div className="absolute inset-0 text-5xl md:text-6xl lg:text-7xl font-extrabold bg-gradient-to-r from-teal-400 via-emerald-400 to-teal-400 bg-clip-text text-transparent blur-xl opacity-50 animate-pulse" style={{ zIndex: 0 }}>
                <TypeAnimation
                  sequence={[
                    "Emerson Morales Jr",
                    1000,
                    "Desenvolvedor Full Stack",
                    1000,
                    "UI/UX Designer",
                    1000,
                    "Criador de Experiências",
                    1000,
                    "Futurista Digital",
                    1000,
                  ]}
                  wrapper="span"
                  cursor={false}
                  repeat={Infinity}
                  deletionSpeed={70}
                />
              </div>
            </div>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
              className="text-xl md:text-2xl lg:text-3xl opacity-90 mb-8 font-light"
            >
              Criando soluções digitais com{" "}
              <motion.span 
                className="font-semibold text-amber-300 inline-block"
                whileHover={{ scale: 1.1, y: -2 }}
              >
                React
              </motion.span>
              {", "}
              <motion.span 
                className="font-semibold text-amber-300 inline-block"
                whileHover={{ scale: 1.1, y: -2 }}
              >
                Node.js
              </motion.span>
              {" e "}
              <motion.span 
                className="font-semibold text-amber-300 inline-block"
                whileHover={{ scale: 1.1, y: -2 }}
              >
                Design
              </motion.span>
            </motion.p>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8 }}
              className="flex flex-wrap justify-center md:justify-start gap-4"
            >
              <motion.a
                href="#projetos"
                whileHover={{ y: -5, scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="group inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-white to-amber-50 text-teal-900 font-bold rounded-full shadow-2xl hover:shadow-amber-500/50 transition-all relative overflow-hidden"
              >
                <span className="relative z-10">Ver Projetos</span>
                <motion.span
                  className="absolute inset-0 bg-gradient-to-r from-amber-400 to-yellow-400"
                  initial={{ x: "-100%" }}
                  whileHover={{ x: 0 }}
                  transition={{ duration: 0.3 }}
                />
                <FiExternalLink className="relative z-10" />
              </motion.a>
              <motion.a
                href="#contato"
                whileHover={{ y: -5, scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="group inline-flex items-center gap-2 px-8 py-4 bg-transparent border-2 border-white/50 backdrop-blur-sm text-white font-bold rounded-full hover:bg-white/20 hover:border-white transition-all relative overflow-hidden"
              >
                <span className="relative z-10">Contato</span>
                <motion.span
                  className="absolute inset-0 bg-white/10"
                  initial={{ scale: 0 }}
                  whileHover={{ scale: 1 }}
                  transition={{ duration: 0.3 }}
                />
              </motion.a>
            </motion.div>

            {/* Estatísticas rápidas */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1 }}
              className="flex flex-wrap justify-center md:justify-start gap-6 mt-12"
            >
              {[
                { icon: <FiCode />, value: "8+", label: "Projetos" },
                { icon: <FiZap />, value: "100%", label: "Satisfação" },
                { icon: <FiTrendingUp />, value: "3+", label: "Anos Exp." },
              ].map((stat, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 1 + i * 0.1 }}
                  whileHover={{ scale: 1.1, y: -5 }}
                  className="text-center p-4 bg-white/10 backdrop-blur-md rounded-2xl border border-white/20"
                >
                  <div className="text-amber-300 text-2xl mb-2 flex justify-center">
                    {stat.icon}
                  </div>
                  <div className="text-3xl font-bold mb-1">{stat.value}</div>
                  <div className="text-sm opacity-80">{stat.label}</div>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        </motion.div>

        {/* Background elements animados */}
        <motion.div
          className="absolute -bottom-20 -right-20 w-64 h-64 bg-teal-500 rounded-full filter blur-3xl opacity-20 -z-10"
          animate={{
            scale: [1, 1.2, 1],
            x: [0, 20, 0],
            y: [0, -20, 0],
          }}
          transition={{
            repeat: Infinity,
            duration: 8,
            ease: "easeInOut",
          }}
        />
        <motion.div
          className="absolute -top-20 -left-20 w-80 h-80 bg-emerald-500 rounded-full filter blur-3xl opacity-20 -z-10"
          animate={{
            scale: [1, 1.3, 1],
            x: [0, -30, 0],
            y: [0, 30, 0],
          }}
          transition={{
            repeat: Infinity,
            duration: 10,
            ease: "easeInOut",
          }}
        />
        <motion.div
          className="absolute top-1/2 left-1/2 w-96 h-96 bg-amber-500 rounded-full filter blur-3xl opacity-10 -z-10"
          animate={{
            scale: [1, 1.5, 1],
            rotate: [0, 180, 360],
          }}
          transition={{
            repeat: Infinity,
            duration: 15,
            ease: "linear",
          }}
          style={{ transform: "translate(-50%, -50%)" }}
        />
      </header>

      {/* About Me Section - Futurista */}
      <section
        id="sobre"
        className="py-20 md:py-28 px-6 relative bg-gradient-to-b from-gray-900 via-black to-gray-900 overflow-hidden"
      >
        {/* Efeitos de fundo futurista */}
        <div className="absolute inset-0 futuristic-grid opacity-10"></div>
        <div className="absolute top-1/4 left-0 w-96 h-96 bg-teal-500 rounded-full filter blur-3xl opacity-5"></div>
        <div className="absolute bottom-1/4 right-0 w-96 h-96 bg-emerald-500 rounded-full filter blur-3xl opacity-5"></div>
        {/* Video Background */}
        <div className="hidden md:block absolute inset-0 overflow-hidden z-0">
          <div className="absolute inset-0 bg-gradient-to-br from-teal-900/70 to-emerald-900/70 z-10"></div>
          <ReactPlayer
            url="/coding-bg.mp4"
            playing
            loop
            muted
            width="100%"
            height="100%"
            style={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              minWidth: "100%",
              minHeight: "100%",
              objectFit: "cover",
              opacity: isVideoLoaded ? 0.3 : 0,
              transition: "opacity 1s ease",
            }}
            onReady={() => setIsVideoLoaded(true)}
            config={{
              file: {
                attributes: {
                  style: {
                    objectFit: "cover",
                  },
                },
              },
            }}
          />
        </div>

        {/* Imagem de fundo apenas para mobile */}
        <div className="md:hidden absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-br from-teal-900/70 to-emerald-900/70 z-10"></div>
          <img
            src="/coding-bg.png"
            alt="Background"
            className="w-full h-full object-cover opacity-30"
            loading="lazy"
          />
        </div>

        <div className="max-w-6xl mx-auto relative z-10">
          <div className="absolute -left-20 top-1/3 w-40 h-40 bg-purple-500 rounded-full filter blur-3xl opacity-10 dark:opacity-5 -z-10"></div>
          <div className="absolute -right-20 bottom-1/4 w-60 h-60 bg-teal-500 rounded-full filter blur-3xl opacity-10 dark:opacity-5 -z-10"></div>

          <motion.h2
            variants={itemVariant}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="text-4xl md:text-5xl lg:text-6xl font-extrabold mb-16 md:mb-20 text-center"
          >
            <span className="relative inline-block">
              <span className="relative z-10 bg-gradient-to-r from-teal-400 to-emerald-400 bg-clip-text text-transparent neon-text">
                Sobre Mim
              </span>
              <span className="absolute bottom-2 left-0 w-full h-4 bg-teal-500/20 z-0 rounded-full blur-xl"></span>
            </span>
          </motion.h2>

          <motion.div
            variants={sectionVariant}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid md:grid-cols-2 gap-12 md:gap-16 items-center"
          >
            <div>
              <motion.p
                variants={itemVariant}
                className="text-lg leading-relaxed text-gray-300 mb-6"
              >
                Sou um{" "}
                <span className="font-semibold text-teal-400 neon-text">
                  Desenvolvedor Full Stack
                </span>{" "}
                com experiência em criar soluções digitais completas, desde o
                design até a implementação. Minha paixão é transformar ideias em
                produtos funcionais e elegantes que proporcionam excelentes
                experiências aos usuários.
              </motion.p>

              <motion.p
                variants={itemVariant}
                className="text-lg leading-relaxed text-gray-300 mb-8 md:mb-10"
              >
                Com background em desenvolvimento web e mobile, trabalho com
                tecnologias modernas como{" "}
                <span className="font-medium text-teal-400">
                  React, Node.js, Flutter e Spring Boot
                </span>
                . Acredito na combinação de código limpo, boas práticas e design
                atencioso para criar soluções escaláveis e eficientes.
              </motion.p>

              <motion.div variants={itemVariant}>
                <h3 className="text-2xl md:text-3xl font-bold mb-6 md:mb-8 text-white flex items-center gap-2">
                  <FiCode className="text-teal-400" />
                  <span className="bg-gradient-to-r from-teal-400 to-emerald-400 bg-clip-text text-transparent">
                    Habilidades Tecnológicas:
                  </span>
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-4 md:gap-6">
                  {skills.map((skill, index) => (
                    <HologramCard
                      key={index}
                      title={skill.name}
                      description={`Domínio avançado em ${skill.name} com experiência em projetos de grande escala.`}
                      icon={skill.icon}
                      delay={index * 0.1}
                    />
                  ))}
                </div>
              </motion.div>
            </div>

            <motion.div
              variants={itemVariant}
              className="bg-white/10 dark:bg-gray-800/50 backdrop-blur-md p-8 rounded-2xl shadow-2xl border border-white/20 dark:border-gray-700 relative overflow-hidden"
            >
              {/* Efeito de brilho */}
              <div className="absolute top-0 right-0 w-64 h-64 bg-teal-500 rounded-full filter blur-3xl opacity-10 -z-10"></div>
              
              <h3 className="text-3xl font-bold mb-8 text-center bg-gradient-to-r from-teal-400 to-emerald-400 bg-clip-text text-transparent flex items-center justify-center gap-2">
                <FiTrendingUp />
                Experiência
              </h3>
              <div className="space-y-8">
                <div className="relative pl-10 border-l-2 border-teal-200 dark:border-teal-800 group">
                  <div className="absolute -left-1 top-0 w-3 h-3 rounded-full bg-teal-500 group-hover:bg-gradient-to-r from-teal-500 to-emerald-500 transition-all"></div>
                  <h4 className="text-lg font-bold text-gray-800 dark:text-gray-200 mb-1">
                    Desenvolvedor Full Stack
                  </h4>
                  <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">
                    Freelancer | 2021 - Presente
                  </p>
                  <p className="text-gray-700 dark:text-gray-300">
                    Desenvolvimento de aplicações web e mobile completas, desde
                    o design UI/UX até a implementação de APIs e deploy em
                    produção.
                  </p>
                </div>

                <div className="relative pl-10 border-l-2 border-teal-200 dark:border-teal-800 group">
                  <div className="absolute -left-1 top-0 w-3 h-3 rounded-full bg-teal-500 group-hover:bg-gradient-to-r from-teal-500 to-emerald-500 transition-all"></div>
                  <h4 className="text-lg font-bold text-gray-800 dark:text-gray-200 mb-1">
                    Desenvolvedor Mobile
                  </h4>
                  <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">
                    Projetos Pessoais | 2020 - 2021
                  </p>
                  <p className="text-gray-700 dark:text-gray-300">
                    Criação de aplicativos multiplataforma com React Native e
                    Flutter, com integração a APIs REST e serviços em nuvem.
                  </p>
                </div>

                <div className="relative pl-10 border-l-2 border-teal-200 dark:border-teal-800 group">
                  <div className="absolute -left-1 top-0 w-3 h-3 rounded-full bg-teal-500 group-hover:bg-gradient-to-r from-teal-500 to-emerald-500 transition-all"></div>
                  <h4 className="text-lg font-bold text-gray-800 dark:text-gray-200 mb-1">
                    UI/UX Designer
                  </h4>
                  <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">
                    Freelancer | 2019 - 2020
                  </p>
                  <p className="text-gray-700 dark:text-gray-300">
                    Design de interfaces e experiências de usuário para
                    aplicativos e websites, criando protótipos e sistemas de
                    design.
                  </p>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Seção de Minigame Interativo */}
      <section className="py-20 bg-gradient-to-b from-gray-900 to-black px-6 relative overflow-hidden">
        <div className="max-w-7xl mx-auto">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-extrabold mb-12 text-center"
          >
            <span className="bg-gradient-to-r from-teal-400 to-emerald-400 bg-clip-text text-transparent">
              🎮 Minigame Interativo
            </span>
          </motion.h2>
          <SpaceGame />
        </div>
      </section>

      {/* Terminal Futurista */}
      <section className="py-20 bg-gradient-to-b from-black to-gray-900 px-6 relative">
        <div className="max-w-4xl mx-auto">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-extrabold mb-12 text-center"
          >
            <span className="bg-gradient-to-r from-teal-400 to-emerald-400 bg-clip-text text-transparent">
              💻 Terminal Interativo
            </span>
          </motion.h2>
          <Terminal />
        </div>
      </section>

      {/* Metrics Section - Melhorado com contadores animados */}
      <section className="py-16 bg-gradient-to-r from-emerald-700 via-teal-700 to-emerald-700 text-white dark:bg-gray-900 relative overflow-hidden">
        {/* Efeito de ondas */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{
            backgroundImage: `radial-gradient(circle at 2px 2px, white 1px, transparent 0)`,
            backgroundSize: '40px 40px'
          }}></div>
        </div>
        
        <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-3 gap-8 text-center relative z-10">
          {[
            { value: 8, suffix: "+", label: "Projetos Completos", icon: <FiCode size={32} /> },
            { value: 100, suffix: "%", label: "Satisfação do Cliente", icon: <FiZap size={32} /> },
            { value: 3, suffix: "+", label: "Anos de Experiência", icon: <FiTrendingUp size={32} /> },
          ].map((metric, index) => (
            <CounterCard key={index} metric={metric} delay={index * 0.1} />
          ))}
        </div>
      </section>

      {/* Projects Section - Timeline 3D Futurista */}
      <section
        id="projetos"
        className="py-20 bg-gradient-to-b from-gray-900 via-black to-gray-900 px-4 sm:px-6 relative overflow-hidden"
      >
        {/* Efeitos de fundo */}
        <div className="absolute inset-0 futuristic-grid opacity-20"></div>
        <div className="absolute top-0 left-0 w-96 h-96 bg-teal-500 rounded-full filter blur-3xl opacity-10"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-emerald-500 rounded-full filter blur-3xl opacity-10"></div>
        
        <div className="max-w-7xl mx-auto relative z-10">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-extrabold mb-16 text-center"
          >
            <span className="bg-gradient-to-r from-teal-400 to-emerald-400 bg-clip-text text-transparent neon-text">
              Meus Projetos
            </span>
          </motion.h2>
          
          {/* Timeline 3D - Mostrar apenas em telas grandes */}
          <div className="hidden lg:block">
            <Timeline3D projects={filteredProjects} />
          </div>
          
          {/* Carrossel para mobile/tablet */}
          <div className="lg:hidden">
            {/* Filtros futuristas */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="flex justify-center mb-16"
            >
              <div className="inline-flex bg-gray-800/50 backdrop-blur-md rounded-full p-1 border border-teal-500/50 shadow-xl">
                {["all", "web", "mobile"].map((filter) => (
                  <motion.button
                    key={filter}
                    onClick={() => setActiveFilter(filter)}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className={`px-6 py-3 text-sm font-bold rounded-full transition-all ${
                      activeFilter === filter
                        ? "bg-gradient-to-r from-teal-500 to-emerald-500 text-white shadow-lg shadow-teal-500/50"
                        : "text-gray-400 hover:text-white hover:bg-gray-700/50"
                    }`}
                    aria-label={`Filtrar projetos por ${
                      filter === "all"
                        ? "todos"
                        : filter === "web"
                        ? "web"
                        : "mobile"
                    }`}
                  >
                    {filter === "all"
                      ? "🌐 Todos"
                      : filter === "web"
                      ? "💻 Web"
                      : "📱 Mobile"}
                  </motion.button>
                ))}
              </div>
            </motion.div>

            {/* Carrossel para visualização alternativa */}
            <div className="px-2">
            <Slider {...sliderSettings}>
              {filteredProjects.map((project) => (
                <div key={project.id} className="px-2 outline-none">
                  <motion.div
                    className="group bg-white dark:bg-gray-700 rounded-2xl shadow-xl overflow-hidden border border-gray-100 dark:border-gray-600 mx-auto max-w-md relative backdrop-blur-sm"
                    whileHover={{ y: -10, scale: 1.02 }}
                    data-category={project.category}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                  >
                    {/* Efeito de brilho no hover */}
                    <div className="absolute inset-0 bg-gradient-to-r from-teal-500/0 via-teal-500/10 to-teal-500/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10" />
                    
                    {/* Badge de categoria */}
                    <div className="absolute top-4 right-4 z-20">
                      <span className="px-3 py-1 bg-gradient-to-r from-teal-500 to-emerald-500 text-white text-xs font-bold rounded-full shadow-lg backdrop-blur-sm">
                        {project.category === "mobile" ? "📱 Mobile" : "🌐 Web"}
                      </span>
                    </div>
                    <motion.div
                      className={`
                      relative overflow-hidden 
                      ${
                        project.category === "mobile"
                          ? "pt-[100%] bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-900"
                          : "pt-[56.25%] bg-gradient-to-br from-gray-200 to-gray-300 dark:from-gray-600 dark:to-gray-700"
                      }
                    `}
                      whileHover={{ scale: 1.05 }}
                      transition={{ duration: 0.3 }}
                    >
                      <img
                        src={project.image}
                        alt={project.title}
                        className={`
                          absolute top-0 left-0 w-full h-full 
                          ${
                            project.category === "mobile"
                              ? "object-contain p-6"
                              : "object-cover"
                          }
                          transition-transform duration-500 group-hover:scale-110
                        `}
                        loading="lazy"
                      />
                      {/* Overlay no hover */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    </motion.div>
                    <div className="p-6">
                      <motion.h3 
                        className="text-2xl font-bold mb-3 text-gray-900 dark:text-white bg-gradient-to-r from-teal-600 to-emerald-600 dark:from-teal-400 dark:to-emerald-400 bg-clip-text text-transparent"
                        whileHover={{ x: 5 }}
                      >
                        {project.title}
                      </motion.h3>
                      <p className="text-gray-600 dark:text-gray-300 mb-6 leading-relaxed">
                        {project.description}
                      </p>

                      <div className="mb-4">
                        <h4 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">
                          Principais recursos:
                        </h4>
                        <ul className="list-disc list-inside text-sm text-gray-700 dark:text-gray-300 space-y-1">
                          {project.features.map((feature, i) => (
                            <li key={i}>{feature}</li>
                          ))}
                        </ul>
                      </div>

                      <div className="mb-4">
                        <h4 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">
                          Desafios:
                        </h4>
                        <p className="text-sm text-gray-700 dark:text-gray-300">
                          {project.challenges}
                        </p>
                      </div>

                      <div className="flex flex-wrap gap-2 mb-6">
                        {project.tags.map((tag, i) => (
                          <motion.span
                            key={tag}
                            initial={{ opacity: 0, scale: 0 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ delay: i * 0.1 }}
                            whileHover={{ scale: 1.1, y: -2 }}
                            className="text-xs bg-gradient-to-r from-teal-100 to-emerald-100 dark:from-teal-900/50 dark:to-emerald-900/50 text-teal-700 dark:text-teal-300 px-3 py-1.5 rounded-full font-medium border border-teal-200 dark:border-teal-800"
                          >
                            {tag}
                          </motion.span>
                        ))}
                      </div>
                      
                      {/* Métricas com ícone */}
                      <div className="mb-6 p-4 bg-gradient-to-r from-teal-50 to-emerald-50 dark:from-teal-900/20 dark:to-emerald-900/20 rounded-xl border border-teal-200 dark:border-teal-800">
                        <div className="flex items-center gap-2">
                          <FiTrendingUp className="text-teal-600 dark:text-teal-400" />
                          <span className="text-sm text-teal-700 dark:text-teal-300 font-semibold">
                            {project.metrics}
                          </span>
                        </div>
                      </div>
                      
                      <div className="flex items-center justify-between gap-4">
                        <motion.a
                          href={project.links.demo}
                          whileHover={{ scale: 1.05, y: -2 }}
                          whileTap={{ scale: 0.95 }}
                          className="flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-gradient-to-r from-teal-600 to-emerald-600 text-white rounded-xl font-semibold hover:shadow-lg hover:shadow-teal-500/50 transition-all group"
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <FiExternalLink className="group-hover:rotate-45 transition-transform" />
                          <span>Demo</span>
                        </motion.a>
                        <motion.a
                          href={project.links.code}
                          whileHover={{ scale: 1.05, y: -2 }}
                          whileTap={{ scale: 0.95 }}
                          className="flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded-xl font-semibold hover:bg-gray-200 dark:hover:bg-gray-700 transition-all group border border-gray-200 dark:border-gray-700"
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <FiGithub className="group-hover:scale-110 transition-transform" />
                          <span>Código</span>
                        </motion.a>
                      </div>
                    </div>
                  </motion.div>
                </div>
              ))}
            </Slider>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section - Melhorado */}
      <section className="py-20 bg-gradient-to-b from-white to-gray-50 dark:from-gray-900 dark:to-gray-800 px-6 relative overflow-hidden">
        {/* Decoração de fundo */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-teal-500 rounded-full filter blur-3xl opacity-5 -z-10"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-emerald-500 rounded-full filter blur-3xl opacity-5 -z-10"></div>
        
        <div className="max-w-6xl mx-auto relative z-10">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-extrabold mb-16 text-center"
          >
            <span className="relative inline-block">
              <span className="relative z-10 bg-gradient-to-r from-teal-600 to-emerald-600 dark:from-teal-400 dark:to-emerald-400 bg-clip-text text-transparent">
                Depoimentos
              </span>
              <span className="absolute bottom-2 left-0 w-full h-4 bg-teal-200/40 dark:bg-teal-800/40 z-0 rounded-full"></span>
            </span>
          </motion.h2>

          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30, scale: 0.9 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ delay: i * 0.15, duration: 0.5 }}
                viewport={{ once: true }}
                whileHover={{ y: -10, scale: 1.02 }}
                className="group bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-lg hover:shadow-2xl transition-all border border-gray-100 dark:border-gray-700 relative overflow-hidden backdrop-blur-sm"
              >
                {/* Efeito de brilho no hover */}
                <div className="absolute inset-0 bg-gradient-to-r from-teal-500/0 via-teal-500/5 to-teal-500/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                
                {/* Aspas decorativas */}
                <div className="absolute top-4 left-4 text-6xl text-teal-500/20 dark:text-teal-400/20 font-serif">"</div>
                <div className="relative z-10">
                  <div className="flex items-center mb-6">
                    <motion.div
                      whileHover={{ scale: 1.1, rotate: 5 }}
                      className="w-16 h-16 rounded-full bg-gradient-to-br from-teal-400 to-emerald-500 dark:from-teal-600 dark:to-emerald-700 flex items-center justify-center text-white font-bold mr-4 overflow-hidden shadow-lg ring-4 ring-teal-100 dark:ring-teal-900/50"
                    >
                      {testimonial.avatar ? (
                        <img
                          src={testimonial.avatar}
                          alt={testimonial.author}
                          className="w-full h-full object-cover"
                          loading="lazy"
                        />
                      ) : (
                        testimonial.author.charAt(0)
                      )}
                    </motion.div>
                    <div>
                      <p className="font-bold text-lg text-gray-800 dark:text-white">
                        {testimonial.author}
                      </p>
                      <p className="text-sm text-teal-600 dark:text-teal-400 font-medium">
                        {testimonial.role}
                      </p>
                    </div>
                  </div>
                  
                  <p className="italic text-gray-700 dark:text-gray-300 text-lg leading-relaxed mb-6 relative z-10 pl-4 border-l-4 border-teal-500/30">
                    {testimonial.quote}
                  </p>
                  
                  <div className="flex items-center gap-1">
                    {[...Array(5)].map((_, i) => (
                      <motion.svg
                        key={i}
                        initial={{ opacity: 0, scale: 0 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: i * 0.1 }}
                        whileHover={{ scale: 1.2, rotate: 15 }}
                        className="w-6 h-6 text-amber-400"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </motion.svg>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section - Futurista */}
      <section
        id="contato"
        className="py-20 bg-gradient-to-b from-gray-900 via-black to-gray-900 px-6 relative overflow-hidden"
      >
        {/* Efeitos de fundo */}
        <div className="absolute inset-0 futuristic-grid opacity-10"></div>
        <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-500 rounded-full filter blur-3xl opacity-10"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-teal-500 rounded-full filter blur-3xl opacity-10"></div>
        
        <div className="max-w-6xl mx-auto relative z-10">
          <motion.h2
            variants={itemVariant}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="text-4xl md:text-5xl lg:text-6xl font-extrabold mb-12 md:mb-16 text-center"
          >
            <span className="relative inline-block">
              <span className="relative z-10 bg-gradient-to-r from-teal-400 to-emerald-400 bg-clip-text text-transparent neon-text">
                Vamos Conversar
              </span>
              <span className="absolute bottom-2 left-0 w-full h-4 bg-teal-500/20 z-0 rounded-full blur-xl"></span>
            </span>
          </motion.h2>

          <motion.div
            variants={sectionVariant}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid md:grid-cols-2 gap-12 md:gap-16"
          >
            <div>
              <motion.h3
                variants={itemVariant}
                className="text-2xl md:text-3xl font-bold mb-4 bg-gradient-to-r from-teal-400 to-emerald-400 bg-clip-text text-transparent"
              >
                Pronto para começar seu projeto?
              </motion.h3>

              <motion.p
                variants={itemVariant}
                className="text-lg leading-relaxed text-gray-300 mb-8"
              >
                Estou disponível para oportunidades de freelance e colaborações.
                Se você tem uma ideia ou projeto em mente, ou simplesmente quer
                bater um papo, sinta-se à vontade para entrar em contato.
              </motion.p>

              <motion.div variants={itemVariant} className="space-y-4">
                <div className="flex items-start">
                  <div className="bg-teal-100 dark:bg-teal-900/30 p-3 rounded-full mr-4 flex-shrink-0">
                    <FiMail className="text-teal-600 dark:text-teal-400 text-xl" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      Email
                    </p>
                    <a
                      href="mailto:contato.juniormorales@gmail.com"
                      className="text-lg font-medium hover:text-teal-600 dark:hover:text-teal-400 transition-colors text-gray-700 dark:text-gray-300"
                    >
                      contato.juniormorales@gmail.com
                    </a>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="bg-teal-100 dark:bg-teal-900/30 p-3 rounded-full mr-4 flex-shrink-0">
                    <FiLinkedin className="text-teal-600 dark:text-teal-400 text-xl" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      LinkedIn
                    </p>
                    <a
                      href="https://www.linkedin.com/in/emerson-morales-junior-6469b8231/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-lg font-medium hover:text-teal-600 dark:hover:text-teal-400 transition-colors text-gray-700 dark:text-gray-300"
                    >
                      Emerson Morales Junior
                    </a>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="bg-teal-100 dark:bg-teal-900/30 p-3 rounded-full mr-4 flex-shrink-0">
                    <FiGithub className="text-teal-600 dark:text-teal-400 text-xl" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      GitHub
                    </p>
                    <a
                      href="https://github.com/emersonjrdev"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-lg font-medium hover:text-teal-600 dark:hover:text-teal-400 transition-colors text-gray-700 dark:text-gray-300"
                    >
                      emersonjrdev
                    </a>
                  </div>
                </div>
              </motion.div>
            </div>

            <motion.form
              variants={itemVariant}
              className="bg-gradient-to-br from-gray-800/90 to-gray-900/90 p-6 md:p-8 rounded-2xl shadow-2xl border-2 border-teal-500/50 relative overflow-hidden backdrop-blur-md hologram-scan"
              onSubmit={handleSubmit}
              ref={formRef}
            >
              {/* Efeito de fundo decorativo */}
              <div className="absolute top-0 right-0 w-64 h-64 bg-teal-500 rounded-full filter blur-3xl opacity-10 -z-10"></div>
              <div className="absolute bottom-0 left-0 w-64 h-64 bg-emerald-500 rounded-full filter blur-3xl opacity-10 -z-10"></div>
              
              {/* Linhas de scan */}
              <div className="absolute inset-0 opacity-20">
                <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-teal-400 to-transparent"></div>
                <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-emerald-400 to-transparent"></div>
              </div>
              
              <div className="relative z-10">
              <div className="mb-6">
                <label
                  htmlFor="name"
                  className="block text-gray-300 mb-2 font-medium"
                >
                  Nome
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <FiUser className="text-gray-400" />
                  </div>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    required
                    value={formData.name}
                    onChange={handleChange}
                    className={`w-full pl-10 pr-4 py-3 border-2 ${
                      formErrors.name
                        ? "border-red-500"
                        : "border-teal-500/50"
                    } rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 outline-none transition bg-gray-800/50 text-gray-300 placeholder-gray-500`}
                    placeholder="Seu nome completo"
                    aria-describedby={
                      formErrors.name ? "name-error" : undefined
                    }
                  />
                </div>
                {formErrors.name && (
                  <p id="name-error" className="text-red-500 text-sm mt-1">
                    {formErrors.name}
                  </p>
                )}
              </div>

              <div className="mb-6">
                <label
                  htmlFor="email"
                  className="block text-gray-300 mb-2 font-medium"
                >
                  Email
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <FiMail className="text-gray-400" />
                  </div>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    className={`w-full pl-10 pr-4 py-3 border-2 ${
                      formErrors.email
                        ? "border-red-500"
                        : "border-teal-500/50"
                    } rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 outline-none transition bg-gray-800/50 text-gray-300 placeholder-gray-500`}
                    placeholder="seu@email.com"
                    aria-describedby={
                      formErrors.email ? "email-error" : undefined
                    }
                  />
                </div>
                {formErrors.email && (
                  <p id="email-error" className="text-red-500 text-sm mt-1">
                    {formErrors.email}
                  </p>
                )}
              </div>

              <div className="mb-6">
                <label
                  htmlFor="message"
                  className="block text-gray-300 mb-2 font-medium"
                >
                  Mensagem
                </label>
                <div className="relative">
                  <div className="absolute top-3 left-3">
                    <FiMessageSquare className="text-gray-400" />
                  </div>
                  <textarea
                    id="message"
                    name="message"
                    required
                    rows="5"
                    value={formData.message}
                    onChange={handleChange}
                    className={`w-full pl-10 pr-4 py-3 border-2 ${
                      formErrors.message
                        ? "border-red-500"
                        : "border-teal-500/50"
                    } rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 outline-none transition bg-gray-800/50 text-gray-300 placeholder-gray-500`}
                    placeholder="Conte-me sobre seu projeto..."
                    aria-describedby={
                      formErrors.message ? "message-error" : undefined
                    }
                  ></textarea>
                </div>
                {formErrors.message && (
                  <p id="message-error" className="text-red-500 text-sm mt-1">
                    {formErrors.message}
                  </p>
                )}
              </div>

              <motion.button
                type="submit"
                disabled={isSubmitting}
                whileHover={{ scale: isSubmitting ? 1 : 1.05, y: -2 }}
                whileTap={{ scale: 0.98 }}
                className="w-full bg-gradient-to-r from-teal-600 to-emerald-600 text-white py-4 px-6 rounded-xl font-bold hover:shadow-xl hover:shadow-teal-500/50 transition-all relative overflow-hidden group disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <span className="relative z-10 flex items-center justify-center gap-2">
                  {isSubmitting ? (
                    <>
                      <FiLoader className="animate-spin" />
                      Enviando...
                    </>
                  ) : (
                    <>
                      Enviar Mensagem
                      <motion.span
                        animate={{ x: [0, 5, 0] }}
                        transition={{ repeat: Infinity, duration: 1.5 }}
                      >
                        →
                      </motion.span>
                    </>
                  )}
                </span>
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-emerald-600 to-teal-600"
                  initial={{ x: "-100%" }}
                  whileHover={{ x: 0 }}
                  transition={{ duration: 0.3 }}
                />
              </motion.button>
              </div>
            </motion.form>
          </motion.div>
        </div>
      </section>

      {/* Footer - Futurista */}
      <footer className="bg-gradient-to-br from-gray-900 via-black to-gray-900 text-white py-16 relative overflow-hidden border-t-2 border-teal-500/50">
        {/* Efeitos de fundo */}
        <div className="absolute inset-0 futuristic-grid opacity-10"></div>
        <div className="absolute top-0 left-0 w-96 h-96 bg-teal-500 rounded-full filter blur-3xl opacity-10"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-emerald-500 rounded-full filter blur-3xl opacity-10"></div>
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{
            backgroundImage: `radial-gradient(circle at 2px 2px, white 1px, transparent 0)`,
            backgroundSize: '50px 50px'
          }}></div>
        </div>
        
        <div className="max-w-6xl mx-auto px-6 relative z-10">
          <div className="flex flex-col md:flex-row justify-between items-center gap-8 mb-12">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="text-center md:text-left"
            >
              <h3 className="text-3xl md:text-4xl font-extrabold mb-6 bg-gradient-to-r from-white to-amber-200 bg-clip-text text-transparent">
                Pronto para transformar sua ideia em realidade?
              </h3>
              <motion.a
                href="#contato"
                whileHover={{ scale: 1.1, y: -3 }}
                whileTap={{ scale: 0.95 }}
                className="group inline-flex items-center gap-2 bg-gradient-to-r from-white to-amber-50 text-teal-900 px-8 py-4 rounded-full font-bold shadow-2xl hover:shadow-amber-500/50 transition-all relative overflow-hidden"
              >
                <span className="relative z-10">Vamos Conversar</span>
                <motion.span
                  className="relative z-10"
                  animate={{ x: [0, 5, 0] }}
                  transition={{ repeat: Infinity, duration: 1.5 }}
                >
                  →
                </motion.span>
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-amber-400 to-yellow-400"
                  initial={{ x: "-100%" }}
                  whileHover={{ x: 0 }}
                  transition={{ duration: 0.3 }}
                />
              </motion.a>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="flex gap-4"
            >
              {[
                {
                  icon: <FiLinkedin size={28} />,
                  url: "https://www.linkedin.com/in/emerson-morales-junior-6469b8231/",
                  label: "LinkedIn",
                  color: "from-blue-500 to-blue-600",
                },
                {
                  icon: <FiInstagram size={28} />,
                  url: "https://www.instagram.com/emersxn_jr",
                  label: "Instagram",
                  color: "from-pink-500 to-purple-600",
                },
                {
                  icon: <FiGithub size={28} />,
                  url: "https://github.com/emersonjrdev",
                  label: "GitHub",
                  color: "from-gray-700 to-gray-900",
                },
              ].map((social, index) => (
                <motion.a
                  key={index}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ y: -8, scale: 1.15, rotate: 5 }}
                  whileTap={{ scale: 0.9 }}
                  className="group relative p-4 bg-white/10 backdrop-blur-md rounded-full border border-white/20 hover:border-white/40 transition-all"
                  aria-label={social.label}
                >
                  <div className="relative z-10 text-white group-hover:text-amber-300 transition-colors">
                    {social.icon}
                  </div>
                  <motion.div
                    className={`absolute inset-0 bg-gradient-to-r ${social.color} rounded-full opacity-0 group-hover:opacity-100 transition-opacity`}
                    initial={{ scale: 0 }}
                    whileHover={{ scale: 1 }}
                    transition={{ duration: 0.3 }}
                  />
                </motion.a>
              ))}
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="border-t border-white/20 w-full pt-8 text-center"
          >
            <p className="text-xl mb-3 font-semibold">Vamos criar algo incrível juntos! 🚀</p>
            <p className="text-sm opacity-80">
              © {new Date().getFullYear()} Emerson Morales Junior. Todos os
              direitos reservados.
            </p>
          </motion.div>
        </div>
      </footer>

      {/* Back to Top Button - Melhorado */}
      <AnimatePresence>
        {showTopBtn && (
          <motion.button
            onClick={scrollToTop}
            aria-label="Voltar ao topo"
            initial={{ opacity: 0, scale: 0, rotate: -180 }}
            animate={{ opacity: 1, scale: 1, rotate: 0 }}
            exit={{ opacity: 0, scale: 0, rotate: 180 }}
            whileHover={{ scale: 1.15, y: -5, rotate: 360 }}
            whileTap={{ scale: 0.9 }}
            className="fixed bottom-8 right-8 bg-gradient-to-r from-teal-600 to-emerald-600 text-white p-4 rounded-full shadow-2xl hover:shadow-teal-500/50 transition-all z-40 group relative overflow-hidden"
          >
            {/* Efeito de brilho no hover */}
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/30 to-white/0"
              initial={{ x: "-100%" }}
              whileHover={{ x: "100%" }}
              transition={{ duration: 0.6 }}
            />
            <FiArrowUp size={24} className="relative z-10" />
            
            {/* Indicador de progresso circular */}
            <svg
              className="absolute inset-0 w-full h-full transform -rotate-90"
              viewBox="0 0 100 100"
            >
              <circle
                cx="50"
                cy="50"
                r="45"
                fill="none"
                stroke="rgba(255,255,255,0.3)"
                strokeWidth="4"
              />
              <motion.circle
                cx="50"
                cy="50"
                r="45"
                fill="none"
                stroke="white"
                strokeWidth="4"
                strokeLinecap="round"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: scrollProgress / 100 }}
                transition={{ duration: 0.1 }}
              />
            </svg>
          </motion.button>
        )}
      </AnimatePresence>
    </div>
  );
}
