import axios from 'axios'
import { baseUrl } from '../helpers/constants'
axios.defaults.withCredentials = true

const getSummary = (token) => {
  return axios.get(`${baseUrl}/pagos/summary`, { headers: { 'Authorization': `Bearer ${token}` }})
}

const getAll = async (token) => {
  const getAllUrl = `${baseUrl}/pagos`
  const authHeader = { 'Authorization': `Bearer: ${token}` }
  const response = await axios.get(getAllUrl,{ headers: authHeader })

  return response.data
}

const add = async (pago, token) => {
  const addUrl = `${baseUrl}/pagos`
  const authHeader = { 'Authorization': `Bearer: ${token}`, 'Content-Type': 'application/json', }
  const response = await axios.post(addUrl, pago, { headers: authHeader })

  return response.data.added
}

const remove = async (id, token) => {
  const removeUrl = `${baseUrl}/pagos/${id}`
  const authHeader = { 'Authorization': `Bearer: ${token}` }
  const response = await axios.delete(removeUrl, { headers: authHeader })
  return response.data.deleted
}

const update = async (id, newPago, token) => {
  const updateUrl = `${baseUrl}/pagos/${id}`
  const authHeader = { 'Authorization': `Bearer: ${token}`, 'Content-Type': 'application/json', }
  const response = await axios.put(updateUrl, newPago, { headers: authHeader })
  return response.data.updated
}


export default {
  getSummary,
  getAll,
  add,
  remove,
  update,
}