import axios from 'axios';
import apiURL from './api';

export const getCustomerList = function() {
  return axios.get(apiURL).then(response => {
    return response.data;
  })
}

export const postCustomer = function(newUser) {
  return axios.post(apiURL, newUser).then(res => res.data)
}

export const getCustomer = function(id) {
  return axios.get(apiURL + id).then(res => res.data)
}

export const updateCustomer = function(id, obj) {
  return axios.patch(apiURL + id, obj).then(customer => customer.data)
}

export const deleteCustomer = function(id) {
  return axios.delete(apiURL, id).then(res => res)
}
