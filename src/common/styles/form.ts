import styled from "styled-components";

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  flex: 1;
  row-gap: ${(props) => props.theme.spacing.sm};

  * {
    font-size: ${(props) => props.theme.fontSize.medium};

    &::placeholder {
      font-size: ${(props) => props.theme.fontSize.medium};
    }
  }
`;

export const InputTransparent = styled.input`
  background-color: transparent;
  outline: none;
  border: none;
  padding: ${(props) => props.theme.spacing.sm};
  width: min-content;

  &:hover {
    border: 1px solid ${(props) => props.theme.colors.grayDefault};
    border-radius: ${(props) => props.theme.borderRadius.medium};
  }
`;

export const Textarea = styled.textarea`
  border: 1px solid ${(props) => props.theme.colors.grayDefault};
  border-radius: ${(props) => props.theme.borderRadius.medium};
  padding: ${(props) => props.theme.spacing.sm};
  outline: none;
`;
