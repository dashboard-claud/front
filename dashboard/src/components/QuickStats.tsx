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
          color: "bg-emerald-50 text-emerald-700 border-emerald-200",
          icon: Check,
        };
      case "Processing":
        return {
          color: "bg-blue-50 text-blue-700 border-blue-200",
          icon: Loader,
        };
      case "Pending":
        return {
          color: "bg-amber-50 text-amber-700 border-amber-200",
          icon: Clock,
        };
      default:
        return {
          color: "bg-gray-50 text-gray-700 border-gray-200",
          icon: Clock,
        };
    }
  };

  return (
    <div className="bg-[var(--color-bg-card)] border border-[var(--color-border)] rounded-2xl shadow-card animate-slide-in overflow-hidden">
      {/* Header */}
      <div className="p-8 lg:p-10 border-b border-[var(--color-border)] bg-gradient-to-r from-[var(--color-bg-light)] to-transparent">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold text-[var(--color-text-primary)] mb-2">
              Recent Orders
            </h2>
            <p className="text-base text-[var(--color-text-muted)]">
              Latest transactions from your store
            </p>
          </div>
          <button className="flex items-center gap-2 px-5 py-3 text-sm text-[var(--color-primary)] hover:bg-[var(--color-bg-light)] font-semibold rounded-xl transition-all duration-200 hover:scale-105">
            View All
            <ArrowUpRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-[var(--color-border)] bg-[var(--color-bg-light)]">
              <th className="text-left px-8 lg:px-10 py-5 text-xs font-bold text-[var(--color-text-secondary)] uppercase tracking-wider">
                Order ID
              </th>
              <th className="text-left px-8 lg:px-10 py-5 text-xs font-bold text-[var(--color-text-secondary)] uppercase tracking-wider">
                Customer
              </th>
              <th className="text-left px-8 lg:px-10 py-5 text-xs font-bold text-[var(--color-text-secondary)] uppercase tracking-wider">
                Amount
              </th>
              <th className="text-left px-8 lg:px-10 py-5 text-xs font-bold text-[var(--color-text-secondary)] uppercase tracking-wider">
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
                  className="border-b border-[var(--color-border)] last:border-b-0 hover:bg-[var(--color-bg-light)] transition-all duration-200 cursor-pointer group"
                >
                  <td className="px-8 lg:px-10 py-6 text-sm font-semibold text-[var(--color-primary)] group-hover:text-[var(--color-primary-dark)]">
                    {order.id}
                  </td>
                  <td className="px-8 lg:px-10 py-6 text-sm font-medium text-[var(--color-text-primary)]">
                    {order.customer}
                  </td>
                  <td className="px-8 lg:px-10 py-6 text-sm font-bold text-[var(--color-text-primary)]">
                    {order.amount}
                  </td>
                  <td className="px-8 lg:px-10 py-6">
                    <span
                      className={`inline-flex items-center gap-1.5 px-4 py-2 rounded-lg text-xs font-semibold border ${statusConfig.color}`}
                    >
                      <StatusIcon className="w-3.5 h-3.5" />
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

