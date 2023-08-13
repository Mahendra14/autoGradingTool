
```
Design Document for my approach:
```

## Project Description
Auto Grading Tool to help grade student assigments effectively and efficiently without any hassle. This will be a full end-to-end application with ability to distinguish between the login entities, and able to grade multiple assignments parallely. Below are the high level steps to follow:

## Front-End Implementation

- Develop a web interface where students can submit their code solutions via their Device, Github Repos or Replit.
- Provide clear instructions on how to format their code and submit their solutions.
- Develop another web interface where teachers can update the assignments and manually grade if needed.
- Develop a common playground for students and teachers to interact on the code quality.

## Back-End Infrastructure:

- Set up a server to handle incoming code submissions from students.
- Implement a authentication to ensure that only authorized students and teachers can access and submit their solutions/questions.


# Code Execution

- Set up a secure and isolated environment for executing student code. Containers can achieve this easily.
- Choose a programming language or multiple languages that the tool will support for code execution. ( Initially trying to support only cpp)
- Execute submitted code and capture its output and compare it with predefined outputs and store this under the student specific results folder.
- Write APIs catering this functionality to the Front-End platform.

# Test Case Management

- Define a set of test cases for each coding exercise. These test cases should cover different scenarios and edge cases to thoroughly evaluate the correctness of the code.
- Associate expected outputs with each test case in a different output file.

# Grading Logic
- Compare the actual output of the student's code with the expected output for each test case.
- Deduct points for failed test cases.
- Assign scores based on the number of passed test cases and the overall correctness of the solution.

# Reporting and Analytics:

- Provide instructors with tools to view aggregated class performance, individual student scores, and statistics.
- Generate reports that highlight areas where students are struggling the most.