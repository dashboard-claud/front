import { useState, useEffect } from "react";
import { Responsive, WidthProvider } from "react-grid-layout";
import type { Layout, Layouts } from "react-grid-layout";
import StatCard from "./StatCard";
import RecentActivity from "./RecentActivity";
import QuickStats from "./QuickStats";
import RevenueChart from "./RevenueChart";
import SalesPieChart from "./PieChart";
import WeeklyBarChart from "./BarChart";
import { RotateCcw, GripVertical } from "lucide-react";
import "react-grid-layout/css/styles.css";
import "react-resizable/css/styles.css";

const ResponsiveGridLayout = WidthProvider(Responsive);

const STORAGE_KEY = "dashboard-layouts-v3";

const stats = [
  {
    label: "Total Revenue",
    value: "$45,231",
    change: "+12.5%",
    isPositive: true,
  },
  {
    label: "Active Users",
    value: "2,345",
    change: "+8.2%",
    isPositive: true,
  },
  { label: "New Orders", value: "156", change: "-3.1%", isPositive: false },
  {
    label: "Conversion Rate",
    value: "3.24%",
    change: "+2.4%",
    isPositive: true,
  },
];

// Breakpoints for responsive layout
const breakpoints = { lg: 1200, md: 996, sm: 768, xs: 480, xxs: 0 };
const cols = { lg: 12, md: 10, sm: 6, xs: 4, xxs: 4 };

