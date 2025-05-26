import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { FiGithub, FiExternalLink, FiArrowUp, FiLinkedin, FiInstagram, FiMail, FiUser, FiMessageSquare, FiX } from "react-icons/fi";
import { SiReact, SiNodedotjs, SiSpring, SiFlutter, SiTailwindcss, SiMysql, SiFigma, SiOpenjdk } from "react-icons/si";

export default function Portfolio() {
  const [showTopBtn, setShowTopBtn] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [showThankYouModal, setShowThankYouModal] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowTopBtn(window.pageYOffset > 300);
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

  const handleSubmit = async (e) => {
    e.preventDefault();
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
      } else {
        console.error('Form submission failed');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const sectionVariant = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0, 
      transition: { 
        duration: 0.6,
        staggerChildren: 0.2
      } 
    },
  };

  const itemVariant = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  const skills = [
    { name: "React/React Native", icon: <SiReact className="text-[#61DAFB]" size={24} /> },
    { name: "Node.js", icon: <SiNodedotjs className="text-[#339933]" size={24} /> },
    { name: "UI/UX Design", icon: <SiFigma className="text-[#F24E1E]" size={24} /> },
    { name: "Java/Spring", icon: <div className="flex gap-2"><SiSpring className="text-[#6DB33F]" size={24} /></div> },
    { name: "Flutter", icon: <SiFlutter className="text-[#02569B]" size={24} /> },
    { name: "MySQL", icon: <SiMysql className="text-[#4479A1]" size={24} /> },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 text-gray-900 font-sans overflow-x-hidden">
      {/* Modal de Agradecimento */}
      {showThankYouModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <motion.div 
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            transition={{ type: "spring", damping: 20 }}
            className="bg-white rounded-xl w-full max-w-xs sm:max-w-sm md:max-w-md mx-2 p-4 sm:p-6 md:p-8 relative shadow-2xl"
          >
            <button 
              onClick={() => setShowThankYouModal(false)}
              className="absolute top-2 right-2 sm:top-4 sm:right-4 text-gray-500 hover:text-gray-700"
              aria-label="Fechar modal"
            >
              <FiX size={20} className="sm:w-6 sm:h-6" />
            </button>
            
            <div className="text-center">
              <div className="w-16 h-16 sm:w-20 sm:h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4 sm:mb-6">
                <svg className="w-8 h-8 sm:w-10 sm:w-10 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                </svg>
              </div>
              
              <h3 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-800 mb-2 sm:mb-3">
                Obrigado!
              </h3>
              <p className="text-sm sm:text-base text-gray-600 mb-4 sm:mb-6">
                Sua mensagem foi enviada com sucesso. Entrarei em contato em breve.
              </p>
              
              <button
                onClick={() => setShowThankYouModal(false)}
                className="px-4 py-2 sm:px-6 sm:py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition text-sm sm:text-base"
              >
                Fechar
              </button>
            </div>
          </motion.div>
        </div>
      )}

      {/* Mobile Menu Button */}
      <button 
        onClick={toggleMenu}
        className="md:hidden fixed top-4 right-4 z-50 bg-indigo-600 text-white p-3 rounded-full shadow-lg"
        aria-label="Menu"
      >
        <div className={`w-6 flex flex-col gap-1.5 ${menuOpen ? 'transform rotate-45' : ''}`}>
          <span className={`h-0.5 bg-white rounded-full transition-all ${menuOpen ? 'w-6 translate-y-2' : 'w-6'}`}></span>
          <span className={`h-0.5 bg-white rounded-full transition-all ${menuOpen ? 'opacity-0' : 'w-6'}`}></span>
          <span className={`h-0.5 bg-white rounded-full transition-all ${menuOpen ? 'w-6 -rotate-90 -translate-y-2' : 'w-6'}`}></span>
        </div>
      </button>

      {/* Mobile Menu */}
      <motion.div 
        initial={{ x: '100%' }}
        animate={{ x: menuOpen ? 0 : '100%' }}
        transition={{ type: 'tween' }}
        className="fixed inset-0 bg-indigo-600 z-40 flex flex-col items-center justify-center md:hidden"
      >
        <nav className="flex flex-col items-center gap-8 text-white text-xl">
          <a href="#sobre" onClick={toggleMenu} className="hover:text-yellow-300 transition">Sobre</a>
          <a href="#connectwork" onClick={toggleMenu} className="hover:text-yellow-300 transition">ConnectWork</a>
          <a href="#projetos" onClick={toggleMenu} className="hover:text-yellow-300 transition">Projetos</a>
          <a href="#contato" onClick={toggleMenu} className="hover:text-yellow-300 transition">Contato</a>
        </nav>
        <div className="mt-12 flex gap-6">
          <a href="https://www.linkedin.com/in/emerson-morales-junior-6469b8231/" target="_blank" rel="noopener noreferrer" className="text-white hover:text-yellow-300 transition">
            <FiLinkedin size={24} />
          </a>
          <a href="https://www.instagram.com/emersxn_jr" target="_blank" rel="noopener noreferrer" className="text-white hover:text-yellow-300 transition">
            <FiInstagram size={24} />
          </a>
        </div>
      </motion.div>

      {/* Header */}
      <motion.header
        initial={{ opacity: 0, y: -40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="flex flex-col md:flex-row items-center bg-gradient-to-r from-indigo-600 to-purple-600 text-white pt-24 pb-16 px-6 md:px-12 lg:px-24"
      >
        {/* Desktop Navigation */}
        <nav className="hidden md:flex absolute top-6 right-12 gap-8 text-white">
          <a href="#sobre" className="hover:text-yellow-300 transition">Sobre</a>
          <a href="#connectwork" className="hover:text-yellow-300 transition">ConnectWork</a>
          <a href="#projetos" className="hover:text-yellow-300 transition">Projetos</a>
          <a href="#contato" className="hover:text-yellow-300 transition">Contato</a>
        </nav>

        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2, type: "spring" }}
          className="relative mb-8 md:mb-0 md:mr-10"
        >
          <img
            src="/foto-pessoal.jpeg"
            alt="Emerson Morales"
            className="w-32 h-32 md:w-40 md:h-40 rounded-full object-cover shadow-2xl border-4 border-white"
          />
          <motion.div 
            animate={{ 
              scale: [1, 1.1, 1],
              rotate: [0, 10, -10, 0]
            }}
            transition={{ 
              repeat: Infinity, 
              duration: 4,
              ease: "linear"
            }}
            className="absolute -bottom-2 -right-2 bg-yellow-400 text-indigo-800 px-3 py-1 rounded-full text-xs font-bold"
          >
            Disponível!
          </motion.div>
        </motion.div>
        
        <div className="text-center md:text-left">
          <motion.h1 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
            className="text-4xl md:text-5xl font-bold leading-tight mb-2"
          >
            <span className="bg-gradient-to-r from-yellow-300 via-amber-300 to-orange-300 bg-clip-text text-transparent">
              Emerson Morales
            </span>
            <span className="text-white"> Jr</span>
          </motion.h1>
          
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="text-xl md:text-2xl opacity-90 mb-6"
          >
            Desenvolvedor <span className="font-semibold">Full Stack</span>
          </motion.p>
          
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.7 }}
            className="flex flex-wrap justify-center md:justify-start gap-4"
          >
            <a
              href="#connectwork"
              className="inline-flex items-center px-6 py-3 bg-white text-indigo-600 font-semibold rounded-full shadow-lg hover:bg-indigo-100 transition transform hover:-translate-y-1"
            >
              Ver Projetos
            </a>
            <a
              href="#contato"
              className="inline-flex items-center px-6 py-3 bg-transparent border-2 border-white text-white font-semibold rounded-full hover:bg-white hover:text-indigo-600 transition transform hover:-translate-y-1"
            >
              Contato
            </a>
          </motion.div>
        </div>
      </motion.header>

      {/* Sobre Mim */}
      <motion.section
        id="sobre"
        variants={sectionVariant}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        className="max-w-6xl mx-auto px-6 py-12 md:py-20"
      >
        <motion.h2 variants={itemVariant} className="text-3xl md:text-4xl font-semibold mb-8 md:mb-12">
          <span className="border-b-4 border-indigo-500 pb-1">Sobre Mim</span>
        </motion.h2>
        
        <motion.div variants={itemVariant} className="grid md:grid-cols-2 gap-8 md:gap-12 items-center">
          <div>
            <motion.p 
              variants={itemVariant}
              className="text-lg leading-relaxed text-gray-800 mb-6"
            >
              Desenvolvedor Full Stack com experiência em React, React Native, Node.js, Java, Spring Boot e Flutter. Apaixonado por criar soluções inovadoras que combinam design atraente com funcionalidade robusta.
            </motion.p>
            
            <motion.p variants={itemVariant} className="text-lg leading-relaxed text-gray-800 mb-6 md:mb-8">
              Minha abordagem combina atenção aos detalhes, boas práticas de código e foco na experiência do usuário. Estou sempre buscando aprender novas tecnologias e melhorar minhas habilidades.
            </motion.p>
            
            <motion.div variants={itemVariant}>
              <h3 className="text-xl font-semibold mb-4">Habilidades Principais:</h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                {skills.map((skill, index) => (
                  <motion.div 
                    key={index}
                    whileHover={{ scale: 1.05 }}
                    className="flex flex-col items-center p-4 bg-white rounded-lg shadow-md border border-gray-100"
                  >
                    <div className="mb-2">
                      {skill.icon}
                    </div>
                    <span className="text-sm font-medium text-gray-700">{skill.name}</span>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
          
          <motion.div 
            variants={itemVariant}
            className="bg-white p-6 rounded-xl shadow-lg border border-gray-100 mt-8 md:mt-0"
          >
            <h3 className="text-xl font-semibold mb-4 text-center">Experiência</h3>
            <div className="space-y-6">
              <div className="relative pl-8 border-l-2 border-indigo-200">
                <div className="absolute -left-2 top-0 w-4 h-4 rounded-full bg-indigo-500"></div>
                <h4 className="font-semibold">Desenvolvedor Full Stack</h4>
                <p className="text-sm text-gray-600 mb-1">Freelancer | 2021 - Presente</p>
                <p className="text-gray-700">Desenvolvimento de aplicações web e mobile completas, desde o design até a implementação.</p>
              </div>
              
              <div className="relative pl-8 border-l-2 border-indigo-200">
                <div className="absolute -left-2 top-0 w-4 h-4 rounded-full bg-indigo-500"></div>
                <h4 className="font-semibold">Desenvolvedor ReactNative</h4>
                <p className="text-sm text-gray-600 mb-1">Projetos Pessoais | 2020 - 2021</p>
                <p className="text-gray-700">Criação de aplicativos multiplataforma com ReactNative e integração com APIs.</p>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </motion.section>

      {/* Destaque ConnectWork */}
      <motion.section
        id="connectwork"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        className="py-12 md:py-20 bg-gradient-to-r from-indigo-600 to-purple-600 text-white"
      >
        <div className="max-w-6xl mx-auto px-6">
          <motion.div 
            initial={{ y: 50 }}
            whileInView={{ y: 0 }}
            transition={{ type: "spring" }}
            viewport={{ once: true }}
            className="bg-white text-gray-900 rounded-2xl shadow-2xl overflow-hidden"
          >
            <div className="md:flex flex-col md:flex-row">
              <div className="md:w-1/2 p-6 md:p-8 lg:p-12">
                <h2 className="text-2xl md:text-3xl font-bold mb-4">ConnectWork</h2>
                <p className="text-base md:text-lg mb-6">
                  Plataforma inovadora para conexão e colaboração entre profissionais de diversas áreas. 
                  Desenvolvida com React, Node.js e MySQL.
                </p>
                
                <div className="mb-6 md:mb-8">
                  <h3 className="text-lg md:text-xl font-semibold mb-3">Tecnologias Utilizadas:</h3>
                  <div className="flex flex-wrap gap-3">
                    <div className="flex items-center gap-1 bg-gray-100 px-3 py-1 rounded-full">
                      <SiReact className="text-[#61DAFB]" size={16} />
                      <span className="text-sm">React</span>
                    </div>
                    <div className="flex items-center gap-1 bg-gray-100 px-3 py-1 rounded-full">
                      <SiNodedotjs className="text-[#339933]" size={16} />
                      <span className="text-sm">Node.js</span>
                    </div>
                    <div className="flex items-center gap-1 bg-gray-100 px-3 py-1 rounded-full">
                      <SiMysql className="text-[#4479A1]" size={16} />
                      <span className="text-sm">MySQL</span>
                    </div>
                  </div>
                </div>
                
                <div className="flex flex-wrap gap-3">
                  <a
                    href="https://connectwork.site"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center px-4 py-2 md:px-6 md:py-3 bg-indigo-600 text-white font-semibold rounded-full shadow hover:bg-indigo-700 transition transform hover:-translate-y-1 text-sm md:text-base"
                  >
                    <FiExternalLink className="mr-2" /> Visitar Site
                  </a>
                  <a
                    href="https://github.com/emersonjrdev"
                    className="flex items-center px-4 py-2 md:px-6 md:py-3 bg-gray-100 text-gray-800 font-semibold rounded-full hover:bg-gray-200 transition transform hover:-translate-y-1 text-sm md:text-base"
                  >
                    <FiGithub className="mr-2" /> Código Fonte
                  </a>
                </div>
              </div>
              
              <div className="md:w-1/2 bg-gray-100 flex items-center justify-center p-6 md:p-8">
                <motion.div
                  whileHover={{ scale: 1.03 }}
                  className="relative shadow-2xl rounded-lg overflow-hidden border-4 md:border-8 border-white w-full"
                >
                  <img 
                    src="/connect.png" 
                    alt="ConnectWork Preview" 
                    className="w-full h-auto"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                  <div className="absolute bottom-0 left-0 p-4 md:p-6 text-white">
                    <h3 className="text-lg md:text-xl font-bold">Plataforma Completa</h3>
                    <p>Web e Mobile</p>
                  </div>
                </motion.div>
              </div>
            </div>
          </motion.div>
        </div>
      </motion.section>

      {/* Outros Projetos */}
      <motion.section
        id="projetos"
        variants={sectionVariant}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        className="max-w-6xl mx-auto px-6 py-12 md:py-20"
      >
        <motion.h2 variants={itemVariant} className="text-3xl md:text-4xl font-semibold mb-8 md:mb-12">
          <span className="border-b-4 border-indigo-500 pb-1">Outros Projetos</span>
        </motion.h2>
        
        <motion.div variants={itemVariant} className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {[
            {
              title: "Portfolio Template",
              description: "Template React para portfólio criativo com design moderno e responsivo.",
              tags: ["React", "Tailwind CSS"],
              icons: [
                <SiReact key="react" className="text-[#61DAFB]" size={18} />,
                <SiTailwindcss key="tailwind" className="text-[#06B6D4]" size={18} />
              ]
            },
            // {
            //   title: "Task Manager App",
            //   description: "Aplicativo de gerenciamento de tarefas com autenticação e banco de dados.",
            //   tags: ["React", "Node.js", "MySQL"],
            //   icons: [
            //     <SiReact key="react" className="text-[#61DAFB]" size={18} />,
            //     <SiNodedotjs key="node" className="text-[#339933]" size={18} />,
            //     <SiMysql key="mysql" className="text-[#4479A1]" size={18} />
            //   ]
            // },
            // {
            //   title: "E-commerce Platform",
            //   description: "Plataforma de e-commerce com carrinho de compras e pagamento integrado.",
            //   tags: ["React", "Java", "Spring"],
            //   icons: [
            //     <SiReact key="react" className="text-[#61DAFB]" size={18} />,
            //     <SiOpenjdk key="java" className="text-[#007396]" size={18} />,
            //     <SiSpring key="spring" className="text-[#6DB33F]" size={18} />
            //   ]
            // }
          ].map((project, index) => (
            <motion.div 
              key={index}
              variants={itemVariant}
              whileHover={{ y: -10 }}
              className="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-100"
            >
              <div className="h-40 md:h-48 bg-gradient-to-r from-purple-400 to-indigo-500 flex items-center justify-center">
                <img src="/Portfolio.png" alt="" />
              </div>
              <div className="p-4 md:p-6">
                <h3 className="text-lg md:text-xl font-semibold mb-2">{project.title}</h3>
                <p className="text-sm md:text-base text-gray-600 mb-3 md:mb-4">{project.description}</p>
                <div className="flex gap-2 mb-3 md:mb-4">
                  {project.icons.map((icon, i) => (
                    <span key={i} className="p-1.5 bg-gray-100 rounded-full">
                      {icon}
                    </span>
                  ))}
                </div>
                <div className="flex gap-2 md:gap-3">
                  <a href="https://github.com/emersonjrdev" className="text-indigo-600 hover:text-indigo-800">
                    <FiGithub size={18} />
                  </a>
                  <a href="https://emersondev.vercel.app" className="text-indigo-600 hover:text-indigo-800">
                    <FiExternalLink size={18} />
                  </a>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </motion.section>

      {/* Contato */}
      <motion.section
        id="contato"
        variants={sectionVariant}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        className="max-w-6xl mx-auto px-6 py-12 md:py-20"
      >
        <motion.h2 variants={itemVariant} className="text-3xl md:text-4xl font-semibold mb-8 md:mb-12">
          <span className="border-b-4 border-indigo-500 pb-1">Contato</span>
        </motion.h2>
        
        <motion.div variants={itemVariant} className="grid md:grid-cols-2 gap-8 md:gap-12">
          <div>
            <motion.h3 
              variants={itemVariant}
              className="text-2xl font-semibold mb-4 md:mb-6 text-indigo-600"
            >
              Vamos trabalhar juntos!
            </motion.h3>
            
            <motion.p 
              variants={itemVariant}
              className="text-base md:text-lg leading-relaxed text-gray-800 mb-6 md:mb-8"
            >
              Estou aberto a novas oportunidades e colaborações. Se você tem um projeto em mente ou quer discutir possibilidades, entre em contato.
            </motion.p>
            
            <motion.div variants={itemVariant} className="space-y-3 md:space-y-4">
              <div className="flex items-center">
                <div className="bg-indigo-100 p-2 md:p-3 rounded-full mr-3 md:mr-4">
                  <FiLinkedin className="text-indigo-600 text-lg md:text-xl" />
                </div>
                <div>
                  <p className="text-xs md:text-sm text-gray-500">LinkedIn</p>
                  <a 
                    href="https://www.linkedin.com/in/emerson-morales-junior-6469b8231/" 
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-base md:text-lg font-medium hover:text-indigo-600 transition"
                  >
                    Emerson Morales Junior
                  </a>
                </div>
              </div>
              
              <div className="flex items-center">
                <div className="bg-indigo-100 p-2 md:p-3 rounded-full mr-3 md:mr-4">
                  <FiInstagram className="text-indigo-600 text-lg md:text-xl" />
                </div>
                <div>
                  <p className="text-xs md:text-sm text-gray-500">Instagram</p>
                  <a 
                    href="https://www.instagram.com/emersxn_jr" 
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-base md:text-lg font-medium hover:text-indigo-600 transition"
                  >
                    @emersxn_jr
                  </a>
                </div>
              </div>
            </motion.div>
          </div>
          
          <motion.form 
            variants={itemVariant}
            className="bg-white p-4 md:p-6 lg:p-8 rounded-xl shadow-lg"
            action="https://formsubmit.co/contato.juniormorales@gmail.com" 
            method="POST"
            onSubmit={handleSubmit}
          >
            <input type="hidden" name="_captcha" value="false" />
            <input type="hidden" name="_template" value="table" />

            <div className="mb-4 md:mb-6">
              <label htmlFor="name" className="block text-gray-700 mb-1 md:mb-2 text-sm md:text-base">Nome</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FiUser className="text-gray-400" />
                </div>
                <input 
                  type="text" 
                  id="name" 
                  name="name"
                  required
                  className="w-full pl-10 pr-4 py-2 md:py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition text-sm md:text-base"
                  placeholder="Seu nome"
                />
              </div>
            </div>
            
            <div className="mb-4 md:mb-6">
              <label htmlFor="email" className="block text-gray-700 mb-1 md:mb-2 text-sm md:text-base">Email</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FiMail className="text-gray-400" />
                </div>
                <input 
                  type="email" 
                  id="email" 
                  name="email"
                  required
                  className="w-full pl-10 pr-4 py-2 md:py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition text-sm md:text-base"
                  placeholder="seu@email.com"
                />
              </div>
            </div>
            
            <div className="mb-4 md:mb-6">
              <label htmlFor="message" className="block text-gray-700 mb-1 md:mb-2 text-sm md:text-base">Mensagem</label>
              <div className="relative">
                <div className="absolute top-3 left-3">
                  <FiMessageSquare className="text-gray-400" />
                </div>
                <textarea 
                  id="message" 
                  name="message"
                  required
                  rows="4"
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition text-sm md:text-base"
                  placeholder="Sua mensagem..."
                ></textarea>
              </div>
            </div>
            
            <button 
              type="submit"
              className="w-full bg-indigo-600 text-white py-2 md:py-3 px-6 rounded-lg font-semibold hover:bg-indigo-700 transition transform hover:-translate-y-1 shadow-md text-sm md:text-base"
            >
              Enviar Mensagem
            </button>
          </motion.form>
        </motion.div>
      </motion.section>

      <footer className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-6 md:py-8 text-center">
        <div className="max-w-6xl mx-auto px-6">
          <motion.p 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className="text-base md:text-lg mb-3 md:mb-4"
          >
            Vamos criar algo incrível juntos!
          </motion.p>
          
          <div className="flex justify-center space-x-4 md:space-x-6 mb-4 md:mb-6">
            {[
              { icon: <FiGithub size={20} />, url: "https://github.com/emersonjrdev" },
              { icon: <FiLinkedin size={20} />, url: "https://www.linkedin.com/in/emerson-morales-junior-6469b8231/" },
              { icon: <FiInstagram size={20} />, url: "https://www.instagram.com/emersxn_jr" }
            ].map((social, index) => (
              <motion.a
                key={index}
                href={social.url}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ y: -3, scale: 1.1 }}
                className="text-white hover:text-yellow-300 transition"
              >
                {social.icon}
              </motion.a>
            ))}
          </div>
          
          <p className="text-xs md:text-sm opacity-80">
            © {new Date().getFullYear()} Emerson Morales. Todos os direitos reservados.
          </p>
        </div>
      </footer>

      {showTopBtn && (
        <motion.button
          onClick={scrollToTop}
          aria-label="Voltar ao topo"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          className="fixed bottom-6 right-6 md:bottom-8 md:right-8 bg-indigo-600 text-white p-2 md:p-3 rounded-full shadow-xl hover:bg-indigo-700 transition"
        >
          <FiArrowUp size={20} />
        </motion.button>
      )}
    </div>
  );
}
