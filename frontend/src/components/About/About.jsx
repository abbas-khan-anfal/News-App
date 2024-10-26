import React from 'react';
import './About.css';

function About() {
  return (
    <div className='container-fluid about_page'>

	<div class="container">
		<div class="row">
			<div class="col-lg-6 col-md-6 img_part">
				<img src="https://picsum.photos/600/300" class="m_pic"></img>
			</div>

			<div class="col-lg-6 col-md-6 text_part">
				<h2>Resources for makers and creatives</h2>
				<p>Far far away, behind the word mountains, far from the countries Vokalia and Consonantia, there live the blind texts. Separated they live in Bookmarksgrove right at the coast of the Semantics, a large language ocean.</p>
				<button className='siteBtn'>READ MORE</button>
			</div>


			<div class="col-lg-6 col-md-6 text_part">
				<h2>We are trusted by more than 5,000 clients</h2>
				<p>Far far away, behind the word mountains, far from the countries Vokalia and Consonantia, there live the blind texts. Separated they live in Bookmarksgrove right at the coast of the Semantics, a large language ocean.</p>
				<button className='siteBtn'>READ MORE</button>
			</div>
			<div class="col-lg-6 col-md-6 img_part">
				<img src="https://picsum.photos/600/300" class="m_pic"></img>
			</div>
		</div>
	</div>


	<div class="container-fluid service_section">
				<div class="row">
					<div class="col-lg-4 col-md-4 coll">
						<span><i class="fa-solid fa-briefcase"></i></span>
						<h6>Building your blog</h6>
						<p>Far far away, behind the word mountains, far from the countries Vokalia and Consonantia, there live the blind texts.</p>
					</div>
					<div class="col-lg-4 col-md-4 coll">
						<span><i class="fa-brands fa-android"></i></span>
						<h6>Resources and insights</h6>
						<p>Far far away, behind the word mountains, far from the countries Vokalia and Consonantia, there live the blind texts.</p>
					</div>
					<div class="col-lg-4 col-md-4 coll">
						<span><i class="fa-solid fa-shield-halved"></i></span>
						<h6>Blog just for you</h6>
						<p>Far far away, behind the word mountains, far from the countries Vokalia and Consonantia, there live the blind texts.</p>
					</div>
				</div>
			</div>



			<div class="container our_team">
				<div class="row">
					<div class="col-12 top_heading">
						<h1>Our Team</h1>
						<p>Far far away, behind the word mountains, far from <br></br>the countries Vokalia and Consonantia, there live the blind texts.</p>
					</div>

					<div class="col-lg-4 col-md-4">
						<div class="card">
							<img src="https://picsum.photos/600/300" class="card-img-top"></img>
							<div class="card-body">
								<h5>Claire Smith</h5>
								<p>Far far away, behind the word mountains, far from the countries Vokalia and Consonantia, there live the blind texts.</p>
							</div>
						</div>
					</div>

					<div class="col-lg-4 col-md-4">
						<div class="card">
							<img src="https://picsum.photos/600/300" class="card-img-top"></img>
							<div class="card-body">
								<h5>Claire Smith</h5>
								<p>Far far away, behind the word mountains, far from the countries Vokalia and Consonantia, there live the blind texts.</p>
							</div>
						</div>
					</div>

					<div class="col-lg-4 col-md-4">
						<div class="card">
							<img src="https://picsum.photos/600/300" class="card-img-top"></img>
							<div class="card-body">
								<h5>Claire Smith</h5>
								<p>Far far away, behind the word mountains, far from the countries Vokalia and Consonantia, there live the blind texts.</p>
							</div>
						</div>
					</div>


				</div>
			</div>
    </div>
  )
}

export default About;