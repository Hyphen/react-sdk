![Hyphen AI](https://github.com/Hyphen/nodejs-sdk/raw/main/logo.png)

[![npm](https://img.shields.io/npm/v/@hyphen/react-sdk)](https://www.npmjs.com/package/@hyphen/react-sdk)
[![npm](https://img.shields.io/npm/dm/@hyphen/react-sdk)](https://www.npmjs.com/package/@hyphen/react-sdk)
[![license](https://img.shields.io/github/license/Hyphen/react-sdk)](https://github.com/hyphen/react-sdk/blob/main/LICENSE)
[![tests](https://github.com/Hyphen/react-sdk/actions/workflows/tests.yaml/badge.svg)](https://github.com/Hyphen/react-sdk/actions/workflows/tests.yaml)
[![codecov](https://codecov.io/gh/Hyphen/react-sdk/graph/badge.svg?token=pZP47YorSv)](https://codecov.io/gh/Hyphen/react-sdk)

# Hyphen React SDK

The Hyphen React SDK provides React components, hooks, and higher-order components (HOCs) for integrating Hyphen's feature flag and toggle service into your React applications.

## Installation

```bash
npm install @hyphen/react-sdk
# or
pnpm install @hyphen/react-sdk
# or
yarn add @hyphen/react-sdk
```

## Quick Start

The SDK provides three ways to integrate Hyphen into your React application:

### 1. Higher-Order Component (HOC) Pattern

Wrap your root component with `withToggleProvider()`:

```tsx
import { withToggleProvider } from '@hyphen/react-sdk';
import App from './App';

export default withToggleProvider({
  publicApiKey: 'public_...',
  applicationId: 'my-app',
  environment: 'production',
  defaultContext: {
    user: {
      id: 'user-123',
      email: 'user@example.com'
    }
  }
})(App);
```

### 2. Provider Component Pattern

Use the `ToggleProvider` component directly:

```tsx
import { ToggleProvider } from '@hyphen/react-sdk';
import App from './App';

function Root() {
  return (
    <ToggleProvider
      publicApiKey="public_..."
      applicationId="my-app"
      environment="production"
      defaultContext={{
        user: {
          id: 'user-123',
          email: 'user@example.com'
        }
      }}
    >
      <App />
    </ToggleProvider>
  );
}
```

### 3. Using the `useToggle` Hook

Access feature flags in any component:

```tsx
import { useToggle } from '@hyphen/react-sdk';

function MyComponent() {
  const toggle = useToggle();

  // Get boolean feature flag
  const isNewFeatureEnabled = toggle.getBoolean('new-feature', false);

  // Get string feature flag
  const theme = toggle.getString('theme', 'light');

  // Get number feature flag
  const maxItems = toggle.getNumber('max-items', 10);

  // Get object feature flag
  const config = toggle.getObject('ui-config', { layout: 'grid' });

  return (
    <div>
      {isNewFeatureEnabled && <NewFeature />}
      <p>Theme: {theme}</p>
      <p>Max Items: {maxItems}</p>
    </div>
  );
}
```

## Configuration Options

All configuration options are passed to the Toggle instance from `@hyphen/browser-sdk`:

| Option | Type | Required | Description |
|--------|------|----------|-------------|
| `publicApiKey` | string | Yes | Your Hyphen public API key (starts with `public_`) |
| `applicationId` | string | No | Application identifier |
| `environment` | string | No | Environment name (e.g., 'development', 'production') |
| `defaultContext` | object | No | Default evaluation context (user, targeting, etc.) |
| `horizonUrls` | string[] | No | Custom Horizon endpoint URLs for load balancing |
| `defaultTargetKey` | string | No | Default targeting key |

### Default Context

The `defaultContext` option allows you to set default user and targeting information:

```tsx
{
  defaultContext: {
    targetingKey: 'user-123',
    user: {
      id: 'user-123',
      email: 'user@example.com',
      name: 'John Doe',
      customAttributes: {
        plan: 'premium',
        region: 'us-west'
      }
    },
    ipAddress: '192.168.1.1',
    customAttributes: {
      deviceType: 'mobile'
    }
  }
}
```

## API Reference

### `ToggleProvider`

React context provider component that creates and provides a Toggle instance.

**Props:** Extends `ToggleOptions` from `@hyphen/browser-sdk` plus:
- `children`: ReactNode - Components to wrap with the provider

### `withToggleProvider(options)`

Higher-order component that wraps a component with `ToggleProvider`.

**Parameters:**
- `options`: `ToggleOptions` - Configuration for the Toggle instance

**Returns:** Function that accepts a component and returns a wrapped component

### `useToggle()`

React hook to access the Toggle instance from context.

**Returns:** `Toggle` instance from `@hyphen/browser-sdk`

**Throws:** Error if used outside of `ToggleProvider`

### Toggle Methods

The `Toggle` instance provides these methods:

- `getBoolean(key, defaultValue, options?)` - Get a boolean feature flag
- `getString(key, defaultValue, options?)` - Get a string feature flag
- `getNumber(key, defaultValue, options?)` - Get a number feature flag
- `getObject<T>(key, defaultValue, options?)` - Get an object feature flag
- `get<T>(key, defaultValue, options?)` - Generic getter for any type

All methods accept an optional `options` parameter for context overrides:

```tsx
const isEnabled = toggle.getBoolean('feature-key', false, {
  context: {
    user: { id: 'different-user' }
  }
});
```

## TypeScript Support

The SDK is written in TypeScript and provides full type definitions out of the box.

```tsx
import type { ToggleProviderProps } from '@hyphen/react-sdk';

const config: ToggleProviderProps = {
  publicApiKey: 'public_...',
  applicationId: 'my-app',
  children: <App />
};
```

## Examples

### Conditional Rendering

```tsx
function FeatureFlag({ flagKey, children }) {
  const toggle = useToggle();
  const isEnabled = toggle.getBoolean(flagKey, false);

  return isEnabled ? <>{children}</> : null;
}

// Usage
<FeatureFlag flagKey="new-dashboard">
  <NewDashboard />
</FeatureFlag>
```

### A/B Testing

```tsx
function ABTest() {
  const toggle = useToggle();
  const variant = toggle.getString('homepage-variant', 'control');

  switch (variant) {
    case 'variant-a':
      return <HomepageVariantA />;
    case 'variant-b':
      return <HomepageVariantB />;
    default:
      return <HomepageControl />;
  }
}
```

### Dynamic Configuration

```tsx
function ConfigurableComponent() {
  const toggle = useToggle();
  const config = toggle.getObject('component-config', {
    maxItems: 10,
    showImages: true,
    layout: 'grid'
  });

  return (
    <Component
      maxItems={config.maxItems}
      showImages={config.showImages}
      layout={config.layout}
    />
  );
}
```

# Contributing

We welcome contributions to the Hyphen Node.js SDK! If you have an idea for a new feature, bug fix, or improvement, please follow the [Contribution](./CONTRIBUTING.md) guidelines and our [Code of Conduct](./CODE_OF_CONDUCT.md).

# License and Copyright
This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.
The copyright for this project is held by Hyphen, Inc. All rights reserved.