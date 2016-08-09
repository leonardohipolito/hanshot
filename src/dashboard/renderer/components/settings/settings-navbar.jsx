//------------------------------------------------------------------------------
// Requirements
//------------------------------------------------------------------------------

import React from 'react';

import { openDashboard } from '../../../../actions';
import viewDispatch from '../../view-dispatch';

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
