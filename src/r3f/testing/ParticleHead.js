import React, { useRef, useMemo, useCallback } from 'react';
import * as THREE from 'three';
import { useFrame } from 'react-three-fiber';
import { ParticlesShader } from './shaders/ParticlesShader';

function ParticleHead(props) {
  const particles = useRef();
  const obj = props.obj;
  const geometry = obj.children[0].geometry;
  const vertices = useMemo(() => geometry.attributes.position.array);
  const numVertices = useMemo(() => geometry.attributes.position.count);
  const alphas = new Float32Array( numVertices * 1 );
  const update = useCallback(self => {
    self.needsUpdate = true
    self.parent.computeBoundingSphere()
  }, [])

  for( var i = 0; i < numVertices; i ++ ) {
    alphas[ i ] = Math.random();
  }

  useFrame(() => {
    let alphas = particles.current.geometry.attributes.alpha;
    let count = alphas.count;

    for (let i = 0; i < count; i ++) {
      alphas.array[ i ] *= 0.95;
      if ( alphas.array[ i ] < 0.01 ) {
        alphas.array[ i ] = 1.0;
      }
    }
    alphas.needsUpdate = true;
  })

  return (
    <points ref={particles} scale={[1.01, 1.01, 1.01]}>
      <bufferGeometry attach='geometry'>
        <bufferAttribute
          setUsage={THREE.DynamicDrawUsage}
          attachObject={['attributes', 'position']}
          array={vertices}
          count={vertices.length / 3}
          itemSize={3}
          onUpdate={update} />
        />
        <bufferAttribute
          attachObject={['attributes', 'alpha']}
          array={alphas}
          itemSize={1}
          count={alphas.length}
        />
      </bufferGeometry>
      <shaderMaterial attach="material" {...ParticlesShader} />
    </points>
  )
}

export default ParticleHead;
