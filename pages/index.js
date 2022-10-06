import Head from "next/head";
import { SliceZone } from "@prismicio/react";
import * as prismicH from "@prismicio/helpers";

import { createClient } from "../prismicio";
import { Layout } from "../components/Layout";
import { Banner } from "../components/Banner";
import { components } from "../slices";
import Recipe from '../components/Recipe'
import {useState, useCallback, useEffect} from "react";


//The homepage component
const Index = ({recipes, navigation, settings }) => {
  const [recipesLength, setRecipesLength] = useState(3);
  const [showButton, setShowButton] = useState(true);
  const [recipeList, setRecipeList] = useState(recipes);

  const [text, setText] = useState("");
  const [search, setSearch] = useState("");

  const handleInputChange = useCallback((e) => setText(e.target.value), []);
  const handleSearch = useCallback(() => {setSearch(text)}, [text]);

  // const testList = recipes.filter((recipe) => {
  //   console.log(recipe.tags);
  //   console.log(search);
  //   return recipe.tags.includes(search);
  // })
  // console.log(testList)

  useEffect(() => {
    const filteredRecipes = []
    if(search){
      filteredRecipes = recipes.filter((recipe) => recipe.tags.find((t) => t.includes(search.toLocaleLowerCase())) !== undefined)
    } else {
      filteredRecipes = recipes
    }
    setRecipeList(filteredRecipes);
  },[search]);
  useEffect(() => {
    setRecipeList(recipes);
  },[]);

  //Loads more recipes when the "Load more" button is clicked
  const showMoreRecipes = () =>{
    if(recipes.length <= recipesLength+3){
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
        <div className="home-recipes-header">
          <h2>Recipes</h2>
          <div className="home-recipes-search">
            <input
              type="search"
              value={text}
              onChange={handleInputChange}
              className="search-input"
              placeholder="Search for a recipe"
            />
            <button
              type="button"
              onClick={handleSearch}
              className="search-btn"
            >
              Search
            </button>
          </div>
        </div>
        <ul className="recipe">
          {recipeList?recipeList.slice(0, recipesLength).map((recipe) => (
            <Recipe key={recipe?.id} recipe={recipe} />
          )):"No recipes found"}
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
