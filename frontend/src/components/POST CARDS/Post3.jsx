import React, { useEffect, useState } from 'react';
import './Post.css';
import axios from 'axios';
import serverUrl from '../../Config/ApiUrl';
import SmLoader from '../Loaders/SmLoader';
import {NavLink} from 'react-router-dom';

function Post3() {
    const [posts, setPosts] = useState([]);
    const [loader, setLoader] = useState(true);

    const fetchPosts = async () => {
        try
        {
            const response = await axios.get(`${serverUrl}/post/getpostsforblog`,{
                withCredentials:true
            });
            setPosts(response.data.posts);
        }
        catch(error)
        {
            console.log(error.response?.data.message || error.message);
        }
        finally
        {
            setLoader(false);
        }
    }

    useEffect(() => {
        fetchPosts();
    },[])
  return (
    <div className='container-fluid postSection'>
        <div className='container'>
            <div className='row'>

            <div className='col-12 text-right'>
                <a href="" style={{fontSize:'15px',fontWeight:'500',color:'grey', textDecoration:'underline',fontStyle:'italic', marginBottom:'10px',display:'inline-block'}}>View all
                </a>
            </div>

                {
                    !loader
                    ?
                    posts.length > 0
                    ?
                    posts.slice(0, 4).map((post,index) => (
                        <div key={index} className='col-lg-3 col-md-6 col-sm-12'> 
                            <div className='card smCard'>
                                <div className='card-img-top'>
                                    <img src={`${serverUrl}/${post.postImg}`} className='img-fluid'></img>
                                </div>
                                <div className='card-body'>
                                    <h5 className='card-title'>{post.title.substring(0,15)}...</h5>
                                    <p className='card-text'>{post.description.substring(0,25)}<NavLink to={`/postdetail/${post._id}`}>Read more...</NavLink></p>
                                </div>
                            </div>
                        </div>
                    ))
                :
                <div className='col-12 text-left'> 
                    <h6 style={{color:'grey'}}>No Data Found In DB!</h6>
                </div>
                :
                <div className='col-12 text-left'> 
                    <SmLoader/>
                </div>
                }

            </div>
        </div>
    </div>
  )
}
export default Post3;