// Default layouts for different breakpoints
const getDefaultLayouts = (): Layouts => ({
  lg: [
    { i: "stat-0", x: 0, y: 0, w: 3, h: 2, minW: 2, minH: 2 },
    { i: "stat-1", x: 3, y: 0, w: 3, h: 2, minW: 2, minH: 2 },
    { i: "stat-2", x: 6, y: 0, w: 3, h: 2, minW: 2, minH: 2 },
    { i: "stat-3", x: 9, y: 0, w: 3, h: 2, minW: 2, minH: 2 },
    { i: "revenue", x: 0, y: 2, w: 8, h: 6, minW: 4, minH: 4 },
    { i: "pie", x: 8, y: 2, w: 4, h: 6, minW: 3, minH: 4 },
    { i: "bar", x: 0, y: 8, w: 4, h: 6, minW: 3, minH: 4 },
    { i: "quickstats", x: 4, y: 8, w: 5, h: 6, minW: 3, minH: 4 },
    { i: "activity", x: 9, y: 8, w: 3, h: 6, minW: 3, minH: 4 },
  ],
  md: [
    { i: "stat-0", x: 0, y: 0, w: 5, h: 3, minW: 2, minH: 2 },
    { i: "stat-1", x: 5, y: 0, w: 5, h: 3, minW: 2, minH: 2 },
    { i: "stat-2", x: 0, y: 3, w: 5, h: 3, minW: 2, minH: 2 },
    { i: "stat-3", x: 5, y: 3, w: 5, h: 3, minW: 2, minH: 2 },
    { i: "revenue", x: 0, y: 6, w: 10, h: 6, minW: 4, minH: 4 },
    { i: "pie", x: 0, y: 12, w: 5, h: 6, minW: 3, minH: 4 },
    { i: "bar", x: 5, y: 12, w: 5, h: 6, minW: 3, minH: 4 },
    { i: "quickstats", x: 0, y: 18, w: 5, h: 6, minW: 3, minH: 4 },
    { i: "activity", x: 5, y: 18, w: 5, h: 6, minW: 3, minH: 4 },
  ],
  sm: [
    { i: "stat-0", x: 0, y: 0, w: 3, h: 3, minW: 2, minH: 2 },
    { i: "stat-1", x: 3, y: 0, w: 3, h: 3, minW: 2, minH: 2 },
    { i: "stat-2", x: 0, y: 3, w: 3, h: 3, minW: 2, minH: 2 },
    { i: "stat-3", x: 3, y: 3, w: 3, h: 3, minW: 2, minH: 2 },
    { i: "revenue", x: 0, y: 6, w: 6, h: 6, minW: 4, minH: 4 },
    { i: "pie", x: 0, y: 12, w: 6, h: 6, minW: 3, minH: 4 },
    { i: "bar", x: 0, y: 18, w: 6, h: 6, minW: 3, minH: 4 },
    { i: "quickstats", x: 0, y: 24, w: 6, h: 6, minW: 3, minH: 4 },
    { i: "activity", x: 0, y: 30, w: 6, h: 6, minW: 3, minH: 4 },
  ],
  xs: [
    { i: "stat-0", x: 0, y: 0, w: 4, h: 3, minW: 2, minH: 2 },
    { i: "stat-1", x: 0, y: 3, w: 4, h: 3, minW: 2, minH: 2 },
    { i: "stat-2", x: 0, y: 6, w: 4, h: 3, minW: 2, minH: 2 },
    { i: "stat-3", x: 0, y: 9, w: 4, h: 3, minW: 2, minH: 2 },
    { i: "revenue", x: 0, y: 12, w: 4, h: 6, minW: 2, minH: 4 },
    { i: "pie", x: 0, y: 18, w: 4, h: 6, minW: 2, minH: 4 },
    { i: "bar", x: 0, y: 24, w: 4, h: 6, minW: 2, minH: 4 },
    { i: "quickstats", x: 0, y: 30, w: 4, h: 6, minW: 2, minH: 4 },
    { i: "activity", x: 0, y: 36, w: 4, h: 6, minW: 2, minH: 4 },
  ],
  xxs: [
    { i: "stat-0", x: 0, y: 0, w: 4, h: 3, minW: 1, minH: 2 },
    { i: "stat-1", x: 0, y: 3, w: 4, h: 3, minW: 1, minH: 2 },
    { i: "stat-2", x: 0, y: 6, w: 4, h: 3, minW: 1, minH: 2 },
    { i: "stat-3", x: 0, y: 9, w: 4, h: 3, minW: 1, minH: 2 },
    { i: "revenue", x: 0, y: 12, w: 4, h: 6, minW: 2, minH: 4 },
    { i: "pie", x: 0, y: 18, w: 4, h: 6, minW: 2, minH: 4 },
    { i: "bar", x: 0, y: 24, w: 4, h: 6, minW: 2, minH: 4 },
    { i: "quickstats", x: 0, y: 30, w: 4, h: 6, minW: 2, minH: 4 },
    { i: "activity", x: 0, y: 36, w: 4, h: 6, minW: 2, minH: 4 },
  ],
});

