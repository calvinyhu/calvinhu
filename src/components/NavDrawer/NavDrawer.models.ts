export interface NavDrawerProps {
  handleDrawerClose: () => void;
  isDrawerOpen: boolean;
  navLinks: React.ReactFragment;
  percent: number;
}
