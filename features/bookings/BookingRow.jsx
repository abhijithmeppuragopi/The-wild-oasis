import styled from "styled-components";
import { format, isToday } from "date-fns";

import Tag from "../../ui/Tag";
import Table from "../../ui/Table";

import { formatCurrency } from "../../utils/helpers";
import { formatDistanceFromNow } from "../../utils/helpers";
import Menus from "../../ui/Menus";
import { Navigate, useNavigate } from "react-router-dom";
import { IoMdEye } from "react-icons/io";
import { TbSquareArrowDownFilled, TbSquareArrowUpFilled } from "react-icons/tb";
import useUpdateCheckOut from "../check-in-out/useUpdateCheckout";
import { id } from "date-fns/locale";
import Spinner from "../../ui/Spinner";
import useDeleteBooking from "../check-in-out/useDeleteBooking";
import Modal from "../../ui/Modal";
import ConfirmDelete from "../../ui/ConfirmDelete";
import Button from "../../ui/Button";
import { MdDelete } from "react-icons/md";
useNavigate

const Cabin = styled.div`
  font-size: 1.6rem;
  font-weight: 600;
  color: var(--color-grey-600);
  font-family: "Sono";
`;

const Stacked = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.2rem;

  & span:first-child {
    font-weight: 500;
  }

  & span:last-child {
    color: var(--color-grey-500);
    font-size: 1.2rem;
  }
`;

const Amount = styled.div`
  font-family: "Sono";
  font-weight: 500;
`;

function BookingRow({
  booking: {
    id: bookingId,
    created_at,
    startDate,
    endDate,
    numNights,
    numGuests,
    totalPrice,
    status,
    guests: { fullName: guestName, email },
    cabins: { name: cabinName },
  },
}) {
  const statusToTagName = {
    unconfirmed: "blue",
    "checked-in": "green",
    "checked-out": "silver",
  };
  const {checkOut,checkOutLoading}=useUpdateCheckOut();
  const {isdeleteBooking,isDeletingBooking}= useDeleteBooking();
  const navigate=useNavigate();
  if(checkOutLoading) return <Spinner/>;

  return (
  
    <Table.Row>
      
      <Cabin>{cabinName}</Cabin>

      <Stacked>
        <span>{guestName}</span>
        <span>{email}</span>
      </Stacked>

      <Stacked>
        <span>
          {isToday(new Date(startDate))
            ? "Today"
            : formatDistanceFromNow(startDate)}{" "}
          &rarr; {numNights} night stay
        </span>
        <span>
          {format(new Date(startDate), "MMM dd yyyy")} &mdash;{" "}
          {format(new Date(endDate), "MMM dd yyyy")}
        </span>
      </Stacked>

      <Tag type={statusToTagName[status]}>{status.replace("-", " ")}</Tag>
      <Amount>{formatCurrency(totalPrice)}</Amount>
      <Modal>
      <Menus.Menu>
        <Menus.ToggleButton id={bookingId}/>
        <Menus.List id={bookingId}>
          <Menus.Button icon={<IoMdEye />} onClick={()=>navigate(`/bookings/${bookingId}`)}>
           Show Details
          </Menus.Button>
          { status !=='checked-in' &&
          <Menus.Button icon={<TbSquareArrowDownFilled />} onClick={()=>navigate(`/checkin/${bookingId}`)}>
           Checki In
          </Menus.Button>
          }
          { status ==='checked-in' &&
          <Menus.Button icon={<TbSquareArrowUpFilled />} onClick={()=>checkOut(bookingId)}>
           Check Out
          </Menus.Button>}
         <Modal.Open opens='delete'>
          <Menus.Button icon={<MdDelete/>}>Delete</Menus.Button>
         </Modal.Open>
         </Menus.List>
         <Modal.Window name='delete'>
          <ConfirmDelete resourceName={'booking'} disabled={isDeletingBooking} onConfirm={()=>isdeleteBooking(bookingId)}/>
         </Modal.Window>
        
      
      </Menus.Menu>
      </Modal>
    </Table.Row>
   
  );
}

export default BookingRow;
