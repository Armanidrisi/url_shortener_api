# URL Shortener API :link:

[![License](https://img.shields.io/badge/license-MIT-blue.svg)](https://opensource.org/licenses/MIT)
[![GitHub Issues](https://img.shields.io/github/issues/Armanidrisi/url_shortener_api.svg)](https://github.com/Armanidrisi/url_shortener_api/issues)
[![GitHub Pull Requests](https://img.shields.io/github/issues-pr/Armanidrisi/url_shortener_api.svg)](https://github.com/Armanidrisi/url_shortener_api/pulls)

This is a simple URL shortener API built with Node.js and Express.js. It allows you to generate short URLs for long URLs and retrieve the long URL from a short ID. The API uses MongoDB as the database for storing URL data.

## Installation :gear:

1. Clone the repository:

   ```
   git clone https://github.com/Armanidrisi/url_shortener_api.git
   ```

2. Install the dependencies:

   ```
   npm install
   ```

3. Create a `.env` file in the root directory and provide the following environment variables:

   ```
   PORT=<port_number>
   BASE_URL=<base_url>
   MONGO_URI=<mongodb_uri>
   ```

4. Start the server:

   ```
   npm start
   ```

## Usage :rocket:

### Create a Short URL

✨ **Endpoint:** `/api/url/short`

📝 **Method:** POST

**Request Body:**

```json
{
  "longUrl": "https://www.example.com/very/long/url"
}
```

**Response:**

```json
{
  "status": true,
  "message": null,
  "url": {
    "_id": "609d19e9e377dd0015a43c68",
    "urlCode": "abc123",
    "longUrl": "https://www.example.com/very/long/url",
    "shortUrl": "https://shorturl.com/abc123",
    "date": "2023-06-01T10:30:00.000Z"
  }
}
```

### Retrieve the Long URL

✨ **Endpoint:** `/api/url/short/:id`

📝 **Method:** GET

**Path Parameters:**

- `id` - The short ID generated for the URL.

**Response (Success):**

```json
{
  "status": true,
  "message": "URL fetch success",
  "url": {
    "_id": "609d19e9e377dd0015a43c68",
    "urlCode": "abc123",
    "longUrl": "https://www.example.com/very/long/url",
    "shortUrl": "https://shorturl.com/abc123",
    "date": "2023-06-01T10:30:00.000Z"
  }
}
```

**Response (Error - URL Not Found):**

```json
{
  "status": false,
  "message": "URL not found"
}
```

## Error Handling :warning:

In case of any errors, the API will return an appropriate error response with the corresponding HTTP status code and an error message.

- `400 Bad Request`: If the required parameters are missing or invalid.
- `404 Not Found`: If the requested URL is not found.
- `500 Internal Server Error`: If there is an internal server error.

## Contributing :handshake:

Contributions are welcome! If you find any issues or have suggestions for improvements, please create an issue or submit a pull request.

## License :memo:

This project is licensed under the [MIT License](LICENSE).

🌟🌟🌟🌟🌟
