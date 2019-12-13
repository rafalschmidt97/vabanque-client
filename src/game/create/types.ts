import * as Yup from 'yup';

export const initialProgression = [
  { small: 5, big: 10 },
  { small: 10, big: 25 },
  { small: 25, big: 50 },
  { small: 50, big: 100 },
];

export const initialFormValues = {
  firstMinutes: 0,
  secondMinutes: 0,
  firstSeconds: 0,
  secondSeconds: 0,
  entry: '5$',
};

export type FormValues = typeof initialFormValues;

export const FormSchema = Yup.object().shape<FormValues>({
  firstMinutes: Yup.number().required(),
  secondMinutes: Yup.number().required(),
  firstSeconds: Yup.number().required(),
  secondSeconds: Yup.number().required(),
  entry: Yup.string()
    .min(2, 'Entry too short')
    .max(1000000, 'Are you a millionaire?')
    .required(),
});
