import React, { Component } from 'react'

import './App.css'

//Game Componetns
import B6rButton from './components/b6rButton/b6rButton';
import BuildingButtton from './components/buildingButton/buildingButton';

import resourceImage16  from './assets/imageImport';

export default class App extends Component {

state = {
  resource: {
    population: 0,
    coin: 1,
    wood: 0,
    stone: 0,
    metal: 0,
    crop: 0,
  },
  perClick: {
    population: 0,
    coin: 1,
    wood: 1,
    stone: 1,
    metal: 1,
    crop: 1,
  },
  building: {
    townHall: {
      name: "Town Hall",
      desc: "",
      cost: {
        population: 10,
        coin: 10,
        wood: 10,
        stone: 10,
        metal: 10,
        crop: 10,
      },
      production: {
        population: 10,
        coin: 10,
        wood: 10,
        stone: 10,
        metal: 10,
        crop: 10,
      },
      bonus: {
        population: 0,
        coin: 0,
        wood: 0,
        stone: 0,
        metal: 0,
        crop: 0,
      },
      image: {
        population: 'resourceImage16.Population',
        coin: 'resourceImage16.Coin',
        wood: 'resourceImage16.Wood',
        stone: 'resourceImage16.Stone',
        metal:' resourceImage16.Metal',
        crop: 'resourceImage16.Crop',
      },
      qty: 1,
    },
    farm: {
      name: "Farm",
      desc: "",
      cost: {
        population: 5,
        coin: 10,
        wood: 5,
        stone: 5,
        metal: 0,
        crop: 0,
      },
      production: {
        population: 0,
        coin: 0,
        wood: 0,
        stone: 0,
        metal: 0,
        crop: 10,
      },
      bonus: {
        population: 0,
        coin: 0,
        wood: 0,
        stone: 0,
        metal: 0,
        crop: 0,
      },
      qty: 0,
    },
    woodMill: {
      name: "Wood Mill",
      desc: "",
      cost: {
        population: 5,
        coin: 100,
        wood: 20,
        stone: 5,
        metal: 20,
        crop: 0,
      },
      production: {
        population: 0,
        coin: 0,
        wood: 10,
        stone: 0,
        metal: 0,
        crop: 0,
      },
      bonus: {
        population: 0,
        coin: 0,
        wood: 0,
        stone: 0,
        metal: 0,
        crop: 0,
      },
      qty: 0,
    },
    quarry: {
      name: "Quarry",
      desc: "",
      cost: {
        population: 20,
        coin: 50,
        wood: 15,
        stone: 25,
        metal: 10,
        crop: 0,
      },
      production: {
        population: 0,
        coin: 0,
        wood: 0,
        stone: 20,
        metal: 1,
        crop: 0,
      },
      bonus: {
        population: 0,
        coin: 0,
        wood: 0,
        stone: 0,
        metal: 0,
        crop: 0,
      },
      qty: 0,
    },
    metalWorks: {
      name: "Metal Works",
      desc: "",
      cost: {
        population: 20,
        coin: 100,
        wood: 10,
        stone: 50,
        metal: 35 ,
        crop: 0,
      },
      production: {
        population: 0,
        coin: 0,
        wood: 0,
        stone: 1,
        metal: 5,
        crop: 0,
      },
      bonus: {
        population: 0,
        coin: 0,
        wood: 0,
        stone: 0,
        metal: 0,
        crop: 0,
      },
      qty: 0,
    },
    hut: {
      name: "Basic Hut",
      desc: "",
      cost: {
        population: 0,
        coin: 10,
        wood: 10,
        stone: 10,
        metal: 5,
        crop: 30,
      },
      production: {
        population: 1,
        coin: 0,
        wood: 0,
        stone: 0,
        metal: 0,
        crop: 0,
      },
      bonus: {
        population: 0,
        coin: 0,
        wood: 0,
        stone: 0,
        metal: 0,
        crop: 0,
      },
      qty: 0,
    },
  },
  gameTick: 0,
  isPaused: true,
 }

//Method to add one of the B6R to the players inventory.
//Uses [resource] to determine which B6R and takes the state.resource key as a value
//It will then add [value] to the chosen resource
//EX - addResource('coin', 1000)
addResource = (resource, value) => {
  let obj = this.state.resource;
  obj[resource]= obj[resource] + value;
  return this.setState(
    {
      resource: obj
    }
  )
}

addBuilding = (building, value) => {
  console.log(`addBuilding called`)
  let res = this.state.resource; //Logs resource at call
  let obj = this.state.building; //Logs building at call
  let buildingCost = obj[building].cost //Pulls building cost to be used by newObj
  //This feels scuffed
  // For loops runs through each key in players resources.
  // Compares players resources to the building.cost object.
  // If Greater than or Equal to it will add to the count.
  // For all B6R to pass they must >= therefore count will always be 6 to proceed.
  let count = 0
  for (const key in res) {    
    if(res[key] >= obj[building].cost[key]) {
      count = count + 1
    } else {
      console.log(`FAILED ON: ${key}`)
    
  }
  //Checks count to see if players res passes
  if(count === 6){
    ///This iterates throguh the players resources and subtracts the building.cost from it. Returns the new OBJ to be used.
    let newObj = Object.keys(res).reduce((a, b) => {
      a[b] = res[b] - buildingCost[b];
      return a;
    }, {});
    console.log("passed addBuilding check")

    //Multiplies the cost by formula Price = BasePrice(1.17^Building Quantity)
    for(const key in buildingCost) {
      buildingCost[key] = Math.floor(buildingCost[key] * Math.pow(1.17, obj[building].qty));
      console.log(`${[key]} is now ${buildingCost[key]}`)
    }

      //Adds 1 to the called building quantity. [builidng] = 'object key'
      obj[building].qty = obj[building].qty + value;

    return this.setState(
      {
        resource: newObj,
        building: obj
      }
    )
  } else {
    console.log('Not Enough Resources')
  }
}
}


productionPerTick = () => {
  let building = this.state.building
  let production = {
    population: 0,
    coin: 0,
    wood: 0,
    stone: 0,
    metal: 0,
    crop: 0,
  }

  for(const key in building) {
    Object.keys(building[key].production).forEach(function(a){
    let qtySum = building[key].production[a] * building[key].qty;
    production[a] = production[a] + qtySum  
    })
  }
  return production
}

productionHandler = () => {
  let res = this.state.resource
  let prod = this.productionPerTick()

  for (const key in res) {
    res[key] = res[key] + prod[key]
  }

  return  this.setState(
    {
      resource: res
    }
  )
}


gameTickGen = () => {
  let gT = this.state.gameTick + 1;
  this.productionHandler()
  return this.setState(
    {
      gameTick: gT
    }
  )
}

startGame = () => {
  this.setState(
    {
      isPaused: false,
    }
  )
  setInterval(this.gameTickGen, 1000);
}


render() {
  return (
    <div className='AppContainer'>

        <div className='Header'>
          <h1>A Text Game</h1>
          <h2>Game Tick: {this.state.gameTick}</h2>
          <button onClick={this.startGame} >START</button>
          <p><img src={resourceImage16.Coin} alt="coin" /> {this.state.resource.coin}</p>
          <p><img src={resourceImage16.Wood} alt="wood" /> {this.state.resource.wood}</p>
          <p><img src={resourceImage16.Stone} alt="Stone" /> {this.state.resource.stone}</p>
          <p><img src={resourceImage16.Metal} alt="metal" />{this.state.resource.metal}</p>
          <p><img src={resourceImage16.Crop} alt="crop" /> {this.state.resource.crop}</p>
          <p><img src={resourceImage16.Population} alt="population" /> {this.state.resource.population}</p>
        </div>

        <div className='BuyBuildingsContainer'>
            <BuildingButtton 
            onClick={() => this.addBuilding('townHall', 1)} 
            buttonText="Buy 1 Town Hall" cost={this.state.building.townHall.cost} 
            qty={this.state.building.townHall.qty} 
            produce={this.state.building.townHall.production} 
            />
            <BuildingButtton onClick={() => this.addBuilding('farm', 1)} buttonText="Buy 1 Farm" cost={this.state.building.farm.cost} qty={this.state.building.farm.qty} produce={this.state.building.farm.production}/>
            <BuildingButtton onClick={() => this.addBuilding('woodMill', 1)} buttonText="Buy 1 Wood Mill" cost={this.state.building.woodMill.cost} qty={this.state.building.woodMill.qty} produce={this.state.building.woodMill.production} />
            <BuildingButtton onClick={() => this.addBuilding('quarry', 1)} buttonText="Buy 1 Quarry" cost={this.state.building.quarry.cost} qty={this.state.building.quarry.qty} produce={this.state.building.quarry.production}/>
            <BuildingButtton onClick={() => this.addBuilding('metalWorks', 1)} buttonText="Buy 1 Metal Works" cost={this.state.building.metalWorks.cost} qty={this.state.building.metalWorks.qty} produce={this.state.building.metalWorks.production}/>
            <BuildingButtton onClick={() => this.addBuilding('hut', 1)} buttonText="Buy 1 Hut" cost={this.state.building.hut.cost} qty={this.state.building.hut.qty} produce={this.state.building.hut.production} />
        </div>

        <div className='ResourceButtonContainer'>
          <B6rButton onClick={() => this.addResource('coin', this.state.perClick.coin)} text={`Add ${this.state.perClick.coin} Coin`} />
          <B6rButton onClick={() => this.addResource('wood', this.state.perClick.wood)} text={`Add ${this.state.perClick.wood} Wood`} />
          <B6rButton onClick={() => this.addResource('stone', this.state.perClick.stone)} text={`Add ${this.state.perClick.stone} Stone`} />
          <B6rButton onClick={() => this.addResource('metal', this.state.perClick.metal)} text={`Add ${this.state.perClick.metal} Metal`} />
          <B6rButton onClick={() => this.addResource('crop', this.state.perClick.crop)} text={`Add ${this.state.perClick.crop} Crop`} />
        </div>

      <div className='GameConsole'>
        <ul>
          <li>A Message</li>
        </ul>
      </div>
    </div>
  )
 }
}