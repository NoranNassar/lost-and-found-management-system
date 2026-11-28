
import "./matches.css";

const sampleMatches = [
  {
    id: 1,
    lostItem: "Black Wallet",
    foundItem: "Black Leather Wallet",
    score: 90,
    status: "High Potential Match",
    type: "high",
  },
  {
    id: 2,
    lostItem: "Blue Water Bottle",
    foundItem: "Blue Bottle",
    score: 65,
    status: "Possible Match",
    type: "possible",
  },
];

function Matches() {
  return (
    <div className="matches-page">
      <div className="matches-header">
        <span>FINDIT MATCHING SYSTEM</span>
        <h1>Suggested Matches</h1>
        <p>
          We found some items that may match your lost or found belongings.
        </p>
      </div>

      <div className="matches-container">
        {sampleMatches.map((match) => (
          <div className="match-card" key={match.id}>
            <div className="match-card-header">
              <h3>Match #{match.id}</h3>
              <span className={`match-status ${match.type}`}>
                {match.status}
              </span>
            </div>

            <div className="match-items">
              <div className="match-item">
                <span>LOST ITEM</span>
                <h3>{match.lostItem}</h3>
              </div>

              <div className="match-arrow">↔</div>

              <div className="match-item">
                <span>FOUND ITEM</span>
                <h3>{match.foundItem}</h3>
              </div>
            </div>

            <div className="match-score">
              <div className="score-info">
                <span>Match Score</span>
                <strong>{match.score}%</strong>
              </div>

              <div className="score-bar">
                <div
                  className="score-fill"
                  style={{ width: `${match.score}%` }}
                ></div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Matches;
