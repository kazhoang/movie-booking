# Movie Booking Test

<img src='.readme/1.png' width=300> <img src='.readme/2.png' width=300>

## 🌱 Prerequisites

Before running the project, ensure that you have the following installed:

- Node.js (version >= 18)
- React Native CLI
- Android SDK (for Android development)
- Xcode (for iOS development)

## ⚙️ Installation

1. Clone the repository:

```
git clone https://github.com/kazhoang/movie-booking.git
```

2. Navigate to the project directory:

# Movie Booking Test

<img src='.readme/1.png' width=300> <img src='.readme/2.png' width=300>

## 🌱 Prerequisites

Before running the project, ensure that you have the following installed:

- Node.js (version >= 18)
- React Native CLI
- Android SDK (for Android development)
- Xcode (for iOS development)

## ⚙️ Installation

1. Clone the repository:

```
git clone https://github.com/kazhoang/movie-booking
```

2. Navigate to the project directory:

```
cd movie-booking
```

3. Install the project dependencies:

```
yarn
```

***

- For iOS, Install the CocoaPods dependencies:

```
yarn pod
```

## Running the Application

### Android

```
```

yarn android

```

### IOS
### IOS

```

```
yarn ios
```

## Project Structure

The project follows a standard React Native structure:

```bash
├── android
├── ios
└── src
    ├── components
    ├── navigators
    ├── screens
    ├── services
    ├── theme
    ├── types
    ├── utils
    └── App.tsx
```

## 📚 Dependencies

The project utilizes the following key dependencies:

| Library                             | Category         | Version | Description                                                                      |
| ----------------------------------- | ---------------- | ------- | -------------------------------------------------------------------------------- |
| React Native                        | Mobile Framework | v0.74   | The best cross-platform mobile framework                                         |
| React                               | UI Framework     | v18     | The most popular UI framework in the world                                       |
| TypeScript                          | Language         | v5      | Static typechecking                                                              |
| React Navigation                    | Navigation       | v6      | Performant and consistent navigation framework                                   |
| React Native Reanimated             | UI               | v3      | Animations library for React Native                                              |
| React Native MMKV                   | Storage          | v2      | Key-value storage library for persisting application state                       |
| Detox                               | TestingLib       | v20     | E-E testing library                                                              |
| Redux                               | Storage          | v9      | Library for managing state                                                       |

For a complete list of dependencies, refer to the `package.json` file.

## 🏗️ Development

Detox:

To build and test for Android:

```
yarn detox:android:build
yarn detox:android:test
```

To build and test for iOS:

```
yarn detox:ios:build
yarn detox:ios:test
```

You can able to clean up the project with the following command

```
yarn clean
```
