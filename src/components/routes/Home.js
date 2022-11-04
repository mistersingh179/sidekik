import { Outlet } from "react-router";
import { Container } from "@chakra-ui/react";
import TopNav from "../setup/TopNav";

export default function Home(props) {
  return (
    <>
      <TopNav />
      <Container maxWidth={"container.xl"} pt={"50px"}>
        <Outlet />
      </Container>
    </>
  );
}
