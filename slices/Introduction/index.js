import React from 'react';
import * as prismicH from "@prismicio/helpers";
import { PrismicRichText } from "@prismicio/react";
import styles from '../../styles/slices/_introduction.module.scss';

const Introduction = ({ slice }) => (
  <section className={styles["section-introduction"]}>
      {prismicH.isFilled.richText(slice.primary.introduction) && (
        <div className={styles["slice-introduction"]}>
          <PrismicRichText field={slice.primary.introduction} />
        </div>
      )}
  </section>
)

export default Introduction