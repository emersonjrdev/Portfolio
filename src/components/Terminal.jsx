import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { FiTerminal, FiCode } from 'react-icons/fi';

const commands = [
  { cmd: 'whoami', output: 'Emerson Morales Junior' },
  { cmd: 'skills', output: 'React, Node.js, TypeScript, Flutter, Spring Boot' },
  { cmd: 'projects', output: '8+ projetos completos' },
  { cmd: 'status', output: 'Disponível para novos projetos!' },
  { cmd: 'contact', output: 'contato.juniormorales@gmail.com' },
];

export default function Terminal() {
  const [input, setInput] = useState('');
  const [history, setHistory] = useState([
    { type: 'output', text: 'Bem-vindo ao terminal do portfólio!' },
    { type: 'output', text: 'Digite "help" para ver os comandos disponíveis.' },
  ]);
  const [showCursor, setShowCursor] = useState(true);
  const inputRef = useRef(null);
  const historyEndRef = useRef(null);

  useEffect(() => {
    const interval = setInterval(() => {
      setShowCursor(prev => !prev);
    }, 530);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    historyEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [history]);

  const handleCommand = (cmd) => {
    const command = cmd.toLowerCase().trim();
    
    if (command === 'help') {
      setHistory(prev => [
        ...prev,
        { type: 'input', text: cmd },
        { type: 'output', text: 'Comandos disponíveis:' },
        { type: 'output', text: '  whoami  - Mostra informações sobre mim' },
        { type: 'output', text: '  skills  - Lista minhas habilidades' },
        { type: 'output', text: '  projects - Mostra número de projetos' },
        { type: 'output', text: '  status  - Status atual' },
        { type: 'output', text: '  contact - Informações de contato' },
        { type: 'output', text: '  clear   - Limpa o terminal' },
        { type: 'output', text: '  help    - Mostra esta ajuda' },
      ]);
    } else if (command === 'clear') {
      setHistory([]);
    } else {
      const found = commands.find(c => c.cmd === command);
      if (found) {
        setHistory(prev => [
          ...prev,
          { type: 'input', text: cmd },
          { type: 'output', text: found.output },
        ]);
      } else {
        setHistory(prev => [
          ...prev,
          { type: 'input', text: cmd },
          { type: 'output', text: `Comando não encontrado: ${cmd}. Digite "help" para ajuda.` },
        ]);
      }
    }
    
    setInput('');
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (input.trim()) {
      handleCommand(input);
    }
  };

  return (
    <div className="w-full bg-gray-900 rounded-2xl overflow-hidden border-2 border-teal-500/50 shadow-2xl font-mono">
      {/* Header do terminal */}
      <div className="bg-gray-800 px-3 md:px-4 py-2 flex items-center gap-2 border-b border-gray-700">
        <div className="flex gap-2">
          <div className="w-3 h-3 rounded-full bg-red-500"></div>
          <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
          <div className="w-3 h-3 rounded-full bg-green-500"></div>
        </div>
        <div className="flex items-center gap-2 ml-4">
          <FiTerminal className="text-teal-400" />
          <span className="text-gray-300 text-sm font-semibold">Terminal Portfolio</span>
        </div>
      </div>

      {/* Conteúdo do terminal */}
      <div className="p-3 md:p-4 h-[300px] md:h-[400px] overflow-y-auto bg-gray-900 text-green-400 text-xs md:text-sm">
        {history.map((item, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            className="mb-2"
          >
            {item.type === 'input' ? (
              <div className="flex items-center gap-2">
                <span className="text-teal-400">$</span>
                <span>{item.text}</span>
              </div>
            ) : (
              <div className="text-gray-300">{item.text}</div>
            )}
          </motion.div>
        ))}
        <div ref={historyEndRef} />
      </div>

      {/* Input do terminal */}
      <form onSubmit={handleSubmit} className="bg-gray-800 px-3 md:px-4 py-2 md:py-3 border-t border-gray-700">
        <div className="flex items-center gap-2">
          <FiCode className="text-teal-400" />
          <span className="text-teal-400">$</span>
          <input
            ref={inputRef}
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="flex-1 bg-transparent text-green-400 outline-none"
            placeholder="Digite um comando..."
            autoFocus
          />
          <span className={`text-green-400 ${showCursor ? 'opacity-100' : 'opacity-0'}`}>
            ▊
          </span>
        </div>
      </form>
    </div>
  );
}

