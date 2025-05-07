export const getCurrentUserId = () => {
  try {
    const userData = localStorage.getItem('user');
    if (!userData) return null;

    const parsedUser = JSON.parse(userData);
    return parsedUser?.id || null;
  } catch (e) {
    console.error('Error parsing user from localStorage:', e);
    return null;
  }
};
