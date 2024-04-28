/**
 * Helper function to check if user is authenticated. 
 * @returns Boolean - True if authenticated, false otherwise.
 */
export const isAuthenticated = async () => {
  try {
    const authToken = localStorage.getItem('authToken');

    const response = await fetch('./api/utilities/verifyToken', {
      headers: {
        'Authorization': authToken
      }
    });
  
    if (!response.ok) {
      throw new Error('Access denied!');
    }
  
    return true;
  } catch (error) {
      return false;
  }
}