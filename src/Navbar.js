import React from "react";
import ReactDOM from "react-dom"
import {Title} from "./Common";
import {Link, withRouter} from "react-router-dom";
import{OutsideDetect} from "./Hooks";

const modalRoot = document.getElementById("modal-root")
function Modal(props) {
  return ReactDOM.createPortal( <ModalInner {...props} />,
       document.querySelector("#modal-root"));
}
class ModalInner extends React.Component{
  el = document.createElement("div")
  componentDidMount(){
    modalRoot.appendChild(this.el)
  }
  componentWillUnmount(){
    modalRoot.removeChild(this.el)
  }
  normaliser(string){
    switch(string){
      case "user":
      return "User"
      case "works":
      return "Project"
      default:
      return "User"
    }
  }
  render(){
    let items = this.props.viewHistory.map((elem, i) =>{
      return (<Link to={elem.url} key={`history-${i}`}> <div onClick={this.props.closeModal} className="modal-item">
      <p className="modal-name">{elem.name}</p>
      <p className="modal-type">{this.normaliser(elem.type)}</p>
      </div></Link>)}
    );
    return(
      <OutsideDetect action={this.props.closeModal}>
        <div className="modal">
          {items}
        </div>
      </OutsideDetect>
    )
  }
}
function Navbar(props){
  const [viewHistory, setViewHistory] = React.useState([])
  const [showModal, setShowModal] = React.useState(false)
  let url = props.location.pathname

  //This is all very hacky, temporary method to keep track of history with the aid of localStorage
  React.useEffect(()=>{
    function updateHistory(newObj){
      setViewHistory((prevState)=> {
        let newState = [newObj, ...prevState]
        if(newState.length> 10){//Limits history to 10
           newState.pop()
        }
        return [...newState]
      })
    }
    if(url.split("/")[1]){
      let newObj
      setTimeout(()=> {//Not a permanent solution, I was struggling with getting the context right and didn't want to rewrite the states or do further apicalls.
        newObj = {
          type: url.split("/")[1],
          name: localStorage.lastName,
          url: url
        }
        updateHistory(newObj)
      }, 700)
    }
  }, [url])
  function openModal(){
    setShowModal(true)
  }
  function closeModal(){
    setShowModal(false)
  }
  return (
    <React.Fragment>
    {showModal &&  <Modal closeModal={closeModal} {...props} viewHistory={viewHistory} /> }
    <nav className="navbar">
      <Link to="/"><Title className="site-title">forriio</Title> </Link>
      <h1 className="modal-clicker" onClick ={() => openModal()} > Viewing History </h1>
    </nav>
    </React.Fragment>
)
}


export default withRouter(Navbar)
