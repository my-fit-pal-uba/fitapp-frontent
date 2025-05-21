import React, { useEffect, useState } from 'react';
import './header.css';

function Header() {
    return (
      <header className="app-header">
        <div className="app-title">Centro PeakFit</div>
        <div className="user-name">Juan Pérez</div>
      </header>
    );
}
  
export default Header;
