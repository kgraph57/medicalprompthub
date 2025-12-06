CREATE TABLE `analytics_events` (
	`id` int AUTO_INCREMENT NOT NULL,
	`userId` int,
	`eventType` varchar(100) NOT NULL,
	`eventData` text,
	`promptId` int,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `analytics_events_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `notifications` (
	`id` int AUTO_INCREMENT NOT NULL,
	`userId` int NOT NULL,
	`type` enum('like','comment','follow','prompt_mention','comment_reply') NOT NULL,
	`title` varchar(200) NOT NULL,
	`message` text NOT NULL,
	`relatedUserId` int,
	`promptId` int,
	`commentId` int,
	`read` int NOT NULL DEFAULT 0,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `notifications_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `page_views` (
	`id` int AUTO_INCREMENT NOT NULL,
	`userId` int,
	`path` varchar(500) NOT NULL,
	`referrer` varchar(500),
	`userAgent` text,
	`ipAddress` varchar(45),
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `page_views_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE INDEX `event_type_idx` ON `analytics_events` (`eventType`);--> statement-breakpoint
CREATE INDEX `user_idx` ON `analytics_events` (`userId`);--> statement-breakpoint
CREATE INDEX `prompt_idx` ON `analytics_events` (`promptId`);--> statement-breakpoint
CREATE INDEX `created_idx` ON `analytics_events` (`createdAt`);--> statement-breakpoint
CREATE INDEX `user_idx` ON `notifications` (`userId`);--> statement-breakpoint
CREATE INDEX `read_idx` ON `notifications` (`read`);--> statement-breakpoint
CREATE INDEX `created_idx` ON `notifications` (`createdAt`);--> statement-breakpoint
CREATE INDEX `type_idx` ON `notifications` (`type`);--> statement-breakpoint
CREATE INDEX `path_idx` ON `page_views` (`path`);--> statement-breakpoint
CREATE INDEX `user_idx` ON `page_views` (`userId`);--> statement-breakpoint
CREATE INDEX `created_idx` ON `page_views` (`createdAt`);