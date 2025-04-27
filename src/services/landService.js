import axiosInstance from './axiosConfig';

export const landService = {
  getAllLands: async () => {
    try {
      const response = await axiosInstance.get('/lands/allLand');
      return response.data.data;
    } catch (error) {
      throw error;
    }
  },

  getLandById: async (id) => {
    try {
      const response = await axiosInstance.get(`/lands/${id}`);
      return response.data.data;
    } catch (error) {
      throw error;
    }
  },

  getLandUser: async (userId) => {
    try {
      const response = await axiosInstance.get(`/users/${userId}`);
      return response.data.data;
    } catch (error) {
      throw error;
    }
  },

  // Thêm các methods khác như createLand, updateLand, deleteLand...
}; 