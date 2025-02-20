import "../styles/MovieCard.css";

export default function MovieCard(props) {
    return (
        <div className="movie-card">
            <div className="movie-poster">
                <img src={props.image} alt={props.title} />
            </div>
            <div className="movie-details">
                <h4>{props.title}</h4>
                <p>{props.release}</p>
            </div>
        </div>
    );
}
