import React, { Component } from 'react';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';

class Home extends Component {
  // Initialize the state
  constructor(props){
    super(props);
    this.state = {
      list: []
    }
  }

  // Fetch the list on first mount
  componentDidMount() {
    this.getList();
  }

  // Retrieves the list of items from the Express app
  getList = () => {
    fetch('/api/getList')
    .then(res => res.json())
    .then(list => this.setState({ list }))
  }

  render() {
    const { list } = this.state;

    return (
      <Container>
        <Row className="justify-content-md-center">
        <h1>Therapy Ipsum</h1>
        </Row>
        <Row className="justify-content-md-center">
          <Form>
            <Form.Group controlId="formGroupNum">
              <Form.Control type="number" placeholder="# of paragraphs" />
            </Form.Group>
            <Button variant="primary" type="submit">
              Submit
            </Button>
          </Form>
        </Row>
            {/* Display the Ipsum */}
        <Row>
          <Col className="generatedText">

          </Col>

        </Row>
          <Row className="justify-content-md-center">
            <Col lg={6} md={6} sm={12}>
              {/* Render the list of items */}
              {list.map((item) => {
                return(
                  <div>
                    {item}
                  </div>
                );
              })}
            </Col>
          </Row>
    </Container>
    );
  }
}

export default Home;
