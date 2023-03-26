import Button from "react-bootstrap/Button";

function RatingCard({ rating, subNotify }) {

    function handleDelete() {
        fetch(`https://recipe-service.herokuapp.com/ratings/${rating.ratingId}`, { method: "DELETE" })
            .then(() => subNotify({ action: "delete-rating", rating: rating }))
            .catch(error => subNotify({ action: "delete-rating", error: error }));
    }

    return (
        <div className="col">
            <div className="card">
                <div className="card-body">
                    <h5>Recommended: {rating.recommended ? 'Y' : 'N'}</h5>
                    <h5>Number of Stars: {rating.numStars}</h5>
                    <h5>Text: {rating.ratingText}</h5>
                    <div className="card-footer d-flex justify-content-center">
                    <div className="btn-group">
                        <Button className="btn btn-danger mr-3" type="button" onClick={handleDelete}>Delete</Button>
                    </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default RatingCard;
