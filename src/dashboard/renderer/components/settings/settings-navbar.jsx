//------------------------------------------------------------------------------
// Requirements
//------------------------------------------------------------------------------

import React from 'react';

import viewDispatch from 'app/dashboard/dispatch';
import { openDashboard } from 'app/actions';

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
