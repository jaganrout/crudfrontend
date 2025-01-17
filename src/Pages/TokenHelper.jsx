import { Navigate } from "react-router-dom";

class TokenHelper {
  state = {
    language_type: "",
  };

  constructor() {
    // this._accessToken = "oko";
  }

  // getHeader() {
  //   return {
  //     headers: {
  //       // "Content-Type": "application/json",
  //       "token": this.getToken()
  //     },
  //   };
  // }
  getHeader () {
    const token = JSON.parse(localStorage.getItem('tokendata'));
    return {
      headers: {
        Authorization:token,
      },
    };
  }
  setToken(payload){
    localStorage.setItem("tokendata",payload)
  }

  getToken(){
    return JSON.parse(localStorage.getItem("tokendata"));
  }

  


  setUserInfo(payload){
    localStorage.setItem("user_info",JSON.stringify(payload))
  }

  getUserInfo(){
    var data=JSON.parse(localStorage.getItem("user_info"));
    return data;
  }
  setLogoutInfo(){
    localStorage.clear();
  }

   
}

export default new TokenHelper();
