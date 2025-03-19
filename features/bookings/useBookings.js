import { useQuery, useQueryClient } from "@tanstack/react-query"
import { getBookings } from "../../services/apiBookings"
import { useSearchParams } from "react-router-dom"
import { PAGE_COUNT } from "../../utils/constants";

export default function useBookings(){
    const [searchParams]=useSearchParams();
    const queryClient=useQueryClient();
    
    //filter
    const filterValue=searchParams.get('status');
    const filter= !filterValue || filterValue==='all' ? null : {field:'status',value:filterValue,method:'eq'};
   //Sort
    const sortValue=searchParams.get('sortBy') || 'startDate-desc';
    const [field,value]=sortValue.split('-');
    const sortBy={field,value};
    //PAgination
    const page= !searchParams.get('page') ? 1 : Number(searchParams.get('page'));
   
    const {isLoading,data:{data:bookings,count}={}}=useQuery({
        queryKey:['bookings',filterValue,sortValue,page],
        queryFn:()=>getBookings({filter,sortBy,page})
    }
    )
    const noOfPages=Math.ceil(count/PAGE_COUNT);
    if(page<noOfPages)
       queryClient.prefetchQuery({
            queryKey:['bookings',filterValue,sortValue,page+1],
            queryFn:()=>getBookings({filter,sortBy,page:page+1})
        })
    if(page>1)
            queryClient.prefetchQuery({
                 queryKey:['bookings',filterValue,sortValue,page-1],
                 queryFn:()=>getBookings({filter,sortBy,page:page-1})
             })        
    
    return {isLoading,bookings,count}
}
// {field:'status',value:filterValue,method:'eq'}
//[{field:'status',value:filterValue,method:'eq'},{field:'totalPrice',value:5000,method:'gte'}] // pass as an array to combine two filters