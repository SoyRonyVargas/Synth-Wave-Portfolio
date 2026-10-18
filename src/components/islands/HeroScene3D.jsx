import { useEffect, useMemo, useRef, useState } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";

// Variante React Three Fiber del hero (/home1).
// Terreno low-poly con camino al centro: dos tramos iguales que se turnan hacia la cámara (avance infinito).
// El cielo es transparente: detrás quedan el degradado y las estrellas CSS de la v5.

const ROAD = 1; // medio ancho del camino
const DZ = 0.6; // separación entre filas
const ROWS = 80; // filas por tramo
const L = ROWS * DZ; // largo del tramo
const SPEED = 3.3;
const FOV = 50;
// ?poster congela la escena en el frame 0: sirve para generar public/assets/hero-poster.webp,
// la imagen que se ve mientras carga Three.js (así la escena arranca justo donde termina la imagen).
const FROZEN = typeof location !== "undefined" && new URLSearchParams(location.search).has("poster");
const step = (dt) => (FROZEN ? 0 : Math.min(dt, 0.05));

const side = [];
for (let k = 1, x = ROAD; k <= 20; k++) side.push((x *= 1.22));
const XS = [...side.map((x) => -x).reverse(), -1, -0.75, -0.5, -0.25, 0, 0.25, 0.5, 0.75, 1, ...side];

function hash(a, b) {
  let h = (a * 374761393 + b * 668265263) | 0;
  h = Math.imul(h ^ (h >>> 13), 1274126177);
  return ((h ^ (h >>> 16)) >>> 0) / 4294967295;
}
function height(c, j) {
  const ax = Math.abs(XS[c]);
  if (ax <= ROAD) return 0;
  const ramp = Math.min(1, (ax - ROAD) / 2) ** 1.2;
  return ramp * ax * 0.42 * (0.35 + 0.65 * hash(c, j % ROWS)); // periódico: los tramos empalman
}

function useTerrainGeometry() {
  return useMemo(() => {
    const n = XS.length;
    const pos = [], grid = [], road = [];
    const v = (c, j, isRoad) => {
      pos.push(XS[c], height(c, j), -j * DZ);
      grid.push(c, j);
      road.push(isRoad);
    };
    // triángulos sueltos (sin índices) para que cada quad conserve su color
    for (let j = 0; j < ROWS; j++)
      for (let c = 0; c < n - 1; c++) {
        const isRoad = Math.abs(XS[c]) < ROAD + 1e-6 && Math.abs(XS[c + 1]) < ROAD + 1e-6;
        const q = [[c, j], [c + 1, j], [c + 1, j + 1], [c, j], [c + 1, j + 1], [c, j + 1]];
        for (const [cc, jj] of q) v(cc, jj, isRoad ? 1 : 0);
      }
    const g = new THREE.BufferGeometry();
    g.setAttribute("position", new THREE.Float32BufferAttribute(pos, 3));
    g.setAttribute("aGrid", new THREE.Float32BufferAttribute(grid, 2));
    g.setAttribute("aRoad", new THREE.Float32BufferAttribute(road, 1));
    return g;
  }, []);
}

const terrainMat = () =>
  new THREE.ShaderMaterial({
    transparent: true,
    uniforms: { uFogNear: { value: 22 }, uFogFar: { value: 44 } },
    vertexShader: /* glsl */ `
      attribute vec2 aGrid; attribute float aRoad;
      varying vec2 vGrid; varying float vRoad; varying float vDepth;
      void main() {
        vGrid = aGrid; vRoad = aRoad;
        vec4 mv = modelViewMatrix * vec4(position, 1.0);
        vDepth = -mv.z;
        gl_Position = projectionMatrix * mv;
      }`,
    fragmentShader: /* glsl */ `
      uniform float uFogNear, uFogFar;
      varying vec2 vGrid; varying float vRoad; varying float vDepth;
      void main() {
        vec2 d = abs(fract(vGrid - 0.5) - 0.5) / fwidth(vGrid);
        float m = min(d.x, d.y);
        float w = mix(1.3, 2.2, vRoad);               // grosor en px
        float line = 1.0 - smoothstep(w * 0.5, w * 0.5 + 1.0, m);
        float glow = 1.0 - smoothstep(0.0, w * 3.5, m);
        vec3 lineCol = mix(vec3(0.231, 0.608, 1.0), vec3(1.0, 0.247, 0.847), vRoad);
        vec3 base = mix(vec3(0.027, 0.031, 0.165), vec3(0.071, 0.008, 0.122), vRoad);
        vec3 col = base + lineCol * (line + glow * 0.22);
        float fog = smoothstep(uFogNear, uFogFar, vDepth);
        gl_FragColor = vec4(col, 1.0 - fog);
      }`,
  });

