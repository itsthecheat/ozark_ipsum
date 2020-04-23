import React, { Component } from 'react';

import { Container, Row, Col, Form } from 'react-bootstrap';
import {quotes} from "./quotes";
import styles from './Home.module.css';
import TextContainer from "./TextContainer"
// import axios from 'axios'; **server version

class Home extends Component {
  // Initialize the state
  constructor(props){
    super(props);
    this.state = {
      text: ["Enter a number you fuckin' bitch wolf."],
      numParagraphs: ''
    }
    this.handleChange = this.handleChange.bind(this);
  }
  // **server version Fetch the text on first mount
  // componentDidMount() {
  //   this.getList()
  // }

//**server rendering
  // handleSubmit(e) {
  //   e.preventDefault();
    // const data = { texts: this.state.numParagraphs }
    // axios.post("/", data)
    // .then((res) => {
    //   console.log("Received input");
    // }).catch((error) => {
    //   console.log("Error posting data", error);
    // })
  // }

  // **server version**
  //Retrieves the text of random quotes from the Express app
  // getList = () => {
  //   fetch('/api/getList')
  //   .then(res => res.json())
  //   .then(text => this.setState({ text }))
  // }

handleChange(e) {
  this.setState({numParagraphs: e.target.value}, this.generator);
}
generator () {
  this.setState({
    text: this.ozarkIpsum(this.state.numParagraphs, quotes)
  })
}

//logic to build random paragraphs
ozarkIpsum (numParagraphs, quotes) {
  var text = "";
  if (numParagraphs < 1) {
    return "Enter a number you fuckin' bitch wolf."
  }
  //create number of paragraphs based on user input
  for (let i = 0; i < numParagraphs; i++) {
    //grab a random quote
    var sentence = "";
    for ( let j = 0; j < 6; j++) {
      let randomQuote = quotes[Math.floor(Math.random() * quotes.length)];
      sentence = sentence + randomQuote + ' ';
    }
    text += "<p>" + sentence + "</p>"
  }
  return text
}

  render() {
    return (
      <Container fluid>
        <Row className="justify-content-md-center">
        <h1 className={styles.header}>Ozark Ipsum</h1>
        </Row>
        <Row className="justify-content-md-center">
          <Form>
            <Form.Group controlId="formGroupNum">
              <Form.Control onChange={this.handleChange} value={this.state.numParagraphs} type="number" placeholder="# of paragraphs" />
            </Form.Group>
          </Form>
        </Row>
            {/* Display the Ipsum */}
          <TextContainer text= {this.state.text} />
    </Container>
    );
  }
}

export default Home;
