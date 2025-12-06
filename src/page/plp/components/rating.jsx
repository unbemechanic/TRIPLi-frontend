export const RatingStars = ({ rating }) => {
  // Ensure rating is a number between 0 and 5
  const stars = Math.max(0, Math.min(5, Math.round(rating)));
  return (
    <span className="rating-stars-default">
      {Array.from({ length: stars }).map((_, i) => (
        <span key={i}>★</span>
      ))}
      {Array.from({ length: 5 - stars }).map((_, i) => (
        <span key={i + stars} style={{ color: "#ccc" }}>
          ★
        </span>
      ))}
    </span>
  );
};
