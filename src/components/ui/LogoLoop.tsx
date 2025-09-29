import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import '../../css/LogoLoop.css';

export type LogoItem =
  | {
      node: React.ReactNode;
      href?: string;
      title?: string;
      ariaLabel?: string;
    }
  | {
      src: string;
      alt?: string;
      href?: string;
      title?: string;
      srcSet?: string;
      sizes?: string;
      width?: number;
      height?: number;
    };

export interface LogoLoopProps {
  logos: LogoItem[];
  speed?: number;
  direction?: 'left' | 'right';
  width?: number | string;
  logoHeight?: number;
  gap?: number;
  pauseOnHover?: boolean;
  fadeOut?: boolean;
  fadeOutColor?: string;
  scaleOnHover?: boolean;
  ariaLabel?: string;
  className?: string;
  style?: React.CSSProperties;
  // Drag-to-scroll props
  draggable?: boolean;
  dragSensitivity?: number;
  inertiaDecay?: number;
  maxDragVelocity?: number;
  stopOnDrag?: boolean;
}

const ANIMATION_CONFIG = {
  SMOOTH_TAU: 0.25,
  MIN_COPIES: 2,
  COPY_HEADROOM: 2
} as const;

const toCssLength = (value?: number | string): string | undefined =>
  typeof value === 'number' ? `${value}px` : (value ?? undefined);

const useResizeObserver = (
  callback: () => void,
  elements: Array<React.RefObject<Element | null>>,
  dependencies: React.DependencyList
) => {
  useEffect(() => {
    if (!window.ResizeObserver) {
      const handleResize = () => callback();
      window.addEventListener('resize', handleResize);
      callback();
      return () => window.removeEventListener('resize', handleResize);
    }

    const observers = elements.map(ref => {
      if (!ref.current) return null;
      const observer = new ResizeObserver(callback);
      observer.observe(ref.current);
      return observer;
    });

    callback();

    return () => {
      observers.forEach(observer => observer?.disconnect());
    };
  }, dependencies);
};

const useImageLoader = (
  seqRef: React.RefObject<HTMLUListElement | null>,
  onLoad: () => void,
  dependencies: React.DependencyList
) => {
  useEffect(() => {
    const images = seqRef.current?.querySelectorAll('img') ?? [];

    if (images.length === 0) {
      onLoad();
      return;
    }

    let remainingImages = images.length;
    const handleImageLoad = () => {
      remainingImages -= 1;
      if (remainingImages === 0) {
        onLoad();
      }
    };

    images.forEach(img => {
      const htmlImg = img as HTMLImageElement;
      if (htmlImg.complete) {
        handleImageLoad();
      } else {
        htmlImg.addEventListener('load', handleImageLoad, { once: true });
        htmlImg.addEventListener('error', handleImageLoad, { once: true });
      }
    });

    return () => {
      images.forEach(img => {
        img.removeEventListener('load', handleImageLoad);
        img.removeEventListener('error', handleImageLoad);
      });
    };
  }, dependencies);
};

