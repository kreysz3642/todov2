import React from 'react'
import { Button, TextField, Link} from '@material-ui/core'
import auth from '../lib/auth'
import style from './LoginPage.module.css'
import alertStyle from './Alert.module.css'


class Login extends React.Component{
    constructor(){
        super()

        this.state = {
            inputLog : "",
            inputPass : "",
            showAlert : false, 
            alertMessage : "dfsdfsdf"
        }

    }

    render(){

        let {loginPageStyle, loginPageInput, loginButton, linkStyle} = style

        let {inputLog, inputPass} = this.state
        return(
            <div className={loginPageStyle} onClick={this.deleteAlert}>
                { this.state.showAlert ? <p className={alertStyle.Alert}>{this.state.alertMessage}</p> : null }
                <p>Login in todos</p>
                <div className={loginPageInput}>
                    <p>Enter your login</p>
                    <TextField value={inputLog} onChange={this.loginTextFieldChange} id="outlined-basic"  variant="outlined" />
                </div>

                <div className={loginPageInput}>
                    <p>Enter your password</p>
                    <TextField value={inputPass} onChange={this.passwordTextFieldChange} id="outlined-basic" variant="outlined" />
                </div>
               
                <Button variant="contained" color="primary" className={loginButton} onClick={this.loginUser}>Login</Button>

                <Link className={linkStyle} component="button" onClick={() => this.props.history.push('/register')} variant="body2">Регистрация</Link>
            </div>
        )
    }

    deleteAlert = () =>{
        this.setState({showAlert : false})
    }

    loginUser = () =>{

        let {inputLog, inputPass} = this.state

        let user ={
            userName : inputLog,
            password : inputPass
        }

        
        
        auth.login(user, (TextAlert)=>{
        if(TextAlert !== "") {
            this.setState({showAlert : true, alertMessage : TextAlert})
        }

        if(auth.isAuthenticated()) this.props.history.push('/app')})
            
        
       
    }

    loginTextFieldChange = event=>{
        this.setState({inputLog : event.target.value})
    }

    passwordTextFieldChange = event =>{
        this.setState({inputPass : event.target.value})
    }
}

export default Login