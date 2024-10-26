import React from 'react';

function Title({ title }) {
  return (
    <div className='container-fluid sectionTitle'>
        <div className='container'>
            <div className='row'>
                <div className='col-12' style={{display:'flex',justifyContent:'space-between',alignItems:'center'}}>
                    <h2>{title}</h2>
                </div>
            </div>
        </div>
    </div>
  )
}

export default Title;