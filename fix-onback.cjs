const fs = require('fs');

const files = [
  'ResearchUniverse.tsx',
  'ResearchGapLab.tsx',
  'DataStreams.tsx',
  'MemoryChamber.tsx',
  'PresentationStudio.tsx'
];

files.forEach(file => {
  const path = `src/components/${file}`;
  let content = fs.readFileSync(path, 'utf8');
  
  content = content.replace(/export function (\w+)\(\) \{/, 'export function $1({ onBack }: { onBack?: () => void }) {');
  
  const backButton = `\n      {onBack && (
        <button onClick={onBack} className="fixed top-6 right-6 z-[100] px-4 py-2 bg-space-black/80 hover:bg-space-black border border-electric-cyan/30 text-electric-cyan rounded-xl hover:text-white transition-all duration-300 shadow-neon-cyan hover:shadow-deep-glow flex items-center gap-2 font-display font-bold backdrop-blur-md">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m12 19-7-7 7-7"/><path d="M19 12H5"/></svg>
          BACK
        </button>
      )}`;

  content = content.replace(/(<div[^>]*className="[^"]*"[^>]*>)/, `$1${backButton}`);
  
  fs.writeFileSync(path, content);
  console.log(`Updated ${file}`);
});
