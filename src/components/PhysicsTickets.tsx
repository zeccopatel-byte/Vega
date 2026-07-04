import React, { useEffect, useRef, useState } from 'react';
import Matter from 'matter-js';
import { motion, useInView } from 'motion/react';

const TICKETS = Array.from({ length: 8 });

const Ticket = ({ index, isFlipped }: { index: number; isFlipped: boolean }) => {
  const types = [
    { name: "Group", color: "text-black", img: "https://images.unsplash.com/photo-1564349683136-5c565f543163?auto=format&fit=crop&w=100&q=80" },
    { name: "Stud", color: "text-black", img: "https://images.unsplash.com/photo-1550258987-190a2d41a8ba?auto=format&fit=crop&w=100&q=80" },
    { name: "Pers", color: "text-black", img: "https://images.unsplash.com/photo-1531259683007-016a7b628fc3?auto=format&fit=crop&w=100&q=80" },
    { name: "Herit", color: "text-black", img: "https://images.unsplash.com/photo-1478147427282-58a87a120781?auto=format&fit=crop&w=100&q=80" }
  ];
  
  const type = types[index % types.length];

  return (
    <div 
      className="w-[280px] h-[100px] bg-[#f4f4f4] flex items-center relative overflow-hidden text-black p-2 gap-3 border border-black/10 shadow-2xl select-none"
      style={{
        clipPath: "polygon(0% 0%, 100% 0%, 100% 10%, 97% 10%, 97% 90%, 100% 90%, 100% 100%, 0% 100%, 0% 90%, 3% 90%, 3% 10%, 0% 10%)"
      }}
    >
      {/* Left side pattern / barcode */}
      <div className="w-6 flex flex-col justify-between h-full py-1 opacity-60">
        <div className="w-full h-[2px] bg-black"></div>
        <div className="w-full h-[1px] bg-black"></div>
        <div className="w-full h-[4px] bg-black"></div>
        <div className="w-full h-[1px] bg-black"></div>
        <div className="w-full h-[2px] bg-black"></div>
        <div className="w-full h-[6px] bg-black"></div>
        <div className="w-full h-[1px] bg-black"></div>
        <div className="w-full h-[3px] bg-black"></div>
        <div className="w-full h-[1px] bg-black"></div>
        <div className="w-full h-[5px] bg-black"></div>
        <div className="w-full h-[2px] bg-black"></div>
      </div>

      <div className="w-[60px] h-full bg-cover bg-center shrink-0 border border-black/10 pointer-events-none" style={{ backgroundImage: `url(${type.img})` }} />
      
      <div className="flex-1 flex flex-col justify-between h-full py-0.5 pointer-events-none">
        <div className={`font-serif italic ${type.color} text-3xl leading-none`}>{type.name}.</div>
        <div className="flex justify-between items-end mt-1">
          <div className="text-[6px] leading-tight font-mono opacity-60">
            DETAILS<br/>
            Group Tour<br/>
            Private Tour<br/>
            $50
          </div>
          <div className="font-bold text-[8px] uppercase text-right leading-tight">
            The Velvet Room<br/>
            <span className="font-mono font-normal opacity-60">Prague Art Pavilion</span>
          </div>
        </div>
      </div>

      <div className="w-[1px] h-[120%] -my-4 border-l border-dashed border-black/30 shrink-0 mx-1"></div>

      <div className="w-8 shrink-0 flex items-center justify-center font-bold text-2xl tracking-tighter -rotate-90 origin-center text-black pointer-events-none">
        TICKET
      </div>

      {/* Right barcode */}
      <div className="w-4 flex flex-col justify-between h-full py-1 opacity-60">
        <div className="w-full h-[2px] bg-black"></div>
        <div className="w-full h-[1px] bg-black"></div>
        <div className="w-full h-[4px] bg-black"></div>
        <div className="w-full h-[1px] bg-black"></div>
        <div className="w-full h-[2px] bg-black"></div>
        <div className="w-full h-[1px] bg-black"></div>
        <div className="w-full h-[3px] bg-black"></div>
        <div className="w-full h-[1px] bg-black"></div>
        <div className="w-full h-[5px] bg-black"></div>
      </div>
    </div>
  )
}

