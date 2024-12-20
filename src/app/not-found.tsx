import Link from "next/link";

export default function NotFound() {
  return (
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
    </div>
  );
}
