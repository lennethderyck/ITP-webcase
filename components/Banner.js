import { PrismicText } from "@prismicio/react";
import { Bounded } from "./Bounded";
import styles from '../styles/components/_banner.module.scss';

//Used on the homepage for some extra information
export const Banner = ({ settings }) => {
  return (
    <Bounded as="banner">
      <div className={styles["welcomeBanner"]}>
            <h1>
                Welomce to <span><PrismicText field={settings.data.websiteName}/></span> !
            </h1>
            <h2>
                <PrismicText field={settings.data.description} />   
            </h2>
      </div>
    </Bounded>
  );
};
