import * as prismicH from "@prismicio/helpers";
import { PrismicText } from "@prismicio/react";

import { Bounded } from "../../components/Bounded";

const Quote = ({ slice }) => {
  return (
    <Bounded as="section" size="wide">
      {prismicH.isFilled.richText(slice.primary.quote) && (
        <div className="quote">
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