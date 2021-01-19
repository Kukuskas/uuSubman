import UU5 from "uu5g04";

const TAG = "UU5.Tutorial.";

export default {
  TAG,
  Css: UU5.Common.Css.createCssModule(
    TAG.replace(/\.$/, "")
      .toLowerCase()
      .replace(/\./g, "-")
      .replace(/[^a-z-]/g, ""),
    process.env.NAME + "/" + process.env.OUTPUT_NAME + "@" + process.env.VERSION // this helps preserve proper order of styles among loaded libraries
  ),
  Profiles: {
    AUTHORITIES: "Authorities",
    EXECUTIVES: "Executives",
    ADMINISTRATIONS: "Administrations",
  },
};
