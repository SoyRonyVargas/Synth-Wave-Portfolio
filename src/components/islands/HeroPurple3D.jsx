import { Suspense, useEffect, useMemo, useRef, useState } from "react";
import { Canvas, useFrame, useLoader, useThree } from "@react-three/fiber";
import { PerformanceMonitor } from "@react-three/drei";
import * as THREE from "three";

// Hero morado en React Three Fiber (/home7): sol amarillo gigante, terreno de alambre con colinas aleatorias,
// palmeras en la orilla y entre las montañas, carretera brillante con orillas de neón y piso que refleja todo.

const FOV = 50;
const SPEED = 6;
const ROAD = 1.3;
const PALM_X = 2.25, PALM_DZ = 4, PALM_N = 16, PALM_H = 3.4;
const PALM_SPAN = PALM_DZ * PALM_N;
const MT_IN = 3.1; // donde empiezan las montañas
const D_SKY = 240;

const FROZEN = typeof location !== "undefined" && new URLSearchParams(location.search).has("poster");
const step = (dt) => (FROZEN ? 0 : Math.min(dt, 0.05));
const VERT = `varying vec2 vUv; varying float vDepth;
  void main(){ vUv = uv; vec4 mv = modelViewMatrix * vec4(position,1.0); vDepth = -mv.z; gl_Position = projectionMatrix * mv; }`;

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

// El reflejo solo se ve en la franja pegada al horizonte (uv.y < 0.45): su plano se recorta ahí y no se pintan
// millones de píxeles invisibles en cada frame.
const SUN_GEO = new THREE.PlaneGeometry(1, 1);
const MIRROR_SUN_GEO = (() => {
  const g = new THREE.PlaneGeometry(1, 0.45).translate(0, -0.275, 0);
  const pos = g.attributes.position, uv = g.attributes.uv;
  for (let i = 0; i < uv.count; i++) uv.setY(i, pos.getY(i) + 0.5);
  return g;
})();

// Sol amarillo con franjas en la mitad baja
function Sun({ clock, mirror = false }) {
  const mat = useMemo(
    () =>
      new THREE.ShaderMaterial({
        transparent: true,
        depthWrite: false,
        side: THREE.DoubleSide,
        uniforms: { uTime: { value: 0 }, uAlpha: { value: mirror ? 0.22 : 1 }, uMirror: { value: mirror ? 1 : 0 } },
        vertexShader: VERT,
        fragmentShader: /* glsl */ `
          uniform float uTime, uAlpha, uMirror; varying vec2 vUv;
          void main() {
            vec2 p = (vUv - 0.5) * 3.0;
            float r = length(p);
            float t = 1.0 - (p.y + 1.0) * 0.5;
            vec3 c = mix(vec3(1.0,0.97,0.62), vec3(1.0,0.86,0.25), smoothstep(0.0,0.45,t));
            c = mix(c, vec3(1.0,0.6,0.25), smoothstep(0.45,0.72,t));
            c = mix(c, vec3(1.0,0.35,0.75), smoothstep(0.72,1.0,t));
            float body = 1.0 - smoothstep(0.995, 1.005, r);
            float y = -p.y;
            float k = fract(y * 5.0 - uTime * 0.45);
            float gap = mix(0.06, 0.55, clamp(y + 0.15, 0.0, 1.0));
            float stripe = y > -0.15 ? step(gap, k) : 1.0;
            float halo = exp(-max(r - 0.95, 0.0) * 2.0) * 0.55 * (1.0 - smoothstep(1.05, 1.48, r));
            vec3 col = c * body * stripe + vec3(1.0, 0.55, 0.9) * halo * (1.0 - body * stripe);
            // reflejo: solo una franja tenue pegada al horizonte (p.y ≈ -0.48), se apaga antes de llegar al DeLorean
            float fade = mix(1.0, 1.0 - smoothstep(-0.48, -0.15, p.y), uMirror);
            gl_FragColor = vec4(col, max(body * stripe, halo) * uAlpha * fade);
          }`,
      }),
    [mirror]
  );
  const ref = useRef();
  const { s, focal } = useFrameInfo();
  const { camera } = useThree();
  useFrame(() => {
    mat.uniforms.uTime.value = clock.current.t;
    const r = ((230 * s) / focal) * D_SKY;
    const y = ((110 * s) / focal) * D_SKY + camera.position.y;
    ref.current.scale.set(r * 3, r * 3 * (mirror ? -1 : 1), 1);
    ref.current.position.set(camera.position.x * 0.9, mirror ? -y : y, -D_SKY);
  });
  return <mesh ref={ref} geometry={mirror ? MIRROR_SUN_GEO : SUN_GEO} material={mat} renderOrder={mirror ? 1 : 0} />;
}

