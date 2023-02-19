// form 表单属性
// model rules
import type { FormItemRule } from "./formItem";
interface FormProps {
  model: object;
  rules: { [x: string]: FormItemRule[] };
  showMessage?: boolean;
}
export { type FormProps };
