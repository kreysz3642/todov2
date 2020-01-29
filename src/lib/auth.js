import axios from 'axios'


class Auth {
    constructor(){
        if(JSON.parse(localStorage.getItem("userID")) === null)
            this.authenticated = false
        else
            this.authenticated = true
    }

    login(user, callback){
        axios.post('http://localhost:8000/login', { userName : user.userName, password : user.password} ).then(
        result => {
            if(result.data.isId){
                console.log(result.data)
                this.authenticated = true;
                console.log(JSON.stringify(result.data.message))
                localStorage.setItem("userID", JSON.stringify(result.data.message))
                callback("")
            }else{
                callback(result.data.message)
            }
        },
        error => {
            console.log("Ошибка подключения к серверу")
        })

    }

    logout(callback){
        localStorage.clear()
        this.authenticated = false
        callback()
    }

    isAuthenticated() {
        return this.authenticated;
    }
}
export default new Auth();