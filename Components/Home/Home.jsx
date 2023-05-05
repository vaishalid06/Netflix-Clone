import React, { useEffect, useState } from "react";
import "./Home.scss";
import axios from "axios";
import { Link } from "react-router-dom";
import {BiPlay} from 'react-icons/bi';
import {AiOutlinePlus} from 'react-icons/ai'

const apiKey ="b205121aa415bcb8ebf4ddf83cfecd14";
const url = "https://api.themoviedb.org/3";
const imgUrl="https://image.tmdb.org/t/p/original"
const upcoming = "upcoming";
const nowPlaying="now_playing";
const popular="popular";
const topRated="top_rated";

const Card = ({ img }) => <img className="card" src={img} alt="cover" />;

const Row = ({title,arr = []})=> (//arr is a default parameter,img is obj,link is property
      
  <div className="row">
    <h2>{title}</h2>
    <div>
      {arr.map((item,index ) => (//map first ele get access,then with img access property
          <Card key={index} img={`${imgUrl}/${item.poster_path}`} />
        ))}
    </div>
  </div>
);

const Home = () => {
  const [upcomingMovies, setUpcomingMovies]=useState([]);
  const [nowPlayingMovies, setNowPlayingMovies]=useState([]);
  const [popularMovies, setPopularMovies]=useState([]);
  const [topRatedMovies, setTopRatedMovies]=useState([]);
  const [genre, setGenre]=useState([]);
  //we use axios in useEffect hook
  //when Home component get load or mount ,useEffect get called //Home component get load that time data get fetched
  useEffect(() => {
    //async function -> we dont know that what time takes to api reduest,we want to peforme this asyanchronacly
      //here we are using get method
      //in api there are 4 methods-> get, post , put , delete
      //get ->to read or access the data
      //post ->to create
      //put ->to update
      //delete ->to delete
      //store in data[destrcturing]
    const fetchUpcoming = async () => {
      const { data: {results} } = await axios.get(`${url}/movie/${upcoming}?api_key=${apiKey}`); //https://api.themoviedb.org/3/upcoming
      setUpcomingMovies(results);//pagination->&page=2->fetch 2 page of movies,new movies
    };

    const fetchNowplaying = async () => {
      const { data: {results} } = await axios.get(`${url}/movie/${nowPlaying}?api_key=${apiKey}`); //https://api.themoviedb.org/3/upcoming
      setNowPlayingMovies(results);
    };

    const fetchPopular = async () => {
      const { data: {results} } = await axios.get(`${url}/movie/${popular}?api_key=${apiKey}`); //https://api.themoviedb.org/3/upcoming
      setPopularMovies(results);
    };

    const fetchToprated = async () => {
      const { data: {results} } = await axios.get(`${url}/movie/${topRated}?api_key=${apiKey}`); //https://api.themoviedb.org/3/upcoming
      setTopRatedMovies(results);
    };

    const getAllGenre = async () => {
      const  { data: {genres} } = await axios.get(`${url}/genre/movie/list?api_key=${apiKey}`);
      setGenre(genres);
      console.log(genres);
  };

    getAllGenre();

    fetchUpcoming();
    fetchNowplaying();
    fetchPopular();
    fetchToprated();
  }, []);

  return (
    <section className="home">
{/* taking img from down popularMovies[0] ->img at 0th index of popularMovies //upcomingMovies,nowPlayingMovies etc..*/}
              <div  className="banner"
                style={{
                    backgroundImage: popularMovies[4]
                        ? `url(${`${imgUrl}/${popularMovies[4].poster_path}`})`: "rgb(16, 16, 16)",
                }}
            >
              {/* taking original_title && overview from popularMovies[0] */}
                {popularMovies[4] && <h1>{popularMovies[4].original_title}</h1>}
                {popularMovies[4] && <p>{popularMovies[4].overview}</p>}

                <div>
                    <button><BiPlay /> Play  </button>
                    <button>My List <AiOutlinePlus /> </button>
                </div>
            </div>

      <Row title={"Upcoming"} arr={upcomingMovies} />
      <Row title={"Now Playing"} arr={nowPlayingMovies} />
      <Row title={"Popular"} arr={popularMovies} />
      <Row title={"Top Rated"} arr={topRatedMovies} />

      
      <div className="genreBox">
                {genre.map((item) => (
                    <Link key={item.id} to={`/genre/${item.id}`}>
                        {item.name}
                    </Link>
                ))}
            </div>
    </section>
  );
};

export default Home;
