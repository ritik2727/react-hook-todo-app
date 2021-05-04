import React, { useEffect, useState } from 'react';
import './ToDo.css';


const Task = ({task,index,completeTask,removeTask})=>{
    return (
        <div className='task'
        style={{ textDecoration: task.completed ? "line-through" : "" }}
        >
            {task.title}
        <button onClick={()=>completeTask(index)}  >
            completed
        </button>
        <button onClick={()=>removeTask(index)} style={{color:'red'}} >
        <i className="trash icon"></i>
        </button>
        </div> 
    );
};

const CreateTask = ({addTask})=>{
    const [value,setValue] = useState('');

    const handleSubmit = (e) =>{
        e.preventDefault();
        if(!value)
        return ;

        addTask(value);
        setValue("");
    }

    return (
        <div>
        <form onSubmit={handleSubmit} >
            <input  type="text"
                    className="input"
                    value={value}
                    placeholder="Add a new task"
                    onChange={e=>setValue(e.target.value)}
            />
        </form>
        </div>
    )
}
const ToDo = ()=>{
    const [taskRemaining,setTaskRemaining] = useState(0);
    const [tasks,setTasks] = useState([
        {
            title:'hello',
            completed:false
        },
        {
            title:'To Do List App',
            completed:true
        }
    ]);
    useEffect(()=>{
        setTaskRemaining(tasks.filter(task=> !task.completed).length)
    });
    const addTask = (title)=>{
        const newTask = [...tasks,{title,completed:false}];
        setTasks(newTask);
    }

    const completeTask = (index)=>{
        const newTasks = [...tasks];
        newTasks[index].completed = true;
        setTasks(newTasks);
    }
    const removeTask = (index)=>{
        const newTasks = [...tasks];
        newTasks.splice(index, 1);
        setTasks(newTasks);
    }
    return (
        <div className="todo-container">
        <div className="header">Pending tasks ({taskRemaining})</div>
        <div className="tasks">
            {tasks.map((task,index)=>{
                return (
                    <Task index={index} task={task} key={index} completeTask={completeTask} removeTask={removeTask}/>
                )
            })}
        </div >
        <div className="create-task">
          <CreateTask addTask={addTask}/>
          </div>
        </div>
    )
}


export default ToDo;