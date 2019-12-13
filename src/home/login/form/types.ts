import * as Yup from 'yup';

export const initialFormValues = {
  email: '',
  password: '',
};

export type FormValues = typeof initialFormValues;

export const FormSchema = Yup.object().shape<FormValues>({
  email: Yup.string().required('Required'),
  password: Yup.string().required('Required'),
});
