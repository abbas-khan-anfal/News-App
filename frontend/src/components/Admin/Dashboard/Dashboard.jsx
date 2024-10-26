import React, { useState, useContext, useEffect } from 'react';
import './Dashboard.css';
import Logo from '../../../assets/logo.png';
import UserImg from '../../../assets/user.jpg';
import Post from './components/All Post/Post';
import User from './components/All User/User';
import AddPost from './components/AddPost/AddPost';
import AddUser from './components/AddUser/AddUser';
import Home from './components/Home/Home';
import { Routes, Route, NavLink, Navigate, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import axios from 'axios';
import serverUrl from '../../../Config/ApiUrl';
import UserContext from '../../../context/UserContext';
import Profile from './components/Profile/Profile';
import UpdateUser from './components/UpdateUser/UpdateUser';
import UpdatePost from './components/updatePost/UpdatePost';

function Dashboard() {
  const navigate = useNavigate();
  const { setUserAuthState, userData } = useContext(UserContext);
  const [navToggle, setNavToggle] = useState(false);

  const navToggleHandler = () => {
    setNavToggle(!navToggle);
  }

  // logout handler
  const logoutHandler = async () => {
    try
    {
      const response = await axios.get(`${serverUrl}/user/logout`,{
        withCredentials: true
      });
      setUserAuthState(false);
      toast.success(response.data.message);
    }
    catch(error)
    {
      console.log(error.response ? error.response.data.message : error.message);
    }
  }

  useEffect(() => {
    // console.log(userData);
  },[]);
  return (
    <div className='dashboard'>






        {/* dashboard aside start */}
      <aside className={`${navToggle ? 'show' : ''}`}>
            <button className='dashNavCloseBtn' onClick={navToggleHandler}>&#10005;</button>
            <NavLink to='/admin/dashboard'><img src={Logo} className='dashLogo'></img></NavLink>
            <ul>
                <li><NavLink to="/admin/dashboard"><i className="fa-solid fa-house"></i> Home</NavLink></li>
                <li><NavLink to="/admin/posts"><i className="fa-regular fa-address-card"></i> Posts</NavLink></li>
                <li><NavLink to="/admin/addpost"><i className="fa-solid fa-pen-to-square"></i> Add Post</NavLink></li>
                <li><NavLink to="/admin/users"><i className="fa-solid fa-user"></i> Users</NavLink></li>
                <li><NavLink to="/admin/adduser"><i className="fa-solid fa-user-plus"></i> Add User</NavLink></li>
            </ul>
      </aside>
      {/* dashboard aside end */}










      {/* dashboard section start */}
        <section>
            <header>
                <div>
                  <button className='dashNavOpnBtn' onClick={navToggleHandler}>&#9776;</button>
                  <h5>Dashboard</h5>
                </div>


                <div className="btn-group dropdown">
                <button type="button" data-toggle="dropdown" aria-expanded="false" className='dropDownBtn'>
                <i className="fa-solid fa-user"></i>
                </button>
                <div className="dropdown-menu dropdown-menu-right">
                  <button className="dropdown-item" type="button" onClick={logoutHandler}>Logout</button>
                  <button onClick={() => {
                    navigate('/admin/profile')
                  }} className="dropdown-item" type="button">Profile</button>
                </div>
              </div>

            </header>













            {/* content start */}
            <Routes>
              <Route path='/' element={<Navigate to='/admin/dashboard' />} />
              <Route path='/dashboard' element={<Home/>} />
              <Route path='/posts' element={<Post/>} />
              <Route path='/users' element={<User/>} />
              <Route path='/addpost' element={<AddPost/>} />
              <Route path='/adduser' element={<AddUser/>} />
              <Route path='/profile' element={<Profile/>} />
              <Route path='/updateuser/:id' element={<UpdateUser />} />
              <Route path='/updatepost/:id' element={<UpdatePost />} />
            </Routes>

            {/* content end */}




        </section>
      {/* dashboard section end */}
    </div>
  )
}

export default Dashboard;