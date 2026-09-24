"use client";

import { useEffect, useRef, type CSSProperties } from "react";
import { cn } from "@/lib/utils";

export type HalftoneFlowProps = {
  /** Extra classes applied to the canvas element  e.g. "absolute inset-0 h-full w-full". */
  className?: string;
  style?: CSSProperties;
  /** Reserved for API parity with the draft (currently only "dark" is graded). */
  mode?: "dark" | "light";
  /** Hue shift in degrees (-180..180), applied as a CSS filter. Defaults to 0. */
  hue?: number;
  /** Saturation multiplier (0..2), applied as a CSS filter. Defaults to 1. */
  saturation?: number;
  /** Flow speed multiplier. Defaults to 1. */
  speed?: number;
  /** Halftone cell size in device px. Smaller = finer dots. Defaults to 6. */
  dotSize?: number;
  /** "ember" (default) = amber ribbons on black like the reference; "mono" = paper-silver + lime. */
  palette?: "ember" | "mono";
  /** 0..1  lime burn, only applies to the "mono" palette. Defaults to 0.85. */
  lime?: number;
  /** Overall brightness 0.35..1.65. Defaults to 1. */
  brightness?: number;
};

/**
 * HalftoneFlow  CODEASTRA / SYNERGY 2027 edition.
 *
 * Domain-warped marble flow rendered as halftone dots: glowing ember ribbons
 * (deep maroon → red → orange → amber → hot white) folding over a pitch-black
 * field, like the reference. A "mono" palette offers the black & white variant.
 *
 * Deliberately native WebGL (no iframe, no CDN scripts): DPR-aware, pauses
 * off-screen, renders one static frame under prefers-reduced-motion.
 */
