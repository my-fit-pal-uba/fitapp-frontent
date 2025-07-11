import { useEffect, useState, useRef } from 'react';
import './header.css';
import { User } from '../Models/user';
import { getToken } from '../Models/token';
import DropdownButton from './dropdown.tsx';
import NotificationBell from './notificationbell.tsx';

function Header() {
  const [name, setName] = useState<string>('');
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const user: User | null = getToken();
    if (!user) {
      setName('Invitado');
      return;
    }
    setName(user.username);
  }, []);

  return (
    <>
      <header className="app-header">
        <div className="title-wrapper">
          <a href="/home" className="icon-link">
            <span className="material-symbols-outlined icons">
              fitness_center
            </span>
          </a>
          <div className="app-title">PeakFit</div>
        </div>
        <div className="wrapper">

          <NotificationBell />
          <div className="user-info" ref={dropdownRef}>
            <div className="user-details">
              <p>{name}</p>
            </div>
            <DropdownButton />
          </div>
        </div>
      </header>
    </>
  );
}

export default Header;