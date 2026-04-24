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

export const SAFE_ZONES: SafeZone[] = [
  { id: '1', name: 'Lilavati Hospital', type: 'hospital', lat: 19.0524, lng: 72.8258, city: 'Mumbai', phone: '022-26568000' },
  { id: '2', name: 'KEM Hospital', type: 'hospital', lat: 18.9956, lng: 72.8427, city: 'Mumbai', phone: '022-24107000' },
  { id: '3', name: 'Hinduja Hospital', type: 'hospital', lat: 19.0176, lng: 72.8398, city: 'Mumbai', phone: '022-24452222' },
  { id: '4', name: 'Relief Camp Bandra', type: 'relief', lat: 19.0596, lng: 72.8295, city: 'Mumbai', phone: '1078' },
  { id: '5', name: 'Mumbai Police HQ', type: 'police', lat: 18.9388, lng: 72.8354, city: 'Mumbai', phone: '100' },
  { id: '6', name: 'AIIMS Delhi', type: 'hospital', lat: 28.5672, lng: 77.2100, city: 'Delhi', phone: '011-26588500' },
  { id: '7', name: 'Safdarjung Hospital', type: 'hospital', lat: 28.5679, lng: 77.2090, city: 'Delhi', phone: '011-26707444' },
  { id: '8', name: 'RML Hospital', type: 'hospital', lat: 28.6225, lng: 77.2081, city: 'Delhi', phone: '011-23365525' },
  { id: '9', name: 'Civil Defence HQ Delhi', type: 'relief', lat: 28.6139, lng: 77.2090, city: 'Delhi', phone: '011-23438252' },
  { id: '10', name: 'Delhi Police HQ', type: 'police', lat: 28.6353, lng: 77.2250, city: 'Delhi', phone: '100' },
  { id: '11', name: 'Manipal Hospital', type: 'hospital', lat: 12.9516, lng: 77.6473, city: 'Bangalore', phone: '080-25024444' },
  { id: '12', name: 'Victoria Hospital', type: 'hospital', lat: 12.9634, lng: 77.5769, city: 'Bangalore', phone: '080-26703333' },
  { id: '13', name: 'NIMHANS', type: 'hospital', lat: 12.9398, lng: 77.5956, city: 'Bangalore', phone: '080-46110007' },
  { id: '14', name: 'Relief Center Bangalore', type: 'relief', lat: 12.9716, lng: 77.5946, city: 'Bangalore', phone: '1078' },
  { id: '15', name: 'Bangalore Police HQ', type: 'police', lat: 12.9716, lng: 77.5946, city: 'Bangalore', phone: '100' },
  { id: '16', name: 'Apollo Hospital Chennai', type: 'hospital', lat: 13.0569, lng: 80.2425, city: 'Chennai', phone: '044-28290200' },
  { id: '17', name: 'Govt General Hospital Chennai', type: 'hospital', lat: 13.0827, lng: 80.2707, city: 'Chennai', phone: '044-25305000' },
  { id: '18', name: 'Red Cross Shelter Chennai', type: 'relief', lat: 13.0827, lng: 80.2707, city: 'Chennai', phone: '044-28520743' },
  { id: '19', name: 'Chennai Police HQ', type: 'police', lat: 13.0569, lng: 80.2425, city: 'Chennai', phone: '100' },
  { id: '20', name: 'Yashoda Hospital', type: 'hospital', lat: 17.4484, lng: 78.3756, city: 'Hyderabad', phone: '040-45674567' },
  { id: '21', name: 'Osmania General Hospital', type: 'hospital', lat: 17.3727, lng: 78.4742, city: 'Hyderabad', phone: '040-24600120' },
  { id: '22', name: 'Relief Center Hyderabad', type: 'relief', lat: 17.3850, lng: 78.4867, city: 'Hyderabad', phone: '1078' },
  { id: '23', name: 'Hyderabad Police HQ', type: 'police', lat: 17.3850, lng: 78.4867, city: 'Hyderabad', phone: '100' },
  { id: '24', name: 'Ruby Hall Clinic', type: 'hospital', lat: 18.5314, lng: 73.8446, city: 'Pune', phone: '020-26163391' },
  { id: '25', name: 'Sassoon General Hospital', type: 'hospital', lat: 18.5195, lng: 73.8553, city: 'Pune', phone: '020-26128000' },
  { id: '26', name: 'NDRF Base Pune', type: 'relief', lat: 18.5204, lng: 73.8567, city: 'Pune', phone: '1078' },
  { id: '27', name: 'SSKM Hospital', type: 'hospital', lat: 22.5354, lng: 88.3401, city: 'Kolkata', phone: '033-22041739' },
  { id: '28', name: 'Apollo Gleneagles Kolkata', type: 'hospital', lat: 22.5448, lng: 88.3426, city: 'Kolkata', phone: '033-23201000' },
  { id: '29', name: 'Relief Center Kolkata', type: 'relief', lat: 22.5726, lng: 88.3639, city: 'Kolkata', phone: '1078' },
  { id: '30', name: 'Kolkata Police HQ', type: 'police', lat: 22.5726, lng: 88.3639, city: 'Kolkata', phone: '100' },
  { id: '31', name: 'Civil Hospital Ahmedabad', type: 'hospital', lat: 23.0225, lng: 72.5714, city: 'Ahmedabad', phone: '079-22681009' },
  { id: '32', name: 'Sterling Hospital', type: 'hospital', lat: 23.0395, lng: 72.5267, city: 'Ahmedabad', phone: '079-40011000' },
  { id: '33', name: 'Relief Center Ahmedabad', type: 'relief', lat: 23.0225, lng: 72.5714, city: 'Ahmedabad', phone: '1078' },
  { id: '34', name: 'SMS Hospital Jaipur', type: 'hospital', lat: 26.9124, lng: 75.7873, city: 'Jaipur', phone: '0141-2518888' },
  { id: '35', name: 'Fortis Hospital Jaipur', type: 'hospital', lat: 26.8636, lng: 75.8078, city: 'Jaipur', phone: '0141-2547000' },
  { id: '36', name: 'Relief Center Jaipur', type: 'relief', lat: 26.9124, lng: 75.7873, city: 'Jaipur', phone: '1078' },
  { id: '37', name: 'SGPGI Lucknow', type: 'hospital', lat: 26.8467, lng: 80.9462, city: 'Lucknow', phone: '0522-2668700' },
  { id: '38', name: 'King George Medical Lucknow', type: 'hospital', lat: 26.8650, lng: 80.9350, city: 'Lucknow', phone: '0522-2257540' },
  { id: '39', name: 'Relief Center Lucknow', type: 'relief', lat: 26.8467, lng: 80.9462, city: 'Lucknow', phone: '1078' },
  { id: '40', name: 'PMCH Patna', type: 'hospital', lat: 25.6093, lng: 85.1376, city: 'Patna', phone: '0612-2300000' },
  { id: '41', name: 'Emergency Camp Patna', type: 'relief', lat: 25.5941, lng: 85.1376, city: 'Patna', phone: '1078' },
  { id: '42', name: 'Hamidia Hospital Bhopal', type: 'hospital', lat: 23.2599, lng: 77.4126, city: 'Bhopal', phone: '0755-2540222' },
  { id: '43', name: 'Relief Center Bhopal', type: 'relief', lat: 23.2599, lng: 77.4126, city: 'Bhopal', phone: '1078' },
  { id: '44', name: 'Govt Medical College Nagpur', type: 'hospital', lat: 21.1458, lng: 79.0882, city: 'Nagpur', phone: '0712-2700000' },
  { id: '45', name: 'Relief Center Nagpur', type: 'relief', lat: 21.1458, lng: 79.0882, city: 'Nagpur', phone: '1078' },
  { id: '46', name: 'New Civil Hospital Surat', type: 'hospital', lat: 21.1702, lng: 72.8311, city: 'Surat', phone: '0261-2244000' },
  { id: '47', name: 'Relief Center Surat', type: 'relief', lat: 21.1702, lng: 72.8311, city: 'Surat', phone: '1078' },
  { id: '48', name: 'GMCH Guwahati', type: 'hospital', lat: 26.1445, lng: 91.7362, city: 'Guwahati', phone: '0361-2529457' },
  { id: '49', name: 'Relief Center Guwahati', type: 'relief', lat: 26.1445, lng: 91.7362, city: 'Guwahati', phone: '1078' },
  { id: '50', name: 'AIIMS Bhubaneswar', type: 'hospital', lat: 20.2961, lng: 85.8245, city: 'Bhubaneswar', phone: '0674-2476789' },
  { id: '51', name: 'Flood Shelter Bhubaneswar', type: 'relief', lat: 20.2961, lng: 85.8245, city: 'Bhubaneswar', phone: '1078' },
];

export async function fetchNearbySafeZones(lat: number, lng: number): Promise<SafeZone[]> {
  return SAFE_ZONES;
}
