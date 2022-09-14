import * as prismicH from "@prismicio/helpers";
import { PrismicRichText } from "@prismicio/react";
import { PrismicNextImage } from "@prismicio/next";
import { Bounded } from "../../components/Bounded";
import styles from '../../styles/slices/_img.module.scss';

const Image = ({ slice }) => {
  const image = slice.primary.image;

  return (
    <section className={styles["slice-img-container"]}>
      <figure className="grid grid-cols-1 gap-4">
        {prismicH.isFilled.image(image) && (
            <PrismicNextImage field={image} layout="responsive" />
        )}
        {prismicH.isFilled.richText(slice.primary.caption) && (
          <figcaption className={styles["slice-img-caption"]}>
            <PrismicRichText field={slice.primary.caption} />
          </figcaption>
        )}
      </figure>
    </section>
  );
};

export default Image;