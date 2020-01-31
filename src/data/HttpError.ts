import moment from 'moment';

// Interface
interface HttpError {
  date: moment.Moment;
  status: number;
  message: string;
}

export default HttpError;