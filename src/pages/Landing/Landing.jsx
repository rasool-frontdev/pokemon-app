import "./Landing.scss";
import { InputBase, Paper, CircularProgress } from "@mui/material";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import SubdirectoryArrowRightIcon from "@mui/icons-material/SubdirectoryArrowRight";
import { Search } from "@mui/icons-material";
import { IconButton } from "@mui/material";
import { Link } from "react-router-dom";
import backImg from "../../assets/bg-img.png";
import axios from "axios";
import { useEffect, useState } from "react";
import PokemonCard from "../../components/PokemonCard/PokemonCard";

const Landing = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [pokemon, setPokemon] = useState("");
    const [pokemonDetail, setPokemonDetail] = useState({});

    const fetchData = (e) => {
        e.preventDefault();
        if (pokemon) {
            axios
                .get(`https://pokeapi.co/api/v2/pokemon/${pokemon}`)
                .then((res) => setPokemonDetail(res))
                .catch(() => setPokemonDetail({ err: "Pakemon Not Found" }));
            setIsLoading(false);
        }
    };

    useEffect(() => {
        setIsLoading(true);
    }, [pokemonDetail]);

    return (
        <section className="app__landing">
            <img src={backImg} alt="backImg" className="header-bg" />
            <div className="container">
                <h1 className="text-center mb-4 header-title">
                    What kind of Pokemon are you looking for?
                </h1>
                <Paper
                    component="form"
                    onSubmit={fetchData}
                    sx={{
                        display: "flex",
                        alignItems: "center",
                        width: 420,
                        boxShadow: "none",
                        margin: "0 auto",
                    }}>
                    <IconButton
                        type="submit"
                        sx={{
                            position: "relative",
                            left: "0",
                            zIndex: "3",
                        }}
                        aria-label="menu">
                        <Search />
                    </IconButton>
                    <InputBase
                        sx={{
                            padding: "4px 8px 8px 1.5rem",
                            flex: 1,
                            background: "#fff",
                            borderRadius: "10px",
                        }}
                        placeholder="Search pokemons"
                        inputProps={{ "aria-label": "search google maps" }}
                        onChange={(e) => setPokemon(e.target.value)}
                    />
                    <NavigateNextIcon />
                </Paper>
                <div className="d-flex justify-content-center mt-4 mb-5">
                    <div className="mx-3">
                        <Link to="/pokemons" className="landing-links link-1">
                            <SubdirectoryArrowRightIcon className="arrow-right" />
                            <span>Pokedox</span>
                            <img
                                src={backImg}
                                alt="backImg"
                                className="landing-bg"
                            />
                        </Link>
                    </div>
                </div>
                <div className="">
                    {!isLoading ? (
                        <CircularProgress
                            size={68}
                            sx={{
                                display: "block",
                                margin: "0 auto",
                            }}
                        />
                    ) : (
                        <>
                            <h1 className="text-center">
                                {pokemonDetail?.err}
                            </h1>
                            <PokemonCard data={pokemonDetail?.data} />
                        </>
                    )}
                </div>
            </div>
        </section>
    );
};

export default Landing;
