import React from 'react';
import { Link } from 'react-router-dom';

const RecipeCard = (props) =>{
    const { id, recipe_name, source, category} = props.recipe;
    return(
        <tr key={id}>
      <td>{recipe_name}</td>
      <td>{source}</td>
      <td>{category}</td>
      <td>
        <Link to={`/recipes/${id}`} className="view">
          <input type="button" className="btn btn-secondary" value="View"/>
        </Link>
      </td>
  </tr>
    )
}

export default RecipeCard