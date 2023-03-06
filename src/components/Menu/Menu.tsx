import { useState, SyntheticEvent } from "react";
import TabsListUnstyled from "@mui/base/TabsListUnstyled";
import MenuUnstyled from "@mui/base/MenuUnstyled";
import MenuItemUnstyled from "@mui/base/MenuItemUnstyled";
import TabsUnstyled from "@mui/base/TabsUnstyled";
import { map, size } from "lodash";

import Tab from "./Tab";
import MenuSection from "./MenuSection";
import { PrimaryMenuItem } from "../../useMenuConfiguration";

export type menuIndex = number | false;

const Menu = ({ items }: { items: Array<PrimaryMenuItem> }) => {
  const [menuIndex, setMenuIndex] = useState<menuIndex>(false);

  const onCloseMenu = () => setMenuIndex(false);

  const onOpenMenu = (index: number) => {
    setMenuIndex(index);
  };

  const onChangeTab = (
    event: SyntheticEvent<Element, Event>,
    newValue: string | number | boolean
  ) => {
    setMenuIndex(newValue as menuIndex);
  };

  return (
    <TabsUnstyled
      orientation="vertical"
      aria-label="Tabs where selection follows focus"
      className="bg-white h-full w-32"
      value={menuIndex}
      onChange={onChangeTab}
    >
      <TabsListUnstyled className="flex flex-col h-full items-center">
        {map(items, (item, index) => {
          const haveSubMenu1 = size(item.subMenu1) > 0;
          return (
            <Tab
              key={item.id}
              icon={item.icon}
              alt={item.alt}
              label={item.title}
              onOpen={onOpenMenu}
              onClose={onCloseMenu}
              value={Number(index)}
              open={menuIndex === index}
              menu={
                haveSubMenu1 && (
                  <MenuUnstyled>
                    {map(item.subMenu1, (subItem) => {
                      const haveSubMenu2 = size(subItem.subMenu2) > 0;
                      const isLogout = subItem.id === "logout";

                      if (haveSubMenu2) {
                        return (
                          <MenuSection
                            key={subItem.id}
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
                                onClick={onCloseMenu}
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
                          onClick={onCloseMenu}
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
  );
};

export default Menu;
