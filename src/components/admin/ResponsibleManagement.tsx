import { useState } from 'react';
import { Card } from '../ui/card';
import { Button } from '../ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '../ui/dialog';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../ui/table';
import { Plus, Edit, Mail, Phone } from 'lucide-react';
import { mockResponsibles, mockUsers } from '../../data/mockData';

export function ResponsibleManagement() {
  const [responsibles] = useState(mockResponsibles);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);

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
          <h3 className="mb-1">Responsables</h3>
          <p className="text-sm text-muted-foreground">
            Gestiona los responsables de los usuarios
          </p>
        </div>
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="w-4 h-4 mr-2" />
              Agregar Responsable
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Agregar Nuevo Responsable</DialogTitle>
            </DialogHeader>
            <form className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="responsibleName">Nombre Completo</Label>
                <Input id="responsibleName" placeholder="Ej: Carlos Ramírez" />
              </div>

              <div className="space-y-2">
                <Label htmlFor="responsibleEmail">Email</Label>
                <Input id="responsibleEmail" type="email" placeholder="carlos.ramirez@email.com" />
              </div>

              <div className="space-y-2">
                <Label htmlFor="responsiblePhone">Teléfono</Label>
                <Input id="responsiblePhone" placeholder="+52 555-4444" />
              </div>

              <div className="flex justify-end gap-2 pt-4">
                <Button type="button" variant="outline" onClick={() => setIsAddDialogOpen(false)}>
                  Cancelar
                </Button>
                <Button type="submit">Guardar Responsable</Button>
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
              <TableHead>Pacientes Asignados</TableHead>
              <TableHead>Acciones</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {responsibles.map((responsible) => (
              <TableRow key={responsible.id}>
                <TableCell>{responsible.name}</TableCell>
                <TableCell>
                  <div className="space-y-1">
                    <div className="flex items-center gap-2 text-sm">
                      <Mail className="w-4 h-4 text-muted-foreground" />
                      {responsible.email}
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <Phone className="w-4 h-4 text-muted-foreground" />
                      {responsible.phone}
                    </div>
                  </div>
                </TableCell>
                <TableCell>
                  <div className="text-sm">
                    {getPatientNames(responsible.assignedPatients)}
                    <div className="text-muted-foreground">
                      ({responsible.assignedPatients.length} paciente{responsible.assignedPatients.length !== 1 ? 's' : ''})
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
