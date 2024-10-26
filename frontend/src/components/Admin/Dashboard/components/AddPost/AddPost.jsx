import React,{ useState } from 'react';
import './AddPost.css';
import Title from '../Title/Title';
import toast from 'react-hot-toast';
import serverUrl from '../../../../../Config/ApiUrl';
import axios from 'axios';

function AddPost() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
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
      }
      const response = await axios.post(`${serverUrl}/post/addpost`,postData,{
        headers : {
          "Content-Type" : "multipart/form-data"
        },
        withCredentials: true
      })
      setTitle("");
      setDescription("");
      e.target.postImg.value = '';
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
      <Title title='Add Post' />
      <div className="container addPostContainer">
        <div className="row">
          <div className="col-lg-8 col-md-10 col-sm-12">
            <form onSubmit={submitHandler}>
              <div className="form-group">
                <label htmlFor="">Post Title</label>
                <input type="text" onChange={e => setTitle(e.target.value)} value={title} required className='inputField form-control' />
              </div>
              <div className="form-group">
                <label htmlFor="">Post Description</label>
                <textarea onChange={e => setDescription(e.target.value)} value={description} className='form-control inputField' required rows={5}></textarea>
              </div>
              <div className="form-group">
                <label htmlFor="">Post Photo</label>
                <input type="file" name='postImg' required className='inputField form-control' />
              </div>
              <div className="form-group">
                <button type='submit' disabled={loading} className='siteBtn'>Save Post</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  )
}

export default AddPost;