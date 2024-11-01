import React from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Home from '../pages/user/Home';
import AllConcert from '../pages/user/AllConcert';
import Concert_Detail from '../pages/user/Concert_Detail';
import Merchandise from '../pages/user/Merchandise';
import Puschase_Ticket from '../pages/user/Purchase_Ticket';
import Payment from '../pages/user/Payment';
import Help from '../pages/user/Help';
import Profile from '../pages/user/Profile';
import My_Ticket from '../pages/user/My_ticket';
import Ticket_Details from '../pages/user/Ticket_Details';
import E_Ticket from '../pages/user/E_Ticket';
import Login from '../pages/auth/Login';
import Register from '../pages/auth/Register';
import Create_Password from '../pages/auth/Create_Password';
import Forgot_Password from '../pages/auth/Forgot_Password';
import Check_Inbox from '../pages/auth/Check_Inbox';
import Dashboard from '../pages/admin/Dashboard';
import Concert_Management from '../pages/admin/Concert_Management';
import Add_Concert from '../pages/admin/Add_Concert';
import Dashboard_Concert_Detail from '../pages/admin/Dashboard_Concert_Detail';
import Navbar1 from '../components/Navbar1';
import SidebarAdmin from '../components/SidebarAdmin';
import Navbar_user from '../components/Navbar_user';
import Navbar_onlyLogo from '../components/Navbar_onlyLogo';
import ProtectRouteUser from './ProtectRouteUser';
import ProtectRouteAdmin from './ProtectRouteAdmin';
import Add_Ticket from '../pages/admin/Add_Ticket';
import Checkout from '../pages/user/Checkout';
import Layout from '../components/Layout';
import Edit_Concert from '../pages/admin/Edit_Concert';


const router = createBrowserRouter([
    {
        element: <Layout />, 
        children: [
            { path: '/', element: <Home /> },
            { path: 'allconcert', element: <AllConcert /> },
            { path: 'concertdetail/:id', element: <Concert_Detail /> },
            { path: 'merchandise', element: <Merchandise /> },
            { path: 'help', element: <Help /> },
        ]
    },
    {
        path: '/',
        element: <Navbar_onlyLogo />,
        children: [
            { path: 'login', element: <Login /> },
            { path: 'register', element: <Register /> }, 
            { path: 'createpassword', element: <Create_Password /> },
            { path: 'forgotpassword', element: <Forgot_Password /> },
            { path: 'checkinbox', element: <Check_Inbox /> },
        
        ]
    },
    {
        path: '/admin',
        element: <ProtectRouteAdmin element={<SidebarAdmin />} />,
        children:[
            { path:'/admin', element: <Dashboard /> },
            { path: 'concertmanagement', element: <Concert_Management /> },
            { path: 'addconcert', element: <Add_Concert /> },
            { path: 'dashboardconcert', element: <Dashboard_Concert_Detail /> },
            { path: 'dashboardconcert/:id', element: <Dashboard_Concert_Detail /> },
            { path: 'addticket', element: <Add_Ticket /> },
            { path: 'editconcert/:id', element:<Edit_Concert />}
            
        ]
    },
    {
        path:'/user',
        //element: <Navbar_user />,
        element:<ProtectRouteUser element={<Navbar1 />} />,
        children:[
            { path: 'puschaseticket/:id', element: <Puschase_Ticket /> },
            { path: 'payment', element: <Payment /> },
            { path: 'profile', element: <Profile /> },
            { path: 'myticket', element: <My_Ticket /> },
            { path: 'ticketdetails/:id', element: <Ticket_Details /> },
            { path: 'eticket/:orderId/:ticketId', element: <E_Ticket /> },
            { path: 'checkout', element: <Checkout /> },
            { path: 'allconcert', element: <AllConcert /> },
            { path: 'concertdetail/:id', element: <Concert_Detail /> },
            { path: 'merchandise', element: <Merchandise /> },
            { path: 'help', element: <Help /> },
        ]
    },
    
])

const AppRoutes = () => {
    return (
        <>
            <RouterProvider router={router} />
        </>
    )
}

export default AppRoutes