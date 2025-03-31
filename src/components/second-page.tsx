"use client";

import { ButtonDefault } from "@/common/styles/button";
import { KeyboardDoubleArrowLeft } from "@mui/icons-material";
import styled from "styled-components";

const SecPageWrapper = styled.div`
  display: flex;
  flex: 1;
  border-left: 1px solid ${(props) => props.theme.colors.grayDefault};
  padding-left: ${(props) => props.theme.spacing.sm};
`;

type SecondPageType = {
  closeSecPage: () => void;
};

export default function SecondPage({ closeSecPage }: SecondPageType) {
  return (
    <SecPageWrapper>
      <div>
        <ButtonDefault onClick={closeSecPage}>
          <KeyboardDoubleArrowLeft />
        </ButtonDefault>
      </div>
    </SecPageWrapper>
  );
}
