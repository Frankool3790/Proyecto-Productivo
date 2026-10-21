import Dashboard from '../pages/Dashboard/Dashboard.jsx';
import Trips from '../pages/Trips/Trips.jsx';
import Fleet from '../pages/Fleet/Fleet.jsx';
import Documents from '../pages/Documents/Documents.jsx';
import Reports from '../pages/Reports/Reports.jsx';
import BusinessPlan from '../pages/BusinessPlan/BusinessPlan.jsx';
import ClientPortal from '../pages/ClientPortal/ClientPortal.jsx';
import AdminMovements from '../pages/AdminMovements/AdminMovements.jsx';
import Clients from '../pages/Clients/Clients.jsx';
import TravelCalendar from '../pages/TravelCalendar/TravelCalendar.jsx';

export const routes = [
  { id: 'dashboard', label: 'Panel', icon: '01', component: Dashboard },
  { id: 'movements', label: 'Movimientos', icon: '02', component: AdminMovements },
  { id: 'calendar', label: 'Calendario', icon: '03', component: TravelCalendar },
  { id: 'clients', label: 'Clientes', icon: '04', component: Clients },
  { id: 'trips', label: 'Viajes', icon: '05', component: Trips },
  { id: 'fleet', label: 'Flota', icon: '06', component: Fleet },
  { id: 'documents', label: 'Documentos', icon: '07', component: Documents },
  { id: 'reports', label: 'Reportes', icon: '08', component: Reports },
  { id: 'business-plan', label: 'Plan de negocio', icon: '09', component: BusinessPlan },
];

export const clientRoutes = [
  { id: 'client-portal', label: 'Radicar movimiento', icon: '01', component: ClientPortal },
  { id: 'client-calendar', label: 'Calendario', icon: '02', component: TravelCalendar },
];

export function renderRoute(routeId, routeList = routes) {
  const route = routeList.find((item) => item.id === routeId) || routeList[0];
  const Page = route.component;
  return <Page />;
}
