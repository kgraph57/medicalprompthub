CREATE TABLE `follows` (
	`id` int AUTO_INCREMENT NOT NULL,
	`followerId` int NOT NULL,
	`followingId` int NOT NULL,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `follows_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE INDEX `follower_idx` ON `follows` (`followerId`);--> statement-breakpoint
CREATE INDEX `following_idx` ON `follows` (`followingId`);--> statement-breakpoint
CREATE INDEX `unique_follow_idx` ON `follows` (`followerId`,`followingId`);