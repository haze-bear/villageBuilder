import React, { Component } from 'react'
import './buildingButton.css'

export default class BuildingButton extends Component {

    costPrettify = (props) => {
        let arr = []
        // console.log(`COSTPRETTIFY CALLED`)
        for(const key in props.cost) {
            arr.push(`${[key]} of ${props.cost[key]}`)
            console.log()
        }

        const printCost = arr.map((a) => {
            return <li>{a}</li>
        })

        return printCost
    }

    //USE A VARIATION OF THIS POTENTIALLY
    

    render() {
        return(
            <div className='BuildingButton'>
                <ul>
                    <li>COST</li>
                    <this.costPrettify cost={this.props.cost}/>
                </ul>
                <ul>
                    <li>Produces</li>
                    <this.costPrettify cost={this.props.produce} />
                </ul>
                <p>
                </p>
                <button onClick={this.props.onClick}>{this.props.buttonText} QTY: {this.props.qty}</button>
            </div>
        )
    }
}