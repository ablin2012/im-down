import axios from 'axios';

export const getUser = (id) => {
    return axios.get(`/api/users/${id}`)
}

export const getCurrentUser = () => {
    return axios.get('/api/users/current')
}

export const getUserAchievements = id => {
    return axios.get(`/api/users/${id}/achievements`)
};

export const patchCurrentUser = () => {
    return axios.patch(`/api/users/current`)
};

export const deleteCurrentUser = () => {
    return axios.delete(`/api/users/current`)
};