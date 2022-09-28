import * as THREE from 'three';

const ParticlesShader = {
  uniforms: {
    color: { value: new THREE.Color( 'lightblue' ) },
  },
  vertexShader: `
    attribute float alpha;
    varying float vAlpha;

    void main() {
      vAlpha = alpha;
      vec4 mvPosition = modelViewMatrix * vec4( position, 1.0 );
      gl_PointSize = 2.0;
      gl_Position = projectionMatrix * mvPosition;
    }
  `,
  fragmentShader: `
    uniform vec3 color;
    varying float vAlpha;

    void main() {
      gl_FragColor = vec4( color, vAlpha );
    }
  `,
  transparent:  true
}

export { ParticlesShader }
