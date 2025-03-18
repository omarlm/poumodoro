import { useEffect, useRef } from "react";

interface CircularProgressProps {
  value: number;
  maxValue: number;
  size?: number;
  strokeWidth?: number;
  strokeColor?: string;
  backgroundColor?: string;
  children?: React.ReactNode;
}

const CircularProgress: React.FC<CircularProgressProps> = ({
  value,
  maxValue,
  size = 250,
  strokeWidth = 12,
  strokeColor = "#8ebdb6",
  backgroundColor = "#e0e0e0",
  children,
}) => {
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference * (1 - value / maxValue);

  const circleRef = useRef<SVGCircleElement>(null);

  useEffect(() => {
    if (circleRef.current) {
      circleRef.current.style.transition = "stroke-dashoffset 0.5s ease-in-out";
      circleRef.current.style.strokeDashoffset = `${offset}`;
    }
  }, [offset]);

  return (
    <div className="relative" style={{ width: size, height: size }}>
      <svg className="-rotate-90 transform" width={size} height={size}>
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="transparent"
          stroke={backgroundColor}
          strokeWidth={strokeWidth}
        />
        <circle
          ref={circleRef}
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="transparent"
          stroke={strokeColor}
          strokeWidth={strokeWidth}
          strokeDasharray={circumference}
          strokeDashoffset={circumference} // Inicialmente lleno
          strokeLinecap="round"
        />
      </svg>
      <div className="absolute top-0 left-0 flex h-full w-full items-center justify-center">
        {children}
      </div>
    </div>
  );
};

export default CircularProgress;
