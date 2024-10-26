import React, { useEffect, useState } from 'react';
import Title from '../Title/Title'
import './Home.css';
import axios from 'axios';
import serverUrl from '../../../../../Config/ApiUrl';

function Home() {
  const [totalUsers, setTotalUsers] = useState(0);
  const [totalPosts, setTotalPosts] = useState(0);

  const fetchTotalUsersAndPosts = async () => {
    try
    {
      const response = await axios.get(`${serverUrl}/all`,{
        withCredentials: true
      });
      setTotalUsers(response.data.totalUsers)
      setTotalPosts(response.data.totalPosts)
    }
    catch(error)
    {
      console.log(error.response?.data.message || error.message);
    }
  }

  useEffect(() => {
    fetchTotalUsersAndPosts();
  },[]);
  return (
    <><Title title="Home" />
    <div className='container DashBoardHome'>
      <div className='row px-3'>

        <div className='col-12'>
          <div className='row'>

            <div className="col-lg-4 col-md-6 col-sm-12">
              <div className='card'>
                <i className="fa-solid fa-address-card"></i>
                <h3>Total Posts</h3>
                <span>{totalPosts}</span>
              </div>
            </div>

            <div className="col-lg-4 col-md-6 col-sm-12">
              <div className='card'>
                <i className="fa-solid fa-user"></i>
                <h3>Total Users</h3>
                <span>{totalUsers}</span>
              </div>
            </div>
            

          </div>

        </div>
      </div>
    </div>
    </>
  )
}

export default Home;