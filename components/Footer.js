import { PrismicText } from "@prismicio/react";
import styles from '../styles/components/_footer.module.scss';


export const Footer = ({settings }) => {
  //Gives the current year
  const date = new Date().getFullYear();

  //Returns e footer component that is used for the whole website and is placed at the bottom
  return (
        <div className={styles["footer"]}>
          <p><PrismicText field={settings.data.websiteName} /> - {date} ©</p>
        </div>
  );
};
