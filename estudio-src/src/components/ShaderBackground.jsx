import { useEffect, useRef } from 'react'

// Fondo inmersivo: shader GLSL propio (WebGL) con un gradiente pastel que
// fluye usando ruido fbm + domain warping y reacciona suavemente al mouse.
// Sin dependencias. Si no hay WebGL, queda el gradiente CSS del <body>.

const VERT = `
attribute vec2 position;
void main() {
  gl_Position = vec4(position, 0.0, 1.0);
}
`

const FRAG = `
precision highp float;
uniform vec2 u_res;
uniform float u_time;
uniform vec2 u_mouse;

// Paleta pastel capuchino
const vec3 cream = vec3(0.984, 0.965, 0.945);
const vec3 lav1  = vec3(0.812, 0.741, 0.965);
const vec3 lav2  = vec3(0.659, 0.549, 0.902);
const vec3 peach = vec3(0.949, 0.718, 0.604);
const vec3 capp  = vec3(0.847, 0.737, 0.639);

float hash(vec2 p){ return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453123); }

float noise(vec2 p){
  vec2 i = floor(p);
  vec2 f = fract(p);
  vec2 u = f*f*(3.0-2.0*f);
  return mix(mix(hash(i+vec2(0.0,0.0)), hash(i+vec2(1.0,0.0)), u.x),
             mix(hash(i+vec2(0.0,1.0)), hash(i+vec2(1.0,1.0)), u.x), u.y);
}

float fbm(vec2 p){
  float v = 0.0;
  float a = 0.5;
  for(int i=0;i<3;i++){
    v += a*noise(p);
    p *= 2.0;
    a *= 0.5;
  }
  return v;
}

void main(){
  vec2 uv = gl_FragCoord.xy / u_res.xy;
  vec2 asp = vec2(u_res.x/u_res.y, 1.0);
  vec2 p = uv * asp;

  float t = u_time * 0.05;
  vec2 m = (u_mouse - 0.5) * 0.35;

  // domain warping
  vec2 q = vec2(fbm(p*1.6 + t + m), fbm(p*1.6 - t + vec2(5.2,1.3)));
  vec2 r = vec2(fbm(p*1.6 + 1.7*q + vec2(1.7,9.2) + 0.15*t),
                fbm(p*1.6 + 1.7*q + vec2(8.3,2.8) - 0.126*t));
  float f = fbm(p*1.6 + 2.0*r);

  vec3 col = cream;
  col = mix(col, lav1, smoothstep(0.15, 0.75, f));
  col = mix(col, lav2, smoothstep(0.35, 0.95, length(r)));
  col = mix(col, peach, smoothstep(0.55, 1.05, q.x + 0.25));
  col = mix(col, capp, smoothstep(0.2, 0.9, r.y) * 0.35);

  // aclarar arriba, para que el texto respire
  col = mix(col, cream, smoothstep(0.55, 0.0, uv.y) * 0.35);

  // viñeta muy suave
  float vig = smoothstep(1.25, 0.4, distance(uv, vec2(0.5)));
  col = mix(col, col*0.96, 1.0 - vig);

  gl_FragColor = vec4(col, 1.0);
}
`

export default function ShaderBackground() {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    const gl = canvas.getContext('webgl', { antialias: false, alpha: false })
    if (!gl) return // fallback: gradiente CSS del body

    const compile = (type, src) => {
      const s = gl.createShader(type)
      gl.shaderSource(s, src)
      gl.compileShader(s)
      if (!gl.getShaderParameter(s, gl.COMPILE_STATUS)) {
        console.warn('shader error', gl.getShaderInfoLog(s))
      }
      return s
    }

    const prog = gl.createProgram()
    gl.attachShader(prog, compile(gl.VERTEX_SHADER, VERT))
    gl.attachShader(prog, compile(gl.FRAGMENT_SHADER, FRAG))
    gl.linkProgram(prog)
    gl.useProgram(prog)

    const buf = gl.createBuffer()
    gl.bindBuffer(gl.ARRAY_BUFFER, buf)
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 3, -1, -1, 3]), gl.STATIC_DRAW)
    const loc = gl.getAttribLocation(prog, 'position')
    gl.enableVertexAttribArray(loc)
    gl.vertexAttribPointer(loc, 2, gl.FLOAT, false, 0, 0)

    const uRes = gl.getUniformLocation(prog, 'u_res')
    const uTime = gl.getUniformLocation(prog, 'u_time')
    const uMouse = gl.getUniformLocation(prog, 'u_mouse')

    const mouse = { x: 0.5, y: 0.5 }
    const target = { x: 0.5, y: 0.5 }
    const onMove = (e) => {
      target.x = e.clientX / window.innerWidth
      target.y = 1.0 - e.clientY / window.innerHeight
    }
    window.addEventListener('pointermove', onMove)

    // El gradiente es muy suave, así que renderizamos a menor resolución
    // (0.55x) y dejamos que CSS lo estire: ~3x menos trabajo de fragmentos.
    const SCALE = 0.55
    const resize = () => {
      canvas.width = Math.floor(window.innerWidth * SCALE)
      canvas.height = Math.floor(window.innerHeight * SCALE)
      gl.viewport(0, 0, canvas.width, canvas.height)
    }
    resize()
    window.addEventListener('resize', resize)

    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    let raf
    let visible = true
    const onVis = () => {
      visible = !document.hidden
      if (visible) raf = requestAnimationFrame(render)
    }
    document.addEventListener('visibilitychange', onVis)

    const start = performance.now()
    const render = (now) => {
      if (!visible) return
      mouse.x += (target.x - mouse.x) * 0.05
      mouse.y += (target.y - mouse.y) * 0.05
      gl.uniform2f(uRes, canvas.width, canvas.height)
      gl.uniform1f(uTime, reduce ? 0 : (now - start) / 1000)
      gl.uniform2f(uMouse, mouse.x, mouse.y)
      gl.drawArrays(gl.TRIANGLES, 0, 3)
      raf = requestAnimationFrame(render)
    }
    render(start)

    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('pointermove', onMove)
      window.removeEventListener('resize', resize)
      document.removeEventListener('visibilitychange', onVis)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className="pointer-events-none fixed inset-0 -z-10 h-full w-full"
      aria-hidden
    />
  )
}
