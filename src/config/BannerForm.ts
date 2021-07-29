import FormInterface from "@/definitions/form/FormInterface";
import InputInterface from "@/definitions/form/InputInterface";
import CheckboxInterface from "@/definitions/form/CheckboxInterface";

const showPhoto: CheckboxInterface = {
  id: "showPhoto",
  label: "Mostrar imagen de perfil",
  type: "checkbox",
  value: false,
};

const title: InputInterface = {
  id: "title",
  label: "Titulo",
  type: "text",
  value: null,
  required: true,
};

const subTitle: InputInterface = {
  id: "subTitle",
  label: "Subtitulo",
  type: "text",
  value: null,
  required: true,
};

const backgroundImage: InputInterface = {
  id: "backgroundImage",
  label: "Imagen de fondo",
  type: "file",
  value: null,
};

const social: CheckboxInterface = {
  id: "social",
  label: "Mostrar redes sociales",
  type: "checkbox",
  value: false,
};

export default (): FormInterface => {
  return {
    fieldsets: [
      {
        legend: "Configuracion del banner",
        elements: [
          {
            type: "input",
            data: backgroundImage,
          },
          {
            type: "input",
            data: showPhoto,
          },
          {
            type: "input",
            data: title,
          },
          {
            type: "input",
            data: subTitle,
          },
          {
            type: "input",
            data: social,
          },
        ],
      },
    ],
  };
};
