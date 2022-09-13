import { PrismicLink, PrismicRichText, PrismicText } from "@prismicio/react";
import * as prismicH from "@prismicio/helpers";

import { Bounded } from "./Bounded";


export const Banner = ({ settings }) => {
  return (
    <Bounded as="banner">
      <div className="welcomeBanner">
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
