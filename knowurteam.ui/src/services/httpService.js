import axios from 'axios';
//custom instance default
const httpService= axios.create({
    //ruta de nuestra API
    baseURL: 'http://localhost:5000/api'
});

export default httpService;