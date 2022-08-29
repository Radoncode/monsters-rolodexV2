import { useState, useEffect } from 'react';
import CardList from './components/card-list/card-list.component';
import SearchBox from './components/search-box/search-box.component';
import './App.css';

const App = () => {

    const [searchField,setSearchField] = useState('');
    const [monsters, setMonsters] = useState([]);
    const [monstersFiltered, setMonstersFiltered] = useState(monsters);

    useEffect(() => {
      fetch('https://jsonplaceholder.typicode.com/users')
      .then((response) => 
        response.json()
      )
      .then((users) => setMonsters(users))
    }, []);

    useEffect(() => {
      const newMonstersFiltered = monsters.filter((monster) => {
        return monster.name.toLocaleLowerCase().includes(searchField)
      });
      setMonstersFiltered(newMonstersFiltered);
    },[monsters, searchField]);

    const onSearchChange = (event) => {
      const searchFieldString = event.target.value.toLocaleLowerCase();
      setSearchField(searchFieldString);
      console.log('event fired')
    }

    return (
    <div className="App">
      <h1 className='app-title'>Monsters Rolodex</h1>
      <SearchBox 
          onChangeHandler={onSearchChange} 
          placeholder='search monsters' 
          className='monsters-search-box' 
      />
      <CardList monsters={monstersFiltered}/>
    </div>
    )
};

/* class  App extends Component {

  constructor() {
    super();

    this.state = {
      monsters: [],
      searchField: ''
    };
  }

  componentDidMount() {
    fetch('https://jsonplaceholder.typicode.com/users')
      .then((response) => 
        response.json()
      )
      .then((users) => this.setState(() => {
        return {monsters: users}
      }))
  };

  onSearchChange = (event) => {
    const searchField = event.target.value.toLocaleLowerCase();
    
    this.setState(() => {
      return {
        searchField
      }
    })
  }

  render() {

    const { monsters, searchField } = this.state;
    const { onSearchChange } = this;

    const monstersFiltered = monsters.filter((monster) => {
      return monster.name.toLocaleLowerCase().includes(searchField)
    });

    return (
    <div className="App">
      <h1 className='app-title'>Monsters Rolodex</h1>
      <SearchBox 
          onChangeHandler={onSearchChange} 
          placeholder='search monsters' 
          className='monsters-search-box' 
      />
      <CardList monsters={monstersFiltered}/>
    </div>
    );
  } 
} */

export default App;
