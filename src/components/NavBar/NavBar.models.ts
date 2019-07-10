export interface NavBarProps {
  handleDrawerClose: () => void;
  handleDrawerOpen: () => void;
  isShowToTop: boolean;
  navLinks: React.ReactFragment;
  pathname: string;
}
