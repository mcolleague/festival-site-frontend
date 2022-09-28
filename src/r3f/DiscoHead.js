import React from 'react';
import * as THREE from 'three';

function DiscoHead(props) {
  return (
    <mesh>
      <bufferGeometry attach='geometry' {...props.obj.children[0].geometry} />
      <meshPhongMaterial
        attach='material'
        color='gray'
        emissive='#222'
        shininess={50}
        reflectivity={3.5}
        specular='white'
        flatShading={true}
        side={/*THREE.DoubleSide*/''}
        vertexColors={/*THREE.FaceColors*/''}
        combine={THREE.AddOperation}
       />
    </mesh>

    // envMap: cubeCamera.renderTarget.texture,
  )
}

export default DiscoHead;
