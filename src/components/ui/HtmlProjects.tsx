import { Scroll } from '@react-three/drei';
import { motion } from 'framer-motion';
import { PORTFOLIO_DATA } from '../../data/portfolio';

export function HtmlProjects() {
  const renderRightPanel = (index: number) => {
    switch (index) {
      case 0: // About
        return (
          <motion.div
            className="w-full max-w-md md:w-96 flex flex-col text-aluminum bg-black/70 rounded-2xl shadow-[0_0_15px_rgba(255,255,255,0.05)] p-8"
            whileHover={{ scale: 1.02, rotateY: -5, rotateX: 2, boxShadow: '0 20px 40px rgba(0,0,0,0.5), 0 0 30px rgba(136,136,255,0.2)' }}
            transition={{ type: 'spring', stiffness: 300, damping: 20 }}
          >
            <h2 className="text-3xl font-syne text-white font-bold mb-4">{PORTFOLIO_DATA.about.title}</h2>
            <p className="text-aluminum-dim leading-relaxed mb-6">{PORTFOLIO_DATA.about.coreMessage}</p>
            <div className="mb-4">
              <h4 className="text-sm font-bold text-white mb-2 uppercase tracking-widest">Focus Areas</h4>
              <div className="flex gap-2">
                {PORTFOLIO_DATA.about.focusAreas.map(area => (
                  <span key={area} className="px-3 py-1 text-xs font-mono bg-white/10 text-white rounded-full">{area}</span>
                ))}
              </div>
            </div>
            <p className="text-sm text-aluminum-dim/80 italic border-l-2 border-white/20 pl-4">
              "{PORTFOLIO_DATA.about.positioning}"
            </p>
          </motion.div>
        );
      case 1: // Achievements
        return (
          <motion.div
            className="w-full max-w-md md:w-96 flex flex-col text-aluminum bg-black/70 rounded-2xl shadow-[0_0_15px_rgba(255,255,255,0.05)] p-8"
            whileHover={{ scale: 1.02, rotateY: -5, rotateX: 2, boxShadow: '0 20px 40px rgba(0,0,0,0.5), 0 0 30px rgba(136,136,255,0.2)' }}
            transition={{ type: 'spring', stiffness: 300, damping: 20 }}
          >
            <h2 className="text-3xl font-syne text-white font-bold mb-6">Achievements</h2>
            <ul className="space-y-4">
              {PORTFOLIO_DATA.achievements.map((ach, i) => {
                const parts = ach.split(' - ');
                return (
                  <li key={i} className="flex flex-col border-b border-white/10 pb-2 last:border-0">
                    <span className="font-bold text-white text-sm">{parts[0]}</span>
                    {parts[1] && <span className="text-xs text-walnut-light uppercase tracking-wider mt-1">{parts[1]}</span>}
                  </li>
                );
              })}
            </ul>
          </motion.div>
        );
      case 2: // Skills
        return (
          <motion.div
            className="w-full max-w-md md:w-96 flex flex-col text-aluminum bg-black/70 rounded-2xl shadow-[0_0_15px_rgba(255,255,255,0.05)] p-8"
            whileHover={{ scale: 1.02, rotateY: -5, rotateX: 2, boxShadow: '0 20px 40px rgba(0,0,0,0.5), 0 0 30px rgba(136,136,255,0.2)' }}
            transition={{ type: 'spring', stiffness: 300, damping: 20 }}
          >
            <h2 className="text-3xl font-syne text-white font-bold mb-6">Arsenal</h2>
            <div className="space-y-6">
              {PORTFOLIO_DATA.skills.map((skillGroup, i) => (
                <div key={i}>
                  <h4 className="text-sm font-bold text-walnut-light mb-3 uppercase tracking-widest">{skillGroup.category}</h4>
                  <div className="flex flex-wrap gap-2">
                    {skillGroup.items.map(skill => (
                      <span key={skill} className="px-3 py-1 text-xs font-mono bg-white/5 border border-white/10 text-white rounded-md">
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        );
      case 3: // Contact
        return (
          <motion.div
            className="w-full max-w-md md:w-96 flex flex-col text-aluminum bg-black/70 rounded-2xl shadow-[0_0_15px_rgba(255,255,255,0.05)] p-8"
            whileHover={{ scale: 1.02, rotateY: -5, rotateX: 2, boxShadow: '0 20px 40px rgba(0,0,0,0.5), 0 0 30px rgba(136,136,255,0.2)' }}
            transition={{ type: 'spring', stiffness: 300, damping: 20 }}
          >
            <h2 className="text-3xl font-syne text-white font-bold mb-6">Initialize Connection</h2>
            <div className="flex flex-col gap-4 mb-8">
              <a href={`mailto:${PORTFOLIO_DATA.contact.email}`} className="flex items-center gap-3 p-4 bg-white/5 border border-white/10 rounded-xl hover:bg-white/10 transition-colors">
                <span className="text-xl">✉️</span>
                <span className="font-mono text-sm tracking-wide">{PORTFOLIO_DATA.contact.email}</span>
              </a>
              <a href={PORTFOLIO_DATA.contact.linkedin} target="_blank" rel="noreferrer" className="flex items-center gap-3 p-4 bg-white/5 border border-white/10 rounded-xl hover:bg-white/10 transition-colors">
                <span className="text-xl">👔</span>
                <span className="font-mono text-sm tracking-wide">LinkedIn</span>
              </a>
              <a href={PORTFOLIO_DATA.contact.github} target="_blank" rel="noreferrer" className="flex items-center gap-3 p-4 bg-white/5 border border-white/10 rounded-xl hover:bg-white/10 transition-colors">
                <span className="text-xl">💻</span>
                <span className="font-mono text-sm tracking-wide">GitHub</span>
              </a>
            </div>
            <div className="mt-auto pt-6 border-t border-white/10 text-center">
              <p className="text-xs text-aluminum-dim font-mono">{PORTFOLIO_DATA.contact.footer}</p>
            </div>
          </motion.div>
        );
      default:
        return <div className="w-96" />; // Empty spacer
    }
  };

  return (
    <Scroll html style={{ width: '100%', height: '100%' }}>
      {/* 
        We use a wrapper to offset the start of the projects.
        The first 100vh (page 0) is reserved for the Hero section.
      */}
      <div className="w-full flex flex-col pt-[100vh]">
        {PORTFOLIO_DATA.projects.map((project, index) => {
          const imageUrl = `https://picsum.photos/seed/${project.id}/400/200`;
          const isEven = index % 2 === 0;

          return (
            <motion.div
              key={project.id}
              className={`w-full h-screen flex flex-col items-center justify-center md:justify-between px-4 md:px-16 lg:px-24 gap-8 md:gap-0 ${isEven ? 'md:flex-row' : 'md:flex-row-reverse'}`}
              style={{ perspective: 1000 }}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false, margin: "-25% 0px -25% 0px" }}
              transition={{ duration: 0.5, ease: 'easeOut' }}
            >
              <motion.div
                className="w-full max-w-md md:w-96 flex flex-col text-aluminum bg-black/70 rounded-2xl shadow-[0_0_15px_rgba(255,255,255,0.05)] overflow-hidden pointer-events-auto"
                whileHover={{
                  scale: 1.02,
                  rotateY: isEven ? 5 : -5,
                  rotateX: 2,
                  boxShadow: '0 20px 40px rgba(0,0,0,0.5), 0 0 30px rgba(136,136,255,0.2)'
                }}
                onMouseEnter={() => window.dispatchEvent(new CustomEvent('bot-action', { detail: { active: true, text: `Scanning ${project.title}...` } }))}
                onMouseLeave={() => window.dispatchEvent(new CustomEvent('bot-action', { detail: { active: false, text: 'Welcome to my portfolio!' } }))}
              >
                {/* Image Header with Title and Badge */}
                <div
                  className="w-full h-48 relative flex items-end p-4"
                  style={{
                    backgroundImage: `url(${imageUrl})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center'
                  }}
                >
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />

                  {project.result && (
                    <div className="absolute top-4 right-4 px-2 py-1 bg-black/50 backdrop-blur-md border border-white/20 text-walnut-light text-xs font-bold uppercase tracking-wider rounded">
                      {project.result}
                    </div>
                  )}

                  <h3 className="relative text-3xl font-syne text-white font-bold drop-shadow-lg">
                    {project.title}
                  </h3>
                </div>

                {/* Content Body */}
                <div className="p-6 flex flex-col gap-4">
                  <p className="text-sm text-aluminum-dim leading-relaxed">
                    {project.summary}
                  </p>

                  <div className="flex flex-wrap gap-2 mt-2">
                    {project.stack.map(tech => (
                      <span key={tech} className="px-3 py-1 text-xs font-mono bg-white/5 border border-white/10 text-white rounded-full">
                        {tech}
                      </span>
                    ))}
                  </div>

                  <div className="flex gap-6 mt-4">
                    {project.links.map(link => (
                      <a
                        key={link.label}
                        href={link.url}
                        target="_blank"
                        rel="noreferrer"
                        className="text-sm font-medium text-white border-b border-transparent hover:border-white transition-all"
                      >
                        {link.label}
                      </a>
                    ))}
                  </div>
                </div>
              </motion.div>

              {/* PERSONAL INFO CARD */}
              <div className="pointer-events-auto">
                {renderRightPanel(index)}
              </div>

            </motion.div>
          );
        })}
      </div>
    </Scroll>
  );
}
