
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./home.css";
import { getItems } from "../api";

function Home() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [keyword, setKeyword] = useState("");

  async function loadItems(filters = {}) {
    try {
      setLoading(true);
      setError("");

      const data = await getItems({
        sort: "newest",
        limit: 5,
        ...filters,
      });

      setItems(data);
    } catch (err) {
      setError("Could not load recent reports.");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadItems();
  }, []);

  function handleSearch(event) {
    event.preventDefault();
    loadItems(keyword.trim() ? { keyword: keyword.trim() } : {});
  }

  function handleCategory(category) {
    loadItems({ category });
  }

  return (
    <div className="home">

      {/* Hero */}
      <section className="hero">
        <div className="hero-content">
          <span className="hero-label">WELCOME TO FINDIT</span>

          <h1>
            Lost Something?
            <br />
            <span>Let's Find It Together!</span>
          </h1>

          <p>
            FindIt is your university lost and found platform.
            Report lost belongings, discover found items, and
            reconnect with what matters to you.
          </p>

          <div className="hero-buttons">
            <Link to="/report" className="primary-button">
              Report Lost Item
            </Link>

            <Link to="/browse" className="secondary-button">
              Browse Items
            </Link>
          </div>

          <form className="search-bar" onSubmit={handleSearch}>
            <span className="search-icon">⌕</span>

            <input
              type="text"
              placeholder="What are you looking for?"
              value={keyword}
              onChange={(event) => setKeyword(event.target.value)}
            />

            <button type="submit">Search</button>
          </form>
        </div>
      </section>

      {/* Statistics */}
      <section className="statistics">
        <div className="stat-card">
          <span className="stat-icon">🔎</span>
          <h3>Easy Search</h3>
          <p>Find your missing belongings quickly.</p>
        </div>

        <div className="stat-card">
          <span className="stat-icon">📦</span>
          <h3>Lost & Found</h3>
          <p>Report items and browse available reports.</p>
        </div>

        <div className="stat-card">
          <span className="stat-icon">🤝</span>
          <h3>Reconnect</h3>
          <p>Help items find their way back to their owners.</p>
        </div>
      </section>

      {/* Categories */}
      <section className="categories">
        <div className="section-heading">
          <span>EXPLORE ITEMS</span>
          <h2>Browse Categories</h2>
          <p>Choose a category to find what you are looking for.</p>
        </div>

        <div className="category-container">

          <button
            className="category-card"
            onClick={() => handleCategory("Electronics")}
          >
            <span>💻</span>
            <h3>Electronics</h3>
          </button>

          <button
            className="category-card"
            onClick={() => handleCategory("Bags")}
          >
            <span>🎒</span>
            <h3>Bags</h3>
          </button>

          <button
            className="category-card"
            onClick={() => handleCategory("Accessories")}
          >
            <span>⌚</span>
            <h3>Accessories</h3>
          </button>

          <button
            className="category-card"
            onClick={() => handleCategory("Books")}
          >
            <span>📚</span>
            <h3>Books</h3>
          </button>

        </div>
      </section>

      {/* Recent Reports */}
      <section className="recent-items">
        <div className="section-heading">
          <span>RECENT ACTIVITY</span>
          <h2>Recent Lost & Found Reports</h2>
          <p>Check the latest items reported around campus.</p>
        </div>

        {loading && <p>Loading reports...</p>}

        {error && <p className="error-message">{error}</p>}

        {!loading && !error && items.length === 0 && (
          <p>No reports available yet.</p>
        )}

        {!loading && !error && (
          <div className="category-container">
            {items.map((item) => (
              <div className="item-card" key={item.id}>

                <span className={`item-type ${item.report_type}`}>
                  {item.report_type}
                </span>

                <h3>{item.title}</h3>

                <p><strong>Category:</strong> {item.category}</p>
                <p><strong>Color:</strong> {item.color || "Not specified"}</p>
                <p><strong>Location:</strong> {item.location}</p>
                <p><strong>Date:</strong> {item.event_date}</p>

              </div>
            ))}
          </div>
        )}

        <Link to="/browse" className="view-all-button">
          View All Items
        </Link>
      </section>

      {/* About */}
      <section className="about-section">
        <span>ABOUT FINDIT</span>
        <h2>Helping Students Find What They Lost</h2>
        <p>
          FindIt makes the lost and found process easier for
          university students. Report missing belongings,
          explore found items, and help your campus community.
        </p>
      </section>

    </div>
  );
}

export default Home;
