# Karki Aayog Report

Interactive public summary of the Karki Aayog report on Nepal's September 2025 Gen-Z protests.

This project makes the 900+ page judicial inquiry commission report accessible to every citizen through an interactive single-page website with timelines, data visualisations, accountability findings, a martyrs memorial, and bilingual (English/Nepali) content.

**Live site:** [karkiaayog.netlify.app](https://karkiaayog.netlify.app)

## Features

- Full-width photo journalism from the protests, parliament fire, and aftermath
- Interactive charts (Chart.js) for casualties, ammunition, and accountability data
- Bilingual English/Nepali language toggle
- 45 declared martyrs memorial with names and districts
- "What Happened Since" page for elections, accountability tracking, legal updates, and government changes
- Implementation tracker updated through 25 April 2026
- Dark/light mode toggle
- Responsive design for mobile and desktop
- Scroll-reveal animations
- SEO metadata, sitemap, and robots.txt

## Stack

- HTML
- CSS (custom properties, no framework)
- Vanilla JavaScript
- Chart.js with datalabels plugin
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

Or simply open `index.html` directly in a browser (charts require an internet connection for the Chart.js CDN).

## Deployment

### Netlify (recommended)

This site is static and can be deployed directly on Netlify.

Recommended settings:

- Build command: leave empty
- Publish directory: `.`

A [`netlify.toml`](netlify.toml) is included for convenience.

### Other hosts

Works with any static hosting service (Vercel, GitHub Pages, Cloudflare Pages). No build step required.

## Before launch checklist

- [ ] Update the canonical URL in [`index.html`](index.html) if using a custom domain
- [ ] Update [`sitemap.xml`](sitemap.xml) and [`robots.txt`](robots.txt) with the final domain
- [ ] Verify all third-party source links are still live
- [ ] Confirm rights and attribution for every image in `assets/`

## Contributing

Contributions are welcome. Please read [`CONTRIBUTING.md`](CONTRIBUTING.md) before opening a pull request.

Quick ways to help:

- Report factual errors or broken links
- Suggest stronger source material
- Improve readability, accessibility, and mobile UX
- Improve Nepali and English copy
- Add better SEO or discoverability improvements
- Add new data visualisations or interactive features

If you are not changing code, opening an issue with sources and notes is still useful.

See the [open issues](https://github.com/Sonamkhadka/karkiaayog/issues) for current tasks.

## Sources

All data is sourced from published reports and official records:

- [Kathmandu Post - Karki Commission 10 Points](https://kathmandupost.com/national/2026/03/25/karki-commission-s-recommendations-on-the-gen-z-protests-explained-in-10-points)
- [Nepal Views - Decision to Unveil Report](https://english.nepalviews.com/2026/03/25/decision-to-unveil-three-documents-including-the-investigation-commission-s-report)
- [Ratopati - Report Leak Context](https://english.ratopati.com/story/55541/home-minister-aryal-says-the-government-has-not-received-the-electronic-version)
- [Human Rights Watch](https://www.hrw.org/news/2026/02/12/nepal-publish-reports-on-violent-crackdowns-on-protests)
- [Harvard Atrocity Prevention Lab](https://hsph.harvard.edu/atrocity-prevention-lab/news/the-2025-gen-z-uprising-in-nepal-a-three-part-analysis/)
- [CNN - Oli Arrested](https://www.cnn.com/2026/03/28/asia/nepal-kp-sharma-oli-arrested-protests-intl-hnk)
- [BBC - Nepal's ex-PM arrested](https://www.bbc.com/news/articles/cn89ry7y835o)
- [Himalayan Times - Balen Cabinet](https://thehimalayantimes.com/nepal/ministers-of-balen-led-cabinet)
- [HimalPress - 45 Declared Martyrs](https://en.himalpress.com/45-victims-of-gen-z-protests-declared-martyrs-with-namelist/)
- [Kathmandu Post - UML Protests](https://kathmandupost.com/national/2026/03/29/as-government-arrests-oli-uml-vows-nationwide-protests)
- [Kathmandu Post - Oli and Lekhak Released](https://kathmandupost.com/national/2026/04/09/oli-lekhak-released-following-court-order)
- [Al Jazeera - Home Minister Resigns](https://www.aljazeera.com/news/2026/4/22/nepals-home-minister-resigns-second-cabinet-exit-in-one-month)
- [The Week/PTI - Parliament Session Suspended](https://www.theweek.in/wire-updates/international/2026/04/23/nepal-president-paudel-suspends-parliament-session-of-both-houses-without-convening.html)
- [Ratopati - Nepali Congress Review](https://english.ratopati.com/story/59139/congress-study-report-says-three-major-problems-in-karki-commission-report-on-genji-movement)

## License

The source code in this repository is available under the MIT License. Third-party images, quoted material, and source-linked research remain subject to their original licenses and copyrights.
