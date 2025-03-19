import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { getBooking } from "../../services/apiBookings";

export default function useBooking(){
   const {bookingId}=useParams();
    
    console.log(bookingId,'id');
    const {isLoading,data:booking,error}=useQuery({
        queryKey:['bookings',bookingId],
        queryFn:()=>getBooking(bookingId),
      })
      console.log(booking,'from query');
      return {isLoading,booking,error}
      
}