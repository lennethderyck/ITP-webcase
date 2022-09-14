import React from 'react';
import * as prismicH from "@prismicio/helpers";
import { PrismicRichText } from "@prismicio/react";
import styles from '../../styles/slices/_title.module.scss';

const Title = ({ slice }) => (
  <section className={styles["section-title"]}>
      {prismicH.isFilled.richText(slice.primary.title) && (
        <div className={styles["slice-title"]}>
          <PrismicRichText field={slice.primary.title} />
        </div>
      )}
  </section>
)

export default Title