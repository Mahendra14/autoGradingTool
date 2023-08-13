# Running Multiple Coding Exercises with Docker

To run multiple coding exercises without creating a separate Docker image for each exercise, follow the below approach:

## Execute the Code snippets Dynamically

- Create a single Docker image with the necessary C++ environment ( base image and the dependencies if needed)
- Develop an automation script or program that can take code snippets as input.

## Code Management

- Store each code snippet in separate files under a folder. Ex: Maintain a separate folder for each student and store his/her respective files in that folder.
- Make sure each code snippet is self contained and have all the related dependencies required ( Packages, Input Files( Test Cases ), Expected Output Files)

## Automation Script Design 

- Develop an automation script that reads the code snippets from the folder one by one and runs them inside a Docker container. 
- As an Initial run, try to automate it to run on the local system.
- The script can compile and execute each code snippet sequentially.
- This will also ensure to continue irrespective of whether the previous code snippet executed successfully or not.

## Code Snippet Isolation
- For each code snippet, create a new Docker container instance.
- This ensures that each coding exercise is executed in its own isolated environment.

## Output Storage

- Capture the output, errors, and exit status of each code execution in a grading file stored under the results folder pertaining to the student folder.
- This information can be used to showcase in the application along with the analysis

## Feedback and Grading

- Based on the results of each code snippet's execution, provide feedback to the students and assign grades. ( Can be manual grading or automated as required )

## Parallel Execution 

- If your system resources allow, we can also use parallel execution of coding snippets as the containers are isolated .

By following the above approach, we can execute multiple coding exercises without the need to create a unique Docker image for each coding exercise. Instead, you use a single Docker image with the required C++ environment setup and dynamically feed different code snippets from a student specific folder for execution. This approach can reduce the overhead of creating and managing n number of docker images for the exercises.



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


## Code Execution

- Set up a secure and isolated environment for executing student code. Containers can achieve this easily.
- Choose a programming language or multiple languages that the tool will support for code execution. ( Initially trying to support only cpp)
- Execute submitted code and capture its output and compare it with predefined outputs and store this under the student specific results folder.
- Write APIs catering this functionality to the Front-End platform.

## Test Case Management

- Define a set of test cases for each coding exercise. These test cases should cover different scenarios and edge cases to thoroughly evaluate the correctness of the code.
- Associate expected outputs with each test case in a different output file.

## Grading Logic
- Compare the actual output of the student's code with the expected output for each test case.
- Deduct points for failed test cases.
- Assign scores based on the number of passed test cases and the overall correctness of the solution.

## Reporting and Analytics:

- Provide instructors with tools to view aggregated class performance, individual student scores, and statistics.
- Generate reports that highlight areas where students are struggling the most.