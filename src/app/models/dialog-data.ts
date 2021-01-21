import { IDivision, IDivisionField } from "./division";

export interface DialogData {
  title: string;
  message: string;
}

export interface IModalForm {
  action: string;
  title: string;
  department_id: number;
  division_id: number;
  field_id: number;
  division: IDivision;
  division_list: IDivision[];
  division_field: IDivisionField;
}
