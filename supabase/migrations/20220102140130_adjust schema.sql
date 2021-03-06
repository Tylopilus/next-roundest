-- This script was generated by the Schema Diff utility in pgAdmin 4
-- For the circular dependencies, the order in which Schema Diff writes the objects is not very sophisticated
-- and may require manual changes to the script to ensure changes are applied in the correct order.
-- Please report an issue for any failure with the reproduction steps.

CREATE TABLE IF NOT EXISTS public._prisma_migrations
(
    id character varying(36) COLLATE pg_catalog."default" NOT NULL,
    checksum character varying(64) COLLATE pg_catalog."default" NOT NULL,
    finished_at timestamp with time zone,
    migration_name character varying(255) COLLATE pg_catalog."default" NOT NULL,
    logs text COLLATE pg_catalog."default",
    rolled_back_at timestamp with time zone,
    started_at timestamp with time zone NOT NULL DEFAULT now(),
    applied_steps_count integer NOT NULL DEFAULT 0,
    CONSTRAINT _prisma_migrations_pkey PRIMARY KEY (id)
)

TABLESPACE pg_default;

ALTER TABLE IF EXISTS public._prisma_migrations
    OWNER to postgres;

GRANT ALL ON TABLE public._prisma_migrations TO anon;

GRANT ALL ON TABLE public._prisma_migrations TO authenticated;

GRANT ALL ON TABLE public._prisma_migrations TO postgres;

GRANT ALL ON TABLE public._prisma_migrations TO service_role;

CREATE TABLE IF NOT EXISTS public."Pokemon"
(
    id integer NOT NULL,
    name text COLLATE pg_catalog."default" NOT NULL,
    "spriteUrl" text COLLATE pg_catalog."default" NOT NULL,
    "createdAt" timestamp(3) without time zone NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "Pokemon_pkey" PRIMARY KEY (id)
)

TABLESPACE pg_default;

ALTER TABLE IF EXISTS public."Pokemon"
    OWNER to postgres;

GRANT ALL ON TABLE public."Pokemon" TO anon;

GRANT ALL ON TABLE public."Pokemon" TO authenticated;

GRANT ALL ON TABLE public."Pokemon" TO postgres;

GRANT ALL ON TABLE public."Pokemon" TO service_role;

CREATE TABLE IF NOT EXISTS public."Vote"
(
    id text COLLATE pg_catalog."default" NOT NULL,
    "votedForId" integer NOT NULL,
    "votedAgainstId" integer NOT NULL,
    "createdAt" timestamp(3) without time zone NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "Vote_pkey" PRIMARY KEY (id),
    CONSTRAINT "Vote_votedAgainstId_fkey" FOREIGN KEY ("votedAgainstId")
        REFERENCES public."Pokemon" (id) MATCH SIMPLE
        ON UPDATE CASCADE
        ON DELETE RESTRICT,
    CONSTRAINT "Vote_votedForId_fkey" FOREIGN KEY ("votedForId")
        REFERENCES public."Pokemon" (id) MATCH SIMPLE
        ON UPDATE CASCADE
        ON DELETE RESTRICT
)

TABLESPACE pg_default;

ALTER TABLE IF EXISTS public."Vote"
    OWNER to postgres;

GRANT ALL ON TABLE public."Vote" TO anon;

GRANT ALL ON TABLE public."Vote" TO authenticated;

GRANT ALL ON TABLE public."Vote" TO postgres;

GRANT ALL ON TABLE public."Vote" TO service_role;
