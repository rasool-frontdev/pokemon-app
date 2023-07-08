import "./DescPokemon.scss";
import { motion } from "framer-motion";
import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { West } from "@mui/icons-material";
import FullWidthTabs from "./DescPokemonTabs";
import PreLoader from "../../components/PreLoader/PreLoader";

const DescPokemon = () => {
    const { name } = useParams();
    const [pokemonDetail, setPokemonDetail] = useState(null);

    useEffect(() => {
        axios
            .get(`https://pokeapi.co/api/v2/pokemon/${name}`)
            .then((res) => setPokemonDetail(res))
            .catch((err) => console.log(err));
    }, [name]);

    return (
        <>
            {pokemonDetail !== null ? (
                <section className="app__pokemon">
                    <div
                        className={`container-fluid py-5 ${pokemonDetail.data?.types[0].type.name}`}>
                        <div className="container">
                            <Link
                                to="/pokemons"
                                className="text-white text-decoration-none">
                                <West />
                            </Link>
                            <div className="row justify-content-between align-items-center mt-5">
                                <div className="col-md-5">
                                    <h1 className="pok-name">
                                        {pokemonDetail.data?.name}
                                    </h1>
                                    <div className="d-flex align-items-center">
                                        {pokemonDetail.data?.types.map(
                                            (t, i) => (
                                                <span
                                                    key={i}
                                                    className="pok__types-name">
                                                    {t.type.name}
                                                </span>
                                            )
                                        )}
                                    </div>
                                </div>
                                <div className="col-md-2">
                                    <span className="pok-id">{`#00${pokemonDetail.data?.id}`}</span>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col">
                                    <motion.div
                                        whileInView={{ scale: [0.7, 1] }}
                                        className="app__pokemon-img">
                                        <img
                                            src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${pokemonDetail.data?.id}.svg`}
                                            alt="pokemon"
                                        />
                                    </motion.div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="container-fluid bg-white pokemon-infos">
                        <div className="container">
                            <FullWidthTabs
                                about={pokemonDetail.data?.abilities}
                                stats={pokemonDetail.data?.stats}
                            />
                        </div>
                    </div>
                </section>
            ) : (
                <PreLoader />
            )}
        </>
    );
};

export default DescPokemon;
