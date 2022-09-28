import React, { useState, useEffect, useRef, useMemo, useCallback } from 'react';
import * as THREE from 'three';
import { useFrame } from 'react-three-fiber';
import { HeadShader } from './shaders/HeadShader';

function ShaderHead(props) {
  const { page, isLoggedIn, isFlattened, setIsFlattened } = props;
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
      // alphas.array[ i ] = 1.0;

      alphas.array[ i ] *= 0.95;
      if ( alphas.array[ i ] < 0.01 ) {
        alphas.array[ i ] = 1.0;
      }
    }
    alphas.needsUpdate = true;
  })

  // new stuff
  const clock = new THREE.Clock();
  let timeVal = 0;

  let uniforms = HeadShader.uniforms;
  var attrPhi = new Float32Array( numVertices );
  var attrTheta = new Float32Array( numVertices );
  var attrSpeed = new Float32Array( numVertices );
  var attrAmplitude = new Float32Array( numVertices );
  var attrFrequency = new Float32Array( numVertices );

  const [toggleHead, setToggleHead] = useState(true);
  const [isMesh, setIsMesh] = useState(isLoggedIn);
  const [isDisco, setIsDisco] = useState(false);

  for (var attr = 0; attr < numVertices; attr++) {
    attrPhi[attr] = Math.random() * Math.PI * 2;
    attrTheta[attr] = Math.random() * Math.PI * 2;
    attrSpeed[attr] = THREE.Math.randFloatSpread(6);
    attrAmplitude[attr] = Math.random() * 5;
    attrFrequency[attr] = Math.random() * 5;
  }

  useEffect(() => setIsMesh(isLoggedIn), [isLoggedIn] );

  useFrame(() => {
    if (isDisco) return;

    let newUniforms = particles.current.material.uniforms;
    let time = newUniforms.u_time;
    let interpolation = newUniforms.interpolation;

    timeVal += clock.getDelta();
    time.value = timeVal;

    if (toggleHead) {
      if (isFlattened) {
        if (interpolation.value > 0) {
          // interpolation.value -= .05 * timeVal;
          interpolation.value -= .04;
        } else {
          setIsFlattened(false);
          setToggleHead(false);
        }
      } else {
        if (interpolation.value < .9) {
          // interpolation.value += .05 * timeVal;
          interpolation.value += .04;
        } else {
          setIsFlattened(true);
          setToggleHead(false);
        }
      }
    }
  })

  const flatGeometry = geometry.clone();
  const flatPosition = flatGeometry.attributes.position;
  const flatVertices = flatPosition.array;

  for (let i = 0; i < numVertices; i ++) {
    flatPosition.array[i * 3 + 1] = -17;
  }

  // document.onmousemove = function(e){
  //   uniforms.u_mouse.value.x = e.pageX
  //   uniforms.u_mouse.value.y = e.pageY
  //
  //   setIsMesh((e.pageX / window.innerWidth) > .5);
  //   setIsDisco((e.pageY / window.innerHeight) > .5);
  // }

  // document.onclick = function(e){
  //   if (!toggleHead) setToggleHead(!toggleHead);
  // }

  const Attributes = () => {
    return (
      <>
      <bufferAttribute setUsage={THREE.DynamicDrawUsage} attachObject={['attributes', 'position']}
        array={vertices} count={vertices.length / 3} itemSize={3} onUpdate={update} />
      <bufferAttribute setUsage={THREE.DynamicDrawUsage} attachObject={['attributes', 'flatPosition']}
        array={flatVertices} count={flatVertices.length / 3} itemSize={3} />
      <bufferAttribute attachObject={['attributes', 'alpha']} array={alphas} itemSize={1} count={alphas.length} />
      <bufferAttribute attachObject={['attributes', 'phi']} array={attrPhi} count={numVertices} itemSize={1}/>
      <bufferAttribute attachObject={['attributes', 'theta']} array={attrTheta} count={numVertices} itemSize={1}/>
      <bufferAttribute attachObject={['attributes', 'speed']} array={attrSpeed} count={numVertices} itemSize={1}/>
      <bufferAttribute attachObject={['attributes', 'amplitude']} array={attrAmplitude} count={numVertices} itemSize={1}/>
      <bufferAttribute attachObject={['attributes', 'frequency']} array={attrFrequency} count={numVertices} itemSize={1}/>
      </>
    )
  }

  const Material = () => {
    const shader = HeadShader;

    // shader.uniforms.u_color = { value: new THREE.Color(page === 'Programme' ? 'white' : 'teal') };
    shader.uniforms.u_color = { value: new THREE.Color('white') };

    return isDisco ? (
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
     ) : (
       <shaderMaterial attach="material" wireframe {...shader} uniforms={uniforms}  />
     )
  }

  return isMesh ? (
    <mesh ref={particles}>
      <bufferGeometry attach='geometry'>
        <Attributes />
      </bufferGeometry>
      <Material />
    </mesh>
  ) : (
    <points ref={particles} scale={[1.01, 1.01, 1.01]}>
      <bufferGeometry attach='geometry'>
        <Attributes />
      </bufferGeometry>
      <Material />
    </points>
  )
}

export default ShaderHead;
