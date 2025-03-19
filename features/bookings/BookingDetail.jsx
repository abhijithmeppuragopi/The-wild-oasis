import styled from "styled-components";

import BookingDataBox from "./BookingDataBox";
import Row from "../../ui/Row";
import Heading from "../../ui/Heading";
import Tag from "../../ui/Tag";
import ButtonGroup from "../../ui/ButtonGroup";
import Button from "../../ui/Button";
import ButtonText from "../../ui/ButtonText";
import useUpdateCheckOut from "../check-in-out/useUpdateCheckOut";
import { useMoveBack } from "../../hooks/useMoveBack";
import useBooking from "./useBooking";
import Spinner from "../../ui/Spinner";
import Modal from "../../ui/Modal";
import ConfirmDelete from "../../ui/ConfirmDelete";
import useDeleteBooking from "../check-in-out/useDeleteBooking";
import { useNavigate } from "react-router-dom";
const HeadingGroup = styled.div`
  display: flex;
  gap: 2.4rem;
  align-items: center;
`;

function BookingDetail() {
  const {booking,isLoading}=useBooking();
  const {checkOut,checkOutLoading}=useUpdateCheckOut();
  const {isdeleteBooking,isDeletingBooking}= useDeleteBooking();
  const navigate=useNavigate();
  
  

  const moveBack = useMoveBack();

  const statusToTagName = {
    unconfirmed: "blue",
    "checked-in": "green",
    "checked-out": "silver",
  };
  if(isLoading) return <Spinner/>
  const {id,status}=booking;
  return (
    <>
      <Row type="horizontal">
        <HeadingGroup>
          <Heading as="h1">Booking {id}</Heading>
          <Tag type={statusToTagName[status]}>{status.replace("-", " ")}</Tag>
        </HeadingGroup>
       
        <ButtonText onClick={moveBack}>&larr; Back</ButtonText>
      </Row>

      <BookingDataBox booking={booking} />

      <ButtonGroup>
        <Modal>
      {(status==='checked-in') &&
        <Button onClick={()=>checkOut(id)} disabled={checkOutLoading}>Check Out</Button>}
        <Modal.Open opens='delete'>
        <Button variation="danger">Delete Booking</Button> 
        </Modal.Open>
        <Modal.Window name='delete'>
          <ConfirmDelete  onConfirm={()=>isdeleteBooking(id,{onSettled:()=> navigate(-1)})}/>
          </Modal.Window>       
        <Button variation="secondary" onClick={moveBack}>

          Back
        </Button>
        </Modal>
      </ButtonGroup>
    </>
  );
}

export default BookingDetail;
