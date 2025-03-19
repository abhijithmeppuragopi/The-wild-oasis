import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateBooking } from "../../services/apiBookings";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export default function useUpdateCheckin(){
    const navigate=useNavigate();
    const queryClient=useQueryClient();
const {mutate:updateCheckin,isLoading:isCheckinLoading}=useMutation({
    mutationFn:({bookingId,breakfast})=>updateBooking(bookingId,{status:'checked-in',isPaid:true,...breakfast}),
    onSuccess:(data)=>{
        toast.success(`Succesfully Checked In${data.id}`),
        queryClient.invalidateQueries({
            queryKey:['bookings']
        })

        navigate('/bookings')
    },
    onerror:()=>{
        toast.error("something happened while updating the cabin")
    }    
}
)
return {updateCheckin,isCheckinLoading}
}
