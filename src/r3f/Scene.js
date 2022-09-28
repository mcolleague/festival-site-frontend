import React from 'react';
import { extend, useThree } from 'react-three-fiber';
import HeadGroup from './HeadGroup';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

extend({ OrbitControls });


function Scene(props) {
  const { camera, gl: { domElement } } = useThree();

  return (
    <>
      <ambientLight />
      <pointLight position={[10, 10, 10]} />
      <HeadGroup {...props}/>
      <orbitControls args={[camera, domElement]} />
    </>
  )
}

export default Scene;
