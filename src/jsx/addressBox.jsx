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
 * @property {{}} context
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
 * @property {{}} meta
 * @property {boolean} disabled
 * @property {boolean} hidden
 * @property {function} onAddressChange
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
    {
      key: "address",
      name: "Address",
      fieldName: "formattedAddress"
    }
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
        meta,
        disabled,
        hidden,
        onAddressChange
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
            city,
            stateOrProvince,
            postalCode,
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

    if (hidden) return <Fabric />;

    return (
      <Fabric>
        <Stack tokens={{ childrenGap: 8 }} horizontal verticalAlign="end">
          <div ref={sbRef}>
            <SearchBox
              placeholder="Enter Address"
              disabled={disabled}
              value={_composite}
              onSearch={async val => {
                const res = await getSuggestions(
                    bingMapsUrl,
                    bingMapsKey,
                    maxResults,
                    val
                  ),
                  suggestedDetails = get(
                    res,
                    "resourceSets[0].resources[0].value",
                    []
                  ).map(r => {
                    const {
                      addressLine,
                      locality,
                      adminDistrict,
                      postalCode,
                      countryRegion
                    } = r.address;

                    return getAddresses(
                      bingMapsUrl,
                      bingMapsKey,
                      maxResults,
                      addressLine,
                      locality,
                      adminDistrict,
                      postalCode,
                      countryRegion
                    );
                  }),
                  res2 = await Promise.all(suggestedDetails),
                  addresses = res2.map(r => {
                    const resource = get(r, "resourceSets[0].resources[0]", []),
                      {
                        address,
                        point: { coordinates }
                      } = resource;
                    return {
                      ...address,
                      latitude: coordinates[0],
                      longtitude: coordinates[1]
                    };
                  });

                setSuggestions(addresses);
              }}
              onChange={async (ev, val) => {
                setComposite(val);
              }}
              onClear={() => {
                setComposite("");
                setLine1("");
                setLine2("");
                setLine3("");
                setPostOfficeBox("");
                setCity("");
                setStateOrProvince("");
                setPostalCode("");
                setCounty("");
                setCountry("");
                setLatitude("");
                setLongtitude("");
                setSuggestions([]);
                setShowDetails(false);
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
                  formattedAddress,
                  addressLine,
                  locality,
                  adminDistrict,
                  postalCode,
                  adminDistrict2,
                  countryRegion,
                  latitude,
                  longtitude
                } = item;

                setComposite(formattedAddress);
                setLine1(addressLine);
                setCity(locality);
                setStateOrProvince(adminDistrict);
                setPostalCode(postalCode);
                setCounty(adminDistrict2);
                setCountry(countryRegion);
                setLatitude(latitude);
                setLongtitude(longtitude);
                setSuggestions([]);

                onAddressChange &&
                  onAddressChange(
                    formattedAddress,
                    addressLine,
                    "",
                    "",
                    "",
                    locality,
                    adminDistrict,
                    postalCode,
                    adminDistrict2,
                    countryRegion,
                    latitude,
                    longtitude
                  );
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
              label={get(meta, "line1.DisplayName", "Line 1")}
              disabled={disabled}
              value={_line1}
              onChange={(evt, val) => {
                setLine1(val);
                setComposite(
                  composeAddress(
                    val,
                    _line2,
                    _line3,
                    _city,
                    _stateOrProvince,
                    _postalCode,
                    _country
                  )
                );

                onAddressChange &&
                  onAddressChange(
                    composeAddress(
                      val,
                      _line2,
                      _line3,
                      _city,
                      _stateOrProvince,
                      _postalCode,
                      _country
                    ),
                    val,
                    _line2,
                    _line3,
                    _postOfficeBox,
                    _city,
                    _stateOrProvince,
                    _postalCode,
                    _county,
                    _country,
                    _latitude,
                    _longtitude
                  );
              }}
            />
            <TextField
              underlined
              label={get(meta, "line2.DisplayName", "Line 2")}
              disabled={disabled}
              value={_line2}
              onChange={(evt, val) => {
                setLine2(val);
                setComposite(
                  composeAddress(
                    _line1,
                    val,
                    _line3,
                    _city,
                    _stateOrProvince,
                    _postalCode,
                    _country
                  )
                );

                onAddressChange &&
                  onAddressChange(
                    composeAddress(
                      _line1,
                      val,
                      _line3,
                      _city,
                      _stateOrProvince,
                      _postalCode,
                      _country
                    ),
                    _line1,
                    val,
                    _line3,
                    _postOfficeBox,
                    _city,
                    _stateOrProvince,
                    _postalCode,
                    _county,
                    _country,
                    _latitude,
                    _longtitude
                  );
              }}
            />
            <TextField
              underlined
              label={get(meta, "line3.DisplayName", "Line 3")}
              disabled={disabled}
              value={_line3}
              onChange={(evt, val) => {
                setLine3(val);
                setComposite(
                  composeAddress(
                    _line1,
                    _line2,
                    val,
                    _city,
                    _stateOrProvince,
                    _postalCode,
                    _country
                  )
                );

                onAddressChange &&
                  onAddressChange(
                    composeAddress(
                      _line1,
                      _line2,
                      val,
                      _city,
                      _stateOrProvince,
                      _postalCode,
                      _country
                    ),
                    _line1,
                    _line2,
                    val,
                    _postOfficeBox,
                    _city,
                    _stateOrProvince,
                    _postalCode,
                    _county,
                    _country,
                    _latitude,
                    _longtitude
                  );
              }}
            />
            <TextField
              underlined
              label={get(meta, "postOfficeBox.DisplayName", "Post Office Box")}
              disabled={disabled}
              value={_postOfficeBox}
              onChange={(evt, val) => {
                setPostOfficeBox(val);

                onAddressChange &&
                  onAddressChange(
                    _compose,
                    _line1,
                    _line2,
                    _line3,
                    val,
                    _city,
                    _stateOrProvince,
                    _postalCode,
                    _county,
                    _country,
                    _latitude,
                    _longtitude
                  );
              }}
            />
            <TextField
              underlined
              label={get(meta, "city.DisplayName", "City")}
              disabled={disabled}
              value={_city}
              onChange={(evt, val) => {
                setCity(val);
                setComposite(
                  composeAddress(
                    _line1,
                    _line2,
                    _line3,
                    val,
                    _stateOrProvince,
                    _postalCode,
                    _country
                  )
                );

                onAddressChange &&
                  onAddressChange(
                    composeAddress(
                      _line1,
                      _line2,
                      _line3,
                      val,
                      _stateOrProvince,
                      _postalCode,
                      _country
                    ),
                    _line1,
                    _line2,
                    _line3,
                    _postOfficeBox,
                    val,
                    _stateOrProvince,
                    _postalCode,
                    _county,
                    _country,
                    _latitude,
                    _longtitude
                  );
              }}
            />
            <TextField
              underlined
              label={get(
                meta,
                "stateOrProvince.DisplayName",
                "State Or Province"
              )}
              disabled={disabled}
              value={_stateOrProvince}
              onChange={(evt, val) => {
                setStateOrProvince(val);
                setComposite(
                  composeAddress(
                    _line1,
                    _line2,
                    _line3,
                    _city,
                    val,
                    _postalCode,
                    _country
                  )
                );

                onAddressChange &&
                  onAddressChange(
                    composeAddress(
                      _line1,
                      _line2,
                      _line3,
                      _city,
                      val,
                      _postalCode,
                      _country
                    ),
                    _line1,
                    _line2,
                    _line3,
                    _postOfficeBox,
                    _city,
                    val,
                    _postalCode,
                    _county,
                    _country,
                    _latitude,
                    _longtitude
                  );
              }}
            />
            <TextField
              underlined
              label={get(meta, "postalCode.DisplayName", "Postal Code")}
              disabled={disabled}
              value={_postalCode}
              onChange={(evt, val) => {
                setPostalCode(val);
                setComposite(
                  composeAddress(
                    _line1,
                    _line2,
                    _line3,
                    _city,
                    _stateOrProvince,
                    val,
                    _country
                  )
                );

                onAddressChange &&
                  onAddressChange(
                    composeAddress(
                      _line1,
                      _line2,
                      _line3,
                      _city,
                      _stateOrProvince,
                      val,
                      _country
                    ),
                    _line1,
                    _line2,
                    _line3,
                    _postOfficeBox,
                    _city,
                    _stateOrProvince,
                    val,
                    _county,
                    _country,
                    _latitude,
                    _longtitude
                  );
              }}
            />
            <TextField
              underlined
              label={get(meta, "county.DisplayName", "County")}
              disabled={disabled}
              value={_county}
              onChange={(evt, val) => {
                setCounty(val);

                onAddressChange &&
                  onAddressChange(
                    _compose,
                    _line2,
                    _line3,
                    _postOfficeBox,
                    _city,
                    _stateOrProvince,
                    _postalCode,
                    _county,
                    _country,
                    _latitude,
                    _longtitude
                  );
              }}
            />
            <TextField
              underlined
              label={get(meta, "country.DisplayName", "Country")}
              disabled={disabled}
              value={_country}
              onChange={(evt, val) => {
                setCountry(val);
                setComposite(
                  composeAddress(
                    _line1,
                    _line2,
                    _line3,
                    _city,
                    _stateOrProvince,
                    _postalCode,
                    val
                  )
                );

                onAddressChange &&
                  onAddressChange(
                    composeAddress(
                      _line1,
                      _line2,
                      _line3,
                      _city,
                      _stateOrProvince,
                      _postalCode,
                      val
                    ),
                    _line1,
                    _line2,
                    _line3,
                    _postOfficeBox,
                    _city,
                    _stateOrProvince,
                    _postalCode,
                    _county,
                    val,
                    _latitude,
                    _longtitude
                  );
              }}
            />
            <TextField
              underlined
              label={get(meta, "latitude.DisplayName", "Latitude")}
              disabled={disabled}
              value={_latitude}
              onChange={(evt, val) => {
                setLatitude(val);

                onAddressChange &&
                  onAddressChange(
                    _compose,
                    _line1,
                    _line2,
                    _line3,
                    _postOfficeBox,
                    _city,
                    _stateOrProvince,
                    _postalCode,
                    _county,
                    _country,
                    val,
                    _longtitude
                  );
              }}
            />
            <TextField
              underlined
              label={get(meta, "longtitude.DisplayName", "Longtitude")}
              disabled={disabled}
              value={_longtitude}
              onChange={(evt, val) => {
                setLongtitude(val);

                onAddressChange &&
                  onAddressChange(
                    _compose,
                    _line1,
                    _line2,
                    _line3,
                    _postOfficeBox,
                    _city,
                    _stateOrProvince,
                    _postalCode,
                    _county,
                    _country,
                    _latitude,
                    val
                  );
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
