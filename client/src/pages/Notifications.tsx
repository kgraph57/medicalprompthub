import { useAuth } from "@/_core/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { trpc } from "@/lib/trpc";
import { ArrowLeft, Bell, Check } from "lucide-react";
import { useLocation } from "wouter";
import { Link } from "wouter";
import { Badge } from "@/components/ui/badge";

export default function Notifications() {
  const { isAuthenticated } = useAuth();
  const [, navigate] = useLocation();

  const { data: notifications = [], isLoading } = trpc.notifications.list.useQuery(
    { limit: 100, offset: 0 },
    { enabled: isAuthenticated }
  );

  const markAllAsReadMutation = trpc.notifications.markAllAsRead.useMutation({
    onSuccess: () => {
      utils.notifications.unreadCount.invalidate();
      utils.notifications.list.invalidate();
    },
  });

  const utils = trpc.useUtils();

  const unreadCount = notifications.filter((n: any) => !n.read).length;

  const handleMarkAllAsRead = () => {
    markAllAsReadMutation.mutate();
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-xl text-muted-foreground">ログインが必要です</p>
          <Button onClick={() => navigate("/")} className="mt-4">
            ホームに戻る
          </Button>
        </div>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
          <p className="mt-4 text-muted-foreground">読み込み中...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted/20">
      <div className="container py-12 max-w-4xl">
        <div className="mb-8">
          <Button
            variant="ghost"
            className="mb-4 gap-2"
            onClick={() => navigate("/")}
          >
            <ArrowLeft className="h-4 w-4" />
            戻る
          </Button>
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <h1 className="text-2xl sm:text-4xl font-bold mb-2">通知</h1>
              <p className="text-sm sm:text-base text-muted-foreground">
                {unreadCount > 0 ? `${unreadCount}件の未読通知` : "すべての通知を読みました"}
              </p>
            </div>
            {unreadCount > 0 && (
              <Button
                variant="outline"
                onClick={handleMarkAllAsRead}
                className="gap-2 w-full sm:w-auto"
              >
                <Check className="h-4 w-4" />
                すべて既読にする
              </Button>
            )}
          </div>
        </div>

        {notifications.length === 0 ? (
          <Card className="p-12 text-center">
            <Bell className="h-16 w-16 mx-auto mb-4 text-muted-foreground opacity-50" />
            <p className="text-xl font-semibold mb-2">通知はありません</p>
            <p className="text-muted-foreground">
              新しい通知が届くと、ここに表示されます
            </p>
          </Card>
        ) : (
          <div className="space-y-4">
            {notifications.map((notification: any) => (
              <NotificationCard
                key={notification.id}
                notification={notification}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

function NotificationCard({ notification }: { notification: any }) {
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

  const getNotificationIcon = () => {
    switch (notification.type) {
      case "like":
        return "❤️";
      case "comment":
        return "💬";
      case "follow":
        return "👤";
      default:
        return "🔔";
    }
  };

  return (
    <Link href={getNotificationLink()}>
      <Card
        className={`p-4 hover:shadow-md transition-all cursor-pointer ${
          !notification.read ? "border-primary/50 bg-primary/5" : ""
        }`}
        onClick={handleClick}
      >
        <div className="flex items-start gap-4">
          <div className="text-2xl shrink-0">{getNotificationIcon()}</div>
          <div className="flex-1 min-w-0">
            <div className="flex items-start justify-between gap-2">
              <div className="flex-1">
                <p className="font-semibold text-base">{notification.title}</p>
                <p className="text-sm text-muted-foreground mt-1">
                  {notification.message}
                </p>
                <p className="text-xs text-muted-foreground mt-2">
                  {new Date(notification.createdAt).toLocaleString("ja-JP", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </p>
              </div>
              {!notification.read && (
                <Badge variant="default" className="shrink-0">
                  新着
                </Badge>
              )}
            </div>
          </div>
        </div>
      </Card>
    </Link>
  );
}


