import * as React from "react";
import { RouteComponentProps } from "react-router-dom";
import { Layout } from "antd";
import SiderBar from "../../components/SiderBar";
import NavBar from "../../components/NavBar";

const { Header, Content, Sider } = Layout;

function Layouts(props: { children: React.ReactNode } & RouteComponentProps) {
  return (
    <Layout style={{ width: "100%" }}>
      <Sider>
        <SiderBar />
      </Sider>
      <Layout style={{ background: "#fff" }}>
        <Header
          style={{
            padding: "0 16px",
            background: "#fff",
            boxShadow: "0 2px 6px rgba(99, 99, 99, .15)",
          }}
        >
          <NavBar />
        </Header>
        <Content>{props.children}</Content>
      </Layout>
    </Layout>
  );
}

export default Layouts;
