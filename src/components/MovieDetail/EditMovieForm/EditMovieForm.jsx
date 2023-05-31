import { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom'
import { updateMovieRequest } from '../../../utilities/movies-api';

export default function EditMovieForm({movie, setMovie, setEditFormIsOpen}){
    const navigate = useNavigate();
    const titleRef = useRef(movie.title)
    const releaseYearRef = useRef(movie.releaseYear)
    const ratingRef = useRef(movie.rating)
    const nowShowingRef = useRef(movie.nowShowing)
    const [error, setError] = useState('')
    async function handleSubmit(e){
        e.preventDefault()
        const updatedMovie = {
            title: titleRef.current.value,
            releaseYear: releaseYearRef.current.value,
            rating: ratingRef.current.value,
            nowShowing: nowShowingRef.current.checked
        }
        try{
            const newMovie = await updateMovieRequest(movie._id, updatedMovie)
            setMovie(newMovie)
            setEditFormIsOpen(false)
        }catch(err){
            setError("Bad Update, Man")
        }
    }
    return(
        <>
        <h3>edit</h3>
        { error && <p>{JSON.stringify(error)}</p>}
            <form onSubmit={handleSubmit}>
                <label htmlFor="title">Title</label>
                <input type="text" id="title" ref={titleRef} defaultValue={movie.title}/>
                <label htmlFor="releaseYear">Release Year</label>
                <input type="number" id="releaseYear" ref={releaseYearRef} defaultValue={movie.releaseYear}/>
                <label htmlFor="rating">Rating</label>
                <select name="rating" id="rating" ref={ratingRef} defaultValue={movie.rating}>
                    <option value="PG13">PG-13</option>
                    <option value="R">R</option>
                </select>
                <label htmlFor="nowShowing">Now Showing?</label>
                <input type="checkbox" id="nowShowing" defaultChecked={movie.nowShowing} ref={nowShowingRef}/>
                <button>Edit the Movie</button>
            </form>
            </>
    )
}