import { User, Prescription, Caregiver, Responsible, Emergency } from '../types';

export const mockUsers: User[] = [
  {
    id: '1',
    name: 'María González',
    age: 75,
    room: '101',
    status: 'stable',
    assignedCaregiver: 'Ana López',
    assignedResponsible: 'Carlos Ramírez',
    emergencyContact: {
      name: 'Juan González',
      phone: '+52 555-1234',
      relationship: 'Hijo'
    }
  },
  {
    id: '2',
    name: 'Pedro Martínez',
    age: 82,
    room: '102',
    status: 'attention',
    assignedCaregiver: 'Ana López',
    assignedResponsible: 'Carlos Ramírez',
    emergencyContact: {
      name: 'Laura Martínez',
      phone: '+52 555-5678',
      relationship: 'Hija'
    }
  },
  {
    id: '3',
    name: 'Rosa Hernández',
    age: 78,
    room: '103',
    status: 'stable',
    assignedCaregiver: 'Luis Torres',
    assignedResponsible: 'María Sánchez',
    emergencyContact: {
      name: 'Alberto Hernández',
      phone: '+52 555-9012',
      relationship: 'Sobrino'
    }
  },
  {
    id: '4',
    name: 'José García',
    age: 80,
    room: '104',
    status: 'critical',
    assignedCaregiver: 'Luis Torres',
    assignedResponsible: 'María Sánchez',
    emergencyContact: {
      name: 'Patricia García',
      phone: '+52 555-3456',
      relationship: 'Hija'
    }
  }
];

export const mockPrescriptions: Prescription[] = [
  {
    id: 'p1',
    userId: '1',
    userName: 'María González',
    medication: 'Losartán',
    dosage: '50mg',
    frequency: 'Diaria',
    schedule: ['08:00', '20:00'],
    startDate: '2025-09-15',
    notes: 'Tomar con alimentos'
  },
  {
    id: 'p2',
    userId: '1',
    userName: 'María González',
    medication: 'Metformina',
    dosage: '850mg',
    frequency: 'Cada 12 horas',
    schedule: ['08:00', '20:00'],
    startDate: '2025-09-15'
  },
  {
    id: 'p3',
    userId: '2',
    userName: 'Pedro Martínez',
    medication: 'Enalapril',
    dosage: '10mg',
    frequency: 'Diaria',
    schedule: ['09:00'],
    startDate: '2025-09-20'
  },
  {
    id: 'p4',
    userId: '2',
    userName: 'Pedro Martínez',
    medication: 'Atorvastatina',
    dosage: '20mg',
    frequency: 'Diaria',
    schedule: ['21:00'],
    startDate: '2025-09-20',
    notes: 'Tomar en la noche'
  },
  {
    id: 'p5',
    userId: '3',
    userName: 'Rosa Hernández',
    medication: 'Amlodipino',
    dosage: '5mg',
    frequency: 'Diaria',
    schedule: ['08:00'],
    startDate: '2025-09-10'
  },
  {
    id: 'p6',
    userId: '4',
    userName: 'José García',
    medication: 'Insulina',
    dosage: '10 UI',
    frequency: 'Cada 8 horas',
    schedule: ['08:00', '16:00', '00:00'],
    startDate: '2025-09-25',
    notes: 'Revisar niveles de glucosa antes de administrar'
  }
];

export const mockCaregivers: Caregiver[] = [
  {
    id: 'c1',
    name: 'Ana López',
    email: 'ana.lopez@casahogar.com',
    phone: '+52 555-1111',
    shift: 'morning',
    assignedPatients: ['1', '2']
  },
  {
    id: 'c2',
    name: 'Luis Torres',
    email: 'luis.torres@casahogar.com',
    phone: '+52 555-2222',
    shift: 'afternoon',
    assignedPatients: ['3', '4']
  },
  {
    id: 'c3',
    name: 'Carmen Díaz',
    email: 'carmen.diaz@casahogar.com',
    phone: '+52 555-3333',
    shift: 'night',
    assignedPatients: ['1', '3']
  }
];

export const mockResponsibles: Responsible[] = [
  {
    id: 'r1',
    name: 'Carlos Ramírez',
    email: 'carlos.ramirez@email.com',
    phone: '+52 555-4444',
    assignedPatients: ['1', '2']
  },
  {
    id: 'r2',
    name: 'María Sánchez',
    email: 'maria.sanchez@email.com',
    phone: '+52 555-5555',
    assignedPatients: ['3', '4']
  }
];

export const mockEmergencies: Emergency[] = [
  {
    id: 'e1',
    userId: '2',
    userName: 'Pedro Martínez',
    date: '2025-10-02',
    time: '14:30',
    type: 'Presión arterial elevada',
    description: 'Presión 180/100, dolor de cabeza',
    resolvedBy: 'Ana López',
    status: 'resolved'
  },
  {
    id: 'e2',
    userId: '4',
    userName: 'José García',
    date: '2025-10-03',
    time: '10:15',
    type: 'Hipoglucemia',
    description: 'Glucosa en 55 mg/dl, sudoración',
    resolvedBy: 'Luis Torres',
    status: 'resolved'
  },
  {
    id: 'e3',
    userId: '1',
    userName: 'María González',
    date: '2025-10-01',
    time: '08:45',
    type: 'Caída',
    description: 'Caída en el baño, sin fracturas',
    resolvedBy: 'Ana López',
    status: 'resolved'
  },
  {
    id: 'e4',
    userId: '4',
    userName: 'José García',
    date: '2025-10-04',
    time: '03:20',
    type: 'Dolor de pecho',
    description: 'Dolor torácico, dificultad para respirar',
    resolvedBy: 'Carmen Díaz',
    status: 'pending'
  }
];
