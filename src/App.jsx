import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiGithub, FiExternalLink, FiArrowUp, FiLinkedin, FiInstagram, FiMail, FiUser, FiMessageSquare, FiX, FiSun, FiMoon, FiLoader } from "react-icons/fi";
import { SiReact, SiNodedotjs, SiSpring, SiFlutter, SiTypescript, SiFigma, SiTailwindcss, SiNextdotjs } from "react-icons/si";
import ReactPlayer from 'react-player';
import { TypeAnimation } from 'react-type-animation';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

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
    name: '',
    email: '',
    message: ''
  });

  // Simular loading
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2500);
    return () => clearTimeout(timer);
  }, []);

  // Verificar preferência do sistema para dark mode
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const isDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      setDarkMode(isDark);
    }
  }, []);

  // Aplicar dark mode
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
      document.body.classList.add('dark-mode');
    } else {
      document.documentElement.classList.remove('dark');
      document.body.classList.remove('dark-mode');
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
    cssEase: 'cubic-bezier(0.645, 0.045, 0.355, 1)',
    responsive: [
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          centerMode: false,
          infinite: true
        }
      }
    ]
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
  };

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    localStorage.setItem('darkMode', JSON.stringify(!darkMode));
  };

  const validateForm = () => {
    const errors = {};
    if (!formData.name.trim()) errors.name = 'Nome é obrigatório';
    if (!formData.email.trim()) {
      errors.email = 'Email é obrigatório';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      errors.email = 'Email inválido';
    }
    if (!formData.message.trim()) errors.message = 'Mensagem é obrigatória';
    return errors;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear error when typing
    if (formErrors[name]) {
      setFormErrors(prev => ({
        ...prev,
        [name]: null
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

    const form = e.target;
    const formData = new FormData(form);

    try {
      const response = await fetch(form.action, {
        method: 'POST',
        body: formData,
        headers: {
          'Accept': 'application/json'
        }
      });

      if (response.ok) {
        setShowThankYouModal(true);
        form.reset();
        setFormData({
          name: '',
          email: '',
          message: ''
        });
      } else {
        console.error('Form submission failed');
      }
    } catch (error) {
      console.error('Error:', error);
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
        staggerChildren: 0.2
      }
    }
  };

  const itemVariant = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    }
  };

  // Data
  const skills = [
    { name: "React/React Native", icon: <SiReact className="text-[#61DAFB]" size={28} />, color: "from-[#61DAFB] to-[#2a93d5]" },
    { name: "Node.js", icon: <SiNodedotjs className="text-[#339933]" size={28} />, color: "from-[#339933] to-[#1f6f1f]" },
    { name: "UI/UX Design", icon: <SiFigma className="text-[#f24f1eee]" size={28} />, color: "from-[#F24E1E] to-[#f24f1e3f]" },
    { name: "Java/Spring", icon: <SiSpring className="text-[#6DB33F]" size={28} />, color: "from-[#6DB33F] to-[#4a8a2a]" },
    { name: "Flutter", icon: <SiFlutter className="text-[#02569B]" size={28} />, color: "from-[#02569B] to-[#013a6b]" },
    { name: "TypeScript", icon: <SiTypescript className="text-[#3178C6]" size={28} />, color: "from-[#3178C6] to-[#1e56a3]" },
    { name: "Tailwind CSS", icon: <SiTailwindcss className="text-[#06B6D4]" size={28} />, color: "from-[#06B6D4] to-[#0891B2]" },
    { name: "Next.js", icon: <SiNextdotjs className="text-[#000000] dark:text-[#FFFFFF]" size={28} />, color: "from-[#000000] to-[#475569] dark:from-[#FFFFFF] dark:to-[#94A3B8]" },
  ];

  const projects = [
    {
      id: 1,
      title: "ConnectWork",
      description: "Plataforma profissional para conexão e colaboração entre freelancers e empresas com sistema de matchmaking inteligente.",
      tags: ["React", "Node.js", "MySQL", "Tailwind"],
      category: "web",
      image: "/connect.png",
      links: {
        demo: "https://connectwork.site",
        code: "https://github.com/emersonjrdev"
      },
      metrics: "Aumentou engajamento em 40%",
      features: ["ChatBot", "Sistema de vagas"],
      challenges: "Garantir a experiência entre empresas e alunos"
    },
    {
      id: 2,
      title: "Portfolio Moderno",
      description: "Template de portfólio profissional com design responsivo, modo escuro/claro e animações fluidas.",
      tags: ["React", "Tailwind CSS", "Framer Motion"],
      category: "web",
      image: "/Portfolio1.png",
      links: {
        demo: "https://emersondev.vercel.app",
        code: "https://github.com/emersonjrdev"
      },
      metrics: "Melhorou conversão em 25%",
      features: ["Design responsivo", "Modo escuro/claro", "SEO otimizado"],
      challenges: "Criar animações fluidas sem prejudicar performance"
    },
    {
      id: 3,
      title: "ConnectWork App",
      description: "Aplicativo móvel da plataforma ConnectWork com notificações em tempo real e chat integrado.",
      tags: ["React Native", "Node.js", "MySQL"],
      category: "mobile",
      image: "/Mobile.png",
      links: {
        demo: "#",
        code: "https://github.com/emersonjrdev"
      },
      metrics: "4.8/5 avaliações na Play Store",
      features: ["Notificações push", "Offline-first",],
      challenges: "Garantir experiência consistente entre plataformas"
    }
  ];

  const testimonials = [
    {
      quote: "Trabalho excepcional! Entregou além do esperado com ótima comunicação e atenção aos detalhes.",
      author: "João Souza",
      role: "CEO, TechSolutions",
      avatar: "/avatar1.jpg"
    },
    {
      quote: "Solução perfeita para nossas necessidades com ótimo custo-benefício e prazos cumpridos rigorosamente.",
      author: "Maria Clara",
      role: "Gerente de Projetos, InovaCorp",
      avatar: "/avatar2.jpg"
    },
    {
      quote: "Profissional altamente qualificado e comprometido com os resultados. Superou todas as expectativas.",
      author: "Paulo Henrique",
      role: "CTO, DigitalMind",
      avatar: "/avatar3.jpg"
    }
  ];

  const filteredProjects = activeFilter === "all"
    ? projects
    : projects.filter(project => project.category === activeFilter);

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
              scale: [1, 1.2, 1]
            }}
            transition={{
              rotate: {
                repeat: Infinity,
                duration: 2,
                ease: "linear"
              },
              scale: {
                repeat: Infinity,
                repeatType: "reverse",
                duration: 1,
                ease: "easeInOut"
              }
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
    <div className={`min-h-screen ${darkMode ? 'dark bg-gray-900 text-gray-100' : 'bg-gray-50 text-gray-900'} font-sans selection:bg-teal-500 selection:text-white transition-colors duration-300 overflow-x-hidden`}>
      {/* Scroll progress bar */}
      <div className="fixed top-0 left-0 h-1 bg-gradient-to-r from-teal-500 to-emerald-500 z-50" 
        style={{ width: `${scrollProgress}%` }} />

      {/* Dark Mode Toggle */}
      <button 
        onClick={toggleDarkMode}
        className={`fixed top-8 left-8 p-2 rounded-full ${darkMode ? 'bg-white/10 text-amber-300' : 'bg-gray-900/10 text-gray-900'} backdrop-blur-sm z-50 hover:bg-white/20 transition-all shadow-lg`}
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
              className={`${darkMode ? 'dark:bg-gray-800 dark:border-gray-700' : 'bg-white border-gray-100'} rounded-xl w-full max-w-xs sm:max-w-sm md:max-w-md mx-2 p-6 md:p-8 relative shadow-2xl border`}
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
                  className={`w-20 h-20 ${darkMode ? 'dark:bg-emerald-900/30' : 'bg-emerald-50'} rounded-full flex items-center justify-center mx-auto mb-6`}
                >
                  <svg className="w-10 h-10 text-emerald-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                  </svg>
                </motion.div>

                <h3 className={`text-2xl md:text-3xl font-bold mb-3 ${darkMode ? 'dark:text-white' : 'text-gray-800'}`}>
                  Mensagem Enviada!
                </h3>
                <p className={`${darkMode ? 'dark:text-gray-300' : 'text-gray-600'} mb-6`}>
                  Obrigado pelo seu contato. Responderei o mais breve possível.
                </p>

                <motion.button
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => setShowThankYouModal(false)}
                  className="px-6 py-2 bg-gradient-to-r from-teal-600 to-emerald-600 text-white rounded-lg hover:shadow-lg transition-all"
                >
                  Fechar
                </motion.button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Mobile Menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'tween', ease: [0.76, 0, 0.24, 1] }}
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
                {['sobre', 'projetos', 'contato'].map((item) => (
                  <motion.a
                    key={item}
                    href={`#${item}`}
                    onClick={toggleMenu}
                    className="relative overflow-hidden py-2 group"
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.1 * ['sobre', 'projetos', 'contato'].indexOf(item) }}
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
                    url: "https://www.linkedin.com/in/emerson-morales-junior-6469b8231/" 
                  },
                  { 
                    icon: <FiInstagram size={28} />, 
                    url: "https://www.instagram.com/emersxn_jr" 
                  },
                  { 
                    icon: <FiGithub size={28} />, 
                    url: "https://github.com/emersonjrdev" 
                  }
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

      {/* Header Section */}
      <header className="relative bg-gradient-to-br from-teal-900 to-emerald-900 flex flex-col md:flex-row items-center text-white pt-24 pb-16 px-6 md:px-12 lg:px-24">
        {/* Desktop Navigation */}
        <nav className="hidden md:flex absolute top-8 right-12 gap-8 text-white z-50">
          {['sobre', 'projetos', 'contato'].map((item) => (
            <a
              key={item}
              href={`#${item}`}
              className="relative group overflow-hidden py-1"
            >
              <span className="capitalize">{item}</span>
              <span className="absolute bottom-0 left-0 w-full h-0.5 bg-amber-400 transform -translate-x-full group-hover:translate-x-0 transition-transform duration-300"></span>
            </a>
          ))}
        </nav>

        {/* Mobile Menu Button */}
        <button 
          onClick={toggleMenu}
          className="md:hidden absolute top-8 right-6 z-50"
          aria-label="Menu"
        >
          <div className={`w-6 flex flex-col gap-1.5 ${menuOpen ? 'opacity-0' : 'opacity-100'} transition-opacity`}>
            <span className="h-0.5 w-full bg-white"></span>
            <span className="h-0.5 w-full bg-white"></span>
            <span className="h-0.5 w-full bg-white"></span>
          </div>
        </button>

        {/* Profile Image */}
        <motion.div
          initial={{ scale: 0, rotate: -15 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ delay: 0.2, type: "spring", stiffness: 100 }}
          className="relative mb-8 md:mb-0 md:mr-12 z-10 w-32 h-32 md:w-40 md:h-40"
        >
          <div className="w-full h-full rounded-full overflow-hidden shadow-2xl border-4 border-white/20 relative">
            <img
              src="/foto-pessoal.jpeg"
              alt="Emerson Morales"
              className="w-full h-full object-cover object-center"
            />
            <div className="absolute inset-0 bg-teal-600/20 mix-blend-overlay"></div>
          </div>
          <motion.div
            animate={{
              scale: [1, 1.1, 1],
              rotate: [0, 5, -5, 0]
            }}
            transition={{
              repeat: Infinity,
              duration: 3,
              ease: "easeInOut"
            }}
            className="absolute -bottom-2 -right-2 bg-amber-400 text-teal-900 px-3 py-1 rounded-full text-xs font-bold shadow-md"
          >
            Disponível!
          </motion.div>
        </motion.div>

        {/* Header Content */}
        <div className="text-center md:text-left z-10">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            <TypeAnimation
              sequence={[
                'Emerson Morales Jr',
                1000,
                'Desenvolvedor Full Stack',
                1000,
                'UI/UX Designer',
                1000,
                () => {
                  console.log('Animação completa');
                }
              ]}
              wrapper="h1"
              cursor={true}
              repeat={Infinity}
              style={{ display: 'inline-block' }}
              className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-2 bg-gradient-to-r from-amber-300 to-yellow-400 bg-clip-text text-transparent"
              deletionSpeed={70}
            />

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
              className="text-xl md:text-2xl opacity-90 mb-6"
            >
              Criando soluções digitais com <span className="font-semibold text-amber-300">React</span>, <span className="font-semibold text-amber-300">Node.js</span> e <span className="font-semibold text-amber-300">Design</span>
            </motion.p>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8 }}
              className="flex flex-wrap justify-center md:justify-start gap-4"
            >
              <motion.a
                href="#projetos"
                whileHover={{ y: -3 }}
                whileTap={{ scale: 0.98 }}
                className="inline-flex items-center px-6 py-3 bg-white text-teal-900 font-bold rounded-full shadow-lg hover:shadow-xl transition-all hover:bg-amber-100"
              >
                Ver Projetos
              </motion.a>
              <motion.a
                href="#contato"
                whileHover={{ y: -3 }}
                whileTap={{ scale: 0.98 }}
                className="inline-flex items-center px-6 py-3 bg-transparent border-2 border-white text-white font-bold rounded-full hover:bg-white hover:text-teal-900 transition-all"
              >
                Contato
              </motion.a>
            </motion.div>
          </motion.div>
        </div>

        {/* Background elements */}
        <div className="absolute -bottom-20 -right-20 w-64 h-64 bg-teal-500 rounded-full filter blur-3xl opacity-10 -z-10"></div>
        <div className="absolute -top-20 -left-20 w-80 h-80 bg-emerald-500 rounded-full filter blur-3xl opacity-10 -z-10"></div>
      </header>

      {/* About Me Section */}
      <section id="sobre" className="py-16 md:py-24 px-6 relative bg-white dark:bg-gray-900 overflow-hidden">
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
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              minWidth: '100%',
              minHeight: '100%',
              objectFit: 'cover',
              opacity: 0.3
            }}
            config={{
              file: {
                attributes: {
                  style: {
                    objectFit: 'cover'
                  }
                }
              }
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
            className="text-3xl md:text-4xl lg:text-5xl font-bold mb-12 md:mb-16 text-center text-gray-900 dark:text-white"
          >
            <span className="relative inline-block">
              <span className="relative z-10">Sobre Mim</span>
              <span className="absolute bottom-1 left-0 w-full h-3 bg-teal-200/60 dark:bg-teal-800/60 z-0"></span>
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
                className="text-lg leading-relaxed text-gray-700 dark:text-gray-200 mb-6"
              >
                Sou um <span className="font-semibold text-teal-600 dark:text-teal-400">Desenvolvedor Full Stack</span> com experiência em criar soluções digitais completas, desde o design até a implementação. Minha paixão é transformar ideias em produtos funcionais e elegantes que proporcionam excelentes experiências aos usuários.
              </motion.p>

              <motion.p
                variants={itemVariant}
                className="text-lg leading-relaxed text-gray-700 dark:text-gray-300 mb-8 md:mb-10"
              >
                Com background em desenvolvimento web e mobile, trabalho com tecnologias modernas como <span className="font-medium text-teal-600 dark:text-teal-400">React, Node.js, Flutter e Spring Boot</span>. Acredito na combinação de código limpo, boas práticas e design atencioso para criar soluções escaláveis e eficientes.
              </motion.p>

              <motion.div variants={itemVariant}>
                <h3 className="text-xl font-semibold mb-6 text-gray-800 dark:text-gray-200">Habilidades:</h3>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                  {skills.map((skill, index) => (
                    <motion.div
                      key={index}
                      variants={itemVariant}
                      whileHover={{ y: -5 }}
                      className="group relative overflow-hidden p-4 bg-white dark:bg-gray-800 rounded-xl shadow-sm hover:shadow-md transition-all border border-gray-100 dark:border-gray-700"
                    >
                      <div className={`absolute inset-0 bg-gradient-to-br ${skill.color} opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10`}></div>
                      <div className="flex flex-col items-center">
                        <div className="mb-3">
                          {skill.icon}
                        </div>
                        <span className="text-sm font-medium text-gray-700 dark:text-gray-300 group-hover:text-white transition-colors">{skill.name}</span>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            </div>

            <motion.div
              variants={itemVariant}
              className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-xl border border-gray-100 dark:border-gray-700"
            >
              <h3 className="text-2xl font-semibold mb-6 text-center text-teal-600 dark:text-teal-400">Experiência</h3>
              <div className="space-y-8">
                <div className="relative pl-10 border-l-2 border-teal-200 dark:border-teal-800 group">
                  <div className="absolute -left-1 top-0 w-3 h-3 rounded-full bg-teal-500 group-hover:bg-gradient-to-r from-teal-500 to-emerald-500 transition-all"></div>
                  <h4 className="text-lg font-bold text-gray-800 dark:text-gray-200 mb-1">Desenvolvedor Full Stack</h4>
                  <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">Freelancer | 2021 - Presente</p>
                  <p className="text-gray-700 dark:text-gray-300">
                    Desenvolvimento de aplicações web e mobile completas, desde o design UI/UX até a implementação de APIs e deploy em produção.
                  </p>
                </div>

                <div className="relative pl-10 border-l-2 border-teal-200 dark:border-teal-800 group">
                  <div className="absolute -left-1 top-0 w-3 h-3 rounded-full bg-teal-500 group-hover:bg-gradient-to-r from-teal-500 to-emerald-500 transition-all"></div>
                  <h4 className="text-lg font-bold text-gray-800 dark:text-gray-200 mb-1">Desenvolvedor Mobile</h4>
                  <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">Projetos Pessoais | 2020 - 2021</p>
                  <p className="text-gray-700 dark:text-gray-300">
                    Criação de aplicativos multiplataforma com React Native e Flutter, com integração a APIs REST e serviços em nuvem.
                  </p>
                </div>

                <div className="relative pl-10 border-l-2 border-teal-200 dark:border-teal-800 group">
                  <div className="absolute -left-1 top-0 w-3 h-3 rounded-full bg-teal-500 group-hover:bg-gradient-to-r from-teal-500 to-emerald-500 transition-all"></div>
                  <h4 className="text-lg font-bold text-gray-800 dark:text-gray-200 mb-1">UI/UX Designer</h4>
                  <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">Freelancer | 2019 - 2020</p>
                  <p className="text-gray-700 dark:text-gray-300">
                    Design de interfaces e experiências de usuário para aplicativos e websites, criando protótipos e sistemas de design.
                  </p>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Metrics Section */}
      <section className="py-12 bg-emerald-700 text-white dark:bg-gray-900">
        <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-3 gap-8 text-center">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            viewport={{ once: true }}
            className="p-6 backdrop-blur-sm bg-white/10 dark:bg-gray-800/50 rounded-xl hover:bg-white/20 dark:hover:bg-gray-700/50 transition-all border border-white/20 dark:border-gray-700"
          >
            <p className="text-4xl font-bold mb-2">8+</p>
            <p>Projetos Completos</p>
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            viewport={{ once: true }}
            className="p-6 backdrop-blur-sm bg-white/10 dark:bg-gray-800/50 rounded-xl hover:bg-white/20 dark:hover:bg-gray-700/50 transition-all border border-white/20 dark:border-gray-700"
          >
            <p className="text-4xl font-bold mb-2">100%</p>
            <p>Satisfação do Cliente</p>
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            viewport={{ once: true }}
            className="p-6 backdrop-blur-sm bg-white/10 dark:bg-gray-800/50 rounded-xl hover:bg-white/20 dark:hover:bg-gray-700/50 transition-all border border-white/20 dark:border-gray-700"
          >
            <p className="text-4xl font-bold mb-2">3+</p>
            <p>Anos de Experiência</p>
          </motion.div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projetos" className="py-16 bg-gray-50 dark:bg-gray-800 px-4 sm:px-6 relative">
        <div className="max-w-7xl mx-auto">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl md:text-4xl font-bold mb-8 text-center text-gray-900 dark:text-white"
          >
            Meus Projetos
          </motion.h2>

          <div className="flex justify-center mb-10">
            <div className="inline-flex bg-white dark:bg-gray-700 rounded-full p-1 shadow">
              {['all', 'web', 'mobile'].map((filter) => (
                <button
                  key={filter}
                  onClick={() => setActiveFilter(filter)}
                  className={`px-4 py-2 text-sm font-medium rounded-full transition-all ${
                    activeFilter === filter
                      ? 'bg-gradient-to-r from-teal-500 to-emerald-500 text-white'
                      : 'text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-600'
                  }`}
                >
                  {filter === 'all' ? 'Todos' : filter === 'web' ? 'Web' : 'Mobile'}
                </button>
              ))}
            </div>
          </div>

          <div className="px-2">
            <Slider {...sliderSettings}>
              {filteredProjects.map((project) => (
                <div key={project.id} className="px-2 outline-none">
                  <motion.div 
                    className="bg-white dark:bg-gray-700 rounded-lg shadow-md overflow-hidden border border-gray-100 dark:border-gray-600 mx-auto max-w-md"
                    whileHover={{ y: -5 }}
                    data-category={project.category}
                  >
                    <div className={`
                      relative overflow-hidden 
                      ${project.category === 'mobile' ? 'pt-[100%] bg-gray-50 dark:bg-gray-800' : 'pt-[56.25%] bg-gray-200 dark:bg-gray-600'}
                    `}>
                      <img
                        src={project.image}
                        alt={project.title}
                        className={`
                          absolute top-0 left-0 w-full h-full 
                          ${project.category === 'mobile' ? 'object-contain p-6' : 'object-cover'}
                        `}
                      />
                    </div>
                    <div className="p-5">
                      <h3 className="text-xl font-semibold mb-2 text-gray-900 dark:text-white">{project.title}</h3>
                      <p className="text-gray-600 dark:text-gray-300 mb-4">{project.description}</p>
                      
                      <div className="mb-4">
                        <h4 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">Principais recursos:</h4>
                        <ul className="list-disc list-inside text-sm text-gray-700 dark:text-gray-300 space-y-1">
                          {project.features.map((feature, i) => (
                            <li key={i}>{feature}</li>
                          ))}
                        </ul>
                      </div>
                      
                      <div className="mb-4">
                        <h4 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">Desafios:</h4>
                        <p className="text-sm text-gray-700 dark:text-gray-300">{project.challenges}</p>
                      </div>
                      
                      <div className="flex flex-wrap gap-2 mb-3">
                        {project.tags.map((tag) => (
                          <span key={tag} className="text-xs bg-gray-100 dark:bg-gray-600 text-gray-800 dark:text-gray-200 px-2 py-1 rounded">
                            {tag}
                          </span>
                        ))}
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="text-sm text-teal-600 dark:text-teal-400 font-medium">
                          {project.metrics}
                        </div>
                        <div className="flex gap-4">
                          <a href={project.links.demo} className="text-teal-600 dark:text-teal-400 hover:underline flex items-center text-sm">
                            <FiExternalLink className="mr-1" /> Demo
                          </a>
                          <a href={project.links.code} className="text-gray-600 dark:text-gray-400 hover:underline flex items-center text-sm">
                            <FiGithub className="mr-1" /> Código
                          </a>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                </div>
              ))}
            </Slider>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-16 bg-white dark:bg-gray-900 px-6">
        <div className="max-w-6xl mx-auto">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl md:text-4xl font-bold mb-12 text-center text-gray-900 dark:text-white"
          >
            <span className="relative inline-block">
              <span className="relative z-10">Depoimentos</span>
              <span className="absolute bottom-1 left-0 w-full h-3 bg-teal-200/60 dark:bg-teal-800/60 z-0"></span>
            </span>
          </motion.h2>

          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                viewport={{ once: true }}
                className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow border border-gray-100 dark:border-gray-700"
              >
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 rounded-full bg-teal-100 dark:bg-teal-900/50 flex items-center justify-center text-teal-600 dark:text-teal-400 font-bold mr-3 overflow-hidden">
                    {testimonial.avatar ? (
                      <img src={testimonial.avatar} alt={testimonial.author} className="w-full h-full object-cover" />
                    ) : (
                      testimonial.author.charAt(0)
                    )}
                  </div>
                  <div>
                    <p className="font-bold text-gray-800 dark:text-white">{testimonial.author}</p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">{testimonial.role}</p>
                  </div>
                </div>
                <p className="italic text-gray-700 dark:text-gray-300">"{testimonial.quote}"</p>
                <div className="mt-4 flex">
                  {[...Array(5)].map((_, i) => (
                    <svg key={i} className="w-5 h-5 text-amber-400" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contato" className="py-16 bg-gray-50 dark:bg-gray-800 px-6 relative">
        <div className="max-w-6xl mx-auto">
          <div className="absolute -right-20 top-1/3 w-60 h-60 bg-emerald-500 rounded-full filter blur-3xl opacity-10 dark:opacity-5 -z-10"></div>

          <motion.h2
            variants={itemVariant}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="text-3xl md:text-4xl lg:text-5xl font-bold mb-12 md:mb-16 text-center text-gray-900 dark:text-white"
          >
            <span className="relative inline-block">
              <span className="relative z-10">Vamos Conversar</span>
              <span className="absolute bottom-1 left-0 w-full h-3 bg-teal-200/60 dark:bg-teal-800/60 z-0"></span>
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
                className="text-2xl md:text-3xl font-bold mb-4 text-teal-600 dark:text-teal-400"
              >
                Pronto para começar seu projeto?
              </motion.h3>

              <motion.p
                variants={itemVariant}
                className="text-lg leading-relaxed text-gray-700 dark:text-gray-300 mb-8"
              >
                Estou disponível para oportunidades de freelance e colaborações. Se você tem uma ideia ou projeto em mente, ou simplesmente quer bater um papo, sinta-se à vontade para entrar em contato.
              </motion.p>

              <motion.div
                variants={itemVariant}
                className="space-y-4"
              >
                <div className="flex items-start">
                  <div className="bg-teal-100 dark:bg-teal-900/30 p-3 rounded-full mr-4 flex-shrink-0">
                    <FiMail className="text-teal-600 dark:text-teal-400 text-xl" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Email</p>
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
                    <p className="text-sm text-gray-500 dark:text-gray-400">LinkedIn</p>
                    <a
                      href="https://www.linkedin.com/in/emerson-morales-junior/"
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
                    <p className="text-sm text-gray-500 dark:text-gray-400">GitHub</p>
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
              className="bg-white dark:bg-gray-700 p-6 md:p-8 rounded-2xl shadow-xl border border-gray-100 dark:border-gray-600"
              action="https://formsubmit.co/contato.juniormorales@gmail.com"
              method="POST"
              onSubmit={handleSubmit}
            >
              <input type="hidden" name="_captcha" value="false" />
              <input type="hidden" name="_template" value="table" />
              <input type="hidden" name="_next" value="https://yourdomain.com/thanks" />

              <div className="mb-6">
                <label htmlFor="name" className="block text-gray-700 dark:text-gray-300 mb-2 font-medium">Nome</label>
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
                    className={`w-full pl-10 pr-4 py-3 border ${formErrors.name ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'} rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 outline-none transition text-gray-700 dark:text-gray-300 dark:bg-gray-800`}
                    placeholder="Seu nome completo"
                  />
                </div>
                {formErrors.name && <p className="text-red-500 text-sm mt-1">{formErrors.name}</p>}
              </div>

              <div className="mb-6">
                <label htmlFor="email" className="block text-gray-700 dark:text-gray-300 mb-2 font-medium">Email</label>
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
                    className={`w-full pl-10 pr-4 py-3 border ${formErrors.email ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'} rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 outline-none transition text-gray-700 dark:text-gray-300 dark:bg-gray-800`}
                    placeholder="seu@email.com"
                  />
                </div>
                {formErrors.email && <p className="text-red-500 text-sm mt-1">{formErrors.email}</p>}
              </div>

              <div className="mb-6">
                <label htmlFor="message" className="block text-gray-700 dark:text-gray-300 mb-2 font-medium">Mensagem</label>
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
                    className={`w-full pl-10 pr-4 py-3 border ${formErrors.message ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'} rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 outline-none transition text-gray-700 dark:text-gray-300 dark:bg-gray-800`}
                    placeholder="Conte-me sobre seu projeto..."
                  ></textarea>
                </div>
                {formErrors.message && <p className="text-red-500 text-sm mt-1">{formErrors.message}</p>}
              </div>

              <motion.button
                type="submit"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full bg-gradient-to-r from-teal-600 to-emerald-600 text-white py-3 px-6 rounded-lg font-bold hover:shadow-lg transition-all"
              >
                Enviar Mensagem
              </motion.button>
            </motion.form>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gradient-to-br from-teal-900 to-emerald-900 text-white py-12">
        <div className="max-w-6xl mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-8 mb-8">
            <div className="text-center md:text-left">
              <h3 className="text-2xl font-bold mb-4">Pronto para transformar sua ideia em realidade?</h3>
              <motion.a
                href="#contato"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="inline-block bg-white text-teal-900 px-6 py-2 rounded-full font-medium shadow-md hover:shadow-lg transition-all"
              >
                Vamos Conversar
              </motion.a>
            </div>
            
            <div className="flex gap-6">
              {[
                { 
                  icon: <FiLinkedin size={24} />, 
                  url: "https://www.linkedin.com/in/emerson-morales-junior-6469b8231/" 
                },
                { 
                  icon: <FiInstagram size={24} />, 
                  url: "https://www.instagram.com/emersxn_jr" 
                },
                { 
                  icon: <FiGithub size={24} />, 
                  url: "https://github.com/emersonjrdev" 
                }
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
            </div>
          </div>
          
          <div className="border-t border-white/20 w-full pt-8 text-center">
            <p className="text-lg mb-2">Vamos criar algo incrível juntos!</p>
            <p className="text-sm opacity-80">
              © {new Date().getFullYear()} Emerson Morales Junior. Todos os direitos reservados.
            </p>
          </div>
        </div>
      </footer>

      {/* Back to Top Button */}
      <AnimatePresence>
        {showTopBtn && (
          <motion.button
            onClick={scrollToTop}
            aria-label="Voltar ao topo"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            whileHover={{ scale: 1.1, backgroundColor: '#059669' }}
            whileTap={{ scale: 0.95 }}
            className="fixed bottom-8 right-8 bg-teal-600 text-white p-3 rounded-full shadow-xl hover:shadow-2xl transition-all z-40"
          >
            <FiArrowUp size={24} />
          </motion.button>
        )}
      </AnimatePresence>
    </div>
  );
}