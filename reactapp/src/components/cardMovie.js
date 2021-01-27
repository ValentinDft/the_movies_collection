import React from "react";

function cardMovie() {
    return(
        
        <Col xs="12" lg="6" xl="4">
            <Card className="cardMovies">
                <CardImg src={props.moviesImg} />
                <CardBody>
                    <CardTitle>Like <FontAwesomeIcon icon={faHeart} className="curseur_pointeur"/></CardTitle>
                    <CardTitle>Nombres de vues <FontAwesomeIcon icon={faVideo} className="curseur_pointeur"/></CardTitle>
                    <CardTitle>Mon avis <FontAwesomeIcon icon={faStar} /><FontAwesomeIcon icon={faStar} /><FontAwesomeIcon icon={faStar} /><FontAwesomeIcon icon={faStar} /><FontAwesomeIcon icon={faStar} /> <button className="btn btn-secondary">-</button> <button className="btn btn-secondary">+</button></CardTitle>
                    <CardTitle>Moyenne <FontAwesomeIcon icon={faStar} /><FontAwesomeIcon icon={faStar} /><FontAwesomeIcon icon={faStar} /><FontAwesomeIcon icon={faStar} /><FontAwesomeIcon icon={faStar} /> ({props.moviesVote})</CardTitle>
                    <CardText>{props.moviesName}</CardText>
                    <CardText>{props.moviesDesc}</CardText>
                </CardBody>
            </Card>
        </Col>
            
    
    )
}

export default cardMovie;