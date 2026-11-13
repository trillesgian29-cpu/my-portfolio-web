import { useEffect, useMemo, useRef } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';
import { RoomEnvironment } from 'three/examples/jsm/environments/RoomEnvironment.js';

interface EngineeringCoreSceneProps {
  theme: 'light' | 'dark';
  active: boolean;
  isSoftwareGl: boolean;
  onContextLost: () => void;
  onContextRestored: () => void;
}

interface TraceConfig {
  points: [number, number, number][];
  nodePos: [number, number, number];
  phase: number;
}

const TRACE_CONFIGS: TraceConfig[] = [
  {
    points: [
      [-0.62, 0.09, -0.35],
      [-1.05, 0.09, -0.35],
      [-1.35, 0.09, -0.65],
      [-1.65, 0.09, -0.65],
    ],
    nodePos: [-1.68, 0.14, -0.65],
    phase: 0,
  },
  {
    points: [
      [-0.62, 0.09, 0.35],
      [-1.08, 0.09, 0.35],
      [-1.38, 0.09, 0.68],
      [-1.68, 0.09, 0.68],
    ],
    nodePos: [-1.7, 0.14, 0.68],
    phase: 0.8,
  },
  {
    points: [
      [0.62, 0.09, -0.35],
      [1.05, 0.09, -0.35],
      [1.35, 0.09, -0.65],
      [1.65, 0.09, -0.65],
    ],
    nodePos: [1.68, 0.14, -0.65],
    phase: 1.6,
  },
  {
    points: [
      [0.62, 0.09, 0.35],
      [1.08, 0.09, 0.35],
      [1.38, 0.09, 0.68],
      [1.68, 0.09, 0.68],
    ],
    nodePos: [1.7, 0.14, 0.68],
    phase: 2.4,
  },
  {
    points: [
      [-0.32, 0.09, -0.62],
      [-0.32, 0.09, -0.96],
      [-0.72, 0.09, -1.24],
    ],
    nodePos: [-0.74, 0.14, -1.26],
    phase: 3.1,
  },
  {
    points: [
      [0.32, 0.09, -0.62],
      [0.32, 0.09, -0.96],
      [0.72, 0.09, -1.24],
    ],
    nodePos: [0.74, 0.14, -1.26],
    phase: 3.9,
  },
  {
    points: [
      [-0.32, 0.09, 0.62],
      [-0.32, 0.09, 0.96],
      [-0.72, 0.09, 1.24],
    ],
    nodePos: [-0.74, 0.14, 1.26],
    phase: 4.7,
  },
  {
    points: [
      [0.32, 0.09, 0.62],
      [0.32, 0.09, 0.96],
      [0.72, 0.09, 1.24],
    ],
    nodePos: [0.74, 0.14, 1.26],
    phase: 5.5,
  },
];

const _dummy = new THREE.Object3D();

function createRoundedBoardGeometry(width: number, depth: number, radius: number, thickness: number) {
  const shape = new THREE.Shape();
  const hw = width / 2;
  const hd = depth / 2;
  shape.moveTo(-hw + radius, -hd);
  shape.lineTo(hw - radius, -hd);
  shape.quadraticCurveTo(hw, -hd, hw, -hd + radius);
  shape.lineTo(hw, hd - radius);
  shape.quadraticCurveTo(hw, hd, hw - radius, hd);
  shape.lineTo(-hw + radius, hd);
  shape.quadraticCurveTo(-hw, hd, -hw, hd - radius);
  shape.lineTo(-hw, -hd + radius);
  shape.quadraticCurveTo(-hw, -hd, -hw + radius, -hd);

  const geo = new THREE.ExtrudeGeometry(shape, {
    depth: thickness,
    bevelEnabled: true,
    bevelThickness: 0.025,
    bevelSize: 0.025,
    bevelSegments: 2,
  });
  geo.rotateX(-Math.PI / 2);
  geo.center();
  return geo;
}

