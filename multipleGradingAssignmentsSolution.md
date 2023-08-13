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