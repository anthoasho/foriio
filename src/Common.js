import React from "react";
import {Link} from "react-router-dom";
import DefaultAvatar from "./default-avatar.png";

export function Title(props){
  return(
    <h1 className={props.className}> {props.children}</h1>
  )
}


export function Image(props){
  return(
    <div className = {props.className}>
      <img onError={errorSrc} alt={props.alt} src={props.src || DefaultAvatar} />
    </div>
  )
}
function errorSrc(e){
  e.target.src = DefaultAvatar;
}
export function Loading({string = "foriio"}){
  string = string.split("")
  const loading = string.map((elem, i) => <span key= {`loading-${i}`}style={{animationDelay: `${i * 0.08}s`}}>{elem}</span>)
  return(
    <div className="loading">  {loading} </div>
  )
}

export function UserProjectList(props){
  let works = props.projects.map( elem => <ProjectSmall key={`projects-${elem.id}`} {...elem} />)
  return(<div className = "projects">{works}</div>)
}

export function ProjectSmall(props){
  return(
    <Link to={`/works/${props.id}`}>
      <div className="list-user-project" >
        <Image src={props.thumbnail} />
        <Title> {props.title} </Title>
      </div>
    </Link>
  )
}
