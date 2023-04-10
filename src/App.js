import React, { Component } from 'react'

import './App.css'

//Game Componetns
import B6rButton from './components/b6rButton/b6rButton';
import BuildingButtton from './components/buildingButton/buildingButton';

import PlayerInventory from './components/playerInventory/playerInventory';

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
  storage: {
    population: 20,
    coin: 1000,
    wood: 1000,
    stone: 1000,
    metal: 1000,
    crop: 1000,
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
        coin: 100,
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
        crop: 20,
      },
      bonus: {
        population: 20,
        coin: 0,
        wood: 0,
        stone: 0,
        metal: 0,
        crop: 0,
      },
      qty: 0,
    },
    hiddenStash: {
      name: "Hidden Stash",
      desc: "",
      cost: {
        population: 50,
        coin: 1000,
        wood: 500,
        stone: 650,
        metal: 350,
        crop: 400,
      },
      production: {
        population: 0,
        coin: 0,
        wood: 0,
        stone: 0,
        metal: 0,
        crop: 0,
      },
      bonus: {
        population: 10,
        coin: 5000,
        wood: 100,
        stone: 100,
        metal: 100,
        crop: 100,
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

addStorage = (build) => {
  let storage = this.state.storage
  let currBuilding = this.state.building[build].bonus
  let newStorage = {
      population: 0,
      coin: 0,
      wood: 0,
      stone: 0,
      metal: 0,
      crop: 0,
  }

  for(const key in currBuilding) {
    newStorage[key] = storage[key] + currBuilding[key]
  }


  return(
    this.setState({
      storage: newStorage
    })
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

    this.addStorage(building)
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

storageCheck = () => {
  let res = this.state.resource
  let storage = this.state.storage
  let newRes = {
    population: 0,
    coin: 0,
    wood: 0,
    stone: 0,
    metal: 0,
    crop: 0,
  }
  for (const key in res) {    
    if(res[key] >= storage[key]) {
      newRes[key] = storage[key];
    } else {
      newRes[key] = res[key]
  }
}

  return (
    this.setState({resource: newRes})
  )
}

gameTickGen = () => {
  let gT = this.state.gameTick + 1;
  this.productionHandler()
  this.storageCheck()
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
          <button className='startButton' onClick={this.startGame}>START</button>
          <PlayerInventory obj={this.state.resource} />
          <PlayerInventory obj={this.productionPerTick()} />
        </div>



        <div className='BuyBuildingsContainer'>

            <BuildingButtton 
              onClick={() => this.addBuilding('townHall', 1)} 
              buttonText="Buy 1 Town Hall" cost={this.state.building.townHall.cost} 
              qty={this.state.building.townHall.qty} 
              produce={this.state.building.townHall.production}
            />

            <BuildingButtton 
              onClick={() => this.addBuilding('farm', 1)} 
              buttonText="Buy 1 Farm" 
              cost={this.state.building.farm.cost} 
              qty={this.state.building.farm.qty} 
              produce={this.state.building.farm.production}
            />

            <BuildingButtton 
              onClick={() => this.addBuilding('woodMill', 1)} 
              buttonText="Buy 1 Wood Mill" 
              cost={this.state.building.woodMill.cost} 
              qty={this.state.building.woodMill.qty} 
              produce={this.state.building.woodMill.production} 
            />

            <BuildingButtton 
              onClick={() => this.addBuilding('quarry', 1)} 
              buttonText="Buy 1 Quarry" 
              cost={this.state.building.quarry.cost} 
              qty={this.state.building.quarry.qty} 
              produce={this.state.building.quarry.production}
            />

            <BuildingButtton 
              onClick={() => this.addBuilding('metalWorks', 1)} 
              buttonText="Buy 1 Metal Works" 
              cost={this.state.building.metalWorks.cost} 
              qty={this.state.building.metalWorks.qty} 
              produce={this.state.building.metalWorks.production}
            />

            <BuildingButtton 
              onClick={() => this.addBuilding('hut', 1)} 
              buttonText="Buy 1 Hut" 
              cost={this.state.building.hut.cost} 
              qty={this.state.building.hut.qty} 
              produce={this.state.building.hut.production} 
            />

            <BuildingButtton 
              onClick={() => this.addBuilding('hiddenStash', 1)} 
              buttonText="Build 1 Hidden Stash" 
              cost={this.state.building.hiddenStash.cost} 
              qty={this.state.building.hiddenStash.qty} 
              produce={this.state.building.hiddenStash.production} 
            />

        </div>

        <div className='GameButtons'>
          <B6rButton onClick={() => this.addResource('coin', this.state.perClick.coin)} text={`Add ${this.state.perClick.coin} Coin`} id="gbCoin" />
          <B6rButton onClick={() => this.addResource('wood', this.state.perClick.wood)} text={`Add ${this.state.perClick.wood} Wood`} id="gbWood"/>
          <B6rButton onClick={() => this.addResource('stone', this.state.perClick.stone)} text={`Add ${this.state.perClick.stone} Stone`} id="gbStone"/>
          <B6rButton onClick={() => this.addResource('metal', this.state.perClick.metal)} text={`Add ${this.state.perClick.metal} Metal`} id="gbMetal"/>
          <B6rButton onClick={() => this.addResource('crop', this.state.perClick.crop)} text={`Add ${this.state.perClick.crop} Crop`} id="gbCrop"/>
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