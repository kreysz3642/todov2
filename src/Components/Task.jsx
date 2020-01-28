import React from 'react';
import style from './Task.module.css'
import Checkbox from '@material-ui/core/Checkbox';

const Task = ({task, setDone}) =>{
    return(
    <div className={style.taskStyle}>
        <div>
            <div>
                <Checkbox  color="primary" type="checkbox"   onChange={() => setDone(task.id)} checked={task.done}/>
            </div>
        </div>
    <p>{task.text}</p>
    </div>
    )
}

export default Task