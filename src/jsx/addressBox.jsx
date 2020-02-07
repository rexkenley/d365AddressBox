import get from "lodash/get";
import React, { useState, useEffect } from "react";
import {
  Stack,
  Callout,
  DirectionalHint,
  IconButton,
  PrimaryButton
} from "office-ui-fabric-react";
import {
  DetailsList,
  SelectionMode
} from "office-ui-fabric-react/lib/DetailsList";
import { Fabric } from "office-ui-fabric-react/lib/Fabric";
import { SearchBox } from "office-ui-fabric-react/lib/SearchBox";
import { TextField } from "office-ui-fabric-react/lib/TextField";
import { initializeIcons } from "@uifabric/icons";

import { composeAddress } from "../js/address";
import { getAddresses, getSuggestions } from "../js/bingMaps";

initializeIcons();

/** @module addressBox */

/**
 * @module addressBox/AddressBoxProps
 * @typedef {{}} AddressBoxProps
 * @property {string} bingMapsUrl
 * @property {string} bingMapsKey
 * @property {int} maxResults
 * @property {string} composite
 * @property {string} line1
 * @property {string} line2
 * @property {string} line3
 * @property {string} postOfficeBox
 * @property {string} city
 * @property {string} stateOrProvince
 * @property {string} postalCode
 * @property {string} county
 * @property {string} country
 * @property {string} latitude
 * @property {string} longtitude
 * @property {function} onAddressChange
 * @property {function} onAddressResults
 */

/**
 * AdddressBox
 * @module addressBox/AddressBox
 * @function
 * @param {AddressBoxProps} props
 * @returns {{}}
 */
