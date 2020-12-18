import UU5 from "uu5g04";

export const About = {
  about: {
    cs: "Demo aplikace je šablona pro vývoj nových aplikací.",
    en: "Demo application is a template for developing new applications.",
  },
  licence: {
    termsOfUse: "https://unicorn.com/tou/your_product",
    organisation: {
      cs: {
        name: "Unicorn a.s.",
        uri: "https://www.unicorn.com/",
      },
      en: {
        name: "Unicorn a.s.",
        uri: "https://www.unicorn.com/",
      },
    },
    authorities: {
      cs: [
        {
          name: "Name Surname",
          uri: "https://www.unicorn.com/",
        },
      ],
      en: [
        {
          name: "Name Surname",
          uri: "https://www.unicorn.com/",
        },
      ],
    },
  },
  leadingAuthors: [
    {
      name: "Alexandr Kozlov",
      uuIdentity: "25-1622-1",
      role: {
        en: "Business architect and main frontend developer.",
      },
    },
    {
      name: "Tatsiana Sorokina",
      uuIdentity: "24-9525-1",
      role: {
        en: "Beauty of a team, serious business architect and developer.",
      },
    },
    {
      name: "Alexander Borvykh",
      uuIdentity: "24-9941-1",
      role: {
        en: "Business architect and main backend developer.",
      },
    },
  ],
  otherAuthors: [
    {
      name: "Last member",
      uuIdentity: "4-4-1",
      role: {
        en: "Just being in team.",
      },
    },
  ],
  usedTechnologies: {
    technologies: {
      en: [
        <UU5.Bricks.LinkUAF key="uaf" />,
        <UU5.Bricks.LinkUuApp key="uuapp" />,
        <UU5.Bricks.LinkUU5 key="uu5" />,
        <UU5.Bricks.LinkUuPlus4U5 key="uuplus4u5" />,
        <UU5.Bricks.Link
          content="uuProductCatalogue"
          href="https://uuos9.plus4u.net/uu-bookkitg01-main/78462435-7f743efd1bf6486d8e72b27a0df92ba7/book"
          target="_blank"
          key="uuproductcatalogue"
        />,
        <UU5.Bricks.LinkUuAppServer key="uuappserver" />,
        <UU5.Bricks.LinkUuOIDC key="uuoidc" />,
        <UU5.Bricks.LinkUuCloud key="uucloud" />,
      ],
    },
    content: {
      cs: [
        `<uu5string/>Dále byly použity technologie: <UU5.Bricks.LinkHTML5/>, <UU5.Bricks.LinkCSS/>, <UU5.Bricks.LinkJavaScript/>, <UU5.Bricks.LinkBootstrap/>,
        <UU5.Bricks.LinkReact/>, <UU5.Bricks.LinkRuby/>, <UU5.Bricks.LinkPuma/> a <UU5.Bricks.LinkDocker/>.
        Aplikace je provozována v rámci internetové služby <UU5.Bricks.LinkPlus4U/> s využitím cloudu <UU5.Bricks.LinkMSAzure/>.
        Uživatelská dokumentace aplikace je popsána v knize <UU5.Bricks.Link href="" target="_blank" content='"Zde doplňte odkaz na dokumentaci"' />.
        Technickou dokumentaci lze nalézt v knize <UU5.Bricks.Link href="" target="_blank" content='"Zde doplňte odkaz na dokumentaci"' />.`,
      ],
      en: [
        `<uu5string/>Other used technologies: <UU5.Bricks.LinkHTML5/>, <UU5.Bricks.LinkCSS/>, <UU5.Bricks.LinkJavaScript/>, <UU5.Bricks.LinkBootstrap/>,
        <UU5.Bricks.LinkReact/>, <UU5.Bricks.LinkRuby/>, <UU5.Bricks.LinkPuma/> a <UU5.Bricks.LinkDocker/>.
        Application is operated in the <UU5.Bricks.LinkPlus4U/> internet service with the usage of <UU5.Bricks.LinkMSAzure/> cloud.
        The application user guide is located in <UU5.Bricks.Link href="" target="_blank" content='"Documentation link put here"' />.
        Technical documentation can be found in <UU5.Bricks.Link href="" target="_blank" content='"Documentation link put here"' />.`,
      ],
    },
  },
};

export default About;
