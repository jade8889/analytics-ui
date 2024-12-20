import Link from "next/link";
import Footer from "../components/Navigation/footer";
import LanguageProvider from "../contexts/LanguageContext";

export default function NotFound() {
  return (
    <LanguageProvider>
      <div className="content__box">
        <div className="error-page">
          <div className="error_text">
            page
            <br />
            404
          </div>
          <div className="left_text">
            Sorry, this page
            <br /> does not exist.
            <br />
            <Link href="/">Go to main page</Link>
          </div>
        </div>
        <Footer />
      </div>
    </LanguageProvider>
  );
}
