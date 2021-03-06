import React, { useState } from "react";
import { Modal, Input, Button, Row, Col, Alert, Select } from "antd";
import { COUNTRY_CODES } from "../../helpers/map-helpers";
const InputGroup = Input.Group;
const { Option } = Select;
/**
 * ### Find Address Modal - Functional Component
 * Reusable component as addMarker/EditMarker
 * # Props
 * @edittingMarker : marker object if the component is mounted as edit mode
 * @searchAddress : Promise which will validate the address. accepts (address,country) as arguments
 *
 * # React Hooks
 * @searchValue
 * @suggestions
 * @validationMessage
 * @isFetching
 * @country
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
      props
        .searchAddress(searchValue, country)
        .then((resp, err) => {
          setIsFetching(false);
          if (err) return;
          setSuggestions(resp.data.data || []);
          setvalidationMessage(
            resp.data.data && resp.data.data.length
              ? undefined
              : "No Results found"
          );
        })
        .catch(e => {
          setIsFetching(false);
          setSuggestions([]);
          setvalidationMessage("Oops Something went wrong !");
        });
    setIsFetching(true);
  };
  const onEnterSearch = e => e.key === "Enter" && onSearch();

  return (
    <Modal
      className="find-address"
      title={"Add Marker"}
      visible
      // onOk={() => console.log("OK")}
      onCancel={props.onClose}
      footer={[null]}
    >
      <Row>
        <Col span={19}>
          <InputGroup compact>
            <Select defaultValue={country} onChange={setCountry}>
              {COUNTRY_CODES.map((i, index) => (
                <Option key={index} value={i.code}>
                  {i.name}
                </Option>
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
            icon={(isFetching && "loading") || undefined}
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
