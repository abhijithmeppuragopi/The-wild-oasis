import { useEffect, useRef } from "react";



function useCloseWindow(handler, listenCapturing=true){
    const ref = useRef();

  useEffect( function(){
    function handleClick(e){
      if(ref.current && !ref.current.contains(e.target))  {
        console.log('im working');
        handler();
      }
    }
    document.addEventListener('click',handleClick,listenCapturing);
    return ()=> document.removeEventListener('click',handleClick,listenCapturing);
  },[handler,listenCapturing])

  return ref
}
export default useCloseWindow;