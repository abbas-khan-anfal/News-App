import React, { useState } from 'react';
import './Contact.css';
import toast from 'react-hot-toast';
import axios from 'axios';
import serverUrl from '../../Config/ApiUrl';

function Contact() {
    const [email, setEmail] = useState("");
    const [message, setMessage] = useState("");
    const [loader, setLoader] = useState(false);

    const submitHandler = async (e) => {
        e.preventDefault();
        setLoader(true);
        try
        {
            const messageObj = {email, message};
            const response = await axios.post(`${serverUrl}/usermessage`,messageObj, {
                headers : {
                    "Content-Type":"application/json",
                },
                withCredentials : true
            });
            toast.success(response.data.message);
            setEmail("");
            setMessage("");
        }
        catch(error)
        {
            toast.error(error.response?.data.message || error.message);
        }
        finally
        {
            setLoader(false);
        }
    }
  return (
    <div className='container-fluid contactSection'>
        <div className='container'>
            <div className='row justify-content-between'>
                <div className='col-lg-5 col-sm-12 col-md-7'>
                    <form onSubmit={submitHandler}>
                        <div className="form-group">
                            <label htmlFor="">Email</label>
                            <input type="email" required onChange={e => setEmail(e.target.value)} value={email} className='form-control inputField' placeholder='Enter email' />
                        </div>
                        <div className="form-group">
                            <label htmlFor="">Message</label>
                            <textarea required onChange={e => setMessage(e.target.value)} value={message} className='form-control txtAreaFiled' rows={6} placeholder='Enter message...'></textarea>
                        </div>
                        <div className="form-group">
                            <button disabled={loader} type='submit' className='btn siteBtn'>{loader ? 'Loading...' : 'Send Message'}</button>
                        </div>
                    </form>
                </div>
                
                <div className='col-lg-5 col-sm-12 col-md-5 infoCol'>
                    <h2>Find Us On Google Map</h2>
                    <div>
                    <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d425289.990533232!2d72.75643905071773!3d33.61625093699602!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x38dfbfd07891722f%3A0x6059515c3bdb02b6!2sIslamabad%2C%20Islamabad%20Capital%20Territory%2C%20Pakistan!5e0!3m2!1sen!2s!4v1729427679975!5m2!1sen!2s" style={{border:'2px solid #1d1f22', height:'300px', width:'100%',borderRadius:'5px' }} allowFullScreen="" loading="lazy" referrerPolicy="no-referrer-when-downgrade"></iframe>
                    </div>
                </div>
                
            </div>
        </div>
    </div>
  )
}

export default Contact;