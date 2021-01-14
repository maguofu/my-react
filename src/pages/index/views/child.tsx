import React, {createRef} from 'react';
import '../style/child';


export default class Child extends React.Component <any, any> { // prop 和state的类型都为any
  


  constructor(props) {
    super(props);
    // console.log(`子组件的props属性=${JSON.stringify(this.props)}`);
    this.state = {
      num: 12,
      city: ''
    };
  }

  componentWillMount() {
    // console.log(1)
  }

  render() {
    return (
      <div>
        {this.props.flag ?
          <p className={'child-color'} onClick = {this.clickMe.bind(this)}>
            --{this.props.flag}--
            我是子组件,接收的数据：{this.props.text}
          </p>
          :
          <p className={'child-color'}>
            我是子组件,接收的数据：{this.props.text}
          </p>
        }
        {
          this.state.city ? <p>city is {this.state.city}</p> : ''
        }
        <div className="zuhe">
          {this.props.children}
        </div>
      </div>
    );
  }

  handdle(data) {
    console.log(data);
    this.setState({
      city: data
    });
  }

  clickMe() {
    this.props.emitDataFather('emitemitemit');
  }

  componentDidMount() {
  }

  componentWilUpdate() {
    // console.log(4)
  }

  componentDidUpdate() {
    // console.log(5)
  }

  componentWillUnmount() {
    // console.log('++')
  }

  
}
