import { spawn } from 'child_process';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

console.log('🚀 Starting COLLABRIX Full Stack Environment...');

// 1. Start Server on port 5000
const serverProcess = spawn('cmd', ['/c', 'npm', 'run', 'dev'], {
  cwd: path.join(__dirname, 'server'),
  stdio: 'inherit',
  shell: true,
});

// 2. Start Client on port 5173
const clientProcess = spawn('cmd', ['/c', 'npm', 'run', 'dev'], {
  cwd: path.join(__dirname, 'client'),
  stdio: 'inherit',
  shell: true,
});

process.on('SIGINT', () => {
  console.log('\n🛑 Shutting down COLLABRIX processes...');
  serverProcess.kill();
  clientProcess.kill();
  process.exit(0);
});
