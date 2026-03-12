import { useEffect, useState, useCallback } from "react";
import {
  X,
  CheckCircle2,
  AlertCircle,
  AlertTriangle,
  Info,
} from "lucide-react";

export type NotificationType = "success" | "error" | "warning" | "info";

export interface NotificationData {
  id: string;
  type: NotificationType;
  title: string;
  message?: string;
  duration?: number;
}

interface NotificationItemProps {
  notification: NotificationData;
  onClose: (id: string) => void;
}

const notificationStyles: Record<
  NotificationType,
  { bg: string; border: string; icon: string; iconBg: string }
> = {
  success: {
    bg: "bg-gradient-to-r from-primary/5 to-primary/10",
    border: "border-primary/20",
    icon: "text-primary",
    iconBg: "bg-primary/15",
  },
  error: {
    bg: "bg-gradient-to-r from-coral/5 to-coral/10",
    border: "border-coral/20",
    icon: "text-coral",
    iconBg: "bg-coral/15",
  },
  warning: {
    bg: "bg-gradient-to-r from-amber-500/5 to-amber-500/10",
    border: "border-amber-500/20",
    icon: "text-amber-500",
    iconBg: "bg-amber-500/15",
  },
  info: {
    bg: "bg-gradient-to-r from-violet/5 to-violet/10",
    border: "border-violet/20",
    icon: "text-violet",
    iconBg: "bg-violet/15",
  },
};

const icons: Record<NotificationType, React.ReactNode> = {
  success: <CheckCircle2 className="w-5 h-5" />,
  error: <AlertCircle className="w-5 h-5" />,
  warning: <AlertTriangle className="w-5 h-5" />,
  info: <Info className="w-5 h-5" />,
};

function NotificationItem({ notification, onClose }: NotificationItemProps) {
  const [isVisible, setIsVisible] = useState(false);
  const [isLeaving, setIsLeaving] = useState(false);
  const styles = notificationStyles[notification.type];
  const icon = icons[notification.type];
  const duration = notification.duration ?? 5000;

  const handleClose = useCallback(() => {
    setIsLeaving(true);
    setTimeout(() => {
      onClose(notification.id);
    }, 300);
  }, [notification.id, onClose]);

  useEffect(() => {
    // Trigger enter animation
    requestAnimationFrame(() => {
      setIsVisible(true);
    });

    // Auto dismiss
    if (duration > 0) {
      const timer = setTimeout(() => {
        handleClose();
      }, duration);

      return () => clearTimeout(timer);
    }
  }, [duration, handleClose]);

  return (
    <div
      className={`
        relative w-80 max-w-[calc(100vw-2rem)] overflow-hidden
        rounded-xl border backdrop-blur-lg
        shadow-lg shadow-black/5
        transition-all duration-300 ease-out
        ${styles.bg} ${styles.border}
        ${
          isVisible && !isLeaving
            ? "translate-x-0 opacity-100"
            : "translate-x-full opacity-0"
        }
      `}
    >
      {/* Progress bar */}
      {duration > 0 && (
        <div
          className={`absolute bottom-0 left-0 h-0.5 ${styles.icon.replace(
            "text-",
            "bg-"
          )}`}
          style={{
            animation: `notification-progress ${duration}ms linear forwards`,
          }}
        />
      )}

      <div className="flex items-start gap-3 p-4">
        {/* Icon */}
        <div
          className={`flex-shrink-0 w-9 h-9 rounded-lg flex items-center justify-center ${styles.iconBg}`}
        >
          <span className={styles.icon}>{icon}</span>
        </div>

        {/* Content */}
        <div className="flex-1 min-w-0 pt-0.5">
          <h4 className="text-sm font-semibold text-text-primary truncate">
            {notification.title}
          </h4>
          {notification.message && (
            <p className="mt-1 text-sm text-text-secondary leading-relaxed">
              {notification.message}
            </p>
          )}
        </div>

        {/* Close button */}
        <button
          onClick={handleClose}
          className="flex-shrink-0 p-1.5 -mt-0.5 -mr-1.5 rounded-lg text-text-muted hover:text-text-primary hover:bg-[var(--color-secondary-light)] transition-colors"
        >
          <X className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}

interface NotificationContainerProps {
  notifications: NotificationData[];
  onClose: (id: string) => void;
}

export function NotificationContainer({
  notifications,
  onClose,
}: NotificationContainerProps) {
  return (
    <div className="fixed top-4 right-4 z-[9999] flex flex-col gap-3 pointer-events-none">
      {notifications.map((notification) => (
        <div key={notification.id} className="pointer-events-auto">
          <NotificationItem notification={notification} onClose={onClose} />
        </div>
      ))}
    </div>
  );
}

export default NotificationItem;
