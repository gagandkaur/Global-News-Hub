function NewsCard({ title, description, image, link }) {
  return (
    <div className="news-card">
      <img src={image} alt="news" />

      <h3>{title}</h3>

      <p>{description}</p>

      <a href={link} target="_blank" rel="noreferrer">
        <button>Read More</button>
      </a>
    </div>
  );
}

export default NewsCard;