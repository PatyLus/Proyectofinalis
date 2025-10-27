export interface User {
  id: string;
  name: string;
  age: number;
  room: string;
  status: 'stable' | 'attention' | 'critical';
  assignedCaregiver?: string;
  assignedResponsible?: string;
  emergencyContact: {
    name: string;
    phone: string;
    relationship: string;
  };
}

export interface Prescription {
  id: string;
  userId: string;
  userName: string;
  medication: string;
  dosage: string;
  frequency: string;
  schedule: string[];
  startDate: string;
  endDate?: string;
  notes?: string;
}

export interface Caregiver {
  id: string;
  name: string;
  email: string;
  phone: string;
  shift: 'morning' | 'afternoon' | 'night';
  assignedPatients: string[];
}

export interface Responsible {
  id: string;
  name: string;
  email: string;
  phone: string;
  assignedPatients: string[];
}

export interface Emergency {
  id: string;
  userId: string;
  userName: string;
  date: string;
  time: string;
  type: string;
  description: string;
  resolvedBy: string;
  status: 'resolved' | 'pending';
}

export type UserRole = 'admin' | 'caregiver' | 'responsible';

export interface AuthUser {
  id: string;
  name: string;
  role: UserRole;
}
