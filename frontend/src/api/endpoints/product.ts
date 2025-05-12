import apiClient from '../apiClient';

const productApi = {
  getAll: (params?: Record<string, string>) => apiClient.get('/products', { params }),
  getById: (id: number) => apiClient.get(`/products/${id}`),
  create: (productData: Record<string, unknown>) => apiClient.post('/products', productData),
  update: (id: number, productData: Record<string, string>) => apiClient.put(`/products/${id}`, productData),
  delete: (id: number) => apiClient.delete(`/products/${id}`),
};

export default productApi;