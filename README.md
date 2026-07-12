# WanderNest

WanderNest is a full-stack cabin discovery and booking application. The React frontend provides cabin browsing, wishlists, reviews, AI trip planning, bookings, and Razorpay checkout. The Spring Boot backend exposes the REST API and persists users, cabins, bookings, reviews, wishlists, and payments.

## Run locally

1. Create `backend/src/main/resources/application-local.properties` with your local database and provider credentials. It is intentionally ignored by Git.
2. Start the backend with Java 21 and Maven: `./mvnw spring-boot:run` (or `mvnw.cmd spring-boot:run` on Windows).
3. In `frontend`, run `npm install` once and then `npm run dev`.

The frontend is configured to call the deployed API. To use a local backend, set the Axios `baseURL` in `frontend/src/services/api.js` to `http://localhost:8080/api/v1`.

## Required backend environment values

`DB_URL`, `DB_USERNAME`, `DB_PASSWORD`, `JWT_SECRET`, `CLOUDINARY_CLOUD_NAME`, `CLOUDINARY_API_KEY`, `CLOUDINARY_API_SECRET`, `GEMINI_API_KEY`, `RAZORPAY_KEY_ID`, and `RAZORPAY_KEY_SECRET`.
A modern full-stack cabin booking system built with React, Spring Boot, and MySQL.
