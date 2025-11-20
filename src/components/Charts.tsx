import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  PieChart as RePieChart,
  Pie,
  Cell,
} from "recharts";
import type { PieLabelRenderProps } from "recharts";

const COLORS = ["var(--acc)", "#0E1322"];

interface CustomTooltipProps {
  active?: boolean;
  payload?: Array<{
    name: string;
    value: number;
    fill?: string;
  }>;
  label?: string;
}

const CustomTooltip: React.FC<CustomTooltipProps> = ({
  active,
  payload,
  label,
}) => {
  if (!active || !payload || payload.length === 0) return null;

  return (
    <div
      style={{
        background: "#1F1F1F",
        padding: "8px 22px",
        borderRadius: "8px",
        color: "white",
      }}
    >
      <p style={{ marginBottom: 4 }}>{label}</p>

      {payload.map((entry, index) => (
        <p
          key={index}
          style={{
            margin: 0,
            color: entry.fill === "#0E1322" ? "#D8FF4B" : "#fff",
            fontWeight: 500,
          }}
        >
          {entry.name}: {entry.value}
        </p>
      ))}
    </div>
  );
};

interface BarChartProps {
  data: Array<{
    month: string;
    a: number;
    b: number;
  }>;
}

interface PieChartProps {
  data: Array<{
    name: string;
    value: number;
  }>;
  colors?: string[];
}

export const AnalyticsBarChart: React.FC<BarChartProps> = ({ data }) => (
  <div className="w-full h-[300px]">
    <ResponsiveContainer width="100%" height="100%">
      <BarChart data={data} barGap={12} barSize={35}>
        <XAxis dataKey="month" />
        <YAxis hide />

        <Tooltip cursor={{ fill: "var(--bg)" }} content={<CustomTooltip />} />

        <Bar
          dataKey="a"
          stackId="x"
          fill="var(--acc)"
          radius={[0, 0, 20, 20]}
        />
        <Bar dataKey="b" stackId="x" fill="#0E1322" radius={[20, 20, 0, 0]} />
      </BarChart>
    </ResponsiveContainer>
  </div>
);

export const AnalyticsPieChart: React.FC<PieChartProps> = ({
  data,
  colors = COLORS,
}) => {
  const total = data.reduce((sum, item) => sum + item.value, 0);

  const renderLabel = ({
    cx,
    cy,
    midAngle,
    innerRadius,
    outerRadius,
    value,
  }: PieLabelRenderProps) => {
    const RADIAN = Math.PI / 180;
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;

    const clampedRadius = Math.min(radius, outerRadius * 0.9);

    const angle = midAngle ?? 0;

    const x = cx + clampedRadius * Math.cos(-angle * RADIAN);
    const y = cy + clampedRadius * Math.sin(-angle * RADIAN);

    const pct = ((value / total) * 100).toFixed(0);

    return (
      <text
        x={x}
        y={y}
        fill="#fff"
        textAnchor="middle"
        dominantBaseline="central"
        fontSize={14}
        fontWeight="bold"
      >
        {pct}%
      </text>
    );
  };

  return (
    <div className="w-full flex justify-center">
      <ResponsiveContainer width={300} height={300}>
        <RePieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            outerRadius={130}
            dataKey="value"
            paddingAngle={2}
            labelLine={false}
            label={renderLabel}
          >
            {data.map((_, index) => (
              <Cell key={index} fill={colors[index % colors.length]} />
            ))}
          </Pie>
        </RePieChart>
      </ResponsiveContainer>
    </div>
  );
};
