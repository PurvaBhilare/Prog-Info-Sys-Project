# Prog-Info-Sys-Project

Student Name - Purva Bhilare
Number as per student card - 20040706

Programme: MSc in Information Systems with Computing

Lecturer Name: Paul Laird

Module/Subject Title: B9IS123 PROGRAMMING FOR INFORMATION SYSTEMS

Assignment Title: Inventory Management System

By submitting this assignment, I am confirming that:
● This assignment is all my own work;
● Any sources used have been referenced;
● I have followed the Generative AI instructions/ scale set out in the Assignment Brief;
● I have read the College rules regarding academic integrity in the QAH Part B Section 3, and the Generative AI Guidelines, and understand that penalties will be applied accordingly if work is found not to be my/our own.
● I understand that all work submitted may be code-matched report to show any similarities with other work.

Link to report :

https://docs.google.com/document/d/10lVDAWjaUIrtt58nIpeUOsK94Wx8X8mF6mejrr8UjOg/edit?tab=t.0

References given in the report

Explanation for the web-socket issue that I was facing. I troubleshooted this issue on chatgpt and following is the explanation since I am using the live server:
If you're not using WebSockets in your project but you're seeing an error related to ws://127.0.0.1:5500/Prog-Info-Sys-Project//ws, there might be a misconfiguration or issue within the development environment or toolchain you're using. This URL typically indicates that the system is trying to establish a WebSocket connection, even though you're not explicitly using one.

Here are some possible reasons why you're seeing this WebSocket URL:

1. Live Server or Development Environment Misconfiguration
   If you're using a tool like Live Server (for local web development), it sometimes tries to establish a WebSocket connection for live reloading (to auto-refresh your browser when changes are made). The ws:// URL is often used by Live Server for this purpose.
   If you're using VSCode with the Live Server extension, it could be trying to open a WebSocket connection to monitor changes to your files.
   Solution: Check if Live Server (or any other similar tool) is configured correctly or disable the auto-reload feature if it's unnecessary for your project.
2. Browser Developer Tools
   In some cases, the browser's developer tools might try to establish WebSocket connections for debugging purposes, even if your application itself isn't using WebSockets.
   Solution: Check the browser's console and network tabs for any errors or details that might explain why the WebSocket request is being made.
3. Path Issues or Redirects in Your Server/Project Setup
   It’s possible that a misconfigured path or redirect in your development setup (e.g., in a build tool like Webpack, or a local web server) is unintentionally referencing a WebSocket endpoint.
   Solution: Check any configuration files related to your local server or development environment. Ensure that the path /Prog-Info-Sys-Project//ws isn’t being unintentionally generated or used somewhere in the system.
4. File Structure or Extra Slashes
   Sometimes, if your file paths or URLs contain extra slashes or malformed paths (like //), this can cause issues. The presence of // in the URL might also point to an error in URL routing or path resolution within your project.
   Solution: Check your file paths and URLs for any malformed references that could trigger this WebSocket request.
5. External Libraries or Plugins
   Even if you’re not directly using WebSockets, some external libraries or frameworks (e.g., for real-time updates, automatic reloads, or background tasks) might be attempting to use WebSockets without your explicit knowledge.
   Solution: Review any third-party libraries or plugins you're using in your project to see if any of them use WebSockets internally

After I mentioned I am using json-server and live server extension in VS Code following was the explanation for it:

Ah, thank you for the clarification! Since you're using json-server for data storage, the WebSocket URL you're seeing (ws://127.0.0.1:5500/Prog-Info-Sys-Project//ws) is likely related to Live Server or a similar tool, and not directly related to json-server.

Here’s why this might be happening and how you can fix it:

json-server and WebSockets
json-server itself does not use WebSockets. It is a simple tool that simulates a REST API for testing and development.
json-server typically runs as an HTTP server on a specific port (usually http://localhost:3000), where you can perform CRUD operations on your mock data.
The WebSocket (ws://) URL Issue
Since json-server does not use WebSockets, the ws:// connection you're seeing is most likely coming from another tool you're using for your front-end development, such as Live Server or a build tool like Webpack Dev Server.

These tools often use WebSockets for:

Live Reloading: Automatically refreshing your browser whenever changes are made to your code (e.g., HTML, CSS, JS).
Hot Module Replacement (HMR): A feature for updating code in the browser without a full reload.
Why You Might Be Seeing the WebSocket URL
If you’re running a development server (such as Live Server from VSCode), it might attempt to open a WebSocket connection for live reloading, even though json-server is only providing your data. Here's what might be happening:

Live Server or another tool is trying to connect to ws://127.0.0.1:5500/Prog-Info-Sys-Project//ws to handle live-reloading.
The double slashes (//) in the URL are probably due to an incorrectly formed path or a misconfiguration.

The search functionality that I am using in the project is something I had also implemented for the website I developed in my project for web and mobile technologies. I have created a git repository for the same and pushed the website I developed for this module as we previosly were not aked to create a repository for the project and were asked to submit the project on moddle directly. Following is the git repository to verify the search functionality I had implemented:

https://github.com/PurvaBhilare/RealEstateWebsiteProject
