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
    svgr(),
    sass({ insert: true }),
    typescript(),
    copy({
      targets: [
        { src: 'src/assets/images/*.svg', dest: 'dist/assets/images' },
        { src: 'src/assets/images/*.png', dest: 'dist/assets/images' },
      ],
    }),
  ],
  external: ['react', 'react-dom'],
  inlineDynamicImports: true,
};
