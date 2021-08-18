export default interface BaseElementInterface {
  //required
  id: string;
  value: string | number | boolean | null;
  //optional
  label?: string;
  autocomplete?: boolean;
  autofocus?: boolean;
  disabled?: boolean;
  name?: string;
  required?: boolean;
  readonly?: boolean;
}
