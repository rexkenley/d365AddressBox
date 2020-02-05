import React, { useState, useEffect } from "react";
import { Fabric } from "office-ui-fabric-react/lib/Fabric";
import { Stack } from "office-ui-fabric-react";
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
 * @property {function} onAddressSearch
 */

/**
 * AdddressBox
 * @module addressBox/AddressBox
 * @function
 * @param {AddressBoxProps} props
 * @returns {{}}
 */
const AddressBox = props => {
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
      onAddressSearch
    } = props,
    [address, setAddress] = useState();

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

  async function onSearch(val) {
    await getSuggestions();
    onAddressSearch && onAddressSearch(val);
  }

  return (
    <Fabric>
      <Stack tokens={{ childrenGap: 8 }} horizontal>
        <SearchBox
          placeholder="Enter Address"
          value={address}
          onSearch={async val => {
            await getSuggestions(
              bingMapsUrl,
              bingMapsKey,
              maxResults,
              latitude,
              longtitude,
              val
            );
            onAddressSearch && onAddressSearch(val);
          }}
          onChange={async (ev, val) => {
            setAddress(val);
            onAddressChange && onAddressChange(val);
          }}
          onClear={() => {
            setAddress();
          }}
        />
      </Stack>
    </Fabric>
  );
};

export default AddressBox;
