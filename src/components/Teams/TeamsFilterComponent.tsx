import { useForm } from "react-hook-form";
import styled from "styled-components";

type TeamsFilterComponentProps={
    filterTeams:(content:string)=>void
}

export default function TeamsFilterComponent({filterTeams}:TeamsFilterComponentProps){
    const{ handleSubmit, register }= useForm<{Continent:string}>()

    const onSubmit= (values: {Continent: string })=> filterTeams(values.Continent);
  
    return(
        <FilterForm onSubmit={handleSubmit(onSubmit)}>
          <Select {...register("Continent")}>
            <option value="">All</option>
            <option value="Europe">Europe</option>
            <option value="Asia">Asia</option>
            <option value="North America">North America</option>
            <option value="South America">South America</option>
            <option value="Oceania">Oceania</option>
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
