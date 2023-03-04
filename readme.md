<h6 align="center">
    <img src="https://larecipe.saleem.dev/images/logo.svg"/>
</h6>

<h2 align="center">
    LaRecipe CodeSimples
</h2>

# LaRecipe 🍪

**LaRecipe** is simply a code-driven package provides an easy way to create beautiful documentation for your product or application inside your Laravel app.


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

| Prop | Type | Default | Example |
| - | - | - | - |
| `base-url` | String | The current location origin | https://example.com |
| `url` | String | - | /api/v1/users |
| `method` | String | - | GET |
| `params` | Object | - | { 'data': '1111' } |

## License

This library is licensed under the MIT License - see the [LICENSE.md](LICENSE) file for details.
