import Input from "../../ui/Input";
import Form from "../../ui/Form";
import Button from "../../ui/Button";
import FileInput from "../../ui/FileInput";
import Textarea from "../../ui/Textarea";
import { useForm } from "react-hook-form";
import FormRow from "../../ui/FormRow";
import useCreateCabin from "./useCreateCabin";
import useUpdateCabin from "./useUpdateCabin";

function CreateCabinForm({cabin ={}, onCloseModal}) {
  const {id:cabinId,...editValues}=cabin;
  const editSession=Boolean(cabinId);

  const {register,handleSubmit,reset,getValues,formState: { errors }}=useForm({
    defaultValues:editSession ? editValues : {}});

  const {updateCabin,isCreatingCabin}=useCreateCabin();
  const {editCabin,isEditingCabin}=useUpdateCabin();

  const onSubmit= (data) =>{
    const image= typeof data.image ==="string" ? data.image : data.image[0];
    if(editSession)  
      editCabin({newCabinData:{...data,image:image},id:cabinId},{
        onSuccess: (data)=>{
          onCloseModal?.(),
        reset()
        
      }});
   else 
    updateCabin({...data,image:image},{
  onSuccess:(data)=>{
  onCloseModal?.(),
  reset()}}
)
    }
const isWorking= isCreatingCabin || isEditingCabin;
    
  return (
    <Form onSubmit={handleSubmit(onSubmit)} type={onCloseModal ? 'modal' : 'regular'}>
      <FormRow label='Cabin name' error={errors.name?.message}>
      <Input type="text" id="name" {...register('name',{ required: "this field is required" })} />
      </FormRow>

      <FormRow label='Maximum capacity' error={errors.maxCapacity?.message}>
        {/* <Label htmlFor="maxCapacity">Maximum capacity</Label> */}
        <Input type="number" id="maxCapacity" {...register('maxCapacity',{ required: "this field is required" })} />
        {/* {errors.maxCapacity && <Error>{errors.maxCapacity?.message}</Error>} */}
      </FormRow>

      <FormRow label='Regular price' error={errors.regularPrice?.message}>
        {/* <Label htmlFor="regularPrice">Regular price</Label> */}
        <Input type="number" id="regularPrice" {...register('regularPrice',{ required: "this field is required",min:{value:1,
          message:"price should be atleast more than 0"
        } })} />
        {/* {errors.regularPrice && <Error>{errors.regularPrice?.message}</Error>} */}
      </FormRow>

      <FormRow label='Discount' error={errors.discount?.message}>
        {/* <Label htmlFor="discount">Discount</Label> */}
        <Input type="number" id="discount" defaultValue={0} {...register('discount',{ required: "this field is required",
          validate:(value)=> value <= getValues().regularPrice || "Discount should be less that or equal to the regular price"
         })} />
        {/* {errors.discount && <Error>{errors.discount?.message}</Error>} */}
      </FormRow>

      <FormRow label='Description for website' error={errors.description?.message}>
        {/* <Label htmlFor="description">Description for website</Label> */}
        <Textarea type="number" id="description" defaultValue="" {...register('description',{ required: "this field is required"})} />
        {/* {errors.description && <Error>{errors.description?.message}</Error>} */}
      </FormRow>

      <FormRow label='Cabin photo'>
        {/* <Label htmlFor="image">Cabin photo</Label> */}
        <FileInput id="image" accept="image/*" {...register('image',{required: editSession ? false : "this field is required" })} />
      </FormRow>

      <FormRow>
        {/* type is an HTML attribute! */}
        <Button disabled={isWorking} onClick={()=>onCloseModal?.()} variation="secondary" type="clear">
          Cancel
        </Button>
        {/* <input type="submit">Submit</input> */}
        <Button variation="primary" disabled={isWorking} type='submit'>Add cabin</Button>
      </FormRow>
    </Form>
  );
}

export default CreateCabinForm;
