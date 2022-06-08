import Eng from "./langEn";
import Rus from "./langRu";
import store from "../../store";

const locale = (key: keyof typeof Rus | keyof typeof Eng) => {
  const actLang = store.getState().language;

  switch (actLang) {
    case "Rus":
      return Rus[key] || "";
    case "Eng":
      return Eng[key] || "";
  }
};

export default locale;
