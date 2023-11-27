import axios from "axios";

const clienteAxios = axios.create({
     baseURL: `https://libreria-online.onrender.com/api`
})

export default clienteAxios;