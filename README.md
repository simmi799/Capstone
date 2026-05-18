QA Automation Capstone: Project Presentation

Welcome to the Capstone Project Presentation! This document serves as a high-level overview of the QA testing strategy, the application being tested, and the specific goals of this project.

1. Website Details (The "Application Under Test")

Application Name: MockMart E-Commerce
Type: Custom-Built Web Application

A Self-Made Testing Ground

This website was custom-built specifically for this capstone project. Creating our own platform provides a stable testing environment where we have complete control over the application, ensuring our tests do not unexpectedly break due to live updates.

What exactly is being tested?

The testing framework targets key aspects of the user experience:

Functional Workflows: Ensuring users can successfully navigate from login to checkout.

UI/UX Responsiveness: Testing the layout across different screen sizes.

Form Validations: Checking mandatory fields and error messages when users input incorrect data.

Data Verification: Ensuring the correct information is displayed and processed throughout the shopping journey.

2. Project Objectives

The primary goal of this capstone is to demonstrate a comprehensive Quality Assurance testing cycle.

|

| Objective | Description |
| End-to-End Coverage | Execute 120 test cases across 8 core application services. |
| Maintainability | Structure test files logically so they are easy to read, update, and manage over time. |
| Reliability | Create stable tests that provide accurate, consistent feedback on the application's health. |
| Defect Prevention | Proactively identify user interface bugs and logical workflow errors. |

3. Application Modules

The e-commerce application is divided into 8 distinct services. Each acts as a standalone testing module.

| Module Name | Core Functionality Tested |
| Authentication | User registration, login validation, and logout functionality. |
| Product | Catalog display, product details, and search functionality. |
| Cart | Adding or removing items, updating quantities, and price calculations. |
| Address/Shipping | Address formatting, zip code validation, and shipping costs. |
| User Profile | Updating personal information and changing passwords. |
| Customer Support | Contact form submission and required field validation. |
| API Internal | Verifying the backend successfully sends and receives data. |
| Payment | Validating credit card number formats and checking success/failure messages. |

4. Framework Folder Structure

The project uses a clean, simple directory structure to keep test logic and data organized.

QA-Capstone-Framework/
 ├── pages/              (Organized views of the website pages)
 ├── tests/              (The actual step-by-step test scripts)
 ├── test-data/          (Mock information used during testing, like sample users)
 ├── utils/              (Helper functions to keep tests clean)
 └── reports/            (Auto-generated documents showing pass/fail results)



5. Estimated Test Case Average

To ensure comprehensive testing, the scope is evenly balanced across the application.

Total Test Cases Required: 120 Minimum

Total Microservices: 8

Average Distribution: 15 Test Cases per service

Distribution Breakdown:

| Service Module | Positive Scenarios | Negative Scenarios | Boundary/Edge Cases | Total |
| Authentication | 5 | 7 | 3 | 15 |
| Product | 8 | 4 | 3 | 15 |
| Cart | 6 | 6 | 3 | 15 |
| Shipping | 5 | 7 | 3 | 15 |
| User Profile | 7 | 5 | 3 | 15 |
| Customer Support | 6 | 6 | 3 | 15 |
| API Internal | 10 | 5 | 0 | 15 |
| Payment | 4 | 8 | 3 | 15 |
| GRAND TOTAL |  |  |  | 120 |

6. Conclusion

This Capstone Project represents a full Quality Assurance lifecycle. By utilizing a custom-made e-commerce application and a rigorous matrix of 120 test cases, this framework ensures that the MockMart platform is robust and reliable.

The successful execution of this suite showcases a clear understanding of testing principles, logical test organization, and effective quality reporting.
