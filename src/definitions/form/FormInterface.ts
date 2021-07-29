import FieldsetInterface from "./FieldsetInterface";
import FormElementInterface from "./FormElementInterface";

export default interface FormInterface {
  id?: string;
  method?: string;
  action?: string;
  fieldsets?: FieldsetInterface[];
  elements?: FormElementInterface[];
}
