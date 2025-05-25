import { Movie } from '../data/movies';

interface RowProps {
  title: string;
  movies: Movie[];
}

const Row = ({ title, movies }: RowProps) => {
  return (
    <div className="row">
      <h2>{title}</h2>
      <div className="row-images">
        {movies.map((movie) => (
          <div key={movie.id} style={{ textAlign: 'center' }}>
            <img
              src={movie.image}
              alt={movie.title}
              style={{ width: '150px', height: '225px', borderRadius: '8px' }}
            />
            <p style={{ marginTop: '0.5rem' }}>{movie.title}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Row;
