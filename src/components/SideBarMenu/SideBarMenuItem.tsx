import classNames from "classnames";

type SideBarMenuItemProps = {
  handleSettings: () => void;
  viewKey: number;
  menuKey: number;
  children: React.ReactNode;
};

const SideBarMenuItem = ({
  handleSettings,
  viewKey,
  menuKey,
  children,
}: SideBarMenuItemProps) => {
  return (
    <div
      className={classNames(
        { "border-b-2": menuKey === viewKey },
        "flex flex-col items-center cursor-pointer"
      )}
      onClick={handleSettings}
    >
      {children}
    </div>
  );
};

export default SideBarMenuItem;
