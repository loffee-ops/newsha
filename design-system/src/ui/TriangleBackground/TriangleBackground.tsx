import React, { useEffect, useRef } from "react";
import styled from "styled-components";

const BackgroundWrapper = styled.div`
    position: fixed;
    inset: 0;
    z-index: -1;
    overflow: hidden;
    pointer-events: none;
`;

const StyledCanvas = styled.canvas`
    display: block;
    width: 100%;
    height: 100%;
    opacity: 1;
`;

type Wave = {
    y: number;
    amplitude: number;
    wavelength: number;
    lineWidth: number;
    stroke: string;
    speed: number;
    phase: number;
};

function rndFloat(min: number, max: number): number {
    return Math.random() * (max - min) + min;
}

function rgba(r: number, g: number, b: number, a: number): string {
    return `rgba(${r}, ${g}, ${b}, ${a})`;
}

function fillBase(ctx: CanvasRenderingContext2D, width: number, height: number) {
    const gradient = ctx.createLinearGradient(0, 0, width, height);
    gradient.addColorStop(0, "#ffffff");
    gradient.addColorStop(0.5, "#ffffff");
    gradient.addColorStop(1, "#fbfbfb");

    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, width, height);
}
function drawSoftGlow(ctx: CanvasRenderingContext2D, width: number, height: number) {
    const gradient = ctx.createRadialGradient(
        width * 0.78,
        height * 0.18,
        0,
        width * 0.78,
        height * 0.18,
        Math.max(width, height) * 0.28,
    );

    gradient.addColorStop(0, "rgba(255, 248, 240, 0.18)");
    gradient.addColorStop(0.35, "rgba(248, 239, 230, 0.08)");
    gradient.addColorStop(1, "rgba(255,255,255,0)");

    ctx.fillStyle = gradient;
    ctx.beginPath();
    ctx.arc(width * 0.78, height * 0.18, Math.max(width, height) * 0.28, 0, Math.PI * 2);
    ctx.fill();
}

function createWaves(height: number): Wave[] {
    return [
        {
            y: height * 0.18,
            amplitude: 22,
            wavelength: 280,
            lineWidth: 2.2,
            stroke: rgba(255, 249, 242, 0.7),
            speed: 0.00018,
            phase: rndFloat(0, Math.PI * 2),
        },
        {
            y: height * 0.26,
            amplitude: 18,
            wavelength: 340,
            lineWidth: 1.4,
            stroke: rgba(238, 226, 214, 0.55),
            speed: 0.00014,
            phase: rndFloat(0, Math.PI * 2),
        },
        {
            y: height * 0.58,
            amplitude: 26,
            wavelength: 420,
            lineWidth: 2,
            stroke: rgba(244, 236, 228, 0.5),
            speed: 0.00012,
            phase: rndFloat(0, Math.PI * 2),
        },
        {
            y: height * 0.72,
            amplitude: 20,
            wavelength: 320,
            lineWidth: 1.2,
            stroke: rgba(230, 232, 238, 0.45),
            speed: 0.00016,
            phase: rndFloat(0, Math.PI * 2),
        },
        {
            y: height * 0.84,
            amplitude: 16,
            wavelength: 260,
            lineWidth: 1.8,
            stroke: rgba(248, 241, 234, 0.42),
            speed: 0.00015,
            phase: rndFloat(0, Math.PI * 2),
        },
        {
            y: height * 0.44,
            amplitude: 12,
            wavelength: 520,
            lineWidth: 0.9,
            stroke: rgba(255, 250, 246, 0.28),
            speed: 0.0001,
            phase: rndFloat(0, Math.PI * 2),
        },
    ];
}

function drawWave(ctx: CanvasRenderingContext2D, width: number, wave: Wave, time: number) {
    const phaseShift = time * wave.speed + wave.phase;

    ctx.beginPath();

    for (let x = -40; x <= width + 40; x += 8) {
        const y =
            wave.y +
            Math.sin(x / wave.wavelength + phaseShift) * wave.amplitude +
            Math.sin(x / (wave.wavelength * 0.55) + phaseShift * 0.7) * (wave.amplitude * 0.18);

        if (x === -40) {
            ctx.moveTo(x, y);
        } else {
            ctx.lineTo(x, y);
        }
    }

    ctx.strokeStyle = wave.stroke;
    ctx.lineWidth = wave.lineWidth;
    ctx.lineCap = "round";
    ctx.lineJoin = "round";
    ctx.stroke();
}

