import { Link } from 'react-router-dom'

export default function HomePage() {
  return (
    <div className="page home-page">
      <h1>To The Races</h1>
      <p className="tagline">Subscribe to premium horse racing content</p>
      
      <div className="hero">
        <div className="hero-content">
          <h2>Get Exclusive Access</h2>
          <p>Choose from our subscription plans for live race feeds, expert predictions, and more!</p>
          <Link to="/plans" className="cta-button">View Plans</Link>
        </div>
      </div>
      
      <div className="features">
        <div className="feature-card">
          <h3>Live Race Feeds</h3>
          <p>Stream races from around the world in real-time</p>
        </div>
        <div className="feature-card">
          <h3>Expert Tips</h3>
          <p>Get insider predictions from racing professionals</p>
        </div>
        <div className="feature-card">
          <h3>Exclusive Stats</h3>
          <p>Access premium analytics and horse performance data</p>
        </div>
      </div>
    </div>
  )
}
