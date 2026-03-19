import "./Footer.css";

function Footer() {
  return (
    <footer className="site-footer">
      <div className="container">
        <div className="row gy-4">
          {/* Brand */}
          <div className="col-12 col-md-3">
            <h3 className="footer-title">Second-Shelf</h3>
            <p className="footer-text">
              Buy, sell, and review used books from the community.
            </p>
          </div>

          {/* Authors */}
          <div className="col-6 col-md-3">
            <h4 className="footer-heading">Authors</h4>
            <p className="footer-text">Allison Avery</p>
            <p className="footer-text">David Ahn</p>
          </div>
        </div>

        <div className="footer-bottom text-center mt-4 pt-3 border-top">
          <p className="mb-0">
            © {new Date().getFullYear()} Second-Shelf. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
