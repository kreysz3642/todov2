import React from 'react'
import Task from './Components/Task'

import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'
import style from './App.module.css'
import { ButtonGroup } from '@material-ui/core'
import axios from 'axios'



class App extends React.Component {

  

  

  constructor(){
    super()

    this.state = {
      input : "",
      tasks: []
    }

    axios.get('http://localhost:8000/reciveTasks', {headers: {
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS"
        }     
    }).then(res => {
       this.setState({tasks : res.data.map(task => ({
         
        id : task._id,
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
          {tasks.map(task=><Task task={task} setDone={this.setDone} key={task.id}/>)}
        

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
        </div>
      </div>
    )
  }

  

  changeDisplayState = (DisplayState) =>{
    if(DisplayState === "All") this.setState({tasks : JSON.parse(localStorage.getItem('tasks'))})
    if(DisplayState === "Active") this.setState({tasks : JSON.parse(localStorage.getItem('tasks')).filter(task => !task.done)})
    if(DisplayState === "Completed") this.setState({tasks : JSON.parse(localStorage.getItem('tasks')).filter(task => task.done)})
  }


  clearActive = () =>{

    let tasks = JSON.parse(localStorage.getItem('tasks')).filter(task => !task.done)
    localStorage.setItem('tasks', JSON.stringify(tasks))


    this.setState({tasks : tasks})
  }


  setDone = id =>{
    let { tasks } = this.state;


    const currentIndex = tasks.map(task => task.id).indexOf(id)
    

    tasks[currentIndex].done = !tasks[currentIndex].done


    localStorage.setItem('tasks', JSON.stringify(tasks))

    this.setState(tasks);
  }

  inputChange = event =>{
  
    this.setState({input: event.target.value})

  }

  addNewTask = () =>{
    

    if(this.state.input){
      let {tasks} = this.state
      
      let newTask = {
        id: "",
        text: this.state.input,
        done: false
      }
      
      
     
      
      axios.post('http://localhost:8000/addTask', { newTask } ).then(
        result => {
          console.log(result.data.taskId)
          newTask.id = result.data.taskId
          tasks.push(newTask)
          this.setState(tasks)
        }
      )
    }
  }

 
  
  
}
export default App