import { useState } from 'react';
import { mockPrescriptions, mockUsers, mockCaregivers } from '../../data/mockData';
import { Badge } from '../ui/badge';
import { Button } from '../ui/button';
import { Checkbox } from '../ui/checkbox';
import { Clock, Pill, User, CheckCircle } from 'lucide-react';

interface MedicationScheduleProps {
  caregiverId: string;
}

export function MedicationSchedule({ caregiverId }: MedicationScheduleProps) {
  const [administeredMeds, setAdministeredMeds] = useState<Set<string>>(new Set());

  const caregiver = mockCaregivers.find((c) => c.id === caregiverId);
  const patients = mockUsers.filter((u) => caregiver?.assignedPatients.includes(u.id));

  // Obtener todas las recetas de los pacientes asignados
  const relevantPrescriptions = mockPrescriptions.filter((p) =>
    patients.some((patient) => patient.id === p.userId)
  );

  // Agrupar por horario
  const scheduleMap = new Map<string, Array<{ prescription: typeof mockPrescriptions[0]; patient: typeof patients[0] }>>();

  relevantPrescriptions.forEach((prescription) => {
    const patient = patients.find((p) => p.id === prescription.userId);
    if (patient) {
      prescription.schedule.forEach((time) => {
        if (!scheduleMap.has(time)) {
          scheduleMap.set(time, []);
        }
        scheduleMap.get(time)?.push({ prescription, patient });
      });
    }
  });

  // Ordenar por horario
  const sortedSchedule = Array.from(scheduleMap.entries()).sort((a, b) => {
    return a[0].localeCompare(b[0]);
  });

  const toggleMedication = (id: string) => {
    const newSet = new Set(administeredMeds);
    if (newSet.has(id)) {
      newSet.delete(id);
    } else {
      newSet.add(id);
    }
    setAdministeredMeds(newSet);
  };

  const getCurrentHour = () => {
    return new Date().getHours();
  };

  const isTimeInPast = (time: string) => {
    const [hours] = time.split(':').map(Number);
    return hours < getCurrentHour();
  };

  return (
    <div className="space-y-6">
      {sortedSchedule.map(([time, medications]) => {
        const isPast = isTimeInPast(time);
        const allAdministered = medications.every((med) =>
          administeredMeds.has(`${med.prescription.id}-${time}`)
        );

        return (
          <div key={time} className={`border-l-4 pl-4 ${allAdministered ? 'border-green-500' : isPast ? 'border-red-500' : 'border-blue-500'}`}>
            <div className="flex items-center gap-3 mb-3">
              <div className={`w-12 h-12 rounded-full flex items-center justify-center ${allAdministered ? 'bg-green-100' : isPast ? 'bg-red-100' : 'bg-blue-100'}`}>
                {allAdministered ? (
                  <CheckCircle className={`w-6 h-6 ${allAdministered ? 'text-green-600' : 'text-blue-600'}`} />
                ) : (
                  <Clock className={`w-6 h-6 ${isPast ? 'text-red-600' : 'text-blue-600'}`} />
                )}
              </div>
              <div>
                <h4>{time}</h4>
                <p className="text-sm text-muted-foreground">
                  {medications.length} medicamento{medications.length !== 1 ? 's' : ''}
                  {allAdministered && ' - Completado'}
                  {isPast && !allAdministered && ' - Pendiente'}
                </p>
              </div>
            </div>

            <div className="space-y-3 ml-15">
              {medications.map((med) => {
                const medId = `${med.prescription.id}-${time}`;
                const isAdministered = administeredMeds.has(medId);

                return (
                  <div
                    key={medId}
                    className={`p-4 rounded-lg border-2 transition-all ${
                      isAdministered
                        ? 'bg-green-50 border-green-300'
                        : 'bg-white border-gray-200 hover:border-blue-300'
                    }`}
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <div className="flex items-center gap-2">
                            <User className="w-4 h-4 text-muted-foreground" />
                            <span>{med.patient.name}</span>
                            <Badge variant="outline" className="text-xs">
                              Hab. {med.patient.room}
                            </Badge>
                          </div>
                        </div>
                        <div className="flex items-center gap-2 mb-1">
                          <Pill className="w-5 h-5 text-blue-600" />
                          <span className="font-medium">{med.prescription.medication}</span>
                          <Badge>{med.prescription.dosage}</Badge>
                        </div>
                        {med.prescription.notes && (
                          <p className="text-sm text-muted-foreground mt-2 bg-yellow-50 border border-yellow-200 rounded p-2">
                            ⚠️ {med.prescription.notes}
                          </p>
                        )}
                      </div>
                      <div className="flex items-center gap-2">
                        {isAdministered ? (
                          <Badge className="bg-green-600 text-white">
                            <CheckCircle className="w-3 h-3 mr-1" />
                            Administrado
                          </Badge>
                        ) : (
                          <Button
                            size="sm"
                            onClick={() => toggleMedication(medId)}
                          >
                            Marcar como administrado
                          </Button>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        );
      })}

      {sortedSchedule.length === 0 && (
        <div className="text-center py-12 text-muted-foreground">
          <Clock className="w-12 h-12 mx-auto mb-4 opacity-50" />
          <p>No hay medicamentos programados para hoy</p>
        </div>
      )}
    </div>
  );
}
