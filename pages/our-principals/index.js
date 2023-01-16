import Head from "next/head";
import AnimatedPage from "../../components/AnimatedPage/AnimatedPage";
import CardPrincipals from "../../components/CardPrincipals/CardPrincipals";
import styles from "./our-principals.module.css";

const data = [
  {
    src: "/assets/images/logo-disney-cruise-line.png",
    descBold:
      "The Disney Cruise Line fleet consists of the Disney Magic, Disney Wonder, Disney Dream and Disney Fantasy.",
    desc: "Each of our 4 ships features different designs and deck plans, as well as distinctive restaurants, entertainment, activities and pools on board to make every voyage a unique and memorable experience.",
  },
  {
    src: "/assets/images/logo-viking.png",
    descBold:
      "Viking Ocean Cruises boasts a fleet of new, all-veranda, state-of-the-art ocean ships. Each identical sister ship carries only 930 guests and is engineered at a scale that allows direct access into most ports.",
    desc: "The World's Leading Small Ship Cruise Line. Rated the #1 cruise line by Condé Nast Traveler readers.",
  },
  {
    src: "/assets/images/logo-virgin-voyages.png",
    descBold:
      "Where superyacht design and your dream destinations meet. Welcome to how Virgin does cruise ships.",
    desc: "With Richard Branson at the helm, Virgin Voyages is redefining what a luxury cruise ship means by combining premium elements from favorites on land with the freedom and simplicity of a life well lived on the open ocean. We’re thrilled to announce that we’ve been chosen as Cruise Critic’s Editor's Pick for Best New Cruise Ship in 2021. From “bringing new concepts to sea”, to “transforming not just a cruise line but also providing excitement for the industry overall” — we are so humbled and grateful for the love Scarlet’s receiving.",
  },
  {
    src: "/assets/images/logo-marella-cruises.png",
    descBold:
      "Marella Cruises (formerly Thomson Cruises) is a British cruise line operated by TUI UK, offering cruise holidays around Europe, the Caribbean, and Asia.",
    desc: "On 9 October 2017, TUI Group announced that Thomson Cruises would be rebranded in late October 2017 as Marella Cruises, with all of the existing Thomson fleet adopting the name change either from Thomson or TUI to Marella (except Thomson Spirit which will be renamed Spirit and Thomson Majesty which will be transferred to Celestyal Cruises). The line also announced that it would base TUI Discovery in Asia for the Winter season of 2018, with the ship being based out of Malaysia, the first in the line's history.",
  },
  {
    src: "/assets/images/logo-sea-chefs.png",
    descBold:
      "Our group of companies with the head office located in Switzerland is one of the cruise industry’s leading service providers worldwide; offering hotel, restaurant and crew management for both sea-going vessels and river cruise vessels.",
    desc: "Currently, we have about 8,000 employees on board of more than 50 ocean-going vessels and river cruise ships managed by us, plus 150 employees in our offices based in Basel and Zug in Switzerland, Limassol in Cyprus, as well as, Hamburg and Berlin in Germany.",
  },
  {
    src: "/assets/images/logo-pro-cruise.png",
    descBold:
      "Our ships have gone global, quite literally. Sailing North, South, East and West across the oceans and seas, we present a tempting array of options both close to home and far, far away.",
    desc: "",
  },
  {
    src: "/assets/images/logo-cunard.png",
    descBold:
      "For over a century and a half, the iconic ships of Cunard have been defining sophisticated ocean travel. They have always been The Most Famous Ocean Liners in the World®.",
    desc: "From fabled vessels of the past to her present royal court — Queen Mary 2, Queen Victoria and Queen Elizabeth — Cunard has carried guests across the great oceans and to the far points of the globe in unparalleled style.",
  },
  {
    src: "/assets/images/logo-the-world.png",
    descBold:
      "The largest private residential ship on the planet, The World is home to only 165 Residences.",
    desc: "Residents & Guests spend extensive time exploring the most exotic and well-traveled destinations, and return onboard to a lifestyle that exists nowhere else on earth. ",
  },
];

const OurPrincipals = () => {
  return (
    <div className={styles.container}>
      <Head>
        <title>Our Principals - PT Ratu Oceania Raya</title>
        <meta
          name="description"
          content="We are the preeminent provider in Indonesia of hotel and marine personnel to international cruise lines, commercial shipping and hotels worldwide."
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <AnimatedPage>
        <div className={styles.titleContainer}>
          <div className={styles.title}>
            <span>our</span>
            <span>principals</span>
          </div>
          <div className={styles.subtitle}>
            <span>We are proud to be registered and contracted</span>
            <span>
              with the following cruise line and hospitality companies
            </span>
          </div>
        </div>
        <div className={styles.principalsContainer}>
          {data.map((item, i) => (
            <CardPrincipals key={i} item={item} />
          ))}
        </div>
      </AnimatedPage>
    </div>
  );
};

export default OurPrincipals;
