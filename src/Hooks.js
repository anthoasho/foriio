import React, {useState, useEffect,Fragment} from "react";
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
    }
    fetchUrl();
  }, [url]);
  return [data, loading];
}

function ScrollToTop({ history, children }) {
  useEffect(() => {
    const unlisten = history.listen(() => {
      window.scrollTo(0, 0);
    });
    return () => {
      unlisten();
    }
  });

  return <Fragment>{children}</Fragment>;
}

export default withRouter(ScrollToTop);
