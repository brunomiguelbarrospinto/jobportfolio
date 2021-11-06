import FormElementType from "@/definitions/form/FormElementType";
import InputInterface from "@/definitions/form/InputInterface";
import SelectInterface from "@/definitions/form/SelectInterface";
import TextareaInterface from "@/definitions/form/TextareaInterface";
import RadioGroupInterface from "@/definitions/form/RadioGroupInterface";

export default interface FormElementInterface {
  id?: string;
  order?: number;
  type: FormElementType;
  data:
    | InputInterface
    | SelectInterface
    | TextareaInterface
    | RadioGroupInterface;
  isVisible?: (element: FormElementInterface[]) => boolean;
}
