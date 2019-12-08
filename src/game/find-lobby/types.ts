import * as Yup from 'yup';

export const initialFormValues = {
  code: '',
};

export type FormValues = typeof initialFormValues;

export const FormSchema = Yup.object().shape<FormValues>({
  code: Yup.string()
    .length(8, 'Code must be exactly 8 characters long')
    .required('Required'),
});
