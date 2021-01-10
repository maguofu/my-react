import React, {createRef} from 'react';
import './style/index';
import Child from './views/child';


export default class App extends React.Component <any, any> { // prop 和state的类型都为any
  


  constructor(props) {
    super(props);
    this.state = {
      date: new Date(),
      child1: createRef()
    };
  }

  componentWillMount() {
    console.log(1)
  }

  emitData(data) {
    console.log(data);
    this.setState({
      date: new Date(),
    })
  }

  render() {
    console.log(2)
    return (
      <div>
        <h3 className={'hhh'}>Hello, world!</h3>
        <p>It is {this.state.date.toLocaleTimeString()}.</p>
        <Child ref = {this.state.child1} flag={false} text={'😄数据1😂'}/>
        <Child emitDataFather={this.emitData.bind(this)} flag={true} text={'😄数据2😂'}/>
      </div>
    );
  }

  componentDidMount() {
    console.log(3)
    this.state.child1.current.handdle('beijing');
  }

  componentWilUpdate() {
    console.log(4)
  }

  componentDidUpdate() {
    console.log(5)
  }

  componentWillUnmount() {
    console.log('++')
  }

  tick() {
    this.setState({
      date: new Date()
    })
  }

  
}
