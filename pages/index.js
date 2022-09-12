import Head from "next/head";
import { PrismicLink, PrismicText,SliceZone } from "@prismicio/react";
import { PrismicNextImage } from "@prismicio/next";
import * as prismicH from "@prismicio/helpers";

import { createClient } from "../prismicio";
import { Layout } from "../components/Layout";
import { Banner } from "../components/Banner";
import { components } from "../slices";

const dateFormatter = new Intl.DateTimeFormat("en-US", {
  month: "short",
  day: "numeric",
  year: "numeric",
});

const findFirstImage = (slices) => {
  const imageSlice = slices.find((slice) => slice.slice_type === "image");

  if (imageSlice && prismicH.isFilled.image(imageSlice.primary.image)) {
    return imageSlice.primary.image;
  }
};

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

const Index = ({recipes, navigation, settings }) => {
  return (
    <Layout
      withHeaderDivider={false}
      navigation={navigation}
      settings={settings}
    >
      <Head>
        <title>{prismicH.asText(settings.data.websiteName)}</title>
      </Head>
      <div className="container">
        <Banner settings={settings}/>
        <SliceZone slices={settings.data.slices} components={components} />
        <ul className="recipe">
          {recipes.map((recipe) => (
            <Recipe key={recipe.id} recipe={recipe} />
          ))}
        </ul>
      </div>
    </Layout>
  );
};

export default Index;

export async function getStaticProps({ previewData }) {
  const client = createClient({ previewData });

  const recipes = await client.getAllByType("recipe");
  const navigation = await client.getSingle("navigation");
  const settings = await client.getSingle("settings");

  return {
    props: {
      recipes,
      navigation,
      settings,
    },
  };
}
