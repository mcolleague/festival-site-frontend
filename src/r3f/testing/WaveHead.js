import React, { useRef, useMemo, useCallback } from 'react';
import * as THREE from 'three';
import { useFrame } from 'react-three-fiber';
import { SplitShader } from './shaders/SplitShader';

function WaveHead(props) {
  const mesh = useRef();
  const obj = props.obj;
  const geometry = obj.children[0].geometry;

  useFrame(() => { mesh.current.material.uniforms.time.value++; })

  return (
    <mesh ref={mesh} scale={[1.01, 1.01, 1.01]}>
      <bufferGeometry attach='geometry' {...geometry} />
      <shaderMaterial attach="material" args={[SplitShader]} />
    </mesh>
  )
}

export default WaveHead;
