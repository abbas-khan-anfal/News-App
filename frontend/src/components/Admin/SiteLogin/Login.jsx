import React,{ useContext, useState } from 'react';
import './Login.css';
import axios from 'axios';
import serverUrl from '../../../Config/ApiUrl';
import UserContext from '../../../context/UserContext';
import toast from 'react-hot-toast';

function Login() {
  const { setUserAuthState } = useContext(UserContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const submitHandler = async (e) => {
    e.preventDefault();
    setLoading(true);
    try
    {
      const data = {
        email,
        password,
      }
      const response = await axios.post(`${serverUrl}/user/login`,data,{
        headers : {
          "Content-Type" : "application/json",
        },
        withCredentials: true
      })
      setPassword("");
      setEmail("");
      toast.success(response.data.message);
      setUserAuthState(true);
      console.clear();
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
    <div className='container-fluid adminLogin'>
      <div className="container">
          <div className="row justify-content-center">
            <div className="col-lg-5 col-md-6 col-sm-12 pt-5">
              <form onSubmit={submitHandler}>
                <h3 className='mb-4 loginTitle'>Login to dashboard</h3>
                <div className="form-group">
                  <label htmlFor="">Eamil</label>
                  <input type="email" required onChange={e => setEmail(e.target.value)} value={email} className='inputField form-control' />
                </div>
                <div className="form-group">
                  <label htmlFor="">Password</label>
                  <input type="password" required onChange={e => setPassword(e.target.value)} value={password} className='inputField form-control' />
                </div>
                <div className="form-group">
                  <button disabled={loading} type='submit' className='siteBtn'>Login</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
  )
}

export default Login;