import { useEffect,useState } from 'react';
import './App.css';

import SearchBox from './components/SearchBox/SearchBox'

function App() {
  
  const [ state, setState ] = useState({
    count: 0,
    next: null,
    previous: null,
    results: [],
    searchField: '',
  });
  
  useEffect(() => {
    async function getAndSetAppData() {
      const data = await fetch('https://api.kexp.org/v2/plays/?airdate_after=&airdate_before=&album=&album_exact=&artist=&artist_exact=&exclude_airbreaks=&has_comment=&host_ids=&label=&label_exact=&limit=20&offset=20&ordering=artist&recording_id=&show_ids=&song=&song_exact=')
      .then(res => res.json());

      setState(data)
    }

    getAndSetAppData();
  }, []);

  const RadioCard = (props) => (

    <div className="App">
        <header className="App-header">
            <h1>Radio Play</h1>
            <div className="Search"><SearchBox placeholder="Enter Artist" handleChange={(e) => e.target.value}/>
            </div>
        </header>
      {
        state.results.map(artist => 
        <article>
          <ul><p id="artistName">{artist.artist}</p>
          <p>{artist.song}</p>
          </ul>
          </article>)
      }
    </div>
);
  return (
    <div>
      <RadioCard />
    </div>
    );
}

export default App;
