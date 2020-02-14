module.exports = {
  extends: [
    "react-app",
    "airbnb", 
    "plugin:jsx-a11y/recommended", 
  ],
  plugins: ["jsx-a11y", "prettier"],
  rules: {
    "react/jsx-filename-extension": [1, { "extensions": [".js", ".jsx"] }],
  }
}