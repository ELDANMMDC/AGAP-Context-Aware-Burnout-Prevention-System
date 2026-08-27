import { useEffect, useRef, useState } from 'react';

export type Notification = {
  id: number;
  title: string;
  message: string;
  timestamp: string;
  read: boolean;
};

const INITIAL_NOTIFICATIONS: Notification[] = [
  {
    id: 1,
    title: 'Risk level increased',
    message: 'Your recent work patterns have changed from your usual baseline.',
    timestamp: 'Today, 10:42 AM',
    read: false,
  },
  {
    id: 2,
    title: 'Weekly check-in reminder',
    message: 'Your weekly check-in is ready. It takes about 2–3 minutes.',
    timestamp: 'Yesterday',
    read: false,
  },
  {
    id: 3,
    title: 'Break reminder',
    message: 'You have had an extended period of active work.',
    timestamp: 'Monday, 3:18 PM',
    read: true,
  },
];

export function NotificationPopover() {
  const [open, setOpen] = useState(false);
  const [notifications, setNotifications] = useState<Notification[]>(
    INITIAL_NOTIFICATIONS,
  );

  const containerRef = useRef<HTMLDivElement>(null);

  const unreadCount = notifications.filter(
    notification => !notification.read,
  ).length;

  useEffect(() => {
    if (!open) return;

    const handleOutsideClick = (event: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setOpen(false);
      }
    };

    document.addEventListener('mousedown', handleOutsideClick);

    return () => {
      document.removeEventListener('mousedown', handleOutsideClick);
    };
  }, [open]);

  const markAsRead = (id: number) => {
    setNotifications(prev =>
      prev.map(notification =>
        notification.id === id
          ? { ...notification, read: true }
          : notification,
      ),
    );
  };

  const markAllAsRead = () => {
    setNotifications(prev =>
      prev.map(notification => ({
        ...notification,
        read: true,
      })),
    );
  };

  return (
    <div ref={containerRef} className="relative">
      <button
        type="button"
        onClick={() => setOpen(prev => !prev)}
        aria-label="Notifications"
        aria-expanded={open}
        className="relative w-8 h-8 flex items-center justify-center rounded-lg text-[#6B7280] hover:bg-[#F9FAFB] hover:text-[#1F2937] transition-colors"
      >
        <BellIcon />

        {unreadCount > 0 && (
          <span
            className="absolute top-1 right-1 w-1.5 h-1.5 rounded-full bg-[#185FA5]"
            aria-label={`${unreadCount} unread notifications`}
          />
        )}
      </button>

      {open && (
        <div className="absolute right-0 top-full mt-2 w-[360px] max-w-[calc(100vw-2rem)] bg-white border border-[#E5E7EB] rounded-xl shadow-[0_4px_12px_rgba(0,0,0,0.45)] z-50 overflow-hidden">
          <div className="px-4 py-3 border-b border-[#E5E7EB] flex items-center justify-between">
            <div>
              <div className="text-xs font-semibold text-[#1F2937]">
                Notifications
              </div>

              <div className="text-[10px] text-[#9CA3AF] mt-0.5">
                {unreadCount > 0
                  ? `${unreadCount} unread`
                  : 'All caught up'}
              </div>
            </div>

            {unreadCount > 0 && (
              <button
                type="button"
                onClick={markAllAsRead}
                className="text-[10px] text-[#185FA5] hover:text-[#124A80] transition-colors"
              >
                Mark all as read
              </button>
            )}
          </div>

          {notifications.length === 0 ? (
            <div className="px-5 py-8 text-center">
              <div className="text-xs text-[#6B7280] mb-1">
                No notifications
              </div>

              <div className="text-[10px] text-[#9CA3AF]">
                You’re all caught up.
              </div>
            </div>
          ) : (
            <div className="max-h-[360px] overflow-y-auto">
              {notifications.map(notification => (
                <button
                  key={notification.id}
                  type="button"
                  onClick={() => markAsRead(notification.id)}
                  className={`w-full text-left px-4 py-3 border-b border-[#F3F4F6] last:border-b-0 transition-colors ${
                    notification.read
                      ? 'bg-white hover:bg-[#F9FAFB]'
                      : 'bg-[#F9FAFB] hover:bg-[#F3F4F6]'
                  }`}
                >
                  <div className="flex items-start gap-2.5">
                    <span
                      className={`mt-1.5 w-1.5 h-1.5 rounded-full flex-shrink-0 ${
                        notification.read
                          ? 'bg-[#D1D5DB]'
                          : 'bg-[#185FA5]'
                      }`}
                    />

                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-3">
                        <div
                          className={`text-xs ${
                            notification.read
                              ? 'font-medium text-[#4B5563]'
                              : 'font-semibold text-[#1F2937]'
                          }`}
                        >
                          {notification.title}
                        </div>

                        <span className="text-[9px] text-[#B0B7C3] whitespace-nowrap">
                          {notification.timestamp}
                        </span>
                      </div>

                      <div className="text-[10px] text-[#6B7280] leading-relaxed mt-1">
                        {notification.message}
                      </div>
                    </div>
                  </div>
                </button>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}

function BellIcon() {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M18 8a6 6 0 0 0-12 0c0 7-3 7-3 9h18c0-2-3-2-3-9" />
      <path d="M13.73 21a2 2 0 0 1-3.46 0" />
    </svg>
  );
}