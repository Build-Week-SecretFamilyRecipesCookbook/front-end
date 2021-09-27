import React, { useEffect, useState } from 'react';
import { Link, useParams, useHistory } from 'react-router-dom';
import { axiosWithAuth } from '../helpers/axiosWithAuth';

import axios from 'axios';

const Recipe = (props) => {


    const [recipe, setRecipe] = useState('');

    const { id } = useParams();
    const { push } = useHistory();

    useEffect(()=>{
        axiosWithAuth()
        .get(`/api/movies/${id}`)
            .then(res=>{
                setRecipe(res.data);
            })
            .catch(err=>{
                console.log(err.response);
            })
    }, [id]);


    return(<div className="modal-page col">
        <div className="modal-dialog">
            <div className="modal-content">
                <div className="modal-header">						
                    <h4 className="modal-title">{recipe.recipe_name} Details</h4>
                </div>
                <div className="modal-body">
                    <div className="flexContainer">

                        <section className="movie-details">
                            <div>
                                <label>Recipe Name: <strong>{recipe.recipe_name}</strong></label>
                            </div>
                            <div>
                                <label>Category: <strong>{recipe.category}</strong></label>
                            </div>
                            <div>
                                <label>Source: <strong>{recipe.source}</strong></label>
                            </div>
                            <div>
                                <label>Ingredients: <strong>{recipe.ingredients}</strong></label>
                            </div>
                            <div>
                                <label>Instructions:</label>
                                <p><strong>{recipe.instructions}</strong></p>
                            </div>
                        </section>
                        
                        <section>
                            <span className="m-2 btn btn-dark">Favorite</span>
                            <Link to={`/movies/edit/${recipe.id}`} className="m-2 btn btn-success">Edit</Link>
                        </section>
                    </div>
                </div>
            </div>
        </div>
    </div>);
}

export default Recipe;