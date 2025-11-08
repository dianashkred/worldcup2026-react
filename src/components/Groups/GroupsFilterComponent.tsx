import { useForm } from "react-hook-form";
import styled from "styled-components";

type GroupsFilterComponentProps={
    filterGroups:(content:string)=>void
}

export default function GroupsFilterComponent({filterGroups}:GroupsFilterComponentProps){
    const{ handleSubmit, register }= useForm<{Name:string}>()

    const onSubmit= (values: {Name: string })=> filterGroups(values.Name);
  
    return(
        <FilterForm onSubmit={handleSubmit(onSubmit)}>
          <Select {...register("Name")}>
            <option value="">All</option>
            <option value="A">A</option>
            <option value="B">B</option>
            <option value="C">C</option>
            <option value="D">D</option>
            <option value="E">E</option>
            <option value="F">F</option>
            <option value="G">G</option>
            <option value="H">H</option>
            <option value="I">I</option>
            <option value="J">J</option>
            <option value="K">K</option>
            <option value="L">L</option>
          </Select>
          <ApplyButton type="submit">Apply</ApplyButton>
        </FilterForm>
    )
  
}

export const FilterForm = styled.form`
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 20px;
`;

export const Select = styled.select`
  padding: 8px 12px;
  font-size: 14px;
  border: 1px solid #ccc;
  border-radius: 6px;
  background-color: #fff;
`;

export const ApplyButton = styled.button`
  padding: 8px 16px;
  background-color: #222;
  color: white;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  font-weight: 500;
  transition: background-color 0.2s;

  &:hover {
    background-color: #555;
  }
`;
