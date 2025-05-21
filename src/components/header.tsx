import React, { useEffect, useState } from 'react';
import './header.css';
import { useUser } from '../context/user_context';

function Header() {
  const { user } = useUser();
    return (
      <header className="app-header">
        <div className="app-title">PeakFit</div>
        <div className="user-name">
          {user ? (
            <>
              <div>{user.name} {user.lastName}</div>
              <div>{user.email}</div>
            </>
          ) : (
            'Invitado'
          )}
        </div>
      </header>
    );
}
  
export default Header;
