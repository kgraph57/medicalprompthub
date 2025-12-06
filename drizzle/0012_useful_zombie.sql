CREATE TABLE `prompt_versions` (
	`id` int AUTO_INCREMENT NOT NULL,
	`promptId` int NOT NULL,
	`version` int NOT NULL,
	`title` varchar(200) NOT NULL,
	`promptText` text NOT NULL,
	`responseText` text NOT NULL,
	`examplePromptText` text,
	`exampleResponseText` text,
	`usageDescription` text,
	`useScene` text,
	`changedBy` int NOT NULL,
	`changeReason` text,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `prompt_versions_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE INDEX `prompt_idx` ON `prompt_versions` (`promptId`);--> statement-breakpoint
CREATE INDEX `version_idx` ON `prompt_versions` (`promptId`,`version`);--> statement-breakpoint
CREATE INDEX `created_idx` ON `prompt_versions` (`createdAt`);