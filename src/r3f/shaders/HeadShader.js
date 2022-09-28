import * as THREE from 'three';

const HeadShader = {
  uniforms: {
    u_mouse: { type: "v2", value: new THREE.Vector2() },
    u_time: { type: "f", value: 1.0 },
    u_color: { value: new THREE.Color('teal') },
    interpolation: { type: "f", value: .8 },
    radius: { value: 40 }
  },
  vertexShader: `
    uniform float u_time;
    uniform float interpolation;
    uniform float radius;

    attribute float alpha;
    varying float vAlpha;
    attribute vec3 flatPosition;
    attribute float phi;
    attribute float theta;
    attribute float speed;
    attribute float amplitude;
    attribute float frequency;

    vec3 rtp2xyz(){
      float time = u_time;
      float tmpTheta = theta + time * speed;
      float tmpPhi = phi + time * speed;
      float r = sin(time * frequency) * amplitude * sin(interpolation * 3.1415926);
      float x = sin(tmpTheta) * cos(tmpPhi) * r;
      float y = sin(tmpTheta) * sin(tmpPhi) * r;
      float z = cos(tmpPhi) * r;
      return vec3(x, y, z);
    }

    void main() {
      vAlpha = alpha;
      // vec3 newPosition = mix(position, normalize(position) * radius, interpolation) ;
      // vec3 newPosition = mix(position, normalize(flatPosition), interpolation);
      vec3 newPosition = mix(position, flatPosition, interpolation);
      newPosition += rtp2xyz();
      vec4 mvPosition = modelViewMatrix * vec4( newPosition, 1.0 );
      gl_PointSize = 2.0;
      gl_Position = projectionMatrix * mvPosition;
    }
  `,
  fragmentShader: `
    uniform vec3 u_color;
    varying float vAlpha;

    void main() {
      gl_FragColor = vec4( u_color, vAlpha );
    }
  `,
  transparent: true
}

export { HeadShader }
