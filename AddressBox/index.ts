import * as React from "react";
import * as ReactDOM from "react-dom";
import { IInputs, IOutputs } from "./generated/ManifestTypes";

import AddressBox from "../src/jsx/addressBox";

export class AddressBox
  implements ComponentFramework.StandardControl<IInputs, IOutputs> {
  private container: HTMLDivElement;
  private notifyOutputChanged: () => void;
  private updatedByReact: boolean;
  private isControlDisabled: boolean;
  private isVisible: boolean;
  private bingMapsUrl: string;
  private bingMapsKey: string;
  private maxResults: number;
  private searchOnChange: boolean;
  private composite: string;
  private line1: string;
  private line2: string;
  private line3: string;
  private postOfficeBox: string;
  private city: string;
  private stateOrProvince: string;
  private postalCode: string;
  private county: string;
  private country: string;
  private latitude: number;
  private longtitude: number;
  private meta: object;

  syncData(parameters) {
    const {
      composite,
      line1,
      line2,
      line3,
      postOfficeBox,
      city,
      stateOrProvince,
      postalCode,
      county,
      country,
      latitude,
      longtitude
    } = parameters;

    //this.composite = (composite && composite.raw) || "";
    this.line1 = (line1 && line1.raw) || "";
    this.line2 = (line2 && line2.raw) || "";
    this.line3 = (line3 && line3.raw) || "";
    this.postOfficeBox = (postOfficeBox && postOfficeBox.raw) || "";
    this.city = (city && city.raw) || "";
    this.stateOrProvince = (stateOrProvince && stateOrProvince.raw) || "";
    this.postalCode = (postalCode && postalCode.raw) || "";
    this.county = (county && county.raw) || "";
    this.country = (country && country.raw) || "";
    //this.latitude = (latitude && latitude.raw) || 0;
    //this.longtitude = (longtitude && longtitude.raw) || 0;
  }

  addressChange(
    composite,
    line1,
    line2,
    line3,
    postOfficeBox,
    city,
    stateOrProvince,
    postalCode,
    county,
    country,
    latitude,
    longtitude
  ) {
    //this.composite = composite;
    this.line1 = line1;
    this.line2 = line2;
    this.line3 = line3;
    this.postOfficeBox = postOfficeBox;
    this.city = city;
    this.stateOrProvince = stateOrProvince;
    this.postalCode = postalCode;
    this.county = county;
    this.country = country;
    //this.latitude = latitude;
    //this.longtitude = longtitude;
    this.updatedByReact = true;
    this.notifyOutputChanged();
  }

  equivalent(parameters) {
    const {
      composite,
      line1,
      line2,
      line3,
      postOfficeBox,
      city,
      stateOrProvince,
      postalCode,
      county,
      country,
      latitude,
      longtitude
    } = parameters;

    return (
      //composite && composite.raw === this.composite &&
      line1 &&
      line1.raw === this.line1 &&
      line2 &&
      line2.raw === this.line2 &&
      line3 &&
      line3.raw === this.line3 &&
      postOfficeBox &&
      postOfficeBox.raw === this.postOfficeBox &&
      city &&
      city.raw === this.city &&
      stateOrProvince &&
      stateOrProvince.raw === this.stateOrProvince &&
      postalCode &&
      postalCode.raw === this.postalCode &&
      county &&
      county.raw === this.county &&
      country &&
      country.raw === this.country
      //latitude && latitude.raw === this.latitude &&
      //longtitude && longtitude.raw === this.longtitude
    );
  }

  /**
   * Used to initialize the control instance. Controls can kick off remote server calls and other initialization actions here.
   * Data-set values are not initialized here, use updateView.
   * @param context The entire property bag available to control via Context Object; It contains values as set up by the customizer mapped to property names defined in the manifest, as well as utility functions.
   * @param notifyOutputChanged A callback method to alert the framework that the control has new outputs ready to be retrieved asynchronously.
   * @param state A piece of data that persists in one session for a single user. Can be set at any point in a controls life cycle by calling 'setControlState' in the Mode interface.
   * @param container If a control is marked control-type='standard', it will receive an empty div element within which it can render its content.
   */
  public init(
    context: ComponentFramework.Context<IInputs>,
    notifyOutputChanged: () => void,
    state: ComponentFramework.Dictionary,
    container: HTMLDivElement
  ) {
    const { parameters, mode } = context,
      {
        bingMapsUrl,
        bingMapsKey,
        maxResults,
        searchOnChange,
        //composite,
        line1,
        line2,
        line3,
        postOfficeBox,
        city,
        stateOrProvince,
        postalCode,
        county,
        country
        //latitude,
        //longtitude
      } = parameters,
      { isControlDisabled, isVisible } = mode;

    this.container = container;
    this.notifyOutputChanged = notifyOutputChanged;
    this.updatedByReact = false;
    this.isControlDisabled = isControlDisabled;
    this.isVisible = isVisible;
    this.bingMapsUrl = (bingMapsUrl && bingMapsUrl.raw) || "";
    this.bingMapsKey = (bingMapsKey && bingMapsKey.raw) || "";
    this.maxResults = (maxResults && maxResults.raw) || 0;
    this.searchOnChange =
      (searchOnChange && searchOnChange.raw === "true") || false;
    this.syncData(parameters);

    this.meta = {
      //composite: composite.attributes,
      line1: line1.attributes,
      line2: line2.attributes,
      line3: line3.attributes,
      postOfficeBox: postOfficeBox.attributes,
      city: city.attributes,
      stateOrProvince: stateOrProvince.attributes,
      postalCode: postalCode.attributes,
      county: county.attributes,
      country: country.attributes
      //latitude: latitude.attributes,
      //longtitude: longtitude.attributes
    };

    // Add control initialization code
    ReactDOM.render(
      // @ts-ignore
      React.createElement(AddressBox, {
        bingMapsUrl: this.bingMapsUrl,
        bingMapsKey: this.bingMapsKey,
        maxResults: this.maxResults,
        searchOnChange: this.searchOnChange,
        composite: this.composite,
        line1: this.line1,
        line2: this.line2,
        line3: this.line3,
        postOfficeBox: this.postOfficeBox,
        city: this.city,
        stateOrProvince: this.stateOrProvince,
        postalCode: this.postalCode,
        county: this.county,
        country: this.country,
        latitude: this.latitude,
        longtitude: this.longtitude,
        meta: this.meta,
        disabled: this.isControlDisabled,
        hidden: !this.isVisible,
        onAddressChange: this.addressChange.bind(this)
      }),
      this.container
    );
  }

  /**
   * Called when any value in the property bag has changed. This includes field values, data-sets, global values such as container height and width, offline status, control metadata values such as label, visible, etc.
   * @param context The entire property bag available to control via Context Object; It contains values as set up by the customizer mapped to names defined in the manifest, as well as utility functions
   */
  public updateView(context: ComponentFramework.Context<IInputs>): void {
    // Add code to update control view
    const { parameters, mode } = context,
      { isControlDisabled, isVisible } = mode;

    if (this.updatedByReact) {
      if (this.equivalent(parameters)) this.updatedByReact = false;

      return;
    } else if (
      this.equivalent(parameters) &&
      this.isControlDisabled === isControlDisabled &&
      this.isVisible === isVisible
    )
      return;

    this.isControlDisabled = isControlDisabled;
    this.isVisible = isVisible;
    this.syncData(parameters);

    ReactDOM.render(
      // @ts-ignore
      React.createElement(AddressBox, {
        bingMapsUrl: this.bingMapsUrl,
        bingMapsKey: this.bingMapsKey,
        maxResults: this.maxResults,
        searchOnChange: this.searchOnChange,
        composite: this.composite,
        line1: this.line1,
        line2: this.line2,
        line3: this.line3,
        postOfficeBox: this.postOfficeBox,
        city: this.city,
        stateOrProvince: this.stateOrProvince,
        postalCode: this.postalCode,
        county: this.county,
        country: this.country,
        latitude: this.latitude,
        longtitude: this.longtitude,
        meta: this.meta,
        disabled: this.isControlDisabled,
        hidden: !this.isVisible,
        onAddressChange: this.addressChange.bind(this)
      }),
      this.container
    );
  }

  /**
   * It is called by the framework prior to a control receiving new data.
   * @returns an object based on nomenclature defined in manifest, expecting object[s] for property marked as “bound” or “output”
   */
  public getOutputs(): IOutputs {
    return {
      //composite: this.composite,
      line1: this.line1,
      line2: this.line2,
      line3: this.line3,
      postOfficeBox: this.postOfficeBox,
      city: this.city,
      stateOrProvince: this.stateOrProvince,
      postalCode: this.postalCode,
      county: this.county,
      country: this.country
      //latitude: this.latitude,
      //longtitude: this.longtitude
    };
  }

  /**
   * Called when the control is to be removed from the DOM tree. Controls should use this call for cleanup.
   * i.e. cancelling any pending remote calls, removing listeners, etc.
   */
  public destroy(): void {
    ReactDOM.unmountComponentAtNode(this.container);
  }
}
