// @ts-nocheck
import * as React from "react";
import Menu, { menuClasses } from "@mui/joy/Menu";
import MenuItem from "@mui/joy/MenuItem";
import IconButton from "@mui/joy/IconButton";
import List from "@mui/joy/List";
import ListItem from "@mui/joy/ListItem";
import Sheet from "@mui/joy/Sheet";
import Apps from "@mui/icons-material/Apps";
import Settings from "@mui/icons-material/Settings";
import Person from "@mui/icons-material/Person";
import ListDivider from "@mui/joy/ListDivider";
import Typography from "@mui/joy/Typography";

// The Menu is built on top of Popper v2, so it accepts `modifiers` prop that will be passed to the Popper.
// https://popper.js.org/docs/v2/modifiers/offset/
const modifiers = [
  {
    name: "offset",
    options: {
      offset: ({ placement }) => {
        if (placement.includes("end")) {
          return [8, 20];
        }
        return [-8, 20];
      },
    },
  },
];

function MenuButton({
  children,
  menu,
  open,
  onOpen,
  onLeaveMenu,
  label,
  sx,
  ...props
}) {
  const buttonRef = React.useRef(null);
  const isOnButton = React.useRef(false);
  const menuActions = React.useRef(null);
  const internalOpen = React.useRef(open);

  const handleButtonKeyDown = (event) => {
    internalOpen.current = open;
    if (event.key === "ArrowDown" || event.key === "ArrowUp") {
      event.preventDefault();
      onOpen(event);
      if (event.key === "ArrowUp") {
        menuActions.current?.highlightLastItem();
      }
    }
  };

  return (
    <>
      <IconButton
        {...props}
        className={open ? "menu-item-is-active" : ""}
        ref={buttonRef}
        variant="plain"
        color="neutral"
        aria-haspopup="menu"
        aria-expanded={open ? "true" : undefined}
        aria-controls={open ? `nav-example-menu-${label}` : undefined}
        onMouseDown={() => {
          internalOpen.current = open;
        }}
        onClick={() => {
          if (!internalOpen.current) {
            onOpen();
          }
        }}
        onMouseEnter={() => {
          // onOpen();
          // isOnButton.current = true;
        }}
        onMouseLeave={() => {
          // isOnButton.current = false;
        }}
        onKeyDown={handleButtonKeyDown}
        sx={{
          bgcolor: open ? "neutral.plainHoverBg" : undefined,
          "&.Joy-focusVisible": {
            // bgcolor: "neutral.plainHoverBg"
          },
          display: "flex",
          flexDirection: "column",
          position: "relative",
          width: "100%",
          padding: 0,
          "& .MuiTypography-root": {
            fontSize: "12px",
          },
        }}
      >
        {children}
      </IconButton>
      {React.cloneElement(menu, {
        open,
        onClose: () => {
          menu.props.onClose?.();
          buttonRef.current?.focus();
        },
        // onMouseLeave: () => {
        //   onLeaveMenu(() => isOnButton.current);
        // },
        actions: menuActions,
        anchorEl: buttonRef.current,
        modifiers,
        slotProps: {
          listbox: {
            id: `nav-example-menu-${label}`,
            "aria-label": label,
          },
        },
        placement: "right-start",
        sx: {
          boxShadow: "2px -1px 4px -2px #000",
          border: 0,
          padding: "50px 18px 30px 18px",
          width: 288,
          borderRadius: 0,
          top: "0px !important",
          bottom: "0px !important",
          display: "block",
          background: "#354AB5",
          transform: "translate3d(130px, 0px, 0px) !important",
          [`& .${menuClasses.listbox}`]: {
            "--List-padding": "var(--List-divider-gap)",
          },
          "& .MuiMenuItem-root": {
            color: "white",
            fontSize: "12px",
            fontWeight: "bold",
            paddingLeft: 0,
            paddingRight: 0,
          },
          "& .MuiMenuItem-root:hover": {
            color: "#364BB5",
            // color: "#cccaca",
            // background: "transparent"
          },
          "& .MuiListDivider-root": {
            background: "rgba(248,251,252,0.3)",
          },
        },
      })}
    </>
  );
}

