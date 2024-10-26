import React, { useState, useEffect } from 'react';
import './../POST CARDS/Post.css';
import { NavLink } from 'react-router-dom';
import axios from 'axios';
import serverUrl from '../../Config/ApiUrl';
import SmLoader from '../Loaders/SmLoader';

function BlogPost() {
    const [posts, setPosts] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(0);
    const [loader, setLoader] = useState(true);

    const fetchPosts = async (page) => {
        try
        {
            const response = await axios.get(`${serverUrl}/post/getpostsforblog?page=${page}`,{
                withCredentials:true
            });
            setPosts(response.data.posts);
            setCurrentPage(response.data.currentPage);
            setTotalPages(response.data.totalPages);
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
        fetchPosts(currentPage);
    },[currentPage])

    const changePageHandler = (page) => {
        if(page >= 1 && page <= totalPages)
        {
            setCurrentPage(page);
        }
    }
  return (
    <div className='container-fluid postSection'>
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
                        <div className='col-12 text-center'> 
                            <h6 style={{color:'grey'}}>No Data Found In DB!</h6>
                        </div>
                        :
                        <div className='col-12 text-center'> 
                            <SmLoader/>
                        </div>
                }

                {/* pagination start */}
                <div className="col-12">
                    <ul className='pagination'>
                    <li className={`page-item ${currentPage == 1 ? 'disabled' : ''}`}><button className='page-link' onClick={() => changePageHandler(currentPage - 1)}>Prev</button></li>

                        {
                            [...Array(totalPages)].map((_,i) => (
                                <li key={i} className={`page-item ${currentPage == i + 1 ? 'active' : ''}`}><button className='page-link' onClick={() => changePageHandler(i + 1)}>{i + 1}</button></li>
                            ))
                        }

                        <li className={`page-item ${currentPage == totalPages ? 'disabled' : ''}`}><button className='page-link' onClick={() => changePageHandler(currentPage + 1)}>Next</button></li>
                    </ul>
                </div>
                {/* pagination start */}

            </div>
        </div>
    </div>
  )
}

export default BlogPost;