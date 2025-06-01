import { useEffect, useState, useRef } from 'react';
import './header.css';
import { User } from '../Models/user';
import { getToken } from '../Models/token';
import DropdownButton from './dropdown';

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
    <header className="app-header">
      <div className="title-wrapper">
        <span className="material-symbols-outlined icons">
          fitness_center
        </span>
        <div className="app-title">PeakFit</div>
      </div>
      <div className="user-info" ref={dropdownRef}>
        <div className="user-details">
          <p>{name}</p>
        </div>
        <DropdownButton />
      </div>
    </header>
  );
}

export default Header;