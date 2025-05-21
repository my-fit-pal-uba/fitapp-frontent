import { useEffect, useState } from 'react';
import './header.css';
import { User } from '../Models/user';
import { getToken } from '../Models/token';

function Header() {


  const [name, setName] = useState<string>('');
  const [email, setEmail] = useState<string>('');

  useEffect(() => {
    const user: User | null = getToken();
    if (!user) {
      setName('Invitado');
      return;
    }
    setName(user.username);
    setEmail(user.email);
  }, []);

  return (
    <header className="app-header">
      <div className="app-title">Centro PeakFit</div>
      <div className="user-name">
        <p>{name}</p>
        <p>{email}</p>
      </div>
    </header>
  );
}

export default Header;
