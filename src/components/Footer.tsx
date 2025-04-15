const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-light text-dark mt-5 pt-4 border-top">
      <div className="container">
        <div className="row justify-content-center text-sm">
          <div className="col-md-5 mb-3">
            <h6 className="text-uppercase">Contact</h6>
            <ul className="list-unstyled small">
              <li>Email: JesperLindberg92@protonmail.com</li>
              <li>Telefon: 070 78 77 420</li>
            </ul>
          </div>

          <div className="col-md-5 mb-3">
            <h6 className="text-uppercase">Links</h6>
            <ul className="list-unstyled small footer-links">
              <li>
                <a href="https://github.com/Jillypuff">Github</a>
              </li>
              <li>
                <a href="https://www.linkedin.com/in/jesper-lindberg-035593338/">
                  Linked in
                </a>
              </li>
            </ul>
          </div>
        </div>

        <hr />

        <div className="text-center pb-3 text-muted small">
          © {currentYear} Jesper Lindberg. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
