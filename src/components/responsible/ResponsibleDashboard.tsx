import { useState } from 'react';
import { Button } from '../ui/button';
import { Card } from '../ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import { PatientStatus } from './PatientStatus';
import { EmergencyAlerts } from './EmergencyAlerts';
import { LogOut, Users, AlertTriangle } from 'lucide-react';

interface ResponsibleDashboardProps {
  onLogout: () => void;
}

export function ResponsibleDashboard({ onLogout }: ResponsibleDashboardProps) {
  const [activeTab, setActiveTab] = useState('status');

  // Simulamos que es Carlos Ramírez (responsable)
  const currentResponsible = {
    name: 'Carlos Ramírez',
    assignedPatients: ['1', '2']
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white border-b sticky top-0 z-10">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div>
            <h2>Panel de Responsable</h2>
            <p className="text-sm text-muted-foreground">
              {currentResponsible.name}
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
            <TabsTrigger value="status">
              <Users className="w-4 h-4 mr-2" />
              Estado de Usuarios
            </TabsTrigger>
            <TabsTrigger value="emergencies">
              <AlertTriangle className="w-4 h-4 mr-2" />
              Alertas y Emergencias
            </TabsTrigger>
          </TabsList>

          <TabsContent value="status">
            <PatientStatus responsibleId="r1" />
          </TabsContent>

          <TabsContent value="emergencies">
            <Card className="p-6">
              <h3 className="mb-4">Historial de Emergencias</h3>
              <EmergencyAlerts responsibleId="r1" />
            </Card>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
}
