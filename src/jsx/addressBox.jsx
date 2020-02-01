import React, { useState, useEffect } from "react";
import { Fabric } from "office-ui-fabric-react/lib/Fabric";
import { Stack } from "office-ui-fabric-react";
import { TextField } from "office-ui-fabric-react/lib/TextField";

/** @module addressBox */

/**
 * @module addressBox/AddressBoxProps
 * @typedef {{}} AddressBoxProps
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
    onAddressChange
  } = props;

  return (
    <Fabric>
      <TextField />
    </Fabric>
  );
};

export default AddressBox;
