import { HiOutlineBriefcase, HiOutlineCalendarDays, HiOutlineChartBar, HiOutlineCurrencyEuro } from "react-icons/hi2";
import Stat from "./Stat";
import useRecentBookings from "./useRecentBookings";

export default function Stats({bookings,stays,confirmedStays}){
    const numOfBookings=bookings.length;
    const sales=bookings.reduce((acc,bookings)=>acc+bookings.totalPrice,0);
    const checkins=confirmedStays.length;

    return <>
    <Stat icon={<HiOutlineBriefcase/>}
    title='Bookings'
    value={numOfBookings}
    color='blue'/>
     <Stat icon={<HiOutlineCurrencyEuro/>}
    title='Sales'
    value={sales}
    color='green'/>
     <Stat icon={<HiOutlineCalendarDays/>}
    title='Check-ins'
    value={checkins}
    color='indigo'/>
     <Stat icon={<HiOutlineChartBar/>}
    title='Occupancy rate'
    value={numOfBookings}
    color='yellow'/>
    </>
}