import React, { useState } from "react";
import { Stage, Layer, Line, Circle, Group } from "react-konva";

export const DrawingComponent = () => {
  const [points, setPoints] = useState([]);
  const [lines, setLines] = useState([]);

  const handleMouseDown = (event) => {
    const { layerX, layerY } = event.evt;
    const newPoint = { x: layerX, y: layerY };

    setPoints([...points, newPoint]);

    if (points.length > 0) {
      const prevPoint = points[points.length - 1];
      const newLine = {
        points: [prevPoint.x, prevPoint.y, newPoint.x, newPoint.y],
      };

      setLines([...lines, newLine]);
    }
  };

  return (
    <Stage
      width={window.innerWidth}
      height={window.innerHeight}
      onMouseDown={handleMouseDown} // Добавляем обработчик событий onMouseDown
      onMouseUp={() => console.log("points", points)}
    >
      <Layer>
        {lines.map((line, index) => (
          <Line key={index} points={line.points} stroke="black" />
        ))}
        <Group>
          {points.map((point, index) => (
            <Circle key={index} x={point.x} y={point.y} radius={3} fill="red" />
          ))}
          <Line
            points={[...points.map((point) => [point.x, point.y]).flat()]}
            stroke="blue"
          />
        </Group>
      </Layer>
    </Stage>
  );
};
