import { NavLink } from "react-router-dom";
import {
  LayoutDashboard,
  TrendingUp,
  Users,
  Package,
  ShoppingCart,
} from "lucide-react";

const menuItems = [
  {
    id: "dashboard",
    label: "Home",
    Icon: LayoutDashboard,
    path: "/",
  },
  {
    id: "analytics",
    label: "Analytics",
    Icon: TrendingUp,
    path: "/analytics",
  },
  {
    id: "users",
    label: "Users",
    Icon: Users,
    path: "/users",
    isMain: true, // Mark as the main/featured item
  },
  {
    id: "products",
    label: "Products",
    Icon: Package,
    path: "/products",
  },
  {
    id: "orders",
    label: "Orders",
    Icon: ShoppingCart,
    badge: 5,
    path: "/orders",
  },
];

export default function BottomNav() {
  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 lg:hidden">
      {/* Glass background with blur */}
      <div className="absolute inset-0 bg-[var(--color-bg-card)]/90 backdrop-blur-xl border-t border-[var(--color-border)]" />

      {/* Safe area padding for iOS */}
      <div className="relative px-2 pb-[env(safe-area-inset-bottom)]">
        <div className="flex items-center justify-around py-2">
          {menuItems.map((item) => {
            const Icon = item.Icon;
            const isMainItem = item.isMain;

            return (
              <NavLink
                key={item.id}
                to={item.path}
                className={`relative flex flex-col items-center justify-center py-1 group ${
                  isMainItem ? "min-w-[70px] -mt-5" : "min-w-[60px]"
                }`}
              >
                {({ isActive }) => (
                  <>
                    {/* Active indicator pill - only for non-main items */}
                    {!isMainItem && (
                      <div
                        className={`
                          absolute -top-1 w-12 h-1 rounded-full
                          transition-all duration-300 ease-out
                          ${
                            isActive
                              ? "bg-[var(--color-primary)] opacity-100 scale-100"
                              : "opacity-0 scale-0"
                          }
                        `}
                      />
                    )}

                    {/* Icon container - special styling for main item */}
                    {isMainItem ? (
                      <div
                        className={`
                          relative flex items-center justify-center w-14 h-14 rounded-full
                          transition-all duration-300 ease-out
                          border-4 shadow-lg
                          bg-gradient-to-br from-[var(--color-primary)] to-[var(--color-primary-dark)] 
                          border-[var(--color-bg-card)] 
                          ${
                            isActive
                              ? "shadow-[var(--color-primary)]/30"
                              : "shadow-[var(--color-primary)]/20 group-active:scale-95"
                          }
                        `}
                      >
                        <Icon className="w-6 h-6 text-white transition-all duration-300" />
                      </div>
                    ) : (
                      <div
                        className={`
                          relative flex items-center justify-center w-10 h-10 rounded-xl
                          transition-all duration-300 ease-out
                          ${
                            isActive
                              ? "bg-[var(--color-accent-muted)]"
                              : "group-active:bg-[var(--color-secondary-light)] group-active:scale-95"
                          }
                        `}
                      >
                        <Icon
                          className={`
                            w-5 h-5 transition-all duration-300
                            ${
                              isActive
                                ? "text-[var(--color-primary)]"
                                : "text-[var(--color-text-muted)] group-hover:text-[var(--color-text-secondary)]"
                            }
                          `}
                        />

                        {/* Badge */}
                        {item.badge && (
                          <span
                            className={`
                              absolute -top-0.5 -right-0.5 
                              flex items-center justify-center 
                              min-w-[16px] h-4 px-1 
                              rounded-full text-[10px] font-bold
                              transition-all duration-300
                              ${
                                isActive
                                  ? "bg-[var(--color-primary)] text-white"
                                  : "bg-[var(--color-coral)] text-white"
                              }
                            `}
                          >
                            {item.badge}
                          </span>
                        )}
                      </div>
                    )}

                    {/* Label */}
                    <span
                      className={`
                        text-[10px] font-medium mt-0.5
                        transition-all duration-300
                        ${
                          isMainItem
                            ? "text-[var(--color-primary)] font-semibold"
                            : isActive
                            ? "text-[var(--color-primary)]"
                            : "text-[var(--color-text-muted)]"
                        }
                      `}
                    >
                      {item.label}
                    </span>
                  </>
                )}
              </NavLink>
            );
          })}
        </div>
      </div>
    </nav>
  );
}
