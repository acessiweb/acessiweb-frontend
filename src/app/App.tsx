"use client";

import Header from "@/components/header";
import AuthProvider from "@/context/auth";
import styled, { ThemeProvider } from "styled-components";

const theme = {
  colors: {
    grayDefault: "#1C1917",
    lightPurpleDefault: "#DEDEDE",
    page: "#F8F8F8",
  },
  fontWeight: {
    light: 300,
    medium: 500,
    semibold: 600,
    bold: 700,
  },
  fontSize: {
    small: "1rem",
    medium: "1.4rem",
    large: "1.7rem",
    extraLarge: "2rem",
  },
  spacing: {
    xs: "0.3rem",
    sm: "0.7rem",
    md: "1.1rem",
    lg: "1.9rem",
    xl: "3rem",
  },
  borderRadius: {
    small: "5px",
    medium: "10px",
    large: "20px",
  },
};

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  margin: ${(props) => props.theme.spacing.xs};
  row-gap: ${(props) => props.theme.spacing.xs};

  a {
    text-decoration: none;
    color: ${(props) => props.theme.colors.grayDefault};
  }

  > main {
    display: flex;
    flex: 1;
    padding: ${(props) => props.theme.spacing.md};
    background-color: ${(props) => props.theme.colors.page};
    border-radius: ${(props) => props.theme.borderRadius.small};

    > div {
      display: flex;
      flex: 1;
      column-gap: ${(props) => props.theme.spacing.md};
    }
  }
`;

export default function App({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider theme={theme}>
      <AuthProvider>
        <Wrapper>
          <Header />
          <main>{children}</main>
        </Wrapper>
      </AuthProvider>
    </ThemeProvider>
  );
}
