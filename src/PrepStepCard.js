import Button from "react-bootstrap/Button";

function PrepStepCard({ prepStep, subNotify }) {

    function handleDelete() {
        fetch(`https://recipe-service.herokuapp.com/prepsteps/${prepStep.prepStepId}`, { method: "DELETE" })
            .then(() => subNotify({ action: "delete-prepstep", prepStep: prepStep }))
            .catch(error => subNotify({ action: "delete-prepstep", error: error }));
    }

    return (
        <div className="col">
            <div className="card">
                <div className="card-body">
                    <h5>Step Number: {prepStep.stepNumber}</h5>
                    <h5>Text: {prepStep.prepStepText}</h5>
                    <div className="card-footer d-flex justify-content-center">
                    <div className="btn-group">
                        <Button className="btn btn-danger mr-3" type="button" onClick={handleDelete}>Delete</Button>
                        <Button className="btn btn-secondary" type="button" onClick={() => subNotify({ action: "edit-prepstep-form", prepStep: prepStep })}>Edit</Button>
                   </div>
                   </div>
                </div>
            </div>
        </div>
    );
}

export default PrepStepCard;
