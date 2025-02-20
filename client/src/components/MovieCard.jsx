import "../styles/MovieCard.css";

export default function MovieCard(props) {
    return (
        <div className="movie-card">
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
