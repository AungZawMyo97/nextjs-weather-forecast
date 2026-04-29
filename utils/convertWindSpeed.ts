export function convertWindSpeed(windSpeed: number): string {
  const speedInKilometerPerHour = windSpeed * 3.6; // Convert m/s to km/h
  if (speedInKilometerPerHour >= 120) {
    return "Hurricane";
  }
  return `${Math.round(speedInKilometerPerHour)} km/h`;
}
