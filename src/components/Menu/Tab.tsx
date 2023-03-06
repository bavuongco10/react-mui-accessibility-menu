import * as React from "react";
import { MenuUnstyledActions } from "@mui/base/MenuUnstyled";
import TabButton, { TabButtonProps } from "./TabButton";

export interface TabProps {
  onClose: () => void;
  onOpen: (index: number) => void;
  open: boolean;
  menu?: React.ReactElement | false;
}

const Tab = ({
  onOpen,
  onClose,
  open,
  menu,
  ...restProps
}: TabProps & TabButtonProps) => {
  const buttonRef = React.useRef<HTMLButtonElement>(null);
  const menuActions = React.useRef<MenuUnstyledActions>(null);
  const internalOpen = React.useRef(open);
  const haveMenu = !!menu;
  const currentTabIndex = restProps.value as number;

  const close = () => {
    onClose?.();
    buttonRef.current?.focus();
  };

  const handleButtonClicked = () => {
    if (internalOpen.current) close();
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

  return (
    <>
      <TabButton
        {...restProps}
        onClick={handleButtonClicked}
        onKeyDown={handleButtonKeyDown}
        onMouseDown={handleButtonMouseDown}
        ref={buttonRef}
        aria-controls={open ? "wrapped-menu" : undefined}
        aria-expanded={open || undefined}
        aria-haspopup="menu"
        data-havemenu={haveMenu}
      />
      {haveMenu &&
        React.cloneElement(menu, {
          actions: menuActions,
          open: open,
          onClose: close,
          className: `text-white text-xs capitalize bg-mainBlue top-0 bottom-0 w-64 shadow-[2px_-1px_4px_-2px_#000] p-[3rem_1rem_2rem_1rem] translate-x-32`,
          slotProps: {
            listbox: { className: "flex flex-col h-full" },
          },
        })}
    </>
  );
};
export default Tab;
