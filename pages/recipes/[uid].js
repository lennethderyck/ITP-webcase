import Head from "next/head";
import { PrismicLink, PrismicText, PrismicRichText,SliceZone } from "@prismicio/react";
import * as prismicH from "@prismicio/helpers";
import { PrismicNextImage,  } from "@prismicio/next";
import {useEffect, useState} from "react";
import { QuantityPicker } from "react-qty-picker";

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

  const [countPersons, setCountPersons] = useState(4);
  const [ingredientsList, setIngredientsList] = useState([]);

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

    // const changeVolume = (value) => {
    //   setNewRecipe(recipe.data.test?.map((recipe, index) => {
    //     const number = isNaN(myArray[index]) ? myArray[index] : myArray[index]/4*value;
    //     if(!isNaN(number)){
    //       recipe.amount[0].text = number.toString()
    //     }
    //   }));
    //   console.log(newRecipe);
    //   console.log(myArray);
    // }

    useEffect(() => {
      // if(myArray.length != recipe.data.test?.length){
      //   recipe.data.test?.map((recipe) =>{
      //     const value = parseInt(recipe.amount[0]?.text);
      //     setMyArray(oldArray => [...oldArray, value]);
      //   })
      // }
      const ingredients = [];
      recipe.data.test?.forEach((ingredient)=>{
        ingredients.push({
          id: ingredient.ingredient && ingredient.ingredient[0] ? ingredient.ingredient[0].text : "",
          amount: ingredient.amount && ingredient.amount[0] ? ingredient.amount[0].text : "",
          unit: ingredient.unitofmeasure && ingredient.unitofmeasure[0] ? ingredient.unitofmeasure[0].text : ""
        })
        console.log(ingredient);
      })
      setIngredientsList(ingredients);
    },[recipe]);

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
              className="detail-img-cover"
            />
          )}
        </div>
        <div className="ingredients">
          <div className="list-ingredients">
            {ingredientsList.length?<><h2>Ingredients for {countPersons} servings</h2><QuantityPicker min={1} value={4} onChange={(value) =>setCountPersons(value)}/></>:"No ingredients available"}
            <ul>
              {ingredientsList?.map((i) => {
                return(<li key={i.id}><p>{(i.amount/4*countPersons) === 0 ? "":(i.amount/4*countPersons)} {i.unit} {i.id}</p></li>)
              })}
            </ul>
          </div>
          <div className="description-ingredients">
            <h2>Descriptions</h2>
            {recipe.data.descriptions?.map((i, index) =>{
              return(<li key={i.step[0]?.text}>{index+1}. <PrismicRichText field={i.step} /></li>)
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
