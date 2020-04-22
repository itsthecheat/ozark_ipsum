import React, { Component } from 'react';

import { Container, Row, Col, Form } from 'react-bootstrap';
import styles from './Home.module.css';
// import axios from 'axios';

class Home extends Component {
  // Initialize the state
  constructor(props){
    super(props);
    this.state = {
      paragraph: [],
      numParagraphs: ''
    }
    this.handleChange = this.handleChange.bind(this);
  }
  // Fetch the paragraph on first mount
  componentDidMount() {
    this.getList();
  }

  // Retrieves the paragraph of random quotes from the Express app
  getList = () => {
    fetch('/api/getList')
    .then(res => res.json())
    .then(paragraph => this.setState({ paragraph }))
  }

  handleChange(e) {
        this.setState({numParagraphs: e.target.value});
      }

  //**server rendering
  // handleSubmit(e) {
  //   e.preventDefault();
    // const data = { paragraphs: this.state.numParagraphs }
    // axios.post("/", data)
    // .then((res) => {
    //   console.log("Received input");
    // }).catch((error) => {
    //   console.log("Error posting data", error);
    // })
  // }

generator () {
  this.setState({
    paragraph: this.ozarkIpsum(this.state.numParagraphs, this.state.paragraph)
  })
}
ozarkIpsum (numParagraphs, paragraph) {
  if (numParagraphs < 1) {
    return "Please enter a number you fuckin' bitch wolf."
  }
  var ipsum = "";
  for(let i = 0; i < numParagraphs; i++) {
    ipsum = ipsum + paragraph;
  }
  return ipsum;
}

  render() {
    const { paragraph } = this.state;

    return (
      <Container>
        <Row className="justify-content-md-center">
        <h1>Ozark Ipsum</h1>
        </Row>
        <Row className="justify-content-md-center">
          <Form>
            <Form.Group controlId="formGroupNum">
              <Form.Control onChange={this.handleChange} value={this.state.numParagraphs} type="number" placeholder="# of paragraphs" />
            </Form.Group>
          </Form>
        </Row>
            {/* Display the Ipsum */}
            <Row className="justify-content-md-center">
              <Col lg={8} md={8} sm={12} className={styles.generatedText}>
                {/* Render the paragraph of items */}
                {paragraph}
              </Col>
            </Row>

    </Container>
    );
  }
}

export default Home;
