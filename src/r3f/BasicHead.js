import React from 'react';

function BasicHead(props) {
  return (
    <mesh>
      <bufferGeometry attach="geometry" {...props.obj.children[0].geometry} />
      <meshPhongMaterial attach="material" color='white' opacity={0.4} transparent wireframe />
    </mesh>
  )
}

export default BasicHead;