const useAnimationLoop = (
  trackRef: React.RefObject<HTMLDivElement | null>,
  targetVelocity: number,
  seqWidth: number,
  isHovered: boolean,
  pauseOnHover: boolean,
  isDragging: boolean,
  stopOnDrag: boolean,
  inertiaDecay: number
) => {
  const rafRef = useRef<number | null>(null);
  const lastTimestampRef = useRef<number | null>(null);
  const offsetRef = useRef(0);
  const velocityRef = useRef(0);
  const isInertiaPhaseRef = useRef(false);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    if (seqWidth > 0) {
      offsetRef.current = ((offsetRef.current % seqWidth) + seqWidth) % seqWidth;
      track.style.transform = `translate3d(${-offsetRef.current}px, 0, 0)`;
    }

    const animate = (timestamp: number) => {
      if (lastTimestampRef.current === null) {
        lastTimestampRef.current = timestamp;
      }

      const rawDt = Math.max(0, timestamp - lastTimestampRef.current) / 1000;
      const dt = Math.min(rawDt, 1/30); // clamp huge gaps to ~33ms
      lastTimestampRef.current = timestamp;

      // Determine target velocity based on current state
      let target: number;
      if (isDragging && stopOnDrag) {
        // During drag, stop auto-scrolling if stopOnDrag is true
        target = 0;
        isInertiaPhaseRef.current = false;
      } else if (pauseOnHover && isHovered && !isDragging) {
        // Hover pause (only when not dragging)
        target = 0;
        isInertiaPhaseRef.current = false;
      } else {
        target = targetVelocity;
      }

      // Handle inertia decay when not dragging but in inertia phase
      if (!isDragging && isInertiaPhaseRef.current) {
        // Apply exponential decay to current velocity
        const decayFactorPerSecond = inertiaDecay;
        const decayFactor = Math.pow(decayFactorPerSecond, dt);
        velocityRef.current *= decayFactor;

        // Check if velocity is close enough to target to exit inertia phase
        const velocityDiff = Math.abs(velocityRef.current - target);
        const threshold = Math.abs(target) * 0.05 + 10; // 5% of target + minimum threshold
        if (velocityDiff < threshold) {
          isInertiaPhaseRef.current = false;
        }
      }

      // Apply normal easing when not in inertia phase
      if (!isInertiaPhaseRef.current && !isDragging) {
        const easingFactor = 1 - Math.exp(-dt / ANIMATION_CONFIG.SMOOTH_TAU);
        velocityRef.current += (target - velocityRef.current) * easingFactor;
      }

      if (seqWidth > 0) {
        let nextOffset = offsetRef.current + velocityRef.current * dt;
        nextOffset = ((nextOffset % seqWidth) + seqWidth) % seqWidth;
        offsetRef.current = nextOffset;

        const translateX = -offsetRef.current;
        track.style.transform = `translate3d(${translateX}px, 0, 0)`;
      }

      rafRef.current = requestAnimationFrame(animate);
    };

    rafRef.current = requestAnimationFrame(animate);

    return () => {
      if (rafRef.current !== null) {
        cancelAnimationFrame(rafRef.current);
        rafRef.current = null;
      }
      lastTimestampRef.current = null;
    };
  }, [targetVelocity, seqWidth, isHovered, pauseOnHover, isDragging, stopOnDrag, inertiaDecay]);

  // Return refs for drag handling
  return { offsetRef, velocityRef, isInertiaPhaseRef };
};

