import axios from 'axios'

const api = axios.create({
  baseURL: 'http://localhost:3001/api'
})

export const insertItem = payload => api.post('/item', payload)
export const getAllItems = () => api.get('/items')
export const updateItemById = (id, payload) => api.put(`/item/${id}`, payload)
export const deleteItemById = id => api.delete(`/item/${id}`)
export const getItemById = id => api.get(`/item/${id}`)
export const getNewestOrderDate = () => api.get('/newestOrderDate')
export const getOrderDates = () => api.get('/orderDates')
export const getItemsByDate = date => api.get(`/items/${date}`)
export const createManyItems = payload => api.post('/items', payload)
export const deleteManyItemsByDate = date => api.delete(`/items/${date}`)
export const createNewOrderDate = date => api.post(`/items/${date}`)
export const getPreviousOrders = (id, count) =>
  api.get(`/item/previousOrders/${id}/${count}`)
const apis = {
  insertItem,
  getAllItems,
  updateItemById,
  deleteItemById,
  getItemById,
  getNewestOrderDate,
  getOrderDates,
  getItemsByDate,
  createManyItems,
  deleteManyItemsByDate,
  createNewOrderDate,
  getPreviousOrders
}

export default apis