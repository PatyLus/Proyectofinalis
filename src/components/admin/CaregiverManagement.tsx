import { useState } from 'react';
import { Card } from '../ui/card';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '../ui/dialog';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../ui/table';
import { Plus, Edit, Mail, Phone } from 'lucide-react';
import { mockCaregivers, mockUsers } from '../../data/mockData';

export function CaregiverManagement() {
  const [caregivers] = useState(mockCaregivers);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);

  const getShiftLabel = (shift: string) => {
    switch (shift) {
      case 'morning':
        return 'Matutino';
      case 'afternoon':
        return 'Vespertino';
      case 'night':
        return 'Nocturno';
      default:
        return shift;
    }
  };

  const getShiftColor = (shift: string) => {
    switch (shift) {
      case 'morning':
        return 'bg-yellow-100 text-yellow-800';
      case 'afternoon':
        return 'bg-orange-100 text-orange-800';
      case 'night':
        return 'bg-blue-100 text-blue-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getPatientNames = (patientIds: string[]) => {
    return patientIds
      .map((id) => mockUsers.find((u) => u.id === id)?.name)
      .filter(Boolean)
      .join(', ');
  };

  return (
    <Card className="p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="mb-1">Cuidadores</h3>
          <p className="text-sm text-muted-foreground">
            Gestiona el personal de cuidado
          </p>
        </div>
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="w-4 h-4 mr-2" />
              Agregar Cuidador
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Agregar Nuevo Cuidador</DialogTitle>
            </DialogHeader>
            <form className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="caregiverName">Nombre Completo</Label>
                <Input id="caregiverName" placeholder="Ej: Ana López" />
              </div>

              <div className="space-y-2">
                <Label htmlFor="caregiverEmail">Email</Label>
                <Input id="caregiverEmail" type="email" placeholder="ana.lopez@casahogar.com" />
              </div>

              <div className="space-y-2">
                <Label htmlFor="caregiverPhone">Teléfono</Label>
                <Input id="caregiverPhone" placeholder="+52 555-1111" />
              </div>

              <div className="space-y-2">
                <Label htmlFor="shift">Turno</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Seleccionar turno" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="morning">Matutino (6:00 - 14:00)</SelectItem>
                    <SelectItem value="afternoon">Vespertino (14:00 - 22:00)</SelectItem>
                    <SelectItem value="night">Nocturno (22:00 - 6:00)</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="flex justify-end gap-2 pt-4">
                <Button type="button" variant="outline" onClick={() => setIsAddDialogOpen(false)}>
                  Cancelar
                </Button>
                <Button type="submit">Guardar Cuidador</Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <div className="border rounded-lg overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Nombre</TableHead>
              <TableHead>Contacto</TableHead>
              <TableHead>Turno</TableHead>
              <TableHead>Pacientes Asignados</TableHead>
              <TableHead>Acciones</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {caregivers.map((caregiver) => (
              <TableRow key={caregiver.id}>
                <TableCell>{caregiver.name}</TableCell>
                <TableCell>
                  <div className="space-y-1">
                    <div className="flex items-center gap-2 text-sm">
                      <Mail className="w-4 h-4 text-muted-foreground" />
                      {caregiver.email}
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <Phone className="w-4 h-4 text-muted-foreground" />
                      {caregiver.phone}
                    </div>
                  </div>
                </TableCell>
                <TableCell>
                  <Badge className={getShiftColor(caregiver.shift)}>
                    {getShiftLabel(caregiver.shift)}
                  </Badge>
                </TableCell>
                <TableCell>
                  <div className="text-sm">
                    {getPatientNames(caregiver.assignedPatients)}
                    <div className="text-muted-foreground">
                      ({caregiver.assignedPatients.length} paciente{caregiver.assignedPatients.length !== 1 ? 's' : ''})
                    </div>
                  </div>
                </TableCell>
                <TableCell>
                  <Button variant="ghost" size="sm">
                    <Edit className="w-4 h-4" />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </Card>
  );
}
