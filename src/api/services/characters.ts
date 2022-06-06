import axios from '../axios';

export const getCharacters = () => axios.get('/character');
