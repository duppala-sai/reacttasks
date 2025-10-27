import React, { useEffect, useRef } from "react";
import * as fabric  from "fabric";

const Canva: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    if (!canvasRef.current) return;

    const canvas = new fabric.Canvas(canvasRef.current, {
      width: 500,
      height: 500,
      backgroundColor: "#f0f0f0",
    });

    const rect = new fabric.Circle({
      left: 80,
      top: 50,
      fill: "blue",
      radius: 10,
      selectable: true,
    });

    const text = new fabric.Textbox("Note should be here", {
      left: 400,
      top: 300,
      fontSize: 16,
      fill: "red",
      selectable: true,
    });

    const poly = new fabric.Polygon(
      [
        { x: 50, y: 0 },
        { x: 100, y: 25 },
        { x: 100, y: 75 },
        { x: 50, y: 100 },
        { x: 0, y: 75 },
        { x: 0, y: 25 },
      ],
      {
        left: 100,
        top: 120,
        fill: "green",
        selectable: true,
      }
    );

    canvas.add(rect, text, poly);
return () => {
      canvas.dispose();
    };
  }, []);

  return <canvas ref={canvasRef} />;
};

export default Canva;