import { useState } from 'react';
import { Button } from '../ui/button';
import { Card } from '../ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import { PatientList } from './PatientList';
import { MedicationSchedule } from './MedicationSchedule';
import { LogOut, Users, Clock } from 'lucide-react';

interface CaregiverDashboardProps {
  onLogout: () => void;
}

export function CaregiverDashboard({ onLogout }: CaregiverDashboardProps) {
  const [activeTab, setActiveTab] = useState('patients');

  // Simulamos que es Ana López (cuidadora del turno matutino)
  const currentCaregiver = {
    name: 'Ana López',
    shift: 'Matutino (6:00 - 14:00)',
    assignedPatients: ['1', '2']
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white border-b sticky top-0 z-10">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div>
            <h2>Panel de Cuidador</h2>
            <p className="text-sm text-muted-foreground">
              {currentCaregiver.name} - {currentCaregiver.shift}
            </p>
          </div>
          <Button variant="outline" onClick={onLogout}>
            <LogOut className="w-4 h-4 mr-2" />
            Cerrar Sesión
          </Button>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-2 mb-8">
            <TabsTrigger value="patients">
              <Users className="w-4 h-4 mr-2" />
              Mis Pacientes
            </TabsTrigger>
            <TabsTrigger value="schedule">
              <Clock className="w-4 h-4 mr-2" />
              Horario de Medicamentos
            </TabsTrigger>
          </TabsList>

          <TabsContent value="patients">
            <PatientList caregiverId="c1" />
          </TabsContent>

          <TabsContent value="schedule">
            <Card className="p-6">
              <h3 className="mb-4">Horario de Medicamentos - Hoy</h3>
              <MedicationSchedule caregiverId="c1" />
            </Card>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
}
