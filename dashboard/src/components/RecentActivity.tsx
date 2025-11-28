import { UserPlus, ShoppingBag, Package, CreditCard, ArrowUpRight } from "lucide-react";

export default function RecentActivity() {
  const activities = [
    {
      id: 1,
      type: "user",
      message: "New user registered",
      user: "Sarah Johnson",
      time: "2 minutes ago",
    },
    {
      id: 2,
      type: "order",
      message: "New order placed",
      user: "Order #12453",
      time: "15 minutes ago",
    },
    {
      id: 3,
      type: "product",
      message: "Product updated",
      user: "iPhone 15 Pro",
      time: "1 hour ago",
    },
    {
      id: 4,
      type: "payment",
      message: "Payment received",
      user: "$234.00",
      time: "2 hours ago",
    },
    {
      id: 5,
      type: "user",
      message: "User profile updated",
      user: "Mike Wilson",
      time: "3 hours ago",
    },
  ];

  const getActivityConfig = (type: string) => {
    switch (type) {
      case "user":
        return {
          icon: UserPlus,
          gradient: "from-blue-500 to-cyan-500",
          bg: "bg-blue-50",
        };
      case "order":
        return {
          icon: ShoppingBag,
          gradient: "from-purple-500 to-pink-500",
          bg: "bg-purple-50",
        };
      case "product":
        return {
          icon: Package,
          gradient: "from-orange-500 to-amber-500",
          bg: "bg-orange-50",
        };
      case "payment":
        return {
          icon: CreditCard,
          gradient: "from-green-500 to-emerald-500",
          bg: "bg-green-50",
        };
      default:
        return {
          icon: Package,
          gradient: "from-gray-500 to-gray-600",
          bg: "bg-gray-50",
        };
    }
  };

  return (
    <div className="bg-[var(--color-bg-card)] border border-[var(--color-border)] rounded-2xl shadow-card animate-slide-in overflow-hidden">
      {/* Header */}
      <div className="p-8 lg:p-10 border-b border-[var(--color-border)] bg-gradient-to-r from-[var(--color-bg-light)] to-transparent">
        <h2 className="text-2xl font-bold text-[var(--color-text-primary)] mb-2">
          Recent Activity
        </h2>
        <p className="text-base text-[var(--color-text-muted)]">
          Latest events in your system
        </p>
      </div>

      {/* Activity List */}
      <div className="p-8 lg:p-10 space-y-6">
        {activities.map((activity, index) => {
          const config = getActivityConfig(activity.type);
          const Icon = config.icon;
          
          return (
            <div 
              key={activity.id} 
              className="flex gap-5 p-4 rounded-xl hover:bg-[var(--color-bg-light)] transition-all duration-200 cursor-pointer group -mx-4"
            >
              <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${config.gradient} flex items-center justify-center flex-shrink-0 shadow-lg group-hover:scale-110 transition-transform duration-200`}>
                <Icon className="w-7 h-7 text-white" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-base text-[var(--color-text-primary)] font-semibold mb-1">
                  {activity.message}
                </p>
                <p className="text-sm text-[var(--color-text-secondary)] font-medium mb-2">
                  {activity.user}
                </p>
                <p className="text-xs text-[var(--color-text-muted)] font-medium">
                  {activity.time}
                </p>
              </div>
            </div>
          );
        })}
      </div>

      {/* Footer */}
      <div className="px-8 lg:px-10 py-6 border-t border-[var(--color-border)] bg-[var(--color-bg-light)] text-center">
        <button className="flex items-center justify-center gap-2 w-full text-sm text-[var(--color-primary)] hover:text-[var(--color-primary-dark)] font-bold transition-all duration-200 hover:scale-105">
          View All Activity
          <ArrowUpRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}

