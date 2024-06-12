/*
  Warnings:

  - Added the required column `created_at` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `is_loan` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "User" ADD COLUMN     "created_at" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "is_loan" BOOLEAN NOT NULL;

-- CreateTable
CREATE TABLE "BookLoan" (
    "id" SERIAL NOT NULL,
    "user_id" INTEGER,
    "book_title" TEXT NOT NULL,
    "loan_date" TIMESTAMP(3) NOT NULL,
    "max_loan_date" TIMESTAMP(3) NOT NULL,
    "return_date" TIMESTAMP(3) NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "BookLoan_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "BookLoan" ADD CONSTRAINT "BookLoan_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;
