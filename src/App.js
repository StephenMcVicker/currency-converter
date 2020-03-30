import React, { useEffect, useState } from "react";
import styled, { createGlobalStyle, ThemeProvider } from "styled-components";
import { motion } from "framer-motion";

import { StyledRow } from "./components/StyledElements";
import Card from "./components/Card";
import ToggleSwitch from "./components/ToggleSwitch";

const BASE_URL = "https://api.exchangeratesapi.io/latest";
const MEDIA_QUERY_SIZE = "700px";

const GlobalStyles = createGlobalStyle`
  *{
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }`;

const themeDark = {
  primaryBGColor: "#121212",
  secondaryBgColor: "#212121",

  primaryActionColor: "#00adb5",
  secondaryActionColor: "#b83b5e",

  primaryFontColor: "#ffff",

  cardBG: "#121212",
  cardHeaderBG: "#1769aa",
  borderRadius: "30px",
  mediaQuerySize: { MEDIA_QUERY_SIZE }
};

const themeLight = {
  primaryBGColor: "#ffff",
  secondaryBgColor: "#EBEBEB",

  primaryActionColor: "#00adb5",
  secondaryActionColor: "#b83b5e",

  primaryFontColor: "#404040",

  cardBG: "#ffff",
  borderRadius: "30px",
  mediaQuerySize: { MEDIA_QUERY_SIZE }
};

const AppContainer = styled.div`
  width: 100vw;
  height: 100vh;
  position: absolute;
  background-color: ${props => props.theme.primaryBGColor};
  color: ${props => props.theme.primaryFontColor};

  display: flex;
  flex-direction: column;

  @media only screen and (min-width: ${MEDIA_QUERY_SIZE}) {
    justify-content: center;
  }
`;

const StyledHeader = styled.h1`
  padding: 0.8rem;
  color: ${props => props.theme.secondaryActionColor};
`;

const StyledButton = styled(motion.button)`
  width: 60px;
  height: 60px;
  margin-top: 2rem;
  transition-duration: 0.2s;
  background-color: ${props => props.theme.primaryBGColor};
  color: ${props => props.theme.secondaryActionColor};
  outline-style: none;
  border: 1px solid ${props => props.theme.primaryActionColor};
  cursor: pointer;
  border-radius: ${props => props.theme.borderRadius};
  z-index: 2;
  font-size: 2rem;

  :hover {
    border: 2px solid ${props => props.theme.secondaryActionColor};
  }

  :focus {
    background-color: ${props => props.theme.secondaryBgColor};
  }

 @media only screen and (max-width: ${MEDIA_QUERY_SIZE}) {
    margin-top:0;
    margin-left: 160px;
  }

`;

export default function App() {
  // * * *
  // Theme handling
  const [useDarkTheme, setUseDarkTheme] = useState(false);
  const toggleTheme = () => setUseDarkTheme(!useDarkTheme);
  let currentTheme = themeLight; // default
  if (useDarkTheme === true) {
    currentTheme = themeDark;
  }
  // * * *

  const [currencyOptions, setCurrencyOptions] = useState([]);
  const [fromCurrency, setFromCurrency] = useState();
  const [toCurrency, setToCurrency] = useState();
  const [exchangeRate, setExchangeRate] = useState();
  const [amount, setAmount] = useState(1);
  const [amountInFromCurrency, setAmountInFromCurrency] = useState(true); // which card updated

  let fromAmount, toAmount;
  if (amountInFromCurrency) {
    fromAmount = amount;
    toAmount = cleanValueToTwoDecimalPlaces(amount * exchangeRate);
  } else {
    toAmount = amount;
    fromAmount = cleanValueToTwoDecimalPlaces(amount / exchangeRate);
  }

  // Get the data on mount
  useEffect(() => {
    fetch(BASE_URL)
      .then(res => res.json())
      .then(data => {
        const firstToCurrency = Object.keys(data.rates)[0];
        setCurrencyOptions([data.base, ...Object.keys(data.rates)]);

        setFromCurrency(data.base);
        setToCurrency(firstToCurrency);
        setExchangeRate(data.rates[firstToCurrency]);
      });
  }, []);

  // On currency change
  useEffect(() => {
    if (fromCurrency != null && toCurrency != null) {
      fetch(`${BASE_URL}?base=${fromCurrency}&symbols=${toCurrency}`)
        .then(res => res.json())
        .then(data => {
          setExchangeRate(data.rates[toCurrency]);
        });
    }
  }, [fromCurrency, toCurrency]);

  function handleFromAmountChange(e) {
    setAmount(e.target.value);
    setAmountInFromCurrency(true);
  }

  function handleToAmountChange(e) {
    setAmount(e.target.value);
    setAmountInFromCurrency(false);
  }

  function handleSwitchCardValues() {
    const _leftCurrency = fromCurrency;

    const _rightAmount = toAmount;
    const _rightCurrency = toCurrency;

    // Set the left card
    setAmount(_rightAmount);
    setAmountInFromCurrency(true);
    setFromCurrency(_rightCurrency);

    // Set the right card
    setToCurrency(_leftCurrency);
  }

  function handleBlurFromCurrency(e) {
    setAmount(cleanValueToTwoDecimalPlaces(e.target.value));
    setAmountInFromCurrency(true);
  }
  function handleBlurToCurrency(e) {
    setAmount(cleanValueToTwoDecimalPlaces(e.target.value));
    setAmountInFromCurrency(false);
  }

  function cleanValueToTwoDecimalPlaces(passedValue) {
    var num = parseFloat(passedValue);
    var cleanNum = num.toFixed(2);
    return cleanNum;
  }

  return (
    <ThemeProvider theme={currentTheme}>
      <GlobalStyles />
      <AppContainer>
        <StyledHeader>Currency Converter</StyledHeader>
        <StyledRow>
          <Card
            currencyOptions={currencyOptions}
            selectedCurrency={fromCurrency}
            onChangeCurrency={e => setFromCurrency(e.target.value)}
            amount={fromAmount}
            onChangeAmount={handleFromAmountChange}
            onBlur={handleBlurFromCurrency}
          />
          <StyledButton
            tabIndex="3"
            whileHover={{ scale: 1.3 }}
            whileTap={{ scale: 1.2 }}
            onClick={handleSwitchCardValues}
          >
            <i className="fas fa-arrows-alt-h"></i>
          </StyledButton>
          <Card
            currencyOptions={currencyOptions}
            selectedCurrency={toCurrency}
            onChangeCurrency={e => setToCurrency(e.target.value)}
            amount={toAmount}
            onChangeAmount={handleToAmountChange}
            onBlur={handleBlurToCurrency}
          />
        </StyledRow>
        <span>
          Dark theme:
          <ToggleSwitch
            isOn={useDarkTheme}
            onColor={themeDark.primaryActionColor}
            handleToggle={() => toggleTheme()}
            width="60px"
          />
        </span>
      </AppContainer>
    </ThemeProvider>
  );
}