export default function DashboardContent() {
  const [layouts, setLayouts] = useState<Layouts>(() => {
    // Force reset to default layouts to ensure proper mobile stacking
    const defaultLayouts = getDefaultLayouts();
    localStorage.setItem(STORAGE_KEY, JSON.stringify(defaultLayouts));
    return defaultLayouts;
  });

  const [isDragging, setIsDragging] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const handleLayoutChange = (
    _currentLayout: Layout[],
    allLayouts: Layouts
  ) => {
    setLayouts(allLayouts);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(allLayouts));
  };

  const resetToDefault = () => {
    const defaultLayouts = getDefaultLayouts();
    setLayouts(defaultLayouts);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(defaultLayouts));
  };

  const rowHeight = 40;

  return (
    <main className="flex-1 overflow-y-auto p-3 sm:p-4 lg:p-6 gradient-main-bg relative pb-20 lg:pb-6">
      {/* Subtle accent glow */}
      <div className="absolute top-0 right-0 w-[300px] sm:w-[500px] h-[300px] sm:h-[500px] bg-gradient-to-bl from-[var(--color-accent-muted)] via-[rgba(4,232,199,0.04)] to-transparent rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[250px] sm:w-[400px] h-[250px] sm:h-[400px] bg-gradient-to-tr from-[var(--color-violet-muted)] via-[rgba(139,92,246,0.02)] to-transparent rounded-full blur-3xl pointer-events-none" />

      <div
        id="dashboard-grid-container"
        className="max-w-[1600px] mx-auto relative"
      >
        {/* Reset Button */}
        <div className="flex justify-end mb-3 sm:mb-4">
          <button
            onClick={resetToDefault}
            className="flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-1.5 sm:py-2 rounded-lg bg-[var(--color-surface)] border border-[var(--color-border)] text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] hover:border-[var(--color-accent)] transition-all duration-200 text-xs sm:text-sm font-medium shadow-sm hover:shadow-md"
          >
            <RotateCcw size={14} className="sm:w-4 sm:h-4" />
            <span className="hidden xs:inline">Reset to Default</span>
            <span className="xs:hidden">Reset</span>
          </button>
        </div>

        {/* Responsive Draggable Grid */}
        <ResponsiveGridLayout
          className="layout"
          layouts={layouts}
          breakpoints={breakpoints}
          cols={cols}
          rowHeight={rowHeight}
          onLayoutChange={handleLayoutChange}
          onDragStart={() => setIsDragging(true)}
          onDragStop={() => setIsDragging(false)}
          onResizeStart={() => setIsDragging(true)}
          onResizeStop={() => setIsDragging(false)}
          draggableHandle=".drag-handle"
          isResizable={!isMobile}
          isDraggable={!isMobile}
          margin={isMobile ? [12, 12] : [16, 16]}
          containerPadding={[0, 0]}
          useCSSTransforms={true}
          compactType="vertical"
          preventCollision={false}
        >
          {/* Stat Cards */}
          {stats.map((stat, index) => (
            <div
              key={`stat-${index}`}
              className={`group relative w-full h-full ${
                isDragging ? "cursor-grabbing" : ""
              }`}
            >
              {!isMobile && <DragHandle />}
              <div className="w-full h-full">
                <StatCard {...stat} compact />
              </div>
            </div>
          ))}

          {/* Revenue Chart */}
          <div
            key="revenue"
            className={`group relative w-full h-full ${
              isDragging ? "cursor-grabbing" : ""
            }`}
          >
            {!isMobile && <DragHandle />}
            <div className="w-full h-full">
              <RevenueChart compact />
            </div>
          </div>

          {/* Pie Chart */}
          <div
            key="pie"
            className={`group relative w-full h-full ${
              isDragging ? "cursor-grabbing" : ""
            }`}
          >
            {!isMobile && <DragHandle />}
            <div className="w-full h-full">
              <SalesPieChart compact />
            </div>
          </div>

          {/* Bar Chart */}
          <div
            key="bar"
            className={`group relative w-full h-full ${
              isDragging ? "cursor-grabbing" : ""
            }`}
          >
            {!isMobile && <DragHandle />}
            <div className="w-full h-full">
              <WeeklyBarChart compact />
            </div>
          </div>

          {/* Quick Stats */}
          <div
            key="quickstats"
            className={`group relative w-full h-full ${
              isDragging ? "cursor-grabbing" : ""
            }`}
          >
            {!isMobile && <DragHandle />}
            <div className="w-full h-full">
              <QuickStats compact />
            </div>
          </div>

          {/* Recent Activity */}
          <div
            key="activity"
            className={`group relative w-full h-full ${
              isDragging ? "cursor-grabbing" : ""
            }`}
          >
            {!isMobile && <DragHandle />}
            <div className="w-full h-full">
              <RecentActivity compact />
            </div>
          </div>
        </ResponsiveGridLayout>
      </div>
    </main>
  );
}

// Drag Handle Component
function DragHandle() {
  return (
    <div className="drag-handle absolute top-2 right-2 z-10 p-1.5 rounded-md bg-[var(--color-surface-elevated)] border border-[var(--color-border)] opacity-0 group-hover:opacity-100 transition-opacity duration-200 cursor-grab active:cursor-grabbing shadow-sm">
      <GripVertical size={14} className="text-[var(--color-text-muted)]" />
    </div>
  );
}