export default function HalftoneFlow({
  className,
  style,
  mode = "dark",
  hue = 0,
  saturation = 1,
  palette = "ember",
  speed = 1,
  dotSize = 5,
  lime = 0.85,
  brightness = 1,
}: HalftoneFlowProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const paramsRef = useRef({ speed, dotSize, lime, brightness, palette });
  paramsRef.current = { speed, dotSize, lime, brightness, palette };

  const safeHue = Math.min(180, Math.max(-180, hue));
  const safeSaturation = Math.min(2, Math.max(0, saturation));
  const filter =
    safeHue === 0 && safeSaturation === 1
      ? undefined
      : `hue-rotate(${safeHue}deg) saturate(${safeSaturation})`;

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const gl = canvas.getContext("webgl", {
      antialias: false,
      alpha: false,
      powerPreference: "low-power",
    });
    if (!gl) return;

    const vsSource = `
      attribute vec4 aVertexPosition;
      void main() { gl_Position = aVertexPosition; }
    `;

    // Ember marble flow: fine domain-warped ribbons + halftone dots.
    const fsSource = `
      precision highp float;
      uniform vec2 u_resolution;
      uniform float u_time;
      uniform float u_dot;
      uniform float u_lime;
      uniform float u_ember;
      uniform float u_brightness;

      mat2 rot(float a) {
        float s = sin(a), c = cos(a);
        return mat2(c, -s, s, c);
      }

      void main() {
        vec2 uv = gl_FragCoord.xy / u_resolution.xy;
        vec2 p = uv * 2.0 - 1.0;
        p.x *= u_resolution.x / u_resolution.y;

        // marbled flow field  deeper warp than the draft for fine ribbons
        vec2 flow_uv = p;
        float time = u_time * 0.32;
        for (float i = 1.0; i < 5.0; i++) {
          flow_uv *= rot(time * 0.08);
          flow_uv.x += sin(flow_uv.y * 2.2 * i + time * (0.6 + i * 0.15)) * 0.45;
          flow_uv.y += cos(flow_uv.x * 1.8 * i - time * 0.7) * 0.45;
        }
        float billow = sin(flow_uv.x * 2.0 + flow_uv.y * 2.6) * 0.5 + 0.5;
        float vein = pow(1.0 - abs(sin(flow_uv.x * 2.6 - flow_uv.y * 2.1 + billow * 2.0)), 3.0);
        float intensity = clamp(billow * 0.55 + vein * 0.65, 0.0, 1.0);

        // ── ember grade: maroon → red → orange → amber → hot white ──
        vec3 ember = vec3(0.023, 0.008, 0.004);
        ember = mix(ember, vec3(0.240, 0.040, 0.010), smoothstep(0.18, 0.45, intensity));
        ember = mix(ember, vec3(0.630, 0.110, 0.020), smoothstep(0.45, 0.62, intensity));
        ember = mix(ember, vec3(0.950, 0.330, 0.040), smoothstep(0.62, 0.76, intensity));
        ember = mix(ember, vec3(1.000, 0.710, 0.180), smoothstep(0.76, 0.88, intensity));
        ember = mix(ember, vec3(1.000, 0.950, 0.820), smoothstep(0.88, 0.98, intensity));

        // ── mono grade: pure black & white marble ──
        vec3 mono = vec3(0.0);
        mono = mix(mono, vec3(0.180), smoothstep(0.18, 0.45, intensity));
        mono = mix(mono, vec3(0.450), smoothstep(0.45, 0.62, intensity));
        mono = mix(mono, vec3(0.750), smoothstep(0.62, 0.78, intensity));
        mono = mix(mono, vec3(1.000), smoothstep(0.78, 0.92, intensity));

        vec3 col_base = mix(vec3(0.020, 0.020, 0.016), vec3(0.0), u_ember);
        vec3 fluid = mix(mono, ember, u_ember);
        fluid = mix(fluid, vec3(0.718, 0.851, 0.000), (1.0 - u_ember) * smoothstep(0.60, 0.82, intensity) * u_lime * 0.9);

        // halftone dots  dense cells, radius driven by intensity
        vec2 grid_uv = gl_FragCoord.xy / u_dot;
        vec2 cell_uv = fract(grid_uv) - 0.5;
        float dist = length(cell_uv);
        float radius = intensity * 0.48;
        float dot_mask = smoothstep(radius, radius - 0.1, dist);

        vec3 final_color = mix(col_base, fluid, dot_mask);
        final_color += fluid * 0.10 * intensity;

        // vignette  keeps edges pitch black like the reference
        float vig = smoothstep(1.9, 0.45, length(p));
        final_color *= mix(0.35, 1.0, vig);

        gl_FragColor = vec4(final_color * u_brightness, 1.0);
      }
    `;

    const compile = (type: number, source: string) => {
      const shader = gl.createShader(type);
      if (!shader) return null;
      gl.shaderSource(shader, source);
      gl.compileShader(shader);
      if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
        gl.deleteShader(shader);
        return null;
      }
      return shader;
    };

    const vs = compile(gl.VERTEX_SHADER, vsSource);
    const fs = compile(gl.FRAGMENT_SHADER, fsSource);
    if (!vs || !fs) return;
    const program = gl.createProgram();
    if (!program) return;
    gl.attachShader(program, vs);
    gl.attachShader(program, fs);
    gl.linkProgram(program);
    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) return;
    gl.useProgram(program);

    const positions = new Float32Array([-1, 1, 1, 1, -1, -1, 1, -1]);
    const buffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
    gl.bufferData(gl.ARRAY_BUFFER, positions, gl.STATIC_DRAW);
    const loc = gl.getAttribLocation(program, "aVertexPosition");
    gl.enableVertexAttribArray(loc);
    gl.vertexAttribPointer(loc, 2, gl.FLOAT, false, 0, 0);

    const uRes = gl.getUniformLocation(program, "u_resolution");
    const uTime = gl.getUniformLocation(program, "u_time");
    const uDot = gl.getUniformLocation(program, "u_dot");
    const uLime = gl.getUniformLocation(program, "u_lime");
    const uEmber = gl.getUniformLocation(program, "u_ember");
    const uBright = gl.getUniformLocation(program, "u_brightness");

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const dpr = Math.min(window.devicePixelRatio || 1, 1.75);
    let raf = 0;
    let running = true;
    const t0 = performance.now();

    const resize = () => {
      const w = Math.max(1, Math.floor(canvas.clientWidth * dpr));
      const h = Math.max(1, Math.floor(canvas.clientHeight * dpr));
      if (canvas.width !== w || canvas.height !== h) {
        canvas.width = w;
        canvas.height = h;
        gl.viewport(0, 0, w, h);
      }
    };
    resize();
    window.addEventListener("resize", resize);

    const draw = (elapsed: number) => {
      const p = paramsRef.current;
      gl.uniform2f(uRes, canvas.width, canvas.height);
      gl.uniform1f(uTime, elapsed);
      gl.uniform1f(uDot, Math.max(3, p.dotSize * dpr));
      gl.uniform1f(uLime, Math.min(1, Math.max(0, p.lime)));
      gl.uniform1f(uEmber, p.palette === "mono" ? 0 : 1);
      gl.uniform1f(uBright, Math.min(1.65, Math.max(0.35, p.brightness)));
      gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
    };

    if (reduceMotion) {
      draw(6.0); // one composed static frame
    } else {
      const render = (now: number) => {
        if (!running) return;
        draw(((now - t0) / 1000) * paramsRef.current.speed);
        raf = requestAnimationFrame(render);
      };
      raf = requestAnimationFrame(render);
    }

    // pause when off-screen
    const io = new IntersectionObserver(
      ([entry]) => {
        if (reduceMotion) return;
        if (entry.isIntersecting && !running) {
          running = true;
          raf = requestAnimationFrame(function loop(now) {
            if (!running) return;
            draw(((now - t0) / 1000) * paramsRef.current.speed);
            raf = requestAnimationFrame(loop);
          });
        } else if (!entry.isIntersecting && running) {
          running = false;
          cancelAnimationFrame(raf);
        }
      },
      { threshold: 0 }
    );
    io.observe(canvas);

    return () => {
      running = false;
      cancelAnimationFrame(raf);
      io.disconnect();
      window.removeEventListener("resize", resize);
      const lose = gl.getExtension("WEBGL_lose_context");
      if (lose) lose.loseContext();
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      data-mode={mode === "light" ? "light" : "dark"}
      className={cn("block h-full w-full", className)}
      style={{ background: "#050504", filter, ...style }}
    />
  );
}

export { HalftoneFlow };
