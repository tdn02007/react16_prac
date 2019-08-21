import React, {Component, Fragment} from 'react';

// 에러를 감지하고 판단하는 class
// component를 input and output으로 사용
const BoundaryHOC = ProtectedComponent => class Boundary extends Component{
  state = {
    hasError: false
  };
  componentDidCatch = () =>{
    this.setState({
      hasError: true
    });
  };
  render(){
    const {hasError} = this.state;
    if(hasError){
      return <ErrorFallback/>;
    }else{
      return <ProtectedComponent />
    }
  }
}


class ReturnTypes extends Component{
  render(){
    return (
      <Fragment>
        <header></header>
        <div></div>
        <footer></footer>
      </Fragment>
    )
  }
}

class ErrorMaker extends Component{
  state = {
    friends: ["jisu", "flynn", "daal", "kneeprayer"]
  }
  componentDidMount = () => {
    setTimeout(() => {
      this.setState({
        friends: undefined
      });
    }, 2000);
  };
  render(){
    const {friends} = this.state;
    return friends.map(friend => `${friend} `);
  }
}

const ErrorFallback = () => "Sorry something went wrong";
const EErrorMaker = BoundaryHOC(ErrorMaker);

class App extends Component {
  state = {
    hasError: false
  }
  componentDidCatch = (error, info) => {
    console.log(`catched ${error} the info I have is ${JSON.stringify(info)}`);
    this.setState({hasError: true})
  }
  render(){
    const {hasError} = this.state;
    return (
      <div className="App">
        <h1>Hello everyone</h1>
        {hasError ? <ErrorFallback/> : <ErrorMaker/>}
        <EErrorMaker/>
      </div>
    );
  }
}

export default App;
