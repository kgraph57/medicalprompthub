CREATE TABLE `collection_prompts` (
	`id` int AUTO_INCREMENT NOT NULL,
	`collectionId` int NOT NULL,
	`promptId` int NOT NULL,
	`addedAt` timestamp NOT NULL DEFAULT (now()),
	`addedBy` int NOT NULL,
	`note` text,
	CONSTRAINT `collection_prompts_id` PRIMARY KEY(`id`),
	CONSTRAINT `unique_collection_prompt` UNIQUE(`collectionId`,`promptId`)
);
--> statement-breakpoint
CREATE TABLE `collections` (
	`id` int AUTO_INCREMENT NOT NULL,
	`name` varchar(200) NOT NULL,
	`description` text,
	`userId` int NOT NULL,
	`isPublic` int NOT NULL DEFAULT 0,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `collections_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE INDEX `collection_idx` ON `collection_prompts` (`collectionId`);--> statement-breakpoint
CREATE INDEX `prompt_idx` ON `collection_prompts` (`promptId`);--> statement-breakpoint
CREATE INDEX `user_idx` ON `collections` (`userId`);--> statement-breakpoint
CREATE INDEX `public_idx` ON `collections` (`isPublic`);--> statement-breakpoint
CREATE INDEX `created_idx` ON `collections` (`createdAt`);