// import withAuth from './withAuth';  // Import the HOC
import WithAuth from '../auth/WithAuth';
// import DashboardLayout from './Layouts/DashboardLayout';
import UserLayout from './UserLayout';
// import DashboardLayout from './DashboardLayout';  // Import the Dashboard Layout

const ProtectedDashboard = WithAuth(UserLayout);  // Wrap with HOC

export default ProtectedDashboard;