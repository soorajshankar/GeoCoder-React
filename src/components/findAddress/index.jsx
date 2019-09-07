import React, { useState } from "react";
import { Modal, Input, Button, Row, Col, Card, Alert } from "antd";

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
export const FindAddress = props => {
  const [searchValue, setsearchValue] = useState(undefined);
  const [suggestions, setSuggestions] = useState([]);
  const [validationMessage, setvalidationMessage] = useState(undefined);
  const [isFetching, setIsFetching] = useState(false);
  const onSearch = () => {
    searchValue &&
      this.props.searchAddress(searchValue).then((resp, err) => {
        setIsFetching(false);
        if (err) return;
        setSuggestions(resp.data.data || []);
        setvalidationMessage(
          resp.data.data && resp.data.data.length
            ? undefined
            : "No Results found"
        );
      });
    setIsFetching(true);
  };
  const onEnterSearch = e => e.key == "Enter" && onSearch();

  return (
    <Modal
      className="find-address"
      title={"Add Marker"}
      visible
      onOk={() => console.log("OK")}
      onCancel={props.onClose}
      footer={[null]}
    >
      <Row>
        <Col span={19}>
          <Input
            placeholder="Search address here.."
            value={searchValue}
            onChange={e => setsearchValue(e.target.value)}
            onKeyDown={onEnterSearch}
          />
        </Col>
        <Col span={5}>
          <Button
            type="primary"
            icon={isFetching && "loading"}
            onClick={onSearch}
          >
            Search
          </Button>
        </Col>
      </Row>
      <Row className="search-list">
        {suggestions.map((item, index) => (
          <article key={index} className="c-list__card">
            <header>{item.name}</header>
            <p>lat :{item.lat}</p>
            <p>lng :{item.lng}</p>
            <footer>
              <button onClick={() => props.onSubmit(item)}>Add to Map</button>
            </footer>
          </article>
        ))}
        {validationMessage && (
          <Alert type="warning" message={validationMessage} />
        )}
      </Row>
    </Modal>
  );
};
export default FindAddress;
