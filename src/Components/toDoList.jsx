import React from 'react'
import Task from './Task'

import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'
import style from './toDoList.module.css'
import { ButtonGroup } from '@material-ui/core'
import axios from 'axios'
import auth from '../lib/auth'



class toDoList extends React.Component {

  

  

  constructor(){
    super()

    this.state = {
      input : "",
      tasks: []
    }

    let userID = JSON.parse(localStorage.getItem("userID"))

    axios.post('http://localhost:8000/reciveTasks', {userID}).then(res => {
       this.setState({tasks : res.data.map(task => ({
        userID : task.userId,
        _id : task._id,
        text : task.text,
        done : task.done
     }))})
      
    }, 
    error => {
      console.log("Ошибка загрузки данных")
    })


  }

  
  

  render(){  
    const {tasks, input} = this.state
    
    
    return(
      <div className={style.App}>
        <p>ToDo</p>
        <div className={style.Tasks}>
          {tasks.map(task=><Task task={task} setDone={this.setDone} key={task._id}/>)}
        

        <div className={style.addNewTaskArea}>
            <TextField className={style.TextField} value={input}  id="standard-basic" label="Add New Task" onChange={this.inputChange}></TextField>
            <Button className={style.AddTaskButton} variant="outlined" color="primary" onClick={this.addNewTask}>Add new task</Button>
        </div>
        <div className={style.ControllButtons}>
            <ButtonGroup className={style.ControllButtonGroup}  size="large" color="primary" aria-label="large outlined primary button group">
                <Button onClick={() => this.changeDisplayState('All')}>All</Button>
                <Button onClick={() => this.changeDisplayState('Active')} >Active</Button>
                <Button onClick={() => this.changeDisplayState('Completed')}>Completed</Button>
            </ButtonGroup>

            <Button className={style.ClearButton} variant="outlined" color="primary" onClick={() => this.clearActive()}>Clear Active</Button>
        
        </div>
                <Button variant="contained" color="primary" className={style.logoutButton} onClick={()=> auth.logout(() => {
                    this.props.history.push('/')
                })}>LogOut</Button>
        </div>
      </div>
    )
  }

  

  changeDisplayState = (DisplayState) =>{
    
    let userID = JSON.parse(localStorage.getItem("userID"))
    let tasks

    axios.post('http://localhost:8000/reciveTasks', {userID}).then(res => {
      tasks = res.data
      if(DisplayState === "All") this.setState({tasks : tasks})
      if(DisplayState === "Active") this.setState({tasks : tasks.filter(task => !task.done)})
      if(DisplayState === "Completed") this.setState({tasks : tasks.filter(task => task.done)})
    })
  }


  clearActive = () =>{
    axios.get('http://localhost:8000/clearActive').then(
        result => {
          let newTasks = this.state.tasks
          this.setState({tasks : newTasks.filter(task => !task.done)})
        }
      )
    
  }


  setDone = id =>{
    let { tasks } = this.state;

    const currentIndex = tasks.map(task => task._id).indexOf(id)
    
    tasks[currentIndex].done = !tasks[currentIndex].done

    let newTask = tasks[currentIndex]

    axios.post('http://localhost:8000/changeTask', { newTask } ).then(
        result => {
        }
      )

    this.setState(tasks);
  }

  inputChange = event =>{
  
    this.setState({input: event.target.value})

  }

  addNewTask = () =>{
    



    if(this.state.input){
      let {tasks} = this.state
      
      let newTask = {
        userID : JSON.parse(localStorage.getItem("userID")),
        text: this.state.input,
        done: false
      }
      
      
     
      
      axios.post('http://localhost:8000/addTask', { newTask } ).then(
        result => {
          tasks.push(result.data)
          this.setState(tasks)
          this.setState({input : ""})
        }
      )
    }


  }

 
  
  
}
export default toDoList