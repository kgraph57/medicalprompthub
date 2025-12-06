CREATE TABLE `prompt_helpfulness` (
	`id` int AUTO_INCREMENT NOT NULL,
	`userId` int NOT NULL,
	`promptId` int NOT NULL,
	`helpful` int NOT NULL,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `prompt_helpfulness_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `prompt_ratings` (
	`id` int AUTO_INCREMENT NOT NULL,
	`userId` int NOT NULL,
	`promptId` int NOT NULL,
	`rating` int NOT NULL,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `prompt_ratings_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
ALTER TABLE `prompts` ADD `averageRating` decimal(3,2) DEFAULT '0.00' NOT NULL;--> statement-breakpoint
ALTER TABLE `prompts` ADD `ratingCount` int DEFAULT 0 NOT NULL;--> statement-breakpoint
ALTER TABLE `prompts` ADD `helpfulCount` int DEFAULT 0 NOT NULL;--> statement-breakpoint
ALTER TABLE `prompts` ADD `notHelpfulCount` int DEFAULT 0 NOT NULL;--> statement-breakpoint
CREATE INDEX `user_prompt_idx` ON `prompt_helpfulness` (`userId`,`promptId`);--> statement-breakpoint
CREATE INDEX `prompt_idx` ON `prompt_helpfulness` (`promptId`);--> statement-breakpoint
CREATE INDEX `user_prompt_idx` ON `prompt_ratings` (`userId`,`promptId`);--> statement-breakpoint
CREATE INDEX `prompt_idx` ON `prompt_ratings` (`promptId`);