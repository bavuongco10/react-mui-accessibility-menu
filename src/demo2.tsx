import * as React from "react";
import TabsUnstyled, { TabsUnstyledOwnProps } from "@mui/base/TabsUnstyled";
import TabsListUnstyled from "@mui/base/TabsListUnstyled";
import { Box } from "@mui/material";
import { map, size } from "lodash";
import Tab from "./Tab";
import useMenuConfiguration from "./useMenuConfiguration";
import MenuUnstyled from "@mui/base/MenuUnstyled";
import MenuItemUnstyled, {
  MenuItemUnstyledProps,
} from "@mui/base/MenuItemUnstyled";
import MenuSection from "./MenuSection";

export default function AccessibleTabs() {
  const { menuItems } = useMenuConfiguration();
  console.log(menuItems);

  const [menuIndex, setMenuIndex] =
    React.useState<TabsUnstyledOwnProps["value"]>(false);
  const itemProps = {
    onClick: () => setMenuIndex(false),
  };

  return (
    <Box sx={{ background: "bisque", width: "100vw", height: "100vh" }}>
      <TabsUnstyled
        orientation="vertical"
        aria-label="Tabs where selection follows focus"
        className="bg-white h-full w-32"
        value={menuIndex}
        onChange={(_, value) => setMenuIndex(value as number)}
      >
        <TabsListUnstyled className="flex flex-col h-full items-center">
          {map(menuItems, (item, index) => {
            const haveSubMenu1 = size(item.subMenu1) > 0;
            return (
              <Tab
                key={item.id}
                icon={item.icon}
                alt={item.alt}
                title={item.title}
                onClose={itemProps.onClick}
                setMenuIndex={setMenuIndex}
                value={index}
                open={menuIndex === index}
                menu={
                  haveSubMenu1 && (
                    <MenuUnstyled
                      className="text-white text-xs capitalize"
                      slotProps={{
                        listbox: { className: "flex flex-col h-full" },
                      }}
                    >
                      {map(item.subMenu1, (subItem) => {
                        const haveSubMenu2 = size(subItem.subMenu2) > 0;
                        const isLogout = subItem.id === "logout";

                        if (haveSubMenu2) {
                          return (
                            <MenuSection
                              label={subItem.title}
                              labelProps={{
                                className:
                                  "border-b border-[rgba(248,251,252,0.3)]",
                              }}
                            >
                              {map(subItem.subMenu2, (subItem2) => (
                                <MenuItemUnstyled
                                  key={subItem2.id}
                                  className="py-2.5 cursor-pointer hover:bg-white hover:text-mainBlue"
                                  {...itemProps}
                                >
                                  {subItem2.title}
                                </MenuItemUnstyled>
                              ))}
                            </MenuSection>
                          );
                        }

                        return (
                          <MenuItemUnstyled
                            key={subItem.id}
                            className={`mb-2.5 py-2.5 font-bold border-b border-[rgba(248,251,252,0.3)] cursor-pointer 
                            hover:bg-white hover:text-mainBlue ${
                              isLogout ? "mt-auto" : ""
                            }`}
                            {...itemProps}
                          >
                            {subItem.title}
                          </MenuItemUnstyled>
                        );
                      })}
                    </MenuUnstyled>
                  )
                }
              />
            );
          })}
        </TabsListUnstyled>
      </TabsUnstyled>
    </Box>
  );
}
