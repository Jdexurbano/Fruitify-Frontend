import { Outlet } from "react-router";

function MainLayout() {
  return (
    <main>
      <Outlet />
      <p>main</p>
    </main>
  );
}

export default MainLayout;
