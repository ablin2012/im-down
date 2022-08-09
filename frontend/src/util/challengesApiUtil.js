import axios from 'axios';

export const getChallenges = () => {
    return axios.get('/api/challenges')
};

export const getUserChallenges = id => {
    return axios.get(`/api/challenges/user/${id}`)
};

export const createChallenge = data => {
    axios.defaults.headers.common['Content-Type'] = "multipart/form-data";
    return axios.post('/api/challenges/', data)
}

export const getChallenge = (id) => {
    return axios.get(`/api/challenges/${id}`)
}

export const joinChallenge = (id) => {
    return axios.post(`/api/participations/challenge/${id}`)
}

export const leaveChallenge = (id) => {
    return axios.delete(`/api/participations/challenge/${id}`)
}

export const getChallengeParticipants = (challengeId) => {
    return axios.get(`/api/participations/challenge/${challengeId}`)
}

export const deleteChallenge = (id) => {
    return axios.delete(`/api/challenges/${id}`)
}

export const patchChallenge = (id, data) => {
    axios.defaults.headers.common['Content-Type'] = "multipart/form-data";
    console.log('dada', data)
    return axios.patch(`/api/challenges/${id}`, data)
}