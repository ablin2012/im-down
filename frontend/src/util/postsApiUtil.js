import axios from 'axios';

export const getPosts = () => {
    return axios.get('/api/posts')
}

