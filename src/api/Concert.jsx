import axios from "axios";

export const createConcert = async (token, form) => {
    return axios.post('http://localhost:5000/api/concert', form, {
        headers:{
            Authorization:`Bearer ${token}`
        }
    })
}
export const listAllConcert = async () => {
    return axios.get('http://localhost:5000/api/concerts')
}

export const listConcert = async (count = 12) => {
    // code bod
    return axios.get('http://localhost:5000/api/concerts/' + count)
}

export const searchFilters = async (arg) => {
    // code bod
    return axios.post('http://localhost:5000/api/search/filters',arg)
}

export const readConcert = async (id) => {
    return axios.get(`http://localhost:5000/api/concert/${id}`)
        
}

export const countConcert = async (token) => {
    return axios.get('http://localhost:5000/api/concertCounts', {
        headers:{
            Authorization:`Bearer ${token}`
        }
    })
}

export const topSellingConcerts = async (token) => {
    return axios.get('http://localhost:5000/api/top-selling-concerts', {
        headers:{
            Authorization:`Bearer ${token}`
        }
    })
}

export const uploadPoster = async (token, form) => {
    // console.log('from api frontend', formConcert)
    return axios.post('http://localhost:5000/api/poster', {
        image: form
    }, {
        headers:{
            Authorization:`Bearer ${token}`
        }
    })
}
export const readPoster = async (concertId) => {
    return axios.get(`http://localhost:5000/api/poster/${concertId}`)
}
export const getSuggestConcert = async (count = 10) =>{
    return axios.get('http://localhost:5000/api/suggestConcert/'+ count)
}
export const removePoster = async (token, public_id) => {
    // console.log('from api frontend', formConcert)
    return axios.post('http://localhost:5000/api/removeposter', {
        public_id
    }, {
        headers:{
            Authorization:`Bearer ${token}`
        }
    })
}
export const updateConcert = async (token, id, form) => {
    // code body
    return axios.put(`http://localhost:5000/api/concert/${id}`, form,{
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
}

export const deleteConcert = async (token, id) => {
    // code body
    return axios.delete(`http://localhost:5000/api/concert/${id}`, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
}