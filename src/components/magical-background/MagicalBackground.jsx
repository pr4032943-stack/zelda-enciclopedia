<<<<<<< HEAD
import React, { useEffect, useRef } from 'react';
import './MagicalBackground.css';

const MagicalBackground = () => {
    const canvasRef = useRef(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');
        let particles = [];
        let animationFrameId;

        const resize = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        };

        window.addEventListener('resize', resize);
        resize();

        class Particle {
            constructor() {
                this.x = Math.random() * canvas.width;
                this.y = Math.random() * canvas.height;
                this.size = Math.random() * 2 + 0.5;
                this.speedX = Math.random() * 0.5 - 0.25;
                this.speedY = Math.random() * 0.5 - 0.25;
                this.opacity = Math.random() * 0.5 + 0.2;
            }

            update() {
                this.x += this.speedX;
                this.y += this.speedY;

                if (this.x > canvas.width) this.x = 0;
                else if (this.x < 0) this.x = canvas.width;
                if (this.y > canvas.height) this.y = 0;
                else if (this.y < 0) this.y = canvas.height;
            }

            draw() {
                ctx.fillStyle = `rgba(197, 160, 89, ${this.opacity})`; // Gold color
                ctx.beginPath();
                ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
                ctx.fill();
            }
        }

        const init = () => {
            particles = [];
            for (let i = 0; i < 60; i++) {
                particles.push(new Particle());
            }
        };

        const animate = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            particles.forEach(p => {
                p.update();
                p.draw();
            });
            animationFrameId = requestAnimationFrame(animate);
        };

        init();
        animate();

        return () => {
            window.removeEventListener('resize', resize);
            cancelAnimationFrame(animationFrameId);
        };
    }, []);

    return <canvas ref={canvasRef} className="magical-canvas" />;
};

export default MagicalBackground;
=======
import { useEffect, useRef } from 'react'
import './MagicalBackground.css'

const createParticle = (canvas) => ({
  x: Math.random() * canvas.width,
  y: Math.random() * canvas.height,
  size: Math.random() * 2 + 0.5,
  speedX: Math.random() * 0.5 - 0.25,
  speedY: Math.random() * 0.5 - 0.25,
  opacity: Math.random() * 0.5 + 0.2,
})

const updateParticle = (particle, canvas) => {
  particle.x += particle.speedX
  particle.y += particle.speedY

  if (particle.x > canvas.width) particle.x = 0
  else if (particle.x < 0) particle.x = canvas.width

  if (particle.y > canvas.height) particle.y = 0
  else if (particle.y < 0) particle.y = canvas.height
}

const drawParticle = (particle, ctx) => {
  ctx.fillStyle = `rgba(197, 160, 89, ${particle.opacity})`
  ctx.beginPath()
  ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2)
  ctx.fill()
}

const MagicalBackground = () => {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')
    let particles = []
    let animationFrameId

    const resize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }

    const init = () => {
      particles = Array.from({ length: 60 }, () => createParticle(canvas))
    }

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      particles.forEach((particle) => {
        updateParticle(particle, canvas)
        drawParticle(particle, ctx)
      })
      animationFrameId = requestAnimationFrame(animate)
    }

    window.addEventListener('resize', resize)
    resize()
    init()
    animate()

    return () => {
      window.removeEventListener('resize', resize)
      cancelAnimationFrame(animationFrameId)
    }
  }, [])

  return <canvas ref={canvasRef} className="magical-canvas" />
}

export default MagicalBackground
>>>>>>> ca7a0c4 (Añado .env al gitignore)
