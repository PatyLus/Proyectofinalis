import { mockPrescriptions } from '../../data/mockData';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../ui/table';
import { Badge } from '../ui/badge';
import { Clock, Pill } from 'lucide-react';

export function PrescriptionView() {
  return (
    <div className="border rounded-lg overflow-hidden">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Paciente</TableHead>
            <TableHead>Medicamento</TableHead>
            <TableHead>Dosis</TableHead>
            <TableHead>Frecuencia</TableHead>
            <TableHead>Horarios</TableHead>
            <TableHead>Fecha Inicio</TableHead>
            <TableHead>Notas</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {mockPrescriptions.map((prescription) => (
            <TableRow key={prescription.id}>
              <TableCell>{prescription.userName}</TableCell>
              <TableCell>
                <div className="flex items-center gap-2">
                  <Pill className="w-4 h-4 text-blue-600" />
                  {prescription.medication}
                </div>
              </TableCell>
              <TableCell>{prescription.dosage}</TableCell>
              <TableCell>
                <Badge variant="outline">{prescription.frequency}</Badge>
              </TableCell>
              <TableCell>
                <div className="flex gap-1 flex-wrap">
                  {prescription.schedule.map((time, idx) => (
                    <Badge key={idx} className="bg-green-100 text-green-800">
                      <Clock className="w-3 h-3 mr-1" />
                      {time}
                    </Badge>
                  ))}
                </div>
              </TableCell>
              <TableCell>{new Date(prescription.startDate).toLocaleDateString('es-MX')}</TableCell>
              <TableCell className="text-sm text-muted-foreground">
                {prescription.notes || '-'}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
