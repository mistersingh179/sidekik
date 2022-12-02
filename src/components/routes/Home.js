import { Outlet } from "react-router";
import { Container } from "@chakra-ui/react";
import TopNav from "../setup/TopNav";
import BrowserIssue from "../setup/BrowserIssue";



export default function Home(props) {
  return (
    <>
      <TopNav />
      <Container maxWidth={"container.xl"} pt={"50px"}>
        <BrowserIssue />
        <Outlet />
      </Container>
    </>
  );
}
