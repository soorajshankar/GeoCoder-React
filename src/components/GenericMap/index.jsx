import React, { PureComponent } from "react";
import { appContext } from "../../appContext";
import MarkerModal from "../markerModal";
import { loadJS, renderMap, addMarkersToMap } from "../../helpers/map-helpers";
import PropTypes from "prop-types";
import { VIEWMODES, MARKERMODES } from "../../constants";
import { getProviderLibUrl, PROVIDERS } from "../../config/appConfig";

/**
 * # GenericMap - Class Component
 * Generic map component with generic properties. in order to refractor the map provider this file and map helper only needs to be chnaged.
 * ## Props
 * @loc : default focus location,
 * @addToMarkers : output function on add marker
 * @isMapLoaded loaded/not boolean
 *
 *
 */
export class GenericMap extends PureComponent {
  static propTypes = {
    loc: PropTypes.object,
    addToMarkers: PropTypes.func,
    viewMode: PropTypes.string,
    isMapLoaded: PropTypes.bool
  };
  static contextType = appContext;
  constructor(props) {
    super(props);
    this.state = {
      isMapLoaded: false
    };
  }
  componentDidMount() {
    window.initMap = this.initMap;
    loadJS(getProviderLibUrl(this.props.apiKey, PROVIDERS.GOOGLE));
  }
  componentDidUpdate(prevProps) {
    if (this.props.markers !== prevProps.markers) {
      const { markers } = this.props;
      if (this.context.mapInstance) {
        window.mapppp = this.context.mapInstance;
        this.context.removeAllMarkers();
        this.context.markers = addMarkersToMap(
          markers,
          this.context.mapInstance
        );
      }
    }
    if (!Object.is(this.props.focusLocation, prevProps.focusLocation)) {
      this.context.mapInstance.setCenter(this.props.focusLocation);
    }
  }
  initMap = () => {
    //Assign Map instance to appContext
    this.setState({ isMapLoaded: true });
    const { focusLocation, markers } = this.props;
    if (window.google) {
      this.context.mapInstance = renderMap(focusLocation);
      this.context.removeAllMarkers();
      this.context.markers = addMarkersToMap(markers, this.context.mapInstance);
    }
  };
  render() {
    const { isMapLoaded } = this.state;
    return (
      <>
        {!isMapLoaded && <Loading />}
        {/* Map Component */}
        <div id="map" />
      </>
    );
  }
}

const Loading = () => <div className="c-loading">Loading...</div>;
