import React from 'react';
import { createRoot } from 'react-dom/client'
import { ChakraProvider } from '@chakra-ui/react';
import { RouterProvider } from 'react-router-dom';
import { router } from './shared/route';

import './index.scss';

const dom = document.getElementById("root") as HTMLElement
const root = createRoot(dom)
root.render(
  <>
    <ChakraProvider>
      <RouterProvider router={router} />
    </ChakraProvider>
  </>
)

