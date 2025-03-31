import styled from "styled-components";

export const ButtonDefault = styled.button`
  background-color: transparent;
  border: 1px solid ${(props) => props.theme.colors.grayDefault};
  border-radius: ${(props) => props.theme.borderRadius.medium};
  padding: ${(props) => props.theme.spacing.sm};
  cursor: pointer;
  font-size: ${(props) => props.theme.fontSize.small};

  &:hover {
    background-color: ${(props) => props.theme.colors.lightPurpleDefault};
  }
`;
