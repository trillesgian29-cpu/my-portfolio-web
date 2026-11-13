import { lazy, Suspense, useEffect, useRef, useState } from 'react';
import { Cpu, UserCheck } from 'lucide-react';
import {
  getWebGLCapabilities,
  useDocumentTheme,
  useReducedMotion,
} from '../utils/webgl';
import { WebGLErrorBoundary } from './WebGLErrorBoundary';

const LazyEngineeringCoreScene = lazy(() => import('./three/EngineeringCoreScene'));
const LazyStudentAvatarScene = lazy(() => import('./three/StudentAvatarScene'));

export function EngineeringCoreFallbackSVG() {
  return (
    <div className="flex flex-1 items-center justify-center py-4">
      <svg
        viewBox="0 0 320 200"
        className="h-full max-h-52 w-full text-[#6B21A8] dark:text-[#C084FC]"
        role="img"
        aria-label="Schematic view of a circuit board and microchip core"
      >
        <g stroke="currentColor" strokeOpacity="0.35" strokeWidth="1.5" fill="none">
          <path d="M40 50 H95 L115 70 H125" />
          <path d="M40 100 H125" />
          <path d="M40 150 H95 L115 130 H125" />
          <path d="M280 50 H225 L205 70 H195" />
          <path d="M280 100 H195" />
          <path d="M280 150 H225 L205 130 H195" />
          <path d="M160 20 V65" />
          <path d="M160 180 V135" />
        </g>

        <g fill="currentColor" fillOpacity="0.75">
          <circle cx="40" cy="50" r="3.5" />
          <circle cx="40" cy="100" r="3.5" />
          <circle cx="40" cy="150" r="3.5" />
          <circle cx="280" cy="50" r="3.5" />
          <circle cx="280" cy="100" r="3.5" />
          <circle cx="280" cy="150" r="3.5" />
          <circle cx="160" cy="20" r="3.5" />
          <circle cx="160" cy="180" r="3.5" />
        </g>

        <rect
          x="125"
          y="65"
          width="70"
          height="70"
          rx="10"
          fill="currentColor"
          fillOpacity="0.12"
          stroke="currentColor"
          strokeWidth="2"
        />
        <rect
          x="141"
          y="81"
          width="38"
          height="38"
          rx="4"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeOpacity="0.7"
        />
        <circle cx="160" cy="100" r="6" fill="currentColor" />
      </svg>
    </div>
  );
}

export function StudentAvatarFallbackSVG() {
  return (
    <div className="my-4 flex h-44 items-center justify-center">
      <svg
        viewBox="0 0 120 120"
        className="h-28 w-28 text-[#6B21A8] dark:text-[#D8B4FE]"
        role="img"
        aria-label="Stylized engineering student avatar graphic"
      >
        <rect
          x="14"
          y="14"
          width="92"
          height="92"
          rx="20"
          fill="currentColor"
          fillOpacity="0.08"
          stroke="currentColor"
          strokeOpacity="0.35"
          strokeWidth="1.5"
        />
        <circle
          cx="60"
          cy="48"
          r="16"
          fill="currentColor"
          fillOpacity="0.22"
          stroke="currentColor"
          strokeWidth="1.75"
        />
        <path
          d="M34 90c2-14 13-22 26-22s24 8 26 22"
          fill="currentColor"
          fillOpacity="0.16"
          stroke="currentColor"
          strokeWidth="1.75"
          strokeLinecap="round"
        />
      </svg>
    </div>
  );
}

function useViewportAndTabActive(containerRef: React.RefObject<HTMLDivElement | null>) {
  const [inView, setInView] = useState(true);
  const [tabVisible, setTabVisible] = useState(() =>
    typeof document === 'undefined' ? true : document.visibilityState === 'visible',
  );

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0]) {
          setInView(entries[0].isIntersecting);
        }
      },
      { threshold: 0.05 },
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [containerRef]);

  useEffect(() => {
    const onVisibility = () => setTabVisible(document.visibilityState === 'visible');
    document.addEventListener('visibilitychange', onVisibility);
    return () => document.removeEventListener('visibilitychange', onVisibility);
  }, []);

  return inView && tabVisible;
}

