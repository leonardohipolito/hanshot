//------------------------------------------------------------------------------
// Requirements
//------------------------------------------------------------------------------

import React from 'react';

import viewDispatch from '~/dashboard/renderer/view-dispatch.js';
import { openDashboard } from '~/actions';

import Navbar from '../common/navbar.jsx';
import Button from '../common/button.jsx';

//------------------------------------------------------------------------------
// Module
//------------------------------------------------------------------------------

export default function SettingsNavbar() {
  return (
    <Navbar>
      <Button
        onClick={() => {
          viewDispatch(openDashboard());
        }}
      >
        &lt; Back to dashboard
      </Button>
    </Navbar>
  );
}
