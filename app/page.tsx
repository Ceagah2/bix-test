'use-client'
import RootLayout from "./layout";
import Login from "./login/page";

export default function Home() {
  return (
    <RootLayout>
      <Login />
    </RootLayout>
  );
}
