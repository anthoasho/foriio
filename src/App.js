import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route} from "react-router-dom";
import Navbar from "./Navbar";
import Creators from "./Creators";
import './App.css';
import ScrollToTop from "./Hooks";
import UserPage from "./UserPage";
import ProjectPage from "./ProjectPage";

function Container(props){
  return(
    <div className="container">{props.children} </div>
  )
}
function App() {
  return (
    <Router onUpdate={() => window.scrollTo(0, 0)} >
    <Container>
      <Navbar />
      <ScrollToTop>
        <Switch>
          <Route exact path ="/">
            <Creators />
          </Route>
          <Route path ="/user/:name" component={(props) => <UserPage {...props}/>}  />
          <Route path ="/works/:workId" component ={(props) => <ProjectPage {...props} />} />
        </Switch>
        </ScrollToTop>
      </Container>

    </Router>
  );
}



export default App;
