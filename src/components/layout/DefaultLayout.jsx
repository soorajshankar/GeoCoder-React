import React, { Component } from "react";
import { MapView } from "./MapView";
import { SideView } from "./SideView";
import { GenericMap } from "../GenericMap";
import { MarkerList } from "../markerList";
import { AddMarker } from "../addMarker";
import {
  getAllMarkers,
  addMarker,
  deleteMarker,
  editMarker,
  searchAddress
} from "../../services";
import { VIEWMODES, FOCUS_LOC, NOTIFICATION_TYPES } from "../../constants";
import { config } from "../../config/appConfig";
import FindAddress from "../findAddress";
import { notification } from "antd";

export class DefaultLayout extends Component {
  constructor(props) {
    super(props);
    this.state = {
      markers: [],
      edittingMarker: undefined,
      viewMode: VIEWMODES.NORMAL_MODE,
      focusLoc: FOCUS_LOC
    };
  }

  componentDidMount() {
    getAllMarkers()
      .then(res => {
        if (res.status === 200) {
          this.setState({
            markers: res.data || [], // set markers or default null array
            focusLoc: res.data[0] || FOCUS_LOC // Pan to the first marker right after the markers are loaded
          });
        }
      })
      .catch(err =>
        this.showNotfication(
          NOTIFICATION_TYPES.ERROR,
          "Oops something went wrong!"
        )
      );
  }
  findMarker = (body, markers) =>
    markers.find(i => i.lat === body.lat && i.lat === body.lat);

  addToMarkers = body => {
    const { markers } = this.state;
    const isExist = this.findMarker(body, markers);
    if (isExist)
      return this.showNotfication(
        "error",
        "Marker already exist!",
        `${body.name} already exist`
      );
    //Call addMarker API
    addMarker(body)
      .then(res => {
        if (res.status === 200) {
          this.setState({
            markers: res.data,
            viewMode: VIEWMODES.NORMAL_MODE,
            focusLoc: body
          });
        }
      })
      .catch(err =>
        this.showNotfication(
          NOTIFICATION_TYPES.ERROR,
          "Oops something went wrong!"
        )
      );
  };
  onRemoveMarker = (item, index) => {
    deleteMarker(item) //call deleteMarker API
      .then(res => {
        if (res.status === 200) {
          this.setState({ markers: res.data });
        }
      })
      .catch(err =>
        this.showNotfication(
          NOTIFICATION_TYPES.ERROR,
          "Oops something went wrong!"
        )
      );
  };
  onEditMarker = (item, index) => {
    this.setState({
      viewMode: VIEWMODES.EDIT_MODE,
      edittingMarker: { index, ...item }
    });
  };
  showNotfication = (type, message, desc) => {
    notification[type]({
      message: message || undefined,
      description: desc || undefined
    });
  };
  onEditConfirm = item => {
    editMarker(item)
      .then(res => {
        if (res.status === 200) {
          this.setState({
            markers: res.data,
            edittingMarker: undefined,
            viewMode: VIEWMODES.NORMAL_MODE
          });
        }
      })
      .catch(err =>
        this.showNotfication(
          NOTIFICATION_TYPES.ERROR,
          "Oops something went wrong!"
        )
      );
  };
  toggleViewMode = () => this.setState({ viewMode: VIEWMODES.ADD_MODE });
  onItemClick = focusLoc => this.setState({ focusLoc });
  render() {
    const { markers, edittingMarker, viewMode, focusLoc } = this.state;
    return (
      <React.Fragment>
        <div className="c-layout">
          {/* Map View */}
          <MapView viewMode={viewMode}>
            <GenericMap
              apiKey={config.GOOGLE_MAP_API_KEY}
              focusLocation={focusLoc}
              markers={markers}
              viewMode={viewMode}
              // addToMarkers={this.addToMarkers} // added assuming add marker by clicking on the map which was not a requirement
            />
          </MapView>
          {/* Side View */}
          <SideView viewMode={viewMode}>
            <AddMarker onClick={() => this.toggleViewMode()} />
            <MarkerList
              markers={markers}
              onRemove={this.onRemoveMarker}
              onEdit={this.onEditMarker}
              onItemClick={this.onItemClick}
            />
          </SideView>
          {/** Modal Windows  */}
          {viewMode === VIEWMODES.ADD_MODE && (
            <FindAddress
              searchAddress={searchAddress} //ensuring component is not having side effects
              onClose={() => this.setState({ viewMode: VIEWMODES.NORMAL_MODE })}
              onSubmit={this.addToMarkers}
            />
          )}
          {viewMode === VIEWMODES.EDIT_MODE && edittingMarker && (
            <FindAddress
              edittingMarker={edittingMarker}
              searchAddress={searchAddress} //ensuring component is not having side effects
              onClose={() => this.setState({ viewMode: VIEWMODES.NORMAL_MODE })}
              onSubmit={item => {
                this.onEditConfirm({ ...edittingMarker, ...item });
              }}
            />

            // <MarkerModal
            //   marker={edittingMarker}
            //   onSubmit={this.onEditConfirm}
            //   onCancel={() =>
            //     this.setState({
            //       viewMode: VIEWMODES.NORMAL_MODE,
            //       edittingMarker: undefined
            //     })
            //   }
            // />
          )}
        </div>
      </React.Fragment>
    );
  }
}
