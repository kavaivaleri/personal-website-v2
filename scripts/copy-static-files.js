import { copyFileSync, existsSync } from 'fs';
import { join } from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const rootDir = join(__dirname, '..');
const distDir = join(rootDir, 'dist', 'public');

// Copy CNAME file to dist
const cnameSource = join(rootDir, 'client', 'public', 'CNAME');
const cnameDest = join(distDir, 'CNAME');

if (existsSync(cnameSource)) {
  copyFileSync(cnameSource, cnameDest);
  console.log('✅ CNAME file copied to dist');
} else {
  console.warn('⚠️  CNAME file not found');
}

// Copy .nojekyll file to dist
const nojekyllSource = join(rootDir, 'client', 'public', '.nojekyll');
const nojekyllDest = join(distDir, '.nojekyll');

if (existsSync(nojekyllSource)) {
  copyFileSync(nojekyllSource, nojekyllDest);
  console.log('✅ .nojekyll file copied to dist');
}

console.log('✅ Static files ready for deployment');

