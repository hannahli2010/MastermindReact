import React, { Component } from 'react';
import { Button, TextField } from '@material-ui/core';

class App extends Component {
  constructor (props) {
    super(props)

    this.state = {
      errorMsg: '',
      disableT: true,
      disableB: false,
      secret: [
        1,
        2,
        3,
        4,
        5
      ],
      guess: [
        1,
        2,
        3,
        4,
        5
      ],
      enteredGuesses: [<p>Guesses: </p>],
      button: 'Start'

    }
  }

  getSecret = (secret) => {
    for (let x = 0; x < 5; x++) {
      secret[x] = '' + Math.floor(Math.random() * 9 + 1)
    }
    console.log('Secret: ' + secret)
  }

  enterGuess = (enter, guess) => {
    for (let x = 0; x < 5; x++) {
      guess[x] = enter.charAt(x);
    }
  }

  output = (guess, secret) => {
    let numString = this.toString(guess) + '   ';
    let done = true;
    
    let temp = [
      1,
      2,
      3,
      4,
      5
    ]
    
    for (let x = 0; x < 5; x++) {
      temp[x] = guess[x];
    }

    for (let x = 0; x < 5; x++) {
      if (temp[x] === secret[x]) {
        temp[x] = '*';
      } else {
        done = false;
      }
    }

    for (let x = 0; x < 5; x++) {
      for (let y = 0; y < 5; y++) {
        if (temp[x] === secret[y] && x !== y) {
          temp[x] = '+';
        }
      }
    }

    for (let x = 0; x < 5; x++) {
      if (temp[x] !== '*' && temp[x] !== '+') {
        temp[x] = '-';
      }
    }

    numString += this.toString(temp);

    this.state.enteredGuesses.push(<p>{numString}</p>);

    this.setState({
      enteredGuesses: this.state.enteredGuesses,
      button: done ? 'Start' : 'Enter',
    })
  }

  toString = (list) => {
    let text = ''
    for (let x = 0; x < list.length; x++) {
      text += list[x]
    }
    return text
  }

  check = (guess) => {
    for (let x = 0; x < 5; x++) {
      if (guess[x] !== '*') {
        return false
      }
    }
    return true
  }

  handleOnChange = (event) => {
    if (event.target.value.length !== 5) {
      this.setState({
        disableB: true
      })
    } else {
      this.enterGuess(event.target.value, this.state.guess)
      this.setState({
        disableB: false,
        guess: this.state.guess
      })
    }
  }

  handleClick() {
    if (this.state.button === 'Start') {
      this.getSecret(this.state.secret)
      this.setState({
        button: 'Enter',
        disableT: false,
        secret: this.state.secret,
        enteredGuesses: [<p>Guesses: </p>]
      })
    } else {
      this.output(this.state.guess, this.state.secret)
      if (this.check(this.state.guess)) {
        this.setState({
          button: 'Start',
          disableT: true
        })
      }
    }
  }

  handleEnter = (event) =>{
    if(event.key === "Enter"){
      this.handleClick();
    }
  }

  render () {
    const textFieldStyle = {
      width: '250px',
      margin: '10px 10px'
    }

    /* title='Enter 5 numbers from 1 to 9 to guess the hidden 5 digit number'
      hintText='Enter your guess' */

    return (
      <div stlye={{padding: 20, flexDirection: 'column'}}>
        <p>The target is to guess a 5 digit number. A "*" means the number is at the right spot,
          "+" means the number is in the 5 digit number but is in the wrong spot,
          and "-" means the number is not in the 5 digit number.</p>
        <div style={{flexDirection: 'row', alignItems: 'center'}} >
          <TextField
            onChange={this.handleOnChange}         
            disabled={this.state.disableT}
            style={textFieldStyle}
            variant="outlined"
            onKeyPress ={this.handleEnter}
          />
          <Button
            style= {{marginLeft: '20'}}
            variant="outlined"
            color="primary"
            disabled={this.state.disableB}
            onClick={()=>{this.handleClick()}}>
            {this.state.button}
          </Button>
        </div>
        {this.state.enteredGuesses.map(item => item)}
      </div>
    )
  }
}

export default App;
