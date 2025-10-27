import { mockUsers, mockPrescriptions, mockCaregivers } from '../../data/mockData';
import { Card } from '../ui/card';
import { Badge } from '../ui/badge';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '../ui/accordion';
import { Phone, Pill, AlertCircle, User } from 'lucide-react';

interface PatientListProps {
  caregiverId: string;
}

export function PatientList({ caregiverId }: PatientListProps) {
  const caregiver = mockCaregivers.find((c) => c.id === caregiverId);
  const patients = mockUsers.filter((u) => caregiver?.assignedPatients.includes(u.id));

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'stable':
        return 'bg-green-100 text-green-800';
      case 'attention':
        return 'bg-yellow-100 text-yellow-800';
      case 'critical':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
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

  return (
    <div className="space-y-4">
      <Accordion type="single" collapsible className="space-y-4">
        {patients.map((patient) => {
          const patientPrescriptions = mockPrescriptions.filter((p) => p.userId === patient.id);

          return (
            <AccordionItem key={patient.id} value={patient.id} className="border-none">
              <Card>
                <AccordionTrigger className="px-6 py-4 hover:no-underline">
                  <div className="flex items-center justify-between w-full pr-4">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                        <User className="w-6 h-6 text-blue-600" />
                      </div>
                      <div className="text-left">
                        <div className="flex items-center gap-2">
                          <h3>{patient.name}</h3>
                          <Badge className={getStatusColor(patient.status)}>
                            {getStatusLabel(patient.status)}
                          </Badge>
                        </div>
                        <p className="text-sm text-muted-foreground">
                          Habitación {patient.room} • {patient.age} años
                        </p>
                      </div>
                    </div>
                    {patient.status === 'critical' && (
                      <AlertCircle className="w-5 h-5 text-red-600" />
                    )}
                  </div>
                </AccordionTrigger>
                <AccordionContent>
                  <div className="px-6 pb-4 space-y-6">
                    {/* Recetas médicas */}
                    <div>
                      <div className="flex items-center gap-2 mb-3">
                        <Pill className="w-5 h-5 text-blue-600" />
                        <h4>Recetas Médicas</h4>
                      </div>
                      {patientPrescriptions.length > 0 ? (
                        <div className="space-y-3">
                          {patientPrescriptions.map((prescription) => (
                            <div key={prescription.id} className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                              <div className="flex items-start justify-between mb-2">
                                <div>
                                  <p className="font-medium">{prescription.medication}</p>
                                  <p className="text-sm text-muted-foreground">
                                    Dosis: {prescription.dosage} • {prescription.frequency}
                                  </p>
                                </div>
                              </div>
                              <div className="flex gap-2 flex-wrap mt-2">
                                {prescription.schedule.map((time, idx) => (
                                  <Badge key={idx} className="bg-blue-600 text-white">
                                    {time}
                                  </Badge>
                                ))}
                              </div>
                              {prescription.notes && (
                                <div className="mt-2 text-sm bg-white rounded p-2 border border-blue-200">
                                  <span className="text-muted-foreground">Nota:</span> {prescription.notes}
                                </div>
                              )}
                            </div>
                          ))}
                        </div>
                      ) : (
                        <p className="text-sm text-muted-foreground">No hay recetas asignadas</p>
                      )}
                    </div>

                    {/* Contacto de emergencia */}
                    <div>
                      <div className="flex items-center gap-2 mb-3">
                        <Phone className="w-5 h-5 text-red-600" />
                        <h4>Contacto de Emergencia</h4>
                      </div>
                      <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="font-medium">{patient.emergencyContact.name}</p>
                            <p className="text-sm text-muted-foreground">{patient.emergencyContact.relationship}</p>
                          </div>
                          <a
                            href={`tel:${patient.emergencyContact.phone}`}
                            className="flex items-center gap-2 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
                          >
                            <Phone className="w-4 h-4" />
                            {patient.emergencyContact.phone}
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                </AccordionContent>
              </Card>
            </AccordionItem>
          );
        })}
      </Accordion>
    </div>
  );
}
