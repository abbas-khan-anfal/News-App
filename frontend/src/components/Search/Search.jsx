import React, { useEffect, useState } from 'react';
import './../POST CARDS/Post.css';
import Title from '../Title/Title';
import { useParams, NavLink } from 'react-router-dom';
import axios from 'axios';
import serverUrl from '../../Config/ApiUrl';
import SmLoader from '../Loaders/SmLoader';

function Search() {
    const { search } = useParams();
    const [posts, setPosts] = useState([]);
    const [count, setCount] = useState(0);
    const [loader, setLoader] = useState(false);

    const searchHandler = async () => {
        setLoader(true);
        try
        {
            const response = await axios.get(`${serverUrl}/post/search?search=${search}`,{
                withCredentials:true
            });
            setPosts(response.data.data);
            setCount(response.data.count);
            
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
        searchHandler();
    },[search]);
  return (
    <div className='container-fluid postSection'>
        <Title title={`${count} result found for : ${search}`}/>
        <div className='container'>
            <div className='row'>


            {
                    !loader
                    ?
                    posts.length > 0
                    ?
                    posts.map((post,index) => (
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
                    <h6 style={{color:'grey'}}>No Data Found In DB, Try Different search term!</h6>
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

export default Search;