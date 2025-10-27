import { useState } from 'react';
import { LoginSelector } from './components/LoginSelector';
import { AdminDashboard } from './components/admin/AdminDashboard';
import { CaregiverDashboard } from './components/caregiver/CaregiverDashboard';
import { ResponsibleDashboard } from './components/responsible/ResponsibleDashboard';
import { UserRole } from './types';

export default function App() {
  const [currentRole, setCurrentRole] = useState<UserRole | null>(null);

  const handleLogout = () => {
    setCurrentRole(null);
  };

  if (!currentRole) {
    return <LoginSelector onSelectRole={setCurrentRole} />;
  }

  switch (currentRole) {
    case 'admin':
      return <AdminDashboard onLogout={handleLogout} />;
    case 'caregiver':
      return <CaregiverDashboard onLogout={handleLogout} />;
    case 'responsible':
      return <ResponsibleDashboard onLogout={handleLogout} />;
    default:
      return <LoginSelector onSelectRole={setCurrentRole} />;
  }
}
