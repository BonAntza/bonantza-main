/**
 * Helper function to check if user is authenticated. 
 * @returns Boolean - True if authenticated, false otherwise.
 */
export const isAuthenticated = () => {
  const token = localStorage.getItem('authToken');
  if (!token) {
    return false;
  }

  try {
    const { exp } = JSON.parse(atob(token.split('.')[1]));
    return exp > Date.now() / 1000;
  } catch (error) {
    console.error('Failed to decode token:', error);
    return false;
  }
}