import * as Yup from 'yup';
import phoneNumberService from '../common/util/phoneNumberService';

export const initialFormValues = {
  phoneNumber: '',
  nickname: '',
};

export type FormValues = typeof initialFormValues;

export const FormSchema = Yup.object().shape<FormValues>({
  phoneNumber: Yup.string()
    .matches(phoneNumberService.getRegExp(), 'Phone number is not valid')
    .min(8, 'Phone number is too short')
    .max(10, 'Phone number is too long')
    .required('Required'),
  nickname: Yup.string()
    .min(3, 'Nickname is too short')
    .max(50, 'Nickname is too long')
    .required('Required'),
});
