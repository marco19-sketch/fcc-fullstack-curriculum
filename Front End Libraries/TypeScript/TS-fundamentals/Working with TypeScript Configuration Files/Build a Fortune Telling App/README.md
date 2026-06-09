# Project Setup Guide

This guide outlines the necessary steps to set up your web project containing HTML, CSS, and TypeScript files in Visual Studio Code.

## Prerequisites

Ensure you have the following installed on your machine:

* [Visual Studio Code](https://code.visualstudio.com/)
* [Node.js](https://nodejs.org/) (Required for TypeScript compilation)

make sure you have TypeScript installed too:

```bash
    npm typescript -v
```

otherwise:

```bash
    npm i -g typescript
```

## Step-by-Step Instructions

### 1. File Structure

Ensure all your files are located in the same directory:

* `index.html`
* `style.css`
* `index.ts`

### 2. Compile the ts file 

```bash
    tsc index.ts 
```

### 3. Linking Files in HTML

Browsers cannot read TypeScript directly. You must link your CSS and the **compiled** JavaScript file in your `index.html`.

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>My Project</title>
    <link rel="stylesheet" href="style.css">
</head>
<body>
    <script src="index.js"></script>
</body>
</html>
