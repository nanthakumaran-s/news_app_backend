# Auth Api Endpoints (V1)

| endpoint                             | protocol       | query/body                                                              |
| ------------------------------------ | -------------- | ----------------------------------------------------------------------- |
| /api/auth/v1/signup                  | POST           | username, email, fullname, password, deviceid, home_location, platform, |
| /api/auth/v1/signin                  | GET            | username, password                                                      |
| /api/auth/v1/delete-user             | DELETE         | username, password                                                      |
| /api/auth/v1/isusername-available    | GET            | username                                                                |
| /api/auth/v1/change-location         | PATCH          | username, current_location                                              |
| /api/auth/v1/update-profile          | PUT(Form Data) | username, fullname, home_location, file\*                               |
| /api/auth/v1//request-reset-password | GET            | email                                                                   |
| /api/auth/v1//verify-secret-token    | PATCH          | email, token, newPassword                                               |

#

\*file should be of type image, rest should be of type string

## Benchmarks Test

yarn run auth_test
