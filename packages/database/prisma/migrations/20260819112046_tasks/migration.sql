-- CreateEnum
CREATE TYPE "Status" AS ENUM ('INCOMPLETE', 'COMPLETED');

-- CreateTable
CREATE TABLE "Task" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "status" "Status" NOT NULL DEFAULT 'INCOMPLETE',

    CONSTRAINT "Task_pkey" PRIMARY KEY ("id")
);
