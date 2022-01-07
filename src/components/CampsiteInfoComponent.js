import React, { Component } from 'react';
import { Card, CardImg, CardText, CardBody, CardTitle, Breadcrumb, BreadcrumbItem, Button, Modal, ModalHeader, ModalBody, Row, Label, Col } from 'reactstrap';
import { Link } from 'react-router-dom';
import { Control, LocalForm, Errors } from 'react-redux-form';
import { Loading } from './LoadingComponent';
import { baseURL } from '../shared/baseURL';

const required = val => val && val.length;
const maxLength = len => val => !val || (val.length <= len);
const minLength = len => val => val && (val.length >= len);

function RenderCampsite({campsite}) {
        return (
            <div className="col-md-5 m-1">
                <Card>
                    <CardImg top src={baseURL + campsite.image} ald={campsite.name} />
                    <CardBody>
                        <CardText>{campsite.description}</CardText>
                    </CardBody>
                </Card>
            </div>
        );
    }

function RenderComments({comments, postComment, campsiteId}) {  
 
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
                    <CommentForm campsiteId={campsiteId} postComment={postComment} />
                 </div>
             )
             
         }
         <div>
 
         </div>
     }

function CampsiteInfo(props) {
    if (props.isLoading) {
        return (
            <div className="container">
                <div className="row">
                    <Loading />
                </div>
            </div>
        );
    }
    if (props.errMess) {
        return (
            <div className="container">
                <div className="row">
                    <div className="col">
                        <h4>{props.errMess}</h4>
                    </div>
                </div>
            </div>
        );
    }
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
                            postComment={props.postComment}
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
        //Week 5 Redux ex. 3
        this.props.postComment(this.props.campsiteId, values.rating, values.author, values.text);
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
                    <ModalBody>
                        <LocalForm onSubmit={values => this.handleSubmit(values)}>

                    {/* Rating */}
                        <div className="form-group">
                        <Label htmlFor='rating'>Rating</Label>
                                    <Control.select model='.rating' name='rating' id='rating'
                                            className='form-control'>
                                                <option>1</option>
                                                <option>2</option>
                                                <option>3</option>
                                                <option>4</option>
                                                <option>5</option>
                                            </Control.select>
                                </div>

                     {/* Author */}
                            <div className="form-group">
                            <Label htmlFor="author">Your Name</Label>
                                    <Control.text model=".author" id="author" name="author"
                                        placeholder="Your Name"
                                        className="form-control"
                                        validators={{
                                            required, 
                                            minLength: minLength (2),
                                            maxLength: maxLength(15)
                                        }}
                                     />
                                    <Errors
                                        className="text-danger"
                                        model=".author"
                                        show="touched"
                                        component="div"
                                        messages={{
                                            required: "Required",
                                            minLength: "Must be at least 2 characters",
                                            maxLength: "Must be 15 characters or less"
                                        }} 
                                    />
                                </div>
                     
                    {/* Text */}
                            <div className="form-group">
                            <Label htmlFor="text">Comments</Label>
                                {/* <Col md={10}> */}
                                    <Control.textarea model=".text" id="text" name="text"
                                        className="form-control"
                                        rows="6"
                                    />
                                </div>
                                <div>
                                    <Button type="submit" color="primary">
                                        Submit Comment
                                    </Button>
                                </div>
                        </LocalForm>
                    </ModalBody>
                </Modal>
            </div>
        )
    }

}

    
export default CampsiteInfo;