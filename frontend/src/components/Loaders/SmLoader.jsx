import React from 'react';
import { InfinitySpin } from 'react-loader-spinner';

function SmLoader() {
  return (  
    <div style={{backgroundColor:'transparent',display:'flex',justifyContent:'center',alignItems:'center', height:'100%',width:'100%'}}>
        <InfinitySpin
        visible={true}
        width="100"
        color="whitesmoke"
        ariaLabel="infinity-spin-loading"
        />
    </div>
  )
}

export default SmLoader;