function Terrain() {
  const geo = useTerrainGeometry();
  const mat = useMemo(terrainMat, []);
  const a = useRef(), b = useRef();
  const travel = useRef(0);
  useFrame((_, dt) => {
    travel.current = (travel.current + step(dt) * SPEED) % L;
    a.current.position.z = travel.current;
    b.current.position.z = travel.current - L;
  });
  return (
    <>
      <mesh ref={a} geometry={geo} material={mat} frustumCulled={false} />
      <mesh ref={b} geometry={geo} material={mat} frustumCulled={false} />
    </>
  );
}

// Sol: degradado de la v5, franjas que bajan y se engrosan, y halo que respira.
function Sun() {
  const mat = useMemo(
    () =>
      new THREE.ShaderMaterial({
        transparent: true,
        depthWrite: false,
        uniforms: { uTime: { value: 0 } },
        vertexShader: `varying vec2 vUv; void main(){ vUv = uv; gl_Position = projectionMatrix * modelViewMatrix * vec4(position,1.0); }`,
        fragmentShader: /* glsl */ `
          uniform float uTime; varying vec2 vUv;
          void main() {
            vec2 p = (vUv - 0.5) * 3.0;                 // el plano mide 3 radios: deja sitio al halo
            float r = length(p);
            float t = 1.0 - (p.y + 1.0) * 0.5;          // 0 arriba, 1 abajo
            vec3 c = mix(vec3(1.0,0.824,0.247), vec3(1.0,0.635,0.227), smoothstep(0.0,0.4,t));
            c = mix(c, vec3(1.0,0.353,0.541), smoothstep(0.4,0.7,t));
            c = mix(c, vec3(1.0,0.184,0.816), smoothstep(0.7,1.0,t));
            float body = 1.0 - smoothstep(0.995, 1.005, r);
            // franjas: solo en la mitad baja, bajan con el tiempo y se ensanchan
            float y = -p.y;
            float k = fract(y * 3.5 - uTime * 0.55);
            float gap = mix(0.05, 0.55, clamp(y, 0.0, 1.0));
            float stripe = y > 0.0 ? step(gap, k) : 1.0;
            float pulse = 0.82 + 0.18 * sin(uTime * 1.4);
            float halo = exp(-max(r - 0.85, 0.0) * 2.2) * 0.55 * pulse * (1.0 - smoothstep(1.05, 1.48, r)); // se apaga antes del borde del plano
            vec3 col = c * body * stripe + vec3(1.0, 0.35, 0.65) * halo * (1.0 - body * stripe);
            float alpha = max(body * stripe, halo);
            gl_FragColor = vec4(col, alpha);
          }`,
      }),
    []
  );
  const ref = useRef();
  const { size, camera } = useThree();
  useFrame((_, dt) => {
    mat.uniforms.uTime.value += step(dt); // arranca en 0, igual que el póster
    // radio de 150 px y centro 134 px sobre el horizonte, como el sol CSS (escalado con el encuadre)
    const s = Math.max(size.width / 1440, size.height / 900);
    const focal = size.height / 2 / Math.tan(THREE.MathUtils.degToRad(FOV / 2));
    const D = 200;
    const r = ((150 * s) / focal) * D;
    ref.current.scale.setScalar(r * 3);
    ref.current.position.set(camera.position.x, camera.position.y + ((134 * s) / focal) * D, -D);
  });
  return (
    <mesh ref={ref} material={mat} renderOrder={-1}>
      <planeGeometry args={[1, 1]} />
    </mesh>
  );
}

