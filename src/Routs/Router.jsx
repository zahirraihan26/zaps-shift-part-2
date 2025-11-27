import { createBrowserRouter } from "react-router";
import RootLaout from "../Laouts/RootLaout";
import Home from "../Pages/Home/Home/Home";
import Coverage from "../Pages/Coverage/Coverage";
import AuthLaout from "../Laouts/AuthLaout";
import Login from "../Pages/Auth/Login/Login";
import Register from "../Pages/Auth/Register/Register";
import Privaterouts from "./Privaterouts";
import Rider from "../Pages/Rader/Rider";
import Sendpercel from "../Pages/SendPercel/Sendpercel";
import DashboardLaout from "../Laouts/DashboardLaout";
import Myparcels from "../Pages/Dashbord/Myparcels/Myparcels";
import Payment from "../Pages/Dashbord/Payment/Payment";
import PaymentSuccess from "../Pages/Dashbord/Payment/PaymentSuccess";
// import Paymentcancel from "../Pages/Dashbord/Payment/Paymentcancel";
import PaymentCanceled from "../Pages/Dashbord/Payment/PaymentCanceled";
;

export const router = createBrowserRouter([
  {
    path: "/",
    Component:RootLaout,
    children:[
        {
            index:true,
            Component:Home
        },
        {
           path:'rider',
           element:<Privaterouts> <Rider></Rider> </Privaterouts>
        } ,
        {
          path:'send-percel',
          element:<Privaterouts><Sendpercel></Sendpercel></Privaterouts>,
          loader:()=> fetch('/serviescenter.json').then(res=>res.json())
        },
        {
            path:'coverage',
            Component:Coverage,
            loader:()=> fetch('/serviescenter.json').then(res=>res.json())
        }
    ]
  },
  {
    path:'/',
    Component : AuthLaout,
    children:[
      {
        path:'login',
        Component: Login
      },
      {
        path :'register',
        Component:Register
      }
    ]
  },
  {
    path:'dashboard',
    element:<Privaterouts><DashboardLaout></DashboardLaout></Privaterouts>,
    children:[
      {
        path:'my-parcels',
        Component:Myparcels

      },
      {
        path:'payment/:parcelId',
        Component:Payment
      },
      {
        path:'payment-success',
        Component:PaymentSuccess
      },
      {
        path:'payment-concelled',
        Component:PaymentCanceled
       
      }
    ]
  }
]);