// Montañas: terreno continuo de cuadrícula (alambre) deformado con ruido fractal suave, que sube desde la orilla del camino.
// El ruido es periódico en z (MT_L) para que el tramo se repita sin costuras. Las palmeras sueltas se paran sobre las colinas.
const MT_L = 90, MT_DX = 1.0, MT_DZ = 1.0, MT_NC = 34, MT_NR = MT_L / MT_DZ;
function lattice(ix, iz, period, salt) {
  iz = ((iz % period) + period) % period;
  let h = (ix * 374761393 + iz * 668265263 + salt * 2246822519) | 0;
  h = Math.imul(h ^ (h >>> 13), 1274126177);
  return ((h ^ (h >>> 16)) >>> 0) / 4294967295;
}
function vnoise(x, z, cellsPerTile, salt) {
  // ruido de valor suave; cellsPerTile celdas a lo largo de MT_L → periódico en z
  const f = cellsPerTile / MT_L, X = x * f, Z = z * f;
  const ix = Math.floor(X), iz = Math.floor(Z), fx = X - ix, fz = Z - iz;
  const s = (t) => t * t * t * (t * (t * 6 - 15) + 10);
  const a = lattice(ix, iz, cellsPerTile, salt), b = lattice(ix + 1, iz, cellsPerTile, salt);
  const c = lattice(ix, iz + 1, cellsPerTile, salt), d = lattice(ix + 1, iz + 1, cellsPerTile, salt);
  const u = s(fx), v = s(fz);
  return a + (b - a) * u + (c - a) * v + (a - b - c + d) * u * v;
}
function terrainHeight(x, z) {
  const ax = Math.abs(x);
  if (ax <= MT_IN) return 0;
  const ramp = THREE.MathUtils.smoothstep(ax, MT_IN, MT_IN + 3.2);
  const fbm = vnoise(x, z, 12, 1) * 0.55 + vnoise(x, z, 24, 2) * 0.28 + vnoise(x, z, 48, 3) * 0.17; // colinas + detalle
  const big = vnoise(x, z, 4, 4);                                                                     // zonas altas y bajas
  return ramp * (0.2 + 2.0 * Math.pow(fbm, 1.5)) * (0.45 + 0.8 * big) * (0.85 + ax * 0.025);
}
const LAYOUT = (() => {
  let seed = 11;
  const r = () => ((seed = (seed * 16807) % 2147483647) / 2147483647);
  const palms = [];
  for (const side of [-1, 1])
    for (let i = 0; i < 11; i++) {
      const x = side * (MT_IN + 1.5 + r() * 16), z = r() * MT_L;
      palms.push({ side, x, y: terrainHeight(x, z) - 0.1, off: z + 3, k: 0.85 + r() * 0.6 });
    }
  return { palms };
})();
function useMountainGeometry() {
  return useMemo(() => {
    const pos = [], grid = [], idx = [];
    const cols = MT_NC + 1, rows = MT_NR + 1;
    for (const side of [-1, 1]) {
      const o = pos.length / 3;
      for (let j = 0; j < rows; j++)
        for (let c = 0; c < cols; c++) {
          const x = side * (MT_IN + c * MT_DX), z = j * MT_DZ;
          pos.push(x, terrainHeight(x, z), -z);
          grid.push(c, j);
        }
      for (let j = 0; j < rows - 1; j++)
        for (let c = 0; c < cols - 1; c++) {
          const a = o + j * cols + c, b = a + 1, d = a + cols, e = d + 1;
          idx.push(a, b, e, a, e, d);
        }
    }
    const g = new THREE.BufferGeometry();
    g.setAttribute("position", new THREE.Float32BufferAttribute(pos, 3));
    g.setAttribute("aGrid", new THREE.Float32BufferAttribute(grid, 2));
    g.setIndex(idx);
    return g;
  }, []);
}
function Mountains({ clock, mirror = false }) {
  const geo = useMountainGeometry();
  const mat = useMemo(
    () =>
      new THREE.ShaderMaterial({
        transparent: true,
        side: THREE.DoubleSide,
        depthWrite: !mirror,
        uniforms: { uAlpha: { value: mirror ? 0.35 : 1 } },
        vertexShader: `attribute vec2 aGrid; varying vec2 vGrid; varying vec3 vW; varying float vDepth;
          void main(){ vGrid = aGrid; vec4 w = modelMatrix * vec4(position,1.0); vW = w.xyz; vec4 mv = viewMatrix * w; vDepth = -mv.z; gl_Position = projectionMatrix * mv; }`,
        fragmentShader: /* glsl */ `
          uniform float uAlpha; varying vec2 vGrid; varying vec3 vW; varying float vDepth;
          void main() {
            vec3 n = normalize(cross(dFdx(vW), dFdy(vW)));
            if (n.y < 0.0) n = -n;
            float lam = clamp(dot(n, normalize(vec3(0.35, 0.8, 0.45))), 0.0, 1.0);
            float rim = pow(clamp(dot(n, normalize(vec3(0.0, 0.25, -1.0))), 0.0, 1.0), 2.5);
            vec3 col = mix(vec3(0.08, 0.025, 0.2), vec3(0.32, 0.15, 0.58), lam);
            col += vec3(1.0, 0.78, 0.3) * rim * 0.25;
            vec2 d = abs(fract(vGrid - 0.5) - 0.5) / fwidth(vGrid);
            float line = 1.0 - smoothstep(0.6, 1.6, min(d.x, d.y));
            col = mix(col, vec3(0.92, 0.82, 1.0), line * 0.45);
            float fog = smoothstep(30.0, ${(MT_L * 0.95).toFixed(1)}, vDepth);
            col = mix(col, vec3(0.55, 0.25, 0.7), fog * 0.8);
            gl_FragColor = vec4(col, (1.0 - smoothstep(${(MT_L * 0.75).toFixed(1)}, ${(MT_L * 0.98).toFixed(1)}, vDepth)) * uAlpha * 0.85);
          }`,
      }),
    [mirror]
  );
  const a = useRef(), b = useRef();
  useFrame(() => {
    const o = clock.current.travel % MT_L;
    const sy = mirror ? -1 : 1;
    a.current.position.z = o; b.current.position.z = o - MT_L;
    a.current.scale.y = sy; b.current.scale.y = sy;
  });
  return (
    <>
      <mesh ref={a} geometry={geo} material={mat} frustumCulled={false} renderOrder={mirror ? 2 : 7} />
      <mesh ref={b} geometry={geo} material={mat} frustumCulled={false} renderOrder={mirror ? 2 : 7} />
    </>
  );
}
// Piso: asfalto oscuro y brillante con orillas de neón y raya central amarilla; a los lados cuadrícula amarilla. Semitransparente = reflejos.
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
            float x = vW.x, z = vW.z - uTravel, ax = abs(x);
            float far = smoothstep(20.0, 90.0, vDepth);
            float road = 1.0 - step(${ROAD.toFixed(2)}, ax);
            float sideZone = step(${ROAD.toFixed(2)}, ax) * (1.0 - step(${(MT_IN + 0.6).toFixed(2)}, ax));
            float g = max(lineAA((ax - ${ROAD.toFixed(2)}) / 0.9, 2.0), lineAA(z / 2.4, 2.0)) * sideZone * (1.0 - far);
            float dash = (1.0 - smoothstep(0.05, 0.05 + fwidth(x), ax)) * step(fract(z / 3.2), 0.5);
            // orillas: línea de neón continua con resplandor; centro: raya con brillo; asfalto mojado que refleja el sol
            float edge = abs(ax - ${ROAD.toFixed(2)});
            float edgeLine = 1.0 - smoothstep(1.0, 2.4, edge / fwidth(x));
            float edgeGlow = exp(-edge * 7.0) * 0.45;
            float dashGlow = exp(-ax * 9.0) * step(fract(z / 3.2), 0.5) * 0.35 * road;
            float sheen = exp(-ax * 0.8) * smoothstep(3.0, 80.0, vDepth) * road;
            vec3 base = mix(vec3(0.1, 0.03, 0.22), vec3(0.04, 0.012, 0.1), road);
            vec3 yel = vec3(1.0, 0.82, 0.25);
            vec3 col = base + yel * (g * 0.9 + (dash + dashGlow) * (1.0 - far * 0.6) + (edgeLine + edgeGlow) * (1.0 - far * 0.4));
            col += vec3(1.0, 0.5, 0.78) * sheen * 0.3;
            float a = mix(0.72, 0.4, far);
            a = max(a, max(g, max(dash, max(edgeLine, edgeGlow)) * (1.0 - far)));
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

