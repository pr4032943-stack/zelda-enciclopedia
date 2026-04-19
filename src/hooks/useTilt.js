import React, { useRef, useState } from 'react';

const useTilt = () => {
    const cardRef = useRef(null);
    const [style, setStyle] = useState({});
    const [glare, setGlare] = useState({ x: 50, y: 50, opacity: 0 });

    const handleMouseMove = (e) => {
        if (!cardRef.current) return;
        
        const rect = cardRef.current.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        const glareX = (x / rect.width) * 100;
        const glareY = (y / rect.height) * 100;
        
        setStyle({
            transform: `scale(1.04)`,
        });

        setGlare({
            x: glareX,
            y: glareY,
            opacity: 0.4
        });
    };

    const handleMouseLeave = () => {
        setStyle({
            transform: 'scale(1)',
            transition: 'all 0.4s cubic-bezier(0.2, 0.8, 0.2, 1)',
        });
        setGlare(prev => ({ ...prev, opacity: 0 }));
    };

    return { cardRef, style, glare, handleMouseMove, handleMouseLeave };
};

export default useTilt;
