import { PrismicText } from "@prismicio/react";


export const Footer = ({settings }) => {
  //Gives the current year
  const date = new Date().getFullYear();

  //Returns e footer component that is used for the whole website and is placed at the bottom
  return (
        <div className="footer">
          <p><PrismicText field={settings.data.websiteName} /> - {date} ©</p>
        </div>
  );
};
