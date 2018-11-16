module.exports = {
    "extends": "airbnb",
    "rules": {
        "no-console": ["error", { "allow": ["info", "warn", "error"] }],
        "react/jsx-filename-extension": [1, { "extensions": [".js", ".jsx"] }],
        "class-methods-use-this": 0,
        "jsx-a11y/anchor-is-valid": 0,
        "jsx-a11y/label-has-for": 0,
        "react/forbid-prop-types": [1, { "forbid": ["any"] }],
        "import/prefer-default-export": "off",
    },
};