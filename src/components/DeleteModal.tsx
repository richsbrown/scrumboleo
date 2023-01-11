import React from 'react'
import './deletemodal.css'

type PropTypes = {
    text: string
    className?: string
    deleteFunction: any
    toggleFunction: any
}

function DeleteModal(props: PropTypes) {
  return (
   <div className={props.className}>
      <p>{props.text}</p>
      <div className="modal_buttons">
        <button className="modal_button" onClick={props.toggleFunction}>Cancel</button>
        <button className="modal_button" onClick={props.deleteFunction}>Delete</button>
      </div>
    </div>
  )
}

export default DeleteModal