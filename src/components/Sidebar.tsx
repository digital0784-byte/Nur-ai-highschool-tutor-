import React from 'react';
import { SidebarNavigation } from './SidebarNavigation';
import { SystemModuleId } from '../types';

export interface SidebarProps {
  activeModule: SystemModuleId;
  onSelectModule: (id: SystemModuleId) => void;
  isOpenMobile: boolean;
  onCloseMobile: () => void;
  onNavigateBack: () => void;
  canGoBack: boolean;
}

export const Sidebar: React.FC<SidebarProps> = (props) => {
  return <SidebarNavigation {...props} />;
};

export default Sidebar;
