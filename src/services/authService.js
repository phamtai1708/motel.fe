import axiosInstance from './axiosConfig';

const getUserData = async (userId) => {
  const token = localStorage.getItem('token');
  if (!userId || !token) throw new Error('Chưa đăng nhập');
  const response = await fetch(`https://motel-be.onrender.com/api/v1/users/${userId}`, {
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
  });
  if (!response.ok) throw new Error('Không thể lấy dữ liệu người dùng');
  return await response.json();
};

export const authService = {
  login: async (credentials) => {
    try {
      const response = await axiosInstance.post('/users/login', credentials);
      if (response.status === 200) {
        // Lưu token và thông tin user vào localStorage
        localStorage.setItem('token', response.data.accessToken);
        localStorage.setItem('refreshToken', response.data.refreshToken);
        localStorage.setItem('user', JSON.stringify(response.data.data));
      }
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  register: async (userData) => {
    try {
      const response = await axiosInstance.post('/users/register', userData);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  logout: () => {
    localStorage.removeItem('token');
    localStorage.removeItem('refreshToken');
    localStorage.removeItem('user');
  },

  getFavorites: async () => {
    const user = JSON.parse(localStorage.getItem('user'));
    const response = await axiosInstance.get(`/users/${user.userId}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    });
    console.log(response.data.data.favorite)
    return response.data.data.favorite;
  },

  removeFavorite: async (roomId) => {
    const user = JSON.parse(localStorage.getItem('user'));
    const response = await axiosInstance.delete(`/users/${user._id}/favorites/${roomId}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    });
    return response;
  },

  getSuggestedRooms: async () => {
    const response = await axiosInstance.get('/rooms/suggested', {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    });
    return response;
  },

  getSuggestedLands: async () => {
    const response = await axiosInstance.get('/lands/suggested', {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    });
    return response;
  },

  getUserData,
}; 