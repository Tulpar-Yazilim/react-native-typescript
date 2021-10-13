import axios from '../axios';

const SERVICE_NAME = 'GuideCategory';

const CategoryList = () => axios.get(`${SERVICE_NAME}/GetList`);

export default {CategoryList};
