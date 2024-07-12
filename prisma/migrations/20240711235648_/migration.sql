-- CreateEnum
CREATE TYPE "TaskStatus" AS ENUM ('INCOMPLETO', 'COMPLETO');

-- AlterTable
ALTER TABLE "Tasks" ADD COLUMN     "status" "TaskStatus" NOT NULL DEFAULT 'INCOMPLETO';
