import React, { useRef, useMemo, useState, useCallback } from 'react';
import * as THREE from 'three';
import { useFrame } from 'react-three-fiber';
import { ParticlesShader } from './shaders/ParticlesShader';

function angleTo(a_, b_){ return Math.atan2(b_.y - a_.y, b_.x - a_.x); }
function distance(a_, b_){ return a_.distanceTo(b_); }

function ParticleHead(props) {
  const particles = useRef();
  const helper = useRef();
  const obj = props.obj;
  const geometry = obj.children[0].geometry;
  const originalGeometry = geometry.clone();
  const vertices = useMemo(() => geometry.attributes.position.array);
  const numVertices = useMemo(() => geometry.attributes.position.count);
  const alphas = new Float32Array( numVertices * 1 );
  const update = useCallback(self => {
    self.needsUpdate = true
    self.parent.computeBoundingSphere()
  }, [])
  const threshold = 3.5;
  const origins = vertices.slice(0);

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

  useFrame(({ mouse, camera }) => {
    const points = particles.current.geometry.attributes.position;
    const vector = new THREE.Vector3( mouse.x, mouse.y, -2 ).unproject( camera );

    let direction = vector.sub(camera.position).normalize(),
        distance = - camera.position.z / direction.z,
        scaled = direction.multiplyScalar(distance),
        mouseXYZ = camera.position.clone().add(scaled);

    for (var i = 0, l = points.count; i < l; i++) {
        let x = points.array[i * 3];
        let y = points.array[i * 3 + 1];
        let z = points.array[i * 3 + 2];
        let newVector = new THREE.Vector3(x, y, z);

        x += ((Math.cos(angleTo(mouseXYZ, newVector)) * (Math.pow(threshold, 2.0) / mouseXYZ.distanceTo(new THREE.Vector3(x, y, 0.0)))) + (origins[i * 3] - x)) * 0.1;
        z += ((Math.sin(angleTo(mouseXYZ, newVector)) * (Math.pow(threshold, 2.0) / mouseXYZ.distanceTo(new THREE.Vector3(x, y, 0.0)))) + (origins[i * 3 + 2] - z)) * 0.1;

        points.array[i * 3] = x;
        points.array[i * 3 + 2] = z;
    }

    helper.current.position.set(mouseXYZ.x, mouseXYZ.y, 0.0);
    points.needsUpdate = true;
  })

  return (
    <>
    <mesh ref={helper}>
      <sphereBufferGeometry attach="geometry" args={[3, 32, 32]} />
      <meshBasicMaterial attach="material" color={'orange'} />
    </mesh>
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
    </>
  )
}

export default ParticleHead;
