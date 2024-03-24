/* eslint-disable */
import axios from 'axios';
import { showAlert } from './alerts';

// type is either 'password' or 'data'
export const updateSettings = async (data, type) => {
  try {
    const url =
      type === 'password'
        ? '/api/v1/users/updateMyPassword'
        : '/api/v1/users/updateMe';
    let headers = {
      'Content-Type': 'application/json'
    };
    if (type === 'data' && data && data.photo) {
      headers['Content-Type'] = 'multipart/form-data';
      const formData = new FormData();
      // Append each key-value pair from data to formData
      Object.entries(data).forEach(([key, value]) => {
        formData.append(key, value);
      });
      // Assign formData to data
      data = formData;
    }

    const res = await axios({
      headers,
      method: 'PATCH',
      url,
      data
    });

    if (res.data.status === 'success') {
      showAlert('success', `${type.toUpperCase()} updated successfully!`);
    }
  } catch (err) {
    showAlert('error', err.response.data.message);
  }
};
