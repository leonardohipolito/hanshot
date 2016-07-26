const packager = require('electron-packager');

const pkg = require('./package.json');

const devDeps = Object.keys(pkg.devDependencies);

const ignoreDirs = [
  '^/test($|/)',
  '^/tmp($|/)',
];

const ignoreDeps = devDeps.map(name => `/node_modules/${name}($|/)`);

const options = {
  arch: 'x64',
  dir: __dirname,
  platform: 'linux',
  ignore: ignoreDirs.concat(ignoreDeps),
  overwrite: true,
};

packager(options, (err, appPaths) => {
  if (err) throw err;

  console.log(appPaths);
});
