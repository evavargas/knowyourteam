import React, { Component } from 'react';
import valueService from "./services/valueService";
//Componente con estado
class Values extends Component {
  state = {
    values:[]
  };
  //OnLoad
  async componentDidMount(){
    /*const response = await valueService.getValues();
    *console.log('Values', data); 
    *console.log('Values', response.data);*/
   
    //(Estructuracion de objetos) data se renombra en values
    const {data : values} = await valueService.getValues(); 
    this.setState({values}); //guarda lo de values

  }
  render() {
    const {values} = this.state;
    /*const response = this.state.values;
    *console.log('response', response);*/
    return <div>
      <h1>Values Lists</h1>
      {
        values.map(item =>(
          //key cuuando iteramos elementos en html
          <p key={item.id}>
            id: {item.id}, name: {item.name}
            </p>
        ) )
      }
    </div>;
  }
}
export default Values;