export function EngineeringCorePlaceholder() {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const theme = useDocumentTheme();
  const reducedMotion = useReducedMotion();
  const [contextLost, setContextLost] = useState(false);
  const active = useViewportAndTabActive(containerRef);
  const { supported, isSoftwareGl } = getWebGLCapabilities();

  const shouldRender3D = supported && !reducedMotion && !contextLost;

  return (
    <div
      ref={containerRef}
      role="region"
      className="relative flex min-h-[300px] sm:aspect-[4/3] w-full flex-col justify-between overflow-hidden rounded-2xl border border-[#21152F]/12 dark:border-[#D8B4FE]/20 bg-[#FFFFFF] dark:bg-[#21152F] p-5 shadow-sm"
      aria-label="Interactive Engineering Core 3D circuit board and microchip"
    >
      <div className="flex items-center justify-between gap-4 border-b border-[#21152F]/10 dark:border-[#D8B4FE]/15 pb-3">
        <div className="flex items-center gap-2 text-xs font-medium text-[#4A3B5C] dark:text-[#D8B4FE]">
          <Cpu className="h-4 w-4 text-[#6B21A8] dark:text-[#C084FC]" aria-hidden="true" />
          <span>Interactive Engineering Core</span>
        </div>
        <span className="font-mono-code text-xs text-[#6B21A8] dark:text-[#C084FC]">
          {shouldRender3D ? '3D Interactive' : 'Static Schematic'}
        </span>
      </div>

      <div className="relative flex-1 min-h-[210px] w-full overflow-hidden">
        {shouldRender3D ? (
          <WebGLErrorBoundary fallback={<EngineeringCoreFallbackSVG />}>
            <Suspense fallback={<EngineeringCoreFallbackSVG />}>
              <LazyEngineeringCoreScene
                theme={theme}
                active={active}
                isSoftwareGl={isSoftwareGl}
                onContextLost={() => setContextLost(true)}
                onContextRestored={() => setContextLost(false)}
              />
            </Suspense>
          </WebGLErrorBoundary>
        ) : (
          <EngineeringCoreFallbackSVG />
        )}
      </div>

      <div className="flex flex-wrap items-center justify-between gap-2 border-t border-[#21152F]/10 dark:border-[#D8B4FE]/15 pt-3 text-xs text-[#4A3B5C] dark:text-[#D8B4FE]">
        <span>Chip Die · PCB Pathways · Pulsing Nodes</span>
        <span>{shouldRender3D ? 'Move pointer or scroll' : 'Reduced-motion safe'}</span>
      </div>
    </div>
  );
}

export function StudentAvatarPlaceholder() {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const theme = useDocumentTheme();
  const reducedMotion = useReducedMotion();
  const [contextLost, setContextLost] = useState(false);
  const active = useViewportAndTabActive(containerRef);
  const { supported, isSoftwareGl } = getWebGLCapabilities();

  const shouldRender3D = supported && !reducedMotion && !contextLost;

  return (
    <div
      ref={containerRef}
      role="region"
      className="flex flex-col justify-between overflow-hidden rounded-2xl border border-[#21152F]/12 dark:border-[#D8B4FE]/20 bg-[#F3E8FF]/65 dark:bg-[#2B1C3D] p-5"
      aria-label="Stylized 3D engineering student avatar"
    >
      <div className="flex items-center justify-between gap-2 text-xs text-[#4A3B5C] dark:text-[#D8B4FE]">
        <span className="inline-flex items-center gap-1.5 font-medium">
          <UserCheck className="h-4 w-4 text-[#6B21A8] dark:text-[#C084FC]" aria-hidden="true" />
          3D Engineering Avatar
        </span>
        <span className="font-mono-code">
          {shouldRender3D ? 'Low-Poly' : 'Static'}
        </span>
      </div>

      <div className="relative my-2 h-52 w-full overflow-hidden">
        {shouldRender3D ? (
          <WebGLErrorBoundary fallback={<StudentAvatarFallbackSVG />}>
            <Suspense fallback={<StudentAvatarFallbackSVG />}>
              <LazyStudentAvatarScene
                theme={theme}
                active={active}
                isSoftwareGl={isSoftwareGl}
                onContextLost={() => setContextLost(true)}
                onContextRestored={() => setContextLost(false)}
              />
            </Suspense>
          </WebGLErrorBoundary>
        ) : (
          <StudentAvatarFallbackSVG />
        )}
      </div>

      <p className="text-center text-xs text-[#4A3B5C] dark:text-[#D8B4FE]">
        Stylized 4th Year CpE Avatar
      </p>
    </div>
  );
}
