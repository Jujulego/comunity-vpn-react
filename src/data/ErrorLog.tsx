import React, { ReactNode } from 'react';
import moment from 'moment';

// Class
class ErrorLog {
  // Attributes
  readonly date: moment.Moment;
  message: string;

  // Constructor
  constructor(message: string) {
    this.date = moment();
    this.message = message;
  }

  // Methods
  format(): ReactNode {
    return this.message;
  }
}

// sub-classes
export class HttpErrorLog extends ErrorLog {
  // Attributes
  status: number;

  // Constructor
  constructor(status: number, message: string) {
    super(message);

    this.status = status;
  }

  // Methods
  format(): ReactNode {
    return (
      <span>
        <strong>{ this.status }</strong>: { this.message }
      </span>
    );
  }
}

export class WSErrorLog extends ErrorLog {
  // Methods
  format(): ReactNode {
    return (
      <span>
        <strong>WS</strong>: { this.message }
      </span>
    );
  }
}

export default ErrorLog;