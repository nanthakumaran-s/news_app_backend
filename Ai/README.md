# Ai Moderator Functions (Image Toxic & Text Toxic)\*

| function Name      | arguments\*\* | return                  |
| ------------------ | ------------- | ----------------------- |
| checkImageContent  | image buffer  | boolean or "not-loaded" |
| checkContentToxity | content       | boolean or "not-loaded" |

#

- \*\* all arguments are required

#

\*

- if fn returns true, it is safe content & you can procced to other steps
- if fn returns false, it is not safe content & you need to terminate the request
- if fn returns "not-loaded", then ai model not loaded or the argumenst is missing
