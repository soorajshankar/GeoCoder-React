import React, { useState } from "react";
import { Modal, Input, Button, Row, Col, Card, Alert, Select } from "antd";
import { COUNTRY_CODES } from "../../helpers/map-helpers";
const InputGroup = Input.Group;
const { Option } = Select;
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
  const { edittingMarker } = props;
  const [searchValue, setsearchValue] = useState(
    (edittingMarker && edittingMarker.name) || undefined
  );
  const [suggestions, setSuggestions] = useState(
    (edittingMarker && [edittingMarker]) || []
  );
  const [validationMessage, setvalidationMessage] = useState(undefined);
  const [isFetching, setIsFetching] = useState(false);
  const [country, setCountry] = useState(
    (edittingMarker && edittingMarker.country) || "DE"
  );
  const onSearch = () => {
    searchValue &&
      props.searchAddress(searchValue, country).then((resp, err) => {
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
          <InputGroup compact>
            <Select defaultValue={country} onChange={setCountry}>
              {COUNTRY_CODES.map(i => (
                <Select.Option value={i.code}>{i.name}</Select.Option>
              ))}
            </Select>
            <Input
              style={{ width: "60%" }}
              placeholder="Search address here.."
              value={searchValue}
              onChange={e => setsearchValue(e.target.value)}
              onKeyDown={onEnterSearch}
            />
          </InputGroup>
        </Col>
        <Col span={5}>
          <Button
            type="primary"
            icon={isFetching && "loading"}
            onClick={onSearch}
          >
            Look Up
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
              <button onClick={() => props.onSubmit(item, edittingMarker)}>
                {edittingMarker ? "Update Marker" : "Add to Map"}
              </button>
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
