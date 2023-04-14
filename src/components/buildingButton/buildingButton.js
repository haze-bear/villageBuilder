import React, { Component } from 'react'
import './buildingButton.css'

import resourceImage16 from '../../assets/imageImport'
import arrowGL from '../../assets/img/arrowGL16.png'

export default class BuildingButton extends Component {

    costPrettify = (props) => {
        let arr = []
        // console.log(`COSTPRETTIFY CALLED`)
        for(const key in props.obj) {

            if(props.obj[key] != 0) {
                arr.push(
                    {
                    id: `${[key]}`,
                    cost: `${props.obj[key]}`,
                    img: resourceImage16[key]
                    }
                    )
            }

        }

        const printCost = arr.map((a) => {
            return <li className={`BuildingBuyItem`} key={a.id}><img src={a.img} alt={a.id}/>{a.cost}</li>
        })

        return printCost
    }



    render() {
        return(
            <div className='BuildingButton'>
                <ul className="BuildingCostContainer">
                    <this.costPrettify obj={this.props.cost} />
                </ul>
                <img className="arrowGL" src={arrowGL} />
                <div className='BuildingBuyContainer'>
                <button onClick={this.props.onClick}>{this.props.buttonText}</button>
                <label>Owned: {this.props.qty}</label>
                </div>
                <img className="arrowGL" src={arrowGL} />
                <ul className='BuildingProduceContainer'>
                    <this.costPrettify obj={this.props.produce} />
                </ul>
                {/* LABEL TO SAY PER TICK NEEDED UNDERNEATH PRODUCE */}
                
            </div>
        )
    }
}