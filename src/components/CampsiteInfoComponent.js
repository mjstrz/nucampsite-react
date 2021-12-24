import React, { Component } from 'react'
import { Card, CardImg, CardImgOverlay, CardText, CardBody, CardTitle } from 'reactstrap';
import { CAMPSITES } from '../shared/campsites';
import Directory from './DirectoryComponent'


class CampsiteInfo extends Component {
    constructor(props) {
        super(props);

    
    }


    //task 2
    renderCampsite(campsite) {
        return (
            <div className="col-md-5 m-1">
                <Card>
                    <CardImg top src={campsite.image} ald={campsite.name} />
                    <CardBody>
                        <CardTitle>{campsite.name}</CardTitle>
                        <CardText>{campsite.description}</CardText>
                    </CardBody>
                </Card>
            </div>
        )
    }

    //task 3 
    renderComments(comments) {  
 
         if (comments) {
             return(
                 <div className="col-md-5 m-1">
                     <h4>Comments</h4>
                     {/* {this.state.selectedCampsite.id}
                     {this.state.selectedCampsite.name} */}
                     {comments.map(comment => 
                     <div>{comment.text} 
                         <div> -- {comment.author}, {new Intl.DateTimeFormat('en-US', { year: 'numeric', month: 'short', day: '2-digit'}).format(new Date(Date.parse(comment.date)))}
                         <br/><br/>
                         </div>
                     </div>)}
                    
                 </div>
             )
             
         }
         <div>
 
         </div>
     }

    render() {
        if (this.props.campsite) {
            return (
                //If so, then return an empty div that has the Bootstrap row class as an attribute.
                <div className="row">
                    {this.renderCampsite(this.props.campsite)}
                    {this.renderComments(this.props.campsite.comments)}
                </div>
            )
        }

        return (
            <div>
            </div>

        )
    }

}

export default CampsiteInfo;