import React from "react";
import '../App.css';

function CarouselMovie(props) {


    return(
        
        <div>
            <h2 className="movie-carousel" style={{backgroundImage:`url(${props.movieImg})`}}>{props.movieName}</h2>
        </div>
        
    )
}

export default CarouselMovie;  