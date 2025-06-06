import { Link } from 'react-router-dom';


const AuthRedirectLink = ({ text, linkText, to }) => {
  return (
    <div className="container-link">
      <p>{text}</p>
      <Link to={to} className="link">
        {linkText}
      </Link>
    </div>
  );
};

export default AuthRedirectLink;