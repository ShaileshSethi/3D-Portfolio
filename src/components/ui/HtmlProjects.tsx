import { Scroll } from '@react-three/drei';
import { PORTFOLIO_DATA } from '../../data/portfolio';

export function HtmlProjects() {
  return (
    <Scroll html style={{ width: '100%', height: '100%' }}>
      {/* 
        We use a wrapper to offset the start of the projects.
        The first 100vh (page 0) is reserved for the Hero section.
      */}
      <div className="w-full flex flex-col pt-[100vh]">
        {PORTFOLIO_DATA.projects.map((project, index) => {
          const imageUrl = `https://picsum.photos/seed/${project.id}/400/200`;

          return (
            <div
              key={project.id}
              className="w-full h-screen flex items-center justify-start pl-8 md:pl-24"
            >
              <div
                className="w-96 flex flex-col text-aluminum bg-black/60 border border-white/20 backdrop-blur-xl rounded-2xl shadow-2xl overflow-hidden pointer-events-auto"
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
              </div>
            </div>
          );
        })}
      </div>
    </Scroll>
  );
}
