import ax from '../axios';

const SERVICE_NAME = 'GuideCategory';

const CategoryList = () => ax.get(`${SERVICE_NAME}/GetList`);

export default {CategoryList};
