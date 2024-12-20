import Link from "next/link";

export default function Footer() {
  return (
    <footer>
      <div className="wrap">
        <div className="top">
          <Link href="/" className="logo-white"></Link>
          <div className="description mobile_hide">
            Permisionless on-chain fair games on Base.
          </div>
          <div className="social clrfx w-full md:w-auto">
            <a
              href="https://twitter.com/jaderollxyz"
              target="_blank"
              rel="nofollow"
              className="twitter"
            ></a>
            <a
              href="https://discord.gg/CHxRSecbCS"
              target="_blank"
              rel="nofollow"
              className="discord"
            ></a>
            <a
              href="https://t.me/Jaderoll"
              target="_blank"
              rel="nofollow"
              className="telegram"
            ></a>
          </div>
        </div>
        <div className="centered pc_hide">
          <div className="description">
            Permisionless on-chain fair games on Base.
          </div>
        </div>
        <div className="bot clrfx">
          <div className="description left">© 2023 JadeRoll</div>
          <div className="right">
            <a href="mailto:contact@jaderoll.xyz" className="right">
              contact@jade.com
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
