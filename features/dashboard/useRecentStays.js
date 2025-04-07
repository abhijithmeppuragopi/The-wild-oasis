import { useQuery } from "@tanstack/react-query";
import { subDays } from "date-fns";
import { useSearchParams } from "react-router-dom"
import { getStaysAfterDate } from "../../services/apiBookings";

export default function useRecentStays(){
    const [searchParams]=useSearchParams();
    const numDays=Number(searchParams.get('last')) || 7;
    const queryDate=subDays(new Date(),numDays).toISOString();

    const{data,isLoading:isLoading2}=useQuery({
        queryFn:getStaysAfterDate(queryDate),
        queryKey:['bookings',`last ${numDays}`]
        
    })
    console.log(data,'stays');
    const confirmedStays=data?.filter((data)=>data.status==='checked-in'|| data.status==='checked-out');
    console.log(confirmedStays,'confirmed stays')

    return {data,isLoading2,confirmedStays,numDays}
}