export default function Home() {
  return (
    <div className="dashboard">
      <aside className="sidebar">
        <div className="sidebar-brand">
          <span className="sidebar-brand-title">Aktie</span>
          <span className="sidebar-brand-badge">Pro</span>
        </div>
        <nav className="sidebar-nav">
          <a className="sidebar-nav-item sidebar-nav-item--active">Watchlist</a>
          <a className="sidebar-nav-item">Portfolio</a>
          <a className="sidebar-nav-item">News</a>
        </nav>
      </aside>

      <div className="dashboard-main">
        <header className="dashboard-header">
          <div>
            <h1 className="dashboard-header-title">Watchlist</h1>
            <p className="dashboard-header-subtitle">12 stocks tracked</p>
          </div>
        </header>

        <div className="dashboard-content">
          <div className="stock-grid">
            <article className="stock-card">
              <div className="stock-card-header">
                <div>
                  <div className="stock-card-ticker">AAPL</div>
                  <div className="stock-card-name">Apple Inc.</div>
                </div>
                <div className="stock-card-price-block">
                  <div className="stock-card-price">$198.42</div>
                  <span className="stock-card-change stock-card-change--up">+1.24%</span>
                </div>
              </div>
              <div className="stock-card-sparkline">{/* chart */}</div>
              <div className="stock-card-summary">
                <div className="stock-card-summary-label">AI · 2m ago</div>
                Strong momentum above SMA 50; volume rising on breakout.
              </div>
            </article>
          </div>
        </div>
      </div>
    </div>
  );
}
