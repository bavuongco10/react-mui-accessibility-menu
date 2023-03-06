import { useMemo } from "react";

interface MenuItem {
  id: string;
  title?: string;
  url?: string;
  action?: string;
  capabilities?: string[];
}

export interface SubMenu2 extends MenuItem {
  isExpendable?: boolean;
  componentInExpendableMenu?: string;
  isVisibleOnRole?: string;
  isVisibleOnEntityType?: string;
  isDisabled?: boolean;
  tooltipText?: string;
}

export interface SubMenu1 extends MenuItem {
  subMenu2?: SubMenu2[];
  isLogout?: boolean;
  isDisplayOnBottom?: boolean;
  onClickFuncName?: string;
}
export interface PrimaryMenuItem extends MenuItem {
  isActive: boolean;
  icon: string;
  tag: string[];
  alt?: string;
  componentNameToRender?: string;
  subMenu1?: SubMenu1[];
  onClick?: () => void;
  isLogout?: boolean;
  title: string;
  relatedUrls?: string[];
}
export interface MenuItems {
  menuItems: PrimaryMenuItem[];
}
export default function useMenuConfiguration() {
  const menuItems: MenuItems = useMemo(() => {
    const data: MenuItems = {
      menuItems: [
        {
          id: "home",
          isActive: false,
          url: "/",
          icon: "dashboard.svg",
          alt: "dashboard",
          tag: ["home"],
          title: "Home",
        },
        {
          id: "new",
          isActive: false,
          icon: "issued.svg",
          alt: "new",
          tag: [
            "new",
            "issue",
            "exportLc",
            "product",
            "importLc",
            "claim",
            "standbyLC",
          ],
          title: "new",
          subMenu1: [
            {
              id: "Export LC",
              title: "Export LC",
            },
            ...(true
              ? [
                  {
                    id: "Import LC",
                    title: "Import LC",
                  },
                ]
              : []),
            ...(true
              ? [
                  {
                    id: "outgoing_guarantee",
                    title: "Outgoing Guarantee",
                  },
                  {
                    id: "incoming_guarantee",
                    title: "Incoming Guarantee",
                  },
                ]
              : [
                  {
                    id: "guarantee",
                    title: "Guarantee",
                  },
                ]),
            {
              id: "Standby LC",
              title: "Standby LC",
            },
          ],
        },
        {
          id: "reports",
          isActive: false,
          icon: "reports.svg",
          alt: "reports",
          tag: ["reports"],
          title: "reports",
          subMenu1: [
            {
              id: "configurationReports",
              title: "Reports",
              subMenu2: [
                {
                  id: "Report Usage Metrics Report",
                  title: "Report Usage Metrics Report",
                },
                {
                  id: "Applicant",
                  title: "Applicant",
                },
                { id: "Beneficiary", title: "Beneficiary" },
                { id: "Issuer", title: "Issuer" },
              ],
            },
          ],
        },
        {
          id: "notifications",
          isActive: false,
          icon: "notif.svg",
          alt: "notifications",
          tag: ["notifications"],
          title: "notifications",
          componentNameToRender: "Notifications",
          subMenu1: [
            {
              id: "My Preferences",
              title: "My Preferences",
            },
          ],
        },
        {
          id: "admin",
          isActive: false,
          icon: "admin.svg",
          alt: "basic_Administrator",
          tag: ["admin", "parties", "banks", "currencies", "customFields"],
          title: "Administrator",
          subMenu1: [
            {
              id: "settings",
              title: "Settings",
              subMenu2: [
                // {
                // 	title: {
                // 		translationKey: "02aeffd8-a290-4d73-ad0b-a8bc89ed2ac7",
                // 		text: TranslateText(TranslationKey.basic_users, selectedLanguage, dictionary),
                // 	},
                // 	isVisibleOnRole: "canManageUsers",
                // },
                // {
                // 	title: {
                // 		translationKey: "b4b0358f-d20d-4aa3-be5a-6f65dca6b1f9",
                // 		text: TranslateText(TranslationKey.basic_company_details, selectedLanguage, dictionary),
                // 	},
                // 	isVisibleOnRole: "canManageOrg",
                // },
                {
                  id: "branding",
                  title: "branding",
                  isVisibleOnRole: "canManageBranding",
                },
                // {
                // 	title: {
                // 		translationKey: "39fc5636-e170-44d1-b041-29d245dad341",
                // 		text: TranslateText(TranslationKey.basic_general_parameters, selectedLanguage, dictionary),
                // 	},
                // 	isVisibleOnRole: "canManageGeneralParams",
                // },
                {
                  id: "Guarantee text template",
                  title: "Guarantee text template",
                },
                {
                  id: "Organization Profile",
                  title: "Organization Profile",
                  isVisibleOnRole: "canUpdateOrg",
                },
                {
                  id: "BankLimit",
                  title: "Bank Limit",
                },
                {
                  id: "Currencies",
                  title: "Currencies",
                  isVisibleOnRole: "canManageParties",
                },
                {
                  id: "Customized Fields",
                  title: "Customized Fields",
                },
              ],
            },
            {
              id: "domain data",
              title: "Domain Data",
              subMenu2: [
                {
                  id: "Banks",
                  title: "Banks",
                  isVisibleOnRole: "canManageParties",
                },
                {
                  id: "Parties",
                  title: "Parties",
                  isVisibleOnRole: "canManageParties",
                },
                {
                  id: "Organization Structure",
                  title: "Organization Structure",
                },
                {
                  id: "Audit Logs",
                  title: "Audit Logs",
                },
              ],
            },
            // {
            // 	title: {
            // 		translationKey: "830b2f7f-3ba8-44af-a7e9-2dee42c90fad",
            // 		text: TranslateText(TranslationKey.basic_billing, selectedLanguage, dictionary),
            // 	},
            // 	isVisibleOnRole: "canManageBilling",
            // 	subMenu2: [
            // 		{
            // 			title: {
            // 				translationKey: "2dcff458-0f7d-4aca-a8f8-8e39e3f24e56",
            // 				text: TranslateText(TranslationKey.basic_my_plan, selectedLanguage, dictionary),
            // 			},
            // 			isVisibleOnRole: "canManagePlan",
            // 		},
            // 		{
            // 			title: {
            // 				translationKey: "8fe302f5-9127-474d-ac41-e5cee10db6d4",
            // 				text: TranslateText(TranslationKey.basic_invoices, selectedLanguage, dictionary),
            // 			},
            // 			isVisibleOnRole: "canManageInvoices",
            // 		},
            // 		{
            // 			title: {
            // 				translationKey: "aef5ccac-955a-4bb7-bb94-c82f6efc8b1e",
            // 				text: TranslateText(TranslationKey.basic_payments, selectedLanguage, dictionary),
            // 			},
            // 			isVisibleOnRole: "canManagePayments",
            // 		},
            // 	],
            // },
          ],
        },
        {
          id: "user",
          isActive: false,
          icon: "profile.svg",
          alt: "basic_User",
          tag: ["profile", "user"],
          title: "Profile",
          subMenu1: [
            {
              id: "userProfile",
              title: "User Profile",
            },
            {
              id: "preferences",
              title: "preferences",
              subMenu2: [
                {
                  id: "notificationSettings",
                  title: "notificationSettings",
                },
                {
                  id: "activeDeals",
                  title: "active Deals",
                  url: "/",
                  action: "activeDeals",
                },
                {
                  id: "archivedDeals",
                  title: "archived Deals",
                  url: "/",
                  action: "archivedDeals",
                  tooltipText: "basic_there_are_no_archive_deals",
                },
              ],
            },
            {
              id: "About",
              title: "About",
              action: "about",
            },
            {
              id: "logout",
              title: "logout",
              isLogout: true,
              isDisplayOnBottom: true,
              onClickFuncName: "clearSelectedUnit",
            },
          ],
        },
      ],
    };

    return data;
  }, []);

  return menuItems;
}
