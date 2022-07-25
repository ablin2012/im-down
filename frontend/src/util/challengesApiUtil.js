import axios from 'axios';

export const getChallenges = () => {
    return axios.get('/api/challenges')
};

export const getUserChallenges = id => {
    return axios.get(`/api/challenges/user/${id}`)
};

export const createChallenge = data => {
    return axios.post('/api/challenges/', data)
}