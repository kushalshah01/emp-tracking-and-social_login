
import { Injectable } from "@angular/core";

export interface NavigationItem {
  id: string;
  title: string;
  type: "item" | "collapse" | "group";
  translate?: string;
  icon?: string;
  hidden?: boolean;
  url?: string;
  classes?: string;
  exactMatch?: boolean;
  external?: boolean;
  target?: boolean;
  breadcrumbs?: boolean;
  function?: any;
  badge?: {
    title?: string;
    type?: string;
  };
  children?: Navigation[];
}

export interface Navigation extends NavigationItem {
  children?: NavigationItem[];
}

const NavigationItems = [
  {
    id: "other",
    title: "Manager",
    type: "group",
    icon: "feather icon-align-left",
    children: [
      {
        id: "employee",
        title: "Employees",
        type: "item",
        url: "/employees",
        classes: "nav-item",
        icon: "feather icon-users",
      },
      {
        id: "permise",
        title: "Premises",
        type: "item",
        url: "/premises",
        classes: "nav-item",
        icon: "feather icon-map",
      }
    ],
  },
];

@Injectable()
export class NavigationItem {
  public get() {
    return NavigationItems;
  }
}
