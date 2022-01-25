import FormInterface from "@/definitions/form/FormInterface";
import InputInterface from "@/definitions/form/InputInterface";
import TextareaInterface from "@/definitions/form/TextareaInterface";

const name: InputInterface = {
  id: "name",
  label: "Nombre",
  type: "text",
  value: null,
  required: true,
};

const email: InputInterface = {
  id: "email",
  label: "Email",
  type: "text",
  value: null,
  required: true,
};
const title: InputInterface = {
  id: "title",
  label: "Titulo",
  type: "text",
  value: null,
  required: true,
};

const message: TextareaInterface = {
  id: "message",
  label: "Mensaje",
  value: null,
  rows: 6,
  required: true,
};

export default (): FormInterface => {
  return {
    fieldsets: [
      {
        legend: "Formulario de contacto",
        elements: [
          {
            type: "input",
            data: name,
          },
          {
            type: "input",
            data: email,
          },
          {
            type: "input",
            data: title,
          },
          {
            type: "textarea",
            data: message,
          },
        ],
      },
    ],
    buttonText: "Enviar",
  };
};
