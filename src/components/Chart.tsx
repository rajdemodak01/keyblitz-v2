import { calculateWpm } from "@/lib/calculateWPM";
import { useAppSelector } from "@/lib/hooks";
import React, { useEffect, useState } from "react";
import {
  CartesianGrid,
  ComposedChart,
  Legend,
  Line,
  ResponsiveContainer,
  Scatter,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

interface DataPoint {
  index: number;
  wpm: number;
  rawWPM: number;
  errorCount: number | null;
}

const CustomCircle = (props: any) => {
  const { cx, cy, fill } = props;
  if (!cx || !cy) {
    return null;
  }
  return (
    <svg
      x={cx - 4} // Adjusted to center based on new size
      y={cy - 4} // Adjusted to center based on new size
      xmlns="http://www.w3.org/2000/svg"
      width="8"
      height="8"
      viewBox="0 0 8 8"
      fill="none"
      stroke={fill || "currentColor"}
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M2.172 2.172l3.656 3.656m0-3.656l-3.656 3.656" />
    </svg>
  );
};

const Chart = () => {
  const [chartData, setChartData] = useState<
    { index: number; wpm: number; rawWPM: number; errorCount: number | null }[]
  >([]);
  const { secondsCharTyped } = useAppSelector((state) => state.typingTests);

  useEffect(() => {
    const rawData = secondsCharTyped.map((data, index) => ({
      index: index + 1,
      wpm: calculateWpm(data.correctCharTypedCount / 5, 1000),
      rawWPM: calculateWpm(data.charTypedCount / 5, 1000),
      errorCount:
        data.errorCharTypedCount > 0 ? data.errorCharTypedCount : null,
    }));

    const alpha = 0.2; // Smoothing factor, adjust between 0 and 1

    const smoothedData = rawData.reduce<DataPoint[]>((acc, item, index) => {
      if (index === 0) {
        acc.push(item);
      } else {
        const prevItem = acc[index - 1];
        acc.push({
          ...item,
          wpm: Math.round(alpha * item.wpm + (1 - alpha) * prevItem.wpm),
          rawWPM: Math.round(
            alpha * item.rawWPM + (1 - alpha) * prevItem.rawWPM
          ),
        });
      }
      return acc;
    }, []);

    setChartData(smoothedData);
    console.log(smoothedData, rawData);
  }, []);

  return (
    <ResponsiveContainer width="100%" height="100%">
      <ComposedChart
        height={250}
        data={chartData}
        margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
      >
        <CartesianGrid strokeDasharray="3 3" opacity={0.15} />
        <XAxis dataKey="index" />
        <YAxis
          yAxisId="left-axis"
          label={{ value: "WPM", angle: -90, position: "insideLeft" }}
        />
        <YAxis
          yAxisId="right-axis"
          orientation="right"
          label={{ value: "Error", angle: 90, position: "insideRight" }}
          domain={[0, (dataMax: number) => Math.ceil(dataMax * 1.2)]}
        />
        <Tooltip
          contentStyle={{
            backgroundColor: "hsl(var(--background))",
            border: "1px solid hsl(var(--border))",
            borderRadius: "8px",
            padding: "10px",
            color: "hsl(var(--foreground))",
          }}
          animationDuration={150}
        />
        <Legend />
        <Line
          type="monotone"
          yAxisId="left-axis"
          dataKey="wpm"
          stroke="hsl(var(--foreground))"
          name="WPM"
          strokeWidth={2}
          isAnimationActive={false}
        />
        <Line
          type="monotone"
          yAxisId="left-axis"
          dataKey="rawWPM"
          stroke="hsl(var(--foreground))"
          opacity={0.4}
          name="Raw WPM"
          strokeWidth={2}
          isAnimationActive={false}
        />
        <Scatter
          yAxisId="right-axis"
          dataKey="errorCount"
          fill="hsl(var(--destructive))"
          name="Error Count"
          shape={<CustomCircle />}
          isAnimationActive={false}
        />
      </ComposedChart>
    </ResponsiveContainer>
  );
};

export default Chart;
