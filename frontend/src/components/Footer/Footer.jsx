import React from 'react';
import './Footer.css';

function Footer() {
  return (
    <div className="container-fluid footer">
		<div className="row">
			<div className="col-md-12">
				<h5 className="text-center mt-5">FIND US ON SOCIAL MEDIA</h5>
			</div>
		</div>

        <div className="col-md-12 footer_icons text-center">
        	<i className="fa-brands fa-youtube icon1"></i>
			<i className="fa-brands fa-facebook icon1"></i>
			<i className="fa-brands fa-instagram icon1"></i>
        </div>


        <div className="col-12 copyright text-center p-3 mt-3">
        	<p>Copyright @ 2024. Powered by AK.Inc</p>
        </div>

	</div>
  )
}

export default Footer;