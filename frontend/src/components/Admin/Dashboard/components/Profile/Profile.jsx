import React, { useContext } from 'react';
import Title from '../Title/Title';
import './Profile.css';
import UserContext from '../../../../../context/UserContext';
import serverUrl from '../../../../../Config/ApiUrl';

function Profile() {

  const { userData } = useContext(UserContext);

  return (
    <>
    <Title title="Profile"/>
    <div className="container profileCont">
        <div className="row">
          <div className='col-lg-4 col-md-6 col-sm-12 mx-3 profileInfo p-3'>

            <div className='imgUsername p-3'>
                <img src={`${serverUrl}/${userData.imgPath}`}></img>
                <h3>{userData.username}</h3>
            </div>

            <div className='p-3'>
                <h5>Email : <span>{userData.email}</span></h5>
                <h5>Joined At : <span>{userData.createdAt}</span></h5>
            </div>
            
          </div>
        </div>
      </div>
    </>
  )
}

export default Profile;