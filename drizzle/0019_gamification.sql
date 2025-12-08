-- ゲーミフィケーション機能用のテーブル作成
-- このマイグレーションは feature/gamification-setup ブランチでのみ使用

CREATE TABLE IF NOT EXISTS `user_stats` (
	`id` int AUTO_INCREMENT NOT NULL,
	`userId` int NOT NULL,
	`totalXP` int NOT NULL DEFAULT 0,
	`currentLevel` int NOT NULL DEFAULT 1,
	`currentStreak` int NOT NULL DEFAULT 0,
	`longestStreak` int NOT NULL DEFAULT 0,
	`lastStudyDate` date,
	`totalLessonsCompleted` int NOT NULL DEFAULT 0,
	`totalQuizzesPassed` int NOT NULL DEFAULT 0,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `user_stats_id` PRIMARY KEY(`id`),
	CONSTRAINT `user_stats_userId_unique` UNIQUE(`userId`)
);
--> statement-breakpoint
CREATE INDEX `user_idx` ON `user_stats` (`userId`);--> statement-breakpoint

CREATE TABLE IF NOT EXISTS `badges` (
	`id` varchar(50) NOT NULL,
	`name` varchar(100) NOT NULL,
	`description` text,
	`icon` varchar(50),
	`category` varchar(50),
	`requirement` text,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `badges_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint

CREATE TABLE IF NOT EXISTS `user_badges` (
	`id` int AUTO_INCREMENT NOT NULL,
	`userId` int NOT NULL,
	`badgeId` varchar(50) NOT NULL,
	`badgeName` varchar(100) NOT NULL,
	`badgeDescription` text,
	`earnedAt` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `user_badges_id` PRIMARY KEY(`id`),
	CONSTRAINT `user_badges_userId_badgeId_unique` UNIQUE(`userId`, `badgeId`)
);
--> statement-breakpoint
CREATE INDEX `user_idx` ON `user_badges` (`userId`);--> statement-breakpoint
CREATE INDEX `badge_idx` ON `user_badges` (`badgeId`);--> statement-breakpoint

CREATE TABLE IF NOT EXISTS `quizzes` (
	`id` int AUTO_INCREMENT NOT NULL,
	`lessonId` int NOT NULL,
	`question` text NOT NULL,
	`questionType` enum('multiple_choice', 'true_false', 'fill_blank') NOT NULL,
	`options` json,
	`correctAnswer` text NOT NULL,
	`explanation` text,
	`order` int NOT NULL,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `quizzes_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE INDEX `lesson_idx` ON `quizzes` (`lessonId`);--> statement-breakpoint
CREATE INDEX `order_idx` ON `quizzes` (`order`);--> statement-breakpoint

CREATE TABLE IF NOT EXISTS `user_quiz_attempts` (
	`id` int AUTO_INCREMENT NOT NULL,
	`userId` int NOT NULL,
	`quizId` int NOT NULL,
	`userAnswer` text,
	`isCorrect` boolean,
	`completedAt` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `user_quiz_attempts_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE INDEX `user_idx` ON `user_quiz_attempts` (`userId`);--> statement-breakpoint
CREATE INDEX `quiz_idx` ON `user_quiz_attempts` (`quizId`);--> statement-breakpoint

CREATE TABLE IF NOT EXISTS `daily_goals` (
	`id` int AUTO_INCREMENT NOT NULL,
	`userId` int NOT NULL,
	`date` date NOT NULL,
	`targetXP` int NOT NULL DEFAULT 20,
	`achievedXP` int NOT NULL DEFAULT 0,
	`completed` boolean NOT NULL DEFAULT FALSE,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `daily_goals_id` PRIMARY KEY(`id`),
	CONSTRAINT `daily_goals_userId_date_unique` UNIQUE(`userId`, `date`)
);
--> statement-breakpoint
CREATE INDEX `user_idx` ON `daily_goals` (`userId`);--> statement-breakpoint
CREATE INDEX `date_idx` ON `daily_goals` (`date`);--> statement-breakpoint
