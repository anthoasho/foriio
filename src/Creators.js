import React from "react";
import {Title, Image, Loading, ProjectSmall} from "./Common";
import {Link, withRouter} from "react-router-dom";
import {useFetch} from "./Hooks";
import "./Creators.css";

function Creators(props) {
  const [data, loading] = useFetch("https://api.foriio.com/api/v1/promoted/users");
  let users
  if(!loading){
       document.title = `foriio | Creators`;
    users = data.users.map(elem => <SingleUser key={`user-id-${elem.id}`} {...elem} />)
  return (<div className="creators">
      <Title className="page-title right"> Picked up creators </Title>
      {users}
    </div>);
  }else{
    return(<div><Loading/></div>)
  }
}

function SingleUser(props){
  let works = props.works.map( elem => <ProjectSmall key={elem.id} {...elem} />)
  return(
    <div className="list-user">
      <div className="avatar-container">
        <Link to={`/user/${props.screen_name}`}>
          <Image className="list-user-avatar circle" src={props.avatar} />
        </Link>
      </div>
      <div className="meta">
        <Link to={`/user/${props.screen_name}`}>
            <Title className="username">
              {props.name}
            </Title>
          </Link>
        <Title className="profession">
          {props.profession}
        </Title>
        <Title className="screenname">
          {props.screen_name}
        </Title>
      </div>
      <div className="projects">
        {works}
      </div>
    </div>
  )
}

export default withRouter(Creators)
