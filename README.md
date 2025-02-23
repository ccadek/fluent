<!-- PROJECT SHIELDS -->

[![Stargazers][stars-shield]][stars-url]
[![Issues][issues-shield]][issues-url]
[![MIT License][license-shield]][license-url]
[![Commitizen friendly](https://img.shields.io/badge/commitizen-friendly-brightgreen.svg)](http://commitizen.github.io/cz-cli/)

<!-- PROJECT LOGO -->
<br />
<p align="center">
  <a href="https://github.com/github_username/repo">
       <img src="https://docs.goatlab.io/logo.png" alt="Logo" width="150" height="150">
  </a>

  <h3 align="center">GOAT-FLUENT</h3>

  <p align="center">
    Fluent - Time Saving (TS) utils
    <br />
    <a href="https://docs.goatlab.io/#/0.7.x/fluent/fluent"><strong>Explore the docs »</strong></a>
    <br />
    <br />
    ·
    <a href="https://github.com/goat-io/fluent/issues">Report Bug</a>
    ·
    <a href="https://github.com/goat-io/fluent/issues">Request Feature</a>
  </p>
</p>

# Goat - Fluent (Monorepo)

Fluent query interface for Multiple databases and useful helpers for general App development.

## Packages

1. fluent: Base api generator and TypeORM + MongoDB connector
2. fluent-firebase: Firebase connector
3. fluent-formio: Formio API connector
4. fluent-loki: LokiJS API connector
5. fluent-memory: In memory database connector
6. fluent-rest: REST API connector
7. formio-utils: General tools to help with Formio
8. js-utils: Node/Browser utilities
9. node-utils: Node utilities
10. queue: Wrappers to work with queues
11. uploads: Wrappers to upload files to S3, GCP, Azure

## Supported Databases

1. Firebase\*\*
2. MongoDB\*
3. Mysql\*
4. MariaDB\*
5. SQLite\*
6. Postgres\*
7. CockroachDB\*
8. Microsoft SQL Server\*
9. Oracle\*
10. SAP Hana\*
11. sql.js\*
12. LokiJS
13. PouchDB
14. In-memory

Wrapper for TypeORM (@goatlab/fluent)\*

Wrapper for firebase-admin and fireorm (@goatlab/fluent-firebase) \*\*

### Installing

To install this package in your project, you can use the following command within your terminal.

```bash
yarn add @goatlab/fluent
```

### Documentation

To learn how to use this visit the [Goat Docs](https://docs.goatlab.io/#/0.7.x/fluent/fluent)

## Release Process

1. This package uses [Changesets](https://github.com/changesets/changesets) to manage releases for individual packages
2. Release chain:
   js-utils
   node-utils fluent

## License

Distributed under the MIT License. See `LICENSE` for more information.

<!-- CONTACT -->

## Contact

Ignacio Cabrera - [@twitter_handle](https://twitter.com/cabrerabywaters) - ignacio.cabrera@goatlab.io

<!-- ACKNOWLEDGEMENTS -->

<!-- ACKNOWLEDGMENTS -->
## Acknowledgments

This library is based on the work of other Authors and Open Source Libraries. Have a look at them and give them a well deserved Star ⭐!

* [sindresorhus - p-map](https://github.com/sindresorhus/p-map)
* [sindresorhus - p-props](https://github.com/sindresorhus/p-props)
* [Natural Cycles - NodeJS](https://github.com/NaturalCycles/nodejs-lib)
* [Natural Cycles - JS-Lib](https://github.com/NaturalCycles/js-lib)

<!-- MARKDOWN LINKS & IMAGES -->
<!-- https://www.markdownguide.org/basic-syntax/#reference-style-links -->

[contributors-url]: https://github.com/goat-io/fluent/graphs/contributors
[forks-url]: https://github.com/goat-io/fluent/network/members
[stars-shield]: https://img.shields.io/github/stars/goat-io/fluent?style=flat-square
[stars-url]: https://github.com/goat-io/fluent/stargazers
[issues-shield]: https://img.shields.io/github/issues/goat-io/fluent?style=flat-square
[issues-url]: https://github.com/goat-io/fluent/issues
[license-shield]: https://img.shields.io/github/license/goat-io/fluent?style=flat-square
[license-url]: https://github.com/goat-io/fluent/blob/master/LICENSE.txt
[linkedin-shield]: https://img.shields.io/badge/-LinkedIn-black.svg?style=flat-square&logo=linkedin&colorB=555
[linkedin-url]: https://linkedin.com/in/othneildrew
[product-screenshot]: images/screenshot.png
