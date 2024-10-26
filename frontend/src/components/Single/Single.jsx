import React, { useEffect, useState } from 'react';
import './Single.css';
import axios from 'axios';
import serverUrl from '../../Config/ApiUrl';
import { useParams } from 'react-router-dom';
import SmLoader from '../Loaders/SmLoader'

function Single() {
	const [post, setPost] = useState([]); // Use null as the initial value for a single object
	const [loader, setLoader] = useState(false);
	const { id } = useParams();

	const fetchPost = async () => {
		setLoader(true);
		try {
			const response = await axios.get(`${serverUrl}/post/clickedpost/${id}`, {
				withCredentials: true
			});
			setPost(response.data.post); // Set the post directly
		} catch (error) {
			console.log(error.message);
		}
		finally
		{
			setLoader(false);
		}
	}

	useEffect(() => {
		fetchPost();
	}, [id]); // Adding `id` to dependency array in case it changes

	return (
		<>
			<div className='container-fluid mypost'>
				<div className="container">
					<div className="row justify-content-center">
							{
							!loader
							?
							post.length > 0  ? (
								post.map((post,index) => (
								<div  key={index} className="col-lg-8 col-md-11 col-sm-12">
										<h1>{post.title}</h1>
										<span className='iconSpan'>
											<i className="fa-sharp fa-solid fa-circle-check"></i>
											Published on November 30, 2022
										</span>
										<hr />
										<img src={`${serverUrl}/${post.postImg}`} alt="Post" className="img1" />
										<p>{post.description}</p>
										<hr />
									</div>
								))
							) : (
								<div className='col-12 pt-5 text-center'> 
									<h6 style={{color:'grey',height:'100vh'}}>No Data Found In DB!</h6>
								</div>
							)
							:
							<SmLoader/>
						}
					</div>
				</div>
			</div>
		</>
	);
}

export default Single;
