import { Suspense, useEffect, useMemo, useRef, useState } from "react";
import { Canvas, useFrame, useLoader, useThree } from "@react-three/fiber";
import * as THREE from "three";

// Hero "ciudad" en React Three Fiber (/home4): camino con palmeras que pasan junto al coche,
// sol rayado, ciudad que se acerca y piso que lo refleja todo. Cielo transparente (degradado CSS detrás).

const FOV = 50;
const SPEED = 6; // unidades por segundo
const ROAD = 0.9; // medio ancho del camino
const PALM_X = 1.75, PALM_DZ = 4.5, PALM_N = 15, PALM_H = 3.2;
const SPAN = PALM_DZ * PALM_N;
const D_SKY = 240; // distancia del sol y la ciudad

// ?poster congela la escena en el frame 0 (para generar public/assets/hero-city-poster.webp)
const FROZEN = typeof location !== "undefined" && new URLSearchParams(location.search).has("poster");
const step = (dt) => (FROZEN ? 0 : Math.min(dt, 0.05));

const VERT = `varying vec2 vUv; varying float vDepth;
  void main(){ vUv = uv; vec4 mv = modelViewMatrix * vec4(position,1.0); vDepth = -mv.z; gl_Position = projectionMatrix * mv; }`;

// encuadre igual al de los SVG de la v5: horizonte en y = H − 380·s
function useFrameInfo() {
  const { size } = useThree();
  const s = Math.max(size.width / 1440, size.height / 900);
  const focal = size.height / 2 / Math.tan(THREE.MathUtils.degToRad(FOV / 2));
  return { s, focal, size };
}

function Rig({ mouse, clock }) {
  const { camera } = useThree();
  const { s, focal, size } = useFrameInfo();
  useFrame((_, dt) => {
    clock.current.t += step(dt);
    clock.current.travel += step(dt) * SPEED;
    const hy = size.height - 380 * s;
    camera.position.x += (mouse.current * 0.3 - camera.position.x) * Math.min(1, step(dt) * 3);
    camera.rotation.set(Math.atan((hy - size.height / 2) / focal), -camera.position.x * 0.03, 0);
  });
  return null;
}

// Sol: degradado amarillo → naranja → rosa, franjas que bajan y se ensanchan, halo que respira.
function Sun({ clock, mirror = false }) {
  const mat = useMemo(
    () =>
      new THREE.ShaderMaterial({
        transparent: true,
        depthWrite: false,
        side: THREE.DoubleSide,
        uniforms: { uTime: { value: 0 }, uAlpha: { value: mirror ? 0.4 : 1 } },
        vertexShader: VERT,
        fragmentShader: /* glsl */ `
          uniform float uTime, uAlpha; varying vec2 vUv;
          void main() {
            vec2 p = (vUv - 0.5) * 3.0;
            float r = length(p);
            float t = 1.0 - (p.y + 1.0) * 0.5;
            vec3 c = mix(vec3(1.0,0.84,0.25), vec3(1.0,0.62,0.22), smoothstep(0.0,0.45,t));
            c = mix(c, vec3(1.0,0.33,0.52), smoothstep(0.45,0.75,t));
            c = mix(c, vec3(1.0,0.18,0.7), smoothstep(0.75,1.0,t));
            float body = 1.0 - smoothstep(0.995, 1.005, r);
            float y = -p.y;
            float k = fract(y * 4.0 - uTime * 0.5);
            float gap = mix(0.04, 0.6, clamp(y + 0.1, 0.0, 1.0));
            float stripe = y > -0.1 ? step(gap, k) : 1.0;
            float pulse = 0.82 + 0.18 * sin(uTime * 1.3);
            float halo = exp(-max(r - 0.9, 0.0) * 2.4) * 0.6 * pulse * (1.0 - smoothstep(1.05, 1.48, r));
            vec3 col = c * body * stripe + vec3(1.0, 0.3, 0.55) * halo * (1.0 - body * stripe);
            gl_FragColor = vec4(col, max(body * stripe, halo) * uAlpha);
          }`,
      }),
    [mirror]
  );
  const ref = useRef();
  const { s, focal } = useFrameInfo();
  const { camera } = useThree();
  useFrame(() => {
    mat.uniforms.uTime.value = clock.current.t;
    const r = ((175 * s) / focal) * D_SKY;
    const y = ((95 * s) / focal) * D_SKY + camera.position.y; // centro 95 px sobre el horizonte
    ref.current.scale.set(r * 3, r * 3 * (mirror ? -1 : 1), 1);
    ref.current.position.set(camera.position.x * 0.9, mirror ? -y : y, -D_SKY);
  });
  return <mesh ref={ref} material={mat} renderOrder={mirror ? 1 : 0}><planeGeometry args={[1, 1]} /></mesh>;
}

