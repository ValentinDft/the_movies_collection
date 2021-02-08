export default function(onPageMovie = true, action){
    console.log('action', action);
   if (action.type === "onMovie") {
    let onPageMovieCopy = action.onPageMovie;
    onPageMovieCopy = true
    console.log( "copy",onPageMovieCopy);
    return  onPageMovieCopy;
   }else {
       return onPageMovie;
   }
}