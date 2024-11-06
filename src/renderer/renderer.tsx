import React from 'react';
import { createRoot } from 'react-dom/client'
import { ChakraProvider } from '@chakra-ui/react';
import { HashRouter, Route, Routes } from 'react-router-dom';
import { route_pages } from './shared/route';

import './index.scss';
import Home from './pages/home/Home';
import Signin from './pages/auth/signin/Signin';
import Auth from './pages/auth/Auth';
import Desk from './pages/dashboard/desk/Desk';
import Clients from './pages/dashboard/clients/Clients';
import Estate from './pages/dashboard/estate/Estate';
import Reports from './pages/dashboard/reports/Reports';
import Calendar from './pages/dashboard/calendar/Calendar';

const dom = document.getElementById("root") as HTMLElement
const root = createRoot(dom)
root.render(
  <>
    <ChakraProvider>
      <HashRouter>
        <Routes>
          <Route path={route_pages.home} element={<Home />} children={
            <>
              <Route path={route_pages.desk} element={<Desk />} />
              <Route path={route_pages.clients} element={<Clients />} />
              <Route path={route_pages.estate} element={<Estate />} />
              <Route path={route_pages.reports} element={<Reports />} />
              <Route path={route_pages.calendar} element={<Calendar />} />
            </>
          } />
          <Route path={route_pages.auth}  element={<Auth />} children={
            <>
              <Route path={route_pages.singin} element={<Signin />} />
            </>
          } />
        </Routes>
      </HashRouter>
    </ChakraProvider>
  </>
)

