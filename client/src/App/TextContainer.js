import React, { Component } from 'react';
import { Row, Col } from 'react-bootstrap';
import styles from './TextContainer.module.css';


class TextContainer extends Component {
  render() {
    return (
      <Row className="justify-content-md-center">
        <Col lg={8} md={8} sm={12} className={styles.generatedText} >
          {/* Render the text of items */}
            <div dangerouslySetInnerHTML={{__html: this.props.text}}></div>
        </Col>
      </Row>
    );
  }
}

export default TextContainer;
