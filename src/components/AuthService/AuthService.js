// src\services\AuthService.js

const TOKEN_KEY = 'authToken';
let subscribers = [];

const notifySubscribers = () => {
  subscribers.forEach(callback => callback());
};

const AuthService = {
  getAccessToken: () => {
    return localStorage.getItem(TOKEN_KEY);
  },

  setTokens: (tokens) => {
    localStorage.setItem(TOKEN_KEY, tokens.access);
    notifySubscribers(); // Notify subscribers of login status change
  },

  clearTokens: () => {
    localStorage.removeItem(TOKEN_KEY);
    notifySubscribers(); // Notify subscribers of login status change
  },

  isLoggedIn: () => {
    return !!AuthService.getAccessToken();
  },

  subscribe: (callback) => {
    subscribers.push(callback); // Subscribe to login status changes
    return () => {
      subscribers = subscribers.filter(sub => sub !== callback); // Unsubscribe
    };
  }
};

export default AuthService;
