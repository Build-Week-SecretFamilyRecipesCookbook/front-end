import React, { useState } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { axiosWithAuth } from '../helpers/axiosWithAuth';

const AddRecipe = (props) =>{
    const { push } = useHistory();
	const params = useParams();
	let id = Number(params.id)
	const [recipe, setRecipe] = useState({
		recipe_name:"",
		category: "",
		source: "",
		ingredients: "",
        instructions: "",
	});
	
	const handleChange = (e) => {
        setRecipe({
            ...recipe,
            [e.target.name]: e.target.value
        });
    }

    const handleSubmit = (e) => {
		e.preventDefault();
			axiosWithAuth()
            .post('/recipes', recipe)
            .then(response=>{console.log(response)})
		}
	
	
	const { recipe_name,
    category,
    source,
    ingredients,
    instructions} = recipe;
    return(
        <>
        <h1>Add Recipe</h1>
        <div className="addRecipeForm">
			<form onSubmit={handleSubmit}>
				<div className="modal-header">						
				</div>
				<div className="modal-body">					
					<div className="form-group">
						<label>Recipe Name:</label>
						<input value={recipe_name} onChange={handleChange} name="recipe_name" type="text" className="form-control"/>
					</div>
					<div className="form-group">
						<label>Category:</label>
						<input value={category} onChange={handleChange} name="category" type="text" className="form-control"/>
					</div>
					<div className="form-group">
						<label>Source:</label>
						<input value={source} onChange={handleChange} name="source" type="text" className="form-control"/>
					</div>		
					<div className="form-group">
						<label>Ingredients</label>
						<textarea value={ingredients} onChange={handleChange} name="ingredients" className="form-control"></textarea>
					</div>
                    <div className="form-group">
						<label>Instructions</label>
						<textarea value={instructions} onChange={handleChange} name="instructions" className="form-control"></textarea>
					</div>	
				</div>
				<div className="modal-footer">			    
					<input type="submit" className="btn btn-info" value="Save"/>
					<Link to={`/recipes`}><input type="button" className="btn btn-default" value="Cancel"/></Link>
				</div>
			</form>
		</div>
        </>
    )
}

export default AddRecipe