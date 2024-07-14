# Tech Test

## Introduction

This repository contains my solution to the technical test. The aim of the test is to integrate weather information to the National Trust property information pages. This readme includes the implementation plan and a non-technical overview of the solution.

## Overview for a Non-Technical Audience

To enhance the visitor experience, I have added a feature to display the current weather for a National Trust property on their information pages. This allows visitors to plan their trips better, potentially increasing visitation rates.

Using JavaScript, the code fetches and displays weather data for the property’s location without altering the existing website structure. Also, there is an A/B test to show the weather information to a random half of the visitors and measure the impact on visitor behavior.

## Implementation Plan

### MVPs

1. Understand the mock API response (use Postman).

2. Create a functional GET request in VS code with the provided API endpoint.

3. Learn how to use Snippets in Dev Tools and inject the code into the National Trust website.

4. Find the property’s longitude and latitude in the existing HTML and add that to the request to make the response unique to each property.

5. Test it.

### Key Requirements

1. Display weather information for National Trust properties.
2. Use JavaScript to fetch weather data and display it.
3. Cannot modify the National Trust website other than adding my JavaScript script.
4. A/B test to measure the impact on user behavior.

### Constraints

1. Single JavaScript Script: Solution must be contained within a single script.
2. Existing Functionality: Cannot alter existing site functionality, just add to it.
3. Data Storage: Use localStorage, sessionStorage, cookies, and global JS scope to leverage existing data.

## Reflections and Future Functionality

My current solution uses the mock API endpoint and displays the weather data for a hardcoded location. It uses an A/B test to show the weather information to a random half of the visitors. I spent some time exploring how to measure the outcomes of the A/B test but struggled to complete this from writing the tests, using localStorage, and console logging the outcomes within Snippets. I learned that dedicated analytics tools like Google Analytics, Mixpanel, or others are typically recommended for measuring test outcomes. Some analytics include measuring page views, clicks, time on page, and bounce rate.

I also faced challenges when implementing the functionality which takes each property's unique longitude and latitude to fetch weather data. I reviewed the existing HTML and found the longitude and latitude in the Google Maps URL within the HTML which is currently being used within the "Getting here" section; this shows the user the property's location on Google Maps to assist with directions and travel. I explored functions which take the URL as a parameter, converted it from a string to an object, extracted the query parameters, and specifically identified the "destination" parameters in the URL to access the longitude and latitude; before splitting and decoding the coordinates and parsing it as numbers to be used in the GET request. However, I ran out of time to continue debugging and if I were to continue, I would explore potentially changing the API to the Open Weather Map as this could handle the differing locations more effectively than the mock API.
