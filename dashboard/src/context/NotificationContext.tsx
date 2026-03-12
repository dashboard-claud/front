import { createContext, useContext, useState, useCallback } from "react";
import type { ReactNode } from "react";
import { NotificationContainer } from "../components/Notification";
import type { NotificationData, NotificationType } from "../components/Notification";

interface NotificationContextType {
  notifications: NotificationData[];
  showNotification: (notification: Omit<NotificationData, "id">) => void;
  success: (title: string, message?: string) => void;
  error: (title: string, message?: string) => void;
  warning: (title: string, message?: string) => void;
  info: (title: string, message?: string) => void;
  removeNotification: (id: string) => void;
  clearAll: () => void;
}

const NotificationContext = createContext<NotificationContextType | undefined>(undefined);

let notificationId = 0;

export function NotificationProvider({ children }: { children: ReactNode }) {
  const [notifications, setNotifications] = useState<NotificationData[]>([]);

  const removeNotification = useCallback((id: string) => {
    setNotifications((prev) => prev.filter((n) => n.id !== id));
  }, []);

  const showNotification = useCallback((notification: Omit<NotificationData, "id">) => {
    const id = `notification-${++notificationId}-${Date.now()}`;
    const newNotification: NotificationData = {
      ...notification,
      id,
    };
    
    setNotifications((prev) => [...prev, newNotification]);
    return id;
  }, []);

  const createNotificationHelper = useCallback(
    (type: NotificationType) => (title: string, message?: string) => {
      showNotification({ type, title, message });
    },
    [showNotification]
  );

  const success = useCallback(
    (title: string, message?: string) => createNotificationHelper("success")(title, message),
    [createNotificationHelper]
  );

  const error = useCallback(
    (title: string, message?: string) => createNotificationHelper("error")(title, message),
    [createNotificationHelper]
  );

  const warning = useCallback(
    (title: string, message?: string) => createNotificationHelper("warning")(title, message),
    [createNotificationHelper]
  );

  const info = useCallback(
    (title: string, message?: string) => createNotificationHelper("info")(title, message),
    [createNotificationHelper]
  );

  const clearAll = useCallback(() => {
    setNotifications([]);
  }, []);

  return (
    <NotificationContext.Provider
      value={{
        notifications,
        showNotification,
        success,
        error,
        warning,
        info,
        removeNotification,
        clearAll,
      }}
    >
      {children}
      <NotificationContainer notifications={notifications} onClose={removeNotification} />
    </NotificationContext.Provider>
  );
}

export function useNotification() {
  const context = useContext(NotificationContext);
  if (context === undefined) {
    throw new Error("useNotification must be used within a NotificationProvider");
  }
  return context;
}

