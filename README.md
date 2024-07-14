<h1 align="center">Tech Test</h1>

## Introduction

This repository contains my solution to a technical test. The aim of the test is to integrate weather information to the National Trust property information pages to enhance user experience and encourage visits, whilst following specific requirements and constraints.

## Table of Contents
1. [Introduction](#introduction)
2. [Requirements and Constraints](#requirements-and-constraints)
3. [Overview for a Non-Technical Audience](#overview-for-a-non-technical-audience)
4. [Before and After](#before-and-after)
5. [Implementation Plan](#implementation-plan)
6. [Reflections](#reflections)
7. [Future Improvements](#future-improvements)
8. [Installation](#installation)
9. [Running this Project](#running-this-project)


### Requirements and Constraints
1. Integrate weather information into the National Trust property pages.
2. Implement the solution using a single JavaScript script that can be added directly to the National Trust website.
3. Cannot modify the National Trust website other than adding the JavaScript script.
4. Include an A/B test to measure the impact on user behavior.
5. Use localStorage, sessionStorage, cookies, and the global JavaScript scope to leverage existing data.
6. The script should be executable via the browser's developer console.
7. Include an overview for a non-technical audience 

## Overview for a Non-Technical Audience

To enhance the visitor experience, I have added a feature to display the current weather for a National Trust property on their information pages. This allows visitors to plan their trips better, potentially increasing visitation rates.

Using JavaScript, the code fetches and displays weather data for the property’s location without altering the existing website structure. Also, there is an A/B test to show the weather information to a random half of the visitors. This allows me to analyse how showing weather information affects visitor behavior.

## Before and After
![Screenshot 2024-07-14 175547](https://github.com/user-attachments/assets/afb74af4-1554-4e58-8c58-a6eba57cbc57)
![Screenshot 2024-07-14 175725](https://github.com/user-attachments/assets/17bc01ed-afd5-4a82-a31b-da94cfc0c0da)


## Implementation Plan

### MVPs

1. Understand the mock API response (use Postman).

2. Create a functional GET request in VS code with the provided API endpoint.

3. Learn how to use Snippets in Dev Tools and inject the code into the National Trust website.

4. Find the property’s longitude and latitude in the existing HTML and add that to the request to make the response unique to each property.

5. Test it.

## Reflections

My current solution uses the mock API endpoint and displays the weather data for a hardcoded location. It uses an A/B test to show the weather information to a random half of the visitors. I spent some time exploring how to measure the outcomes of the A/B test but struggled to complete this from writing the tests, using localStorage, and console logging the outcomes within Snippets. I learned that dedicated analytics tools like Google Analytics, Mixpanel, or others are typically recommended for measuring test outcomes. Some analytics include measuring page views, clicks, time on page, and bounce rate.

I also faced challenges when implementing the functionality which takes each property's unique longitude and latitude to fetch weather data. I reviewed the existing HTML and found the longitude and latitude in the Google Maps URL within the HTML which is currently being used within the "Getting here" section; this shows the user the property's location on Google Maps to assist with directions and travel. I explored functions which take the URL as a parameter, converted it from a string to an object, extracted the query parameters, and specifically identified the "destination" parameters in the URL to access the longitude and latitude; before splitting and decoding the coordinates and parsing it as numbers to be used in the GET request. However, I ran out of time to continue debugging and if I were to continue, I would explore potentially changing the API to the Open Weather Map as this could handle the differing locations more effectively than the mock API.

## Future Improvements

- The script relies on hardcoded latitude and longitude values. For a real-world implementation, these values should be dynamically retrieved based on the property.
- The mock API provides static weather data. In a production environment, a live weather API should be used.
- Incorporate automated tests (unit, integration, or end-to-end) to ensure the script's functionality remains robust and reliable over time.
- Improve the user interface to be more consistent with current site

## Installation
To use the script on the National Trust property pages:
1. Copy the JavaScript code from `index.js`.
2. Open the property page in your browser.
3. Open the Developer Tools (Windows press `Ctrl + shift + J` or Mac press `Command + shift + J`).
4. Navigate to the Console tab.
5. Paste the JavaScript code into the console and press Enter.

## Running this Project
To run this project locally, you will need to do the following: <br><br>

Clone the project

```yaml
  git clone https://github.com/KelseyBaker262/nationaltrust-weather-implementation.git
```

Go to the project directory

```yaml
  cd nationaltrust-weather-implementation
```
Open `index.js` in your preferred text editor
