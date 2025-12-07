import { useAuth } from "@/_core/hooks/useAuth";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { trpc } from "@/lib/trpc";
import { Bell, Check } from "lucide-react";
import { useEffect } from "react";
import { Link } from "wouter";
import { Badge } from "./ui/badge";
import { ScrollArea } from "./ui/scroll-area";
import { Separator } from "./ui/separator";

export function NotificationBell() {
  const { isAuthenticated } = useAuth();
  const { data: unreadCount } = trpc.notifications.unreadCount.useQuery(
    undefined,
    { enabled: isAuthenticated, refetchInterval: 30000 } // 30秒ごとに更新
  );

  const { data: notifications = [] } = trpc.notifications.list.useQuery(
    { limit: 20, offset: 0 },
    { enabled: isAuthenticated }
  );

  const markAllAsReadMutation = trpc.notifications.markAllAsRead.useMutation({
    onSuccess: () => {
      utils.notifications.unreadCount.invalidate();
      utils.notifications.list.invalidate();
    },
  });

  const utils = trpc.useUtils();

  const count = unreadCount || 0;
  const hasUnread = count > 0;

  const handleMarkAllAsRead = () => {
    markAllAsReadMutation.mutate();
  };

  if (!isAuthenticated) {
    return null;
  }

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="ghost" size="icon" className="relative">
          <Bell className="h-5 w-5" />
          {hasUnread && (
            <Badge
              variant="destructive"
              className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 text-xs"
            >
              {count > 9 ? "9+" : count}
            </Badge>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-80 p-0" align="end">
        <div className="flex items-center justify-between p-4 border-b">
          <h3 className="font-semibold">通知</h3>
          {hasUnread && (
            <Button
              variant="ghost"
              size="sm"
              onClick={handleMarkAllAsRead}
              className="h-8 text-xs"
            >
              <Check className="h-3 w-3 mr-1" />
              すべて既読にする
            </Button>
          )}
        </div>
        <ScrollArea className="h-[400px]">
          {notifications.length === 0 ? (
            <div className="p-8 text-center text-muted-foreground">
              <Bell className="h-12 w-12 mx-auto mb-4 opacity-50" />
              <p>通知はありません</p>
            </div>
          ) : (
            <div className="divide-y">
              {notifications.map((notification) => (
                <NotificationItem
                  key={notification.id}
                  notification={notification}
                />
              ))}
            </div>
          )}
        </ScrollArea>
        {notifications.length > 0 && (
          <div className="p-2 border-t">
            <Link href="/notifications">
              <Button variant="ghost" className="w-full text-sm">
                すべての通知を見る
              </Button>
            </Link>
          </div>
        )}
      </PopoverContent>
    </Popover>
  );
}

function NotificationItem({ notification }: { notification: any }) {
  const utils = trpc.useUtils();
  const markAsReadMutation = trpc.notifications.markAsRead.useMutation({
    onSuccess: () => {
      utils.notifications.unreadCount.invalidate();
      utils.notifications.list.invalidate();
    },
  });

  const handleClick = () => {
    if (!notification.read) {
      markAsReadMutation.mutate({ notificationId: notification.id });
    }
  };

  const getNotificationLink = () => {
    if (notification.promptId) {
      return `/prompts/${notification.promptId}`;
    }
    return "#";
  };

  return (
    <Link href={getNotificationLink()}>
      <div
        className={`p-4 hover:bg-muted/50 transition-colors cursor-pointer ${
          !notification.read ? "bg-muted/30" : ""
        }`}
        onClick={handleClick}
      >
        <div className="flex items-start gap-3">
          <div className="flex-1 min-w-0">
            <p className="font-medium text-sm">{notification.title}</p>
            <p className="text-sm text-muted-foreground mt-1 line-clamp-2">
              {notification.message}
            </p>
            <p className="text-xs text-muted-foreground mt-2">
              {new Date(notification.createdAt).toLocaleString("ja-JP")}
            </p>
          </div>
          {!notification.read && (
            <div className="h-2 w-2 rounded-full bg-primary mt-2 shrink-0" />
          )}
        </div>
      </div>
    </Link>
  );
}

