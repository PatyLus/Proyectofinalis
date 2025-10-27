import { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import { Card } from '../ui/card';
import { Button } from '../ui/button';
import { UserManagement } from './UserManagement';
import { CaregiverManagement } from './CaregiverManagement';
import { ResponsibleManagement } from './ResponsibleManagement';
import { PrescriptionView } from './PrescriptionView';
import { CaregiverSchedule } from './CaregiverSchedule';
import { EmergencyStats } from './EmergencyStats';
import { LogOut, Users, Heart, UserCheck, Pill, Calendar, AlertTriangle } from 'lucide-react';

interface AdminDashboardProps {
  onLogout: () => void;
}

export function AdminDashboard({ onLogout }: AdminDashboardProps) {
  const [activeTab, setActiveTab] = useState('overview');

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white border-b sticky top-0 z-10">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div>
            <h2>Panel de Administrador</h2>
            <p className="text-sm text-muted-foreground">Casa Hogar - Sistema de Gestión</p>
          </div>
          <Button variant="outline" onClick={onLogout}>
            <LogOut className="w-4 h-4 mr-2" />
            Cerrar Sesión
          </Button>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-6 mb-8">
            <TabsTrigger value="overview">
              <Users className="w-4 h-4 mr-2" />
              Resumen
            </TabsTrigger>
            <TabsTrigger value="users">
              <Users className="w-4 h-4 mr-2" />
              Usuarios
            </TabsTrigger>
            <TabsTrigger value="caregivers">
              <Heart className="w-4 h-4 mr-2" />
              Cuidadores
            </TabsTrigger>
            <TabsTrigger value="responsibles">
              <UserCheck className="w-4 h-4 mr-2" />
              Responsables
            </TabsTrigger>
            <TabsTrigger value="prescriptions">
              <Pill className="w-4 h-4 mr-2" />
              Recetas
            </TabsTrigger>
            <TabsTrigger value="emergencies">
              <AlertTriangle className="w-4 h-4 mr-2" />
              Emergencias
            </TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <Card className="p-6">
                <h3 className="mb-4">Horarios de Cuidadores</h3>
                <CaregiverSchedule />
              </Card>
              <Card className="p-6">
                <h3 className="mb-4">Estadísticas de Emergencias - Octubre 2025</h3>
                <EmergencyStats />
              </Card>
            </div>
            <Card className="p-6">
              <h3 className="mb-4">Recetas Médicas Activas</h3>
              <PrescriptionView />
            </Card>
          </TabsContent>

          <TabsContent value="users">
            <UserManagement />
          </TabsContent>

          <TabsContent value="caregivers">
            <CaregiverManagement />
          </TabsContent>

          <TabsContent value="responsibles">
            <ResponsibleManagement />
          </TabsContent>

          <TabsContent value="prescriptions">
            <Card className="p-6">
              <PrescriptionView />
            </Card>
          </TabsContent>

          <TabsContent value="emergencies">
            <Card className="p-6">
              <EmergencyStats detailed />
            </Card>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
}
