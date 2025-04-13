# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [0.0.5] - 2025-04-14

### Added

- Added tests for the feature flag decorator and guard
- Added a CHANGELOG.md file
- Added a CONTRIBUTING.md file
- Added a LICENSE file

### Changed

- Updated README with new information

## [0.0.4] - 2025-04-13

### Added

- Support for NestJS 10.x
- Support for @nestjs/config 3.x
- Improved TypeScript types
- Better error handling for missing feature flags

### Fixed

- Fixed issue with environment variable loading

## [0.0.3] - 2025-04-13

### Added

- `autoLoadFromEnv()` method for automatic loading of feature flags from environment variables
- Improved documentation with more examples

### Changed

- Enhanced logging with more debug information

## [0.0.2] - 2025-04-13

### Added

- Support for custom exception factories

### Fixed

- Fixed issue with guard injection

## [0.0.1] - 2025-04-13

### Added

- Initial release
- Basic feature flag functionality
- `FeatureFlag` decorator
- `FeatureFlagGuard` for route protection
- `NestjsFlagsService` for programmatic flag checking
- Support for configuration via `@nestjs/config`
