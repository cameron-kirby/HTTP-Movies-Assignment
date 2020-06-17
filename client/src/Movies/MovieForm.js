import React, { useState, useEffect } from 'react'
import { useParams, useHistory } from "react-router-dom";
import axios from 'axios'

const initialItem = {
    title: '',
    director: '',
    metascore: 0,
    stars: [],
  };

const MovieForm = props => {
    const [movie, setMovie] = useState(initialItem);
    const { push } = useHistory();
    const { id } = useParams();

    useEffect(() => {
        axios
          .get(`http://localhost:5000/api/movies/${id}`)
          .then(res => {
            // res.data
            setMovie(res.data);
          })
          .catch(err => console.log(err));
      }, [id]);

    const handleChange = event => {
        event.persist();
        let value = event.target.value;
        if (event.target.name === 'metascore') {
            value = parseInt(value, 10);
        }
    
        setMovie({
            ...movie,
            [event.target.name]: value
        });
    };

    const handleSubmit = event => {
        event.preventDefault();
        axios
          .put(`http://localhost:5000/api/movies/${id}`, movie)
          .then(res => {
            // res.data
            props.getMovieList();
            // props.setRefresh(true);
            push(`/movies/${id}`);
          })
          .catch(error => console.log(error));
      };

    return(
        <div className="movie-form">
            <h2>Update Movie</h2>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    name="title"
                    onChange={handleChange}
                    placeholder="title"
                    value={movie.title}
                />
                <input
                    type="text"
                    name="director"
                    onChange={handleChange}
                    placeholder="director"
                    value={movie.director}
                />
                <input
                    type="number"
                    name="metascore"
                    onChange={handleChange}
                    placeholder="metascore"
                    value={movie.metascore}
                />
                <input
                    type="text"
                    name="stars"
                    onChange={handleChange}
                    placeholder="John Doe"
                    value={movie.stars}
                />
                <button>Update Movie</button>
            </form>
        </div>
    )
}

export default MovieForm