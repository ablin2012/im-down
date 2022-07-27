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

export const getChallenge = challengeId => {
    return axios.get(`/api/challenges/${challengeId}`)
}