// Brillo del horizonte (rosa claro)
function Horizon() {
  const mat = useMemo(
    () =>
      new THREE.ShaderMaterial({
        transparent: true,
        depthWrite: false,
        vertexShader: VERT,
        fragmentShader: `varying vec2 vUv; void main(){
          float d = (vUv.y - 0.5) * 2.0;
          float a = clamp(exp(-abs(d) * 7.0) * 0.6, 0.0, 1.0);
          gl_FragColor = vec4(1.0, 0.6, 0.95, a); }`,
      }),
    []
  );
  const ref = useRef();
  const { camera } = useThree();
  useFrame(() => ref.current.position.set(camera.position.x, 0, -D_SKY + 2));
  return <mesh ref={ref} material={mat} renderOrder={5}><planeGeometry args={[1200, 18]} /></mesh>;
}

function usePalmMaterial(mirror, fadeNear, fadeFar) {
  const tex = useLoader(THREE.TextureLoader, "/assets/palm-violet.webp");
  tex.colorSpace = THREE.SRGBColorSpace;
  return useMemo(
    () =>
      new THREE.ShaderMaterial({
        transparent: true,
        depthWrite: !mirror,
        side: THREE.DoubleSide,
        uniforms: { uMap: { value: tex }, uAlpha: { value: mirror ? 0.35 : 1 } },
        vertexShader: VERT,
        fragmentShader: `uniform sampler2D uMap; uniform float uAlpha; varying vec2 vUv; varying float vDepth;
          void main(){ vec4 c = texture2D(uMap, vUv); float fade = 1.0 - smoothstep(${fadeNear.toFixed(1)}, ${fadeFar.toFixed(1)}, vDepth);
            if (c.a < 0.45) discard; vec3 col = mix(c.rgb, vec3(0.85, 0.45, 0.95), smoothstep(15.0, 55.0, vDepth) * 0.6);
            gl_FragColor = vec4(col, uAlpha * fade); }`,
      }),
    [tex, mirror, fadeNear, fadeFar]
  );
}
function usePalmGeometry() {
  return useMemo(() => {
    const w = PALM_H * (560 / 840);
    return new THREE.PlaneGeometry(w, PALM_H).translate((0.5 - 0.47) * w, PALM_H / 2, 0);
  }, []);
}
// Fila de palmeras a la orilla del camino
function Palms({ clock, mirror = false }) {
  const mat = usePalmMaterial(mirror, PALM_SPAN * 0.72, PALM_SPAN * 0.95);
  const geo = usePalmGeometry();
  const palms = useMemo(() => {
    const out = [];
    let seed = 5;
    const r = () => ((seed = (seed * 16807) % 2147483647) / 2147483647);
    for (const side of [-1, 1])
      for (let i = 0; i < PALM_N; i++)
        out.push({ side, off: i * PALM_DZ + (side > 0 ? PALM_DZ / 2 : 0) + r(), k: 0.9 + r() * 0.45, dx: r() * 0.3 });
    return out;
  }, []);
  const refs = useRef([]);
  useFrame(() => {
    const tr = clock.current.travel;
    palms.forEach((p, i) => {
      const m = refs.current[i];
      if (!m) return;
      const z = -((((p.off - tr) % PALM_SPAN) + PALM_SPAN) % PALM_SPAN) + 3;
      m.position.set(p.side * (PALM_X + p.dx), 0, z);
      m.scale.set(-p.side * p.k, (mirror ? -1 : 1) * p.k, 1);
    });
  });
  return palms.map((p, i) => (
    <mesh key={i} ref={(el) => (refs.current[i] = el)} geometry={geo} material={mat} renderOrder={mirror ? 3 : 8} frustumCulled={false} />
  ));
}
// Palmeras sueltas sobre las colinas (mismo tramo que el terreno, a la altura del suelo)
function ScatterPalms({ clock }) {
  const mat = usePalmMaterial(false, MT_L * 0.72, MT_L * 0.95);
  const geo = usePalmGeometry();
  const refs = useRef([]);
  useFrame(() => {
    const tr = clock.current.travel;
    LAYOUT.palms.forEach((p, i) => {
      const m = refs.current[i];
      if (!m) return;
      const z = -((((p.off - tr) % MT_L) + MT_L) % MT_L) + 3;
      m.position.set(p.x, p.y, z);
      m.scale.set(-p.side * p.k, p.k, 1);
    });
  });
  return LAYOUT.palms.map((p, i) => (
    <mesh key={i} ref={(el) => (refs.current[i] = el)} geometry={geo} material={mat} renderOrder={8} frustumCulled={false} />
  ));
}
function Ready({ onReady }) {
  const n = useRef(0);
  useFrame(() => { if (++n.current === 3) onReady(); });
  return null;
}

