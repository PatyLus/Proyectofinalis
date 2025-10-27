import { Card } from './ui/card';
import { Button } from './ui/button';
import { UserRole } from '../types';
import { Shield, Heart, UserCheck } from 'lucide-react';

interface LoginSelectorProps {
  onSelectRole: (role: UserRole) => void;
}

export function LoginSelector({ onSelectRole }: LoginSelectorProps) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <div className="max-w-4xl w-full">
        <div className="text-center mb-12">
          <h1 className="mb-2">Sistema de Gestión - Casa Hogar</h1>
          <p className="text-muted-foreground">
            Selecciona tu perfil para continuar
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          <Card className="p-6 hover:shadow-lg transition-shadow cursor-pointer group" onClick={() => onSelectRole('admin')}>
            <div className="text-center space-y-4">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto group-hover:bg-blue-200 transition-colors">
                <Shield className="w-8 h-8 text-blue-600" />
              </div>
              <div>
                <h3 className="mb-2">Administrador</h3>
                <p className="text-muted-foreground text-sm">
                  Gestiona usuarios, cuidadores, responsables y visualiza estadísticas
                </p>
              </div>
              <Button className="w-full" onClick={() => onSelectRole('admin')}>
                Acceder como Administrador
              </Button>
            </div>
          </Card>

          <Card className="p-6 hover:shadow-lg transition-shadow cursor-pointer group" onClick={() => onSelectRole('caregiver')}>
            <div className="text-center space-y-4">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto group-hover:bg-green-200 transition-colors">
                <Heart className="w-8 h-8 text-green-600" />
              </div>
              <div>
                <h3 className="mb-2">Cuidador</h3>
                <p className="text-muted-foreground text-sm">
                  Consulta recetas médicas, horarios y contactos de emergencia
                </p>
              </div>
              <Button className="w-full" variant="outline" onClick={() => onSelectRole('caregiver')}>
                Acceder como Cuidador
              </Button>
            </div>
          </Card>

          <Card className="p-6 hover:shadow-lg transition-shadow cursor-pointer group" onClick={() => onSelectRole('responsible')}>
            <div className="text-center space-y-4">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto group-hover:bg-purple-200 transition-colors">
                <UserCheck className="w-8 h-8 text-purple-600" />
              </div>
              <div>
                <h3 className="mb-2">Responsable</h3>
                <p className="text-muted-foreground text-sm">
                  Monitorea el estado de los usuarios y emergencias
                </p>
              </div>
              <Button className="w-full" variant="outline" onClick={() => onSelectRole('responsible')}>
                Acceder como Responsable
              </Button>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
