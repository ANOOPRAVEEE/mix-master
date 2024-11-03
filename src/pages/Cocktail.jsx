import axios from "axios";
import { useLoaderData, Link } from "react-router-dom";
import Wrapper from "../assets/wrappers/CocktailPage";
import { keyframes } from "styled-components";
import { useQuery } from "@tanstack/react-query";
const singleCocktailUrl =
  "https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=";


const singleCocktailQuery = (id) => {
  return {
    queryKey : ['cocktail',id],
    queryFn: async () => {
      const { data } = await axios.get(`${singleCocktailUrl}${id}`);
      return data;
    }
  }
}

export const loader = (queryClient) => async ({ params }) => {
  const { id } = params;
  // const { data } = await axios.get(`${singleCocktailUrl}${id}`);
  await queryClient.ensureQueryData( singleCocktailQuery(id) );
  return { id };
};

const Cocktail = () => {
  const { id } = useLoaderData();

  // if(!data) return <h2>Something went wrong!</h2>
  const {data} = useQuery( singleCocktailQuery(id) );

  const singeDrink = data.drinks[0];
  const {
    strDrink: name,
    strDrinkThumb: image,
    strAlcoholic: info,
    strGlass: glass,
    strInstructions: instructions,
    strCategory: category,
  } = singeDrink;

  const validIngredients = Object.keys(singeDrink)
    .filter(
      (key) => key.startsWith("strIngredient") && singeDrink[key] !== null
    )
    .map((key) => singeDrink[key]);

  return (
    <Wrapper>
      <header>
        <Link to="/" className="btn">
          back home
        </Link>
        <h3>{name}</h3>
      </header>

      <div className="drink">
        <img src={image} alt={name} className="img" />
        <div className="drink-info">
          <p>
            <span className="drink-data">name:</span>
            {name}
          </p>
          <p>
            <span className="drink-data">category:</span>
            {category}
          </p>
          <p>
            <span className="drink-data">info:</span>
            {info}
          </p>
          <p>
            <span className="drink-data">glass:</span>
            {glass}
          </p>
          <p>
            <span className="drink-data">Ingredients:</span>
            {validIngredients.join(", ")}
          </p>
          <p>
            <span className="drink-data">instructions:</span>
            {instructions}
          </p>
        </div>
      </div>
    </Wrapper>
  );
};

export default Cocktail;
