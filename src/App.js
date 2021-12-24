import React, { Component } from 'react';
import { Navbar, NavbarBrand } from 'reactstrap';
import Directory from './components/DirectoryComponent';
import './App.css';
import { CAMPSITES } from './shared/campsites';
import { Card, CardImg, CardImgOverlay, CardText, CardBody, CardTitle } from 'reactstrap';
import CampsiteInfoComponents from './components/CampsiteInfoComponent';


class App extends Component {
    constructor(props) {
        super(props); 
            this.state = {
                campsites: CAMPSITES 
            };
            
        this.state = {
            selectedCampsite: null
        };
    }

    onCampsiteSelect(campsite) {
        this.setState({selectedCampsite: campsite});
    }
  
    //task 2
    // renderCampsite(campsite) {
    //     return (
    //         <div className="col-md-5 m-1">
    //             <Card>
    //                 <CardImg top src={campsite.image} ald={campsite.name} />
    //                 <CardBody>
    //                     <CardTitle>{campsite.name}</CardTitle>
    //                     <CardText>{campsite.description}</CardText>
    //                 </CardBody>
    //             </Card>
    //         </div>
    //     )
    // }

    //task 3 
    // renderComments(comments) {
    //    console.log(comments + "hello");
       

    //     if (comments) {
    //         return(
    //             <div className="col-md-5 m-1">
    //                 <h4>Comments</h4>
    //                 {/* {this.state.selectedCampsite.id}
    //                 {this.state.selectedCampsite.name} */}
    //                 {this.state.selectedCampsite.comments.map(comment => 
    //                 <div>{comment.text} 
    //                     <div> -- {comment.author}, {new Intl.DateTimeFormat('en-US', { year: 'numeric', month: 'short', day: '2-digit'}).format(new Date(Date.parse(comment.date)))}
    //                     <br/><br/>
    //                     </div>
    //                 </div>)}
                   
    //             </div>
    //         )
            
    //     }
    //     <div>

    //     </div>
    // }
  
    render() {
        // const directory = CAMPSITES.map(campsite => {
        //     return (
        //         <div key={campsite.id} className="col-md-5 m-1">
        //             <Card onClick={() => this.onCampsiteSelect(campsite)}>
        //                 <CardImg width="100%" src={campsite.image} alt={campsite.name} />
        //                 <CardImgOverlay>
        //                     <CardTitle>{campsite.name}</CardTitle>
        //                 </CardImgOverlay>
        //                 </Card>
        //         </div>
        //     );
        // });
 
        return (
            <div className="App"> 
                <Navbar dark color="primary">
                    <div className="container">
                    <NavbarBrand href="/">NuCamp</NavbarBrand>
                    </div>  
                </Navbar>
                {/* <h1>This page has {CAMPSITES.length} campsites</h1> */}
 
                {/* <div className="container">
                    <div className="row">
                        {directory}
                    </div>
                    <div className="row">
                        {this.renderCampsite(this.state.selectedCampsite || {})}
                        {this.renderComments(this.state.selectedCampsite && this.state.selectedCampsite.comments)}
                    </div>
                </div> */}
 
                <Directory campsites={this.state.campsites} />
            </div>
        );
    }
}

export default App;