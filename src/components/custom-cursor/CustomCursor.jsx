import React, { useEffect, useRef } from 'react';
import './CustomCursor.css';

const CustomCursor = () => {
    const cursorRef = useRef(null);
    const auraRef = useRef(null);
    const requestRef = useRef();
    const mousePos = useRef({ x: 0, y: 0 });

    useEffect(() => {
        const handleMouseMove = (e) => {
            mousePos.current = { x: e.clientX, y: e.clientY };
            
            const target = e.target;
            const isClickable = window.getComputedStyle(target).cursor === 'pointer' || 
                              target.tagName === 'A' || 
                              target.tagName === 'BUTTON' ||
                              target.closest('button') ||
                              target.closest('.game-card');
            
            if (cursorRef.current) {
                if (isClickable) cursorRef.current.classList.add('pointer');
                else cursorRef.current.classList.remove('pointer');
            }
        };

        const animate = () => {
            if (cursorRef.current) {
                // Raw 1:1 position, zero smoothing
                cursorRef.current.style.transform = `translate3d(${mousePos.current.x}px, ${mousePos.current.y}px, 0)`;
            }
            requestRef.current = requestAnimationFrame(animate);
        };

        window.addEventListener('mousemove', handleMouseMove);
        requestRef.current = requestAnimationFrame(animate);
        
        return () => {
            window.removeEventListener('mousemove', handleMouseMove);
            cancelAnimationFrame(requestRef.current);
        };
    }, []);

    return (
        <div className="custom-cursor-container">
            <div className="custom-cursor" ref={cursorRef}>
                <div className="cursor-core"></div>
                <div className="cursor-aura" ref={auraRef}></div>
            </div>
        </div>
    );
};

export default CustomCursor;
