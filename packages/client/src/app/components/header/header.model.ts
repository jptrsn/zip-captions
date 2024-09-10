export interface MenuItem {
  label: string;
  routerOutlet?: string;
  href?: string;
  children?: MenuItem[];
  loginRequired?: boolean
}