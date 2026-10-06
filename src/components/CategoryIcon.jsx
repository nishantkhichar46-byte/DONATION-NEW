import React from 'react';
import { 
  Shirt, 
  BookOpen, 
  Utensils, 
  Smile, 
  Armchair, 
  Laptop, 
  HeartPulse, 
  CircleDollarSign, 
  Package,
  Baby,
  Users,
  UserCheck,
  Home,
  HeartHandshake,
  Activity,
  GraduationCap,
  PawPrint,
  Flame,
  HelpCircle
} from 'lucide-react';

export default function CategoryIcon({ name, size = 24, color }) {
  const iconProps = { size, color };

  switch (name) {
    case 'Shirt':
      return <Shirt {...iconProps} />;
    case 'BookOpen':
      return <BookOpen {...iconProps} />;
    case 'Utensils':
      return <Utensils {...iconProps} />;
    case 'Smile':
      return <Smile {...iconProps} />;
    case 'Armchair':
      return <Armchair {...iconProps} />;
    case 'Laptop':
      return <Laptop {...iconProps} />;
    case 'HeartPulse':
      return <HeartPulse {...iconProps} />;
    case 'CircleDollarSign':
      return <CircleDollarSign {...iconProps} />;
    case 'Package':
      return <Package {...iconProps} />;
    case 'Baby':
      return <Baby {...iconProps} />;
    case 'Users':
      return <Users {...iconProps} />;
    case 'UserCheck':
      return <UserCheck {...iconProps} />;
    case 'Home':
      return <Home {...iconProps} />;
    case 'HeartHandshake':
      return <HeartHandshake {...iconProps} />;
    case 'Activity':
      return <Activity {...iconProps} />;
    case 'GraduationCap':
      return <GraduationCap {...iconProps} />;
    case 'PawPrint':
      return <PawPrint {...iconProps} />;
    case 'Flame':
      return <Flame {...iconProps} />;
    default:
      return <HelpCircle {...iconProps} />;
  }
}
