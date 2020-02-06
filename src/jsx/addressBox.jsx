import get from "lodash/get";
import React, { useState, useEffect } from "react";
import {
  Stack,
  Callout,
  DirectionalHint,
  IconButton
} from "office-ui-fabric-react";
import {
  DetailsList,
  DetailsListLayoutMode,
  Selection,
  SelectionMode,
  IColumn
} from "office-ui-fabric-react/lib/DetailsList";
import { Fabric } from "office-ui-fabric-react/lib/Fabric";
import { SearchBox } from "office-ui-fabric-react/lib/SearchBox";
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
      [address, setAddress] = useState(),
      [addressDetails, setAddressDetails] = useState(),
      [suggestions, setSuggestions] = useState([]),
      [showDetails, setShowDetails] = useState(false);

    useEffect(() => {
      setAddress(
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
      country
    ]);

    return (
      <Fabric>
        <Stack tokens={{ childrenGap: 8 }} horizontal verticalAlign="end">
          <div ref={sbRef}>
            <SearchBox
              placeholder="Enter Address"
              value={address}
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
                setAddress(val);
                onAddressChange && onAddressChange(val);
              }}
              onClear={() => {
                setAddress();
              }}
            />
          </div>
          <IconButton
            iconProps={{ iconName: "AddHome" }}
            onClick={() => setShowDetails(true)}
          />
        </Stack>
        {!!suggestions.length && (
          <Callout
            target={sbRef}
            isBeakVisible={false}
            coverTarget={false}
            calloutWidth={350}
            directionalHint={DirectionalHint.bottomLeftEdge}
            onDismiss={() => {
              setSuggestions([]);
            }}
          >
            <DetailsList
              columns={columns}
              items={suggestions}
              checkboxVisibility={2}
              selectionMode={SelectionMode.single}
            />
          </Callout>
        )}
        {!!showDetails && (
          <Callout
            target={sbRef}
            isBeakVisible={false}
            coverTarget={false}
            calloutWidth={350}
            directionalHint={DirectionalHint.bottomLeftEdge}
            onDismiss={() => {
              setShowDetails(false);
            }}
          ></Callout>
        )}
      </Fabric>
    );
  };

export default AddressBox;
