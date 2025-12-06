CREATE TABLE `user_badges` (
	`id` int AUTO_INCREMENT NOT NULL,
	`userId` int NOT NULL,
	`badgeType` enum('first_prompt','popular_prompt','helpful_contributor','active_user','expert','community_favorite') NOT NULL,
	`earnedAt` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `user_badges_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE INDEX `user_idx` ON `user_badges` (`userId`);--> statement-breakpoint
CREATE INDEX `badge_type_idx` ON `user_badges` (`badgeType`);