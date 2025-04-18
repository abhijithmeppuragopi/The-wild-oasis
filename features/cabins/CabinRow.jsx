import styled from "styled-components";
import CreateCabinForm from "./CreateCabinForm";
import useDeleteCabin from "./useDeleteCabin";
import { FaCopy } from "react-icons/fa";
import { MdEdit, MdOutlineDelete } from "react-icons/md";
import useCreateCabin from "./useCreateCabin";
import Modal from "../../ui/Modal";
import ConfirmDelete from "../../ui/ConfirmDelete";
import Table from "../../ui/Table";
import Menus from "../../ui/Menus";


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
  <Table.Row>
    <Img src={image}></Img>
    <Cabin>{name}</Cabin>
    <div>Max up to {maxCapacity} </div>
    <Price>{regularPrice}</Price>
    <Discount>{discount}</Discount>
    <div>
    <Modal>
    <Menus.Menu>
      <Menus.ToggleButton id={cabinId}/>
      <Menus.List id={cabinId} position={20}>
      <Modal.Open opens='delete'>
      <Menus.Button icon={<MdOutlineDelete/>}>Delete</Menus.Button>
      </Modal.Open>
      <Modal.Open opens='edit'>
      <Menus.Button icon={<MdEdit/> }>Edit</Menus.Button>
      </Modal.Open>
        
        <Menus.Button icon={<FaCopy/>} onClick={handleDuplicate}> Duplicate</Menus.Button>
      </Menus.List>
     
      <Modal.Window name='edit'>
      <CreateCabinForm cabin={cabin} />
      </Modal.Window>

     
      <Modal.Window name='delete'>
      <ConfirmDelete disabled={isDeleting} onConfirm={()=>deleteCabin(cabinId)}   />
      </Modal.Window>
      </Menus.Menu>
    </Modal>
    
   
    
    </div>
  </Table.Row>
   {/* {isEdit && <AddCabin/>}
   {isEdit && <Modal onClick={()=>setIsEdit((open)=>!open)}>
    
    </Modal>} */}
  </>
}