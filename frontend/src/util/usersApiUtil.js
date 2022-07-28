import axios from 'axios';

export const getUser = (id) => {
    return axios.get(`/api/users/${id}`)
}

export const getCurrentUser = () => {
    return axios.get('/api/users/current')
}

export const getUserParticipations = (id) => {
    return axios.get(`/api/participations/user/${id}`)
}

export const getUserAchievements = id => {
    return axios.get(`/api/users/${id}/achievements`)
};

export const patchCurrentUser = (user) => {
    axios.defaults.headers.common['Content-Type'] = "multipart/form-data";
    return axios.patch(`/api/users/current`, user)
};

export const deleteCurrentUser = () => {
    return axios.delete(`/api/users/current`)
};

export const getUserFriendships = (id) => {
    return axios.get(`/api/users/${id}/friendships`)
};

export const getCurrentUserIncomingFriendRequests = () => {
    return axios.get(`/api/users/current/friendshipRequests/incoming`)
};

export const getCurrentUserOutgoingFriendRequests = () => {
    return axios.get(`/api/users/current/friendshipRequests/outgoing`)
};

export const sendFriendRequest = (id) => {
    return axios.post(`/api/users/${id}/friendshipRequests`)
};

export const unsendFriendRequest = (id) => {
    return axios.delete(`/api/users/${id}/friendshipRequests`)
};

export const respondToFriendRequest = (friendRequestId, response) => {
    return axios.delete(`/api/users/current/friendshipRequest/incoming/${friendRequestId}/${response}`)
};