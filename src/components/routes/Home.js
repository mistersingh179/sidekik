import { Outlet, useLocation } from "react-router";
import { Container } from "@chakra-ui/react";
import TopNav from "../setup/TopNav";
import BrowserIssue from "../setup/BrowserIssue";
import { useEffect } from "react";

export default function Home(props) {
  useEffect(() => {
    try {
      const intercomId = window.Intercom("getVisitorId");
      window.clarity("set", "IntercomVisitorId", intercomId);
      window.clarity("identify", intercomId);
    } catch (e) {}
  }, [window?.Intercom?.booted]);

  useEffect(() => {
    window.Intercom("boot", {
      api_base: "https://api-iam.intercom.io",
      app_id: "vesl7md6",
    });
  }, []);

  const location = useLocation();
  useEffect(() => {
    window.Intercom("update");
  }, [location]);

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
