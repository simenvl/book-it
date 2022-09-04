import { useState } from "react";
import { Activity, Users } from "react-feather";
import SideBarMenuItem from "./SideBarMenuItem";

export type SettingsView = {
  resources?: JSX.Element;
  services?: JSX.Element;
};

type Settings = {
  [key in keyof SettingsView]?: string;
};

export type SettingsKeys = keyof Settings;

type SideBarMenuProps = {
  toggleSettingsView: (view: SettingsKeys) => void;
};

const SideBarMenu = ({ toggleSettingsView }: SideBarMenuProps) => {
  const [viewKey, setViewKey] = useState(1);

  const handleSettingsView = (key: number, view: SettingsKeys) => {
    setViewKey(key);
    toggleSettingsView(view);
  };

  return (
    <div className="flex px-4 py-8 border-r-2 flex-col h-screen w-fit gap-8">
      <SideBarMenuItem
        handleSettings={() => handleSettingsView(1, "resources")}
        menuKey={1}
        viewKey={viewKey}
      >
        <Users />
        Resursser
      </SideBarMenuItem>
      <div
        className="flex flex-col items-center cursor-pointer"
        onClick={() => handleSettingsView(2, "services")}
      >
        <Activity />
        Tjenester
      </div>
    </div>
  );
};

export default SideBarMenu;
