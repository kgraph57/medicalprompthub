CREATE TABLE `prompt_templates` (
	`id` int AUTO_INCREMENT NOT NULL,
	`name` varchar(200) NOT NULL,
	`description` text,
	`templateText` text NOT NULL,
	`categoryId` int NOT NULL,
	`createdBy` int NOT NULL,
	`isPublic` int NOT NULL DEFAULT 0,
	`usageCount` int NOT NULL DEFAULT 0,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `prompt_templates_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE INDEX `category_idx` ON `prompt_templates` (`categoryId`);--> statement-breakpoint
CREATE INDEX `public_idx` ON `prompt_templates` (`isPublic`);--> statement-breakpoint
CREATE INDEX `created_idx` ON `prompt_templates` (`createdAt`);