const sbRef = React.createRef(),
  columns = [
    { key: "address", name: "Address", fieldName: "formattedAddress" }
  ],
  calloutWidth = 350,
  AddressBox = props => {
    const {
        bingMapsUrl,
        bingMapsKey,
        maxResults,
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
        longtitude,
        onAddressChange,
        onAddressResults
      } = props,
      [_composite, setComposite] = useState(""),
      [_line1, setLine1] = useState(""),
      [_line2, setLine2] = useState(""),
      [_line3, setLine3] = useState(""),
      [_postOfficeBox, setPostOfficeBox] = useState(""),
      [_city, setCity] = useState(""),
      [_stateOrProvince, setStateOrProvince] = useState(""),
      [_postalCode, setPostalCode] = useState(""),
      [_county, setCounty] = useState(""),
      [_country, setCountry] = useState(""),
      [_latitude, setLatitude] = useState(""),
      [_longtitude, setLongtitude] = useState(""),
      [_suggestions, setSuggestions] = useState([]),
      [_showDetails, setShowDetails] = useState(false);

    useEffect(() => {
      setComposite(
        composite ||
          composeAddress(
            line1,
            line2,
            line3,
            postOfficeBox,
            city,
            stateOrProvince,
            postalCode,
            county,
            country
          )
      );
      setLine1(line1);
      setLine2(line2);
      setLine3(line3);
      setPostOfficeBox(postOfficeBox);
      setCity(city);
      setStateOrProvince(stateOrProvince);
      setPostalCode(postalCode);
      setCounty(county);
      setCountry(country);
      setLatitude(latitude);
      setLongtitude(longtitude);
      setSuggestions([]);
    }, [
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
    ]);

    return (
      <Fabric>
        <Stack tokens={{ childrenGap: 8 }} horizontal verticalAlign="end">
          <div ref={sbRef}>
            <SearchBox
              placeholder="Enter Address"
              value={_composite}
              onSearch={async val => {
                const res = await getSuggestions(
                    bingMapsUrl,
                    bingMapsKey,
                    maxResults,
                    val
                  ),
                  suggestions = get(
                    res,
                    "resourceSets[0].resources[0].value",
                    []
                  ).map(r => r.address);

                setSuggestions(suggestions);
                onAddressResults && onAddressResults(suggestions);
              }}
              onChange={async (ev, val) => {
                setComposite(val);
                onAddressChange && onAddressChange(val);
              }}
              onClear={() => {
                setComposite();
              }}
            />
          </div>
          <IconButton
            iconProps={{ iconName: "AddHome" }}
            onClick={() => setShowDetails(true)}
          />
        </Stack>
        {!!_suggestions.length && (
          <Callout
            target={sbRef}
            isBeakVisible={false}
            coverTarget={false}
            calloutWidth={calloutWidth}
            directionalHint={DirectionalHint.bottomLeftEdge}
            onDismiss={() => {
              setSuggestions([]);
            }}
          >
            <DetailsList
              columns={columns}
              items={_suggestions}
              checkboxVisibility={2}
              selectionMode={SelectionMode.single}
              onItemInvoked={async item => {
                const {
                    addressLine,
                    locality,
                    adminDistrict,
                    postalCode,
                    countryRegion
                  } = item,
                  res = await getAddresses(
                    bingMapsUrl,
                    bingMapsKey,
                    maxResults,
                    addressLine,
                    locality,
                    adminDistrict,
                    postalCode,
                    countryRegion
                  ),
                  addresses = get(res, "resourceSets[0].resources[0]", []),
                  {
                    address,
                    point: { coordinates }
                  } = addresses;

                setComposite(address.formattedAddress);
                setLine1(address.addressLine);
                setCity(address.locality);
                setStateOrProvince(address.adminDistrict);
                setPostalCode(address.postalCode);
                setCounty(address.adminDistrict2);
                setCountry(address.countryRegion);
                setLatitude(coordinates[0]);
                setLongtitude(coordinates[1]);
                setSuggestions([]);
              }}
            />
            <PrimaryButton
              text="Close"
              onClick={() => {
                setSuggestions([]);
              }}
            />
          </Callout>
        )}
        {!!_showDetails && (
          <Callout
            target={sbRef}
            isBeakVisible={false}
            coverTarget={false}
            calloutWidth={calloutWidth}
            directionalHint={DirectionalHint.bottomLeftEdge}
            onDismiss={() => {
              setShowDetails(false);
            }}
          >
            <TextField
              underlined
              label="Line1"
              value={_line1}
              onChange={(evt, val) => {
                setLine1(val);
              }}
            />
            <TextField
              underlined
              label="Line2"
              value={_line2}
              onChange={(evt, val) => {
                setLine2(val);
              }}
            />
            <TextField
              underlined
              label="Line3"
              value={_line3}
              onChange={(evt, val) => {
                setLine3(val);
              }}
            />
            <TextField
              underlined
              label="Post Office Box"
              value={_postOfficeBox}
              onChange={(evt, val) => {
                setPostOfficeBox(val);
              }}
            />
            <TextField
              underlined
              label="City"
              value={_city}
              onChange={(evt, val) => {
                setCity(val);
              }}
            />
            <TextField
              underlined
              label="State Or Province"
              value={_stateOrProvince}
              onChange={(evt, val) => {
                setStateOrProvince(val);
              }}
            />
            <TextField
              underlined
              label="Postal Code"
              value={_postalCode}
              onChange={(evt, val) => {
                setPostalCode(val);
              }}
            />
            <TextField
              underlined
              label="County"
              value={_county}
              onChange={(evt, val) => {
                setCounty(val);
              }}
            />
            <TextField
              underlined
              label="Country"
              value={_country}
              onChange={(evt, val) => {
                setCountry(val);
              }}
            />
            <TextField
              underlined
              label="Latitude"
              value={_latitude}
              onChange={(evt, val) => {
                setLatitude(val);
              }}
            />
            <TextField
              underlined
              label="Longtitude"
              value={_longtitude}
              onChange={(evt, val) => {
                setLongtitude(val);
              }}
            />
            <PrimaryButton
              text="Close"
              onClick={() => {
                setShowDetails(false);
              }}
            />
          </Callout>
        )}
      </Fabric>
    );
  };

export default AddressBox;
