import React from 'react';
import {Link} from "react-router-dom";
import {Image, Title, Loading, UserProjectList} from "./Common";
import {useFetch} from "./Hooks";
import "./ProjectPage.css";

function ProjectPage(props){
  const [data, loading] = useFetch(
      `https://api.foriio.com/api/v1/works/${props.match.params.workId}`
    );
    if(!loading){
      document.title = `foriio | ${data.work.title}`;

      return (
        <div>
          <Author {...data.work.author}/>
          <Title className="page-title right"> {data.work.title} </Title>
          <div className="project-full">
            <ProjectMeta  {...data.work}/>
            {data.work.type === "image" &&<ImageList images= {data.work.images}/>}
            {data.work.type === "web_article" &&<WebArticle {...data.work.web_articles[0]}/>}
            {data.work.type === "website" &&<Website {...data.work}/>}
            {data.work.type === "video" &&<VideoPage {...data.work}/>}

          </div>
          <Title className="page-title small left"> Credits </Title>
          <Credits {...data.work} />
          <Title className="page-title small left"> Other Projects </Title>
          <div>
            <UserProjectList projects={data.work.related_works} />
          </div>
        </div>
      );
    }
    else{
      return(<div><Loading/></div>)
    }
}


function ImageList(props){
  let images = props.images.map( (elem, i) => <Image key={`image-${props.id}-${i}`} src ={elem.urls.detail} />)
    return(<div className="image-list"> {images}</div>)
}

function WebArticle(props){
  console.log(props)
  return(
    <div className="web-article">
    <a href={props.url}>
    <Image className="web-article-image list-user-avatar" src={props.image} />
    <Title className="web-article-title"> {props.title}</Title>
    </a>
    <p className="web-article-description"> {props.description}</p>

    </div>
  )
}

function Video(props){
return(
  <div
     className="video"
     style={{
       position: "relative",
       paddingBottom: "56.25%" /* 16:9 */,
       paddingTop: 25,
       height: 0
     }}
   >
     <iframe
       style={{
         position: "absolute",
         top: 0,
         left: 0,
         width: "100%",
         height: "100%"
       }}
       title={props.title}
       src={props.url}
       frameBorder="0"
     />
  </div>
)
}


function VideoPage(props){
  let videos = props.videos.map(elem => <Video key={`video-${elem.id}`} url ={elem.url} />)
  return(
    <div>
      {videos}
    </div>
  )
}
function Website(props){
  return(
    <a href={props.url}>
    <div className="web-article">
    <Image className="web-article-image list-user-avatar" src={props.image} />
    <Title> {props.title}</Title>
    <p> {props.description}</p>
    </div>
    </a>
  )
}
function ProjectMeta(props){
  return(
    <div className="description">
      <p>{props.description} </p>
    </div>
  )
}

function Author(props){
  let [screen_name, name, avatar] = [props.screen_name, props.profile.name, props.profile.avatar.thumb2x]
  return(
    <div className="author">
    <Image className="list-user-avatar circle " src={avatar} />
      <Link to={`/user/${screen_name}`}> <Title className="username">{name}</Title> </Link>
     </div>
  )
}

function CreditSkills(props){
  let skills = props.skills.map((elem, i) => <span className="credits-skill" key={`credit-skill-${elem.name}-${i}`}> {elem.name} </span>)
  return (<div className="skill-list-tag"> {skills} </div>)
}
function Credits(props){
  let credits = props.credits.map((elem, i) => <div key={`credit-${elem.user.id}-${i}`} className="credits-single">
      <Link to={`/user/${elem.user.screen_name}`}>
        <Image className="avatar-credits list-user-avatar circle" src={elem.user.avatar.thumb} />
      </Link>
      <div>
        <Link to={`/user/${elem.user.screen_name}`}> <p className="credits-user-name"> {elem.user.name} </p></Link>
        <CreditSkills skills = {elem.creative_roles} />
      </div>
    </div>)
  return(
    <div className="credits-container"> {credits}</div>
  )
}

export default ProjectPage