export default function MenuIconSideNavExample() {
  const [menuIndex, setMenuIndex] = React.useState(null);
  const itemProps = {
    onClick: () => setMenuIndex(null),
  };

  const createHandleLeaveMenu = (index) => (getIsOnButton) => {
    setTimeout(() => {
      const isOnButton = getIsOnButton();
      if (!isOnButton) {
        setMenuIndex((latestIndex) => {
          if (index === latestIndex) {
            return null;
          }
          return latestIndex;
        });
      }
    }, 200);
  };
  return (
    <Sheet sx={{ background: "bisque" }}>
      <List
        sx={{
          background: "white",
          width: "130px",
          display: "flex",
          height: "100vh",
          padding: 0,
          alignItems: "center",
          "& .MuiListItem-root": {
            width: "100%",
            justifyContent: "center",
            padding: "10px 0",
          },
          "& .MuiIconButton-root": {
            height: "60px",
          },
          "& .MuiIconButton-root.menu-item-is-active::before": {
            content: `""`,
            display: "inline-block",
            position: "absolute",
            height: "60px",
            background: "#364BB5",
            boxShadow: "-1px -1px 2px -1px #000",
            borderRadius: "15px 0 0 15px",
            width: "85%",
            right: "0px",
          },
          "& .MuiIconButton-root.menu-item-is-active > *": {
            color: "white",
          },
          "& .MuiIconButton-root > *": {
            position: "relative",
            color: "#364BB5",
          },
        }}
      >
        <ListItem>
          <MenuButton
            label="Apps"
            open={menuIndex === 0}
            onOpen={() => setMenuIndex(0)}
            onLeaveMenu={createHandleLeaveMenu(0)}
            menu={
              <Menu onClose={() => setMenuIndex(null)}>
                <ListItem nested>
                  <List aria-label="Time travel">
                    <MenuItem {...itemProps}>Undo</MenuItem>
                    <ListDivider />
                    <MenuItem {...itemProps}>Redo</MenuItem>
                    <ListDivider />
                    <MenuItem {...itemProps}>Cut</MenuItem>
                    <ListDivider />
                    <MenuItem {...itemProps}>Copy</MenuItem>
                    <ListDivider />
                    <MenuItem {...itemProps}>Paste</MenuItem>
                  </List>
                </ListItem>
              </Menu>
            }
          >
            <Apps />
            <Typography>Apps</Typography>
          </MenuButton>
        </ListItem>
        <ListItem>
          <MenuButton
            label="Settings"
            open={menuIndex === 1}
            onOpen={() => setMenuIndex(1)}
            onLeaveMenu={createHandleLeaveMenu(1)}
            menu={
              <Menu onClose={() => setMenuIndex(null)}>
                <ListItem nested>
                  <di>hahaha</di>
                  <List aria-label="Time travel">
                    <MenuItem {...itemProps}>Undo</MenuItem>
                    <MenuItem {...itemProps}>Redo</MenuItem>
                  </List>
                </ListItem>
                <ListDivider />
                <ListItem nested>
                  <List aria-label="Tool">
                    <MenuItem {...itemProps}>Cut</MenuItem>
                    <MenuItem {...itemProps}>Copy</MenuItem>
                    <MenuItem {...itemProps}>Paste</MenuItem>
                  </List>
                </ListItem>
              </Menu>
            }
          >
            <Settings />
            <Typography>Settings</Typography>
          </MenuButton>
        </ListItem>
        <ListItem sx={{ marginTop: "auto" }}>
          <MenuButton
            label="Personal"
            open={menuIndex === 2}
            onOpen={() => setMenuIndex(2)}
            onLeaveMenu={createHandleLeaveMenu(2)}
            menu={
              <Menu onClose={() => setMenuIndex(null)}>
                <MenuItem {...itemProps}>Personal 1</MenuItem>
                <MenuItem {...itemProps}>Personal 2</MenuItem>
                <MenuItem {...itemProps}>Personal 3</MenuItem>
              </Menu>
            }
          >
            <Person />
            <Typography>Personal</Typography>
          </MenuButton>
        </ListItem>
      </List>
    </Sheet>
  );
}
