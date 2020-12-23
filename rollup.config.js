import svgr from '@svgr/rollup';
import sass from 'rollup-plugin-sass';
import typescript from 'rollup-plugin-typescript2';
import url from '@rollup/plugin-url';
import copy from 'rollup-plugin-copy';

import pkg from './package.json';
export default {
  input: 'src/index.ts',
  output: [
    {
      file: pkg.main,
      format: 'cjs',
      exports: 'named',
      sourcemap: true,
      strict: false,
    },
  ],
  plugins: [
    url(),
    svgr({ output: 'dist/assets/styles/index.scss' }),
    sass(),
    typescript({ objectHashIgnoreUnknownHack: true }),
    copy({
      targets: [{ src: 'src', dest: 'dist/src' }],
    }),
  ],
  external: ['react', 'react-dom'],
  inlineDynamicImports: true,
};
