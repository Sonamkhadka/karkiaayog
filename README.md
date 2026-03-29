# Karki Aayog Report

Interactive public summary of the Karki Aayog report on Nepal's September 2025 Gen-Z protests.

This project is designed to make a long public report easier to understand through a single-page website with timeline, casualties, accountability findings, recommendations, and source links.

## Stack

- HTML
- CSS
- Vanilla JavaScript
- Chart.js
- Express for local preview

## Local development

```bash
npm install
npm start
```

Default local URL: `http://localhost:3001`

You can use a different port with:

```bash
PORT=8080 npm start
```

## Netlify deployment

This site is static and can be deployed directly on Netlify.

Recommended settings:

- Build command: leave empty
- Publish directory: `.`

A basic [`netlify.toml`](/Users/sonamkhadka/Desktop/Developer/projects/karki-aayog-report/netlify.toml) is included for convenience.

## Before launch

- Update the canonical URL in [`index.html`](/Users/sonamkhadka/Desktop/Developer/projects/karki-aayog-report/index.html)
- Update [`sitemap.xml`](/Users/sonamkhadka/Desktop/Developer/projects/karki-aayog-report/sitemap.xml) and [`robots.txt`](/Users/sonamkhadka/Desktop/Developer/projects/karki-aayog-report/robots.txt) if your final domain is not `https://karki-aayog-report.netlify.app/`
- Verify all third-party source links
- Confirm rights and attribution for every image in `assets/`

## Contributing

Contributions are welcome. Please read [`CONTRIBUTING.md`](/Users/sonamkhadka/Desktop/Developer/projects/karki-aayog-report/CONTRIBUTING.md) before opening a pull request.

## License

The source code in this repository is available under the MIT License. Third-party images, quoted material, and source-linked research remain subject to their original licenses and copyrights.
