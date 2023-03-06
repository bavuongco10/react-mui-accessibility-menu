import * as React from "react";
import { Box } from "@mui/material";

import { Menu } from "./components/Menu";
import useMenuConfiguration from "./useMenuConfiguration";

export default function AccessibleTabs() {
  const { menuItems } = useMenuConfiguration();

  return (
    <Box sx={{ background: "bisque", width: "100vw", height: "100vh" }}>
      <Menu items={menuItems} />
    </Box>
  );
}
