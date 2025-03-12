import {  useQuery } from "@tanstack/react-query"
import { getBooking } from "../../services/apiBookings"
import { useSearchParams } from "react-router-dom"

export default function useBookings(){
    const [searchParams]=useSearchParams();
    const filterValue=searchParams.get('status');
   
    const sortValue=searchParams.get('sortBy') || 'startDate-desc';
    const [field,value]=sortValue.split('-');
    const sortBy={field,value};

   const filter= !filterValue || filterValue==='all' ? null : {field:'status',value:filterValue,method:'eq'};
    const {isLoading,data:bookings}=useQuery({
        queryKey:['bookings',filterValue,sortValue],
        queryFn:()=>getBooking({filter,sortBy})
    }
    )
    return {isLoading,bookings}
}
// {field:'status',value:filterValue,method:'eq'}
//[{field:'status',value:filterValue,method:'eq'},{field:'totalPrice',value:5000,method:'gte'}] // pass as an array to combine two filters