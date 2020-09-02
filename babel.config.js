module.exports = function (api) {
  api.cache(true);

  const presets = [
    '@babel/preset-env',
    '@babel/preset-react',
    '@babel/preset-typescript',
  ];
  const plugins = [
    'macros',
    '@babel/proposal-class-properties',
    '@babel/proposal-object-rest-spread',
  ];

  return {
    presets,
    plugins,
  };
};
