import { 
  collection, 
  addDoc, 
  updateDoc, 
  doc, 
  onSnapshot, 
  query, 
  where, 
  orderBy, 
  serverTimestamp, 
  Timestamp,
  getDocs
} from 'firebase/firestore';
import { db } from '../lib/firebase';

// BROADCASTS
export const subscribeToBroadcasts = (callback: (data: any[]) => void) => {
  const q = query(collection(db, 'broadcasts'), orderBy('timestamp', 'desc'));
  return onSnapshot(q, (snapshot) => {
    const broadcasts = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    callback(broadcasts);
  });
};

export const sendBroadcast = async (message: string, severity: string, area: string) => {
  return addDoc(collection(db, 'broadcasts'), {
    message,
    severity,
    area,
    timestamp: serverTimestamp()
  });
};

// SOS ALERTS
export const sendSOS = async (uid: string, name: string, lat: number, lng: number) => {
  return addDoc(collection(db, 'sosAlerts'), {
    uid,
    name,
    lat,
    lng,
    timestamp: serverTimestamp(),
    status: 'active'
  });
};

export const subscribeToSOSAlerts = (callback: (data: any[]) => void) => {
  const q = query(collection(db, 'sosAlerts'), where('status', '==', 'active'), orderBy('timestamp', 'desc'));
  return onSnapshot(q, (snapshot) => {
    const alerts = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    callback(alerts);
  });
};

export const markSOSHelped = async (id: string) => {
  return updateDoc(doc(db, 'sosAlerts', id), {
    status: 'resolved',
    resolvedAt: serverTimestamp()
  });
};

// USER LOCATIONS
export const updateCivilianLocation = async (uid: string, name: string, lat: number, lng: number) => {
  // Using uid as document id to keep one entry per user
  return updateDoc(doc(db, 'civilianLocations', uid), {
    name,
    lat,
    lng,
    lastUpdate: serverTimestamp()
  }).catch(() => {
    // If doc doesn't exist, it will fail, we might need a setDoc or check
    const { setDoc } = require('firebase/firestore');
    return setDoc(doc(db, 'civilianLocations', uid), {
      name,
      lat,
      lng,
      lastUpdate: serverTimestamp()
    });
  });
};

export const subscribeToCivilianLocations = (callback: (data: any[]) => void) => {
  return onSnapshot(collection(db, 'civilianLocations'), (snapshot) => {
    const locations = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    callback(locations);
  });
};

// RESOURCE MANAGEMENT
export const subscribeToResources = (callback: (data: any[]) => void) => {
  return onSnapshot(collection(db, 'resources'), (snapshot) => {
    const resources = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    callback(resources);
  });
};

// INFRASTRUCTURE REPORTS
export const submitInfrastructureReport = async (data: any) => {
  return addDoc(collection(db, 'infrastructureReports'), {
    ...data,
    timestamp: serverTimestamp()
  });
};

export const subscribeToInfrastructureReports = (callback: (data: any[]) => void) => {
  const q = query(collection(db, 'infrastructureReports'), orderBy('timestamp', 'desc'));
  return onSnapshot(q, (snapshot) => {
    const reports = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    callback(reports);
  });
};
