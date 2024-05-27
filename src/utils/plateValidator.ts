export function validateVehiclePlate(plate: string): boolean {
  const regex = /^[A-Za-z0-9]{6}$/;
  return regex.test(plate);
}