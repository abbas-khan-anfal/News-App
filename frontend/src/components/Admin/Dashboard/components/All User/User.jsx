import React, { useEffect, useState, useContext } from 'react';
import Title from '../Title/Title';
import axios from 'axios';
import serverUrl from '../../../../../Config/ApiUrl';
import toast from 'react-hot-toast';
import SmLoader from '../../../../Loaders/SmLoader';
import { NavLink } from 'react-router-dom';
import UserContext from '../../../../../context/UserContext';

function User() {
    const { userData } = useContext(UserContext);
    const [allUsers, setAllUsers] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(0);
    const [loader, setLoader] = useState(true);

    const fetchUsers = async (page) => {
        try
        {
            const response = await axios.get(`${serverUrl}/user/allusers?page=${page}`,{
                withCredentials:true
            });
            setAllUsers(response.data.allUsers);
            setCurrentPage(response.data.currectPage);
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
        if(confirm("Do you really want to delete this user?"))
        {
            setLoader(true);
            try
            {
                const response = await axios.delete(`${serverUrl}/user/deleteuser/${id}`,{
                    withCredentials: true
                });
                toast.success(response.data.message);
                fetchUsers();
            }
            catch(error)
            {
                setLoader(false);
                toast.error(error.response?.data.message || error.message);
            }
        }
    }

    useEffect(() => {
        fetchUsers(currentPage);
    },[currentPage]);

    const changePageHandler = (page) => {
        if(page >= 1 && page <= totalPages)
        {
            setCurrentPage(page);
        }
    }

    let mappedUsers;
    if(allUsers.length > 0)
    {
        mappedUsers = allUsers.map((user, index) => {
            return (
                <tr key={index}>
                    <td>{index + 1 + (currentPage - 1) * 3}</td>
                    <td>{user.username}</td>
                    <td>{user.email}</td>
                    <td><NavLink to={`/admin/updateuser/${user._id}`} className='siteBtn editBtn'><i className="fa-regular fa-pen-to-square"></i></NavLink></td>
                    <td>
                        {
                            user.email === userData.email
                            ?
                            (
                               <button disabled style={{border:'none', color:'grey', backgroundColor:'grey', padding:'5px 10px',color:'#000000',borderRadius:'5px'}}><i className="fa-solid fa-trash"></i></button> 
                            )
                            :
                            (<button className='siteBtn deleteBtn' onClick={() => deleteHandler(user._id)}><i className="fa-solid fa-trash"></i></button>)
                        }
                    </td>
                </tr>
            )
        });
    }
    else
    {
        mappedUsers = (
            <tr>
                <td colSpan={5}>No Data Found In DB!</td>
            </tr>
        )
    }
  return (
    <div className='container tableContainer'>
        <div className='row'>

            <Title title="Users"/>

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
                            mappedUsers
                        }
                    </tbody>

                </table>
            </div>


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
  )
}

export default User;