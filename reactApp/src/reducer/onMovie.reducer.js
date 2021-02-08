export default function(onPageMovie = false, action){
    console.log('action', action);
   if (action.type === "onMoviePage") {
    let onPageMovieCopy = action.onPageMovie;
    onPageMovieCopy = true
    console.log( "onMovie reducer",onPageMovieCopy);
    return  onPageMovieCopy;
   }else {
       return onPageMovie;
   }
}