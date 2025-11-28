import { useState } from "react";
import {
  LayoutDashboard,
  TrendingUp,
  Users,
  Package,
  ShoppingCart,
  Settings,
  ChevronRight,
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
          w-80 bg-gradient-to-br from-[var(--color-bg-darker)] via-[var(--color-bg-dark)] to-[var(--color-bg-darker)]
          shadow-2xl border-r border-white/5
          transform transition-all duration-300 ease-out
          ${isOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}
        `}
      >
        <div className="flex flex-col h-full relative">
          {/* Decorative gradient line */}
          <div className="absolute top-0 right-0 w-1 h-full bg-gradient-to-b from-[var(--color-primary)] via-[var(--color-primary-light)] to-[var(--color-accent)] opacity-80" />

          {/* Logo Section */}
          <div className="h-24 flex items-center px-6 border-b border-white/10 relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-[var(--color-primary)]/20 via-[var(--color-primary-light)]/10 to-transparent" />
            <div className="relative z-10 flex items-center gap-4 w-full">
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-[var(--color-primary)] via-[var(--color-primary-light)] to-[var(--color-primary)] flex items-center justify-center shadow-xl shadow-[var(--color-primary)]/30">
                <LayoutDashboard className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-white tracking-tight">
                  Admin Panel
                </h1>
                <p className="text-xs text-white/70 font-medium">
                  Management System
                </p>
              </div>
            </div>
          </div>

          {/* Navigation */}
          <nav className="flex-1 overflow-y-auto px-4 py-8 space-y-3">
            <div className="text-xs font-bold text-white/50 uppercase tracking-wider px-4 mb-6">
              Main Menu
            </div>
            {menuItems.map((item, index) => {
              const Icon = item.Icon;
              const isActive = activeItem === item.id;

              return (
                <button
                  key={item.id}
                  onClick={() => setActiveItem(item.id)}
                  className="w-full group relative"
                  style={{
                    animationDelay: `${index * 50}ms`,
                  }}
                >
                  {/* Active indicator */}
                  <div
                    className={`
                      absolute left-0 top-1/2 -translate-y-1/2 w-1.5 h-12 rounded-r-full
                      bg-gradient-to-b from-[var(--color-primary)] via-[var(--color-primary-light)] to-[var(--color-primary)]
                      transition-all duration-300 ease-out shadow-lg shadow-[var(--color-primary)]/50
                      ${
                        isActive
                          ? "opacity-100 scale-100"
                          : "opacity-0 scale-y-50"
                      }
                    `}
                  />

                  {/* Button content */}
                  <div
                    className={`
                      flex items-center gap-4 px-4 py-4 rounded-2xl mx-2
                      transition-all duration-300 ease-out
                      ${
                        isActive
                          ? "bg-gradient-to-r from-[var(--color-primary)]/30 via-[var(--color-primary-light)]/20 to-[var(--color-primary)]/30 text-white shadow-xl shadow-[var(--color-primary)]/30 scale-105"
                          : "text-white/70 hover:text-white hover:bg-white/10 hover:scale-102"
                      }
                    `}
                  >
                    {/* Icon container */}
                    <div
                      className={`
                        relative flex items-center justify-center w-11 h-11 rounded-xl flex-shrink-0
                        transition-all duration-300
                        ${
                          isActive
                            ? "bg-gradient-to-br from-[var(--color-primary)] to-[var(--color-primary-light)] shadow-xl shadow-[var(--color-primary)]/50 scale-110"
                            : "bg-white/10 group-hover:bg-white/15 group-hover:scale-110"
                        }
                      `}
                    >
                      <Icon
                        className={`w-5 h-5 transition-transform duration-300 ${
                          isActive ? "scale-110" : "group-hover:scale-110"
                        }`}
                      />
                    </div>

                    {/* Label */}
                    <span className="flex-1 text-left text-sm font-semibold">
                      {item.label}
                    </span>

                    {/* Badge */}
                    {item.badge !== null && (
                      <span
                        className={`
                          flex items-center justify-center min-w-[24px] h-6 px-2 rounded-lg text-xs font-bold
                          transition-all duration-300 shadow-md
                          ${
                            isActive
                              ? "bg-white text-[var(--color-primary)] scale-110"
                              : "bg-gradient-to-br from-[var(--color-primary)] to-[var(--color-primary-light)] text-white group-hover:scale-110"
                          }
                        `}
                      >
                        {item.badge}
                      </span>
                    )}

                    {/* Arrow indicator */}
                    {item.badge === null && (
                      <ChevronRight
                        className={`
                          w-5 h-5 transition-all duration-300
                          ${
                            isActive
                              ? "opacity-100 translate-x-0"
                              : "opacity-0 -translate-x-2 group-hover:opacity-70 group-hover:translate-x-0"
                          }
                        `}
                      />
                    )}
                  </div>
                </button>
              );
            })}
          </nav>

          {/* User Info Section */}
          <div className="px-4 py-6 border-t border-white/10 relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />

            <div className="relative z-10 flex items-center gap-4 px-4 py-4 rounded-2xl bg-white/10 hover:bg-white/15 transition-all duration-300 cursor-pointer group mx-2 backdrop-blur-sm">
              {/* Avatar with status indicator */}
              <div className="relative flex-shrink-0">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[var(--color-accent)] via-[var(--color-accent-pink)] to-[var(--color-primary)] flex items-center justify-center text-white font-bold text-base shadow-xl">
                  AD
                </div>
                <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-[var(--color-accent)] rounded-full border-3 border-[var(--color-bg-darker)] shadow-lg ring-2 ring-white/20" />
              </div>

              {/* User details */}
              <div className="flex-1 min-w-0">
                <p className="text-sm font-bold text-white truncate">
                  Admin User
                </p>
                <p className="text-xs text-white/60 truncate font-medium">
                  admin@example.com
                </p>
              </div>

              {/* Logout button */}
              <button
                className="w-9 h-9 rounded-xl bg-white/10 hover:bg-red-500/30 flex items-center justify-center transition-all duration-300 opacity-0 group-hover:opacity-100 flex-shrink-0 hover:scale-110"
                title="Logout"
              >
                <LogOut className="w-5 h-5 text-white/70 hover:text-red-400" />
              </button>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
}
