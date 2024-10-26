import React from 'react';
import { createRoot } from 'react-dom/client'
import { ChakraProvider } from '@chakra-ui/react';
import { HashRouter, Route, Routes } from 'react-router-dom';
import { route_pages } from './shared/route';

import './index.scss';
import Home from './pages/home/Home';
import Signin from './pages/auth/signin/Signin';
import Signup from './pages/auth/signup/Signup';
import Auth from './pages/auth/Auth';

const dom = document.getElementById("root") as HTMLElement
const root = createRoot(dom)
root.render(
  <>
    <ChakraProvider>
      <HashRouter>
        <Routes>
          <Route path={route_pages.home} element={<Home />} />
          <Route path={route_pages.auth}  element={<Auth />} children={
            <>
              <Route path={route_pages.signup} element={<Signup />} />
              <Route path={route_pages.singin} element={<Signin />} />
            </>
          } />
        </Routes>
      </HashRouter>
    </ChakraProvider>
  </>
)

