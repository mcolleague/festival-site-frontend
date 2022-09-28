import React, { useRef, useMemo, useCallback, Suspense } from 'react';
import * as THREE from 'three';
import { useFrame, useLoader, extend } from 'react-three-fiber';
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader';
import Box from './Box';

extend({ OBJLoader })

function HeadGroup(props) {
  function Asset({ url }) {
    const parent = useRef();
    const obj = useLoader(OBJLoader, url);
    let bufferGeometry = obj.children[0].geometry;
    let geometry = new THREE.Geometry().fromBufferGeometry( bufferGeometry );

    useFrame(() => (parent.current.rotation.y -= 0.001));

    const BasicHead = () => {
      return (
        <mesh>
          <bufferGeometry attach="geometry" {...obj.children[0].geometry} />
          <meshPhongMaterial attach="material" color='white' wireframe />
        </mesh>
      )
    }

    const ParticleHead = (props) => {
      const particles = useRef();
      const y_bottom = -17;

      // useFrame(fallDown);

      function fallDown(state, d) {
        let simpleGeometry = new THREE.Geometry().fromBufferGeometry( particles.current.geometry );
        let is_building = true;

        for (var i=0; i < simpleGeometry.vertices.length; i++) {
          let y = simpleGeometry.vertices[i].y;
          let y_orig = geometry.vertices[i].y;
          let target = is_building ? y_orig : y_bottom;

          // if (y == target) break;
          // if (y > target) {
          //   simpleGeometry.vertices[i].y -= 1.3;
          // } else if (y < target) {
          //   simpleGeometry.vertices[i].y += 1.3;
          // }
        }

        // lol
        simpleGeometry.vertices.map(vertice =>
          vertice.normalize().multiplyScalar(performance.now() * 0.01)
        )

        particles.current.geometry = new THREE.BufferGeometry().fromGeometry ( simpleGeometry );
        particles.current.geometry.verticesNeedUpdate = true;
      }

      function formShape(){
        const simpleGeometry = new THREE.Geometry().fromBufferGeometry( bufferGeometry );

        for (var i=0; i < simpleGeometry.vertices.length; i++) {
          console.log(simpleGeometry.vertices[i].y);
        }
      }

      function flattenSimple(){
        const simpleGeometry = new THREE.Geometry().fromBufferGeometry( bufferGeometry );

        for (var i=0; i < simpleGeometry.vertices.length; i++) {
          simpleGeometry.vertices[i].y = -17;
        }

        const flatBufferGeometry = new THREE.BufferGeometry().fromGeometry ( simpleGeometry );
        bufferGeometry = flatBufferGeometry;
        bufferGeometry.attributes.position.needsUpdate = true;
      }

      function flattenAdvanced(){
        // console.log(bufferGeometry.attributes.position.array)
          for (var i=0; i < bufferGeometry.attributes.position.count; i++) {
            // console.log(bufferGeometry.attributes.position.getY(i));
            // bufferGeometry.attributes.position.setY(i, 0);
          }
          bufferGeometry.attributes.position.needsUpdate = true;
      }

      // flattenSimple();

      // geometry.computeFaceNormals(); geometry.mergeVertices(); geometry.computeVertexNormals();
      const vertices = useMemo(
        () => bufferGeometry.attributes.position.array
      )

      const update = useCallback(self => {
        self.needsUpdate = true
        self.parent.computeBoundingSphere()
      }, [])

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
          </bufferGeometry>
          <pointsMaterial attach='material' size={.01} color='white' />
        </points>
      )
    }

    const DiscoHead = () => {
      return (
        <mesh>
          <bufferGeometry attach='geometry' {...obj.children[0].geometry} />
          <meshPhongMaterial
            attach='material'
            color='gray'
            emissive='#222'
            shininess={50}
            reflectivity={3.5}
            specular='white'
            flatShading={true}
            side={/*THREE.DoubleSide*/''}
            vertexColors={THREE.FaceColors}
            combine={THREE.AddOperation}
           />
        </mesh>

        // envMap: cubeCamera.renderTarget.texture,
      )
    }

    return (
      <object3D name="HeadGroup" ref={parent} scale={[.13, .13, .13]}>
        <ParticleHead />
        {/* <DiscoHead /> */}
        {/* <BasicHead /> */}
      </object3D>
    )
  }

  return (
    <Suspense fallback={<mesh/>}>
      <Asset url="/head.OBJ" />
    </Suspense>
  )
}

export default HeadGroup;
