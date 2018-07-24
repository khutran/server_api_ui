import { Injectable } from '@angular/core';

export interface BadgeItem {
  type: string;
  value: string;
}

export interface ChildrenItems {
  state: string;
  target?: boolean;
  name: string;
  type?: string;
  children?: ChildrenItems[];
}

export interface MainMenuItems {
  state: string;
  short_label?: string;
  main_state?: string;
  target?: boolean;
  name: string;
  type: string;
  icon: string;
  badge?: BadgeItem[];
  children?: ChildrenItems[];
}

export interface Menu {
  label: string;
  main: MainMenuItems[];
}

const MENUITEMS = [
  {
    label: 'User',
    main: [
      {
        state: 'user',
        short_label: 'U',
        name: 'User',
        type: 'link',
        icon: 'fa fa-users'
      },
      {
        state: 'customer',
        short_label: 'C',
        name: 'Customer',
        type: 'link',
        icon: 'fa fa-user'
      }
    ]
  },
  {
    label: 'ACL',
    main: [
      {
        main_state: 'acl',
        state: 'roles',
        short_label: 'R',
        name: 'Role',
        type: 'link',
        icon: 'fa fa-book'
      }
    ]
  }
];

@Injectable()
export class AppMenuItems {
  getAll(): Menu[] {
    return MENUITEMS;
  }
}
