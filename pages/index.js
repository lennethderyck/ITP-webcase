import Head from "next/head";
import { SliceZone } from "@prismicio/react";
import * as prismicH from "@prismicio/helpers";

import { createClient } from "../prismicio";
import { Layout } from "../components/Layout";
import { Banner } from "../components/Banner";
import { components } from "../slices";
import Recipe from '../components/Recipe'
import {useState} from "react";


//The homepage component
const Index = ({recipes, navigation, settings }) => {
  const [recipesLength, setRecipesLength] = useState(3)
  const [showButton, setShowButton] = useState(true);

  //Loads more recipes when the "Load more" button is clicked
  const showMoreRecipes = () =>{
    console.log(recipesLength)
    console.log(recipes.length)
    if(recipes.length <= recipesLength+1){
      setShowButton(false);
    }
    else{
      setShowButton(true);
    }
    setRecipesLength(recipesLength + 3)
  };

  return (
    <Layout
      navigation={navigation}
      settings={settings}
    >
      <Head>
        <title>{prismicH.asText(settings?.data.websiteName)}</title>
      </Head>
      <div className="container">
        <Banner settings={settings}/>
        <SliceZone slices={settings?.data.slices} components={components} />
        <ul className="recipe">
          {recipes.slice(0, recipesLength).map((recipe) => (
            <Recipe key={recipe?.id} recipe={recipe} />
          ))}
        </ul>
        <div className="btn-container"><button className={`btn btn-primary ${showButton?"":"disable"}`} onClick={() => showMoreRecipes()}>Load more</button></div>
        
      </div>
    </Layout>
  );
};

export default Index;

//Gets the data for all recipes, the navigation and the settings
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
