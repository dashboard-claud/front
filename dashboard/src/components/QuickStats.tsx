import { ArrowUpRight, Check, Clock, Loader } from "lucide-react";

export default function QuickStats() {
  const recentOrders = [
    { id: "#12453", customer: "John Doe", amount: "$234.00", status: "Completed" },
    { id: "#12452", customer: "Jane Smith", amount: "$156.00", status: "Processing" },
    { id: "#12451", customer: "Bob Johnson", amount: "$432.00", status: "Completed" },
    { id: "#12450", customer: "Alice Brown", amount: "$89.00", status: "Pending" },
    { id: "#12449", customer: "Charlie Wilson", amount: "$267.00", status: "Completed" },
  ];

  const getStatusConfig = (status: string) => {
    switch (status) {
      case "Completed":
        return {
          color: "bg-[var(--color-accent-muted)] text-[var(--color-primary)] border-[var(--color-primary)]/20",
          icon: Check,
        };
      case "Processing":
        return {
          color: "bg-[var(--color-secondary-light)] text-[var(--color-text-secondary)] border-[var(--color-border)]",
          icon: Loader,
        };
      case "Pending":
        return {
          color: "bg-[var(--color-secondary-light)] text-[var(--color-text-muted)] border-[var(--color-border)]",
          icon: Clock,
        };
      default:
        return {
          color: "bg-[var(--color-secondary-light)] text-[var(--color-text-muted)] border-[var(--color-border)]",
          icon: Clock,
        };
    }
  };

  return (
    <div className="bg-white border border-[var(--color-border)] rounded-xl overflow-hidden">
      {/* Header */}
      <div className="p-6 border-b border-[var(--color-border)]">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-lg font-bold text-[var(--color-text-primary)] mb-1">
              Recent Orders
            </h2>
            <p className="text-sm text-[var(--color-text-muted)]">
              Latest transactions from your store
            </p>
          </div>
          <button className="flex items-center gap-1.5 px-3 py-2 text-xs text-[var(--color-primary)] hover:bg-[var(--color-accent-muted)] font-semibold rounded-lg transition-all duration-200">
            View All
            <ArrowUpRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-[var(--color-border)] bg-[var(--color-bg-light)]">
              <th className="text-left px-6 py-3 text-xs font-semibold text-[var(--color-text-secondary)]">
                Order ID
              </th>
              <th className="text-left px-6 py-3 text-xs font-semibold text-[var(--color-text-secondary)]">
                Customer
              </th>
              <th className="text-left px-6 py-3 text-xs font-semibold text-[var(--color-text-secondary)]">
                Amount
              </th>
              <th className="text-left px-6 py-3 text-xs font-semibold text-[var(--color-text-secondary)]">
                Status
              </th>
            </tr>
          </thead>
          <tbody>
            {recentOrders.map((order, index) => {
              const statusConfig = getStatusConfig(order.status);
              const StatusIcon = statusConfig.icon;
              
              return (
                <tr
                  key={order.id}
                  className="border-b border-[var(--color-border)] last:border-b-0 hover:bg-[var(--color-bg-light)] transition-all duration-200 cursor-pointer"
                >
                  <td className="px-6 py-4 text-sm font-semibold text-[var(--color-primary)]">
                    {order.id}
                  </td>
                  <td className="px-6 py-4 text-sm font-medium text-[var(--color-text-primary)]">
                    {order.customer}
                  </td>
                  <td className="px-6 py-4 text-sm font-semibold text-[var(--color-text-primary)]">
                    {order.amount}
                  </td>
                  <td className="px-6 py-4">
                    <span
                      className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-md text-xs font-semibold border ${statusConfig.color}`}
                    >
                      <StatusIcon className="w-3 h-3" />
                      {order.status}
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

