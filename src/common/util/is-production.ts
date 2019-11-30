import AppConstants from '../constants';

const isProduction: boolean = process.env.NODE_ENV === AppConstants.productionEnvironment;
export default isProduction;
