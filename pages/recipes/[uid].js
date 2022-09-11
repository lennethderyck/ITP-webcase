import Head from "next/head";
import { PrismicLink, PrismicText, SliceZone } from "@prismicio/react";
import * as prismicH from "@prismicio/helpers";
import { PrismicNextImage } from "@prismicio/next";

import { createClient, linkResolver } from "../../prismicio";
import { components } from "../../slices";
import { Layout } from "../../components/Layout";
import { Bounded } from "../../components/Bounded";
import { Heading } from "../../components/Heading";

const dateFormatter = new Intl.DateTimeFormat("en-US", {
  month: "long",
  day: "numeric",
  year: "numeric",
});

const LatestRecipe = ({ recipe }) => {

  return (
    <li>
      <h1 className="mb-3 text-3xl font-semibold tracking-tighter text-slate-800 md:text-4xl">
        <PrismicLink document={recipe}>
          <PrismicText field={recipe.data.title} />
        </PrismicLink>
      </h1>
    </li>
  );
};

const Recipe = ({ recipe, latestRecipes, navigation, settings }) => {
  const date = prismicH.asDate(
    recipe.data.publishDate || recipe.first_publication_date
  );

    const findFirstImage = (slices) => {
        const imageSlice = slices.find((slice) => slice.slice_type === "image");
      
        if (imageSlice && prismicH.isFilled.image(imageSlice.primary.image)) {
          return imageSlice.primary.image;
        }
      };

    const featuredImage =
    (prismicH.isFilled.image(recipe.data.featuredImage) &&
      recipe.data.featuredImage) ||
    findFirstImage(recipe.data.slices);

  return (
    <Layout
      withHeaderDivider={false}
      withProfile={false}
      navigation={navigation}
      settings={settings}
    >
      <Head>
        <title>
          {prismicH.asText(recipe.data.title)} |{" "}
          {prismicH.asText(settings.data.websiteName)}
        </title>
      </Head>
      <div className="container detail-container">
      <Bounded>
        <PrismicLink
          href="/"
          className="back-btn"
        >
          &larr; Back to home
        </PrismicLink>
      </Bounded>
      <article>
        <Bounded className="pb-0">
          <div className="recipe-header">
            <h1>
              <PrismicText field={recipe.data.title} />
            </h1>
            <h3>
              <PrismicText field={recipe.data.description} />
            </h3>
            <h2>
              By <PrismicText field={recipe.data.maker} />
            </h2>
            <p className="font-serif italic tracking-tighter text-slate-500">
              {dateFormatter.format(date)}
            </p>
          </div>
        </Bounded>
        <div className="detail-img">
          {prismicH.isFilled.image(featuredImage) && (
            <PrismicNextImage
              field={featuredImage}
              layout="fill"
              className="object-cover"
            />
          )}
        </div>
        {/* <SliceZone slices={recipe.data.slices} components={components} /> */}
      </article>
      {latestRecipes.length > 0 && (
        <Bounded>
          <div className="grid grid-cols-1 justify-items-center gap-16 md:gap-24">
            <div className="w-full">
              <Heading size="2xl" className="mb-10">
                Latest recipes
              </Heading>
              <ul className="grid grid-cols-1 gap-12">
                {latestRecipes.map((recipe) => (
                  <LatestRecipe key={recipe.id} recipe={recipe} />
                ))}
              </ul>
            </div>
          </div>
        </Bounded>
      )}
      </div>
    </Layout>
  );
};

export default Recipe;

export async function getStaticProps({ params, previewData }) {
  const client = createClient({ previewData });

  const recipe = await client.getByUID("recipe", params.uid);
  const latestRecipes = await client.getAllByType("recipe", {
    limit: 3,
  });
  const navigation = await client.getSingle("navigation");
  const settings = await client.getSingle("settings");

  return {
    props: {
        recipe,
      latestRecipes,
      navigation,
      settings,
    },
  };
}

export async function getStaticPaths() {
  const client = createClient();

  const recipes = await client.getAllByType("recipe");

  return {
    paths: recipes.map((recipe) => prismicH.asLink(recipe, linkResolver)),
    fallback: false,
  };
}
