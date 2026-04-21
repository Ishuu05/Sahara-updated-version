export interface SafeZone {
  id: string;
  name: string;
  type: 'hospital' | 'relief' | 'police';
  lat: number;
  lng: number;
  city: string;
  phone: string;
}

export const SAFE_ZONES: SafeZone[] = [
  // HOSPITALS
  { id: '1', name: 'Lilavati Hospital', type: 'hospital', lat: 19.0524, lng: 72.8258, city: 'Mumbai', phone: '022-26568000' },
  { id: '2', name: 'KEM Hospital', type: 'hospital', lat: 18.9956, lng: 72.8427, city: 'Mumbai', phone: '022-24107000' },
  { id: '3', name: 'AIIMS Delhi', type: 'hospital', lat: 28.5672, lng: 77.2100, city: 'Delhi', phone: '011-26588500' },
  { id: '4', name: 'Safdarjung Hospital', type: 'hospital', lat: 28.5679, lng: 77.2090, city: 'Delhi', phone: '011-26707444' },
  { id: '5', name: 'Apollo Hospital', type: 'hospital', lat: 13.0569, lng: 80.2425, city: 'Chennai', phone: '044-28290200' },
  { id: '6', name: 'NIMHANS', type: 'hospital', lat: 12.9398, lng: 77.5956, city: 'Bangalore', phone: '080-46110007' },
  { id: '7', name: 'SSKM Hospital', type: 'hospital', lat: 22.5354, lng: 88.3401, city: 'Kolkata', phone: '033-22041739' },
  { id: '8', name: 'Civil Hospital Ahmedabad', type: 'hospital', lat: 23.0225, lng: 72.5714, city: 'Ahmedabad', phone: '079-22681009' },
  { id: '9', name: 'PGIMER Chandigarh', type: 'hospital', lat: 30.7650, lng: 76.7780, city: 'Chandigarh', phone: '0172-2755555' },
  { id: '10', name: 'Govt Medical College Nagpur', type: 'hospital', lat: 21.1458, lng: 79.0882, city: 'Nagpur', phone: '0712-2700000' },
  // RELIEF CENTERS
  { id: '11', name: 'Relief Camp Bandra', type: 'relief', lat: 19.0596, lng: 72.8295, city: 'Mumbai', phone: '1078' },
  { id: '12', name: 'Red Cross Shelter Chennai', type: 'relief', lat: 13.0827, lng: 80.2707, city: 'Chennai', phone: '044-28520743' },
  { id: '13', name: 'Civil Defence HQ Delhi', type: 'relief', lat: 28.6139, lng: 77.2090, city: 'Delhi', phone: '011-23438252' },
  { id: '14', name: 'NDRF Base Pune', type: 'relief', lat: 18.5204, lng: 73.8567, city: 'Pune', phone: '1078' },
  { id: '15', name: 'Relief Center Hyderabad', type: 'relief', lat: 17.3850, lng: 78.4867, city: 'Hyderabad', phone: '1078' },
  { id: '16', name: 'Emergency Camp Patna', type: 'relief', lat: 25.5941, lng: 85.1376, city: 'Patna', phone: '1078' },
  { id: '17', name: 'Relief Center Guwahati', type: 'relief', lat: 26.1445, lng: 91.7362, city: 'Guwahati', phone: '1078' },
  { id: '18', name: 'Flood Shelter Bhubaneswar', type: 'relief', lat: 20.2961, lng: 85.8245, city: 'Bhubaneswar', phone: '1078' },
  // POLICE
  { id: '19', name: 'Mumbai Police HQ', type: 'police', lat: 18.9388, lng: 72.8354, city: 'Mumbai', phone: '100' },
  { id: '20', name: 'Delhi Police HQ', type: 'police', lat: 28.6353, lng: 77.2250, city: 'Delhi', phone: '100' },
  { id: '21', name: 'Chennai Police HQ', type: 'police', lat: 13.0827, lng: 80.2707, city: 'Chennai', phone: '100' },
];
