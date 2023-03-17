# Runescape Trident Profit Calculator

A web application to calculate the costs, taxes, and profits of tridents in the game Runescape. Users can input values, and the calculator fetches the latest prices from the Runescape API and updates the displayed values accordingly. The application also includes an autoupdate feature and audio notifications based on user-defined profit thresholds.
Live demo here: https://osrs-trident-calc.netlify.app/

## How It's Made:

**Tech used:** HTML, CSS, JavaScript

The Runescape Trident Profit Calculator is built using HTML, CSS, and JavaScript. It features a custom class called Calculator in JavaScript that performs all the necessary calculations and updates the values displayed on the page.

## Features
Fetches latest item prices from Runescape API
Calculates trident costs, taxes, and profits based on user input
Automatically updates prices and calculations every two minutes with autoupdate feature
Plays an AI-generated audio notification when the profit per trident is higher than the user-defined threshold
Responsive design for different devices

## Optimizations
The application has been optimized for performance, efficiency, and readability. The JavaScript code leverages the Calculator class to modularize the calculations and rendering of results. The CSS uses flexbox for responsive design and easier alignment of elements.

## Lessons Learned:
Through the development of this project, several valuable lessons were learned:

- Building modular code using classes improves maintainability and readability.
- Leveraging APIs to fetch real-time data enhances the functionality and relevance of applications.
- Implementing additional features, like audio notifications and autoupdate, can improve user experience.
