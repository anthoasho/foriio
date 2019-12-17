import React, {useState, useEffect,Fragment, useRef} from "react";
import { withRouter } from 'react-router-dom';

export function useFetch(url) {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    async function fetchUrl() {
      setLoading(true);
      const response = await fetch(url);
      const json = await response.json();
      setData(json);
      setLoading(false);
      //temporary method for storing history
      if(json["work"] !== undefined){
        localStorage.setItem("lastName", json.work.title)
      }
      if(json["profile"]!== undefined){
        localStorage.setItem("lastName", json.profile.name)
      }
    }
    fetchUrl();
  }, [url]);
  return [data, loading];
}

function ScrollToTop({ history, children }) {
  useEffect(() => {
    const scrollAndUnlisten = history.listen(() => {
      window.scrollTo(0, 0);
    });
    return () => {
      scrollAndUnlisten();
    }
  });
  return <Fragment>{children}</Fragment>;
}

function useOutsideDetect(ref, action) {
  function handleClickOutside(event) {
    if (ref.current && !ref.current.contains(event.target)) {
      action()
    }
  }
  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  });
}
export function OutsideDetect(props) {
  const wrapperRef = useRef(null);
  useOutsideDetect(wrapperRef, props.action);
  return <div ref={wrapperRef}>{props.children}</div>;
}
export default withRouter(ScrollToTop);
