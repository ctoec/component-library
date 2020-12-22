import peerDepsExternal from 'rollup-plugin-peer-deps-external';
import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import typescript from 'rollup-plugin-typescript2';
import postcss from 'rollup-plugin-postcss';
import svgr from '@svgr/rollup';
import json from '@rollup/plugin-json';
import url from '@rollup/plugin-url';
import copy from 'rollup-plugin-copy';

const packageJson = require('./package.json');

export default {
  input: 'src/index.ts',
  output: [
    {
      file: packageJson.main,
      format: 'cjs',
      sourcemap: true,
    },
    {
      file: packageJson.module,
      format: 'esm',
      sourcemap: true,
    },
  ],
  plugins: [
    // Don't include peer deps in bundle
    peerDepsExternal(),
    postcss({
      minimize: true,
      modules: true,
      extract: true,
      use: [['sass', { includePaths: ['src/components/_index.scss'] }]],
    }),
    url(),
    // Url + svgr allows us to import ReactComponent as SVGName and use it like a component
    svgr(),
    json(),
    copy({
      targets: [
        { src: 'src/assets/images/*.svg', dest: 'dist/assets/images' },
        { src: 'src/assets/images/*.png', dest: 'dist/assets/images' },
      ],
    }),
    // If true, the plugin will prefer built-in modules (e.g. fs, path)
    resolve({ preferBuiltins: true }),
    commonjs(),
    typescript({ useTsconfigDeclarationDir: true }),
  ],
  inlineDynamicImports: true,
};
