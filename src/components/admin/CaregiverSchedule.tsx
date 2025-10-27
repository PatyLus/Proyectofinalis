import { mockCaregivers } from '../../data/mockData';
import { Badge } from '../ui/badge';
import { Clock, User } from 'lucide-react';

export function CaregiverSchedule() {
  const getShiftLabel = (shift: string) => {
    switch (shift) {
      case 'morning':
        return 'Matutino (6:00 - 14:00)';
      case 'afternoon':
        return 'Vespertino (14:00 - 22:00)';
      case 'night':
        return 'Nocturno (22:00 - 6:00)';
      default:
        return shift;
    }
  };

  const getShiftColor = (shift: string) => {
    switch (shift) {
      case 'morning':
        return 'bg-yellow-100 text-yellow-800 border-yellow-300';
      case 'afternoon':
        return 'bg-orange-100 text-orange-800 border-orange-300';
      case 'night':
        return 'bg-blue-100 text-blue-800 border-blue-300';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const sortedCaregivers = [...mockCaregivers].sort((a, b) => {
    const order = { morning: 0, afternoon: 1, night: 2 };
    return order[a.shift as keyof typeof order] - order[b.shift as keyof typeof order];
  });

  return (
    <div className="space-y-3">
      {sortedCaregivers.map((caregiver) => (
        <div key={caregiver.id} className={`p-4 rounded-lg border-2 ${getShiftColor(caregiver.shift)}`}>
          <div className="flex items-start justify-between mb-2">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <User className="w-4 h-4" />
                <span>{caregiver.name}</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <Clock className="w-4 h-4" />
                <span>{getShiftLabel(caregiver.shift)}</span>
              </div>
            </div>
            <Badge variant="outline" className="bg-white">
              {caregiver.assignedPatients.length} pacientes
            </Badge>
          </div>
        </div>
      ))}
    </div>
  );
}
