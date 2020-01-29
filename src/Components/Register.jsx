import React from 'react'
import { Button, TextField, Link } from '@material-ui/core'
import auth from '../lib/auth'
import style from './LoginPage.module.css'
import axios from 'axios'
import alertStyle from './Alert.module.css'


class Register extends React.Component{
    constructor(){
        super()

        this.state = {
            inputLog : "",
            inputPass : "",
            inputPassRepeat : "",
            showAlert : false,
            alertMessage : "",
        }

    }

    render(){

        let {loginPageStyle, loginPageInput, loginButton, linkStyle} = style

        

        let {inputLog, inputPass, inputPassRepeat} = this.state
        return(
            <div className={loginPageStyle} onClick={this.deleteAlert}>
                { this.state.showAlert ? <p className={alertStyle.Alert}>{this.state.alertMessage}</p> : null }
                <p>Register in todos</p>
                <div className={loginPageInput}>
                    <p>Enter your login</p>
                    <TextField value={inputLog} onChange={this.loginTextFieldChange} id="outlined-basic"  variant="outlined" />
                </div>

                <div className={loginPageInput}>
                    <p>Enter your password</p>
                    <TextField value={inputPass} onChange={this.passwordTextFieldChange} id="outlined-basic" variant="outlined" />
                </div>

                <div className={loginPageInput}>
                    <p>Repeat your password</p>
                    <TextField value={inputPassRepeat} onChange={this.passwordRepeatTextFieldChanfe} id="outlined-basic" variant="outlined" />
                </div>
               
               
                <Button variant="contained" color="primary" className={loginButton} onClick={this.registrationNewUser}>Login</Button>

                <Link className={linkStyle} component="button" onClick={() => this.props.history.push('/')} variant="body2">Регистрация</Link>
            </div>
        )
    }

    loginTextFieldChange = event=>{
        this.setState({inputLog : event.target.value})
    }

    passwordTextFieldChange = event =>{
        this.setState({inputPass : event.target.value})
    }

    passwordRepeatTextFieldChanfe = event =>{
        this.setState({inputPassRepeat : event.target.value})
    }

    checkData = () =>{
        let {inputLog,inputPass, inputPassRepeat} = this.state

        


        if(inputPass === "" || inputPassRepeat === "" || inputLog === ""){
            this.setState({alertMessage : "Все поля должны совпадать", showAlert : true})
            return false
        }
        if(inputPass !== inputPassRepeat) {
            this.setState({alertMessage : "Пароли не совпадают", showAlert : true})
            return false
        }

        return true
    }


    registrationNewUser = (event) =>{

        event.stopPropagation();
        let {inputLog,inputPass, inputPassRepeat} = this.state

        let user = {
            userName : inputLog, 
            password : inputPass
        }
    

        if(this.checkData()){
            axios.post('http://localhost:8000/register', { userName : inputLog, password : inputPass} ).then(
                result => {
                    this.props.history.push('/')
                },
                error => {
                    console.log("Ошибка подключения к серверу")
                }
              )
              
        }


        
    }

    deleteAlert = () =>{
       this.setState({showAlert : false})
    }
}

   

export default Register