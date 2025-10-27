import { mockEmergencies } from '../../data/mockData';
import { Card } from '../ui/card';
import { Badge } from '../ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../ui/table';
import { AlertTriangle, CheckCircle, Clock } from 'lucide-react';

interface EmergencyStatsProps {
  detailed?: boolean;
}

export function EmergencyStats({ detailed = false }: EmergencyStatsProps) {
  const currentMonth = new Date().getMonth();
  const monthEmergencies = mockEmergencies.filter((e) => {
    const emergencyMonth = new Date(e.date).getMonth();
    return emergencyMonth === currentMonth;
  });

  const resolvedCount = monthEmergencies.filter((e) => e.status === 'resolved').length;
  const pendingCount = monthEmergencies.filter((e) => e.status === 'pending').length;

  const emergencyTypes = monthEmergencies.reduce((acc, e) => {
    acc[e.type] = (acc[e.type] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  if (!detailed) {
    return (
      <div className="space-y-4">
        <div className="grid grid-cols-3 gap-4">
          <Card className="p-4 bg-red-50 border-red-200">
            <div className="flex items-center gap-2 mb-2">
              <AlertTriangle className="w-5 h-5 text-red-600" />
              <span className="text-sm text-muted-foreground">Total</span>
            </div>
            <div className="text-2xl">{monthEmergencies.length}</div>
          </Card>

          <Card className="p-4 bg-green-50 border-green-200">
            <div className="flex items-center gap-2 mb-2">
              <CheckCircle className="w-5 h-5 text-green-600" />
              <span className="text-sm text-muted-foreground">Resueltas</span>
            </div>
            <div className="text-2xl">{resolvedCount}</div>
          </Card>

          <Card className="p-4 bg-yellow-50 border-yellow-200">
            <div className="flex items-center gap-2 mb-2">
              <Clock className="w-5 h-5 text-yellow-600" />
              <span className="text-sm text-muted-foreground">Pendientes</span>
            </div>
            <div className="text-2xl">{pendingCount}</div>
          </Card>
        </div>

        <div>
          <h4 className="mb-3">Tipos de Emergencias</h4>
          <div className="space-y-2">
            {Object.entries(emergencyTypes).map(([type, count]) => (
              <div key={type} className="flex items-center justify-between p-2 bg-gray-50 rounded">
                <span className="text-sm">{type}</span>
                <Badge>{count}</Badge>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="grid md:grid-cols-3 gap-4">
        <Card className="p-6 bg-red-50 border-red-200">
          <div className="flex items-center gap-3 mb-2">
            <AlertTriangle className="w-6 h-6 text-red-600" />
            <span className="text-muted-foreground">Total de Emergencias</span>
          </div>
          <div className="text-3xl">{monthEmergencies.length}</div>
          <p className="text-sm text-muted-foreground mt-1">Octubre 2025</p>
        </Card>

        <Card className="p-6 bg-green-50 border-green-200">
          <div className="flex items-center gap-3 mb-2">
            <CheckCircle className="w-6 h-6 text-green-600" />
            <span className="text-muted-foreground">Resueltas</span>
          </div>
          <div className="text-3xl">{resolvedCount}</div>
          <p className="text-sm text-muted-foreground mt-1">
            {monthEmergencies.length > 0 ? Math.round((resolvedCount / monthEmergencies.length) * 100) : 0}% del total
          </p>
        </Card>

        <Card className="p-6 bg-yellow-50 border-yellow-200">
          <div className="flex items-center gap-3 mb-2">
            <Clock className="w-6 h-6 text-yellow-600" />
            <span className="text-muted-foreground">Pendientes</span>
          </div>
          <div className="text-3xl">{pendingCount}</div>
          <p className="text-sm text-muted-foreground mt-1">Requieren atención</p>
        </Card>
      </div>

      <div>
        <h3 className="mb-4">Historial de Emergencias</h3>
        <div className="border rounded-lg overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Fecha y Hora</TableHead>
                <TableHead>Paciente</TableHead>
                <TableHead>Tipo</TableHead>
                <TableHead>Descripción</TableHead>
                <TableHead>Atendido por</TableHead>
                <TableHead>Estado</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {monthEmergencies.map((emergency) => (
                <TableRow key={emergency.id}>
                  <TableCell>
                    <div>
                      <div>{new Date(emergency.date).toLocaleDateString('es-MX')}</div>
                      <div className="text-sm text-muted-foreground">{emergency.time}</div>
                    </div>
                  </TableCell>
                  <TableCell>{emergency.userName}</TableCell>
                  <TableCell>
                    <Badge variant="outline">{emergency.type}</Badge>
                  </TableCell>
                  <TableCell className="max-w-xs">
                    <p className="text-sm">{emergency.description}</p>
                  </TableCell>
                  <TableCell>{emergency.resolvedBy}</TableCell>
                  <TableCell>
                    {emergency.status === 'resolved' ? (
                      <Badge className="bg-green-100 text-green-800">Resuelta</Badge>
                    ) : (
                      <Badge className="bg-yellow-100 text-yellow-800">Pendiente</Badge>
                    )}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  );
}
