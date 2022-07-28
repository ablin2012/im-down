import axios from 'axios';

export const getPosts = () => {
    return axios.get('/api/posts')
}

export const getUserPosts = (id) => {
    return axios.get(`/api/posts/user/${id}`)
}

export const getChallengePosts = (id) => {
    return axios.get(`/api/posts/challenge/${id}`)
}

export const createPost = ({post, challengeId}) => {
    axios.defaults.headers.common['Content-Type'] = "multipart/form-data";
    return axios.post(`/api/posts/challenge/${challengeId}`, post)
}