export function getDistance(lat1: number, lon1: number, lat2: number, lon2: number): number {
  const R = 6371; // Radius of the earth in km
  const dLat = deg2rad(lat2 - lat1);
  const dLon = deg2rad(lon2 - lon1);
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) *
    Math.sin(dLon / 2) * Math.sin(dLon / 2)
    ;
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const d = R * c; // Distance in km
  return Number(d.toFixed(2));
}

function deg2rad(deg: number) {
  return deg * (Math.PI / 180);
}

export function formatDistance(km: number): string {
  if (km < 1) {
    return `${(km * 1000).toFixed(0)}m`;
  }
  return `${km.toFixed(1)}km`;
}

export function estimateWalkTime(km: number): string {
  const minutes = (km / 5) * 60; // Assuming 5km/h walking speed
  if (minutes < 1) return '< 1 min';
  if (minutes < 60) return `${Math.round(minutes)} mins`;
  const hours = Math.floor(minutes / 60);
  const mins = Math.round(minutes % 60);
  return `${hours}h ${mins}m`;
}
