CREATE TABLE "gmail_webhook_tenants" (
	"id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "gmail_webhook_tenants_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL,
	"tenant_id" text NOT NULL,
	"email_address" text NOT NULL,
	"history_id" text,
	"watch_expiration" timestamp with time zone
);
--> statement-breakpoint
CREATE UNIQUE INDEX "gmail_webhook_tenants_tenant_id_unique" ON "gmail_webhook_tenants" USING btree ("tenant_id");--> statement-breakpoint
CREATE UNIQUE INDEX "gmail_webhook_tenants_email_address_unique" ON "gmail_webhook_tenants" USING btree ("email_address");