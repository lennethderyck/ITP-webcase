import Head from "next/head";
import { PrismicLink, PrismicText, PrismicRichText,SliceZone } from "@prismicio/react";
import * as prismicH from "@prismicio/helpers";
import { PrismicNextImage,  } from "@prismicio/next";

import { createClient, linkResolver } from "../../prismicio";
import { Layout } from "../../components/Layout";
import { Bounded } from "../../components/Bounded";

const dateFormatter = new Intl.DateTimeFormat("en-US", {
  month: "long",
  day: "numeric",
  year: "numeric",
});

//Component for a recipe that is included in the array of latest recipes
const LatestRecipe = ({ recipe }) => {

  //Gives the first image found in the slices for this component
  const featuredImage =
    (prismicH.isFilled.image(recipe.data.featuredImage) &&
      recipe.data.featuredImage) ||
    findFirstImage(recipe.data.slices);

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
      </div>
    </li>
  );
};

//The detail component for a recipe
const Recipe = ({ recipe, latestRecipes, navigation, settings }) => {

  //Gives the publish date set for this component
    const date = prismicH.asDate(
      recipe.data.publishDate || recipe.first_publication_date
    );

    //Finds the first image from teh slices that are linked to this component
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

    //Gets the text components from the slices that are linked to this component
    const getExcerpt = (slices) => {
      const text = slices
        .filter((slice) => slice.slice_type === "text")
        .map((slice) => prismicH.asText(slice.primary.text))
        .join(" ");
    
      return text;
    };

    const excerpt = getExcerpt(recipe.data.slices);

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
              {excerpt}
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
        <div className="ingredients">
          <div className="list-ingredients">
            <h1>Ingredients for 4 servings</h1>
            <ul>
              {recipe.data.ingredients.map((i) => {
                return(<li key={i.ingredient}><PrismicRichText field={i.ingredient} /></li>)
              })}
            </ul>
          </div>
          <div className="description-ingredients">
            <h1>Descriptions</h1>
            {recipe.data.descriptions.map((i, index) =>{
              return(<li key={i.step}>{index+1}. <PrismicRichText field={i.step} /></li>)
            })}
          </div>
        </div>
      </article>
      {latestRecipes.length > 0 && (
        <Bounded>
            <div className="latestRecipes">
              <h1>
                Latest recipes
              </h1>
              <ul className="latestRecipesList">
                {latestRecipes.map((recipe) => (
                  <LatestRecipe key={recipe.id} recipe={recipe} />
                ))}
              </ul>
            </div>
        </Bounded>
      )}
      </div>
    </Layout>
  );
};

export default Recipe;

//Gives all the data for 1 specific recipe, the 4 latest recipes, navigation details and setting details
export async function getStaticProps({ params, previewData }) {
  const client = createClient({ previewData });

  const recipe = await client.getByUID("recipe", params.uid);
  const latestRecipes = await client.getAllByType("recipe", {
    limit: 4,
    orderings: [
      { field: "my.recipe.publishDate", direction: "desc" },
      { field: "document.first_publication_date", direction: "desc" },
    ],
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

//Sets the correct path for this component
export async function getStaticPaths() {
  const client = createClient();

  const recipes = await client.getAllByType("recipe");

  return {
    paths: recipes.map((recipe) => prismicH.asLink(recipe, linkResolver)),
    fallback: false,
  };
}
