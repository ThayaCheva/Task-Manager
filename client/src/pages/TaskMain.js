import { React, useState, useContext, useRef, useEffect } from 'react';
import '../styling/taskmain.css';
import { TaskContext } from '../App.js';
import TaskItem from '../components/TaskItem.js';
import ConfirmDialog from '../components/ConfirmDialog.js';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import { useAuthContext } from '../hooks/useAuthContext.js';

function TaskMain() {
  const {
    tasks,
    settings,
    allowConfirmDialog,
    setAllowConfirmDialog,
    setSidePanel,
    fetchTasks,
  } = useContext(TaskContext);
  const selectedTaskRef = useRef(null);
  const { user } = useAuthContext();

  // Manage the task item menu dropdown
  const [toggleMenu, setToggleMenu] = useState({
    state: false,
    id: null,
  });

  const handleToggleMenu = (taskID) => {
    setTagDropdown({ state: false, id: taskID });
    if (toggleMenu.id === taskID) {
      setToggleMenu({ state: !toggleMenu.state, id: taskID });
    } else {
      setToggleMenu({ state: true, id: taskID });
    }
  };

  // Manage the tag dropdown
  const [tagDropdown, setTagDropdown] = useState({
    state: false,
    id: null,
  });
  // console.log("Test");
  const handleTagDropdown = (taskID) => {
    setToggleMenu({ state: false, id: taskID });
    if (tagDropdown.id === taskID) {
      setTagDropdown({ state: !tagDropdown.state, id: taskID });
    } else {
      setTagDropdown({ state: true, id: taskID });
    }
  };

  // Search Functionality
  const [searchWord, setSearchWord] = useState({ word: '', foundTasks: [] });
  const handleSearchTasks = (event) => {
    if (tasks) {
      const updatedTask = tasks.filter((task) =>
        task.title.toLowerCase().includes(event.target.value.toLowerCase())
      );
      setSearchWord({ word: event.target.value, foundTasks: updatedTask });
    }
  };

  // Clicking a task in summary will scroll to the selected task in home
  useEffect(() => {
    if (selectedTaskRef && selectedTaskRef.current) {
      selectedTaskRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [selectedTaskRef]);

  const deleteAllTasks = async () => {
    try {
      const response = await fetch(
        'https://task-manager-rjw6.onrender.com/api/tasks/deleteAllTasks',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer: ${user.token}`,
          },
        }
      );
      if (response.ok) {
        fetchTasks();
      }
    } catch (error) {
      console.log('Error deleting all tasks: ', error);
    }
  };

  return (
    <div className='tasks-items'>
      {allowConfirmDialog.state && allowConfirmDialog.type === 'clear-task' && (
        <ConfirmDialog
          title={'Clear all tasks?'}
          desc={'Are you sure you want to clear all tasks?'}
          functionToCall={deleteAllTasks}
        />
      )}

      <h1 className='header'>My Tasks</h1>
      <div className='tasks-manager'>
        <div className='search-bar'>
          <FontAwesomeIcon icon={faMagnifyingGlass} />
          <input
            type='text'
            placeholder='Search...'
            onChange={handleSearchTasks}
          ></input>
        </div>
        <div className='btn-container'>
          <button
            className='btn'
            onClick={() => {
              setSidePanel('Add Task');
            }}
          >
            + Add Task
          </button>
          <button
            className='btn'
            onClick={() =>
              setAllowConfirmDialog({ type: 'clear-task', state: true })
            }
          >
            Clear All Tasks
          </button>
        </div>
      </div>

      {settings.style === 'list' && (
        <div className='tasks-header'>
          <div>Title</div>
          <div>Due Date</div>
          <div>Current Tags</div>
          <div></div>
        </div>
      )}
      {tasks && (
        <div className={`tasks-items-container ${settings.style}`}>
          {searchWord.word === ''
            ? tasks.map((t, index) => (
                <TaskItem
                  key={index}
                  task={t}
                  subTask={t.subTasks}
                  tagDropdown={tagDropdown}
                  handleTagDropdown={handleTagDropdown}
                  toggleMenu={toggleMenu}
                  handleToggleMenu={handleToggleMenu}
                />
              ))
            : searchWord.foundTasks.map((t, index) => (
                <TaskItem
                  key={index}
                  task={t}
                  subTask={t.subTasks}
                  tagDropdown={tagDropdown}
                  handleTagDropdown={handleTagDropdown}
                  toggleMenu={toggleMenu}
                  handleToggleMenu={handleToggleMenu}
                />
              ))}
        </div>
      )}
    </div>
  );
}

export default TaskMain;
