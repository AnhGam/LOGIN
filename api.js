const SOCIAL_BASE_URL = 'http://blackntt.net:4321';

// --- Social App APIs ---
export const registerUser = async (userData) => {
  const response = await fetch(`${SOCIAL_BASE_URL}/register`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(userData),
  });
  return response.json();
};

export const loginUser = async (email, password) => {
  const response = await fetch(`${SOCIAL_BASE_URL}/login?email=${encodeURIComponent(email)}&password=${encodeURIComponent(password)}`, {
    method: 'POST',
  });
  return response.json();
};

export const getProfile = async (email) => {
  const response = await fetch(`${SOCIAL_BASE_URL}/profile/${encodeURIComponent(email)}`);
  return response.json();
};

export const getAllPosts = async () => {
  const response = await fetch(`${SOCIAL_BASE_URL}/posts`);
  return response.json();
};

export const createPost = async (postData) => {
  const response = await fetch(`${SOCIAL_BASE_URL}/posts`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(postData),
  });
  return response.json();
};

export const deletePostApi = async (postId) => {
  const response = await fetch(`${SOCIAL_BASE_URL}/posts/${postId}`, {
    method: 'DELETE',
  });
  return response.json();
};
