import React,{ useEffect, useState } from 'react';
import './UpdatePost.css';
import Title from '../Title/Title';
import toast from 'react-hot-toast';
import serverUrl from '../../../../../Config/ApiUrl';
import axios from 'axios';
import { useParams } from 'react-router-dom';

function UpdatePost() {
  const { id } = useParams();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [postImg, setPostImg] = useState("");
  const [imgPath, setImgPath] = useState("");
  const [loading, setLoading] = useState(false);

  const submitHandler = async (e) => {
    e.preventDefault();
    setLoading(true);
    try
    {
      const file = e.target.postImg.files[0];
      const postData = {
        title,
        description,
        postImg : file,
        id,
        imgPath : postImg
      }
      const response = await axios.put(`${serverUrl}/post/updatepost`,postData,{
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
      fetchPost();
    }
  }

  const fetchPost = async () => {
    try
    {
      const response = await axios.get(`${serverUrl}/post/showpostforupdate/${id}`,{
        withCredentials:true
      });
      setTitle(response.data.post.title);
      setDescription(response.data.post.description);
      setPostImg(response.data.post.postImg);
    }
    catch(error)
    {
      console.log()
    }
  }

  useEffect(() => {
    fetchPost();
  },[id]);
  return (
    <>
      <Title title='Add Post' />
      <div className="container addPostContainer">
        <div className="row">
          <div className="col-lg-8 col-md-10 col-sm-12">
            <form onSubmit={submitHandler} >
              <div className="form-group">
                <label htmlFor="">Post Title</label>
                <input type="text" onChange={e => setTitle(e.target.value)} value={title} required className='inputField form-control' />
              </div>
              <div className="form-group">
                <label htmlFor="">Post Description</label>
                <textarea onChange={e => setDescription(e.target.value)} value={description} className='form-control inputField' required rows={5}></textarea>
              </div>
              <div className="form-group">
                <img style={{height:'50px',width:'50px',borderRadius:'10px'}} src={`${serverUrl}/${postImg}`} />
              </div>
              <div className="form-group">
                <label htmlFor="">Choose New Photo</label>
                <input type="file" name='postImg' className='inputField form-control' />
              </div>
              <div className="form-group">
                <button type='submit' disabled={loading} className='siteBtn'>Update Post</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  )
}

export default UpdatePost;