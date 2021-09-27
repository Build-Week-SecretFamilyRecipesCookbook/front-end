/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import RecipeCard from "../components/RecipeCard";
import { axiosWithAuth } from "../helpers/axiosWithAuth";

const Recipes = () => {
  const {push} = useHistory()

  const [recipes, setRecipes] = useState([])
  const handleAddItemClick = (e)=>{
    push("/addrecipe")
  }

 useEffect(()=>{
  const getRecipeData = () =>{ axiosWithAuth()
  .get('/recipes')
  .then((response)=>{
    console.log("Response data", response.data)
    setRecipes(response.data)
    console.log(recipes)
  })
  .catch(err=>console.log(err));}
  getRecipeData();
 },[recipes.length])

  return (
    <>
      <h1>Recipes</h1>
      <button className="addRecipe" onClick={handleAddItemClick} recipes={recipes}>Add Recipe</button>
      <div className="col">
            <table className="table table-striped table-hover">
                <thead>
                <tr>
                    <th>Recipe Name</th>
                    <th>Category</th>
                    <th>Source</th>
                    <th></th>
                </tr>
                </thead>

                <tbody>
                    {
                        recipes.map(recipe=><RecipeCard key={recipe.id} recipe={recipe}/>)
                    }
                </tbody>
            </table>
        </div>
    </>
  );
};

export default Recipes;
