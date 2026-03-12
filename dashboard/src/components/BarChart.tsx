import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";
import { BarChart3 } from "lucide-react";

const data = [
  { day: "Mon", sales: 4200, visitors: 2400 },
  { day: "Tue", sales: 3800, visitors: 2100 },
  { day: "Wed", sales: 5100, visitors: 2900 },
  { day: "Thu", sales: 4700, visitors: 2600 },
  { day: "Fri", sales: 6200, visitors: 3500 },
  { day: "Sat", sales: 5800, visitors: 3200 },
  { day: "Sun", sales: 4100, visitors: 2300 },
];

interface CustomTooltipProps {
  active?: boolean;
  payload?: Array<{
    value: number;
    dataKey: string;
    color: string;
  }>;
  label?: string;
}

const CustomTooltip = ({ active, payload, label }: CustomTooltipProps) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-[var(--color-bg-card)] border border-[var(--color-border)] rounded-lg p-3 shadow-lg">
        <p className="text-xs font-semibold text-[var(--color-text-primary)] mb-2">
          {label}
        </p>
        {payload.map((entry, index) => (
          <div key={index} className="flex items-center gap-2 text-xs">
            <span
              className="w-2 h-2 rounded-full"
              style={{ backgroundColor: entry.color }}
            />
            <span className="text-[var(--color-text-muted)] capitalize">
              {entry.dataKey}:
            </span>
            <span className="font-semibold text-[var(--color-text-primary)]">
              {entry.dataKey === "sales"
                ? `$${entry.value.toLocaleString()}`
                : entry.value.toLocaleString()}
            </span>
          </div>
        ))}
      </div>
    );
  }
  return null;
};

interface WeeklyBarChartProps {
  compact?: boolean;
}

export default function WeeklyBarChart({
  compact = false,
}: WeeklyBarChartProps) {
  const avgSales = Math.round(
    data.reduce((sum, item) => sum + item.sales, 0) / data.length
  );
  const avgVisitors = Math.round(
    data.reduce((sum, item) => sum + item.visitors, 0) / data.length
  );

  return (
    <div className="gradient-card border border-[var(--color-border)] rounded-xl overflow-hidden w-full h-full flex flex-col">
      {/* Header */}
      <div
        className={`${
          compact ? "p-3" : "p-6"
        } border-b border-[var(--color-border)] gradient-primary-subtle`}
      >
        <div className="flex items-start justify-between">
          <div>
            <h2
              className={`${
                compact ? "text-sm" : "text-lg"
              } font-bold text-[var(--color-text-primary)] mb-0.5`}
            >
              Weekly Performance
            </h2>
            <p
              className={`${
                compact ? "text-xs" : "text-sm"
              } text-[var(--color-text-muted)]`}
            >
              Daily sales & visitors
            </p>
          </div>
          <div
            className={`${
              compact ? "p-1.5" : "p-2.5"
            } rounded-lg bg-gradient-to-br from-[rgba(4,232,199,0.20)] to-[rgba(4,232,199,0.10)]`}
          >
            <BarChart3
              className={`${
                compact ? "w-4 h-4" : "w-5 h-5"
              } text-[var(--color-primary)]`}
            />
          </div>
        </div>

        {/* Summary Stats */}
        <div className={`flex gap-4 ${compact ? "mt-2" : "mt-4"}`}>
          <div>
            <p className="text-[10px] text-[var(--color-text-muted)] mb-0.5">
              Avg. Sales
            </p>
            <p
              className={`${
                compact ? "text-sm" : "text-lg"
              } font-bold text-[var(--color-text-primary)]`}
            >
              ${avgSales.toLocaleString()}
            </p>
          </div>
          <div className="border-l border-[var(--color-border)] pl-4">
            <p className="text-[10px] text-[var(--color-text-muted)] mb-0.5">
              Avg. Visitors
            </p>
            <p
              className={`${
                compact ? "text-sm" : "text-lg"
              } font-bold text-[var(--color-text-primary)]`}
            >
              {avgVisitors.toLocaleString()}
            </p>
          </div>
        </div>
      </div>

      {/* Chart */}
      <div className={`${compact ? "p-3" : "p-6 pt-4"} flex-1`}>
        <div className={`${compact ? "h-[180px]" : "h-[260px]"} w-full`}>
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={data}
              margin={{ top: 5, right: 5, left: -15, bottom: 0 }}
              barCategoryGap="15%"
            >
              <CartesianGrid
                strokeDasharray="3 3"
                stroke="var(--color-border)"
                vertical={false}
              />
              <XAxis
                dataKey="day"
                axisLine={false}
                tickLine={false}
                tick={{
                  fontSize: 9,
                  fill: "var(--color-text-muted)",
                  fontWeight: 500,
                }}
                dy={5}
              />
              <YAxis
                axisLine={false}
                tickLine={false}
                tick={{
                  fontSize: 9,
                  fill: "var(--color-text-muted)",
                  fontWeight: 500,
                }}
                tickFormatter={(value) => `$${value / 1000}k`}
                width={35}
              />
              <Tooltip content={<CustomTooltip />} />
              <Legend
                wrapperStyle={{ paddingTop: compact ? "8px" : "16px" }}
                iconType="circle"
                iconSize={6}
                formatter={(value) => (
                  <span
                    style={{
                      color: "var(--color-text-secondary)",
                      fontSize: "10px",
                      fontWeight: 500,
                      textTransform: "capitalize",
                    }}
                  >
                    {value}
                  </span>
                )}
              />
              <Bar
                dataKey="sales"
                fill="var(--color-primary)"
                radius={[3, 3, 0, 0]}
                maxBarSize={compact ? 20 : 40}
              />
              <Bar
                dataKey="visitors"
                fill="var(--color-violet)"
                radius={[3, 3, 0, 0]}
                maxBarSize={compact ? 20 : 40}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}
