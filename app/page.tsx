'use-client'
import RootLayout from "./layout";
import Login from "./presentation/screens/Login";

export default function Home() {
  return (
    <RootLayout types={undefined}>
      <Login />
    </RootLayout>
  );
}
