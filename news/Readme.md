# News Api Endpoints (V1)

| endpoint                                | protocol | query/body                                                                               |
| --------------------------------------- | -------- | ---------------------------------------------------------------------------------------- |
| /api/news/v1/postnews                   | POST     | title, content, thumbnail as file, timestamp, location, username, userid as id, category |
| /api/news/v1/getnews-id                 | GET      | newsid as id                                                                             |
| /api/news/v1/getnews-location           | GET      | location, province, limit, page                                                          |
| /api/news/v1//get-sandbox-news-location | GET      | location, province, limit, page                                                          |
| /api/news/v1/getnews-latlong            | GET      | lat, long                                                                                |
| /api/news/v1/update-sharecount          | PATCH    | newsid as id                                                                             |
| /api/news/v1/getnews-trending           | GET      | category, page, limit                                                                    |
| /api/news/v1/approve                    | PATCH    | userid, newsid                                                                           |
| /api/news/v1/deny                       | PATCH    | userid, newsid                                                                           |
| /api/news/v1/idk                        | PATCH    | userid, newsid                                                                           |
| /api/news/v1/search                     | GET      | query                                                                                    |

---

## Details:

- location is a map of `locality, district, state, country, lat, long`
- For `getnews-location` endpoint `location = name`, `province = 'state' || 'district' || 'locality' || 'country'`, `limit = Some number default 10`, `page = Some page number default 0`
- For `getnews-trending` endpoint `category is set to all by default`
