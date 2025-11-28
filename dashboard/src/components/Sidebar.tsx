import { useState } from "react";
import {
  LayoutDashboard,
  TrendingUp,
  Users,
  Package,
  ShoppingCart,
  Settings,
  LogOut,
} from "lucide-react";

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

const menuItems = [
  { id: "dashboard", label: "Dashboard", Icon: LayoutDashboard, badge: null },
  { id: "analytics", label: "Analytics", Icon: TrendingUp, badge: null },
  { id: "users", label: "Users", Icon: Users, badge: 12 },
  { id: "products", label: "Products", Icon: Package, badge: null },
  { id: "orders", label: "Orders", Icon: ShoppingCart, badge: 5 },
  { id: "settings", label: "Settings", Icon: Settings, badge: null },
];

export default function Sidebar({ isOpen, onClose }: SidebarProps) {
  const [activeItem, setActiveItem] = useState("dashboard");

  return (
    <>
      {/* Mobile overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/40 backdrop-blur-sm z-40 lg:hidden transition-opacity duration-300"
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`
          fixed lg:static inset-y-0 left-0 z-50
          w-64 bg-white
          shadow-sm border-r border-[var(--color-border)]
          transform transition-all duration-300 ease-out
          ${isOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}
        `}
      >
        <div className="flex flex-col h-full relative">
          {/* Logo Section */}
          <div className="h-16 flex items-center px-5 border-b border-[var(--color-border)]">
            <div className="flex items-center gap-3 w-full">
              <div className="w-8 h-8 rounded-lg bg-[var(--color-primary)] flex items-center justify-center">
                <LayoutDashboard className="w-4 h-4 text-white" />
              </div>
              <div>
                <h1 className="text-sm font-bold text-[var(--color-text-primary)]">
                  Admin Panel
                </h1>
              </div>
            </div>
          </div>

          {/* Navigation */}
          <nav className="flex-1 overflow-y-auto px-3 py-6 space-y-1">
            {menuItems.map((item) => {
              const Icon = item.Icon;
              const isActive = activeItem === item.id;

              return (
                <button
                  key={item.id}
                  onClick={() => setActiveItem(item.id)}
                  className="w-full group relative"
                >
                  {/* Button content */}
                  <div
                    className={`
                      flex items-center gap-3 px-3 py-2.5 rounded-lg
                      transition-all duration-200
                      ${
                        isActive
                          ? "bg-[var(--color-accent-muted)] text-[var(--color-primary)]"
                          : "text-[var(--color-text-secondary)] hover:bg-[var(--color-secondary-light)] hover:text-[var(--color-text-primary)]"
                      }
                    `}
                  >
                    {/* Icon */}
                    <Icon className="w-4 h-4" />

                    {/* Label */}
                    <span className="flex-1 text-left text-sm font-medium">
                      {item.label}
                    </span>

                    {/* Badge */}
                    {item.badge !== null && (
                      <span
                        className={`
                          flex items-center justify-center min-w-[18px] h-5 px-1.5 rounded-full text-xs font-semibold
                          transition-all duration-200
                          ${
                            isActive
                              ? "bg-[var(--color-primary)] text-white"
                              : "bg-[var(--color-secondary-light)] text-[var(--color-text-secondary)]"
                          }
                        `}
                      >
                        {item.badge}
                      </span>
                    )}
                  </div>
                </button>
              );
            })}
          </nav>

          {/* User Info Section */}
          <div className="px-3 py-4 border-t border-[var(--color-border)]">
            <div className="flex items-center gap-3 px-3 py-2.5 rounded-lg hover:bg-[var(--color-secondary-light)] transition-all duration-200 cursor-pointer group">
              {/* Avatar with status indicator */}
              <div className="relative flex-shrink-0">
                <div className="w-8 h-8 rounded-lg bg-[var(--color-primary)] flex items-center justify-center text-white font-semibold text-xs">
                  AD
                </div>
                <div className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 bg-[var(--color-primary)] rounded-full border-2 border-white" />
              </div>

              {/* User details */}
              <div className="flex-1 min-w-0">
                <p className="text-xs font-semibold text-[var(--color-text-primary)] truncate">
                  Admin User
                </p>
                <p className="text-[10px] text-[var(--color-text-muted)] truncate">
                  admin@example.com
                </p>
              </div>

              {/* Logout button */}
              <button
                className="w-6 h-6 rounded-md hover:bg-white flex items-center justify-center transition-all duration-200 opacity-0 group-hover:opacity-100 flex-shrink-0"
                title="Logout"
              >
                <LogOut className="w-3.5 h-3.5 text-[var(--color-text-muted)]" />
              </button>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
}
