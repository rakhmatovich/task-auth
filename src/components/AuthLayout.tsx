import type { CSSProperties, ReactNode } from "react";
import { Layout } from "antd";

type Props = {
  children: ReactNode;
};

const { Content } = Layout;

const layoutStyle: CSSProperties = {
  width: "100%",
  minHeight: "100vh",
  backgroundColor: "#F5F5F5",
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
};

export default function AuthLayout({ children }: Props) {
  return <Content style={layoutStyle}>{children}</Content>;
}
