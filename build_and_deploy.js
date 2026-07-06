const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const distDir = path.join(__dirname, 'dist');

// Clean and create dist
if (fs.existsSync(distDir)) {
  fs.rmSync(distDir, { recursive: true, force: true });
}
fs.mkdirSync(distDir);

// List of ignored items
const ignoreList = [
  '.git',
  '.agents',
  '.netlify',
  'dist',
  'node_modules',
  '.gitignore',
  'deploy_log.txt',
  'build_and_deploy.js',
  'deploy.js',
  'server.js',
  'yarn_fork',       // excluded from normal copy — promoted below
  'guideuk.txt'
];

function shouldIgnore(name) {
  if (ignoreList.includes(name)) return true;
  if (name.endsWith('.md') || name.endsWith('.log')) return true;
  return false;
}

// Copy recursively
function copyRecursive(src, dest) {
  const stat = fs.statSync(src);
  if (stat.isDirectory()) {
    fs.mkdirSync(dest, { recursive: true });
    const entries = fs.readdirSync(src);
    for (let entry of entries) {
      if (shouldIgnore(entry)) continue;
      copyRecursive(path.join(src, entry), path.join(dest, entry));
    }
  } else {
    fs.copyFileSync(src, dest);
  }
}

// Start copying base files
const rootEntries = fs.readdirSync(__dirname);
for (let entry of rootEntries) {
  if (shouldIgnore(entry)) continue;
  copyRecursive(path.join(__dirname, entry), path.join(distDir, entry));
}

// Promote yarn_fork files to root (overwrite index.html, game.js & olddialogue.json)
const forkDir = path.join(__dirname, 'yarn_fork');
if (fs.existsSync(forkDir)) {
  const forkFiles = ['index.html', 'game.js', 'olddialogue.json'];
  for (const file of forkFiles) {
    const src = path.join(forkDir, file);
    if (fs.existsSync(src)) {
      fs.copyFileSync(src, path.join(distDir, file));
      console.log(`  ✔ Promoted yarn_fork/${file} → dist/${file}`);
    }
  }

  // Patch index.html for root-level deployment
  const distIndex = path.join(distDir, 'index.html');
  let html = fs.readFileSync(distIndex, 'utf-8');

  // Remove <base href="../"> — it was needed when running from a subdirectory
  html = html.replace(/<base\s+href="[^"]*"\s*\/?>/gi, '');

  // Fix script src: yarn_fork/game.js → game.js (now at root)
  html = html.replace(/src="yarn_fork\/game\.js/g, 'src="game.js');

  // Cache busting: update ?v=... queries to use build timestamp
  const buildVersion = Date.now();
  html = html.replace(/(game\.js|style\.css)\?v=[a-zA-Z0-9.-]+/gi, `$1?v=${buildVersion}`);

  fs.writeFileSync(distIndex, html, 'utf-8');
  console.log(`  ✔ Patched dist/index.html (removed <base>, fixed paths, cache busted v=${buildVersion})`);

  // Patch game.js to load olddialogue.json from root instead of yarn_fork subdirectory
  const distGame = path.join(distDir, 'game.js');
  if (fs.existsSync(distGame)) {
    let js = fs.readFileSync(distGame, 'utf-8');
    js = js.replace(/fetch\(['"]yarn_fork\/olddialogue\.json['"]\)/g, "fetch('olddialogue.json')");
    fs.writeFileSync(distGame, js, 'utf-8');
    console.log('  ✔ Patched dist/game.js (updated olddialogue.json fetch path)');
  }
}

console.log('Dist build complete. Running Netlify deploy...');
try {
  const output = execSync('npx netlify deploy --prod --dir=dist', { encoding: 'utf-8' });
  console.log(output);
} catch (err) {
  console.error('Deploy failed:', err.message);
  console.error(err.stdout || err.stderr || '');
  process.exit(1);
}
