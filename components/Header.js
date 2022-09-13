import * as prismicH from "@prismicio/helpers";
import { PrismicLink, PrismicText } from "@prismicio/react";
import { faBars } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useState, useContext } from "react";
import styles from '../styles/components/_nav.module.scss'

//A smaal component for each link in the navigation
const NavItem = ({ children }) => {
  return (
    <li>{children}</li>
  );
};

//This component is the navigation used over the whole website
export const Header = ({
  navigation,
  settings,
}) => {

  const [showNav, setNav] = useState(true);
  const handleToggleNav = () => {
    setNav(!showNav);
    console.log(showNav)
  };
  return (
        <nav className={styles["nav"]}>
          <NavItem>
              <PrismicLink href="/">
                <p className={styles["logo"]}><PrismicText field={settings.data.websiteName} /></p>
              </PrismicLink>
            </NavItem>
          {showNav?"":<ul className={styles["nav-mobile"]}>
            <NavItem>
              <PrismicLink href="/">
                <p><PrismicText field={navigation.data.homepagelabel} /></p>
              </PrismicLink>
            </NavItem>
            {navigation.data?.links.map((item) => (
              <NavItem key={prismicH.asText(item.label)}>
                <PrismicLink field={item.link}>
                <p><PrismicText field={item.label} /></p>
                </PrismicLink>
              </NavItem>
            ))}
          </ul>}
          <ul className={styles["nav-desktop"]}>
            <NavItem>
              <PrismicLink href="/">
                <PrismicText field={navigation.data.homepagelabel} />
              </PrismicLink>
            </NavItem>
            {navigation.data?.links.map((item) => (
              <NavItem key={prismicH.asText(item.label)}>
                <PrismicLink field={item.link}>
                  <PrismicText field={item.label} />
                </PrismicLink>
              </NavItem>
            ))}
          </ul>
          <FontAwesomeIcon icon={faBars} onClick={handleToggleNav} className={styles["nav-bars"]}/>
        </nav>
  );
};
