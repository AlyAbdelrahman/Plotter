import authHeader from '../helpers/auth-header';
import utils from './utils'

// Get all Dragable Coulmn Data list
function getCoulmnData() {
    const requestOptions = {
        method: 'GET',
        headers: authHeader()
    }
    const url = `${process.env.REACT_APP_API_URL}/columns`;
    return fetch(url, requestOptions)
    .then(utils.handleResponse);
}


const plotDataService = {
    getCoulmnData
}
export default plotDataService;