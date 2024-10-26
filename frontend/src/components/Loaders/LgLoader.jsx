import React from 'react';
import { InfinitySpin } from 'react-loader-spinner';

function LgLoader() {
  return (  
    <div style={{backgroundColor:'#000000',position:'fixed',top:'0',bottom:'0',left:'0',right:'0',zIndex:'111',display:'flex',justifyContent:'center',alignItems:'center'}}>
        <InfinitySpin
        visible={true}
        width="200"
        color="whitesmoke"
        ariaLabel="infinity-spin-loading"
        />
    </div>
  )
}

export default LgLoader;