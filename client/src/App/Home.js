import React, { Component } from 'react';

import { Container, Row, Col, Form } from 'react-bootstrap';
import {quotes} from "./quotes";
import styles from './Home.module.css';
import TextContainer from "./TextContainer"
import logo from "../images/ozark-white.png"
import {CopyToClipboard} from 'react-copy-to-clipboard';
import {FiClipboard, FiGithub} from "react-icons/fi"

// import axios from 'axios'; **server version

class Home extends Component {
  // Initialize the state
  constructor(props){
    super(props);
    this.state = {
      text: ["Enter a number you fuckin' bitch wolf."],
      numParagraphs: '',
      copied: false
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
      <Container>
        <Row>
         <Col style={{textAlign: 'center'}} lg={12} md={12} sm={12}>
           <img className={styles.logo} src={logo} alt="ozark"/>
         </Col>
         <Col lg={12} md={12} sm={12}>
           <h1 className={styles.header}>Ozark Ipsum</h1>
           <p style={{textAlign: 'center', fontSize: '12px'}}>by <a href="https://lesliethe.dev">leslie behum </a><a href="https://www.github.com/itsthecheat"><FiGithub style={{fontSize: '16px'}} /></a></p>
         </Col>

        </Row>
        <Row className={styles.formRow}>
          <Form>
            <Form.Group controlId="formGroupNum">
              <Form.Control onChange={this.handleChange} value={this.state.numParagraphs} type="number" placeholder="# of paragraphs" />
            </Form.Group>
          </Form>
        </Row>
        <Col lg={4} md={4} sm={12} className={styles.clipboard}>
          <CopyToClipboard text={this.state.text}
            onCopy={() => this.setState({copied: true})}>
            <FiClipboard  style={{fontSize: '25px'}} />
          </CopyToClipboard>
          {/* <span style ={{fontSize: '12px', cursor: 'context-menu'}}> copy</span>
           {this.state.copied ? <span style ={{fontSize: '12px'}}> copied!</span> : null} */}
        </Col>

            {/* Display the Ipsum */}
          <TextContainer text={this.state.text} onChange={({target: {text}}) => this.setState({text, copied: false})}/>

            <div className={styles.footer}>Icons - Lake: Adrien Coquet, Quotes: Bakunetsu Kaito, Mountain: alice noir, Paper: NOVILAMISASTRA courtesy of <a href="https://thenounproject.com">The Noun Project.</a>
            </div>
    </Container>
    );
  }
}
export default Home;