export default function HeroPurple3D() {
  const [ok, setOk] = useState(false);
  const [visible, setVisible] = useState(true);
  // resolución de la pantalla (tope 1.25 en retina); si el equipo no aguanta 60 fps baja un escalón
  const [dpr, setDpr] = useState(() => Math.min(window.devicePixelRatio || 1, 1.25));
  const mouse = useRef(0);
  const clock = useRef({ t: 0, travel: 0 });
  useEffect(() => {
    const hero = document.getElementById("inicio");
    const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;
    const weak = (navigator.hardwareConcurrency || 4) <= 2 || (navigator.deviceMemory || 4) <= 2;
    const force = new URLSearchParams(location.search).has("3d");
    if (!force && (reduce || weak)) return;
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
      dpr={dpr}
      frameloop={visible ? "always" : "never"}
      camera={{ fov: FOV, near: 0.1, far: 600, position: [0, 1, 0] }}
      gl={{ alpha: true, antialias: false, powerPreference: "high-performance" }}
    >
      <PerformanceMonitor onDecline={() => setDpr((d) => Math.max(0.75, +(d - 0.25).toFixed(2)))} />
      <Rig mouse={mouse} clock={clock} />
      <Suspense fallback={null}>
        <Sun clock={clock} />
        <Mountains clock={clock} mirror />
        <Palms clock={clock} mirror />
        <Floor clock={clock} />
        <Horizon />
        <Mountains clock={clock} />
        <Palms clock={clock} />
        <ScatterPalms clock={clock} />
        <Ready onReady={() => document.getElementById("inicio")?.classList.add("rw-scene-on")} />
      </Suspense>
    </Canvas>
  );
}