// Ciudad: se acerca despacio (crece de 50 % a 100 % con una curva suave) y se refleja.
function City({ clock, mirror = false }) {
  const tex = useLoader(THREE.TextureLoader, "/assets/city.webp");
  tex.colorSpace = THREE.SRGBColorSpace;
  const mat = useMemo(
    () => new THREE.MeshBasicMaterial({ map: tex, transparent: true, depthWrite: false, toneMapped: false, side: THREE.DoubleSide, opacity: mirror ? 0.35 : 1 }),
    [tex, mirror]
  );
  const ref = useRef();
  const { s, focal } = useFrameInfo();
  const { camera } = useThree();
  useFrame(() => {
    const k = 0.5 + 0.5 * (1 - Math.exp(-clock.current.t / 14));
    const w = ((1150 * s * k) / focal) * D_SKY, h = (w * 520) / 2400;
    ref.current.scale.set(w, mirror ? -h : h, 1);
    ref.current.position.set(camera.position.x * 0.85, mirror ? -h / 2 : h / 2, -D_SKY + 1);
  });
  return <mesh ref={ref} material={mat} renderOrder={mirror ? 2 : 1}><planeGeometry args={[1, 1]} /></mesh>;
}

// Línea cian del horizonte con bruma rosa encima
function Horizon() {
  const mat = useMemo(
    () =>
      new THREE.ShaderMaterial({
        transparent: true,
        depthWrite: false,
        vertexShader: VERT,
        fragmentShader: `varying vec2 vUv; void main(){
          float d = (vUv.y - 0.5) * 2.0;
          float line = 1.0 - smoothstep(0.0, 0.05, abs(d));
          float cyan = exp(-abs(d) * 9.0) * 0.7 + line;
          float pink = exp(-max(d, 0.0) * 3.0) * step(0.0, d) * 0.35;
          // alfa = intensidad (mezcla normal): así no tapa el cielo CSS con negro
          float a = clamp(cyan + pink, 0.0, 1.0);
          vec3 col = (vec3(0.25, 0.94, 1.0) * cyan + vec3(1.0, 0.18, 0.7) * pink) / max(a, 1e-3);
          gl_FragColor = vec4(min(col, vec3(1.0)), a); }`,
      }),
    []
  );
  const ref = useRef();
  const { camera } = useThree();
  useFrame(() => ref.current.position.set(camera.position.x, 0, -D_SKY + 2));
  return <mesh ref={ref} material={mat} renderOrder={5}><planeGeometry args={[1200, 14]} /></mesh>;
}

// Piso: camino oscuro con bordes y raya central cian; fuera del camino, cuadrícula rosa. Semitransparente = reflejos.
function Floor({ clock }) {
  const mat = useMemo(
    () =>
      new THREE.ShaderMaterial({
        transparent: true,
        depthWrite: false,
        uniforms: { uTravel: { value: 0 } },
        vertexShader: `varying vec3 vW; varying float vDepth;
          void main(){ vec4 w = modelMatrix * vec4(position,1.0); vW = w.xyz; vec4 mv = viewMatrix * w; vDepth = -mv.z; gl_Position = projectionMatrix * mv; }`,
        fragmentShader: /* glsl */ `
          uniform float uTravel; varying vec3 vW; varying float vDepth;
          float lineAA(float v, float w) { float d = abs(fract(v - 0.5) - 0.5) / fwidth(v); return 1.0 - smoothstep(w * 0.5, w * 0.5 + 1.0, d); }
          void main() {
            float x = vW.x, z = vW.z - uTravel;
            float ax = abs(x);
            float far = smoothstep(25.0, 110.0, vDepth);
            float road = 1.0 - step(${ROAD.toFixed(2)}, ax);
            // cuadrícula rosa fuera del camino
            float g = max(lineAA(x / 0.6, 1.6), lineAA(z / 1.2, 1.6)) * (1.0 - road) * (1.0 - far);
            // bordes del camino y raya central discontinua (cian)
            float edge = 1.0 - smoothstep(0.0, fwidth(x) * 1.8, abs(ax - ${ROAD.toFixed(2)}));
            float dash = (1.0 - smoothstep(0.035, 0.035 + fwidth(x), ax)) * step(fract(z / 3.0), 0.42);
            vec3 col = mix(vec3(0.043, 0.016, 0.125), vec3(0.02, 0.008, 0.06), road);
            col += mix(vec3(1.0, 0.18, 0.7), vec3(0.7, 0.42, 1.0), far) * g * 0.7 + vec3(0.25, 0.94, 1.0) * (edge * 1.1 + dash) * (1.0 - far * 0.7);
            float a = mix(0.8, 0.5, far);
            a = max(a, max(g * 0.8, max(edge, dash) * (1.0 - far)));
            gl_FragColor = vec4(col, a);
          }`,
      }),
    []
  );
  useFrame(() => { mat.uniforms.uTravel.value = clock.current.travel; });
  return (
    <mesh material={mat} rotation-x={-Math.PI / 2} position={[0, 0, -D_SKY / 2 + 4]} renderOrder={4}>
      <planeGeometry args={[600, D_SKY + 8]} />
    </mesh>
  );
}