function StudioEnvironment() {
  const { gl, scene } = useThree();

  useEffect(() => {
    const pmrem = new THREE.PMREMGenerator(gl);
    const roomEnv = new RoomEnvironment();
    const renderTarget = pmrem.fromScene(roomEnv, 0.04);
    scene.environment = renderTarget.texture;
    roomEnv.dispose();
    pmrem.dispose();

    return () => {
      scene.environment = null;
      renderTarget.dispose();
    };
  }, [gl, scene]);

  return null;
}

function CoreAssembly({ theme }: { theme: 'light' | 'dark' }) {
  const boardGroupRef = useRef<THREE.Group>(null);
  const pinsMeshRef = useRef<THREE.InstancedMesh>(null);
  const keyLightRef = useRef<THREE.DirectionalLight>(null);
  const pulseMatRefs = useRef<Array<THREE.MeshStandardMaterial | null>>([]);
  const coreDieMatRef = useRef<THREE.MeshStandardMaterial>(null);
  const scrollProgressRef = useRef(0);

  const palette = useMemo(
    () =>
      theme === 'dark'
        ? {
            board: '#21152F',
            packageBody: '#160D22',
            metal: '#D8B4FE',
            trace: '#9333EA',
            node: '#C084FC',
            emissive: '#9333EA',
            die: '#2B1C3D',
            keyLight: '#F3E8FF',
            rimLight: '#C084FC',
          }
        : {
            board: '#2E1B47',
            packageBody: '#21152F',
            metal: '#D8B4FE',
            trace: '#9333EA',
            node: '#6B21A8',
            emissive: '#9333EA',
            die: '#3B2359',
            keyLight: '#FFF8FE',
            rimLight: '#9333EA',
          },
    [theme],
  );

  const boardGeo = useMemo(() => createRoundedBoardGeometry(4.2, 3.1, 0.22, 0.12), []);

  const traceGeometries = useMemo(() => {
    return TRACE_CONFIGS.map((cfg) => {
      const curve = new THREE.CatmullRomCurve3(
        cfg.points.map(([x, y, z]) => new THREE.Vector3(x, y, z)),
        false,
        'catmullrom',
        0.12,
      );
      return new THREE.TubeGeometry(curve, 24, 0.026, 6, false);
    });
  }, []);

  useEffect(() => {
    return () => {
      boardGeo.dispose();
      traceGeometries.forEach((g) => g.dispose());
    };
  }, [boardGeo, traceGeometries]);

  // Populate 24 chip perimeter pins using InstancedMesh
  useEffect(() => {
    const inst = pinsMeshRef.current;
    if (!inst) return;
    let idx = 0;
    const perSide = 6;
    const span = 0.9;

    for (let i = 0; i < perSide; i++) {
      const offset = -span / 2 + (span / (perSide - 1)) * i;
      // Left & right edges
      _dummy.position.set(-0.62, 0.11, offset);
      _dummy.rotation.set(0, 0, 0);
      _dummy.scale.set(1.4, 0.6, 0.55);
      _dummy.updateMatrix();
      inst.setMatrixAt(idx++, _dummy.matrix);

      _dummy.position.set(0.62, 0.11, offset);
      _dummy.updateMatrix();
      inst.setMatrixAt(idx++, _dummy.matrix);

      // Top & bottom edges
      _dummy.position.set(offset, 0.11, -0.62);
      _dummy.scale.set(0.55, 0.6, 1.4);
      _dummy.updateMatrix();
      inst.setMatrixAt(idx++, _dummy.matrix);

      _dummy.position.set(offset, 0.11, 0.62);
      _dummy.updateMatrix();
      inst.setMatrixAt(idx++, _dummy.matrix);
    }
    inst.instanceMatrix.needsUpdate = true;
    inst.computeBoundingSphere();
  }, []);

  // Track subtle scroll progress without React re-renders
  useEffect(() => {
    const onScroll = () => {
      const maxScroll = Math.max(window.innerHeight * 0.8, 500);
      scrollProgressRef.current = THREE.MathUtils.clamp(window.scrollY / maxScroll, 0, 1);
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useFrame((state, delta) => {
    const t = state.clock.getElapsedTime();
    const scroll = scrollProgressRef.current;

    // Subtle scroll-reactive camera + lighting shift
    const targetCamX = Math.sin(scroll * Math.PI * 0.4) * 0.45;
    const targetCamY = 3.1 - scroll * 0.55;
    const targetCamZ = 3.6 + scroll * 0.45;

    state.camera.position.x = THREE.MathUtils.damp(state.camera.position.x, targetCamX, 4, delta);
    state.camera.position.y = THREE.MathUtils.damp(state.camera.position.y, targetCamY, 4, delta);
    state.camera.position.z = THREE.MathUtils.damp(state.camera.position.z, targetCamZ, 4, delta);
    state.camera.lookAt(0, 0.05, 0);

    if (keyLightRef.current) {
      keyLightRef.current.position.x = THREE.MathUtils.damp(
        keyLightRef.current.position.x,
        2.8 - scroll * 1.4,
        4,
        delta,
      );
      keyLightRef.current.intensity = THREE.MathUtils.damp(
        keyLightRef.current.intensity,
        2.1 + scroll * 0.5,
        4,
        delta,
      );
    }

    if (boardGroupRef.current) {
      const targetRotY = Math.sin(t * 0.35) * 0.16 + state.pointer.x * 0.24;
      const targetRotX = 0.08 - state.pointer.y * 0.14;
      boardGroupRef.current.rotation.y = THREE.MathUtils.damp(
        boardGroupRef.current.rotation.y,
        targetRotY,
        5,
        delta,
      );
      boardGroupRef.current.rotation.x = THREE.MathUtils.damp(
        boardGroupRef.current.rotation.x,
        targetRotX,
        5,
        delta,
      );
    }

    // Pulse nodes along PCB pathways
    for (let i = 0; i < TRACE_CONFIGS.length; i++) {
      const mat = pulseMatRefs.current[i];
      if (mat) {
        const wave = 0.5 + 0.5 * Math.sin(t * 2.4 - TRACE_CONFIGS[i].phase);
        mat.emissiveIntensity = 0.45 + wave * 1.15;
      }
    }

    if (coreDieMatRef.current) {
      const coreWave = 0.5 + 0.5 * Math.sin(t * 1.8);
      coreDieMatRef.current.emissiveIntensity = 0.35 + coreWave * 0.55;
    }
  });

  const standoffs: [number, number, number][] = [
    [-1.85, 0.02, -1.3],
    [1.85, 0.02, -1.3],
    [-1.85, 0.02, 1.3],
    [1.85, 0.02, 1.3],
  ];

  const smdCapacitors: [number, number, number, number][] = [
    [-1.08, 0.12, -0.82, 0],
    [1.08, 0.12, -0.82, 0],
    [-1.08, 0.12, 0.82, Math.PI / 2],
    [1.08, 0.12, 0.82, Math.PI / 2],
  ];

  return (
    <>
      <hemisphereLight args={['#F3E8FF', '#21152F', 0.9]} />
      <directionalLight
        ref={keyLightRef}
        position={[2.8, 4.5, 3.2]}
        intensity={2.1}
        color={palette.keyLight}
      />
      <directionalLight position={[-3.5, 2.2, -2.5]} intensity={1.1} color={palette.rimLight} />

      <group ref={boardGroupRef}>
        {/* Primary PCB Substrate */}
        <mesh geometry={boardGeo}>
          <meshStandardMaterial color={palette.board} roughness={0.58} metalness={0.18} />
        </mesh>

        {/* Corner Mounting Standoffs */}
        {standoffs.map((pos, idx) => (
          <mesh key={idx} position={pos}>
            <cylinderGeometry args={[0.1, 0.1, 0.18, 12]} />
            <meshStandardMaterial color={palette.metal} roughness={0.25} metalness={0.85} />
          </mesh>
        ))}

        {/* IC Package Substrate */}
        <mesh position={[0, 0.13, 0]}>
          <boxGeometry args={[1.15, 0.12, 1.15]} />
          <meshStandardMaterial color={palette.packageBody} roughness={0.7} metalness={0.1} />
        </mesh>

        {/* Metallic Heat-Spreader Rim */}
        <mesh position={[0, 0.2, 0]}>
          <boxGeometry args={[0.92, 0.06, 0.92]} />
          <meshStandardMaterial color={palette.metal} roughness={0.22} metalness={0.88} />
        </mesh>

        {/* Central Silicon Die Core */}
        <mesh position={[0, 0.24, 0]}>
          <boxGeometry args={[0.56, 0.04, 0.56]} />
          <meshStandardMaterial
            ref={coreDieMatRef}
            color={palette.die}
            emissive={palette.emissive}
            emissiveIntensity={0.6}
            roughness={0.2}
            metalness={0.4}
          />
        </mesh>

        {/* 24 Perimeter Wire-Bond Pins */}
        <instancedMesh ref={pinsMeshRef} args={[undefined, undefined, 24]}>
          <boxGeometry args={[0.12, 0.06, 0.08]} />
          <meshStandardMaterial color={palette.metal} roughness={0.2} metalness={0.9} />
        </instancedMesh>

        {/* PCB Trace Pathways + Connected Pulsing Nodes */}
        {TRACE_CONFIGS.map((cfg, i) => (
          <group key={i}>
            <mesh geometry={traceGeometries[i]}>
              <meshStandardMaterial
                color={palette.trace}
                emissive={palette.emissive}
                emissiveIntensity={0.25}
                roughness={0.35}
                metalness={0.65}
              />
            </mesh>

            {/* Pad Base */}
            <mesh position={[cfg.nodePos[0], 0.09, cfg.nodePos[2]]}>
              <cylinderGeometry args={[0.12, 0.13, 0.04, 8]} />
              <meshStandardMaterial color={palette.metal} roughness={0.25} metalness={0.85} />
            </mesh>

            {/* Pulsing Octagonal Node */}
            <mesh position={cfg.nodePos}>
              <cylinderGeometry args={[0.075, 0.075, 0.1, 8]} />
              <meshStandardMaterial
                ref={(el) => {
                  pulseMatRefs.current[i] = el;
                }}
                color={palette.node}
                emissive={palette.emissive}
                emissiveIntensity={0.8}
                roughness={0.3}
                metalness={0.4}
              />
            </mesh>
          </group>
        ))}

        {/* Surface-Mount Capacitors */}
        {smdCapacitors.map(([x, y, z, rot], idx) => (
          <group key={idx} position={[x, y, z]} rotation={[0, rot, 0]}>
            <mesh>
              <boxGeometry args={[0.2, 0.08, 0.11]} />
              <meshStandardMaterial color="#6B21A8" roughness={0.5} metalness={0.2} />
            </mesh>
            <mesh position={[-0.085, 0, 0]}>
              <boxGeometry args={[0.04, 0.085, 0.115]} />
              <meshStandardMaterial color={palette.metal} roughness={0.2} metalness={0.9} />
            </mesh>
            <mesh position={[0.085, 0, 0]}>
              <boxGeometry args={[0.04, 0.085, 0.115]} />
              <meshStandardMaterial color={palette.metal} roughness={0.2} metalness={0.9} />
            </mesh>
          </group>
        ))}
      </group>
    </>
  );
}

export default function EngineeringCoreScene({
  theme,
  active,
  isSoftwareGl,
  onContextLost,
  onContextRestored,
}: EngineeringCoreSceneProps) {
  return (
    <Canvas
      dpr={isSoftwareGl ? 1 : [1, 1.75]}
      frameloop={active ? 'always' : 'never'}
      camera={{ position: [0, 3.1, 3.6], fov: 38, near: 0.1, far: 30 }}
      gl={{
        antialias: !isSoftwareGl,
        alpha: true,
        powerPreference: 'high-performance',
      }}
      onCreated={({ gl }) => {
        gl.outputColorSpace = THREE.SRGBColorSpace;
        gl.toneMapping = THREE.ACESFilmicToneMapping;
        gl.toneMappingExposure = 1.08;

        const canvas = gl.domElement;
        canvas.addEventListener('webglcontextlost', (e) => {
          e.preventDefault();
          onContextLost();
        });
        canvas.addEventListener('webglcontextrestored', () => {
          onContextRestored();
        });
      }}
      className="h-full w-full"
    >
      <StudioEnvironment />
      <CoreAssembly theme={theme} />
    </Canvas>
  );
}
