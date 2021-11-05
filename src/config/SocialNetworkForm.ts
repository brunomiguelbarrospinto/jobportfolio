import InputInterface from "@/definitions/form/InputInterface";
import { SocialNetworkTypeValues } from "./../definitions/entities/SocialNetworksInterface";
import FormInterface from "@/definitions/form/FormInterface";
import SelectInterface from "@/definitions/form/SelectInterface";

const name: SelectInterface = {
  id: "name",
  label: "Red social",
  options: Object.values(SocialNetworkTypeValues).map((v) => {
    return { value: v, text: v };
  }),
  value: null,
  required: true,
};

const link: InputInterface = {
  id: "link",
  label: "Enlace",
  value: null,
  type: "text",
  required: true,
};

export default (isNew: boolean): FormInterface => {
  return {
    fieldsets: [
      {
        legend: isNew ? "Nueva red social" : "Editar red social",
        elements: [
          {
            type: "select",
            data: name,
          },
          {
            type: "input",
            data: link,
          },
        ],
      },
    ],
  };
};
