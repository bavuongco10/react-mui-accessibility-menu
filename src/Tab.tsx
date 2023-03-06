import * as React from "react";
import { MenuUnstyledActions } from "@mui/base/MenuUnstyled";
import TabButton, { TabButtonProps } from "./TabButton";

export default function Tab(props: TabButtonProps) {
  const currentTabIndex = props.value as number;
  const { onClose, setMenuIndex, open, menu, ...restProps } = props;
  const buttonRef = React.useRef<HTMLButtonElement>(null);
  const menuActions = React.useRef<MenuUnstyledActions>(null);
  const internalOpen = React.useRef(open);
  const haveMenu = !!menu;

  const onOpen = (index: number) => {
    setMenuIndex(index);
  };

  const handleButtonMouseDown = () => {
    internalOpen.current = open;
  };

  const handleButtonKeyDown = (
    event: React.KeyboardEvent<HTMLButtonElement>
  ) => {
    internalOpen.current = open;
    if (event.key === "ArrowLeft" || event.key === "ArrowRight") {
      event.preventDefault();
      onOpen(currentTabIndex);
      if (event.key === "ArrowLeft") {
        // TODO: Not working
        menuActions.current?.highlightLastItem();
      }
    }
  };

  const close = () => {
    onClose?.();
    buttonRef.current?.focus();
  };

  return (
    <>
      <TabButton
        {...restProps}
        onClick={(event) => {
          if (internalOpen.current) {
            close();
          }
        }}
        onKeyDown={handleButtonKeyDown}
        onMouseDown={handleButtonMouseDown}
        ref={buttonRef}
        aria-controls={open ? "wrapped-menu" : undefined}
        aria-expanded={open || undefined}
        aria-haspopup="menu"
        data-have-menu={haveMenu}
      />
      {haveMenu &&
        React.cloneElement(menu, {
          actions: menuActions,
          open: open,
          onClose: close,
          className: `bg-mainBlue top-0 bottom-0 w-64 shadow-[2px_-1px_4px_-2px_#000] p-[3rem_1rem_2rem_1rem] translate-x-32 ${
            menu.props.className || ""
          }`,
        })}
    </>
  );
}
