import axios from "axios";

export const createUserCart = async (token, cart) => {
    // code body
    return axios.post('http://localhost:5000/api/user/cart', cart, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
}

export const listUserCart = async (token) => {
    // code body
    return axios.get('http://localhost:5000/api/user/cart',  {
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
}

export const saveOrder = async (token, payload) => {
    // code body
    return axios.post("http://localhost:5000/api/user/order", payload, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  };

  export const getOrders = async (token, id) => {
    return axios.get(`http://localhost:5000/api/user/order/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  };
  

  export const getGroupOrders = async (token) => {
    // code body
    return axios.get("http://localhost:5000/api/user/grouped-orders", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  };
/* export const readUser = async (id, token) => {
    try {
        const response = await axios.get(`http://localhost:5000/api/user/${id}`, {
            headers: { Authorization: `Bearer ${token}` },
        });
        return response.data;
    } catch (err) {
        console.error("Error fetching user data:", err);
        throw err;
    }
}; */
export const uploadProfile = async (token, form) => {
  // console.log('from api frontend', formConcert)
  return axios.post('http://localhost:5000/api/profile', {
      image: form
  }, {
      headers:{
          Authorization:`Bearer ${token}`
      }
  })
}
export const uploadProfile2 = async (token, form) => {
  // console.log('from api frontend', formConcert)
  return axios.post('http://localhost:5000/api/uploadprofile', {
      image: form
  }, {
      headers:{
          Authorization:`Bearer ${token}`
      }
  })
}
export const removeProfile = async (token, public_id) => {
  // console.log('from api frontend', formConcert)
  return axios.post('http://localhost:5000/api/removeprofile', {public_id}, {
      headers:{
          Authorization:`Bearer ${token}`
      }
  })
}

export const readProfile = async (userId) => {
  return axios.get(`http://localhost:5000/api/profile/${userId}`)
}