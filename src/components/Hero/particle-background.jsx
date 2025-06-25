import React, { useEffect, useRef } from "react";

export const ParticleBackground = ({ 
  className = "", 
  quantity = 40, 
  staticity = 50,
  ease = 50,
  color = "#000000"
}) => {
  const canvasRef = useRef(null);
  const canvasContainerRef = useRef(null);
  const context = useRef(null);
  const circles = useRef([]);
  const mousePosition = useRef({ x: 0, y: 0 });
  const mouseCircle = useRef({ x: 0, y: 0 });
  const lastMousePosition = useRef({ x: 0, y: 0 });
  const isDrawing = useRef(false);

  const resizeCanvas = () => {
    if (canvasContainerRef.current && canvasRef.current && context.current) {
      circles.current = [];
      canvasRef.current.width = canvasContainerRef.current.offsetWidth;
      canvasRef.current.height = canvasContainerRef.current.offsetHeight;
      initializeCircles();
    }
  };

  const initializeCircles = () => {
    if (!canvasRef.current) return;
    
    const canvasSize = {
      w: canvasRef.current.width,
      h: canvasRef.current.height,
    };
    
    for (let i = 0; i < quantity; i++) {
      const radius = Math.random() * 1.5 + 1;
      circles.current.push({
        x: Math.random() * canvasSize.w,
        y: Math.random() * canvasSize.h,
        translateX: 0,
        translateY: 0,
        size: radius,
        alpha: 0,
        targetAlpha: parseFloat((Math.random() * 0.6 + 0.1).toFixed(1)),
        dx: (Math.random() - 0.5) * 0.2,
        dy: (Math.random() - 0.5) * 0.2,
        magnetism: 0.1 + Math.random() * 4,
      });
    }
  };

  const drawCircles = () => {
    if (!context.current) return;
    
    context.current.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
    
    for (let i = 0; i < circles.current.length; i++) {
      const circle = circles.current[i];
      const edge = testEdge(circle);
      
      if (edge !== false) {
        circle.dx = edge === 'right' || edge === 'left' ? -circle.dx : circle.dx;
        circle.dy = edge === 'top' || edge === 'bottom' ? -circle.dy : circle.dy;
      }
      
      const translateX = circle.translateX * ease * 0.01;
      const translateY = circle.translateY * ease * 0.01;
      
      circle.translateX = translateX;
      circle.translateY = translateY;
      
      circle.x += circle.dx + translateX;
      circle.y += circle.dy + translateY;
      
      circle.alpha += (circle.targetAlpha - circle.alpha) * 0.07;
      
      context.current.beginPath();
      context.current.arc(circle.x, circle.y, circle.size, 0, 2 * Math.PI);
      context.current.fillStyle = `rgba(${parseInt(color.slice(1, 3), 16)}, ${parseInt(color.slice(3, 5), 16)}, ${parseInt(color.slice(5, 7), 16)}, ${circle.alpha})`;
      context.current.fill();
    }
  };
  
  const testEdge = (circle) => {
    if (!canvasRef.current) return false;
    
    const edge = 5;
    const w = canvasRef.current.width;
    const h = canvasRef.current.height;
    
    if (circle.x < edge) return 'left';
    if (circle.x > w - edge) return 'right';
    if (circle.y < edge) return 'top';
    if (circle.y > h - edge) return 'bottom';
    
    return false;
  };
  
  const remapValue = (value, start1, end1, start2, end2) => {
    const remapped = start2 + (value - start1) * (end2 - start2) / (end1 - start1);
    return remapped > 0 ? remapped : 0;
  };

  const animate = () => {
    const currentMousePosition = { ...mousePosition.current };
    
    mouseCircle.current.x = currentMousePosition.x;
    mouseCircle.current.y = currentMousePosition.y;
    
    context.current.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
    
    const magnetism = staticity;
    
    for (let i = 0; i < circles.current.length; i++) {
      const circle = circles.current[i];
      
      const edge = testEdge(circle);
      
      if (edge !== false) {
        circle.dx = edge === 'right' || edge === 'left' ? -circle.dx : circle.dx;
        circle.dy = edge === 'top' || edge === 'bottom' ? -circle.dy : circle.dy;
      }
      
      if (
        mouseCircle.current.x && 
        mouseCircle.current.y && 
        isDrawing.current &&
        lastMousePosition.current.x && 
        lastMousePosition.current.y
      ) {
        const dynamicDistance = remapValue(
          Math.sqrt(
            Math.pow(mouseCircle.current.x - circle.x, 2) + 
            Math.pow(mouseCircle.current.y - circle.y, 2)
          ),
          0, 
          300, 
          0, 
          1
        );
        
        circle.translateX = (mouseCircle.current.x - circle.x) * dynamicDistance * magnetism * circle.magnetism * 0.01;
        circle.translateY = (mouseCircle.current.y - circle.y) * dynamicDistance * magnetism * circle.magnetism * 0.01;
        
        if (dynamicDistance < 0.01) {
          circle.translateX = 0;
          circle.translateY = 0;
        }
      } else {
        circle.translateX += (0 - circle.translateX) * 0.1;
        circle.translateY += (0 - circle.translateY) * 0.1;
      }
      
      const translateX = circle.translateX * ease * 0.01;
      const translateY = circle.translateY * ease * 0.01;
      
      circle.x += circle.dx + translateX;
      circle.y += circle.dy + translateY;
      
      circle.alpha += (circle.targetAlpha - circle.alpha) * 0.07;
      
      context.current.beginPath();
      context.current.arc(circle.x, circle.y, circle.size, 0, 2 * Math.PI);
      context.current.fillStyle = `rgba(${parseInt(color.slice(1, 3), 16)}, ${parseInt(color.slice(3, 5), 16)}, ${parseInt(color.slice(5, 7), 16)}, ${circle.alpha})`;
      context.current.fill();
    }
    
    lastMousePosition.current.x = currentMousePosition.x;
    lastMousePosition.current.y = currentMousePosition.y;
    
    window.requestAnimationFrame(animate);
  };

  useEffect(() => {
    if (canvasRef.current) {
      context.current = canvasRef.current.getContext('2d');
      
      resizeCanvas();
      
      animate();
      
      window.addEventListener('resize', resizeCanvas);
      
      return () => {
        window.removeEventListener('resize', resizeCanvas);
      };
    }
  }, []);

  useEffect(() => {
    const handleMouseMove = (event) => {
      const rect = canvasRef.current?.getBoundingClientRect();
      const x = event.clientX - rect.left;
      const y = event.clientY - rect.top;
      
      mousePosition.current = { x, y };
      isDrawing.current = true;
    };
    
    const handleMouseEnter = () => {
      isDrawing.current = true;
    };
    
    const handleMouseLeave = () => {
      isDrawing.current = false;
      mousePosition.current = { x: 0, y: 0 };
    };
    
    if (canvasContainerRef.current) {
      canvasContainerRef.current.addEventListener('mousemove', handleMouseMove);
      canvasContainerRef.current.addEventListener('mouseenter', handleMouseEnter);
      canvasContainerRef.current.addEventListener('mouseleave', handleMouseLeave);
      
      return () => {
        canvasContainerRef.current?.removeEventListener('mousemove', handleMouseMove);
        canvasContainerRef.current?.removeEventListener('mouseenter', handleMouseEnter);
        canvasContainerRef.current?.removeEventListener('mouseleave', handleMouseLeave);
      };
    }
  }, []);

  return (
    <div ref={canvasContainerRef} className={`absolute inset-0 ${className}`}>
      <canvas 
        ref={canvasRef} 
        className="absolute inset-0 w-full h-full"
      />
    </div>
  );
};