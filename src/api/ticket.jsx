import axios from "axios";

export const createTicket = async (token, form) => {
    return axios.post('http://localhost:5000/api/ticket', form, {
        headers:{
            Authorization:`Bearer ${token}`
        }
    })
}

export const listTicket = async (concertId) => {
    return axios.get(`http://localhost:5000/api/tickets/${concertId}`)
}

export const soldTicket = async (token) => {
    return axios.get('http://localhost:5000/api/ticketsSold', {
        headers:{
            Authorization:`Bearer ${token}`
        }
    })
}
export const updatedTicket = async (token, id, formTickets) => {
    // code body
    return axios.put(`http://localhost:5000/api/ticket/${id}`, formTickets,{
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
}