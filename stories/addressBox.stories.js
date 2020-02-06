import React from "react";
import { storiesOf } from "@storybook/react";
import { action } from "@storybook/addon-actions";

const bingMapsUrl = "http://dev.virtualearth.net/REST/v1/",
  maxResults = 5;
import bingMapsKey from "../src/js/bingMapsKey";

import AddressBox from "../src/jsx/addressBox";

storiesOf("AddressBox", module)
  .add("Initial", () => <AddressBox />)
  .add("with props composite", () => (
    <AddressBox composite="123 Somewhere St Some City, Some State 11111" />
  ))
  .add("with props line1", () => <AddressBox line1="line1" />)
  .add("with props line2", () => <AddressBox line2="line2" />)
  .add("with props line3", () => <AddressBox line3="line3" />)
  .add("with props postOfficeBox", () => (
    <AddressBox postOfficeBox="postOfficeBox" />
  ))
  .add("with props city", () => <AddressBox city="city" />)
  .add("with props stateOrProvince", () => (
    <AddressBox stateOrProvince="stateOrProvince" />
  ))
  .add("with props postalCode", () => <AddressBox postalCode="postalCode" />)
  .add("with props county", () => <AddressBox county="county" />)
  .add("with props country", () => <AddressBox country="country" />)
  .add("with props latitude", () => <AddressBox latitude="" />)
  .add("with props longtitude", () => <AddressBox longtitude="" />)
  .add(
    "with props line1, line2, line3, city, stateOrProvince, postalCode and country",
    () => (
      <AddressBox
        line1="line1"
        line2="line2"
        line3="line3"
        city="city"
        stateOrProvince="stateOrProvince"
        postalCode="postalCode"
        country="country"
      />
    )
  )
  .add("with props onAddressChange", () => (
    <AddressBox onAddressChange={action("onAddressChange")} />
  ))
  .add("with props onAddressResults", () => (
    <AddressBox onAddressResults={action("onAddressResults")} />
  ))
  .add(
    "with props bingMapUrl, bingMapKey, maxResults and onAddressResults",
    () => (
      <AddressBox
        bingMapsUrl={bingMapsUrl}
        bingMapsKey={bingMapsKey}
        maxResults={maxResults}
        onAddressResults={action("onAddressResults")}
      />
    )
  );
