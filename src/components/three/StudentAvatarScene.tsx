import { useEffect, useMemo, useRef } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';
import { RoomEnvironment } from 'three/examples/jsm/environments/RoomEnvironment.js';

interface StudentAvatarSceneProps {
  theme: 'light' | 'dark';
  active: boolean;
  isSoftwareGl: boolean;
  onContextLost: () => void;
  onContextRestored: () => void;
}

function AvatarEnvironment() {
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

function LowPolyStudent({ theme }: { theme: 'light' | 'dark' }) {
  const figureRef = useRef<THREE.Group>(null);
  const headRef = useRef<THREE.Group>(null);
  const chipBadgeRef = useRef<THREE.Mesh>(null);

  const palette = useMemo(
    () =>
      theme === 'dark'
        ? {
            plinth: '#21152F',
            plinthTrim: '#C084FC',
            jacket: '#2B1C3D',
            shirt: '#F3E8FF',
            tie: '#9333EA',
            skin: '#E6BFA0',
            hair: '#180F24',
            glasses: '#D8B4FE',
            lens: '#C084FC',
            accentNode: '#D8B4FE',
          }
        : {
            plinth: '#EDE1FB',
            plinthTrim: '#6B21A8',
            jacket: '#21152F',
            shirt: '#FFFFFF',
            tie: '#6B21A8',
            skin: '#E6BFA0',
            hair: '#180F24',
            glasses: '#6B21A8',
            lens: '#D8B4FE',
            accentNode: '#9333EA',
          },
    [theme],
  );

  useFrame((state, delta) => {
    const t = state.clock.getElapsedTime();

    if (figureRef.current) {
      figureRef.current.rotation.y = THREE.MathUtils.damp(
        figureRef.current.rotation.y,
        Math.sin(t * 0.5) * 0.14 + state.pointer.x * 0.25,
        4.5,
        delta,
      );
    }

    if (headRef.current) {
      headRef.current.rotation.x = THREE.MathUtils.damp(
        headRef.current.rotation.x,
        -state.pointer.y * 0.14 + Math.sin(t * 1.1) * 0.025,
        5,
        delta,
      );
      headRef.current.rotation.y = THREE.MathUtils.damp(
        headRef.current.rotation.y,
        state.pointer.x * 0.18,
        5,
        delta,
      );
    }

    if (chipBadgeRef.current) {
      chipBadgeRef.current.position.y = 0.78 + Math.sin(t * 2) * 0.035;
      chipBadgeRef.current.rotation.y += delta * 0.9;
    }
  });

  return (
    <>
      <hemisphereLight args={['#F3E8FF', '#21152F', 1.05]} />
      <directionalLight position={[2.6, 3.8, 3.2]} intensity={2.0} color="#FFF8FE" />
      <directionalLight position={[-2.8, 1.8, -2.2]} intensity={1.15} color="#C084FC" />

      <group position={[0, -0.78, 0]}>
        {/* Grounded Hexagonal Plinth */}
        <mesh position={[0, 0.06, 0]}>
          <cylinderGeometry args={[0.92, 1.02, 0.12, 6]} />
          <meshStandardMaterial
            color={palette.plinth}
            roughness={0.62}
            metalness={0.15}
            flatShading
          />
        </mesh>
        <mesh position={[0, 0.13, 0]}>
          <cylinderGeometry args={[0.78, 0.84, 0.04, 6]} />
          <meshStandardMaterial
            color={palette.plinthTrim}
            roughness={0.3}
            metalness={0.75}
            flatShading
          />
        </mesh>

        {/* Stylized Engineering Student Figure */}
        <group ref={figureRef} position={[0, 0.15, 0]}>
          {/* Blazer Torso (Low-Poly Faceted) */}
          <mesh position={[0, 0.38, 0]}>
            <cylinderGeometry args={[0.42, 0.56, 0.72, 6]} />
            <meshStandardMaterial
              color={palette.jacket}
              roughness={0.78}
              metalness={0.05}
              flatShading
            />
          </mesh>

          {/* Left & Right Shoulders */}
          <mesh position={[-0.44, 0.56, 0]} rotation={[0, 0, 0.28]}>
            <boxGeometry args={[0.24, 0.34, 0.34]} />
            <meshStandardMaterial
              color={palette.jacket}
              roughness={0.78}
              metalness={0.05}
              flatShading
            />
          </mesh>
          <mesh position={[0.44, 0.56, 0]} rotation={[0, 0, -0.28]}>
            <boxGeometry args={[0.24, 0.34, 0.34]} />
            <meshStandardMaterial
              color={palette.jacket}
              roughness={0.78}
              metalness={0.05}
              flatShading
            />
          </mesh>

          {/* Shirt Collar & Tie */}
          <mesh position={[0, 0.55, 0.25]} rotation={[0.15, 0, 0]}>
            <boxGeometry args={[0.24, 0.34, 0.1]} />
            <meshStandardMaterial color={palette.shirt} roughness={0.65} metalness={0.02} />
          </mesh>
          <mesh position={[0, 0.44, 0.31]} rotation={[0.12, 0, 0]}>
            <boxGeometry args={[0.09, 0.32, 0.04]} />
            <meshStandardMaterial color={palette.tie} roughness={0.45} metalness={0.2} />
          </mesh>

          {/* Neck */}
          <mesh position={[0, 0.8, 0]}>
            <cylinderGeometry args={[0.13, 0.16, 0.18, 6]} />
            <meshStandardMaterial
              color={palette.skin}
              roughness={0.72}
              metalness={0.0}
              flatShading
            />
          </mesh>

          {/* Articulated Head Group */}
          <group ref={headRef} position={[0, 1.14, 0]}>
            {/* Low-Poly Sculpted Head */}
            <mesh scale={[0.92, 1.06, 0.94]}>
              <icosahedronGeometry args={[0.38, 1]} />
              <meshStandardMaterial
                color={palette.skin}
                roughness={0.7}
                metalness={0.02}
                flatShading
              />
            </mesh>

            {/* Ears */}
            <mesh position={[-0.35, -0.02, 0]}>
              <boxGeometry args={[0.07, 0.13, 0.09]} />
              <meshStandardMaterial color={palette.skin} roughness={0.72} flatShading />
            </mesh>
            <mesh position={[0.35, -0.02, 0]}>
              <boxGeometry args={[0.07, 0.13, 0.09]} />
              <meshStandardMaterial color={palette.skin} roughness={0.72} flatShading />
            </mesh>

            {/* Stylized Low-Poly Hair Cap */}
            <mesh position={[0, 0.17, -0.02]} scale={[1.02, 0.72, 1.04]}>
              <dodecahedronGeometry args={[0.37, 0]} />
              <meshStandardMaterial
                color={palette.hair}
                roughness={0.85}
                metalness={0.05}
                flatShading
              />
            </mesh>
            <mesh position={[0.04, 0.25, 0.18]} rotation={[0.35, 0.1, -0.15]}>
              <boxGeometry args={[0.42, 0.12, 0.2]} />
              <meshStandardMaterial
                color={palette.hair}
                roughness={0.85}
                metalness={0.05}
                flatShading
              />
            </mesh>

            {/* Engineer Glasses */}
            <group position={[0, 0.02, 0.33]}>
              {/* Left Frame */}
              <mesh position={[-0.13, 0, 0]}>
                <boxGeometry args={[0.18, 0.11, 0.03]} />
                <meshStandardMaterial color={palette.glasses} roughness={0.25} metalness={0.82} />
              </mesh>
              {/* Right Frame */}
              <mesh position={[0.13, 0, 0]}>
                <boxGeometry args={[0.18, 0.11, 0.03]} />
                <meshStandardMaterial color={palette.glasses} roughness={0.25} metalness={0.82} />
              </mesh>
              {/* Bridge */}
              <mesh position={[0, 0.01, 0]}>
                <boxGeometry args={[0.08, 0.025, 0.025]} />
                <meshStandardMaterial color={palette.glasses} roughness={0.25} metalness={0.82} />
              </mesh>
              {/* Translucent Lens Highlights */}
              <mesh position={[-0.13, 0, 0.018]}>
                <planeGeometry args={[0.14, 0.075]} />
                <meshStandardMaterial
                  color={palette.lens}
                  transparent
                  opacity={0.35}
                  roughness={0.1}
                  metalness={0.2}
                  depthWrite={false}
                />
              </mesh>
              <mesh position={[0.13, 0, 0.018]}>
                <planeGeometry args={[0.14, 0.075]} />
                <meshStandardMaterial
                  color={palette.lens}
                  transparent
                  opacity={0.35}
                  roughness={0.1}
                  metalness={0.2}
                  depthWrite={false}
                />
              </mesh>
            </group>

            {/* Subtle Engineering Headset Arc */}
            <mesh position={[0, 0.05, 0]} rotation={[0, 0, 0]}>
              <torusGeometry args={[0.41, 0.022, 6, 18, Math.PI]} />
              <meshStandardMaterial color={palette.plinthTrim} roughness={0.3} metalness={0.75} />
            </mesh>
            <mesh position={[-0.41, 0.02, 0]}>
              <cylinderGeometry args={[0.07, 0.07, 0.06, 6]} />
              <meshStandardMaterial color={palette.plinthTrim} roughness={0.35} metalness={0.7} />
            </mesh>
            <mesh position={[0.41, 0.02, 0]}>
              <cylinderGeometry args={[0.07, 0.07, 0.06, 6]} />
              <meshStandardMaterial color={palette.plinthTrim} roughness={0.35} metalness={0.7} />
            </mesh>
          </group>

          {/* Subtle Orbiting Microchip Badge Accent */}
          <mesh ref={chipBadgeRef} position={[0.66, 0.78, 0.15]} rotation={[0.4, 0.5, 0.2]}>
            <octahedronGeometry args={[0.11, 0]} />
            <meshStandardMaterial
              color={palette.accentNode}
              emissive={palette.tie}
              emissiveIntensity={0.45}
              roughness={0.25}
              metalness={0.8}
              flatShading
            />
          </mesh>
        </group>
      </group>
    </>
  );
}

export default function StudentAvatarScene({
  theme,
  active,
  isSoftwareGl,
  onContextLost,
  onContextRestored,
}: StudentAvatarSceneProps) {
  return (
    <Canvas
      dpr={isSoftwareGl ? 1 : [1, 1.75]}
      frameloop={active ? 'always' : 'never'}
      camera={{ position: [0, 0.35, 3.1], fov: 36, near: 0.1, far: 25 }}
      gl={{
        antialias: !isSoftwareGl,
        alpha: true,
        powerPreference: 'high-performance',
      }}
      onCreated={({ gl }) => {
        gl.outputColorSpace = THREE.SRGBColorSpace;
        gl.toneMapping = THREE.ACESFilmicToneMapping;
        gl.toneMappingExposure = 1.06;

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
      <AvatarEnvironment />
      <LowPolyStudent theme={theme} />
    </Canvas>
  );
}
