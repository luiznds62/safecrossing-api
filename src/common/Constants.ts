export enum HTTP_STATUS {
  SUCCESS = 200,
  CREATED = 201,
  SUCCESS_NO_CONTEND = 204,
  VALIDATION_ERROR = 422,
  INTERNAL_SERVER_ERROR = 500
}

export enum BCRYPT {
  SALTED_ROUND = 10
}

export enum JOBS {
  REGISTRATION = 'RegistrationJob'
}

export enum TRAFFIC_LIGHT_STATUS {
  SAFE = 'Safe',
  WAIT = 'Wait'
}
