import React from 'react';
import { motion } from 'framer-motion';
import { FiCode, FiExternalLink, FiGithub } from 'react-icons/fi';

export default function Timeline3D({ projects = [] }) {
  return (
    <div className="relative py-20">
      {/* Linha do tempo */}
      <div className="hidden md:block absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-gradient-to-b from-violet-500 via-fuchsia-500 to-cyan-500 opacity-35"></div>
      
      <div className="space-y-20">
        {projects.map((project, index) => (
          <motion.div
            key={project.id}
            initial={{ opacity: 0, x: index % 2 === 0 ? -100 : 100 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.2, duration: 0.6 }}
            className={`relative flex items-center ${index % 2 === 0 ? 'flex-row' : 'flex-row-reverse'}`}
          >
            {/* Ponto na linha do tempo */}
            <div className="hidden md:block absolute left-1/2 transform -translate-x-1/2 w-6 h-6 bg-gradient-to-br from-violet-400 to-fuchsia-500 rounded-full border-4 border-gray-900 z-10 shadow-lg shadow-violet-500/40">
              <div className="absolute inset-0 bg-violet-400 rounded-full animate-ping opacity-75"></div>
            </div>

            {/* Card do projeto */}
            <div className={`w-full md:w-5/12 ${index % 2 === 0 ? 'md:pr-8' : 'md:pl-8'}`}>
              <motion.div
                whileHover={{ scale: 1.05, y: -10 }}
                className="relative group bg-gradient-to-br from-gray-800/90 to-gray-900/90 backdrop-blur-md p-4 md:p-6 rounded-2xl border border-violet-500/40 shadow-2xl overflow-hidden"
              >
                {/* Efeito holográfico */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-violet-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                
                {/* Linhas de scan */}
                <div className="absolute inset-0 opacity-20">
                  <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-violet-400 to-transparent"></div>
                  <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-fuchsia-400 to-transparent"></div>
                </div>

                <div className="relative z-10">
                  <div className="flex items-center gap-2 md:gap-3 mb-3 md:mb-4">
                    <FiCode className="text-violet-400 text-xl md:text-2xl" />
                    <h3 className="text-lg md:text-2xl font-bold text-white">{project.title}</h3>
                  </div>
                  
                  <p className="text-sm md:text-base text-gray-300 mb-3 md:mb-4 leading-relaxed">{project.description}</p>
                  
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.tags.map((tag, i) => (
                      <span
                        key={i}
                        className="px-3 py-1 bg-violet-500/20 text-violet-200 rounded-full text-sm border border-violet-500/40"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                  
                  <div className="flex flex-wrap gap-3">
                    {project.links?.demo &&
                      project.links.demo !== "#" &&
                      String(project.links.demo).trim() !== "" && (
                        <motion.a
                          href={project.links.demo}
                          target="_blank"
                          rel="noopener noreferrer"
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-violet-500 to-fuchsia-500 text-white rounded-lg font-semibold hover:shadow-lg hover:shadow-violet-500/30 transition-all"
                        >
                          <FiExternalLink />
                          Ver ao vivo
                        </motion.a>
                      )}
                    {project.links?.code && (
                      <motion.a
                        href={project.links.code}
                        target="_blank"
                        rel="noopener noreferrer"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="flex items-center gap-2 px-4 py-2 bg-gray-700 text-gray-300 rounded-lg font-semibold hover:bg-gray-600 transition-all border border-gray-600"
                      >
                        <FiGithub />
                        Código
                      </motion.a>
                    )}
                  </div>
                </div>
              </motion.div>
            </div>

            {/* Espaço vazio do outro lado */}
            <div className="hidden md:block w-5/12"></div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

