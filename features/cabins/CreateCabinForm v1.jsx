import styled from "styled-components";

import Input from "../../ui/Input";
import Form from "../../ui/Form";
import Button from "../../ui/Button";
import FileInput from "../../ui/FileInput";
import Textarea from "../../ui/Textarea";
import { useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { addCabin } from "../../services/apiCabins";
import toast from "react-hot-toast";
import FormRow from "../../ui/FormRow";

const FormRow1 = styled.div`
  display: grid;
  align-items: center;
  grid-template-columns: 24rem 1fr 1.2fr;
  gap: 2.4rem;

  padding: 1.2rem 0;

  &:first-child {
    padding-top: 0;
  }

  &:last-child {
    padding-bottom: 0;
  }

  &:not(:last-child) {
    border-bottom: 1px solid var(--color-grey-100);
  }

  &:has(button) {
    display: flex;
    justify-content: flex-end;
    gap: 1.2rem;
  }
`;

const Label = styled.label`
  font-weight: 500;
`;

const Error = styled.span`
  font-size: 1.4rem;
  color: var(--color-red-700);
`;

function CreateCabinForm() {
  const {register,handleSubmit,reset,getValues,formState: { errors }}=useForm();
  console.log(errors,'errors')
  const queryClient=useQueryClient();
  const {mutate,isLoading}=useMutation({
    mutationFn:(cabin)=>addCabin(cabin),
    onSuccess: ()=>{
      toast.success('Cabin Successfully updated');
      reset();
      queryClient.invalidateQueries({
        queryKey:['cabins'],
      });
    },
    onError:()=>{
      toast.error("something went wrong while adding new cabin")
    }
  })
  const onSubmit= (data) =>{
    
   mutate({...data,image:data.image[0]});
  }
  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      {/* <FormRow1 >
        <Label htmlFor="name">Cabin name</Label>
        <Input type="text" id="name" {...register('name',{ required: "this field is required" })} />
        {errors.name && <Error>{errors.name?.message}</Error>}
      </FormRow1> */}
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
        <FileInput id="image" accept="image/*" {...register('image',{ required: "this field is required" })} />
      </FormRow>

      <FormRow>
        {/* type is an HTML attribute! */}
        <Button disabled={isLoading} variation="secondary" type="clear">
          Cancel
        </Button>
        {/* <input type="submit">Submit</input> */}
        <Button variation="primary" disabled={isLoading} type='submit'>Add cabin</Button>
      </FormRow>
    </Form>
  );
}

export default CreateCabinForm;
