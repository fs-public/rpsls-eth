import { Icon } from "@iconify/react";
import React from "react";
import { abbrevAddress } from "src/utils/address";
import { getBlockExplorerTxLink, getBlockExplorerAddressLink } from "src/utils/link";
import { styled } from "styled-components";

const StyledAnchor = styled.a`
  & > svg {
    padding-left: 6px;
  }
`;

const BlockExplorerLink: React.FC<{ hex?: `0x${string}` }> = ({ hex }) => {
  if (!hex) return;

  const etherscanLink = hex.length === 66 ? getBlockExplorerTxLink(hex) : getBlockExplorerAddressLink(hex);

  return (
    <StyledAnchor href={etherscanLink} target="_blank" rel="noreferrer noopener">
      {abbrevAddress(hex)}
      <Icon icon="ph:arrow-square-out-bold" />
    </StyledAnchor>
  );
};

export default BlockExplorerLink;
