import React, { useEffect, useRef } from 'react';

export const StardustAnimation = () => {
    const canvasRef = useRef(null);
  
    useEffect(() => {
      const canvas = canvasRef.current;
      const ctx = canvas.getContext('2d');
      let animationFrameId: number;
  
      // Set canvas size
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
  
      // Create stars
      const stars: { x: number; y: number; size: number; speed: number; }[] = [];
      for (let i = 0; i < 200; i++) {
        stars.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          size: Math.random() * 2.5,
          speed: Math.random() * 0.5 + 0.2,
        });
      }
  
      // Animation function
      const animate = () => {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.fillStyle = 'gray';
  
        stars.forEach((star) => {
          ctx.beginPath();
          ctx.arc(star.x, star.y, star.size, 0, 2 * Math.PI);
          ctx.fill();
  
          // Move star
          star.y += star.speed;
  
          // Reset star position if it goes off screen
          if (star.y > canvas.height) {
            star.y = 0;
            star.x = Math.random() * canvas.width;
          }
        });
  
        animationFrameId = requestAnimationFrame(animate);
      };
  
      animate();
  
      // Clean up
      return () => {
        cancelAnimationFrame(animationFrameId);
      };
    }, []);
  
    return <canvas ref={canvasRef} className="absolute top-0 left-0 w-full h-full" />;
  };