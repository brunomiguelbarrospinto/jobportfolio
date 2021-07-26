import RadioInterface from "./RadioInterface";

export default interface RadioGroupInterface {
  id: string;
  label: string;
  radios: RadioInterface[];
  name: string;
  value: string | number;
}
