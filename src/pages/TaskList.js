import React from 'react'
import '../styling/tasklist.css';
import TaskItem from './TaskItem.js'
import TaskForm from './TaskForm.js'
import { TaskContext, EditModeContext } from '../App';

function TaskList() {
    const [tasks, setTasks] = React.useContext(TaskContext);
    const [editMode, setEditMode] = React.useContext(EditModeContext);
    return (
        <section id="tasklist">
            <div className="navbar">
                <h1>Menu</h1>
                <ul>Search</ul>
                <ul>Home</ul>
                <ul>Upcoming</ul>
                <h1>My Tasks</h1>
                <ul>Add Task</ul>
                <ul>Filter</ul>
            </div>
            <TaskItem/>
            {editMode.state ? 
                <TaskForm formTitle={"Edit Task:"}/>
                :
                <TaskForm formTitle={"Add Task:"}/>
            }
        </section>
    )
}

export default TaskList