import React from "react";
import { useForm } from "react-hook-form";
import { isAddress } from "viem";
import Input from "src/components/ui/Input";
import styled from "styled-components";
import Button from "src/components/ui/Button";
import { useNavigate } from "react-router-dom";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 12px;

  max-width: 540px;
  margin: 0px auto;
`;

interface JoinGameForm {
  contractAddress: string;
}

const Join: React.FC = () => {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<JoinGameForm>({
    mode: "onBlur",
  });

  const joinGame = async (submission: JoinGameForm) => {
    navigate(`/game/${submission.contractAddress}`);
  };

  return (
    <>
      <h1>Join Game</h1>
      <Container>
        <Input
          label="Game contract address"
          placeholder="0x0000000000000000000000000000000000000000"
          register={register("contractAddress", {
            required: "Please fill in game address.",
            validate: (val) => isAddress(val) || "This is not a valid address.",
          })}
          error={errors.contractAddress}
        />
        <Button onClick={handleSubmit(joinGame)} text="Join Game" />
      </Container>
    </>
  );
};

export default Join;
