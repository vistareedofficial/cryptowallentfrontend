class AuthService {
  static subscribers = [];

  static setTokens(accessToken, refreshToken) {
    console.log('Setting tokens:', accessToken, refreshToken);  // Debugging log
    localStorage.setItem('access_token', accessToken);
    localStorage.setItem('refresh_token', refreshToken);
    this.notifySubscribers();
  }

  static clearTokens() {
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
    this.notifySubscribers();
  }

  static getAccessToken() {
    return localStorage.getItem('access_token');
  }

  static getRefreshToken() {
    return localStorage.getItem('refresh_token');
  }

  static isLoggedIn() {
    const token = localStorage.getItem('access_token');
    if (!token) return false;

    try {
      const payload = this.decodeToken(token);
      const isExpired = payload.exp * 1000 < Date.now();
      return !isExpired;
    } catch (err) {
      console.error('Invalid token:', err);
      return false;
    }
  }

  static decodeToken(token) {
    try {
      return JSON.parse(atob(token.split('.')[1]));
    } catch (err) {
      console.error('Error decoding token:', err);
      return null;
    }
  }

  static getUserId() {
    const token = this.getAccessToken();
    if (token) {
      const decoded = this.decodeToken(token);
      return decoded ? decoded.user_id : null;
    }
    return null;
  }

  static subscribe(callback) {
    this.subscribers.push(callback);
    return () => {
      this.subscribers = this.subscribers.filter((cb) => cb !== callback);
    };
  }

  static notifySubscribers() {
    this.subscribers.forEach((cb) => cb(this.isLoggedIn()));
  }
}

export default AuthService;
