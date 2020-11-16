//  this is not currently being used
import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App'
import { ChakraProvider } from "@chakra-ui/react";

const ThemedApp = () => <ChakraProvider> <App /> </ChakraProvider>;

ReactDOM.render(<ThemedApp />, document.querySelector('#root'))