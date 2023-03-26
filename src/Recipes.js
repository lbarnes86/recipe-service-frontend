import { useState, useEffect } from 'react';
import RecipeCard from './RecipeCard.js';
import RecipeForm from './RecipeForm.js';
import RecipeDetailsForm from './RecipeDetailsForm.js';
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import './index.css';

function Recipes() {

    const [recipes, setRecipes] = useState([]);
    const [showForm, setShowForm] = useState(false);
    const [showDetailsForm, setShowDetailsForm] = useState(false);
    const [scopedRecipe, setScopedRecipe] = useState({});
    const [error, setError] = useState();

    useEffect(() => {
        fetchFromAPI();
    }, []);

    function fetchFromAPI() {
        fetch("https://recipe-service.herokuapp.com/recipes")
            .then(response => response.json())
            .then(result => { console.log(JSON.stringify(result)); setRecipes(result); })
            .catch(console.log);
    }

    function addClick() {
        setScopedRecipe({ recipeId: 0, title: "", category: "Carnivore", description: "", prepTime: 0, cookTime: 0, servings: 0 });
        setShowForm(true);
    }

    function notify({ action, recipe, error }) {

        if (error) {
            setError(error);
            setShowForm(false);
            setShowDetailsForm(false);
            return;
        }

        switch (action) {
            case "add":
                setRecipes([...recipes, recipe]);
                break;
            case "edit":
                setRecipes(recipes.map(e => {
                    if (e.recipeId === recipe.recipeId) {
                        return recipe;
                    }
                    return e;
                }));
                break;
            case "edit-form":
                setScopedRecipe(recipe);
                setShowForm(true);
                return;
            case "details":
                setScopedRecipe(recipe);
                setShowDetailsForm(true);
                return;
            case "delete":
                setRecipes(recipes.filter(e => e.recipeId !== recipe.recipeId));
                break;
            case "exit-details-form":
                fetchFromAPI();
                break;
                default:
        }
        
        setError("");
        setShowForm(false);
        setShowDetailsForm(false);
    }

    if (showForm) {
        return <RecipeForm recipe={scopedRecipe} notify={notify} />
    } else if (showDetailsForm) {
        return <RecipeDetailsForm recipe={scopedRecipe} notify={notify} />
    }

    return (
        <>
            <Container fluid>
           
            <div >   
              
                <div >
                    <h1 className='recipe-title'>Recipes</h1>
                </div>

                <div className='button-div'>

                    
                    <Button variant="primary" className='recipe-button' onClick={addClick}>Add a Recipe</Button>
                  
               
                </div>
            </div>
            </Container>

            {error && <div className="alert alert-danger">{error}</div>}
            {recipes.length === 0 ? <div className="alert alert-warning">No Recipes</div>
                : (<div className="row row-cols-3">
                    {recipes.map(r => <RecipeCard key={r.recipeId} recipe={r} notify={notify} />)}
                </div>)}
        </>
    )
}

export default Recipes;