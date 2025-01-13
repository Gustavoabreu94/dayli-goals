CREATE TABLE "users" (
	"id" text PRIMARY KEY NOT NULL,
	"name" text,
	"email" text,
	"avatar_url" text NOT NULL,
	"external_account_id" integer NOT NULL,
	CONSTRAINT "users_external_account_id_unique" UNIQUE("external_account_id")
);
--> statement-breakpoint
ALTER TABLE "goals" ADD COLUMN "user_id" text NOT NULL;--> statement-breakpoint
ALTER TABLE "goals" ADD CONSTRAINT "goals_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;