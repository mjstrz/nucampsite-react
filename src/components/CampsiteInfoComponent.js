import React from 'react'
import { Card, CardImg, CardText, CardBody, CardTitle, Breadcrumb, BreadcrumbItem } from 'reactstrap';
import { Link } from 'react-router-dom';

function RenderCampsite({campsite}) {
        return (
            <div className="col-md-5 m-1">
                <Card>
                    <CardImg top src={campsite.image} ald={campsite.name} />
                    <CardBody>
                        <CardText>{campsite.description}</CardText>
                    </CardBody>
                </Card>
            </div>
        );
    }

function RenderComments({comments, addComment, campsiteId}) {  
 
         if (comments) {
             return(
                 <div className="col-md-5 m-1">
                     <h4>Comments</h4>
                     {comments.map(comment => 
                     <div>{comment.text} 
                         <div> -- {comment.author}, {new Intl.DateTimeFormat('en-US', { year: 'numeric', month: 'short', day: '2-digit'}).format(new Date(Date.parse(comment.date)))}
                         <br/><br/>
                         </div>
                     </div>)}
                    <CommentForm campsiteId={campsiteId} addComment={addComment} />
                 </div>
             )
             
         }
         <div>
 
         </div>
     }

function CampsiteInfo(props) {
        if (props.campsite) {
            return (
                <div className="container">
                <div className="row">
                    <div className="col">
                        <Breadcrumb>
                            <BreadcrumbItem><Link to="/directory">Directory</Link></BreadcrumbItem>
                            <BreadcrumbItem active>{props.campsite.name}</BreadcrumbItem>
                        </Breadcrumb>
                        <h2>{props.campsite.name}</h2>
                        <hr />
                    </div>
                </div>
                    <div className="row">
                        <RenderCampsite campsite={props.campsite} />
                        <RenderComments 
                            comments={props.comments} 
                            addComment={props.addComment}
                            campsiteId={props.campsite.id}
                        />
                    </div>
                </div>
            )
        }

        return <div />
    }


class CommentForm extends Component {

    constructor(props) {
        super(props);
        this.state = {
            idModalOpen: false
        };
        this.toggleModal = this.toggleModal.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    toggleModal() {
        this.setState({
            isModalOpen: !this.state.isModalOpen
        });
    }

    handleSubmit(values) {
        this.toggleModal();
        this.props.addComment(this.props.campsiteId, values.rating, values.author, values.text);
        console.log('Current State is: ' + JSON.stringify(values));
        alert('Current State is ' + JSON.stringify(values));
    }

    render() {
        return (
            <div>
                <Button outline onClick={this.toggleModal}>
                    <i className="fa fa-pencil fa-lg" />Submit Comment
                </Button>
                <Modal isOpen={this.state.isModalOpen} toggle={this.toggleModal}>
                    <ModalHeader toggle={this.toggleModal}>Submit Comment</ModalHeader>
                </Modal>
            </div>
        )
    }

}

handleSubmit(values) {
    this.toggleModal();
    this.props.addComment(this.props.campsiteId, values.rating, values.author, values.text);
    }
    
export default CampsiteInfo;