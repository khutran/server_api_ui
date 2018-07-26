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
        state: 'users',
        short_label: 'U',
        name: 'User',
        type: 'link',
        icon: 'fa fa-users'
      }
    ]
  },
  {
    label: 'Project',
    main: [
      {
        state: 'frameworks',
        short_label: 'F',
        name: 'Framework',
        type: 'link',
        icon: 'fa fa-list'
      },
      {
        state: 'status',
        short_label: 'S',
        name: 'Status',
        type: 'link',
        icon: 'fa fa-list'
      },
      {
        state: 'categories',
        short_label: 'C',
        name: 'Category',
        type: 'link',
        icon: 'fa fa-list'
      },
      {
        state: 'servers',
        short_label: 'SV',
        name: 'Server',
        type: 'link',
        icon: 'fa fa-list'
      },
      {
        state: 'projects',
        short_label: 'P',
        name: 'Projects',
        type: 'link',
        icon: 'fa fa-tags'
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
