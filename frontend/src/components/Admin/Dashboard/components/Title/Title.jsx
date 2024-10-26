import React from 'react';

function Title({ title }) {
  return (
    <div className='container-fluid'>
        <div className='container'>
            <div className='row'>
                <div className='col-12 pt-2 pb-2' style={{display:'flex',justifyContent:'space-between',alignItems:'center'}}>
                    <h2 style={{color:'whitesmoke'}}>{title}</h2>
                </div>
            </div>
        </div>
    </div>
  )
}

export default Title;