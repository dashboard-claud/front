import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Legend,
  Tooltip,
} from "recharts";
import { PieChart as PieChartIcon } from "lucide-react";

const data = [
  { name: "Electronics", value: 4200, color: "var(--color-primary)" },
  { name: "Clothing", value: 3100, color: "var(--color-violet)" },
  { name: "Home & Garden", value: 2800, color: "var(--color-coral)" },
  { name: "Sports", value: 1900, color: "var(--color-primary-dark)" },
  { name: "Books", value: 1200, color: "var(--color-violet-light)" },
];

interface CustomTooltipProps {
  active?: boolean;
  payload?: Array<{
    value: number;
    name: string;
    payload: { color: string };
  }>;
}

const CustomTooltip = ({ active, payload }: CustomTooltipProps) => {
  if (active && payload && payload.length) {
    const entry = payload[0];
    return (
      <div className="bg-[var(--color-bg-card)] border border-[var(--color-border)] rounded-lg p-3 shadow-lg">
        <div className="flex items-center gap-2 text-xs">
          <span
            className="w-2 h-2 rounded-full"
            style={{ backgroundColor: entry.payload.color }}
          />
          <span className="text-[var(--color-text-muted)]">{entry.name}:</span>
          <span className="font-semibold text-[var(--color-text-primary)]">
            ${entry.value.toLocaleString()}
          </span>
        </div>
      </div>
    );
  }
  return null;
};

interface SalesPieChartProps {
  compact?: boolean;
}

export default function SalesPieChart({ compact = false }: SalesPieChartProps) {
  const total = data.reduce((sum, item) => sum + item.value, 0);

  return (
    <div className="gradient-card border border-[var(--color-border)] rounded-xl overflow-hidden w-full h-full flex flex-col">
      {/* Header */}
      <div
        className={`${
          compact ? "p-4" : "p-6"
        } border-b border-[var(--color-border)] gradient-violet-subtle`}
      >
        <div className="flex items-start justify-between">
          <div>
            <h2
              className={`${
                compact ? "text-sm" : "text-lg"
              } font-bold text-[var(--color-text-primary)] mb-0.5`}
            >
              Sales by Category
            </h2>
            <p
              className={`${
                compact ? "text-xs" : "text-sm"
              } text-[var(--color-text-muted)]`}
            >
              Revenue distribution
            </p>
          </div>
          <div
            className={`${
              compact ? "p-1.5" : "p-2.5"
            } rounded-lg bg-gradient-to-br from-[rgba(139,92,246,0.20)] to-[rgba(139,92,246,0.10)]`}
          >
            <PieChartIcon
              className={`${
                compact ? "w-4 h-4" : "w-5 h-5"
              } text-[var(--color-violet)]`}
            />
          </div>
        </div>
      </div>

      {/* Chart */}
      <div className={`${compact ? "p-3" : "p-6"} flex-1 flex flex-col`}>
        <div className={`${compact ? "h-[180px]" : "h-[280px]"} w-full`}>
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={data}
                cx="50%"
                cy="50%"
                innerRadius={compact ? 40 : 60}
                outerRadius={compact ? 65 : 90}
                paddingAngle={3}
                dataKey="value"
                stroke="none"
              >
                {data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip content={<CustomTooltip />} />
              <Legend
                layout="horizontal"
                align="center"
                verticalAlign="bottom"
                iconType="circle"
                iconSize={6}
                wrapperStyle={{ paddingTop: compact ? "8px" : "20px" }}
                formatter={(value) => (
                  <span
                    style={{
                      color: "var(--color-text-secondary)",
                      fontSize: compact ? "9px" : "11px",
                      fontWeight: 500,
                    }}
                  >
                    {value}
                  </span>
                )}
              />
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* Total */}
        <div
          className={`text-center ${
            compact ? "mt-1 pt-2" : "mt-2 pt-4"
          } border-t border-[var(--color-border)]`}
        >
          <p className="text-[10px] text-[var(--color-text-muted)] mb-0.5">
            Total Sales
          </p>
          <p
            className={`${
              compact ? "text-lg" : "text-2xl"
            } font-bold text-[var(--color-text-primary)]`}
          >
            ${total.toLocaleString()}
          </p>
        </div>
      </div>
    </div>
  );
}
