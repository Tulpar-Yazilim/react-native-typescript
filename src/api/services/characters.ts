import axios from '../axios';

const getCharacters = () => axios.get('/character');

export default {getCharacters};
