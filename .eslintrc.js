module.exports = {
  env: {
    // las variables de ambiente
    browser: true,
    amd: true,
    node: true,
    es6: true,
  },
  extends: [
    // para extender plugins que hemos instalado
    'eslint:recommended', // la parte de eslint que nos recomienda
    'plugin:jsx-a11y/recommended', // este plugin es toda la parte de accesibilidad
    'plugin:prettier/recommended', // parte recomendada
    'next', //
    'next/core-web-vitals', // gagrantiza que tengamos todos los elementos
  ],
  rules: {
    semi: ['error', 'always'],
  },
};
