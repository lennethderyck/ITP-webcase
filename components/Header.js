import * as prismicH from "@prismicio/helpers";
import { PrismicLink, PrismicText } from "@prismicio/react";

const NavItem = ({ children }) => {
  return (
    <li className="font-semibold tracking-tight text-slate-800">{children}</li>
  );
};

export const Header = ({
  withDivider = true,
  withProfile = true,
  navigation,
  settings,
}) => {
  return (
        <nav className="nav">
          <NavItem>
              <PrismicLink href="/">
                <p className="logo"><PrismicText field={settings.data.websiteName} /></p>
              </PrismicLink>
            </NavItem>
          <ul>
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
        </nav>
  );
};
