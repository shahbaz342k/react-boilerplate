// import withAuth from './withAuth';  // Import the HOC
import WithAuth from '../auth/WithAuth';
import DashboardLayout from './Layouts/DashboardLayout';
// import DashboardLayout from './DashboardLayout';  // Import the Dashboard Layout

const ProtectedDashboard = WithAuth(DashboardLayout);  // Wrap with HOC

export default ProtectedDashboard;
