import React, { Component } from 'react'
import './playerInventory.css'

import resourceImage16 from '../../assets/imageImport'

export default class PlayerInventory extends Component {

    productionPrettify = (props) => {
        let arr = []
        for(const key in props.obj) {
            arr.push(
                {
                id: `${[key]}`,
                prod: `${props.obj[key]}`,
                img: resourceImage16[key]
                }
                )
        }

    const printCost = arr.map((a) => {
        return <li className={`ProductionInvenItem`} key={a.id}><img src={a.img} alt={a.id}/><p>{a.prod}</p></li>
    })

        return printCost
    }

    componentDidMount() {
        // console.log(this.props.obj)
    }

    render() {
        return (
            <div className='PlayerInventoryContainer'>
                <ul className='ProductionInvenContainer'>
                <this.productionPrettify obj={this.props.obj}/>
                </ul>
            </div>
        )
    }

}
