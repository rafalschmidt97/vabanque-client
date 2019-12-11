import * as Yup from 'yup';

export const initialFormValues = {
  duration: new Date(330000),
  entry: 5,
};

export type FormValues = typeof initialFormValues;

export const FormSchema = Yup.object().shape<FormValues>({
  duration: Yup.date()
    .min(new Date(60000), 'Round duration must be longer than 1 minute')
    .max(new Date(900000), 'Round duration must be shorter than 15 minutes')
    .required('Required'),
  entry: Yup.number()
    .min(1, 'Entry must be bigger than 1$')
    .max(1000000, 'Are you a millionaire?')
    .required(),
});
