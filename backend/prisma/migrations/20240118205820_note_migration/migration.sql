-- CreateTable
CREATE TABLE "Note" (
    "id_anotation" SERIAL NOT NULL,
    "subject" TEXT NOT NULL,
    "potential" INTEGER NOT NULL,
    "category" TEXT NOT NULL,
    "term" TEXT NOT NULL,

    CONSTRAINT "Note_pkey" PRIMARY KEY ("id_anotation")
);
