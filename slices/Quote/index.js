import * as prismicH from "@prismicio/helpers";
import { PrismicText } from "@prismicio/react";
import styles from "../../styles/slices/_quote.module.scss"

import { Bounded } from "../../components/Bounded";

const Quote = ({ slice }) => {
  return (
    <Bounded as="section" size="wide">
      {prismicH.isFilled.richText(slice.primary.quote) && (
        <div className={styles["quote"]}>
          <h1>&ldquo;
          <PrismicText field={slice.primary.quote} />
          &rdquo;
          </h1>
          <p>
          {prismicH.isFilled.keyText(slice.primary.source) && (
            <> &mdash; {slice.primary.source}</>
          )}
          </p>
        </div>
      )}
    </Bounded>
  );
};

export default Quote;