import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import {
  LayoutDashboard,
  TrendingUp,
  Users,
  Package,
  ShoppingCart,
  Settings,
  LogOut,
  Pin,
  PinOff,
} from "lucide-react";
import { useAuth } from "../context/useAuth";

const menuItems = [
  {
    id: "dashboard",
    label: "Dashboard",
    Icon: LayoutDashboard,
    badge: null,
    badgeColor: null,
    path: "/",
  },
  {
    id: "analytics",
    label: "Analytics",
    Icon: TrendingUp,
    badge: null,
    badgeColor: null,
    path: "/analytics",
  },
  {
    id: "users",
    label: "Users",
    Icon: Users,
    badge: 12,
    badgeColor: "violet",
    path: "/users",
  },
  {
    id: "products",
    label: "Products",
    Icon: Package,
    badge: null,
    badgeColor: null,
    path: "/products",
  },
  {
    id: "orders",
    label: "Orders",
    Icon: ShoppingCart,
    badge: 5,
    badgeColor: "coral",
    path: "/orders",
  },
  {
    id: "settings",
    label: "Settings",
    Icon: Settings,
    badge: null,
    badgeColor: null,
    path: "/settings",
  },
];

export default function Sidebar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [isHovered, setIsHovered] = useState(false);
  const [isPinned, setIsPinned] = useState(false);

  // Sidebar is expanded when pinned OR hovered
  const isExpanded = isPinned || isHovered;

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  // Get user initials
  const getUserInitials = () => {
    if (!user?.name) return "U";
    const names = user.name.split(" ");
    if (names.length >= 2) {
      return `${names[0][0]}${names[1][0]}`.toUpperCase();
    }
    return user.name.slice(0, 2).toUpperCase();
  };

  return (
    <aside
      className={`h-screen gradient-sidebar shadow-sm border-r border-[var(--color-border)] transition-all duration-300 ease-in-out ${
        isExpanded ? "w-64" : "w-[72px]"
      }`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="flex flex-col h-full relative">
        {/* Logo Section */}
        <div className="h-16 flex items-center px-4 border-b border-[var(--color-border)] bg-gradient-to-r from-[rgba(4,232,199,0.03)] via-[rgba(4,232,199,0.08)] to-[rgba(4,232,199,0.03)]">
          <div className="flex items-center gap-3 w-full">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[var(--color-primary)] to-[var(--color-primary-dark)] flex items-center justify-center shadow-sm flex-shrink-0">
              <LayoutDashboard className="w-4 h-4 text-white" />
            </div>
            <div
              className={`overflow-hidden transition-all duration-300 ${
                isExpanded ? "opacity-100 w-auto" : "opacity-0 w-0"
              }`}
            >
              <h1 className="text-sm font-bold text-[var(--color-text-primary)] whitespace-nowrap">
                Admin Panel
              </h1>
            </div>
          </div>

          {/* Pin Button - only show when expanded */}
          <button
            onClick={() => setIsPinned(!isPinned)}
            className={`flex-shrink-0 w-7 h-7 rounded-md flex items-center justify-center transition-all duration-300 ${
              isExpanded ? "opacity-100" : "opacity-0 pointer-events-none"
            } ${
              isPinned
                ? "bg-[var(--color-accent-muted)] text-[var(--color-primary)]"
                : "hover:bg-[var(--color-secondary-light)] text-[var(--color-text-muted)]"
            }`}
            title={isPinned ? "Unpin sidebar" : "Pin sidebar"}
          >
            {isPinned ? (
              <Pin className="w-3.5 h-3.5" />
            ) : (
              <PinOff className="w-3.5 h-3.5" />
            )}
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 overflow-y-auto px-3 py-6 space-y-1">
          {menuItems.map((item) => {
            const Icon = item.Icon;

            return (
              <NavLink
                key={item.id}
                to={item.path}
                className="w-full block group relative"
                title={!isExpanded ? item.label : undefined}
              >
                {({ isActive }) => (
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
                    <Icon className="w-4 h-4 flex-shrink-0" />

                    {/* Label */}
                    <span
                      className={`flex-1 text-left text-sm font-medium whitespace-nowrap overflow-hidden transition-all duration-300 ${
                        isExpanded ? "opacity-100 w-auto" : "opacity-0 w-0"
                      }`}
                    >
                      {item.label}
                    </span>

                    {/* Badge */}
                    {item.badge !== null && (
                      <span
                        className={`
                            flex items-center justify-center min-w-[18px] h-5 px-1.5 rounded-full text-xs font-semibold
                            transition-all duration-200 flex-shrink-0
                            ${
                              isExpanded ? "relative" : "absolute top-0 right-0"
                            }
                            ${
                              item.badgeColor === "coral"
                                ? "bg-[var(--color-coral)] text-white"
                                : item.badgeColor === "violet"
                                ? "bg-[var(--color-violet)] text-white"
                                : isActive
                                ? "bg-[var(--color-primary)] text-white"
                                : "bg-[var(--color-secondary-light)] text-[var(--color-text-secondary)]"
                            }
                          `}
                      >
                        {item.badge}
                      </span>
                    )}
                  </div>
                )}
              </NavLink>
            );
          })}
        </nav>

        {/* User Info Section */}
        <div className="px-3 py-4 border-t border-[var(--color-border)]">
          <div
            className={`flex items-center gap-3 px-3 py-2.5 rounded-lg hover:bg-[var(--color-secondary-light)] transition-all duration-200 cursor-pointer group ${
              !isExpanded ? "justify-center" : ""
            }`}
          >
            {/* Avatar with status indicator */}
            <div
              className={`relative flex-shrink-0 ${
                !isExpanded ? "mx-auto" : ""
              }`}
            >
              {user?.avatar ? (
                <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[var(--color-primary)] to-[var(--color-primary-dark)] flex items-center justify-center shadow-sm">
                  <img
                    src={user.avatar}
                    alt={user.name}
                    className="w-full h-full rounded-lg object-cover"
                  />
                </div>
              ) : (
                <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[var(--color-primary)] to-[var(--color-primary-dark)] flex items-center justify-center text-white font-semibold text-xs shadow-sm">
                  {getUserInitials()}
                </div>
              )}
              <div className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 bg-[var(--color-primary)] rounded-full border-2 border-[var(--color-bg-card)]" />
            </div>

            {/* User details - only show when expanded */}
            <div
              className={`flex-1 min-w-0 overflow-hidden transition-all duration-300 ${
                isExpanded ? "opacity-100 w-auto" : "opacity-0 w-0"
              }`}
            >
              <p className="text-xs font-semibold text-[var(--color-text-primary)] truncate">
                {user?.name || "User"}
              </p>
              <p className="text-[10px] text-[var(--color-text-muted)] truncate">
                {user?.email || "user@example.com"}
              </p>
            </div>

            {/* Logout button - only show when expanded */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                handleLogout();
              }}
              className={`w-6 h-6 rounded-md hover:bg-[var(--color-bg-card)] flex items-center justify-center transition-all duration-200 flex-shrink-0 ${
                isExpanded
                  ? "opacity-0 group-hover:opacity-100"
                  : "opacity-0 pointer-events-none w-0"
              }`}
              title="Logout"
            >
              <LogOut className="w-3.5 h-3.5 text-[var(--color-text-muted)]" />
            </button>
          </div>
        </div>
      </div>
    </aside>
  );
}
