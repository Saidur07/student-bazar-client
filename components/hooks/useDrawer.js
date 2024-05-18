import { useState } from "react";

export async function useDrawer() {
  const [drawer, setDrawer] = useState(false);

  const toggleDrawer = () => {
    setDrawer(!drawer);
  };
  const closeDrawer = () => {
    setDrawer(false);
  };
  return { closeDrawer, toggleDrawer, drawer };
}
