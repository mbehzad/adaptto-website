const fs = require('fs');

const dynamicImportVars = require('@rollup/plugin-dynamic-import-vars');
const terser = require('@rollup/plugin-terser');
const html = require('@rollup/plugin-html');

module.exports = {
  preserveEntrySignatures: true,
  input: [
    './scripts/scripts.js',
    // is already imported by script.js.
    // There is no need to generate a bundle for it (ignoring 404.html)
    // './scripts/lib-franklin.js',
  ],
  output: {
    dir: '.',
    entryFileNames: 'target/[name]-[hash].js', // entry
    chunkFileNames: 'target/[name]-[hash].js', // chunck
    assetFileNames: 'target/[name]-[hash][extname]', // e.g. .css
    format: 'esm',
    plugins: [
      terser(), // minifies the JS
      // generate head.html and fill the asset urls with the cache keys
      html({
        fileName: 'head.html',
        template: ({ files }) => {
          const template = fs.readFileSync('./head.html.template', { encoding: 'utf8' });
          const scriptsFileName = files.js.find((file) => file.name === 'scripts').fileName;
          // eslint-disable-next-line no-template-curly-in-string
          return template.replace('${scriptsFileName}', scriptsFileName);
        },
      }),
    ],
  },
  plugins: [
    dynamicImportVars(), // allows generating assets from import(`path/${var}.js`)
  ],
};
