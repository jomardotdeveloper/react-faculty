import React from "react";
import LogoSmall from "../../images/logo-small.png";
import LogoDark from "../../images/logo-dark-small.png";
import LogoOdoo from "../../images/odoo_icon.png";
import SimpleBar from "simplebar-react";
import menu from "../menu/MenuData";
import classNames from "classnames";
import { DropdownMenu, DropdownToggle, UncontrolledDropdown } from "reactstrap";
import { Link } from "react-router-dom";
import { UserAvatar, LinkList, LinkItem, Icon, TooltipComponent } from "../../components/Component";

const LeftPanel = ({ theme }) => {
  let currentUrl;
  const user = JSON.parse(localStorage.getItem("user"));
  if (window.location.pathname !== undefined) {
    currentUrl = window.location.pathname;
  } else {
    currentUrl = null;
  }

  const handleSignout = () => {
    localStorage.removeItem("user");
  };

  const appSidebarClass = classNames({
    "nk-apps-sidebar": true,
    [`is-light`]: theme === "white",
    [`is-${theme}`]: theme !== "white" && theme !== "light",
  });

  return (
    <div className={appSidebarClass}>
      <div className="nk-apps-brand">
        <Link to={currentUrl} className="logo-link">
          <img className="logo-light logo-img" src={LogoOdoo} alt="logo" />
          <img className="logo-dark logo-img" src={LogoOdoo} alt="logo-dark" />
        </Link>
      </div>
      <div className="nk-sidebar-element">
        <div className="nk-sidebar-body">
          <SimpleBar className="nk-sidebar-content">
            <div className="nk-sidebar-menu">
              <ul className="nk-menu apps-menu">
                {/* <li className="nk-menu-hr"></li> */}
                <TooltipComponent id={"profile"} text="My Profile" direction="right" />

                {!user.is_admin ? (
                  <li
                    className={`nk-menu-item ${
                      currentUrl === process.env.PUBLIC_URL + "/profile" ? "active current-page" : ""
                    }`}
                    id="profile"
                  >
                    <Link to={`${process.env.PUBLIC_URL}/members/` + user.faculty.id} className="nk-menu-link">
                      <span className="nk-menu-icon">
                        <Icon name="user"></Icon>
                      </span>
                    </Link>
                  </li>
                ) : (
                  ""
                )}
                <TooltipComponent id={"signout"} text="Sign out" direction="right" />
                <li
                  className={`nk-menu-item ${
                    currentUrl === process.env.PUBLIC_URL + "/signout" ? "active current-page" : ""
                  }`}
                  id="signout"
                >
                  <Link to={`${process.env.PUBLIC_URL}/login`} className="nk-menu-link" onClick={handleSignout}>
                    <span className="nk-menu-icon">
                      <Icon name="signout"></Icon>
                    </span>
                  </Link>
                </li>
                {/* {menu.map((item, index) => {
                  if (item.dashboard) {
                    return (
                      <React.Fragment key={index}>
                        <TooltipComponent id={"dashboard" + index} text={item.text} direction="right" />
                        <li
                          className={`nk-menu-item ${
                            currentUrl === process.env.PUBLIC_URL + item.link ? "active current-page" : ""
                          }`}
                          key={index}
                          id={"dashboard" + index}
                        >
                          <Link to={`${process.env.PUBLIC_URL + item.link}`} className="nk-menu-link">
                            <span className="nk-menu-icon">
                              <Icon name={item.icon}></Icon>
                            </span>
                          </Link>
                        </li>
                      </React.Fragment>
                    );
                  } else if (item.text === "Applications") {
                    return (
                      <React.Fragment key={index}>
                        <li className="nk-menu-hr"></li>
                        {item.subMenu.map((sub, idx) => {
                          return (
                            <React.Fragment key={idx}>
                              <TooltipComponent id={"app" + idx} text={sub.text} direction="right" />
                              <li
                                className={`nk-menu-item ${
                                  currentUrl === process.env.PUBLIC_URL + sub.link ? "active current-page" : ""
                                }`}
                                key={idx}
                                id={"app" + idx}
                              >
                                <Link to={`${process.env.PUBLIC_URL + sub.link}`} className="nk-menu-link">
                                  <span className="nk-menu-icon">
                                    <Icon name={sub.icon}></Icon>
                                  </span>
                                </Link>
                              </li>
                            </React.Fragment>
                          );
                        })}
                      </React.Fragment>
                    );
                  } else return <React.Fragment key={index}></React.Fragment>;
                })} */}
                {/* <li className="nk-menu-hr"></li>
                <TooltipComponent id={"componentTooltip"} text="Go to component" direction="right" />
                <li
                  className={`nk-menu-item ${
                    currentUrl === process.env.PUBLIC_URL + "/components" ? "active current-page" : ""
                  }`}
                  id="componentTooltip"
                >
                  <Link to={`${process.env.PUBLIC_URL}/components`} className="nk-menu-link">
                    <span className="nk-menu-icon">
                      <Icon name="layers"></Icon>
                    </span>
                  </Link>
                </li> */}
              </ul>
            </div>
            {/* <div className="nk-sidebar-footer">
              <ul className="nk-menu">
                <TooltipComponent id={"settingsTooltip"} text="Settings" direction="right" />
                <li className="nk-menu-item" id="settingsTooltip">
                  <Link to={`${process.env.PUBLIC_URL}/user-profile-setting`} className="nk-menu-link">
                    <span className="nk-menu-icon">
                      <Icon name="setting"></Icon>
                    </span>
                  </Link>
                </li>
              </ul>
            </div> */}
          </SimpleBar>
          {/* <UncontrolledDropdown className="nk-sidebar-profile nk-sidebar-profile-fixed" direction="right">
            <DropdownToggle
              tag="a"
              href="#toggle"
              className="dropdown-toggle"
              onClick={(ev) => {
                ev.preventDefault();
              }}
            >
              <UserAvatar text="AB" theme="blue" />
            </DropdownToggle>
            <DropdownMenu right className="dropdown-menu-md ml-4">
              <div className="dropdown-inner user-card-wrap bg-lighter d-none d-md-block">
                <div className="user-card sm">
                  <UserAvatar text="AB" theme="blue" />
                  <div className="user-info">
                    <span className="lead-text">Abu Bin Ishtiyak</span>
                    <span className="sub-text">info@softnio.com</span>
                  </div>
                </div>
              </div>
              <div className="dropdown-inner">
                <LinkList>
                  <LinkItem link="/user-profile-regular" icon="user-alt">
                    View Profile
                  </LinkItem>
                  <LinkItem link="/user-profile-setting" icon="setting-alt">
                    Account Setting
                  </LinkItem>
                  <LinkItem link="/user-profile-activity" icon="activity-alt">
                    Login Activity
                  </LinkItem>
                </LinkList>
              </div>
              <div className="dropdown-inner">
                <LinkList>
                  <a href={`${process.env.PUBLIC_URL}/auth-login`} onClick={handleSignout}>
                    <Icon name="signout"></Icon>
                    <span>Sign Out</span>
                  </a>
                </LinkList>
              </div>
            </DropdownMenu>
          </UncontrolledDropdown> */}
        </div>
      </div>
    </div>
  );
};

export default LeftPanel;
