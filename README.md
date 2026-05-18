🌟 QA Automation Capstone: Project Presentation

Welcome to the Capstone Project Presentation! This document serves as a high-level overview of the automation strategy, the application under test, and the specific goals of this QA initiative.

🏗️ 1. Website Details (The "Application Under Test")

Application Name: MockMart E-Commerce (Custom Built)
Architecture: HTML5, CSS3, Vanilla JavaScript, Mock REST APIs

🛠️ A Self-Made Testing Ground

Unlike testing a public production website where backend changes or A/B testing can break automation scripts, this website was custom-built from the ground up specifically for this capstone project. * Why self-made? It provides absolute control over the DOM elements, locators (IDs, classes), and application state.

Design: It mimics a modern, real-world E-Commerce platform, complete with dynamic rendering, state management (Local Storage/Session Storage), and asynchronous API simulations.

🔍 What exactly is being tested? (High-Level Scope)

Instead of just clicking buttons, the automation framework targets specific software quality pillars:

Functional Workflows: Ensuring users can successfully navigate from login to checkout.

State Management: Verifying the cart retains items after page reloads.

UI/UX Responsiveness: Testing layout stability across simulated device viewpoints.

Form Validations: Checking boundary values, mandatory fields, and error handling in user inputs.

Data Integrity: Ensuring the API returns the correct payloads and HTTP status codes.

🎯 2. Project Objectives

The primary goal of this capstone is to demonstrate enterprise-level Quality Assurance engineering.

|

| Objective | Description |
| End-to-End Coverage | Achieve 100% execution of 120 test cases across 8 core services. |
| Maintainability | Implement the Page Object Model (POM) to ensure test scripts survive UI changes. |
| Speed & Reliability | Utilize Playwright's auto-waiting and parallel execution features for rapid feedback. |
| Data-Driven Testing | Separate test logic from test data using structured JSON files. |
| Defect Prevention | Identify UI bugs, logical flaws, and security vulnerabilities (like XSS injections) before deployment. |

🧩 3. Application Modules

The custom-built website is divided into 8 distinct micro-services. Each acts as a standalone testing module.

| Icon | Module Name | Core Functionality Tested |
| 🔐 | Authentication | User Registration, Login validation, Session tokens, Logout. |
| 🛍️ | Product | Catalog rendering, Search filtering, Stock status, Responsiveness. |
| 🛒 | Cart | Adding/Removing items, Price calculations, Persistent storage. |
| 📍 | Address/Shipping | Address formatting, Zip code validation, Shipping cost calculation. |
| 👤 | User Profile | Updating personal info, Password resets, Avatar image handling. |
| 💬 | Customer Support | Contact form submission, Input sanitization, Live chat mockup. |
| 🔌 | API Internal | Backend data retrieval, POST request validations, Status code checks. |
| 💳 | Payment | Credit card validation (Luhn algorithm checks), Mock transaction success/failure. |

📂 4. Framework Folder Structure

A clean, scalable architecture is the backbone of this QA project. We utilize a strict separation of concerns.

📦 QA-Capstone-Framework
 ┣ 📂 .github/workflows      👉 CI/CD Pipeline configurations
 ┣ 📂 pages                  👉 Page Object Model (POM) Classes
 ┃ ┣ 📜 LoginPage.js         
 ┃ ┣ 📜 CartPage.js          
 ┃ ┗ 📜 CheckoutPage.js      
 ┣ 📂 tests                  👉 Playwright Test Scripts (Specs)
 ┃ ┣ 📜 01_auth.spec.js      
 ┃ ┣ 📜 02_cart.spec.js      
 ┃ ┗ 📜 08_payment.spec.js   
 ┣ 📂 test-data              👉 Mock data for Data-Driven Testing
 ┃ ┣ 📜 valid_users.json     
 ┃ ┗ 📜 cc_numbers.json      
 ┣ 📂 utils                  👉 Reusable helper functions
 ┃ ┗ 📜 data_generator.js    
 ┣ 📂 playwright-report      👉 Auto-generated HTML Test Reports
 ┣ 📜 playwright.config.js   👉 Framework configuration (Browsers, timeouts)
 ┗ 📜 README.md              👉 Framework setup instructions



📊 5. Estimated Test Case Average

To ensure comprehensive testing without bloat, the test scope is mathematically balanced across the application.

Total Test Cases Required: 120 Minimum

Total Microservices: 8

Average Distribution: 15 Test Cases per service

📈 Distribution Breakdown:

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

🚀 6. Conclusion

This Capstone Project represents a full-cycle Quality Assurance lifecycle. By utilizing a self-made web application, we remove external dependencies and network flakiness, allowing for a pure, unhindered demonstration of automated testing capabilities.

Through the power of Playwright, the structured design of the Page Object Model, and a rigorous matrix of 120 test cases, this framework ensures that the MockMart application is robust, reliable, and ready for end-users.

The successful execution of this suite proves readiness for enterprise-level automation roles, showcasing skills in framework architecture, web element manipulation, and quality reporting.
