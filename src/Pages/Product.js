import { Form, Button, Space, Radio, message } from "antd";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import { SHIPMENT_STATES } from "../constants";
import { useEffect, useState } from "react";
import axios from "axios";

const Card = styled.div`
  height: 70%;
  width: 30%;
  border: 10px;
  padding: 30px;
  box-shadow: rgba(17, 17, 26, 0.1) 0px 4px 16px,
    rgba(17, 17, 26, 0.05) 0px 8px 32px;
`;

export default function Product() {
  const [data, setData] = useState();
  const [loading, setLoading] = useState(false);
  const { id } = useParams();
  const [isButtonLoading, setIsButtonLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    axios
      .get(process.env.REACT_APP_ORDER_SERVICE_URL + "/tracking/" + id)
      .then((data) => {
        setData(data.data);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        message.error(err.response.data);
      });

    //eslint-disable-next-line
  }, []);

  const handleFormSubmit = async (values) => {
    console.log(values);
    setIsButtonLoading(true);
    try {
      await axios.put(
        process.env.REACT_APP_ORDER_SERVICE_URL + "/tracking/" + id,
        {
          status: values.status,
        }
      );
    } catch (error) {
      message.error(error.response.data);
      setIsButtonLoading(false);
      return;
    }

    setIsButtonLoading(false);
    window.location.reload();
  };

  return (
    <>
      {loading && !data && <div>Loading...</div>}
      {data && (
        <div
          style={{
            height: "100vh",
            width: "100vw",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Card>
            <h2>Tracking ({id}) </h2>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                width: "100%",
                height: "90%",
                boxSizing: "border-box",
              }}
            >
              <h4>Informations</h4>
              <div>{data.shippingAddress}</div>
              <Form layout='vertical' onFinish={handleFormSubmit}>
                <Form.Item name='status' label={<h4>Current Status</h4>}>
                  <Radio.Group defaultValue={data.status}>
                    <Space direction='vertical'>
                      <Radio
                        disabled={
                          data.status === SHIPMENT_STATES.DELIVERED ||
                          data.status === SHIPMENT_STATES.IN_TRANSIT
                        }
                        value={SHIPMENT_STATES.IN_TRANSIT}
                      >
                        In Transit
                      </Radio>
                      <Radio
                        disabled={data.status === SHIPMENT_STATES.DELIVERED}
                        value={SHIPMENT_STATES.DELIVERED}
                      >
                        Delivered
                      </Radio>
                      <Radio
                        disabled={
                          data.status === SHIPMENT_STATES.DELIVERED ||
                          data.status === SHIPMENT_STATES.NOT_DELIVERED
                        }
                        value={SHIPMENT_STATES.NOT_DELIVERED}
                      >
                        Not Delivered
                      </Radio>
                    </Space>
                  </Radio.Group>
                </Form.Item>
                <Form.Item>
                  <Button
                    loading={isButtonLoading}
                    disabled={data.status === SHIPMENT_STATES.DELIVERED}
                    type='primary'
                    htmlType='submit'
                    style={{
                      marginTop: "30px",
                      backgroundColor: "green",
                      color: "white",
                      width: "100%",
                    }}
                  >
                    Update
                  </Button>
                </Form.Item>
              </Form>
            </div>
          </Card>
        </div>
      )}
    </>
  );
}
