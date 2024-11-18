DROP INDEX IF EXISTS "users_external_id_unique";--> statement-breakpoint
DROP INDEX IF EXISTS "users_email_unique";--> statement-breakpoint
ALTER TABLE `users` ALTER COLUMN "created_at" TO "created_at" text;--> statement-breakpoint
CREATE UNIQUE INDEX `users_external_id_unique` ON `users` (`external_id`);--> statement-breakpoint
CREATE UNIQUE INDEX `users_email_unique` ON `users` (`email`);--> statement-breakpoint
ALTER TABLE `users` DROP COLUMN `updated_at`;