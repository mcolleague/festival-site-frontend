import React from 'react';
import * as THREE from 'three';

function WireframeHead(props) {
  return (
    <lineSegments>
      <wireframeGeometry attach="geometry" {...props.obj.children[0].geometry} />
      <lineBasicMaterial attach="material" color='white' lineWidth={3} />
    </lineSegments>
  )
}

export default WireframeHead;
