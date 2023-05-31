module.exports = {
  semi: false,
  singleQuote: true,
  trailingComma: 'none',
  printWidth: 80,
  plugins: [require('prettier-plugin-tailwindcss')],
  tailwindConfig: './tailwind.config.js'
}
