import { mockEmergencies, mockResponsibles, mockUsers } from '../../data/mockData';
import { Badge } from '../ui/badge';
import { AlertTriangle, Clock, CheckCircle, User } from 'lucide-react';

interface EmergencyAlertsProps {
  responsibleId: string;
}

export function EmergencyAlerts({ responsibleId }: EmergencyAlertsProps) {
  const responsible = mockResponsibles.find((r) => r.id === responsibleId);
  const patients = mockUsers.filter((u) => responsible?.assignedPatients.includes(u.id));
  const patientIds = patients.map((p) => p.id);

  // Filtrar emergencias de los pacientes asignados
  const relevantEmergencies = mockEmergencies
    .filter((e) => patientIds.includes(e.userId))
    .sort((a, b) => {
      // Ordenar por fecha y hora (más reciente primero)
      const dateA = new Date(`${a.date} ${a.time}`);
      const dateB = new Date(`${b.date} ${b.time}`);
      return dateB.getTime() - dateA.getTime();
    });

  const pendingEmergencies = relevantEmergencies.filter((e) => e.status === 'pending');
  const resolvedEmergencies = relevantEmergencies.filter((e) => e.status === 'resolved');

  return (
    <div className="space-y-6">
      {/* Emergencias pendientes */}
      {pendingEmergencies.length > 0 && (
        <div>
          <div className="flex items-center gap-2 mb-4">
            <AlertTriangle className="w-5 h-5 text-red-600" />
            <h4 className="text-red-600">Emergencias Pendientes ({pendingEmergencies.length})</h4>
          </div>
          <div className="space-y-3">
            {pendingEmergencies.map((emergency) => (
              <div
                key={emergency.id}
                className="p-4 bg-red-50 border-2 border-red-300 rounded-lg"
              >
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <AlertTriangle className="w-6 h-6 text-red-600" />
                    <div>
                      <h4 className="text-red-900">{emergency.type}</h4>
                      <div className="flex items-center gap-2 text-sm text-red-700">
                        <User className="w-4 h-4" />
                        {emergency.userName}
                      </div>
                    </div>
                  </div>
                  <Badge className="bg-red-600 text-white">
                    Pendiente
                  </Badge>
                </div>
                <p className="text-sm text-red-900 mb-2">{emergency.description}</p>
                <div className="flex items-center gap-4 text-sm text-red-700">
                  <div className="flex items-center gap-1">
                    <Clock className="w-4 h-4" />
                    {new Date(emergency.date).toLocaleDateString('es-MX')} - {emergency.time}
                  </div>
                  <div>Atendido por: {emergency.resolvedBy}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Emergencias resueltas */}
      <div>
        <div className="flex items-center gap-2 mb-4">
          <CheckCircle className="w-5 h-5 text-green-600" />
          <h4>Emergencias Resueltas ({resolvedEmergencies.length})</h4>
        </div>
        {resolvedEmergencies.length > 0 ? (
          <div className="space-y-3">
            {resolvedEmergencies.map((emergency) => (
              <div
                key={emergency.id}
                className="p-4 bg-white border border-gray-200 rounded-lg hover:border-green-300 transition-colors"
              >
                <div className="flex items-start justify-between mb-2">
                  <div className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-green-600" />
                    <div>
                      <h4>{emergency.type}</h4>
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <User className="w-4 h-4" />
                        {emergency.userName}
                      </div>
                    </div>
                  </div>
                  <Badge className="bg-green-100 text-green-800">
                    Resuelta
                  </Badge>
                </div>
                <p className="text-sm text-muted-foreground mb-2">{emergency.description}</p>
                <div className="flex items-center gap-4 text-sm text-muted-foreground">
                  <div className="flex items-center gap-1">
                    <Clock className="w-4 h-4" />
                    {new Date(emergency.date).toLocaleDateString('es-MX')} - {emergency.time}
                  </div>
                  <div>Atendido por: {emergency.resolvedBy}</div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-8 text-muted-foreground">
            <CheckCircle className="w-12 h-12 mx-auto mb-2 opacity-50" />
            <p>No hay emergencias resueltas</p>
          </div>
        )}
      </div>

      {relevantEmergencies.length === 0 && (
        <div className="text-center py-12 text-muted-foreground">
          <AlertTriangle className="w-12 h-12 mx-auto mb-4 opacity-50" />
          <p>No hay emergencias registradas</p>
        </div>
      )}
    </div>
  );
}
