import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";
import { TrendingUp } from "lucide-react";

const data = [
  { month: "Jan", revenue: 4200, orders: 2400 },
  { month: "Feb", revenue: 3800, orders: 2210 },
  { month: "Mar", revenue: 5100, orders: 2900 },
  { month: "Apr", revenue: 4700, orders: 2800 },
  { month: "May", revenue: 5800, orders: 3200 },
  { month: "Jun", revenue: 6200, orders: 3500 },
  { month: "Jul", revenue: 5900, orders: 3100 },
  { month: "Aug", revenue: 6800, orders: 3800 },
  { month: "Sep", revenue: 7200, orders: 4100 },
  { month: "Oct", revenue: 6500, orders: 3600 },
  { month: "Nov", revenue: 7800, orders: 4200 },
  { month: "Dec", revenue: 8500, orders: 4800 },
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
              {entry.dataKey === "revenue"
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

interface RevenueChartProps {
  compact?: boolean;
}

export default function RevenueChart({ compact = false }: RevenueChartProps) {
  const totalRevenue = data.reduce((sum, item) => sum + item.revenue, 0);
  const totalOrders = data.reduce((sum, item) => sum + item.orders, 0);

  return (
    <div className="gradient-card border border-[var(--color-border)] rounded-xl overflow-hidden w-full h-full">
      {/* Header */}
      <div
        className={`${
          compact ? "p-4" : "p-6"
        } border-b border-[var(--color-border)] gradient-primary-subtle`}
      >
        <div className="flex items-start justify-between">
          <div>
            <h2
              className={`${
                compact ? "text-sm" : "text-lg"
              } font-bold text-[var(--color-text-primary)] mb-0.5`}
            >
              Revenue Overview
            </h2>
            <p
              className={`${
                compact ? "text-xs" : "text-sm"
              } text-[var(--color-text-muted)]`}
            >
              Monthly revenue and orders
            </p>
          </div>
          <div className="flex items-center gap-1.5 px-2 py-1 bg-gradient-to-br from-[rgba(4,232,199,0.20)] to-[rgba(4,232,199,0.10)] rounded-lg">
            <TrendingUp className="w-3.5 h-3.5 text-[var(--color-primary)]" />
            <span className="text-xs font-semibold text-[var(--color-primary)]">
              +24.5%
            </span>
          </div>
        </div>

        {/* Summary Stats */}
        <div className={`flex gap-4 ${compact ? "mt-2" : "mt-4"}`}>
          <div>
            <p className="text-[10px] text-[var(--color-text-muted)] mb-0.5">
              Total Revenue
            </p>
            <p
              className={`${
                compact ? "text-base" : "text-xl"
              } font-bold text-[var(--color-text-primary)]`}
            >
              ${totalRevenue.toLocaleString()}
            </p>
          </div>
          <div className="border-l border-[var(--color-border)] pl-4">
            <p className="text-[10px] text-[var(--color-text-muted)] mb-0.5">
              Total Orders
            </p>
            <p
              className={`${
                compact ? "text-base" : "text-xl"
              } font-bold text-[var(--color-text-primary)]`}
            >
              {totalOrders.toLocaleString()}
            </p>
          </div>
        </div>
      </div>

      {/* Chart */}
      <div className={compact ? "p-3" : "p-6 pt-4"}>
        <div className={`${compact ? "h-[200px]" : "h-[300px]"} w-full`}>
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart
              data={data}
              margin={{ top: 5, right: 5, left: -15, bottom: 0 }}
            >
              <defs>
                <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                  <stop
                    offset="5%"
                    stopColor="var(--color-primary)"
                    stopOpacity={0.3}
                  />
                  <stop
                    offset="95%"
                    stopColor="var(--color-primary)"
                    stopOpacity={0}
                  />
                </linearGradient>
                <linearGradient id="colorOrders" x1="0" y1="0" x2="0" y2="1">
                  <stop
                    offset="5%"
                    stopColor="var(--color-violet)"
                    stopOpacity={0.2}
                  />
                  <stop
                    offset="95%"
                    stopColor="var(--color-violet)"
                    stopOpacity={0}
                  />
                </linearGradient>
              </defs>
              <CartesianGrid
                strokeDasharray="3 3"
                stroke="var(--color-border)"
                vertical={false}
              />
              <XAxis
                dataKey="month"
                axisLine={false}
                tickLine={false}
                tick={{
                  fontSize: 10,
                  fill: "var(--color-text-muted)",
                  fontWeight: 500,
                }}
                dy={5}
              />
              <YAxis
                axisLine={false}
                tickLine={false}
                tick={{
                  fontSize: 10,
                  fill: "var(--color-text-muted)",
                  fontWeight: 500,
                }}
                tickFormatter={(value) => `$${value / 1000}k`}
                width={40}
              />
              <Tooltip content={<CustomTooltip />} />
              <Legend
                wrapperStyle={{
                  paddingTop: compact ? "8px" : "20px",
                }}
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
              <Area
                type="monotone"
                dataKey="revenue"
                stroke="var(--color-primary)"
                strokeWidth={2}
                fillOpacity={1}
                fill="url(#colorRevenue)"
                dot={false}
                activeDot={{
                  r: 4,
                  fill: "var(--color-primary)",
                  stroke: "white",
                  strokeWidth: 2,
                }}
              />
              <Area
                type="monotone"
                dataKey="orders"
                stroke="var(--color-violet)"
                strokeWidth={2}
                fillOpacity={1}
                fill="url(#colorOrders)"
                dot={false}
                activeDot={{
                  r: 4,
                  fill: "var(--color-violet)",
                  stroke: "white",
                  strokeWidth: 2,
                }}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}
