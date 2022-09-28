import React, { useRef } from 'react';
import * as THREE from 'three';
import { useFrame } from 'react-three-fiber';
import { ParticlesShader } from './shaders/ParticlesShader';

function Sphere(props) {
  const cloud = useRef();
  const geometry = new THREE.SphereBufferGeometry( 2, 160, 160 );
  const numVertices = geometry.attributes.position.count;
  const alphas = new Float32Array( numVertices * 1 );

  for( var i = 0; i < numVertices; i ++ ) {
    alphas[ i ] = Math.random();
  }

  useFrame(() => {
    let alphas = cloud.current.geometry.attributes.alpha;
    let count = alphas.count;

    for (let i = 0; i < count; i ++) {
      alphas.array[ i ] *= 0.95;
      if ( alphas.array[ i ] < 0.01 ) {
        alphas.array[ i ] = 1.0;
      }
    }

    alphas.needsUpdate = true;
    cloud.current.rotation.x = cloud.current.rotation.y += 0.001;
  })

  return (
    <points {...props} ref={cloud}>
      <sphereBufferGeometry attach="geometry" args={[2, 50, 50]}>
        <bufferAttribute
          attachObject={['attributes', 'alpha']}
          array={alphas}
          itemSize={1}
          count={alphas.length}
        />
      </sphereBufferGeometry>
      <shaderMaterial attach="material" {...ParticlesShader} />
    </points>
  )
}

export default Sphere;
