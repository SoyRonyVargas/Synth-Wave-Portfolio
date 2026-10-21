import { Suspense, useEffect, useMemo, useRef, useState } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { useGLTF } from "@react-three/drei";
import * as THREE from "three";

const MODEL = "/models/delorean.glb";

// Mismo "look" que los renders del sitio: cromo, calaveras rojas y luces rosa/cian.
function useSynthEnv() {
  const { gl, scene } = useThree();
  useEffect(() => {
    const c = document.createElement("canvas");
    c.width = 1024;
    c.height = 512;
    const g = c.getContext("2d");
    const gr = g.createLinearGradient(0, 0, 0, 256);
    gr.addColorStop(0, "#2a3a6a");
    gr.addColorStop(0.35, "#8a90c0");
    gr.addColorStop(0.6, "#3a1a7a");
    gr.addColorStop(0.85, "#ff3fb0");
    gr.addColorStop(1, "#ffb347");
    g.fillStyle = gr;
    g.fillRect(0, 0, 1024, 256);
    g.fillStyle = "#0b0016";
    g.fillRect(0, 256, 1024, 256);
    g.strokeStyle = "#ff3fd8";
    g.lineWidth = 3;
    for (let y = 262; y < 512; y += (y - 250) * 0.35 + 4) {
      g.beginPath();
      g.moveTo(0, y);
      g.lineTo(1024, y);
      g.stroke();
    }
    for (let x = 0; x < 1024; x += 32) {
      g.beginPath();
      g.moveTo(x, 256);
      g.lineTo(x, 512);
      g.stroke();
    }
    g.fillStyle = "#ffe066";
    g.beginPath();
    g.arc(768, 230, 40, 0, 7);
    g.fill();
    g.fillStyle = "#3bd0ff";
    g.fillRect(0, 200, 1024, 6);
    const tex = new THREE.CanvasTexture(c);
    tex.mapping = THREE.EquirectangularReflectionMapping;
    tex.colorSpace = THREE.SRGBColorSpace;
    const pm = new THREE.PMREMGenerator(gl);
    const env = pm.fromEquirectangular(tex).texture;
    scene.environment = env;
    return () => {
      env.dispose();
      tex.dispose();
      pm.dispose();
      scene.environment = null;
    };
  }, [gl, scene]);
}

function Car({ onReady }) {
  const { scene } = useGLTF(MODEL); // drei decodifica Meshopt automáticamente
  const ref = useRef();
  useMemo(() => {
    const chrome = new THREE.MeshPhysicalMaterial({
      color: "#d4d7e2",
      metalness: 1,
      roughness: 0.3,
      clearcoat: 0.4,
      envMapIntensity: 1.5,
    });
    const M = {
      aiStandardSurface9: new THREE.MeshStandardMaterial({ color: "#24222e", metalness: 0.3, roughness: 0.45 }),
      aiStandardSurface10: new THREE.MeshStandardMaterial({ color: "#08080c", metalness: 0.2, roughness: 0.2 }),
      aiStandardSurface41: new THREE.MeshBasicMaterial({ color: "#ff1636", toneMapped: false }),
      aiStandardSurface42: new THREE.MeshBasicMaterial({ color: "#ff1636", toneMapped: false }),
      aiStandardSurface43: new THREE.MeshBasicMaterial({ color: "#ff9020", toneMapped: false }),
      aiStandardSurface17: new THREE.MeshStandardMaterial({ color: "#3a3848", metalness: 0.9, roughness: 0.35 }),
      aiStandardSurface34: new THREE.MeshStandardMaterial({ color: "#0c0c0e", roughness: 0.85 }),
      aiStandardSurface35: chrome,
      aiStandardSurface3: new THREE.MeshPhysicalMaterial({
        color: "#101030",
        metalness: 0.2,
        roughness: 0.05,
        transparent: true,
        opacity: 0.85,
        envMapIntensity: 2,
      }),
      aiStandardSurface27: new THREE.MeshStandardMaterial({ color: "#101014", roughness: 0.6 }),
    };
    const box = new THREE.Box3();
    scene.traverse((o) => {
      if (!o.isMesh) return;
      const n = o.material.name;
      let m = M[n] || chrome;
      if (n === "lambert1") {
        box.setFromObject(o);
        if (box.max.z < -2.0) m = new THREE.MeshBasicMaterial({ color: "#ffd9e4", toneMapped: false });
      }
      o.material = m;
    });
  }, [scene]);
  useEffect(() => {
    onReady?.();
  }, [onReady]);
  // Va recto: sin giros a los lados, solo una vibración vertical mínima, como la suspensión sobre la carretera.
  useFrame(({ clock }) => {
    if (!ref.current) return;
    const t = clock.elapsedTime;
    ref.current.rotation.set(0, 0, 0);
    ref.current.position.y = 0.006 * Math.sin(t * 18) + 0.004 * Math.sin(t * 7.3);
  });
  return (
    <group ref={ref}>
      <primitive object={scene} />
    </group>
  );
}

function Scene({ onReady }) {
  useSynthEnv();
  const { camera } = useThree();
  useEffect(() => {
    camera.lookAt(0, 0.7, 0);
  }, [camera]);
  return (
    <>
      <directionalLight color="#ff3fd8" intensity={2.2} position={[-6, 2, -3]} />
      <directionalLight color="#3bd0ff" intensity={2.6} position={[6, 2, -3]} />
      <directionalLight color="#ffb36b" intensity={2} position={[0, 3, 8]} />
      <directionalLight color="#ffffff" intensity={1.4} position={[0, 8, -4]} />
      <ambientLight color="#4a2a80" intensity={0.6} />
      <Suspense fallback={null}>
        <Car onReady={onReady} />
      </Suspense>
    </>
  );
}

/** DeLorean en vivo. Mientras carga (o en equipos modestos) se ve el sprite de siempre. */
export default function DeLorean3D({ width = 360, height = 233 }) {
  const [use3d, setUse3d] = useState(false);
  const [ready, setReady] = useState(false);
  useEffect(() => {
    const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;
    const weak = (navigator.hardwareConcurrency || 4) <= 2 || (navigator.deviceMemory || 4) <= 2;
    const force = new URLSearchParams(location.search).has("3d"); // ?3d para probar en cualquier equipo
    setUse3d(force || (!reduce && !weak));
  }, []);
  return (
    <div style={{ position: "relative", width, height }}>
      {/* el sprite mide 360×233; se escala para cualquier tamaño */}
      <div
        style={{
          position: "absolute",
          left: 0,
          top: 0,
          width: 360,
          height: 233,
          transform: `scale(${width / 360}, ${height / 233})`,
          transformOrigin: "0 0",
          opacity: ready ? 0 : 1,
          transition: "opacity .6s",
        }}
      >
        <div
          className="rw-car-sprite"
          role="img"
          aria-label="DeLorean visto desde atrás conduciendo hacia el sol"
          style={{ width: 360, height: 233 }}
        />
      </div>
      {use3d && (
        <Canvas
          dpr={[1, 2]}
          camera={{ position: [0, 3.1, -9.5], fov: 11.8 }}
          gl={{ alpha: true, antialias: true, toneMapping: THREE.ACESFilmicToneMapping, toneMappingExposure: 1.2 }}
          style={{ position: "absolute", inset: 0, opacity: ready ? 1 : 0, transition: "opacity .6s" }}
        >
          <Scene onReady={() => setReady(true)} />
        </Canvas>
      )}
    </div>
  );
}
