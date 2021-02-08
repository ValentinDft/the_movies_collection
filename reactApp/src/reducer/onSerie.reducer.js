export default function(onPageSerie = true, action){
    console.log('action', action);
   if (action.type === "onSeriePage") {
    let onPageSerieCopy = action.onPageSerie;
    onPageSerieCopy = false
    console.log( "onSerie reducer",onPageSerieCopy);
    return  onPageSerieCopy;
   }else {
       return onPageSerie;
   }
}