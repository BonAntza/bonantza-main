export const checkAccess = async (authToken) => {
  const response = await fetch('./api/utilities/verifyToken', {
    headers: {
      'Authorization': authToken
    }
  });

  if (!response.ok) {
    throw new Error('Access denied!');
  }

  return true;
};