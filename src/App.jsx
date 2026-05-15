import React, { useState, useEffect, useRef, lazy, Suspense } from "react";
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
import Terminal from "./components/Terminal";
import HologramCard from "./components/HologramCard";
import MagicLoader from "./components/MagicLoader";

// Lazy loading de componentes pesados
const Scene3D = lazy(() => import("./components/Scene3D"));
const Timeline3D = lazy(() => import("./components/Timeline3D"));

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
  const heroRef = useRef(null);
  const { scrollYProgress } = useScroll();
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);

  // Simular loading com loader futurista
  useEffect(() => {
    // O loader gerencia seu próprio tempo
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
        value: "#a78bfa",
      },
      links: {
        color: "#818cf8",
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
        "Sistema em produção para aproximar freelancers e empresas: perfis, vagas e fluxo pensado para uso real no dia a dia.",
      tags: ["React", "Node.js", "MySQL", "Tailwind"],
      category: "web",
      image: "/connect.png",
      links: {
        demo: "https://connectwork.site",
        code: "https://github.com/emersonjrdev",
      },
      metrics: "Publicado em connectwork.site",
      features: ["Área logada", "Fluxo de vagas e cadastro"],
      challenges: "Alinhar UX para dois públicos distintos (talentos e empresas)",
    },
    {
      id: 2,
      title: "Este portfólio",
      description:
        "Site pessoal com modo claro/escuro, animações e seções interativas — o mesmo código deste repositório.",
      tags: ["React", "Tailwind CSS", "Framer Motion", "Vite"],
      category: "web",
      image: "/Portfolio1.png",
      links: {
        demo: "https://emersondev.vercel.app",
        code: "https://github.com/emersonjrdev/Portfolio",
      },
      metrics: "Deploy na Vercel · código aberto no GitHub",
      features: ["Responsivo", "Tema claro/escuro", "Formulário de contato"],
      challenges: "Equilibrar efeitos visuais e desempenho em dispositivos variados",
    },
    {
      id: 3,
      title: "ConnectWork (mobile)",
      description:
        "Experiência mobile complementar à plataforma web; evolução contínua junto ao produto principal.",
      tags: ["React Native", "Node.js", "MySQL"],
      category: "mobile",
      image: "/Mobile.png",
      links: {
        demo: null,
        code: "https://github.com/emersonjrdev",
      },
      metrics: "Demo pública do app: em definição (acompanhe no GitHub)",
      features: ["Integração com a mesma API do web", "Foco em usabilidade em tela pequena"],
      challenges: "Manter paridade de recursos com a versão web de forma sustentável",
    },
  ];


  const filteredProjects =
    activeFilter === "all"
      ? projects
      : projects.filter((project) => project.category === activeFilter);

  // Loading Screen Mágico
  if (isLoading) {
    return <MagicLoader onComplete={() => setIsLoading(false)} />;
  }

  return (
    <div
      className={`min-h-screen font-sans selection:bg-violet-500/40 selection:text-white ${
        darkMode ? "dark bg-slate-950 text-gray-100" : "bg-slate-50 text-gray-900"
      } transition-colors duration-300 overflow-x-hidden relative`}
    >
      {/* Partículas de fundo - Desabilitado em mobile */}
      <div className="hidden lg:block fixed inset-0 z-0 pointer-events-none">
        <Particles
          id="tsparticles"
          init={particlesInit}
          options={{
            ...particlesOptions,
            particles: {
              ...particlesOptions.particles,
              number: {
                ...particlesOptions.particles.number,
                value: 30, // Reduzido de 50 para 30
              },
            },
          }}
          className="w-full h-full"
        />
      </div>

      {/* Cursor personalizado */}
      <motion.div
        className="fixed top-0 left-0 w-6 h-6 bg-violet-500 rounded-full pointer-events-none z-[100] mix-blend-difference"
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

      {/* Scroll progress bar mágico */}
      <motion.div
        className="fixed top-0 left-0 h-1 bg-gradient-to-r from-violet-500 via-fuchsia-500 to-cyan-400 z-50 shadow-lg"
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
            ? "bg-white/10 text-violet-300"
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
            className="fixed inset-0 bg-gradient-to-br from-slate-950 via-violet-950 to-slate-900 z-40 flex flex-col items-center justify-center md:hidden"
          >
            <button
              onClick={toggleMenu}
              className="absolute top-8 right-8 z-50 p-2 text-white hover:text-violet-300 transition-colors"
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
                    <span className="relative z-10 capitalize group-hover:text-violet-300 transition-colors">
                      {item}
                    </span>
                    <motion.span
                      className="absolute bottom-0 left-0 w-full h-0.5 bg-violet-400"
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
                    className="text-white hover:text-violet-300 transition-colors p-2 rounded-full hover:bg-white/10"
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
        className="relative bg-gradient-to-br from-slate-950 via-indigo-950 to-slate-900 flex flex-col md:flex-row items-center text-white pt-24 pb-16 px-6 md:px-12 lg:px-24 min-h-screen overflow-hidden"
      >
        {/* Cena 3D de fundo - Ocultar em mobile e tablets para performance */}
        <div className="hidden lg:block absolute inset-0 z-0 opacity-20">
          <Suspense fallback={null}>
            <Scene3D />
          </Suspense>
        </div>
        {/* Efeito de gradiente animado */}
        <div className="absolute inset-0 bg-gradient-to-r from-violet-600/25 via-fuchsia-600/15 to-cyan-600/20 animate-gradient-xy"></div>
        
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
                className="absolute bottom-0 left-0 w-full h-full bg-gradient-to-r from-violet-500 to-fuchsia-500 rounded-full"
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
            className="absolute -bottom-2 -right-2 bg-gradient-to-r from-violet-500 to-fuchsia-500 text-white px-4 py-2 rounded-full text-xs font-semibold shadow-xl backdrop-blur-sm"
          >
            <span className="flex items-center gap-1">
              <motion.span
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ repeat: Infinity, duration: 1 }}
              >
                ✨
              </motion.span>
              Disponível para projetos
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
                <FiCode className="text-violet-300" />
              </motion.span>
              <span className="text-sm font-medium tracking-wide">Full stack · Web &amp; mobile</span>
            </motion.div>

            <div className="relative font-display">
              <TypeAnimation
                sequence={[
                  "Emerson Morales Jr",
                  1000,
                  "Desenvolvedor Full Stack",
                  1000,
                  "Front-end com React",
                  1000,
                  "APIs com Node.js",
                  1000,
                ]}
                wrapper="h1"
                cursor={true}
                repeat={Infinity}
                style={{ display: "inline-block" }}
                className="text-5xl md:text-6xl lg:text-7xl font-extrabold leading-tight mb-4 bg-gradient-to-r from-violet-300 via-fuchsia-200 to-cyan-300 bg-clip-text text-transparent bg-[length:200%_auto] animate-gradient relative z-10"
                deletionSpeed={70}
              />
              <div className="absolute inset-0 text-5xl md:text-6xl lg:text-7xl font-extrabold bg-gradient-to-r from-violet-400 via-fuchsia-300 to-cyan-300 bg-clip-text text-transparent blur-xl opacity-40 pointer-events-none" style={{ zIndex: 0 }}>
                <TypeAnimation
                  sequence={[
                    "Emerson Morales Jr",
                    1000,
                    "Desenvolvedor Full Stack",
                    1000,
                    "Front-end com React",
                    1000,
                    "APIs com Node.js",
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
              className="text-lg md:text-xl lg:text-2xl text-slate-300 mb-8 max-w-xl md:max-w-none leading-relaxed"
            >
              Construo produtos web e mobile com{" "}
              <span className="text-white font-semibold">React</span>,{" "}
              <span className="text-white font-semibold">Node.js</span> e atenção a{" "}
              <span className="text-white font-semibold">UI/UX</span>
              . ConnectWork está no ar; este site é o meu laboratório visível.
            </motion.p>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8 }}
              className="flex flex-wrap justify-center md:justify-start gap-4"
            >
              <motion.a
                href="#projetos"
                whileHover={{ y: -5, scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="group inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-violet-500 to-fuchsia-500 text-white font-semibold rounded-full shadow-lg shadow-violet-500/25 hover:shadow-violet-500/40 transition-all"
              >
                <span>Ver projetos</span>
                <FiExternalLink className="opacity-90 group-hover:translate-x-0.5 transition-transform" size={18} />
              </motion.a>
              <motion.a
                href="#contato"
                whileHover={{ y: -5, scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="inline-flex items-center gap-2 px-8 py-4 border border-white/25 backdrop-blur-sm text-white font-semibold rounded-full hover:bg-white/10 transition-all"
              >
                <FiMail size={18} />
                <span>Falar comigo</span>
              </motion.a>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1 }}
              className="flex flex-wrap justify-center md:justify-start gap-4 mt-12"
            >
              {[
                { emoji: "🌐", title: "ConnectWork", subtitle: "connectwork.site" },
                { emoji: "⚡", title: "Stack", subtitle: "React · Node · TS" },
                { emoji: "🛠️", title: "Freelance", subtitle: "Projetos sob medida" },
              ].map((stat, i) => (
                <motion.div
                  key={stat.title}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 1 + i * 0.08 }}
                  whileHover={{ scale: 1.03, y: -4 }}
                  className="text-left p-4 pr-6 bg-white/5 backdrop-blur-md rounded-2xl border border-white/10 min-w-[10rem]"
                >
                  <div className="text-2xl mb-1">{stat.emoji}</div>
                  <div className="text-sm font-semibold text-white">{stat.title}</div>
                  <div className="text-xs text-slate-400 mt-0.5">{stat.subtitle}</div>
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

      {/* Sobre */}
      <section
        id="sobre"
        className="py-20 md:py-28 px-6 relative bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 overflow-hidden"
      >
        {/* Efeitos mágicos de fundo - Reduzido */}
        <div className="absolute inset-0 opacity-15">
          {[...Array(10)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute text-yellow-300"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                fontSize: `${Math.random() * 10 + 6}px`,
              }}
              animate={{
                opacity: [0, 0.6, 0],
                scale: [0, 1, 0],
              }}
              transition={{
                duration: 4 + Math.random() * 2,
                repeat: Infinity,
                delay: Math.random() * 4,
                ease: "easeInOut",
              }}
            >
              ✨
            </motion.div>
          ))}
        </div>
        <div className="absolute top-1/4 left-0 w-96 h-96 bg-yellow-500/20 rounded-full filter blur-3xl opacity-30"></div>
        <div className="absolute bottom-1/4 right-0 w-96 h-96 bg-amber-500/20 rounded-full filter blur-3xl opacity-30"></div>
        {/* Video Background - Desabilitado em mobile */}
        <div className="hidden lg:block absolute inset-0 overflow-hidden z-0">
          <div className="absolute inset-0 bg-gradient-to-br from-purple-900/70 to-amber-900/70 z-10"></div>
          <div className="absolute inset-0 w-full h-full">
            <ReactPlayer
              url="/coding-bg.mp4"
              playing={!isLoading}
              loop
              muted
              width="100%"
              height="100%"
              playsinline
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                width: "100%",
                height: "100%",
                objectFit: "cover",
                opacity: isVideoLoaded ? 0.2 : 0,
                transition: "opacity 1s ease",
              }}
              onReady={() => setIsVideoLoaded(true)}
              config={{
                file: {
                  attributes: {
                    style: {
                      objectFit: "cover",
                      width: "100%",
                      height: "100%",
                    },
                    preload: "metadata",
                  },
                },
              }}
            />
          </div>
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
            className="text-4xl md:text-5xl lg:text-6xl font-extrabold mb-16 md:mb-20 text-center font-display"
          >
            <span className="relative inline-block">
              <span className="relative z-10 bg-gradient-to-r from-violet-300 via-fuchsia-300 to-cyan-300 bg-clip-text text-transparent">
                Sobre mim
              </span>
              <span className="absolute bottom-2 left-0 w-full h-4 bg-violet-500/20 z-0 rounded-full blur-xl"></span>
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
                <h3 className="text-2xl md:text-3xl font-bold mb-6 md:mb-8 text-white flex items-center gap-2 font-display">
                  <span className="text-2xl text-violet-400">◇</span>
                  <span className="bg-gradient-to-r from-violet-300 to-fuchsia-300 bg-clip-text text-transparent">
                    Stack e ferramentas
                  </span>
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-4 md:gap-6">
                  {skills.map((skill, index) => (
                    <HologramCard
                      key={index}
                      title={skill.name}
                      description={`Uso ${skill.name} em projetos reais — do layout à integração com APIs.`}
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

      {/* Terminal Futurista */}
      <section className="py-20 bg-gradient-to-b from-black to-gray-900 px-6 relative">
        <div className="max-w-4xl mx-auto">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-extrabold mb-12 text-center"
          >
            <span className="bg-gradient-to-r from-violet-400 to-cyan-400 bg-clip-text text-transparent font-display">
              Terminal interativo
            </span>
          </motion.h2>
          <Terminal />
        </div>
      </section>

      {/* O que priorizo — sem números inventados */}
      <section className="py-16 bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 text-white relative overflow-hidden border-y border-white/5">
        <div className="absolute inset-0 opacity-[0.07]">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: `radial-gradient(circle at 2px 2px, white 1px, transparent 0)`,
              backgroundSize: "40px 40px",
            }}
          />
        </div>

        <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-3 gap-8 relative z-10">
          {[
            {
              title: "Produto no ar",
              body: "Deploy, domínio e iterações com base em feedback — como no ConnectWork (connectwork.site).",
              icon: <FiExternalLink size={28} />,
            },
            {
              title: "Código legível",
              body: "Estrutura clara e stack moderna para facilitar manutenção e evolução do sistema.",
              icon: <FiCode size={28} />,
            },
            {
              title: "Comunicação",
              body: "Alinhamento frequente em freelas e projetos para entregar o que foi combinado.",
              icon: <FiMessageSquare size={28} />,
            },
          ].map((item, index) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="p-8 rounded-2xl bg-white/[0.06] backdrop-blur-md border border-white/10 hover:border-violet-400/30 transition-colors"
            >
              <div className="text-violet-300 mb-4">{item.icon}</div>
              <h3 className="text-xl font-bold font-display mb-2">{item.title}</h3>
              <p className="text-slate-300 text-sm leading-relaxed">{item.body}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Projetos */}
      <section
        id="projetos"
        className="py-20 bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 px-4 sm:px-6 relative overflow-hidden"
      >
        {/* Efeitos mágicos de fundo - Reduzido */}
        <div className="absolute inset-0 opacity-15">
          {[...Array(8)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute text-yellow-300"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                fontSize: `${Math.random() * 8 + 5}px`,
              }}
              animate={{
                opacity: [0, 0.5, 0],
                scale: [0, 1, 0],
              }}
              transition={{
                duration: 5 + Math.random() * 2,
                repeat: Infinity,
                delay: Math.random() * 5,
                ease: "easeInOut",
              }}
            >
              ✨
            </motion.div>
          ))}
        </div>
        <div className="absolute top-0 left-0 w-96 h-96 bg-violet-600/20 rounded-full filter blur-3xl opacity-25" />
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-fuchsia-600/15 rounded-full filter blur-3xl opacity-25" />
        
        <div className="max-w-7xl mx-auto relative z-10">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-extrabold mb-16 text-center font-display"
          >
            <span className="bg-gradient-to-r from-violet-300 via-fuchsia-300 to-cyan-300 bg-clip-text text-transparent">
              Projetos em produção
            </span>
          </motion.h2>
          
          {/* Timeline 3D - Mostrar apenas em telas grandes */}
          <div className="hidden lg:block">
            <Suspense fallback={<div className="h-96 flex items-center justify-center text-violet-300">Carregando projetos…</div>}>
              <Timeline3D projects={filteredProjects} />
            </Suspense>
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
            <div className="inline-flex bg-slate-800/60 backdrop-blur-md rounded-full p-1 border border-white/10 shadow-xl">
              {["all", "web", "mobile"].map((filter) => (
                <motion.button
                  key={filter}
                  onClick={() => setActiveFilter(filter)}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className={`px-6 py-3 text-sm font-semibold rounded-full transition-all ${
                    activeFilter === filter
                      ? "bg-gradient-to-r from-violet-500 to-fuchsia-500 text-white shadow-lg shadow-violet-500/30"
                      : "text-slate-400 hover:text-white hover:bg-white/5"
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
                    ? "Todos"
                    : filter === "web"
                    ? "Web"
                    : "Mobile"}
                </motion.button>
              ))}
            </div>
            </motion.div>

            {/* Carrossel para visualização alternativa */}
            <div className="px-2">
            <Slider {...sliderSettings}>
              {filteredProjects.map((project) => {
                const demoUrl =
                  project.links?.demo &&
                  project.links.demo !== "#" &&
                  String(project.links.demo).trim() !== ""
                    ? project.links.demo
                    : null;
                return (
                <div key={project.id} className="px-2 outline-none">
                  <motion.div
                    className="group bg-slate-800/80 dark:bg-slate-800/90 rounded-2xl shadow-xl overflow-hidden border border-white/10 mx-auto max-w-md relative backdrop-blur-md"
                    whileHover={{ y: -8, scale: 1.01 }}
                    data-category={project.category}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-violet-500/0 via-fuchsia-500/10 to-cyan-500/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10" />
                    
                    <div className="absolute top-4 right-4 z-20">
                      <span className="px-3 py-1 bg-white/10 text-violet-200 text-xs font-semibold rounded-full border border-white/15 backdrop-blur-sm">
                        {project.category === "mobile" ? "Mobile" : "Web"}
                      </span>
                    </div>
                    <motion.div
                      className={`
                      relative overflow-hidden 
                      ${
                        project.category === "mobile"
                          ? "pt-[100%] bg-slate-900/50"
                          : "pt-[56.25%] bg-slate-900/40"
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
                        className="text-2xl font-bold mb-3 font-display bg-gradient-to-r from-violet-200 to-fuchsia-200 bg-clip-text text-transparent"
                        whileHover={{ x: 4 }}
                      >
                        {project.title}
                      </motion.h3>
                      <p className="text-slate-300 mb-6 leading-relaxed text-sm md:text-base">
                        {project.description}
                      </p>

                      <div className="mb-4">
                        <h4 className="text-sm font-medium text-slate-500 mb-1">
                          Destaques
                        </h4>
                        <ul className="list-disc list-inside text-sm text-slate-300 space-y-1">
                          {project.features.map((feature, i) => (
                            <li key={i}>{feature}</li>
                          ))}
                        </ul>
                      </div>

                      <div className="mb-4">
                        <h4 className="text-sm font-medium text-slate-500 mb-1">
                          Desafio principal
                        </h4>
                        <p className="text-sm text-slate-300">
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
                            whileHover={{ scale: 1.05, y: -2 }}
                            className="text-xs bg-violet-500/15 text-violet-200 px-3 py-1.5 rounded-full font-medium border border-violet-500/30"
                          >
                            {tag}
                          </motion.span>
                        ))}
                      </div>
                      
                      <div className="mb-6 p-4 rounded-xl border border-white/10 bg-white/5">
                        <div className="flex items-start gap-2">
                          <FiExternalLink className="text-violet-300 shrink-0 mt-0.5" />
                          <span className="text-sm text-slate-200 leading-relaxed">
                            {project.metrics}
                          </span>
                        </div>
                      </div>
                      
                      <div className={`flex gap-3 ${demoUrl ? "flex-col sm:flex-row" : ""}`}>
                        {demoUrl && (
                        <motion.a
                          href={demoUrl}
                          whileHover={{ scale: 1.02, y: -2 }}
                          whileTap={{ scale: 0.98 }}
                          className="flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-gradient-to-r from-violet-500 to-fuchsia-500 text-white rounded-xl font-semibold hover:shadow-lg hover:shadow-violet-500/25 transition-all"
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <FiExternalLink />
                          <span>Abrir site</span>
                        </motion.a>
                        )}
                        <motion.a
                          href={project.links.code}
                          whileHover={{ scale: 1.02, y: -2 }}
                          whileTap={{ scale: 0.98 }}
                          className={`flex items-center justify-center gap-2 px-4 py-3 bg-slate-900/80 text-white rounded-xl font-semibold hover:bg-slate-900 transition-all border border-white/10 ${demoUrl ? "flex-1" : "w-full"}`}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <FiGithub />
                          <span>Ver no GitHub</span>
                        </motion.a>
                      </div>
                    </div>
                  </motion.div>
                </div>
              );})}
            </Slider>
            </div>
          </div>
        </div>
      </section>

      {/* Forma de trabalho */}
      <section className="py-20 bg-gradient-to-b from-slate-950 to-slate-900 px-6 relative overflow-hidden border-t border-white/5">
        <div className="max-w-6xl mx-auto relative z-10">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl md:text-5xl font-extrabold mb-4 text-center font-display"
          >
            <span className="bg-gradient-to-r from-violet-300 to-cyan-300 bg-clip-text text-transparent">
              Como costumo entregar
            </span>
          </motion.h2>
          <p className="text-center text-slate-400 max-w-2xl mx-auto mb-14 text-sm md:text-base">
            Processo transparente — sem promessas de porcentagem que não posso comprovar aqui.
          </p>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { icon: "🎯", title: "Escopo claro", desc: "Requisitos e prioridades alinhados antes de codar." },
              { icon: "🧩", title: "Integração", desc: "Front, API e banco conversando de ponta a ponta." },
              { icon: "📱", title: "Responsivo", desc: "Layout que funciona no desktop e no celular." },
              { icon: "🚀", title: "Deploy", desc: "Coloco no ar e documento o que importa para manter." },
            ].map((item, i) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                whileHover={{ y: -6 }}
                className="bg-white/[0.04] backdrop-blur-md p-6 rounded-2xl border border-white/10 hover:border-violet-500/30 transition-colors"
              >
                <div className="text-4xl mb-3">{item.icon}</div>
                <h3 className="text-lg font-bold text-white font-display mb-2">{item.title}</h3>
                <p className="text-slate-400 text-sm leading-relaxed">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Contato */}
      <section
        id="contato"
        className="py-20 bg-gradient-to-b from-slate-900 to-slate-950 px-6 relative overflow-hidden border-t border-white/5"
      >
        {/* Efeitos mágicos - Reduzido */}
        <div className="absolute inset-0 opacity-15">
          {[...Array(10)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute text-yellow-300"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                fontSize: `${Math.random() * 8 + 5}px`,
              }}
              animate={{
                opacity: [0, 0.5, 0],
                scale: [0, 1, 0],
              }}
              transition={{
                duration: 5 + Math.random() * 2,
                repeat: Infinity,
                delay: Math.random() * 5,
                ease: "easeInOut",
              }}
            >
              ✨
            </motion.div>
          ))}
        </div>
        <div className="absolute top-0 right-0 w-96 h-96 bg-yellow-500/20 rounded-full filter blur-3xl opacity-30"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-amber-500/20 rounded-full filter blur-3xl opacity-30"></div>
        
        <div className="max-w-6xl mx-auto relative z-10">
          <motion.h2
            variants={itemVariant}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="text-4xl md:text-5xl lg:text-6xl font-extrabold mb-12 md:mb-16 text-center"
          >
            <span className="relative inline-block">
              <span className="relative z-10 bg-gradient-to-r from-violet-300 via-fuchsia-300 to-cyan-300 bg-clip-text text-transparent font-display">
                Contato
              </span>
              <span className="absolute bottom-2 left-0 w-full h-4 bg-violet-500/20 z-0 rounded-full blur-xl"></span>
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
                className="text-2xl md:text-3xl font-bold mb-4 font-display bg-gradient-to-r from-violet-300 to-fuchsia-300 bg-clip-text text-transparent"
              >
                Vamos conversar?
              </motion.h3>

              <motion.p
                variants={itemVariant}
                className="text-lg leading-relaxed text-slate-400 mb-8"
              >
                Estou aberto a freelas e colaborações. Se quiser falar sobre o ConnectWork,
                sobre este portfólio ou um novo projeto, use o formulário ou o e-mail.
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

      {/* Footer - Mágico */}
      <footer className="bg-slate-950 text-white py-16 relative overflow-hidden border-t border-white/10">
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
              <h3 className="text-2xl md:text-3xl font-extrabold mb-6 bg-gradient-to-r from-violet-300 to-fuchsia-300 bg-clip-text text-transparent font-display">
                Bora construir algo útil?
              </h3>
              <motion.a
                href="#contato"
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.98 }}
                className="group inline-flex items-center gap-2 bg-gradient-to-r from-violet-500 to-fuchsia-500 text-white px-8 py-4 rounded-full font-semibold shadow-lg shadow-violet-500/20 hover:shadow-violet-500/35 transition-all"
              >
                <span className="relative z-10">Ir para contato</span>
                <FiMail className="relative z-10" size={20} />
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
                  <div className="relative z-10 text-white group-hover:text-violet-300 transition-colors">
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
            <p className="text-slate-400 mb-2">
              Emerson Morales Junior · Full stack
            </p>
            <p className="text-sm text-slate-500">
              © {new Date().getFullYear()} Emerson Morales Junior. Todos os direitos reservados.
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
            style={{ position: 'fixed', bottom: '2rem', right: '2rem', zIndex: 100 }}
            className="bg-gradient-to-r from-violet-500 via-fuchsia-500 to-violet-500 text-white p-4 rounded-full shadow-xl hover:shadow-violet-500/30 transition-all group relative overflow-hidden"
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
