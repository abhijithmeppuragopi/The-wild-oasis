import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateBooking } from "../../services/apiBookings";
import toast from "react-hot-toast";

export default function useUpdateCheckOut(){
const queryClient=useQueryClient();
const {mutate:checkOut,isLoading:checkOutLoading}=useMutation({
    mutationFn: (bookingId)=>updateBooking(bookingId,{status:'checked-out'}),
    onSuccess:(data)=>{
        toast.success(`${data.id} succesfully Checked out`),
        queryClient.invalidateQueries({
            queryKey:['bookings']
        })
    },
    onError: ()=>{
        toast.error("something went wrong while checking Out")
    }
})
return {checkOut,checkOutLoading}
}