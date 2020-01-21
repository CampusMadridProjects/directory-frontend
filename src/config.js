import axios from 'axios';
import api from '@/store/helpers/api';

export default () => {
	return axios.get(`${api.url}/config`)
		.then(response => response.data);
}
