import React from 'react';

function NotFoundMessage() {
  return (
    <div className='container-fluid' style={{backgroundColor:'#000000',paddingTop:'100px',paddingBottom:'100px'}}>
        <div className='container'>
            <div className='row'>
                <div className='col-12' style={{padding:'30px', color:'grey',fontWeight:'600',fontSize:'17px',border:'2px solid grey',borderRadius:'5px'}}>
                    <span>Search Term is empty.Try Search Something!</span>
                </div>
            </div>
        </div>
    </div>
  )
}

export default NotFoundMessage;