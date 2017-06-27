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
