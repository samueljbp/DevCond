module.exports = {
    root: true,
    extends: ['airbnb-base', 'prettier', '@react-native-community'],
    parserOptions: {
        ecmaVersion: 12,
        sourceType: 'module',
    },
    rules: {
        'prettier/prettier': 'error',
    },
    plugins: ['prettier'],
};