// Palmeras a los lados del camino: avanzan hacia la cámara y se reciclan al fondo (aparecen con niebla).
function Palms({ clock, mirror = false }) {
  const tex = useLoader(THREE.TextureLoader, "/assets/palm.webp");
  tex.colorSpace = THREE.SRGBColorSpace;
  const mat = useMemo(
    () =>
      new THREE.ShaderMaterial({
        transparent: true,
        depthWrite: !mirror,
        side: THREE.DoubleSide,
        uniforms: { uMap: { value: tex }, uAlpha: { value: mirror ? 0.3 : 1 } },
        vertexShader: VERT,
        fragmentShader: `uniform sampler2D uMap; uniform float uAlpha; varying vec2 vUv; varying float vDepth;
          void main(){ vec4 c = texture2D(uMap, vUv); float fade = 1.0 - smoothstep(${(SPAN * 0.72).toFixed(1)}, ${(SPAN * 0.95).toFixed(1)}, vDepth);
            if (c.a < 0.45) discard; gl_FragColor = vec4(c.rgb, uAlpha * fade); }`,
      }),
    [tex, mirror]
  );
  const geo = useMemo(() => {
    const w = PALM_H * (560 / 840);
    return new THREE.PlaneGeometry(w, PALM_H).translate((0.5 - 0.47) * w, PALM_H / 2, 0); // base del tronco en el origen
  }, []);
  const palms = useMemo(() => {
    const out = [];
    let seed = 3;
    const r = () => ((seed = (seed * 16807) % 2147483647) / 2147483647);
    for (const side of [-1, 1])
      for (let i = 0; i < PALM_N; i++)
        out.push({ side, off: i * PALM_DZ + (side > 0 ? PALM_DZ / 2 : 0) + r() * 1.2, k: 0.85 + r() * 0.4, dx: r() * 0.35 });
    return out;
  }, []);
  const refs = useRef([]);
  useFrame(() => {
    const tr = clock.current.travel;
    palms.forEach((p, i) => {
      const m = refs.current[i];
      if (!m) return;
      const z = -((((p.off - tr) % SPAN) + SPAN) % SPAN) + 3;
      m.position.set(p.side * (PALM_X + p.dx), 0, z);
      m.scale.set(-p.side * p.k, (mirror ? -1 : 1) * p.k, 1); // las de la izquierda se voltean
    });
  });
  return palms.map((p, i) => (
    <mesh key={i} ref={(el) => (refs.current[i] = el)} geometry={geo} material={mat} renderOrder={mirror ? 3 : 6} frustumCulled={false} />
  ));
}

function Ready({ onReady }) {
  const n = useRef(0);
  useFrame(() => { if (++n.current === 3) onReady(); });
  return null;
}

export default function HeroCity3D() {
  const [ok, setOk] = useState(false);
  const [visible, setVisible] = useState(true);
  const mouse = useRef(0);
  const clock = useRef({ t: 0, travel: 0 });
  useEffect(() => {
    const hero = document.getElementById("inicio");
    const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;
    const weak = (navigator.hardwareConcurrency || 4) <= 2 || (navigator.deviceMemory || 4) <= 2;
    const force = new URLSearchParams(location.search).has("3d");
    if (!force && (reduce || weak)) return; // se queda el póster
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
      camera={{ fov: FOV, near: 0.1, far: 600, position: [0, 1, 0] }}
      gl={{ alpha: true, antialias: true, powerPreference: "high-performance" }}
    >
      <Rig mouse={mouse} clock={clock} />
      {/* orden de dibujo: reflejos → piso semitransparente → horizonte → palmeras */}
      <Suspense fallback={null}>
        <Sun clock={clock} />
        <Sun clock={clock} mirror />
        <City clock={clock} />
        <City clock={clock} mirror />
        <Palms clock={clock} mirror />
        <Floor clock={clock} />
        <Horizon />
        <Palms clock={clock} />
        <Ready onReady={() => document.getElementById("inicio")?.classList.add("rw-scene-on")} />
      </Suspense>
    </Canvas>
  );
}
