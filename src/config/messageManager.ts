const severityCode = {
  LOW: 'LOW',
  HIGH: 'HIGH',
  MEDIUM: 'MEDIUM',
  CRITICAL: 'CRITICAL',
}
export const ACCOUNT_NOT_FOUND = {
  message: 'Account not found',
  code: 404,
  severity: severityCode.LOW,
}
export const SERVICE_EXPIRED = {
  message: 'service expired',
  code: 401,
  severity: severityCode.LOW,
}
export const ACCOUNT_REGISTERED = {
  message: 'registration is successful, check your email Inbox/Spam to verify account',
  code: 200,
  severity: severityCode.LOW,
}
export const ACCOUNT_VERIFIED = {
  message: 'Account is verified, please login to the application',
  code: 200,
  severity: severityCode.LOW,
}
export const RESET_VERIFICATION_CODE = {
  message:
    'account verification code reset successfully, check your email Inbox/Spam to verify account',
  code: 200,
  severity: severityCode.LOW,
}
export const ACCOUNT_LOGOUT = {
  message: 'You have logged out of the application',
  code: 200,
  severity: severityCode.LOW,
}
export const TOO_MANY_REQUEST = {
  message: 'Too many request from this IP.',
  code: 429,
  severity: severityCode.HIGH,
}
export const TOO_MANY_LOGIN_ATTEMPT = {
  message: 'Too many login attempts.',
  code: 429,
  severity: severityCode.HIGH,
}
export const VALIDATION_ERROR = {
  message: 'validation error',
  code: 400,
  severity: severityCode.MEDIUM,
}
export const INVALID_ACTION = {
  message: 'invalid action',
  code: 400,
  severity: severityCode.MEDIUM,
}
export const NOT_FOUND = {
  type: 'NOT_FOUND',
  message: 'resource not found',
  code: 404,
  severity: severityCode.LOW,
}
export const TOKEN_EXPIRED = {
  message: 'token expired',
  code: 401,
  severity: severityCode.LOW,
}
export const TOKEN_UNAUTHORIZED = {
  message: 'unauthorized token',
  code: 401,
  severity: severityCode.LOW,
}
export const NO_TOKEN = {
  message: 'no token provided with the request',
  code: 401,
  severity: severityCode.LOW,
}
export const ACCESS_DENIED = {
  message: 'Access has been denied',
  code: 403,
  severity: severityCode.LOW,
}
export const INVALID_LOGIN_ID = {
  message: 'Invalid login id',
  code: 400,
  severity: severityCode.LOW,
}
export const USER_NOT_ACTIVE = {
  message:
    'please check your email to verify your account and continue the process.',
  code: 400,
  severity: severityCode.LOW,
}
export const INVALID_EMAIL_PWD = {
  message: 'incorrect email or password!',
  code: 400,
  severity: severityCode.LOW,
}
export const INVALID_EMAIL = {
  message: 'Invalid Email',
  code: 400,
  severity: severityCode.LOW,
}

export const TERMS_AND_CONDITION_NOT_ACCEPTED = {
  message: 'Terms and condition not accepted yet!',
  code: 400,
  severity: severityCode.LOW,
}
export const INVALID_OTP = {
  message: 'Invalid OTP',
  code: 400,
  severity: severityCode.LOW,
}
export const EXPIRED_OTP = {
  message: 'OTP Expired',
  code: 400,
  severity: severityCode.LOW,
}
export const INVALID_VERIFICATION_CODE = {
  message: 'Invalid verification code',
  code: 400,
  severity: severityCode.LOW,
}
export const INVALID_CREDENTIALS_OR_VERIFICATION_CODE = {
  message: 'Invalid credentials or verification code',
  code: 400,
  severity: severityCode.LOW,
}
export const EXPIRED_VERIFICATION_CODE = {
  message: 'verification code expired or invalid',
  code: 400,
  severity: severityCode.LOW,
}
export const PASSWORD_USED_IN_LAST_THREE = {
  message: 'Password should not match with recent three',
  code: 400,
  severity: severityCode.LOW,
}
export const USER_ALREADY_EXIST = {
  message: 'Email id is already exist',
  code: 400,
  severity: severityCode.LOW,
}
export const USER_DOES_NOT_EXIST = {
  message: 'user does not exist',
  code: 400,
  severity: severityCode.LOW,
}
export const INVALID_USER_ROLE = {
  message: 'Invalid user role',
  code: 400,
  severity: severityCode.LOW,
}
export const ACCOUNT_MAX_LIMIT = {
  message: 'Maximum account creation limit reached',
  code: 400,
  severity: severityCode.LOW,
}
export const USER_ENROLLMENT_FAIL = {
  message: 'User enrollment failed',
  code: 400,
  severity: severityCode.LOW,
}
export const FILE_SYSTEM_ERROR = {
  message: 'Error in file system',
  code: 400,
  severity: severityCode.LOW,
}
export const INVALID_REQUEST_ID = {
  message: 'Invalid request',
  code: 400,
  severity: severityCode.LOW,
}
export const CONFIGURATION_NOT_FOUND = {
  message: 'configuration not found for creation of elements',
  code: 400,
  severity: severityCode.LOW,
}
export const USER_INACTIVE = {
  message: 'User is not active',
  code: 400,
  severity: severityCode.LOW,
}
export const MULTIPLE_WRONG_ATTEMPTS = {
  message:
    'Your account is locked for 30 minutes for multiple invalid attempts',
  code: 400,
  severity: severityCode.LOW,
}
export const RESET_PASSWORD = {
  message:
    'reset password request successfully, check your email Inbox/Spam to reset password',
  code: 400,
  severity: severityCode.LOW,
}
export const RESET_PASSWORD_SUCCESS = {
  message: 'password reset successfully, please login to the application',
  code: 200,
  severity: severityCode.LOW,
}
export const FAILED_TO_UPDATE_PASSWORD = {
  message: 'Failed to update password',
  code: 400,
  severity: severityCode.LOW,
}
export const PASSWORD_SAME = {
  message: 'Old and new password should not be same',
  code: 400,
  severity: severityCode.LOW,
}
