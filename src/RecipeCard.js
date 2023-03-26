import Button from "react-bootstrap/Button";
import "./index.css";

function RecipeCard({ recipe, notify }) {

    function handleDelete() {
        fetch(`https://recipe-service.herokuapp.com/recipes/${recipe.recipeId}`, { method: "DELETE" })
            .then(() => notify({ action: "delete", recipe: recipe }))
            .catch(error => notify({ action: "delete", error: error }));
    }

    return (
        <div className="card-col">
        <div className="col">
            <div className="card">
                <div className="card-body">
                    <h5>Title: {recipe.title}</h5>
                    <h5>Servings: {recipe.servings}</h5>
                    <h5>Prep Time: {recipe.prepTime}</h5>
                    <h5>Cook Time: {recipe.cookTime}</h5>
                    <h5>Category: {recipe.category}</h5>
                    <h5>Description: {recipe.description}</h5>
                    <div className="card-footer d-flex justify-content-center">
                        <div className="btn-group">
                        <Button className="btn btn-danger mr-3" type="button" onClick={handleDelete}>Delete</Button>
                        <Button className="btn btn-warning" type="button" onClick={() => notify({ action: "edit-form", recipe: recipe })}>Edit</Button>
                        <Button className="btn btn-secondary" type="button" onClick={() => notify({ action: "details", recipe: recipe })}>Details</Button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        </div>
    );
}

export default RecipeCard;
