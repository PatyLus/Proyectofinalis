import { mockUsers, mockResponsibles, mockPrescriptions } from '../../data/mockData';
import { Card } from '../ui/card';
import { Badge } from '../ui/badge';
import { Progress } from '../ui/progress';
import { AlertCircle, Heart, Pill, Activity, Phone } from 'lucide-react';

interface PatientStatusProps {
  responsibleId: string;
}

export function PatientStatus({ responsibleId }: PatientStatusProps) {
  const responsible = mockResponsibles.find((r) => r.id === responsibleId);
  const patients = mockUsers.filter((u) => responsible?.assignedPatients.includes(u.id));

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'stable':
        return 'bg-green-100 text-green-800 border-green-300';
      case 'attention':
        return 'bg-yellow-100 text-yellow-800 border-yellow-300';
      case 'critical':
        return 'bg-red-100 text-red-800 border-red-300';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-300';
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'stable':
        return 'Estable';
      case 'attention':
        return 'Requiere Atención';
      case 'critical':
        return 'Crítico';
      default:
        return status;
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'stable':
        return <Heart className="w-6 h-6 text-green-600" />;
      case 'attention':
        return <AlertCircle className="w-6 h-6 text-yellow-600" />;
      case 'critical':
        return <AlertCircle className="w-6 h-6 text-red-600" />;
      default:
        return <Activity className="w-6 h-6 text-gray-600" />;
    }
  };

  const getHealthScore = (status: string) => {
    switch (status) {
      case 'stable':
        return 85;
      case 'attention':
        return 60;
      case 'critical':
        return 30;
      default:
        return 50;
    }
  };

  return (
    <div className="grid md:grid-cols-2 gap-6">
      {patients.map((patient) => {
        const patientPrescriptions = mockPrescriptions.filter((p) => p.userId === patient.id);
        const healthScore = getHealthScore(patient.status);

        return (
          <Card key={patient.id} className={`border-2 ${getStatusColor(patient.status)}`}>
            <div className="p-6">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className={`w-16 h-16 rounded-full flex items-center justify-center ${getStatusColor(patient.status)}`}>
                    {getStatusIcon(patient.status)}
                  </div>
                  <div>
                    <h3 className="mb-1">{patient.name}</h3>
                    <p className="text-sm text-muted-foreground">
                      {patient.age} años • Habitación {patient.room}
                    </p>
                  </div>
                </div>
                <Badge className={getStatusColor(patient.status)}>
                  {getStatusLabel(patient.status)}
                </Badge>
              </div>

              {/* Estado de salud general */}
              <div className="mb-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm">Estado de Salud General</span>
                  <span className="text-sm">{healthScore}%</span>
                </div>
                <Progress value={healthScore} className="h-2" />
              </div>

              {/* Alertas */}
              {patient.status !== 'stable' && (
                <div className={`p-3 rounded-lg mb-4 ${
                  patient.status === 'critical' ? 'bg-red-50 border border-red-200' : 'bg-yellow-50 border border-yellow-200'
                }`}>
                  <div className="flex items-start gap-2">
                    <AlertCircle className={`w-5 h-5 mt-0.5 ${
                      patient.status === 'critical' ? 'text-red-600' : 'text-yellow-600'
                    }`} />
                    <div className="flex-1">
                      <p className="font-medium text-sm mb-1">
                        {patient.status === 'critical' ? '⚠️ ATENCIÓN URGENTE REQUERIDA' : 'Requiere Monitoreo'}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        {patient.status === 'critical'
                          ? 'Por favor, contacte al cuidador o personal médico de inmediato.'
                          : 'Monitorear signos vitales con frecuencia.'}
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {/* Información adicional */}
              <div className="space-y-3">
                <div className="flex items-center justify-between py-2 border-t">
                  <div className="flex items-center gap-2 text-sm">
                    <Pill className="w-4 h-4 text-muted-foreground" />
                    <span>Medicamentos activos</span>
                  </div>
                  <Badge variant="outline">{patientPrescriptions.length}</Badge>
                </div>

                <div className="flex items-center justify-between py-2 border-t">
                  <div className="flex items-center gap-2 text-sm">
                    <Heart className="w-4 h-4 text-muted-foreground" />
                    <span>Cuidador asignado</span>
                  </div>
                  <span className="text-sm">{patient.assignedCaregiver}</span>
                </div>

                <div className="py-2 border-t">
                  <div className="flex items-center gap-2 text-sm mb-2">
                    <Phone className="w-4 h-4 text-muted-foreground" />
                    <span>Contacto de emergencia</span>
                  </div>
                  <div className="bg-gray-50 rounded p-2">
                    <p className="text-sm font-medium">{patient.emergencyContact.name}</p>
                    <p className="text-sm text-muted-foreground">
                      {patient.emergencyContact.phone} ({patient.emergencyContact.relationship})
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </Card>
        );
      })}
    </div>
  );
}
