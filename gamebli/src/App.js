import logo from './logo.svg';
import './App.css';

function App() {
  return (
    
    <div className="App">
      
      <header className="App-header">
        <h1>Gamebli</h1>
        <p>Welcome to Gamebli!</p>
        <p>Nuevos lanzamientos</p>
        <p>barra de busqueda</p>

      </header>

      <nav>
        <ul>
          <li>Inicio</li>
          <li>Juegos</li>
          <li>Ofertas</li>
          <li>Contacto</li>
        </ul>
      </nav>

      <main>
        <section>
          <h2>Destacados</h2>
          <p>Contenido destacado de juegos.</p>
        </section>

        <section>
          <h2>Ofertas Especiales</h2>
          <p>Contenido de ofertas especiales.</p>
        </section>
        <section>
          <h2>Próximos Lanzamientos</h2>
          <div className="game-release">
            <ul>
              <li>
                {barcelonaImage}
              </li>
              <li>
                {tokyoImage}
              </li>
              <li>
                {ohioImage}
              </li>
            </ul>
          </div>
        </section>
      </main>

      <footer>
        <p>&copy; 2024 Gamebli. Todos los derechos reservados.</p>
      </footer>
    </div>

  );
}


const barcelonaImage = <img src={"https://i.imgur.com/qaQNzqi.png"}  alt="Barcelona" />;
const tokyoImage = <img src={"https://i.imgur.com/OAx1wzO.png"}  alt="Tokyo" />;
const ohioImage = <img src={"https://i.imgur.com/CxJjltu.png"}  alt="Ohio" />;

export default App;
