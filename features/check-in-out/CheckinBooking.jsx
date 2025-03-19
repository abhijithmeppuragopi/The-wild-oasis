import styled from "styled-components";
import BookingDataBox from "../../features/bookings/BookingDataBox";

import Row from "../../ui/Row";
import Heading from "../../ui/Heading";
import ButtonGroup from "../../ui/ButtonGroup";
import Button from "../../ui/Button";
import ButtonText from "../../ui/ButtonText";

import { useMoveBack } from "../../hooks/useMoveBack";
import useBooking from "../bookings/useBooking";
import Spinner from "../../ui/Spinner";
import CheckoutButton from "./CheckoutButton";
import Checkbox from "../../ui/Checkbox";
import { useEffect, useState } from "react";
import useUpdateCheckin from "./useUpdateCheckin";
import useSettings from "../settings/useSettings";
const Box = styled.div`
  /* Box */
  background-color: var(--color-grey-0);
  border: 1px solid var(--color-grey-100);
  border-radius: var(--border-radius-md);
  padding: 2.4rem 4rem;
`;

function CheckinBooking() {
  const [confirmPayment,setconfirmPayment]=useState(false)
  const [addBreakfast,isAddBreakfast]=useState(false);
  const moveBack = useMoveBack();
  const {booking,isLoading} = useBooking();
  const {updateCheckin,isCheckinLoading}=useUpdateCheckin();
  const {isLoading:isSettingsLoading,settings}=useSettings();
 
  

  useEffect(()=>{
    setconfirmPayment(booking?.isPaid ?? false)
  },[booking])
 
  if(isLoading ||isSettingsLoading) return <Spinner/>

  const {
    id: bookingId,
    guests,
    totalPrice,
    numGuests,
    hasBreakfast,
    numNights,
    status
  } = booking;
  const totalBreakfastPrice=(settings.breakfastPrice *numGuests * numNights);
  console.log(totalBreakfastPrice,'breakfast');
  

  function handleCheckin() {
    if(!confirmPayment) return 
    if(addBreakfast){
      updateCheckin({bookingId,breakfast:{hasBreakfast:true,
        extrasPrice:totalBreakfastPrice,
        totalPrice:totalBreakfastPrice + totalPrice
      }})
    }
    else{
      updateCheckin({bookingId,breakfast:{}})

    }
   
  }
  

  return (
    <>
      <Row type="horizontal">
        <Heading as="h1">Check in booking #{bookingId}</Heading>
        <ButtonText onClick={moveBack}>&larr; Back</ButtonText>
      </Row>

      <BookingDataBox booking={booking} />
      <Box>
        <Checkbox id={'breakfast'} checked={addBreakfast || hasBreakfast} disabled={hasBreakfast} onChange={()=>{
          isAddBreakfast((add)=>!add);
          setconfirmPayment(false);

        }}>Want to add breakfast for ${settings.breakfastPrice} per person for {numNights} nights and total wil be ${totalBreakfastPrice}?</Checkbox>
      </Box>
      <Box>
       <Checkbox checked={confirmPayment} id={'payment'} disabled={booking?.isPaid && confirmPayment} onChange={()=>setconfirmPayment((checked)=>!checked)}>
       I confirm that the customer {guests.fullName} paid {addBreakfast ? `${totalPrice +totalBreakfastPrice} (${totalPrice}) + (${totalBreakfastPrice})` :totalPrice} 
        </Checkbox>
      </Box>

      <ButtonGroup>
        {(status!=='checked-in') &&
         <Button onClick={handleCheckin} disabled={!confirmPayment}>Check in booking #{bookingId}</Button>
        }
        
    {console.log('im working')}
        <Button variation="secondary" onClick={moveBack}>
          Back
        </Button>
       
      </ButtonGroup>
    </>
  );
}

export default CheckinBooking;
