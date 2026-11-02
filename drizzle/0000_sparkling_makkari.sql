CREATE TABLE `experiences` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`title` text NOT NULL,
	`company` text NOT NULL,
	`employment_type` text DEFAULT 'Full-time' NOT NULL,
	`start_date` text NOT NULL,
	`end_date` text DEFAULT 'Present' NOT NULL,
	`duration` text NOT NULL,
	`location` text NOT NULL,
	`location_type` text DEFAULT 'On-site' NOT NULL,
	`description` text NOT NULL,
	`skills` text NOT NULL,
	`order_index` integer DEFAULT 0 NOT NULL,
	`created_at` text DEFAULT (CURRENT_TIMESTAMP),
	`updated_at` text DEFAULT (CURRENT_TIMESTAMP)
);
--> statement-breakpoint
CREATE TABLE `projects` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`title` text NOT NULL,
	`slug` text NOT NULL,
	`description` text NOT NULL,
	`content` text,
	`image` text NOT NULL,
	`tags` text NOT NULL,
	`demo_url` text,
	`repo_url` text,
	`featured` integer DEFAULT true NOT NULL,
	`order_index` integer DEFAULT 0 NOT NULL,
	`created_at` text DEFAULT (CURRENT_TIMESTAMP),
	`updated_at` text DEFAULT (CURRENT_TIMESTAMP)
);
--> statement-breakpoint
CREATE UNIQUE INDEX `projects_slug_unique` ON `projects` (`slug`);