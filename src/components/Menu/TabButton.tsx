import { styled } from "@mui/system";
import TabUnstyled, { TabUnstyledProps } from "@mui/base/TabUnstyled";
import * as React from "react";
import { Typography } from "@mui/material";
import { forwardRef } from "react";
import Dashboard from "@mui/icons-material/Dashboard";

const COLORS = {
  mainBlue: "#364BB5",
};

export interface TabButtonExtraProps {
  icon?: React.ReactNode;
  label?: string;
  alt?: string;
  tabIndex?: number;
  value?: number;
  "data-havemenu"?: boolean;
}

export type TabButtonProps = TabUnstyledProps & TabButtonExtraProps;

const TabStyled = styled(TabUnstyled)((props: TabButtonProps) => {
  const haveMenu = props["data-havemenu"];
  return `
  &.Mui-selected::before {
    content: "";
    display: inline-block;
    position: absolute;
    height: 100%;
    background: ${COLORS.mainBlue};
    box-shadow: -1px -1px 2px -1px #000;
    border-radius: ${haveMenu ? "15px 0 0 15px" : "15px"};
    width: 85%;
    right: ${haveMenu ? "0px" : "calc((128px - 85%) / 2)"};
    top: 0px;
  }
`;
});

const TabButton = forwardRef(
  (
    { icon, alt, label, ...restProps }: TabButtonProps,
    ref: React.ForwardedRef<HTMLButtonElement>
  ) => {
    return (
      <TabStyled
        ref={ref}
        className="w-full h-16 relative text-mainBlue last-of-type:mt-auto aria-selected:text-white my-1"
        {...restProps}
      >
        <div className="relative">
          <Dashboard sx={{ fontSize: "30px" }} />
        </div>
        <Typography className="relative text-inherit text-xs capitalize font-bold font-sans">
          {label}
        </Typography>
      </TabStyled>
    );
  }
);

export default TabButton;
