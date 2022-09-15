import React from 'react';
import * as prismicH from "@prismicio/helpers";
import { PrismicRichText } from "@prismicio/react";
import styles from "../../styles/slices/_text.module.scss"

import { Bounded } from "../../components/Bounded";


const Text = ({ slice }) => (
  <Bounded as="section">
    {prismicH.isFilled.richText(slice.primary.text) && (
        <div className={styles["slices-text"]}>
          <PrismicRichText field={slice.primary.text} />
        </div>
      )}
  </Bounded>
)

export default Text