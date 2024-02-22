// src\services\AuthService.js

const TOKEN_KEY = 'authToken';

const AuthService = {
  getAccessToken: () => {
    return localStorage.getItem(TOKEN_KEY);
  },

  setTokens: (tokens) => {
    localStorage.setItem(TOKEN_KEY, tokens.access);
  },

  clearTokens: () => {
    localStorage.removeItem(TOKEN_KEY);
  },

  isLoggedIn: () => {
    return !!AuthService.getAccessToken();
  },
};

export default AuthService;
