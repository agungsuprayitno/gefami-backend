/*
  Warnings:

  - You are about to drop the column `max_loan_date` on the `BookLoan` table. All the data in the column will be lost.
  - Added the required column `book_id` to the `BookLoan` table without a default value. This is not possible if the table is not empty.
  - Added the required column `is_returned` to the `BookLoan` table without a default value. This is not possible if the table is not empty.
  - Made the column `user_id` on table `BookLoan` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "BookLoan" DROP CONSTRAINT "BookLoan_user_id_fkey";

-- AlterTable
ALTER TABLE "BookLoan" DROP COLUMN "max_loan_date",
ADD COLUMN     "book_id" INTEGER NOT NULL,
ADD COLUMN     "is_returned" BOOLEAN NOT NULL,
ALTER COLUMN "user_id" SET NOT NULL;

-- AddForeignKey
ALTER TABLE "BookLoan" ADD CONSTRAINT "BookLoan_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
