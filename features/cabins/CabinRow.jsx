import styled from "styled-components";
import { useState } from "react";
import CreateCabinForm from "./CreateCabinForm";
import useDeleteCabin from "./useDeleteCabin";
import { FaCopy } from "react-icons/fa";
import { MdEdit, MdOutlineDelete } from "react-icons/md";
import useCreateCabin from "./useCreateCabin";


const TableRow = styled.div`
  display: grid;
  grid-template-columns: 0.6fr 1.8fr 2.2fr 1fr 1fr 1fr;
  column-gap: 2.4rem;
  align-items: center;
  padding: 1.4rem 2.4rem;

  &:not(:last-child) {
    border-bottom: 1px solid var(--color-grey-100);
  }
`;

const Img = styled.img`
  display: block;
  width: 6.4rem;
  aspect-ratio: 3 / 2;
  object-fit: cover;
  object-position: center;
  transform: scale(1.5) translateX(-7px);
`;

const Cabin = styled.div`
  font-size: 1.6rem;
  font-weight: 600;
  color: var(--color-grey-600);
  font-family: "Sono";
`;

const Price = styled.div`
  font-family: "Sono";
  font-weight: 600;
`;

const Discount = styled.div`
  font-family: "Sono";
  font-weight: 500;
  color: var(--color-green-700);
`;
export default function CabinRow( {cabin} ){
  const [isEdit,setIsEdit]=useState(false);
  const {isDeleting,deleteCabin}=useDeleteCabin();
   const {updateCabin,isCreatingCabin}=useCreateCabin();
  const {id:cabinId,image,name,maxCapacity,discount,regularPrice,description}=cabin;
  function handleDuplicate(){
    updateCabin({
      name:`copy of${name}`,
      image,maxCapacity,discount,regularPrice,description
    })
  }
  return   <>
  <TableRow>
    <Img src={image}></Img>
    <Cabin>{name}</Cabin>
    <div>Max up to {maxCapacity} </div>
    <Price>{regularPrice}</Price>
    <Discount>{discount}</Discount>
    <div>
    <button onClick={handleDuplicate}><FaCopy/></button>
    <button onClick={()=>setIsEdit((isEdit)=>!isEdit)}><MdEdit/></button>
    <button disabled={isDeleting} onClick={()=>deleteCabin(cabinId)}><MdOutlineDelete/></button>
    </div>
  </TableRow>
  {isEdit && <CreateCabinForm cabin={cabin}/>}
  </>
}