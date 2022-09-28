import React, { useRef, useState, useMemo } from 'react';
import { useFrame, extend } from 'react-three-fiber';
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader';
import ShaderHead from './ShaderHead';

extend({ OBJLoader });

function HeadGroup(props) {
  const [obj, setObj] = useState({});
  const parent = useRef();
  const headURL = '/head.OBJ';

  useMemo(() => new OBJLoader().load(headURL, (object) => setObj(object)), []);
  useFrame(() => !!obj.children && !!obj.children.length && (parent.current.rotation.y -= 0.001));

  return !!obj.children && !!obj.children.length ? (
    <object3D name="HeadGroup" ref={parent} scale={[.13, .13, .13]}>
      <ShaderHead obj={obj} {...props}/>

      {/*
      <DiscoHead obj={obj} />
      <BasicHead obj={obj} />
      */}
    </object3D> ) : ( null
  )
}

export default HeadGroup;
