const SplitShader = {
  uniforms: {
    time: { value: 1.0 }
  },

  vertexShader: `
    attribute vec4 position;
    attribute vec3 normal;

    uniform mat4 projectionMatrix;
    uniform mat4 modelViewMatrix;

    uniform float time;

    varying vec3 vNormal;

    void main () {
      vNormal = normal;

      vec4 offset = position;

      // Animate between 0 and 1
      // sin(x) returns a value in [-1...1] range
      float dist = sin(time) * 0.5 + 0.5;

      offset.xyz += normal * dist;
      gl_Position = projectionMatrix * modelViewMatrix * offset;
    }
  `,

  fragmentShader: `
    precision highp float;

    varying vec3 vNormal;

    void main () {
      gl_FragColor = vec4(vNormal, 1.0);
    }
  `,
}

export { SplitShader }
