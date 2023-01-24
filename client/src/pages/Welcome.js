import { Logo } from "../components";
import hero from "../assets/images/hero-landing.svg";
import StyledComp from "../assets/wrappers/Welcome";
import Typewriter from "typewriter-effect";
import { Link } from "react-router-dom";
import CookieConsent from "react-cookie-consent";

const Welcome = () => {
  return (
    <StyledComp>
      <nav>
        <Logo />
      </nav>
      <div className="container page">
        <div className="info">
          <h1>
            Mangler du
            <span>
              <Typewriter
                options={{
                  strings: ["Retning", "Kontrol", "Styring", "Hjælp"],
                  autoStart: true,
                  loop: true,
                  cursor: "?",
                  cursorClassName: "typewriter-cursor",
                }}
              />
            </span>
          </h1>
          <p>
            Få overblik og skab orden med Kontrol-webapplikation. Tro det eller
            ej, så kan den sagtens bruges til andet end blot DIS-eksamen. Det er
            aldrig sjovt at være ude af orientering.
          </p>
          <Link to="/login" className="btn btn-hero">
            Login / Register
          </Link>
        </div>
        <img src={hero} alt="Navigation" className="img main-img" />
      </div>
      <CookieConsent
      buttonText="Accepter cookies"
      overlay={true}
      >
        Hjemmesiden benytter sig af cookies, for at forbedre din oplevelse. Ved at benytte hjemmesiden accepterer du brugen af cookies.
      </CookieConsent>
    </StyledComp>
  );
};

export default Welcome;