function drawAccentArcs(ctx: CanvasRenderingContext2D, width: number, height: number) {
    const arcs = [
        {
            x: width * 0.1,
            y: height * 0.14,
            r: Math.min(width, height) * 0.22,
            start: Math.PI * 0.15,
            end: Math.PI * 1.15,
            stroke: rgba(255, 250, 245, 0.34),
            lineWidth: 1.4,
        },
        {
            x: width * 0.88,
            y: height * 0.8,
            r: Math.min(width, height) * 0.26,
            start: Math.PI * 1.02,
            end: Math.PI * 1.9,
            stroke: rgba(238, 228, 218, 0.26),
            lineWidth: 1.6,
        },
    ];

    for (const arc of arcs) {
        ctx.beginPath();
        ctx.arc(arc.x, arc.y, arc.r, arc.start, arc.end);
        ctx.strokeStyle = arc.stroke;
        ctx.lineWidth = arc.lineWidth;
        ctx.stroke();
    }
}

function drawLuxuryOvals(ctx: CanvasRenderingContext2D, width: number, height: number) {
    const ovals = [
        {
            x: width * 0.22,
            y: height * 0.3,
            rx: width * 0.18,
            ry: height * 0.12,
            rotation: -0.28,
            stroke: rgba(255, 248, 241, 0.18),
            lineWidth: 1.2,
        },
        {
            x: width * 0.76,
            y: height * 0.64,
            rx: width * 0.22,
            ry: height * 0.14,
            rotation: 0.22,
            stroke: rgba(239, 228, 217, 0.14),
            lineWidth: 1.1,
        },
        {
            x: width * 0.5,
            y: height * 0.82,
            rx: width * 0.26,
            ry: height * 0.1,
            rotation: -0.06,
            stroke: rgba(255, 251, 246, 0.12),
            lineWidth: 0.9,
        },
    ];

    for (const oval of ovals) {
        ctx.save();
        ctx.translate(oval.x, oval.y);
        ctx.rotate(oval.rotation);
        ctx.beginPath();
        ctx.ellipse(0, 0, oval.rx, oval.ry, 0, 0, Math.PI * 2);
        ctx.strokeStyle = oval.stroke;
        ctx.lineWidth = oval.lineWidth;
        ctx.stroke();
        ctx.restore();
    }
}

function drawDust(ctx: CanvasRenderingContext2D, width: number, height: number) {
    const count = Math.floor((width * height) / 90000);

    for (let i = 0; i < count; i++) {
        const x = rndFloat(0, width);
        const y = rndFloat(0, height);
        const r = rndFloat(0.4, 1);

        ctx.beginPath();
        ctx.arc(x, y, r, 0, Math.PI * 2);
        ctx.fillStyle = rgba(255, 255, 255, rndFloat(0.015, 0.04));
        ctx.fill();
    }
}

export const BeautyBackground: React.FC = () => {
    const canvasRef = useRef<HTMLCanvasElement | null>(null);
    const frameRef = useRef<number | null>(null);
    const wavesRef = useRef<Wave[]>([]);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        const setup = () => {
            const width = window.innerWidth;
            const height = window.innerHeight;
            const dpr = window.devicePixelRatio || 1;

            canvas.width = Math.floor(width * dpr);
            canvas.height = Math.floor(height * dpr);
            canvas.style.width = `${width}px`;
            canvas.style.height = `${height}px`;

            ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
            wavesRef.current = createWaves(height);
        };

        const render = (time: number) => {
            const width = window.innerWidth;
            const height = window.innerHeight;

            ctx.clearRect(0, 0, width, height);
            fillBase(ctx, width, height);
            drawSoftGlow(ctx, width, height);

            for (const wave of wavesRef.current) {
                drawWave(ctx, width, wave, time);
            }

            drawAccentArcs(ctx, width, height);
            drawLuxuryOvals(ctx, width, height);
            drawDust(ctx, width, height);

            frameRef.current = window.requestAnimationFrame(render);
        };

        const handleResize = () => {
            setup();
        };

        setup();
        frameRef.current = window.requestAnimationFrame(render);
        window.addEventListener("resize", handleResize);

        return () => {
            window.removeEventListener("resize", handleResize);

            if (frameRef.current !== null) {
                window.cancelAnimationFrame(frameRef.current);
            }
        };
    }, []);

    return (
        <BackgroundWrapper aria-hidden="true">
            <StyledCanvas ref={canvasRef} />
        </BackgroundWrapper>
    );
};

export default BeautyBackground;
