import React from 'react'
import {Route, Switch} from 'react-router-dom'
import Login from './Components/Login'
import { ProtectedRouteTasks } from './ProtectedRouteTasks'
import toDoList from './Components/toDoList'
import Register from './Components/Register'
import {ProtectedRouteLogin} from './ProtectedRouteLogin'
import style from './App.module.css'


class App extends React.Component{
    constructor(){
        super()
    }


    render(){
        return(
            <div className={style.AppStyle}>
                <Switch>
                    <ProtectedRouteLogin exact path="/" component={Login}/>
                    <ProtectedRouteTasks exact path="/app" component={toDoList}/>
                    <ProtectedRouteLogin exact path="/register" component={Register}/>
                    <Route path="*" component ={() => "404 NOT FOUND"}/>
                </Switch>
            </div>
        )
    }
}

export default App