export default function PhysicsTickets() {
  const sceneRef = useRef<HTMLDivElement>(null);
  const engineRef = useRef<Matter.Engine | null>(null);
  const renderRef = useRef<Matter.Render | null>(null);
  const ticketRefs = useRef<(HTMLDivElement | null)[]>([]);
  const bodiesRef = useRef<Matter.Body[]>([]);
  const isInView = useInView(sceneRef, { once: true, margin: "-10%" });

  useEffect(() => {
    if (!isInView || !sceneRef.current) return;

    // Setup Engine
    const engine = Matter.Engine.create({
      enableSleeping: false,
      gravity: { x: 0, y: 1.5, scale: 0.001 } // Add gravity
    });
    engineRef.current = engine;

    const width = sceneRef.current.clientWidth;
    const height = sceneRef.current.clientHeight;

    // Create bounds
    const wallOptions = { 
      isStatic: true, 
      render: { visible: false },
      friction: 0.1,
      restitution: 0.2 // slightly bouncy
    };

    const ground = Matter.Bodies.rectangle(width / 2, height + 50, width * 2, 100, wallOptions);
    const leftWall = Matter.Bodies.rectangle(-50, height / 2, 100, height * 2, wallOptions);
    const rightWall = Matter.Bodies.rectangle(width + 50, height / 2, 100, height * 2, wallOptions);
    const ceiling = Matter.Bodies.rectangle(width / 2, -1000, width * 2, 100, wallOptions);

    Matter.World.add(engine.world, [ground, leftWall, rightWall, ceiling]);

    const handleResize = () => {
      if (!sceneRef.current) return;
      const w = sceneRef.current.clientWidth;
      const h = sceneRef.current.clientHeight;
      Matter.Body.setPosition(ground, { x: w / 2, y: h + 50 });
      Matter.Body.setPosition(rightWall, { x: w + 50, y: h / 2 });
      Matter.Body.setPosition(ceiling, { x: w / 2, y: -1000 });
      // left wall stays at -50
    };
    
    window.addEventListener('resize', handleResize);

    // Create tickets
    const ticketWidth = 240; // slightly smaller physical box
    const ticketHeight = 90;

    const bodies = TICKETS.map((_, i) => {
      // Start them spread out in the top half, stagger them more vertically
      const x = width / 2 + (Math.random() * 40 - 20); // Mostly centered to avoid wall wedging on small screens
      const y = -100 - (i * 200) - (Math.random() * 100);
      
      const body = Matter.Bodies.rectangle(x, y, ticketWidth, ticketHeight, {
        restitution: 0.4, // bouncy
        friction: 0.1,
        frictionAir: 0.015,
        density: 0.005,
        chamfer: { radius: 10 },
        angle: (Math.random() - 0.5) * Math.PI, // Random initial rotation
        render: { visible: false } // We'll render with DOM
      });

      return body;
    });

    bodiesRef.current = bodies;
    Matter.World.add(engine.world, bodies);

    // Add mouse control
    const mouse = Matter.Mouse.create(sceneRef.current);
    const mouseConstraint = Matter.MouseConstraint.create(engine, {
      mouse: mouse,
      constraint: {
        stiffness: 0.2,
        render: {
          visible: false
        }
      }
    });

    Matter.World.add(engine.world, mouseConstraint);

    // Keep the mouse in sync with rendering
    // Not strictly needed if not using Matter.Render, but good for scaling
    // render.mouse = mouse; 

    // Create Runner
    const runner = Matter.Runner.create();
    Matter.Runner.run(runner, engine);

    // Sync DOM elements with bodies
    let animationFrameId: number;
    
    const updateDOM = () => {
      bodies.forEach((body, i) => {
        const el = ticketRefs.current[i];
        if (el) {
          // Center transform
          const { x, y } = body.position;
          el.style.transform = `translate(${x - ticketWidth/2}px, ${y - ticketHeight/2}px) rotate(${body.angle}rad)`;
        }
      });
      animationFrameId = requestAnimationFrame(updateDOM);
    };

    updateDOM();

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
      Matter.Runner.stop(runner);
      Matter.Engine.clear(engine);
      if (engineRef.current) {
        Matter.World.clear(engineRef.current.world, false);
      }
    };
  }, [isInView]);

  return (
    <div ref={sceneRef} className="absolute bottom-0 left-0 w-full h-[500px] z-20 overflow-visible pointer-events-none">
      {TICKETS.map((_, i) => (
        <div
          key={i}
          ref={el => ticketRefs.current[i] = el}
          className="absolute top-0 left-0 pointer-events-auto cursor-grab active:cursor-grabbing"
          style={{
            willChange: 'transform'
          }}
        >
          <div className="pointer-events-none">
             <Ticket index={i} isFlipped={Math.random() > 0.5} />
          </div>
        </div>
      ))}
    </div>
  );
}
