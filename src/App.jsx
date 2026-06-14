import { useEffect, useState } from "react";
import Navbar from "./components/Navbar";
import NewsCard from "./components/NewsCard";
import Footer from "./components/Footer";
import "./App.css";


function App() {
  const [articles, setArticles] = useState([]);
  const [search, setSearch] = useState("");
  const [region, setRegion] = useState("global");
  const [category, setCategory] = useState("");

  const fetchNews = (query = "") => {
    let url = `https://newsdata.io/api/1/latest?apikey=pub_85a29546d75649909ea921762a35c841&language=en`;

    if (query.trim() !== "") {
      url += `&q=${query}`;
    }

    if (region !== "global") {
      url += `&country=${region}`;
    }

    if (category !== "") {
      url += `&category=${category}`;
    }

    .then((data) => {
  console.log(data);

  const filteredArticles = (data.results || [])
    .filter(
      (article) =>
        article.title &&
        article.description &&
        article.description.trim() !== ""
    )
    .filter(
      (article, index, self) =>
        index ===
        self.findIndex(
          (a) =>
            a.title === article.title ||
            a.link === article.link
        )
    );

  setArticles(filteredArticles);
})

  setArticles(filteredArticles);
})
      .catch((error) => console.log(error));
  };

  useEffect(() => {
    fetchNews(search);
  }, [region, category]);

  return (
    <>
      <Navbar />

      {/* Hero Section */}
      <section className="hero">
        <div className="hero-badge">
          📰 Live Global News Updates
        </div>

        <h1>
  Stay Updated with
  <br />
  <span>Global News</span>
</h1>

        <p>
          Read breaking news, technology, business, sports and health
          updates from around the world.
        </p>
      </section>

      {/* Categories */}
      <div className="category-container">
  <button
    className={category === "" ? "active-category" : ""}
    onClick={() => setCategory("")}
  >
    Home
  </button>

  <button
    className={category === "technology" ? "active-category" : ""}
    onClick={() => setCategory("technology")}
  >
    Technology
  </button>

  <button
    className={category === "business" ? "active-category" : ""}
    onClick={() => setCategory("business")}
  >
    Business
  </button>

  <button
    className={category === "sports" ? "active-category" : ""}
    onClick={() => setCategory("sports")}
  >
    Sports
  </button>

  <button
    className={category === "health" ? "active-category" : ""}
    onClick={() => setCategory("health")}
  >
    Health
  </button>
</div>
      {/* Search */}
      <div className="search-container">
        <select
          className="region-select"
          value={region}
          onChange={(e) => setRegion(e.target.value)}
        >
          <option value="global">🌍 Global</option>
          <option value="in">🇮🇳 India</option>
          <option value="us">🇺🇸 USA</option>
          <option value="gb">🇬🇧 UK</option>
        </select>

        <input
          type="text"
          placeholder="Search AI, Cricket, India, Tesla..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <button onClick={() => fetchNews(search)}>
          🔍 Search
        </button>
      </div>
           

      {/* News Cards */}
      <div className="news-container">
        {articles.length > 0 ? (
          articles.map((article, index) => (
            <NewsCard
              key={index}
              title={article.title}
              description={article.description}
              image={
                article.image_url ||
                "https://images.unsplash.com/photo-1504711434969-e33886168f5c"
              }
              link={article.link}
            />
          ))
        ) : (
          <h2>No News Found</h2>
        )}
      </div>
       <Footer />
    </>
  );
}

export default App;