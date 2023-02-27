const dynamicImportVars = require('@rollup/plugin-dynamic-import-vars');

module.exports = {
  preserveEntrySignatures: true,
  input: [
    './scripts/scripts.js',
    // is already imported by script.js.
    // There is no need to generate a bundle for it (ignoring 404.html)
    // './scripts/lib-franklin.js',
  ],
  output: {
    dir: 'target',
    format: 'esm',
    plugins: [
    ],
  },
  plugins: [
    dynamicImportVars(), // allows generating assets from import(`path/${var}.js`)
  ],
};
