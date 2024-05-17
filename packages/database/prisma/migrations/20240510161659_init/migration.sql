-- CreateTable
CREATE TABLE "Node" (
    "nodeID" TEXT NOT NULL,
    "xcoord" INTEGER NOT NULL,
    "ycoord" INTEGER NOT NULL,
    "floor" TEXT NOT NULL,
    "building" TEXT NOT NULL,
    "nodeType" TEXT NOT NULL,
    "longName" TEXT NOT NULL,
    "shortName" TEXT NOT NULL,

    CONSTRAINT "Node_pkey" PRIMARY KEY ("nodeID")
);

-- CreateTable
CREATE TABLE "Edge" (
    "edgeID" TEXT NOT NULL,
    "startNodeID" TEXT NOT NULL,
    "endNodeID" TEXT NOT NULL,

    CONSTRAINT "Edge_pkey" PRIMARY KEY ("edgeID")
);

-- CreateTable
CREATE TABLE "User" (
    "userID" SERIAL NOT NULL,
    "userName" TEXT NOT NULL,
    "emailAddress" TEXT NOT NULL,
    "password" TEXT NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("userID")
);

-- CreateTable
CREATE TABLE "Employee" (
    "employeeID" SERIAL NOT NULL,
    "firstName" TEXT NOT NULL,
    "lastName" TEXT NOT NULL,

    CONSTRAINT "Employee_pkey" PRIMARY KEY ("employeeID")
);

-- CreateTable
CREATE TABLE "Admin" (
    "adminID" SERIAL NOT NULL,
    "userID" INTEGER NOT NULL,

    CONSTRAINT "Admin_pkey" PRIMARY KEY ("adminID")
);

-- CreateTable
CREATE TABLE "Patient" (
    "patientID" SERIAL NOT NULL,
    "roomID" TEXT NOT NULL,
    "userID" INTEGER NOT NULL,

    CONSTRAINT "Patient_pkey" PRIMARY KEY ("patientID")
);

-- CreateTable
CREATE TABLE "MedicalWorker" (
    "medicalID" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "userID" INTEGER NOT NULL,

    CONSTRAINT "MedicalWorker_pkey" PRIMARY KEY ("medicalID")
);

-- CreateTable
CREATE TABLE "MedicalAssignments" (
    "assignmentID" SERIAL NOT NULL,
    "medicalID" INTEGER NOT NULL,
    "patientID" INTEGER NOT NULL,

    CONSTRAINT "MedicalAssignments_pkey" PRIMARY KEY ("assignmentID")
);

-- CreateTable
CREATE TABLE "ServiceRequest" (
    "id" SERIAL NOT NULL,
    "employeeID" INTEGER NOT NULL,
    "nodeID" TEXT NOT NULL,
    "serviceType" TEXT NOT NULL,
    "services" TEXT NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'Unassigned',

    CONSTRAINT "ServiceRequest_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "FlowerServiceRequest" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "flowerType" TEXT NOT NULL,
    "recipientName" TEXT NOT NULL,
    "roomNumber" TEXT NOT NULL,
    "message" TEXT NOT NULL,

    CONSTRAINT "FlowerServiceRequest_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_userName_key" ON "User"("userName");

-- CreateIndex
CREATE UNIQUE INDEX "MedicalAssignments_medicalID_patientID_key" ON "MedicalAssignments"("medicalID", "patientID");

-- AddForeignKey
ALTER TABLE "Edge" ADD CONSTRAINT "Edge_startNodeID_fkey" FOREIGN KEY ("startNodeID") REFERENCES "Node"("nodeID") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Edge" ADD CONSTRAINT "Edge_endNodeID_fkey" FOREIGN KEY ("endNodeID") REFERENCES "Node"("nodeID") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Admin" ADD CONSTRAINT "Admin_userID_fkey" FOREIGN KEY ("userID") REFERENCES "User"("userID") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Patient" ADD CONSTRAINT "Patient_roomID_fkey" FOREIGN KEY ("roomID") REFERENCES "Node"("nodeID") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Patient" ADD CONSTRAINT "Patient_userID_fkey" FOREIGN KEY ("userID") REFERENCES "User"("userID") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MedicalWorker" ADD CONSTRAINT "MedicalWorker_userID_fkey" FOREIGN KEY ("userID") REFERENCES "User"("userID") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MedicalAssignments" ADD CONSTRAINT "MedicalAssignments_medicalID_fkey" FOREIGN KEY ("medicalID") REFERENCES "MedicalWorker"("medicalID") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MedicalAssignments" ADD CONSTRAINT "MedicalAssignments_patientID_fkey" FOREIGN KEY ("patientID") REFERENCES "Patient"("patientID") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ServiceRequest" ADD CONSTRAINT "ServiceRequest_employeeID_fkey" FOREIGN KEY ("employeeID") REFERENCES "Employee"("employeeID") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ServiceRequest" ADD CONSTRAINT "ServiceRequest_nodeID_fkey" FOREIGN KEY ("nodeID") REFERENCES "Node"("nodeID") ON DELETE CASCADE ON UPDATE CASCADE;
