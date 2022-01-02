-- CreateTable
CREATE TABLE "Vote" (
    "id" TEXT NOT NULL,
    "votedFor" INTEGER NOT NULL,
    "votedAgainst" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Vote_pkey" PRIMARY KEY ("id")
);