// Brillo rosa en el horizonte (la línea #ff9ff0 de la v5 con bruma)
function Horizon() {
  const mat = useMemo(
    () =>
      new THREE.ShaderMaterial({
        transparent: true,
        depthWrite: false,
        vertexShader: `varying vec2 vUv; void main(){ vUv = uv; gl_Position = projectionMatrix * modelViewMatrix * vec4(position,1.0); }`,
        fragmentShader: `varying vec2 vUv; void main(){ float d = abs(vUv.y - 0.5) * 2.0; float a = exp(-d * 6.0) * 0.45 + (1.0 - smoothstep(0.0, 0.04, d)) * 0.8; gl_FragColor = vec4(1.0, 0.45, 0.85, clamp(a, 0.0, 1.0)); }` // alfa = intensidad: no tapa el cielo CSS,
      }),
    []
  );
  const ref = useRef();
  const { camera } = useThree();
  useFrame(() => ref.current.position.set(camera.position.x, camera.position.y, -150));
  return (
    <mesh ref={ref} material={mat} renderOrder={-1}>
      <planeGeometry args={[900, 16]} />
    </mesh>
  );
}

// Cámara: horizonte en la misma altura que la v5 (y = 900 − 380·s) y paralaje suave con el mouse.
function Rig({ mouse }) {
  const { camera, size } = useThree();
  useFrame((_, dt) => {
    const s = Math.max(size.width / 1440, size.height / 900);
    const hy = size.height - 380 * s;
    const focal = size.height / 2 / Math.tan(THREE.MathUtils.degToRad(FOV / 2));
    const k = Math.min(1, step(dt) * 3);
    camera.position.x += (mouse.current * 0.35 - camera.position.x) * k;
    camera.rotation.set(Math.atan((hy - size.height / 2) / focal), -camera.position.x * 0.03, 0);
  });
  return null;
}

function Ready({ onReady }) {
  const n = useRef(0);
  useFrame(() => { if (++n.current === 2) onReady(); });
  return null;
}

export default function HeroScene3D() {
  const [ok, setOk] = useState(false);
  const [visible, setVisible] = useState(true);
  const mouse = useRef(0);
  useEffect(() => {
    const hero = document.getElementById("inicio");
    const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;
    const weak = (navigator.hardwareConcurrency || 4) <= 2 || (navigator.deviceMemory || 4) <= 2;
    const force = new URLSearchParams(location.search).has("3d");
    if (!force && (reduce || weak)) return; // se queda el hero CSS
    setOk(true);
    const io = new IntersectionObserver(([en]) => setVisible(en.isIntersecting));
    io.observe(hero);
    const move = (e) => { const r = hero.getBoundingClientRect(); mouse.current = ((e.clientX - r.left) / r.width - 0.5) * 2; };
    const leave = () => { mouse.current = 0; };
    hero.addEventListener("mousemove", move);
    hero.addEventListener("mouseleave", leave);
    return () => { io.disconnect(); hero.removeEventListener("mousemove", move); hero.removeEventListener("mouseleave", leave); };
  }, []);
  if (!ok) return null;
  return (
    <Canvas
      className="rw-hero-scene"
      style={{ position: "absolute", inset: 0 }}
      dpr={[1, 1.5]}
      frameloop={visible ? "always" : "never"}
      camera={{ fov: FOV, near: 0.1, far: 400, position: [0, 1, 0] }}
      gl={{ alpha: true, antialias: true, powerPreference: "high-performance" }}
    >
      <Rig mouse={mouse} />
      <Sun />
      <Horizon />
      <Terrain />
      <Ready onReady={() => document.getElementById("inicio")?.classList.add("rw-scene-on")} />
    </Canvas>
  );
}
