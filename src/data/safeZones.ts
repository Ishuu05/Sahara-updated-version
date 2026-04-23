export interface SafeZone {
  id: string;
  name: string;
  type: 'hospital' | 'relief' | 'police';
  lat: number;
  lng: number;
  city: string;
  phone: string;
  distance?: number;
}

export const SAFE_ZONES: SafeZone[] = [];

export async function fetchNearbySafeZones(lat: number, lng: number): Promise<SafeZone[]> {
  const radius = 10000; // 10km radius

  const query = `
    [out:json][timeout:25];
    (
      node["amenity"="hospital"](around:${radius},${lat},${lng});
      node["amenity"="clinic"](around:${radius},${lat},${lng});
      node["amenity"="police"](around:${radius},${lat},${lng});
      node["social_facility"="shelter"](around:${radius},${lat},${lng});
    );
    out body;
  `;

  const response = await fetch('https://overpass-api.de/api/interpreter', {
    method: 'POST',
    body: query,
  });

  const data = await response.json();

  return data.elements.map((el: any) => ({
    id: String(el.id),
    name: el.tags?.name || 'Unnamed Facility',
    type: el.tags?.amenity === 'hospital' || el.tags?.amenity === 'clinic'
      ? 'hospital'
      : el.tags?.amenity === 'police'
      ? 'police'
      : 'relief',
    lat: el.lat,
    lng: el.lon,
    city: el.tags?.['addr:city'] || 'Nearby',
    phone: el.tags?.phone || el.tags?.contact_phone || '112',
  }));
}
