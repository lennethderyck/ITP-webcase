import { PrismicLink, PrismicRichText, PrismicText } from "@prismicio/react";


export const Footer = ({ withSignUpForm = true, settings }) => {

  const date = new Date().getFullYear();
  return (
        <div className="footer">
          <p><PrismicText field={settings.data.websiteName} /> - {date} ©</p>
        </div>
  );
};
