import React from "react";
import styled from "styled-components";

const CardContainer = styled.div`
  width: 400px;
  height: 240px;
  background-color: ${props => props.theme.cardBG};
  border-radius: ${props => props.theme.borderRadius};
  box-shadow: 0px 4px 10px 0px rgba(0, 0, 0, 0.2);
  overflow: hidden;

  display: flex;
  flex-direction: column;
  align-items: center;
`;

const CardHeader = styled.div`
  width: 100%;
  height: 4rem;
  padding-left: 1rem;
  background: linear-gradient(90deg, #00adb5 0%, #583bb8 100%);
  display: flex;
  flex-direction: row;
  align-items: center;
  color: white;

  > select {
    width: 78%;
    height: 90%;
    margin-left: 0.5rem;
    color: white;
    background: transparent;
    outline: none;
    border: none;
    font-size: 1.2rem;

    :focus {
      border: 1px solid ${props => props.theme.secondaryActionColor};
      border-radius: 6px;
      /*
      background-color: ${props => props.theme.primaryFontColor};
      color: ${props => props.theme.primaryBGColor};
      */
    }

    /* style the dropdown options too */
    > option {
      background-color: ${props => props.theme.secondaryBgColor};
      color: ${props => props.theme.primaryFontColor};
    }
  }
`;

const CardBody = styled.div`
  width: 100%;
  height: 100%;
  padding-left: 1rem;
  background-color: ${props => props.theme.cardBG};
  display: flex;
  flex-direction: row;
  align-items: center;
  color: ${props => props.theme.primaryFontColor};
  font-size:2rem;

  > input {
    width: 90%;
    height: 80%;
    background-color: transparent;
    outline: none;
    border: none;
    color: ${props => props.theme.primaryFontColor};
    font-size: 4rem;
    padding: 0.2rem;
    margin-left: 0.2rem;

    :focus {
      border: 1px solid ${props => props.theme.primaryActionColor};
      border-radius: 6px;
    }

    /* Disable input buttons for numbers "spinners" */
    ::-webkit-inner-spin-button,
    ::-webkit-outer-spin-button {
      -webkit-appearance: none;
      margin: 0;
    }
  }
`;

export default function Card(props) {

  const {
    currencyOptions,
    selectedCurrency,
    onChangeCurrency,
    amount,
    onChangeAmount,
    onBlur
  } = props;


// Create a map with the currecy code and it's symbol
let symbolMap = new Map();

// Chain through and add links to the symbol for each selected currency value
symbolMap.set("EUR","€")
.set("CAD","C$")
.set("HKD","HK$")
.set("ISK","kr")
.set("PHP","₱")
.set("DKK","Kr")
.set("HUF","Ft")
.set("DKK","Kr")
.set("CZK","Kč")
.set("AUD","A$")
.set("RON","lei")
.set("SEK","Kr")
.set("IDR","Rp")
.set("INR","₹")
.set("BRL","R$")
.set("RUB","₽")
.set("HRK","Kn")
.set("JPY","¥")
.set("THB","฿")
.set("CHF","Fr")
.set("SGD","S$")
.set("PLN","zł")
.set("BGN","Лв")
.set("TRY","₺")
.set("CNY","¥")
.set("NOK","kr")
.set("NZD","NZ$")
.set("ZAR","R")
.set("ZAR","R")
.set("USD","US$")
.set("MXN","Mex$")
.set("ILS","₪")
.set("GBP","£")
.set("KRW","₩")
.set("MYR","RM");


function getCorrectSymbol(){
  return symbolMap.get(selectedCurrency);
}

// For flag, just trim the last letter off the currency code
// Insert that into the countryflags API
function trimCurrencyStringAndReturnFlagURL(){
  if (selectedCurrency !== undefined){
  let tempString = `${selectedCurrency}`;
  let trimmedCountryCode = tempString.slice(0,-1);
  let fullURLForFLag = `https://www.countryflags.io/${trimmedCountryCode}/flat/64.png`;
  return fullURLForFLag;
  }
}


  return (
    <CardContainer>
      <CardHeader>
        <img src={trimCurrencyStringAndReturnFlagURL()} alt="flag" />
        <select
          tabIndex="1"
          value={selectedCurrency}
          onChange={onChangeCurrency}
        >
          {currencyOptions.map(o => (
            <option key={o} value={o}>
              {o}
            </option>
          ))}
        </select>
      </CardHeader>
      <CardBody>
        <p>{getCorrectSymbol()}</p>
        <input
          type="number"
          placeholder="0"
          tabIndex="2"
          min="0"
          step="0.1"
          value={amount}
          onChange={onChangeAmount}
          onBlur={onBlur}
        />
      </CardBody>
    </CardContainer>
  );
}
