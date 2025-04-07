import styled from "styled-components";
import useRecentBookings from "./useRecentBookings";
import Spinner from "../../ui/Spinner";
import useRecentStays from "./useRecentStays";
import Stats from "./Stats";
import SalesChart from "./SalesChart";
import DurationChart from "./DurationChart";

const StyledDashboardLayout = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  grid-template-rows: auto 34rem auto;
  gap: 2.4rem;
`;

export default function DashboardLAyout(){
  const{bookings,isLoading}=useRecentBookings();
  const{stays,isLoading2,confirmedStays,numDays}=useRecentStays();
  if(isLoading, isLoading2) return <Spinner/>

  return <StyledDashboardLayout>
    <Stats bookings={bookings} stays={stays} confirmedStays={confirmedStays}/>
    <p>gvjkjl</p>
    <DurationChart confirmedStays={confirmedStays}/>


    <SalesChart bookings={bookings} numDays={numDays}/>
      </StyledDashboardLayout>
}