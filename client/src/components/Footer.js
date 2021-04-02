const Footer = () => {
    return (
        <footer className="footer">
        <div className="footer-header">Connect with me on Social media</div>
        <ul className="list-non-bullet ">
          <li className="list-item-inline social">
            <a className="link" href="https://github.com/asmitzz">
              <img
                alt="social-media"
                loading="lazy"
                src="https://img.icons8.com/fluent/50/000000/github.png"
              />
            </a>
          </li>
          <li className="list-item-inline social">
            <a className="link" href="https://www.instagram.com/smit_asmit008/">
              <img
                alt="social-media"
                src="https://img.icons8.com/fluent/48/000000/instagram-new.png"
              />
            </a>
          </li>
          <li className="list-item-inline social">
            <a className="link" href="https://twitter.com/ASMITSHRIVASTA9">
              <img
                alt="social-media"
                src="https://img.icons8.com/fluent/48/000000/twitter.png"
              />
            </a>
          </li>
          <li className="list-item-inline social">
            <a
              className="link"
              href="https://www.linkedin.com/in/asmit-shrivastava-3b94a3189/"
            >
              <img
                alt="social-media"
                src="https://img.icons8.com/fluent/48/000000/linkedin-circled.png"
              />
            </a>
          </li>
        </ul>
      </footer>
    );
};

export default Footer;
