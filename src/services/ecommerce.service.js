import axios from 'axios';
import TokenHelper from '../Pages/TokenHelper';

 const REACT_APP_API_SERVICE_URL="http://127.0.0.1:5000/api"

console.log("REACT_APP_API_SERVICE_URL ",REACT_APP_API_SERVICE_URL);


const headerdata = {
  headers: {
    "token": TokenHelper.getToken(),
    "Content-Type": "application/json"
  }
}

class EcommeceService {


  
  async login(data) {
    return axios.post(REACT_APP_API_SERVICE_URL + '/auth/login', data, {
      headers: {
        "Content-Type": "application/json"
      },
    });
  }
  
  async signup(data) {
    return axios.post(REACT_APP_API_SERVICE_URL + '/auth/register', data, {
      headers: {
        "Content-Type": "application/json"
      },
    });
  }
 
  
  async getPostList() {
    return axios.get(REACT_APP_API_SERVICE_URL + '/posts/list', TokenHelper.getHeader())
  }
  async getNearestPost(data) {
    console.log(data)
    return axios.get(REACT_APP_API_SERVICE_URL + `/auth/nearestlist?latitude=${data.latitude}&longitude=${data.longitude}`, TokenHelper.getHeader())
  }


  async createPost(data) {
  console.log(TokenHelper.getHeader(),'TokenHelper.getHeader()')
    return axios.post(REACT_APP_API_SERVICE_URL + '/posts/addpost',data, TokenHelper.getHeader())
  }



  async getEditPost(id) {
    
    return axios.get(REACT_APP_API_SERVICE_URL + '/posts/'+id, TokenHelper.getHeader())
  }
  async postEditPost(id,data) {
    console.log(data,'data')
    return axios.put(REACT_APP_API_SERVICE_URL + '/posts/'+id,data, TokenHelper.getHeader())
  }


async getDeletePost(id) {
    
  return axios.delete(REACT_APP_API_SERVICE_URL + '/posts/'+id, TokenHelper.getHeader())
}

async getListCount() {
  return axios.get(REACT_APP_API_SERVICE_URL + '/posts/listcount', TokenHelper.getHeader())
}


}

// eslint-disable-next-line import/no-anonymous-default-export
export default new EcommeceService();
