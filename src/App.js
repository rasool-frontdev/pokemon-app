import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Landing, DescPokemon, AllPokemons } from "./pages";

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Landing />} />
                <Route path="/pokemons" element={<AllPokemons />} />
                <Route path="/pokemons/:name" element={<DescPokemon />} />
            </Routes>
        </Router>
    );
}

export default App;
