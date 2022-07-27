import axios from 'axios';

export const getChallenges = () => {
    return axios.get('/api/challenges')
};

export const getUserChallenges = id => {
    return axios.get(`/api/challenges/user/${id}`)
};

export const createChallenge = data => {
    console.log(data)
    return axios({
        method: 'post',
        url: '/api/challenges/',
        data: data,
        config: { headers: { "content-type": "multipart/form-data"}}
    })
}