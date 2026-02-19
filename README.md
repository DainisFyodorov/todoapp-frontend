# ToDoList App - Frontend

A modern, responsive web interface for the ToDoList application, built with **React** and **TypeScript**.<br><br>
Backend part of web application can be found here: [link](https://github.com/DainisFyodorov/todoapp-backend)

## Description
This is the client-side application for the ToDoList application. It provides a seamless user experience for managing tasks, featuring routes, real-time UI updates, and a clean, intuitive design.<br>
The app communicates with a Spring Boot REST API to persist data.

## Tech Stack
- React 19
- TypeScript
- React Router Dom
- Bootstrap
- Fetch API
- Context API (for global state management)

## Main Features
- Responsive Task Board: Create, complete, and delete tasks with instant UI feedback
- Authentication Flow: Custom Login and Registration pages with client-side validation
- Protected Routes: Secure access to the dashboard - unauthenticated users are automatically redirected to main page
- Session Management: integration with backend sessions using ```credentials: 'include'```
- Error Handling: User-friendly alerts for failed login attempts or another errors

- User Authentication: registration and authentication with data validation
- Task Management: create, edit, delete and get list of tasks
- Security: access to task management for authenticated users only
- REST API: Clear response structure (JSON) and use of correct HTTP statuses (200, 201, 401, 404)

## Installation
1. Make sure that you have **Node.js** and **npm** installed
2. Clone the repository
3. Install dependencies using:
```
npm install
```
5. Create `.env` file in the root directory and configure Backend API URL:
```
REACT_APP_API_URL=http://localhost:8080
```
7. Start the development server:
```
npm start
```
The application will be available at: ```http://localhost:3000/```

**Notice:**: Ensure the (Backend API)[the frontend part of the application](https://github.com/DainisFyodorov/todoapp-frontend) is running on port 8080 for the application to function correctly.

## Project Structure
- `src/layouts`: Main application views (LoginPage, RegisterPage, HomePage, TodosPage)
- `src/models`: Models
- `src/utils`: Helper functions

## Status
In active development.
