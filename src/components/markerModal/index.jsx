import React, { useState } from "react";
import { Modal, Input, Form, Alert } from "antd";
import { MARKERMODES } from "../../constants";

const formItemLayout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 8 }
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 16 }
  }
};
/**
 * ### Marker Modal - Functional Component
 * Reusable component as addMarker/EditMarker
 * # Props
 * @marker : marker object needs to be edited/added in shape of {name,lat,lng}
 * @mode : defines add mode or edit mode (from constant enum MARKERMODES)
 *
 * # React Hooks
 * @name ,
 * @lat ,
 * @lng : form data
 *
 */
export const MarkerModal = props => {
  const [name, setName] = useState(props.marker.name || undefined);
  const [lat, setlat] = useState(props.marker.lat);
  const [lng, setlng] = useState(props.marker.lng);
  const [validationMessage, setvalidationMessage] = useState(undefined);
  const { marker, mode } = props;

  return (
    <Modal
      title={mode === MARKERMODES.ADD_MODE ? "Add Marker" : "Edit Marker"}
      visible
      onOk={() =>
        name && lat && lng
          ? props.onSubmit({
              ...marker,
              name,
              lat: Number(lat),
              lng: Number(lng)
            })
          : setvalidationMessage("Please check all the fields!")
      }
      onCancel={props.onCancel}
    >
      <Form {...formItemLayout}>
        <article className="c-list__card">
          <Form.Item label="Name">
            <Input
              placeholder="Name this marker"
              value={name}
              onChange={e => setName(e.target.value)}
            />
          </Form.Item>
          {/* <p>subtitle</p> */}
          <Form.Item label="Latitude">
            <Input value={lat} onChange={e => setlat(e.target.value)} />
          </Form.Item>
          <Form.Item label="Longitude" er>
            <Input value={lng} onChange={e => setlng(e.target.value)} />
          </Form.Item>
          {validationMessage && (
            <Alert message={validationMessage} type="error" />
          )}
        </article>
      </Form>
    </Modal>
  );
};
export default MarkerModal;
