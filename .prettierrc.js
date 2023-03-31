module.exports = {
  semi: false,
  singleQuote: true,
  trailingComma: 'none',
  printWidth: 120,
  plugins: [require('prettier-plugin-tailwindcss')],
  tailwindConfig: './tailwind.config.js'
}
