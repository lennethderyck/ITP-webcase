import { PrismicLink, PrismicText,SliceZone } from "@prismicio/react";
import { PrismicNextImage } from "@prismicio/next";
import * as prismicH from "@prismicio/helpers";

//Finds the first image from teh slices that are linked to this component
const findFirstImage = (slices) => {
    const imageSlice = slices.find((slice) => slice.slice_type === "image");
  
    if (imageSlice && prismicH.isFilled.image(imageSlice.primary.image)) {
      return imageSlice.primary.image;
    }
  };
  
  //Gets the text components from the slices that are linked to this component
  //When the text is longer than 200 letters it will be sliced and 3 dots will be put at the end
  const getExcerpt = (slices) => {
    const text = slices
      .filter((slice) => slice.slice_type === "text")
      .map((slice) => prismicH.asText(slice.primary.text))
      .join(" ");
  
    const excerpt = text.substring(0, 200);
  
    if (text.length > 200) {
      return excerpt.substring(0, excerpt.lastIndexOf(" ")) + "…";
    } else {
      return excerpt;
    }
  };

//The recipe component for the homepage
const Recipe = ({ recipe }) => {
    const featuredImage =
      (prismicH.isFilled.image(recipe.data.featuredImage) &&
        recipe.data.featuredImage) ||
      findFirstImage(recipe.data.slices);
      const excerpt = getExcerpt(recipe.data.slices);
  
    return (
      <li>
        <PrismicLink document={recipe} tabIndex="-1">
          <div className="recipe-img">
            {prismicH.isFilled.image(featuredImage) && (
              <PrismicNextImage
                field={featuredImage}
                layout="fill"
              />
            )}
          </div>
        </PrismicLink>
        <div className="recipe-text">
          <h2>
            <PrismicLink document={recipe}>
              <PrismicText field={recipe.data.title} />
            </PrismicLink>
          </h2>
          <p className="duration">
            <PrismicText field={recipe.data.duration} />
          </p>
          {excerpt && (
            <p className="">
              {excerpt}
            </p>
          )}
        </div>
      </li>
    );
  };

  export default Recipe;