
import Globalstyles from "../styles/Globalstyles";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import Dashboard from "../pages/Dashboard";
import Account from "../pages/Account";
import Bookings from "../pages/Bookings";
import Cabins from "../pages/Cabins";
import Login from "../pages/Login";
import Settings from "../pages/Settings";
import Users from "../pages/Users";
import PageNotFound from "../pages/PageNotFound";
import AppLayout from "../ui/AppLayout";
import { Toaster } from "react-hot-toast";
import Booking from "../pages/Booking";
import Checkin from "../pages/Checkin";


export default function App(){

  const queryClient=new QueryClient({
    defaultOptions:{
      queries:{
        staleTime:0,
      }
    }
  })
  return <>
  <QueryClientProvider client={queryClient}>
    <ReactQueryDevtools initialIsOpen={false}/>
   
  <Globalstyles/>
  <BrowserRouter>
  <Routes>
    <Route element={<AppLayout/>}>
    <Route index element={<Navigate replace to="dashboard"/>}/>
    <Route path="dashboard" element={<Dashboard/>}/>
    <Route path="account" element={<Account/>}/>
    <Route path="bookings" element={<Bookings/>}/>
    <Route path="bookings/:bookingId" element={<Booking/>}/>
    <Route path="checkin/:bookingId" element={<Checkin/>}/>
    <Route path="cabins" element={<Cabins/>}/>
    <Route path="users" element={<Users/>}/>
    <Route path="settings" element={<Settings/>}/>
    </Route>
    <Route path="login" element={<Login/>}/>
    <Route path="*" element={<PageNotFound/>}/>
  </Routes>
  <Toaster
  position="top-center"
  reverseOrder={false}
  />
  </BrowserRouter>
  </QueryClientProvider>

  </>
}

