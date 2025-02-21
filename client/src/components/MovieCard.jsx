import "../styles/MovieCard.css";
import { useNavigate } from "react-router-dom";

export default function MovieCard(props) {
    const navigate = useNavigate();

    const handleClick = () => {
        navigate(`/movie-details/${props.movieid}`);
    };

    return (
        <div className="movie-card" onClick={handleClick}>
            <div className="movie-poster">
                <img src={props.image} alt={props.title} />
            </div>
            <div className="movie-details">
                <h4>
                    {props.title} (
                    <span style={{ color: "#bababa" }}>{props.release}</span>)
                </h4>
            </div>
        </div>
    );
}
