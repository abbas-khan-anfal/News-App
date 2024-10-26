import React, { useState } from 'react';
import './AddUser.css';
import Title from '../Title/Title';
import toast from 'react-hot-toast';
import serverUrl from '../../../../../Config/ApiUrl';
import axios from 'axios';

function AddUser() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const submitHandler = async (e) => {
    e.preventDefault();
    setLoading(true);
    try
    {
      const file = e.target.userImg.files[0];
      const data = {
        username,
        email,
        password,
        userImg : file
      }
      const response = await axios.post(`${serverUrl}/user/adduser`,data,{
        headers : {
          "Content-Type" : "multipart/form-data"
        },
        withCredentials: true
      })
      setUsername("");
      setPassword("");
      setEmail("");
      e.target.userImg.value = '';
      toast.success(response.data.message);
    }
    catch(error)
    {
      toast.error(error.response?.data.message || error.message);
    }
    finally
    {
      setLoading(false);
    }
  }

  return (
    <>
      <Title title='Add User' />
      <div className="container addUserContainer">
        <div className="row">
          <div className="col-lg-6 col-md-9 col-sm-12">
            <form onSubmit={submitHandler}>
              <div className="form-group">
                <label htmlFor="">Userename</label>
                <input type="text" required onChange={e => setUsername(e.target.value)} value={username} className='inputField form-control' />
              </div>
              <div className="form-group">
                <label htmlFor="">Eamil</label>
                <input type="email" required onChange={e => setEmail(e.target.value)} value={email} className='inputField form-control' />
              </div>
              <div className="form-group">
                <label htmlFor="">Password</label>
                <input type="password" required onChange={e => setPassword(e.target.value)} value={password} className='inputField form-control' />
              </div>
              <div className="form-group">
                <label htmlFor="">User Photo</label>
                <input type="file" required name='userImg' className='inputField form-control' />
              </div>
              <div className="form-group">
                <button disabled={loading} type='submit' className='siteBtn'>Save User</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  )
}

export default AddUser;