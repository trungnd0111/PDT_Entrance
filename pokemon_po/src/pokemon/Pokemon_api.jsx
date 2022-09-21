import Axios from 'axios';
import React, { useState } from 'react'


export default function Pokemon_api() {
  //sử dụng Hooks useState để set lại api khi tìm kiếm tên pokemon
  const [pokemonName, setPokemonName] = useState("");
    //sử dụng Hooks useState để set lại và lưu thuộc tính của pokemon khi tìm kiếm
  const [pokemon, setPokemon] = useState({
    name: "",
    height: "",
    weight: "",
    type: "",
    imgFront:"",
    imgBack:""
  });
  //Call API theo tên pokemon cần tìm kiếm, Axios sử dụng phương thức GET để lấy data về
  const searchingPokemon = () => {
    Axios.get(`https://pokeapi.co/api/v2/pokemon/${pokemonName}`).then((result) => {
      //Có data cần set lại state để render giao diện
      setPokemon(
        {
          //Phân tích lấy các dữ liệu từ data
          name: pokemonName, 
          height:result.data.height,
          weight: result.data.weight,
          type: result.data.types[0].type.name,
          imgFront:result.data.sprites.front_default,
          imgBack:result.data.sprites.back_default
        }
      )
      console.log(pokemon)
    })
  }
  return (
    <div>
      <div className='searchPokemon'>
        <input type="text" onChange={(event) => {
          //set state api để tìm kiếm chính là giá trị nhập vào
          setPokemonName(event.target.value);
        }} />
        <button onClick={searchingPokemon}>Tìm theo tên pokemon</button>
      </div>
      <div className='showCasePokemon'>
        <h1>Pokemon !!</h1>
        <div className='pokemonStatus'>
          <p>Tên pokemon: {pokemon.name}</p>
          <p>Chiều cao: {pokemon.height}</p>
          <p>Cân nặng: {pokemon.weight}</p>
          <p>Hệ: {pokemon.type}</p>
          <img src={pokemon.imgFront} alt="front" />
          <img src={pokemon.imgBack} alt="back" />
        </div>
      </div>
    </div>
  )
}
