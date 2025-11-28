import StatCard from "./StatCard";
import RecentActivity from "./RecentActivity";
import QuickStats from "./QuickStats";

export default function DashboardContent() {
  const stats = [
    { label: "Total Revenue", value: "$45,231", change: "+12.5%", isPositive: true },
    { label: "Active Users", value: "2,345", change: "+8.2%", isPositive: true },
    { label: "New Orders", value: "156", change: "-3.1%", isPositive: false },
    { label: "Conversion Rate", value: "3.24%", change: "+2.4%", isPositive: true },
  ];

  return (
    <main className="flex-1 overflow-y-auto p-8 lg:p-12 bg-gradient-to-br from-[var(--color-bg-light)] to-white">
      <div className="max-w-7xl mx-auto space-y-12">
        {/* Page Title */}
        <div className="animate-fade-in-up">
          <h1 className="text-4xl font-bold text-[var(--color-text-primary)] tracking-tight mb-3">
            Dashboard Overview
          </h1>
          <p className="text-lg text-[var(--color-text-muted)]">
            Welcome back! Here's what's happening with your business today.
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 animate-fade-in-up">
          {stats.map((stat, index) => (
            <StatCard key={index} {...stat} />
          ))}
        </div>

        {/* Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          {/* Main Content - Takes 2 columns */}
          <div className="lg:col-span-2 space-y-10">
            <QuickStats />
          </div>

          {/* Sidebar - Takes 1 column */}
          <div className="space-y-10">
            <RecentActivity />
          </div>
        </div>
      </div>
    </main>
  );
}

