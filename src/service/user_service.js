const axios = require('./axios_service');
var config = require('./config');
class UserService{
    register(value){
        let url = config.url + 'user/userSignUp'
        return axios.post(url, value);
    }
    login(value){
        let url = config.url + 'user/login'
        return axios.post(url, value);
    }
    forgot(value){
        let url = config.url + 'user/reset'
        return axios.post(url, value);
    }
    reset(value,token){
        console.log(token);
        let header = {
            headers: {
              'Authorization' : token
            }
          };
        let url = config.url + 'user/reset-password';
        return axios.post(url, value,true, header);
    }
    
}

module.exports = new UserService();