module.exports = {
  extends: [
    "react-app",
    "airbnb", 
    "plugin:jsx-a11y/recommended", 
  ],
  plugins: ["jsx-a11y", "prettier"],
  rules: {
    "react/jsx-filename-extension": [1, { "extensions": [".js", ".jsx"] }],
    "react/state-in-constructor": [1, "never"]
  }
}