import { ArrowUpRight, Check, Clock, Loader } from "lucide-react";

interface QuickStatsProps {
  compact?: boolean;
}

export default function QuickStats({ compact = false }: QuickStatsProps) {
  const recentOrders = [
    {
      id: "#12453",
      customer: "John Doe",
      amount: "$234.00",
      status: "Completed",
    },
    {
      id: "#12452",
      customer: "Jane Smith",
      amount: "$156.00",
      status: "Processing",
    },
    {
      id: "#12451",
      customer: "Bob Johnson",
      amount: "$432.00",
      status: "Completed",
    },
    {
      id: "#12450",
      customer: "Alice Brown",
      amount: "$89.00",
      status: "Pending",
    },
    {
      id: "#12449",
      customer: "Charlie Wilson",
      amount: "$267.00",
      status: "Completed",
    },
  ];

  const getStatusConfig = (status: string) => {
    switch (status) {
      case "Completed":
        return {
          color:
            "bg-[var(--color-accent-muted)] text-[var(--color-primary)] border-[var(--color-primary)]/20",
          icon: Check,
        };
      case "Processing":
        return {
          color:
            "bg-[var(--color-violet-muted)] text-[var(--color-violet)] border-[var(--color-violet)]/20",
          icon: Loader,
        };
      case "Pending":
        return {
          color:
            "bg-[var(--color-coral-muted)] text-[var(--color-coral)] border-[var(--color-coral)]/20",
          icon: Clock,
        };
      default:
        return {
          color:
            "bg-[var(--color-secondary-light)] text-[var(--color-text-muted)] border-[var(--color-border)]",
          icon: Clock,
        };
    }
  };

  // Show fewer orders in compact mode
  const displayOrders = compact ? recentOrders.slice(0, 4) : recentOrders;

  return (
    <div className="gradient-card border border-[var(--color-border)] rounded-xl overflow-hidden w-full h-full flex flex-col">
      {/* Header */}
      <div
        className={`${
          compact ? "p-3" : "p-6"
        } border-b border-[var(--color-border)] gradient-primary-subtle`}
      >
        <div className="flex items-center justify-between">
          <div>
            <h2
              className={`${
                compact ? "text-sm" : "text-lg"
              } font-bold text-[var(--color-text-primary)] mb-0.5`}
            >
              Recent Orders
            </h2>
            <p
              className={`${
                compact ? "text-xs" : "text-sm"
              } text-[var(--color-text-muted)]`}
            >
              Latest transactions
            </p>
          </div>
          <button
            className={`flex items-center gap-1 ${
              compact ? "px-2 py-1" : "px-3 py-2"
            } text-[10px] text-[var(--color-primary)] hover:bg-[var(--color-accent-muted)] font-semibold rounded-lg transition-all duration-200`}
          >
            View All
            <ArrowUpRight className="w-3 h-3" />
          </button>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto flex-1">
        <table className="w-full">
          <thead>
            <tr className="border-b border-[var(--color-border)] gradient-table-header">
              <th
                className={`text-left ${
                  compact ? "px-3 py-2" : "px-6 py-3"
                } text-[10px] font-semibold text-[var(--color-text-secondary)]`}
              >
                Order
              </th>
              <th
                className={`text-left ${
                  compact ? "px-3 py-2" : "px-6 py-3"
                } text-[10px] font-semibold text-[var(--color-text-secondary)]`}
              >
                Customer
              </th>
              <th
                className={`text-left ${
                  compact ? "px-3 py-2" : "px-6 py-3"
                } text-[10px] font-semibold text-[var(--color-text-secondary)]`}
              >
                Amount
              </th>
              <th
                className={`text-left ${
                  compact ? "px-3 py-2" : "px-6 py-3"
                } text-[10px] font-semibold text-[var(--color-text-secondary)]`}
              >
                Status
              </th>
            </tr>
          </thead>
          <tbody>
            {displayOrders.map((order) => {
              const statusConfig = getStatusConfig(order.status);
              const StatusIcon = statusConfig.icon;

              return (
                <tr
                  key={order.id}
                  className="border-b border-[var(--color-border)] last:border-b-0 hover:bg-[var(--color-bg-light)] transition-all duration-200 cursor-pointer"
                >
                  <td
                    className={`${
                      compact ? "px-3 py-2" : "px-6 py-4"
                    } text-xs font-semibold text-[var(--color-primary)]`}
                  >
                    {order.id}
                  </td>
                  <td
                    className={`${
                      compact ? "px-3 py-2" : "px-6 py-4"
                    } text-xs font-medium text-[var(--color-text-primary)]`}
                  >
                    {compact ? order.customer.split(" ")[0] : order.customer}
                  </td>
                  <td
                    className={`${
                      compact ? "px-3 py-2" : "px-6 py-4"
                    } text-xs font-semibold text-[var(--color-text-primary)]`}
                  >
                    {order.amount}
                  </td>
                  <td className={`${compact ? "px-3 py-2" : "px-6 py-4"}`}>
                    <span
                      className={`inline-flex items-center gap-1 ${
                        compact ? "px-1.5 py-0.5" : "px-2.5 py-1"
                      } rounded-md text-[10px] font-semibold border ${
                        statusConfig.color
                      }`}
                    >
                      <StatusIcon className="w-2.5 h-2.5" />
                      {compact ? order.status.slice(0, 4) : order.status}
                    </span>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