export const LogoLoop = React.memo<LogoLoopProps>(
  ({
    logos,
    speed = 120,
    direction = 'left',
    width = '100%',
    logoHeight = 28,
    gap = 32,
    pauseOnHover = true,
    fadeOut = false,
    fadeOutColor,
    scaleOnHover = false,
    ariaLabel = 'Partner logos',
    className,
    style,
    // Drag props with defaults
    draggable = true,
    dragSensitivity = 1.0,
    inertiaDecay = 0.92,
    maxDragVelocity: _maxDragVelocity = 2500, // Keep for API compatibility
    stopOnDrag = true
  }) => {
    const containerRef = useRef<HTMLDivElement>(null);
    const trackRef = useRef<HTMLDivElement>(null);
    const seqRef = useRef<HTMLUListElement>(null);

    const [seqWidth, setSeqWidth] = useState<number>(0);
    const [copyCount, setCopyCount] = useState<number>(ANIMATION_CONFIG.MIN_COPIES);
    const [isHovered, setIsHovered] = useState<boolean>(false);
    const [isDragging, setIsDragging] = useState<boolean>(false);
    const [isMobile, setIsMobile] = useState<boolean>(false);

    // Drag-related refs
    const isDraggingRef = useRef<boolean>(false);
    const lastXRef = useRef<number>(0);
    const lastTsRef = useRef<number | null>(null);
    const dragStartXRef = useRef<number>(0);
    const dragStartOffsetRef = useRef<number>(0);
    const dragVelRef = useRef<number>(0);
    const pointerIdRef = useRef<number | null>(null);
    const hasMovedRef = useRef<boolean>(false);
    const suppressClickRef = useRef<boolean>(false);

    // Mobile detection
    useEffect(() => {
      const checkMobile = () => {
        // More comprehensive mobile detection
        const isMobileDevice = 
          window.innerWidth <= 768 || 
          /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ||
          ('ontouchstart' in window) ||
          (navigator.maxTouchPoints > 0);
        setIsMobile(isMobileDevice);
      };

      checkMobile();
      window.addEventListener('resize', checkMobile);
      return () => window.removeEventListener('resize', checkMobile);
    }, []);

    const targetVelocity = useMemo(() => {
      const magnitude = Math.abs(speed);
      const directionMultiplier = direction === 'left' ? 1 : -1;
      const speedMultiplier = speed < 0 ? -1 : 1;
      return magnitude * directionMultiplier * speedMultiplier;
    }, [speed, direction]);

    const updateDimensions = useCallback(() => {
      const containerWidth = containerRef.current?.clientWidth ?? 0;
      const sequenceWidth = seqRef.current?.getBoundingClientRect?.()?.width ?? 0;

      if (sequenceWidth > 0) {
        setSeqWidth(Math.ceil(sequenceWidth));
        const copiesNeeded = Math.ceil(containerWidth / sequenceWidth) + ANIMATION_CONFIG.COPY_HEADROOM;
        setCopyCount(Math.max(ANIMATION_CONFIG.MIN_COPIES, copiesNeeded));
      }
    }, []);

    useResizeObserver(updateDimensions, [containerRef, seqRef], [logos, gap, logoHeight]);

    useImageLoader(seqRef, updateDimensions, [logos, gap, logoHeight]);

    const { offsetRef, velocityRef, isInertiaPhaseRef } = useAnimationLoop(
      trackRef,
      targetVelocity,
      seqWidth,
      isHovered,
      pauseOnHover,
      isDragging,
      stopOnDrag,
      inertiaDecay
    );

    const cssVariables = useMemo(
      () =>
        ({
          '--logoloop-gap': `${gap}px`,
          '--logoloop-logoHeight': `${logoHeight}px`,
          ...(fadeOutColor && { '--logoloop-fadeColor': fadeOutColor })
        }) as React.CSSProperties,
      [gap, logoHeight, fadeOutColor]
    );

    const rootClassName = useMemo(
      () =>
        [
          'logoloop',
          fadeOut && 'logoloop--fade',
          scaleOnHover && 'logoloop--scale-hover',
          draggable && !isMobile && 'logoloop--draggable',
          isDragging && 'logoloop--dragging',
          className
        ]
          .filter(Boolean)
          .join(' '),
      [fadeOut, scaleOnHover, draggable, isDragging, isMobile, className]
    );

    // Drag event handlers
    const handlePointerDown = useCallback((e: React.PointerEvent) => {
      if (!draggable || seqWidth <= 0 || isMobile) return;

      e.preventDefault();
      const container = containerRef.current;
      if (!container) return;

      // Set pointer capture
      container.setPointerCapture(e.pointerId);
      pointerIdRef.current = e.pointerId;

      // Initialize drag state
      isDraggingRef.current = true;
      setIsDragging(true);
      dragStartXRef.current = e.clientX;
      lastXRef.current = e.clientX;
      dragStartOffsetRef.current = offsetRef.current;
      lastTsRef.current = performance.now();
      dragVelRef.current = 0;
      hasMovedRef.current = false;

      // Hard stop the auto velocity so it doesn't "coast" under the finger
      velocityRef.current = 0;
      isInertiaPhaseRef.current = false;

      // Temporarily disable hover state during drag
      if (isHovered) setIsHovered(false);
    }, [draggable, seqWidth, isHovered, isMobile]);

    const handlePointerMove = useCallback((e: React.PointerEvent) => {
      if (!isDraggingRef.current || pointerIdRef.current !== e.pointerId) return;

      e.preventDefault();

      const currentX = e.clientX;
      const currentTs = performance.now();
      const dx = currentX - lastXRef.current;
      const dt = currentTs - (lastTsRef.current || currentTs);

      // Track if user has moved enough to consider this a drag
      if (!hasMovedRef.current && Math.abs(dragStartXRef.current - currentX) > 3) {
        hasMovedRef.current = true;
      }

      // Natural: left drag => negative translateX (content left)
      const dragDelta = (dragStartXRef.current - currentX) * dragSensitivity;
      offsetRef.current = dragStartOffsetRef.current + dragDelta;

      // Wrap offset
      if (seqWidth > 0) {
        offsetRef.current = ((offsetRef.current % seqWidth) + seqWidth) % seqWidth;
      }

      // Apply transform immediately for responsiveness
      const track = trackRef.current;
      if (track) {
        track.style.transform = `translate3d(${-offsetRef.current}px, 0, 0)`;
      }

      // Velocity is no longer used for momentum, but keep it updated harmlessly
      if (dt > 0) {
        const instantVel = (dx / dt) * 1000; // px/sec
        dragVelRef.current = dragVelRef.current * 0.8 + instantVel * 0.2;
      }

      lastXRef.current = currentX;
      lastTsRef.current = currentTs;
    }, [dragSensitivity, seqWidth]);

    const handlePointerUp = useCallback((e: React.PointerEvent) => {
      if (!isDraggingRef.current || pointerIdRef.current !== e.pointerId) return;

      const container = containerRef.current;
      if (container) {
        container.releasePointerCapture(e.pointerId);
      }

      // End drag state
      isDraggingRef.current = false;
      setIsDragging(false);
      pointerIdRef.current = null;

      // Static stop on release
      velocityRef.current = 0;
      isInertiaPhaseRef.current = false;
      dragVelRef.current = 0;
      lastTsRef.current = null;

      // If there was any drag movement, suppress the ensuing click on links
      if (hasMovedRef.current) {
        suppressClickRef.current = true;
        window.setTimeout(() => { suppressClickRef.current = false; }, 250);
      }
    }, []);

    const handlePointerCancel = useCallback((e: React.PointerEvent) => {
      handlePointerUp(e);
    }, [handlePointerUp]);

    const handleMouseEnter = useCallback(() => {
      if (pauseOnHover && !isDragging) setIsHovered(true);
    }, [pauseOnHover, isDragging]);

    const handleMouseLeave = useCallback(() => {
      if (pauseOnHover) setIsHovered(false);
    }, [pauseOnHover]);

    const renderLogoItem = useCallback((item: LogoItem, key: React.Key) => {
      const isNodeItem = 'node' in item;

      const content = isNodeItem ? (
        <span className="logoloop__node" aria-hidden={!!item.href && !item.ariaLabel}>
          {item.node}
        </span>
      ) : (
        <img
          src={item.src}
          srcSet={item.srcSet}
          sizes={item.sizes}
          width={item.width}
          height={item.height}
          alt={item.alt ?? ''}
          title={item.title}
          loading="lazy"
          decoding="async"
          draggable={false}
        />
      );

      const itemAriaLabel = isNodeItem ? (item.ariaLabel ?? item.title) : (item.alt ?? item.title);

      const itemContent = item.href ? (
        <a
          className="logoloop__link"
          href={item.href}
          aria-label={itemAriaLabel || 'logo link'}
          target="_blank"
          rel="noreferrer noopener"
          title={item.title}
        >
          {content}
        </a>
      ) : (
        <div className="logoloop__wrapper" title={item.title}>
          {content}
        </div>
      );

      return (
        <li className="logoloop__item" key={key} role="listitem">
          {itemContent}
          {item.title && (
            <div className="logoloop__tooltip">
              {item.title}
            </div>
          )}
        </li>
      );
    }, []);

    const logoLists = useMemo(
      () =>
        Array.from({ length: copyCount }, (_, copyIndex) => (
          <ul
            className="logoloop__list"
            key={`copy-${copyIndex}`}
            role="list"
            aria-hidden={copyIndex > 0}
            ref={copyIndex === 0 ? seqRef : undefined}
          >
            {logos.map((item, itemIndex) => renderLogoItem(item, `${copyIndex}-${itemIndex}`))}
          </ul>
        )),
      [copyCount, logos, renderLogoItem]
    );

    const containerStyle = useMemo(
      (): React.CSSProperties => ({
        width: toCssLength(width) ?? '100%',
        // On mobile, always allow default touch behavior for scrolling
        touchAction: isMobile ? 'manipulation' : (draggable ? (isDragging ? 'none' : 'pan-x') : 'auto'),
        ...cssVariables,
        ...style
      }),
      [width, draggable, isDragging, isMobile, cssVariables, style]
    );

    return (
      <div
        ref={containerRef}
        className={rootClassName}
        style={containerStyle}
        role="region"
        aria-label={ariaLabel}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onPointerDown={draggable && !isMobile ? handlePointerDown : undefined}
        onPointerMove={draggable && !isMobile ? handlePointerMove : undefined}
        onPointerUp={draggable && !isMobile ? handlePointerUp : undefined}
        onPointerCancel={draggable && !isMobile ? handlePointerCancel : undefined}
        onClickCapture={!isMobile ? (e) => {
          // Block link activation if this interaction involved a drag
          if (suppressClickRef.current || isDraggingRef.current) {
            e.preventDefault();
            e.stopPropagation();
          }
        } : undefined}
      >
        <div className="logoloop__track" ref={trackRef}>
          {logoLists}
        </div>
      </div>
    );
  }
);

LogoLoop.displayName = 'LogoLoop';

export default LogoLoop;
