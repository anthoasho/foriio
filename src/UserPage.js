import React from 'react';

import {useFetch} from "./Hooks";
import {Image, Title, UserProjectList} from "./Common";
import {Loading} from "./Common";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faGlobeAsia, faEnvelope} from '@fortawesome/free-solid-svg-icons';
import {faTwitter, faFacebook, faInstagram} from '@fortawesome/free-brands-svg-icons';
import "./UserPage.css";




function ProfileLinks(props){
  const {profile} = props;
  const {website, contact_email, twitter_url, facebook_url, instagram_url} = profile
  if(website|| contact_email|| twitter_url|| facebook_url|| instagram_url){
    return(
      <div className="profile-links">
      {profile.website && <a href={profile.website}><FontAwesomeIcon icon={faGlobeAsia} /></a>}
      {profile.contact_email &&<a href={`mailto:${profile.contact_email}`}><FontAwesomeIcon icon={faEnvelope} /></a>}
      {profile.twitter_url&& <a href={profile.twitter_url}> <FontAwesomeIcon icon={faTwitter} /> </a> }
      {profile.facebook_url &&<a href={profile.facebook_url}> <FontAwesomeIcon icon={faFacebook} /> </a>  }
      {profile.instagram_url &&<a href={profile.instagram_url}> <FontAwesomeIcon icon={faInstagram} /> </a>  }

      </div>
    )
  }
  else{
    return(
      <div>
      </div>
    )

  }
}


function ProfileCard(props){
  const [data, loading] = useFetch(
      `https://api.foriio.com/api/v1/users/${props.match.params.name}/profile`
    )
   if(!loading){
     let {profile} = data
     document.title = `foriio | ${profile.name}`;
     return (
       <div className = "profile-card">
         <Image className = "profile-avatar circle" src ={profile.avatar.thumb2x} />
         <div className="profile-information">
          <Title className="profile-name mobile-margin"> {profile.name} </Title>
          <p className="profile-profession mobile-margin"> {profile.profession}  </p>
          {profile.bio &&<div className="profile-bio">
           <h3 className="profile-bio-title mobile-margin"> I am</h3>
           <p className="profile-bio-text mobile-margin"> {profile.bio}  </p>
          </div>}
           {profile.i_want_to_work_with &&<div className="profile-goal mobile-margin">
            <h3 className="profile-goal-title mobile-margin"> I want to work with</h3>
            <p className="profile-goal-text mobile-margin"> {profile.i_want_to_work_with}  </p>
           </div>}
         </div>
         <ProfileLinks profile ={profile}/>
       </div>
     );
   }
   else{
     return(<div><Loading/></div>)

   }
}


function ProfileProjects(props){
  const [data, loading] = useFetch(
    `https://api.foriio.com/api/v1/users/${props.match.params.name}/works`
  );
if(!loading){
  return(
  <div className="project-list">
    <UserProjectList projects={data.works} />
  </div>
  )
}else{
  return( <div> </div>)
}
}

function UserPage(props) {

 return(
   <div className="user-page">
   <ProfileCard {...props} />
   <ProfileProjects {...props} />
   </div>
 )
}


export default UserPage;
