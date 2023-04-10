import React from 'react'
import './b6rButton.css'

export default function B6rButton(props) {
    return(
        <div className='b6rButton'>
            <button className={`GameButton ` + props.id}onClick={props.onClick}>
                {props.text}
            </button>
        </div>
    )
}