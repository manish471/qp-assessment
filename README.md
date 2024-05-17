# Grocery Booking API

## Overview

Grocery Booking API is a Node.js-based application for managing grocery items and orders. It provides endpoints for both admin and user roles, allowing for the addition, viewing, updating, and booking of grocery items. The API is built using Express and TypeScript, and it utilizes MySQL for database management.

## Features

- Admin can:
  - Add new grocery items
  - View existing grocery items
  - Remove grocery items
  - Update details of grocery items (name, price, inventory count)
  - Manage inventory levels of grocery items
- User can:
  - View available grocery items
  - Book multiple grocery items in a single order

## Technologies Used

- Node.js
- Express
- TypeScript
- MySQL
- Docker
- Swagger for API documentation

## Getting Started

### Prerequisites

- Docker and Docker Compose

### Installation

1. **Clone the repository:**

   ```bash
   git clone https://github.com/manish471/qp-assessment.git
   cd qp-assessment/grocery-booking-api
   docker-compose up --build

### API Documentation Endpoint

The API documentation is available through Swagger. Once the application is running, you can access the Swagger UI at:

http://localhost:3000/api-docs/
