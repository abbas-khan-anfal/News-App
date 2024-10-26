import React, { useState ,useEffect } from 'react';
import './UpdateUser.css';
import Title from '../Title/Title';
import toast from 'react-hot-toast';
import serverUrl from '../../../../../Config/ApiUrl';
import axios from 'axios';
import { useParams } from 'react-router-dom';

function UpdateUser() {
  const { id } = useParams();
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [imgPath, setImgpath] = useState("");
  const [loading, setLoading] = useState(false);

  const submitHandler = async (e) => {
    e.preventDefault();
    setLoading(true);
    try
    {
      const file = e.target.userImg.files[0];
      const userData = {
        username,
        email,
        userImg : file,
        id,
        imgPath : imgPath
      }
      const response = await axios.put(`${serverUrl}/user/updateuser`,userData,{
        headers : {
          "Content-Type" : "multipart/form-data"
        },
        withCredentials: true
      })
      toast.success(response.data.message);
    }
    catch(error)
    {
      toast.error(error.response?.data.message || error.message);
    }
    finally
    {
      setLoading(false);
      fetchUser();
    }
  }

  const fetchUser = async () => {
    try
    {
      const response = await axios.get(`${serverUrl}/user/showuserforupdate/${id}`,{
        withCredentials:true
      });
      setEmail(response.data.user.email);
      setUsername(response.data.user.username);
      setImgpath(response.data.user.imgPath);
    }
    catch(error)
    {
      console.log()
    }
  }

  useEffect(() => {
    fetchUser();
  },[id]);

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
                <img style={{height:'50px',width:'50px',borderRadius:'10px'}} src={`${serverUrl}/${imgPath}`} />
              </div>
              <div className="form-group">
                <label htmlFor="">Choose New Photo</label>
                <input type="file" name='userImg' className='inputField form-control' />
              </div>
              <div className="form-group">
                <button disabled={loading} type='submit' className='siteBtn'>Update User</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  )
}

export default UpdateUser;