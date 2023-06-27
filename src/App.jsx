import { useEffect } from 'react';
import './App.scss';
import { useDispatch, useSelector } from 'react-redux';
import { fetchPosts } from './Utils/redux/slices/posts';
import Header from './components/Header';
import { Outlet } from 'react-router-dom';
import { fetchUsers } from './Utils/redux/slices/users';

function App() {
  const dispatch = useDispatch()
  useEffect(() => {
    const storage = localStorage.getItem('persist:root')
    if (!storage) {
      dispatch(fetchPosts())
      dispatch(fetchUsers())
    }
  }, [])
  return (
    <div className='app'>
      <header>
        <Header />
      </header>
      <div className='body'>
        <Outlet />
      </div>
    </div>
  );
}

export default App;
