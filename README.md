# d365AddressBox

A multi functional address box control powered by BingMaps

**Features**

- A search box that queries BingMaps for best possible addresses
- Selected address have detailed latitude and longtitude

**Planned Features**

- Searches will included existing records with a matching address
- latitude/longtitude

**Settings**

- bingMapsUrl - http://dev.virtualearth.net/REST/version. [Bing Maps Base URL Structure](https://docs.microsoft.com/en-us/bingmaps/rest-services/common-parameters-and-types/base-url-structure)
- bingMapsKey - You need to acquire a key to use this control. [Getting a Bing Maps Key](https://docs.microsoft.com/en-us/bingmaps/getting-started/bing-maps-dev-center-help/getting-a-bing-maps-key)
- maxResults - Maximum number of matching results
- composite
- line1
- line2
- line3
- postOfficeBox
- city
- stateOrProvince
- postalCode
- county
- country

**Testing and Review**

- npm run storybook
  - Note: If you get an error, make sure you have a **\_\_results\_\_** folder in test and run **npm run test:output**
- npm run test

**Create deployment file**

- msbuild /t:build /restore /p:configuration=Release
