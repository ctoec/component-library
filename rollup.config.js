import svgr from '@svgr/rollup';
import scss from 'rollup-plugin-scss';
import typescript from 'rollup-plugin-typescript2';
import url from '@rollup/plugin-url';
import pkg from './package.json';
import copy from 'rollup-plugin-copy';

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
    scss({
      output: true,
      failOnError: true,
      includePaths: [
        './node_modules',
        'node_modules/',
        './src/_index.scss',
        './src/assets/styles.index.scss',
      ],
    }),
    copy({
      targets: [
        { src: ['src/assets/images/*.svg', 'src/assets/images/*.png'], dest: 'dist/assets/images' },
      ],
    }),
    typescript(),
  ],
  external: ['react', 'react-dom'],
  inlineDynamicImports: true,
};
