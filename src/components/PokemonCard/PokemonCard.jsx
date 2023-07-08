import "./PokemonCard.scss";
import bg from "../../assets/bg-img.png";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const PokemonCard = ({ data }) => {
  return (
    <>
      {data !== undefined && (
        <motion.div
          whileInView={{ y: [30, 0], opacity: [0, 1] }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.4}}
          className="animate"
        >
          <Link
            to={`/pokemons/${data.species.name}`}
            className={`pokemon-card text-decoration-none ${data.types[0].type.name}`}
          >
            <img src={bg} alt="bg" className="pokemon__card-img" />
            <span className="pokemon-id">{`#00${data.id}`}</span>
            <div>
              <h3 className="mb-3 text-capitalize">{data.species.name}</h3>
              <div className="pokemon-info">
                {data?.types.map((t, i) => (
                  <span className="mb-2" key={i}>
                    {t?.type.name}
                  </span>
                ))}
              </div>
            </div>
            <div className="pokImg">
              <img
                src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${data.id}.svg`}
                alt="there's a pokemonImg"
              />
            </div>
          </Link>
        </motion.div>
      )}
    </>
  );
};

export default PokemonCard;
