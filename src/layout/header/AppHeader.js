import React from "react";
import classNames from "classnames";
import Toggle from "../sidebar/Toggle";
import User from "./dropdown/user/User";
import Notification from "./dropdown/notification/Notification";
import ChatDropdown from "./dropdown/chat/Chat";
import AppDropdown from "./dropdown/app/App";
import { Icon } from "../../components/Component";

const AppHeader = ({ fixed, theme, className, app, sidebarToggle, setVisibility }) => {
  const headerClass = classNames({
    "nk-header": true,
    "nk-header-fixed": fixed,
    [`is-${theme}`]: theme,
    [`${className}`]: className,
  });

  return (
    <div className={headerClass}>
      <div className="container-fluid">
        <div className="nk-header-wrap">
          <div className="nk-menu-trigger d-xl-none ml-n1">
            <Toggle className="nk-nav-toggle nk-quick-nav-icon" icon="menu" click={sidebarToggle} />
          </div>
          <div className="nk-header-app-name">
            <div className="nk-header-app-logo">
              <Icon name={app.icon} className={app.theme}></Icon>
            </div>
            <div className="nk-header-app-info">
              <span className="sub-text">Apps</span>
              <span className="lead-text">{app.text}</span>
            </div>
          </div>
          <div className="nk-header-tools">
            <ul className="nk-quick-nav">
              <li className="chats-dropdown hide-mb-xs" onClick={() => setVisibility(false)}>
                <ChatDropdown />
              </li>
              <li className="notification-dropdown mr-n1" onClick={() => setVisibility(false)}>
                <Notification />
              </li>
              <li className="list-apps-dropdown d-lg-none" onClick={() => setVisibility(false)}>
                <AppDropdown />
              </li>
              <li className="user-dropdown" onClick={() => setVisibility(false)}>
                <User />
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};
export default AppHeader;
