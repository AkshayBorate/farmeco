import React from "react";
import { createBrowserRouter } from "react-router-dom";
import App from "./App";
import About from "./components/about/About";
import Login from "./components/login/Login";
import Contact from "./components/contact/Contact";
import Blog from "./components/blog/Blog";
import Pricing from "./components/pricing/Pricing";
import Home from "./components/home/Home";
import Signup from "./components/login/Signup";
import Demo from "./components/home/Demo";
import Serve from "./components/common/footer/Serve";
import AdminLogin from "./components/login/AdminLogin";
import EmployeeLogin from "./components/login/EmployeeLogin";
import TermsAndConditions from "./components/common/footer/TermsAndConditions";
import PrivacyPolicy from "./components/common/footer/PrivacyPolicy";
import FeedbackForm from "./components/feedback/FeedBack";
import Adminpage from "./components/admin/Adminpage";
import EmployeeRegister from "./components/admin/EmployeeRegister";
import AdminHome from "./components/admin/AdminHome";
import Loginc from "./components/login/Loginc";
import { Outlet } from "react-router-dom";
import AllEmpoyee from "./components/admin/AllEmpoyee";
import Alluser from "./components/admin/Alluser";
import PaymentPage from "./components/pricing/PaymentPage";
import EmployeeHeader from "./components/Employee/EmployeeHeader";
import WasteIntake from "./components/Employee/WasteIntake";
import ProcessingStatus from "./components/Employee/ProcessingStatus";
import ProductListing from "./components/Employee/ProductListing";
import Dashboard from "./components/Employee/Dashboard";
import TotalPickups from "./components/admin/TotalPickups";
import PendingApproval from "./components/admin/PendingApproval";
import Reviews from "./components/admin/Reviews";
import CustHeader from "./components/customer/CustHeader";
import Homecust from "./components/customer/Homecust";
 import History from "./components/customer/History";
 import SellWaste from "./components/customer/SellWaste";
 import FarmerDashboard from "./components/customer/Dashboard";
import EditProfile from "./components/customer/EditProfile";
import Footer from "./components/common/footer/Footer";
import FeedbackForm1 from "./components/customer/FeedBack1";
import Contact1 from "./components/customer/Contact1";
import ViewRecords from "./components/Employee/ViewRecords";
import AddStock from "./components/Employee/AddStock";
import Stock from "./components/admin/Stock";
import GetQueries from "./components/Employee/GetQueries";
import ForgotPassword from "./components/login/ForgotPassword";
import Marketplace from "./components/customer/Marketplace";
import MarketplaceSellWaste from "./components/customer/MarketplaceSellWaste";
import MarketplaceBuyWaste from "./components/customer/MarketplaceBuyWaste";
import MyOrders from "./components/customer/MyOrders";
import MyPreviousOrders from "./components/customer/MyPreviousOrders";



const routing = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { path: "/", element: <Home /> },
      { path: "about", element: <About /> },
      { path: "pricing", element: <Pricing /> },
      { path: "payment", element: <PaymentPage /> },
      { path: "journal", element: <Blog /> },
      { path: "contact", element: <Contact /> },
      { path: "logins", element: <Login /> },
      { path: "signup", element: <Signup /> },
      { path: "adminlogin", element: <AdminLogin /> },
      { path: "employeelogin", element: <EmployeeLogin /> },
      { path: "services", element: <Serve /> },
      { path: "demo", element: <Demo /> },
      { path: "termsandconditions", element: <TermsAndConditions /> },
      { path: "privacy", element: <PrivacyPolicy /> },
      { path: "feedback", element: <FeedbackForm /> },
      { path: "forpass", element: <ForgotPassword /> },
      { path: "loginc", element: <Loginc /> },
    ],
  },
  {
    path: "/admindash",
    element: (
      <>
        <Adminpage />
        <Outlet />
      </>
    ),
    children: [
      { path: "home", element: <AdminHome /> },
      { path: "empcreate", element: <EmployeeRegister /> },
      { path: "allemp", element: <AllEmpoyee /> },
      { path: "alluser", element: <Alluser /> },
      { path: "totalpickups", element: <TotalPickups /> },
      { path: "pendingapproval", element: <PendingApproval /> },
      { path: "reviews", element: <Reviews /> },
      { path: "stock", element: <Stock /> },
    ],
  },
  {
    path: "/empdash",
    element: (
      <>
        <EmployeeHeader />
        <Outlet />
      </>
    ),
    children: [
      { path: "wasteintake", element: <WasteIntake /> },
      { path: "processingstatus", element: <ProcessingStatus /> },
      { path: "productlisting", element: <ProductListing/> },
      { path: "dashboard", element: <Dashboard/> },
      { path: "viewrecords", element: <ViewRecords/> },
      { path: "addstock", element: <AddStock/> },
      { path: "queries", element: <GetQueries/> },
    ],
  },

  {
    path: "/custheader",
    element: (
      <>
        <CustHeader />
        <Outlet />
        <Footer/>
      </>
    ),
    children: [
      {path: "homecust", element: <Homecust />,},
       { path: "history",  element: <History />,},
       {path:"sellwaste", element: <SellWaste />,},
       {path: "dashboard",element: <FarmerDashboard />,},
       {path: "editprofile",element:<EditProfile />,},
       {path: "feedback1",element:<FeedbackForm1 />,},
       {path: "contact1",element:<Contact1 />,},
       {
        path: "marketplace",
        element: <Marketplace />,
       },
          
              { path: "sell", element: <MarketplaceSellWaste /> },
              { path: "buy", element: <MarketplaceBuyWaste /> },
              { path: "orders", element: <MyOrders /> },
              { path: "myorders", element: <MyPreviousOrders /> },
            
        
          
    ],
  },  
]);

export default routing;
