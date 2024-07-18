import { React, useState, useEffect, createContext } from 'react';
import TaskSummary from './pages/TaskSummary';
import TaskMain from './pages/TaskMain.js';
import TaskForm from './components/TaskForm.js';
import Settings from './components/Settings.js';
import Navbar from './pages/Navbar.js';
import Notification from './components/Notification.js';
import { differenceInDays, isToday } from 'date-fns';
import './styling/nav.css';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from 'react-router-dom';
import { useTaskContext } from './hooks/useTaskContext.js';
import Login from './pages/Login.js';
import Signup from './pages/Signup.js';
import { useAuthContext } from './hooks/useAuthContext.js';
export const TaskContext = createContext();
export const NavContext = createContext();

function App() {
  const { tasks, dispatch } = useTaskContext();
  const [editMode, setEditMode] = useState({ state: false, taskID: '' });
  const [selectedTask, setSelectedTask] = useState('');
  const [taskImages, setTaskImages] = useState([]);
  const [sidePanel, setSidePanel] = useState(null);
  const [notificationCount, setNotificationCount] = useState(0);
  const [currentPage, setCurrentPage] = useState('Home');
  const [settings, setSettings] = useState({
    style: 'grid',
    fontSize: 100,
    mode: 'light',
  });
  const { user } = useAuthContext();

  const [allowConfirmDialog, setAllowConfirmDialog] = useState({
    type: null,
    state: false,
  });

  const fetchTasks = async () => {
    try {
      const response = await fetch('/api/tasks', {
        headers: {
          Authorization: `Bearer: ${user.token}`,
        },
      });
      const json = await response.json();
      if (response.ok) {
        dispatch({ type: 'SET_TASKS', payload: json });
      }
    } catch (error) {
      console.log('Error fecthing data: ', error);
    }
  };

  const [isMobile, setIsMobile] = useState(false);

  // Retrieve data from db and handle resize
  useEffect(() => {
    const fetchTasksAndHandleResize = async () => {
      if (user) {
        await fetchTasks();
      }

      const handleResize = () => {
        setIsMobile(window.innerWidth <= 1200);
      };

      handleResize(); // Call handleResize immediately to set initial state

      window.addEventListener('resize', handleResize);
      return () => window.removeEventListener('resize', handleResize);
    };

    fetchTasksAndHandleResize();
  }, [user, window.innerWidth]);

  // Get the notification count
  useEffect(() => {
    if (tasks) {
      const todayTasks = tasks.filter((t) => isToday(t.dueDate));
      const upcomingTasks = tasks.filter(
        (t) =>
          differenceInDays(t.dueDate, new Date()) > 0 &&
          differenceInDays(t.dueDate, new Date()) < 7
      );
      const overDuedTasks = tasks.filter(
        (t) => differenceInDays(t.dueDate, new Date()) < 0
      );

      setNotificationCount(
        todayTasks.length + upcomingTasks.length + overDuedTasks.length
      );
    }
  }, [tasks]);

  // Manage navigation bar clicks
  const handleNavClick = (page) => {
    setCurrentPage(page);
    if (page === 'Notification') {
      setSidePanel('Notification');
    } else if (page === 'Settings') {
      setSidePanel('Settings');
    } else {
      setSidePanel(null);
    }
  };

  // Manage which side menu to display (Notification, Settings or Task Form)
  const displayMenu = () => {
    if (sidePanel === 'Notification') {
      return <Notification handleNavClick={handleNavClick} />;
    } else if (sidePanel === 'Settings') {
      return <Settings handleNavClick={handleNavClick} />;
    } else if (sidePanel === 'Add Task') {
      if (editMode.state) {
        return <TaskForm formTitle={'Edit Task'} />;
      } else {
        return <TaskForm formTitle={'Add Task'} />;
      }
    }
  };

  const style = {
    display: 'grid',
    gridTemplateColumns: '1fr 8fr',
  };

  // Manage the order of the display
  const TaskSections = () => {
    return (
      <section id='tasklist'>
        <TaskMain />
        {displayMenu()}
      </section>
    );
  };

  const updateTask = async (updatedTask, id) => {
    const response = await fetch('/api/tasks/' + id, {
      method: 'PATCH',
      body: JSON.stringify(updatedTask),
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer: ${user.token}`,
      },
    });
    if (response.ok) {
      const json = await response.json();
      dispatch({ type: 'UPDATE_TASKS', payload: json });
      fetchTasks();
    }
  };

  return (
    <Router>
      <div className='App'>
        <main>
          <NavContext.Provider value={{ handleNavClick, isMobile }}>
            {
              <TaskContext.Provider
                value={{
                  tasks,
                  editMode,
                  setEditMode,
                  selectedTask,
                  setSelectedTask,
                  taskImages,
                  setTaskImages,
                  notificationCount,
                  setNotificationCount,
                  currentPage,
                  setCurrentPage,
                  settings,
                  setSettings,
                  allowConfirmDialog,
                  setAllowConfirmDialog,
                  sidePanel,
                  setSidePanel,
                  updateTask,
                  fetchTasks,
                }}
              >
                <section id='tasklist'>
                  <Navbar handleNavClick={handleNavClick} />
                  <Routes>
                    <Route
                      path='/'
                      element={
                        user ? <TaskSections /> : <Navigate to='/login' />
                      }
                    />
                    <Route
                      path='/summary'
                      element={
                        user ? <TaskSummary /> : <Navigate to='/login' />
                      }
                    />
                    <Route
                      path='/login'
                      element={!user ? <Login /> : <TaskSections />}
                    />
                    <Route
                      path='/signup'
                      element={!user ? <Signup /> : <TaskSections />}
                    />
                  </Routes>
                </section>
              </TaskContext.Provider>
            }
          </NavContext.Provider>
        </main>
      </div>
    </Router>
  );
}

export default App;
