<h6 align="center">
    <img src="https://raw.githubusercontent.com/s00d/LarecipeCodeViewer/main/resourses/Screenshot.png"/>
</h6>

<h2 align="center">
    LaRecipe CodeSimples
</h2>

## Getting Started

1. Install the package via composer.

```bash
composer require s00d/larecipe-code-viewer
```

2. Use the provided VueJs component:

```html
<larecipe-code-viewer url="/api/v1/users"></larecipe-code-viewer>
```

3. Customize your component via props:

| Prop Name   | 	Description                                                                    | Data  Type | Required  | Default Value                                                                                                                                           |
|-------------|---------------------------------------------------------------------------------|------------|-----------|---------------------------------------------------------------------------------------------------------------------------------------------------------|
| baseUrl     | Defines the base URL for the requests.                                          | 	String    | Optional	 | ''                                                                                                                                                      |
| url         | Defines the endpoint URL for the request.                                       | 	String    | Required  | 	N/A                                                                                                                                                    | 
| method      | Defines the HTTP method for the request.                                        | 	String    | Optional  | 	'GET'                                                                                                                                                  | 
| cookies     | Defines the cookies to be sent with the request.                                | 	Array     | Optional  | 	[]                                                                                                                                                     | 
| header      | Defines the headers to be sent with the request.                                | 	Array     | Optional  | 	[]                                                                                                                                                     | 
| queryString | Defines the query string parameters to be sent with the request.                | 	Array     | Optional  | 	[]                                                                                                                                                     | 
| path        | Defines the path parameters to be sent with the request.                        | 	Array     | Optional  | 	[]                                                                                                                                                     | 
| postData    | Defines the data to be sent with the request.                                   | 	Array     | Optional  | 	[]                                                                                                                                                     | 
| configs     | Defines the configuration options for generating code snippets for the request. | 	Array     | Optional  | 	[ { snippet: 'shell', libraries: { cURL: 'curl', HTTPie: 'httpie', Wget: 'wget' } }, ... ] (an array of objects containing snippet and libraries keys) | 

## License

This library is licensed under the MIT License - see the [LICENSE.md](LICENSE) file for details.
