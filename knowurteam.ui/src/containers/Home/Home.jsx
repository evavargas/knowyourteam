import React, { Component } from 'react';
import Button from '../../components/UI/Button';
import Register from '../../components/Register/Register';

class Home extends Component {
  state = {
    registerMode: false
  };

  registerToogleHandler = () => {
    this.setState(({ registerMode }) => ({ registerMode: !registerMode }));
  };

  render() {
    let registerContent = <p>Nothing to see here</p>;

    registerContent = this.state.registerMode ? (
      <div className='container'>
        <div className='row justify-content-center'>
          <div className='text-center'>
            <Register onCancel={this.registerToogleHandler}></Register>
          </div>
        </div>
      </div>
    ) : (
    <div style={{textAlign:'center'}}>
        <h1>Get more than clubmates, find friends</h1>
        <p className='lead'>
          Come on. All you need to do is sign up</p>
        <div className='text-center'>
            <Button bsClasses='btn-outline-primary btn-lg mr-2' clicked={this.registerToogleHandler} >Register</Button>
            <Button bsClasses='btn-outline-info btn-lg mr-2'>Learn More</Button>
        </div>
    </div>
    );
    return <div className='container mt-5'>{registerContent}</div>;
  }
}

export default Home;
