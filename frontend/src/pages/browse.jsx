
import { useEffect, useState } from "react";
import { getItems } from "../api";
import "./browse.css";

function Browse() {
  const [items, setItems] = useState([]);
  const [keyword, setKeyword] = useState("");
  const [reportType, setReportType] = useState("");
  const [category, setCategory] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  async function loadItems(filters = {}) {
    try {
      setLoading(true);
      setError("");

      const data = await getItems({
        sort: "newest",
        ...filters,
      });

      setItems(data);
    } catch (err) {
      setError("Could not load items. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadItems();
  }, []);

  function handleSearch(event) {
    event.preventDefault();

    loadItems({
      keyword: keyword.trim() || undefined,
      report_type: reportType || undefined,
      category: category || undefined,
    });
  }

  function handleReset() {
    setKeyword("");
    setReportType("");
    setCategory("");
    loadItems();
  }

  return (
    <div className="browse-page">

      <div className="browse-header">
        <h1>Browse Lost & Found Items</h1>
        <p>Search and discover items reported around your campus.</p>
      </div>

      <form className="browse-filters" onSubmit={handleSearch}>
        <input
          type="text"
          placeholder="Search for an item..."
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
        />

        <select
          value={reportType}
          onChange={(e) => setReportType(e.target.value)}
        >
          <option value="">All Types</option>
          <option value="lost">Lost</option>
          <option value="found">Found</option>
        </select>

        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        >
          <option value="">All Categories</option>
          <option value="Electronics">Electronics</option>
          <option value="Bags">Bags</option>
          <option value="Accessories">Accessories</option>
          <option value="Books">Books</option>
        </select>

        <button type="submit">Search</button>
        <button type="button" className="reset-btn" onClick={handleReset}>
          Reset
        </button>
      </form>

      <div className="browse-results">
        {loading && <p>Loading items...</p>}

        {error && <p className="browse-error">{error}</p>}

        {!loading && !error && items.length === 0 && (
          <p>No items found.</p>
        )}

        {!loading && !error && (
          <div className="browse-grid">
            {items.map((item) => (
              <div className="browse-card" key={item.id}>
                <span className={`browse-type ${item.report_type}`}>
                  {item.report_type}
                </span>

                <h3>{item.title}</h3>

                <p><strong>Category:</strong> {item.category}</p>
                <p><strong>Color:</strong> {item.color || "Not specified"}</p>
                <p><strong>Location:</strong> {item.location}</p>
                <p><strong>Date:</strong> {item.event_date}</p>
                <p className="item-description">{item.description}</p>
              </div>
            ))}
          </div>
        )}
      </div>

    </div>
  );
}

export default Browse;
