CREATE TABLE "students" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(100),
    "email" VARCHAR(100),
    CONSTRAINT "students_pkey" PRIMARY KEY ("id")
);
