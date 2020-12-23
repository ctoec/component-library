import svgr from '@svgr/rollup';
import sass from 'rollup-plugin-sass';
import typescript from 'rollup-plugin-typescript2';
import url from '@rollup/plugin-url';
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
  plugins: [url(), svgr(), sass(), typescript()],
  external: ['react', 'react-dom'],
  inlineDynamicImports: true,
  // No need to copy images and scss bc we're including src in what is downloaded from npm
};
