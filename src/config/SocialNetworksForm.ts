import FormInterface from "@/definitions/form/FormInterface";
import InputInterface from "@/definitions/form/InputInterface";

const linkedin: InputInterface = {
  id: "linkedin",
  label: "Linkedin",
  type: "text",
  value: null,
};

const facebook: InputInterface = {
  id: "facebook",
  label: "Facebook",
  type: "text",
  value: null,
};

const twitter: InputInterface = {
  id: "twitter",
  label: "Twitter",
  type: "text",
  value: null,
};

const instagram: InputInterface = {
  id: "instagram",
  label: "Instagram",
  type: "text",
  value: null,
};

const youtube: InputInterface = {
  id: "youtube",
  label: "Youtube",
  type: "text",
  value: null,
};

const pinterest: InputInterface = {
  id: "pinterest",
  label: "Pinterest",
  type: "text",
  value: null,
};

const patreon: InputInterface = {
  id: "patreon",
  label: "Patreon",
  type: "text",
  value: null,
};

const behance: InputInterface = {
  id: "behance",
  label: "Behance",
  type: "text",
  value: null,
};

const github: InputInterface = {
  id: "github",
  label: "Github",
  type: "text",
  value: null,
};

const gitlab: InputInterface = {
  id: "gitlab",
  label: "Gitlab",
  type: "text",
  value: null,
};

export default (): FormInterface => {
  return {
    fieldsets: [
      {
        legend: "Redes sociales",
        elements: [
          {
            type: "input",
            data: linkedin,
          },
          {
            type: "input",
            data: facebook,
          },
          {
            type: "input",
            data: twitter,
          },
          {
            type: "input",
            data: instagram,
          },
          {
            type: "input",
            data: youtube,
          },
          {
            type: "input",
            data: pinterest,
          },
          {
            type: "input",
            data: patreon,
          },
          {
            type: "input",
            data: behance,
          },
          {
            type: "input",
            data: github,
          },
          {
            type: "input",
            data: gitlab,
          },
        ],
      },
    ],
  };
};
