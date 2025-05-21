import { useEffect, useState } from 'react';
import './header.css';
import { User } from '../Models/user';

function Header() {


  const [name, setName] = useState<string>('');
  const [email, setEmail] = useState<string>('');

  useEffect(() => {
    try {
      const token: string | null = localStorage.getItem('token');
      if (token) {
        const payload = token.split('.')[1];
        const base64 = payload.replace(/-/g, '+').replace(/_/g, '/');
        const jsonPayload = decodeURIComponent(
          atob(base64)
            .split('')
            .map(function (c) {
              return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
            })
            .join('')
        );
        const decodedToken: User = JSON.parse(jsonPayload);
        console.table(decodedToken);
        setName(decodedToken.username);
        setEmail(decodedToken.email);
      }
    } catch (e) {
    }
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
