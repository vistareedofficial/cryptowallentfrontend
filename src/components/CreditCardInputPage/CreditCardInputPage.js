import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { Container, Row, Col, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';


const CreditCardInputPage = () => {
  // Validation schema using Yup
  const validationSchema = Yup.object().shape({
    cardNumber: Yup.string().required('Card number is required'),
    expiryDate: Yup.string().required('Expiry date is required'),
    cvv: Yup.string().required('CVV is required').length(3, 'CVV must be 3 characters'),
    amount: Yup.string().required('Amount is required'),
    name: Yup.string().required('Name on card is required'),
  });

  // Initial form values
  const initialValues = {
    cardNumber: '',
    expiryDate: '',
    cvv: '',
    name: '',
  };

  // Handle form submission
  const handleSubmit = (values, { setSubmitting }) => {
    // Simulate form submission
    console.log(values);
    setSubmitting(false);
  };

  return (
    <Container>
        {/* <Col md={4} className="text-left mt-4">
          <Link to="/PaymentOptionsPage"><Button variant="secondary">Back</Button></Link>
        </Col> */}
      <Row className="justify-content-center mt-5">
      
        <Col xs={12} md={6}>
          <h2 className="text-center mb-4">Enter Credit Card Information</h2>
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
          >
            {({ isSubmitting }) => (
              <Form>
                <div className="mb-3">
                  <label htmlFor="cardNumber" className="form-label">Card Number</label>
                  <Field type="text" name="cardNumber" className="form-control" />
                  <ErrorMessage name="cardNumber" component="div" className="text-danger" />
                </div>
                <div className="mb-3">
                  <label htmlFor="expiryDate" className="form-label">Expiry Date</label>
                  <Field type="text" name="expiryDate" className="form-control" />
                  <ErrorMessage name="expiryDate" component="div" className="text-danger" />
                </div>
                <div className="mb-3">
                  <label htmlFor="cvv" className="form-label">CVV</label>
                  <Field type="text" name="cvv" className="form-control" />
                  <ErrorMessage name="cvv" component="div" className="text-danger" />
                </div>
                <div className="mb-3">
                  <label htmlFor="amount" className="form-label">Amount</label>
                  <Field type="text" name="amount" className="form-control" />
                  <ErrorMessage name="amount" component="div" className="text-danger" />
                </div>
                <div className="mb-3">
                  <label htmlFor="name" className="form-label">Name on Card</label>
                  <Field type="text" name="name" className="form-control" />
                  <ErrorMessage name="name" component="div" className="text-danger" />
                </div>
                <Button type="submit" variant="primary" disabled={isSubmitting}>
                  {isSubmitting ? 'Submitting...' : 'Pay Now'}
                </Button>

              </Form>
              
            )}
          </Formik>
          <div>
          <br/>
          <br/>
          <br/>
        </div>
        </Col>
      </Row>
    </Container>
  );
};

export default CreditCardInputPage;
