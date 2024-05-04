import React from "react";
import { styled } from "styled-components";
import { FieldError, UseFormRegisterReturn } from "react-hook-form";

const Container = styled.div`
  width: 100%;
`;

const StyledRow = styled.div`
  position: relative;
  width: 100%;

  display: flex;
  gap: 16px;
  align-items: center;

  font-size: 18px;

  :nth-child(1) {
    width: 33%;
  }

  :nth-child(2) {
    width: 66%;
  }
`;

const StyledInput = styled.input`
  display: block;
  padding: 16px 12px;
  border-radius: 8px;

  background-color: lightgray;
  color: black;

  outline: none;
  border: none;
`;

const StyledUnit = styled.div`
  position: absolute;
  right: 20px;
  color: black;
`;

const StyledError = styled.p`
  text-align: right;
  color: red;
`;

interface InputProps {
  label?: string;
  placeholder?: string;
  unit?: string;
  type?: string;
  register?: UseFormRegisterReturn | any;
  error?: FieldError;
}

const Input: React.FC<InputProps> = ({ label, placeholder, unit, type, register, error }) => {
  return (
    <Container>
      <StyledRow>
        <p>{label}:</p>
        <StyledInput type={type} placeholder={placeholder} {...register}></StyledInput>
        {unit && <StyledUnit>{unit}</StyledUnit>}
      </StyledRow>
      <StyledError>{error?.message}</StyledError>
    </Container>
  );
};

export default Input;
