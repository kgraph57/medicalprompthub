ALTER TABLE `comments` ADD `parentId` int;--> statement-breakpoint
ALTER TABLE `comments` ADD `isQuestion` int DEFAULT 0 NOT NULL;--> statement-breakpoint
ALTER TABLE `comments` ADD `isAnswer` int DEFAULT 0 NOT NULL;--> statement-breakpoint
CREATE INDEX `parent_idx` ON `comments` (`parentId`);