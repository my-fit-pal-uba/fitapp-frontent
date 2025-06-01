import './login.css';
import './home.css';
import Header from '../components/header';
import Registrator from '../components/registrator';

function Home() {
  return (
    <>
      <Header />
      <main className="main-content">
        <div className="home-content-wrapper">
          <Registrator />
        </div>
      </main>
    </>
  );
}

export default Home;