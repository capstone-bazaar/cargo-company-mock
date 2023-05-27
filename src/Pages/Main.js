import { Button, Form, Input, Space, message } from "antd";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import axios from "axios";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100vh;
`;

export default function Main() {
  const navigate = useNavigate();
  const handleFinish = async (values) => {
    if (!values.trackingNumber) {
      return message.error("Please enter tracking number");
    }

    axios
      .get(
        process.env.REACT_APP_ORDER_SERVICE_URL +
          "/tracking/" +
          values.trackingNumber
      )
      .then((data) => {
        if (data) {
          navigate(`/tracking/${values.trackingNumber}`);
        }
      })
      .catch((err) => {
        message.error(err.response.data);
      });
  };

  return (
    <Container>
      <img alt='logo' src='/cargo.png' />
      <h1>Cargo Company</h1>

      <Space direction='vertical'>
        <Form layout='vertical' onFinish={handleFinish}>
          <Form.Item label='Tracking Number' name='trackingNumber'>
            <Input
              placeholder='Enter the tracking number'
              style={{ width: "300px" }}
            />
          </Form.Item>
          <Form.Item>
            <Button type='primary' htmlType='submit' style={{ width: "100px" }}>
              Search
            </Button>
          </Form.Item>
        </Form>
      </Space>
    </Container>
  );
}
