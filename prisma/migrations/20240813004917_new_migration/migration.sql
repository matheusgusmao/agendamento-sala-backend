-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "cpf" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "permissionId" TEXT NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Permission" (
    "id" TEXT NOT NULL,
    "type" TEXT NOT NULL,

    CONSTRAINT "Permission_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Room" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "maximumCapacity" TEXT NOT NULL,
    "availableEquipment" TEXT[],
    "location" TEXT NOT NULL,

    CONSTRAINT "Room_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Equipment" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "Equipment_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Scheduling" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "startDate" TIMESTAMP NOT NULL,
    "endDate" TIMESTAMP NOT NULL,
    "recurrence" TEXT NOT NULL,

    CONSTRAINT "Scheduling_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_RoomToScheduling" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "_EquipmentToRoom" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "_SchedulingToUser" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "User_cpf_key" ON "User"("cpf");

-- CreateIndex
CREATE INDEX "User_permissionId_idx" ON "User"("permissionId");

-- CreateIndex
CREATE UNIQUE INDEX "_RoomToScheduling_AB_unique" ON "_RoomToScheduling"("A", "B");

-- CreateIndex
CREATE INDEX "_RoomToScheduling_B_index" ON "_RoomToScheduling"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_EquipmentToRoom_AB_unique" ON "_EquipmentToRoom"("A", "B");

-- CreateIndex
CREATE INDEX "_EquipmentToRoom_B_index" ON "_EquipmentToRoom"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_SchedulingToUser_AB_unique" ON "_SchedulingToUser"("A", "B");

-- CreateIndex
CREATE INDEX "_SchedulingToUser_B_index" ON "_SchedulingToUser"("B");

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_permissionId_fkey" FOREIGN KEY ("permissionId") REFERENCES "Permission"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_RoomToScheduling" ADD CONSTRAINT "_RoomToScheduling_A_fkey" FOREIGN KEY ("A") REFERENCES "Room"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_RoomToScheduling" ADD CONSTRAINT "_RoomToScheduling_B_fkey" FOREIGN KEY ("B") REFERENCES "Scheduling"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_EquipmentToRoom" ADD CONSTRAINT "_EquipmentToRoom_A_fkey" FOREIGN KEY ("A") REFERENCES "Equipment"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_EquipmentToRoom" ADD CONSTRAINT "_EquipmentToRoom_B_fkey" FOREIGN KEY ("B") REFERENCES "Room"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_SchedulingToUser" ADD CONSTRAINT "_SchedulingToUser_A_fkey" FOREIGN KEY ("A") REFERENCES "Scheduling"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_SchedulingToUser" ADD CONSTRAINT "_SchedulingToUser_B_fkey" FOREIGN KEY ("B") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
