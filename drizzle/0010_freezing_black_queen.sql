CREATE TABLE `reports` (
	`id` int AUTO_INCREMENT NOT NULL,
	`reporterId` int NOT NULL,
	`promptId` int,
	`commentId` int,
	`userId` int,
	`reason` enum('spam','inappropriate','harassment','copyright','misinformation','other') NOT NULL,
	`description` text,
	`status` enum('pending','reviewed','resolved','dismissed') NOT NULL DEFAULT 'pending',
	`reviewedBy` int,
	`reviewedAt` timestamp,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `reports_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE INDEX `reporter_idx` ON `reports` (`reporterId`);--> statement-breakpoint
CREATE INDEX `prompt_idx` ON `reports` (`promptId`);--> statement-breakpoint
CREATE INDEX `comment_idx` ON `reports` (`commentId`);--> statement-breakpoint
CREATE INDEX `status_idx` ON `reports` (`status`);--> statement-breakpoint
CREATE INDEX `created_idx` ON `reports` (`createdAt`);