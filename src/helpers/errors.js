class ProjectError extends Error {
    constructor(message) {
        super(message);
        this.status = 400;
    }
}

class ValidationError extends ProjectError {
    constructor(message) {
      super(message);
      this.status = 400;
    }
}
  
class WrongParametersError extends ProjectError {
    constructor(message) {
      super(message);
      this.status = 404;
    }
}

class NotAutorizedError extends ProjectError {
    constructor(message) {
        super(message);
        this.status = 401;
    }
}

class RegistrationConflictError extends ProjectError {
    constructor(message) {
        super(message);
        this.status = 409;
    }
}

  
module.exports = {
    ProjectError,
    ValidationError,
    WrongParametersError,
    NotAutorizedError,
    RegistrationConflictError,
};