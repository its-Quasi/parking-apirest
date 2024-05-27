export class CreateParkingLogDto {
  vehiclePlate: string;
  parking: {
    id: number;
  };
  entryTime?: Date;
  exitTime?: Date;
}