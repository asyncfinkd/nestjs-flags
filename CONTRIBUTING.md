# Contributing to Repository

Thank you for considering contributing to nestjs-flags! This document provides guidelines and instructions for contributing to this project.

## Code of Conduct

By participating in this project, you agree to maintain a respectful and inclusive environment for everyone.

## How to Contribute

### Reporting Bugs

If you find a bug, please create an issue on GitHub with the following information:

- A clear, descriptive title
- Steps to reproduce the issue
- Expected behavior
- Actual behavior
- NestJS and nestjs-flags versions
- Any relevant configuration or code snippets

### Suggesting Features

We welcome feature suggestions! Please create an issue with:

- A clear description of the feature
- The motivation behind it
- Example use cases

### Pull Requests

1. Fork the repository
2. Create a new branch (`git checkout -b feature/your-feature-name`)
3. Make your changes
4. Run tests to ensure they pass (`npm test`)
5. Commit your changes (`git commit -m 'Add some feature'`)
6. Push to the branch (`git push origin feature/your-feature-name`)
7. Open a Pull Request

## Development Setup

1. Clone the repository
2. Install dependencies: `bash
npm install   `
3. Build the project: `bash
npm run build   `
4. Run tests: `bash
npm test   `

## Project Structure

- `src/` - Source code
  - `decorators/` - Feature flag decorators
  - `guards/` - NestJS guards for feature flags
  - `interfaces/` - TypeScript interfaces
  - `nestjs-flags.module.ts` - Main module
  - `nestjs-flags.service.ts` - Service for checking feature flags
  - `constants.ts` - Constant values
  - `index.ts` - Public API exports

## Coding Standards

- Follow the existing code style
- Write clear, descriptive commit messages
- Include tests for new features or bug fixes
- Update documentation when necessary
