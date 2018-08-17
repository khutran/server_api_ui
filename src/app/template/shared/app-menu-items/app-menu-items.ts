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
  states: string[];
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

export const AppMenunItems = [
  {
    label: 'User',
    main: [
      {
        states: ['/', 'users'],
        short_label: 'U',
        name: 'User',
        type: 'link',
        icon: 'fa fa-users',
        permissions: ['view.user', 'create.user', 'update.user', 'delete.user']
      }
    ]
  },
  {
    label: 'Project',
    main: [
      {
        states: ['/', 'frameworks'],
        short_label: 'F',
        name: 'Framework',
        type: 'link',
        icon: 'fa fa-list',
        permissions: ['view.framework', 'create.framework', 'update.framework', 'delete.framework']
      },
      {
        states: ['/', 'status'],
        short_label: 'S',
        name: 'Status',
        type: 'link',
        icon: 'fa fa-list',
        permissions: ['view.status', 'create.status', 'update.status', 'delete.status']
      },
      {
        states: ['/', 'categories'],
        short_label: 'C',
        name: 'Category',
        type: 'link',
        icon: 'fa fa-list',
        permissions: ['view.category', 'create.category', 'update.category', 'delete.category']
      },
      {
        states: ['/', 'servers'],
        short_label: 'SV',
        name: 'Server',
        type: 'link',
        icon: 'fa fa-list',
        permissions: ['view.server', 'create.server', 'update.server', 'delete.server']
      },
      {
        states: ['/', 'projects'],
        short_label: 'P',
        name: 'Projects',
        type: 'link',
        icon: 'fa fa-tags',
        permissions: ['view.project', 'create.project', 'update.project', 'delete.project']
      }
    ]
  },
  {
    label: 'ACL',
    main: [
      {
        states: ['/', 'acl', 'roles'],
        short_label: 'R',
        name: 'Role',
        type: 'link',
        icon: 'fa fa-book',
        permissions: ['view.role', 'create.role', 'update.role', 'delete.role']
      }
    ]
  }
];
