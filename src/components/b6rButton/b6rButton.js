import React from 'react'

export default function B6rButton(props) {
    return(
        <div className='b6rButton'>
            <button onClick={props.onClick}>
                {props.text}
            </button>
        </div>
    )
}