import React from 'react'
import '../styling/tasklist.css';
import { TaskContext, EditModeContext } from '../App';
function TaskItem() {
    const [tasks, setTasks] = React.useContext(TaskContext);
    const [editMode, setEditMode] = React.useContext(EditModeContext);
    const removeTask = (id) => {
        const updatedTask = tasks.filter(task => task.id !== id);
        setTasks(updatedTask);
    }


    const editTask = (id) => {
        setEditMode({...editMode, state:!editMode.state, taskID:id});
    }
    return (
        <div className="tasks-items">
            <h1 className="header">My Tasks</h1>
            <div className="tasks-items-container">
                {tasks.map((t) => (
                    <div className="task-item">
                        <h1>{t.title}</h1>
                        <p>{t.desc}</p>
                        <p>{t.dueDate}</p>
                        <div>
                            {t.subTasks && t.subTasks.map((st) => (
                                <div className="subtask-item">{st}</div>
                            ))}    
                        </div>
                        <div className="task-item-buttons">
                            <button onClick={() => editTask(t.id)}>EDIT</button>
                            <button onClick={() => removeTask(t.id)}>DELETE</button>
                            <button>SUMMARY</button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default TaskItem