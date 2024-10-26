import React, { useEffect, useState } from 'react';
import Title from '../Title/Title';
import axios from 'axios';
import serverUrl from '../../../../../Config/ApiUrl';
import SmLoader from '../../../../Loaders/SmLoader';
import toast from 'react-hot-toast';
import { NavLink } from 'react-router-dom';

function Post() {
    const [allPosts, setAllPosts] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(0);
    const [loader, setLoader] = useState(true);

    const getAllPostHandler = async (page) => {
        try
        {
            const response = await axios.get(`${serverUrl}/post/getposts?page=${page}`,{
                withCredentials : true
            });
            setAllPosts(response.data.posts);
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

    //delete handler
    const deleteHandler = async (id) => {
        if(confirm("Do you really want to delete this post?"))
        {
            setLoader(true);
            try
            {
                const response = await axios.delete(`${serverUrl}/post/deletepost/${id}`,{
                    withCredentials: true
                });
                toast.success(response.data.message);
                getAllPostHandler();
            }
            catch(error)
            {
                setLoader(false);
                toast.error(error.response?.data.message || error.message);
            }
        }
    }
    
    useEffect(() => {
        getAllPostHandler(currentPage);
    },[currentPage]);

    const handlePageHandler = (page) => {
        if(page >= 1 && page <= totalPages)
        {
            setCurrentPage(page);
        }
    };

    let mappedPosts;
    if(allPosts.length > 0)
    {
        mappedPosts = allPosts.map((post, index) => {
            return (
                <tr key={index}>
                    <td>{index + 1 + (currentPage - 1) * 3}</td>
                    <td>{post.title.substring(0, 15)}...</td>
                    <td>{post.description.substring(0, 20)}...</td>
                    <td><NavLink to={`/admin/updatepost/${post._id}`} className='siteBtn editBtn'><i className="fa-regular fa-pen-to-square"></i></NavLink></td>
                    <td><button onClick={() => deleteHandler(post._id)} className='siteBtn deleteBtn'><i className="fa-solid fa-trash"></i></button></td>
                </tr>
            )
        })
    }
    else
    {
        mappedPosts = (
            <tr>
                <td colSpan={5}>No Data Found In DB!</td>
            </tr>
        )
    }


  return (
    <div className='container tableContainer'>
        <div className='row'>

            <Title title="Posts"/>

            <div className='col-12'>
                <table className='table table-responsive'>
                    <thead>
                        <tr>
                            <th>Sr:no</th>
                            <th>Post Title</th>
                            <th>Post Description</th>
                            <th>Edit</th>
                            <th>Delete</th>
                        </tr>
                    </thead>

                    <tbody>
                        {
                            loader
                            ?
                            <tr>
                                <td colSpan={5}><SmLoader/></td>
                            </tr>
                            :
                            mappedPosts
                        }
                    </tbody>

                </table>
            </div>


            {/* pagination start */}
            <div className="col-12">
                    <ul className='pagination'>
                        <li className={`page-item ${currentPage == 1 ? 'disabled' : ''}`}><button className='page-link' onClick={() => handlePageHandler(currentPage - 1)}>Prev</button></li>
                        {[...Array(totalPages)].map((_, i) => (
                            <li key={i} className={`page-item ${currentPage === i + 1 ? 'active' : ''}`}>
                                <button className='page-link' onClick={() => handlePageHandler(i + 1)}>{i + 1}</button>
                            </li>
                        ))}
                        <li className={`page-item ${totalPages == currentPage ? 'disabled' : ''}`}><button className='page-link' onClick={() => handlePageHandler(currentPage + 1)}>Next</button></li>
                    </ul>
            </div>
            {/* pagination start */}
        </div>
    </div>
  )
}

export default Post;