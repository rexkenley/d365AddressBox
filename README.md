# d365AddressBox

A multi functional address box control powered by BingMaps

**Features**

- A search box that queries BingMaps for best possible addresses
- Selected address have detailed latitude and longtitude

**Planned Feature**

- Searches will included existing records with a matching address

**Settings**

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
- latitude
- longtitude

**Testing and Review**

- npm run storybook
  - Note: If you get an error, make sure you have a **\_\_results\_\_** folder in test and run **npm run test:output**
- npm run test

**Create deployment file**

- msbuild /t:build /restore /p:configuration=Release
