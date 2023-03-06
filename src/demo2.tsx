import * as React from "react";
import { Box } from "@mui/material";
import { Menu } from "./components/Menu";

export default function AccessibleTabs() {
  return (
    <Box sx={{ background: "bisque", width: "100vw", height: "100vh" }}>
      <Menu />
    </Box>
  );
}
