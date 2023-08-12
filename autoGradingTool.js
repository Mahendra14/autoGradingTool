const fs = require('fs');
const { execSync } = require('child_process');
const readline = require('readline');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});


// Function to compile and run C++ code
function compileAndRun(codeFilename, input) {
    try {
        // Compile the code
        const compileCommand = `g++ .\\${codeFilename} -o ${codeFilename.replace('.cpp', '')}.exe`;
        execSync(compileCommand);
        // Run the compiled executable
        const runCommand = `.\\${codeFilename.replace('.cpp', '')}.exe`;
        const output = execSync(runCommand, { input, encoding: 'utf-8' });
        return output;
    } catch (error) {
        console.log("caught up in error");
        throw new Error("Failed to run the given C++ Code");
    }
}

// Function to grade an exercise
function gradeExercise(exerciseNumber, studentCodeFilename) {
    const inputFilename = `exercise${exerciseNumber}_input.txt`;
    const expectedOutputFilename = `exercise${exerciseNumber}_output.txt`;

    const studentOutput = compileAndRun(studentCodeFilename, inputFilename);
    const expectedOutput = fs.readFileSync(expectedOutputFilename, 'utf-8');
    return studentOutput.trim() === expectedOutput.trim();
}

// Main function
function main() {

    try {
        rl.question("Enter the number of exercises: ", (numExercises) => {
            numExercises = parseInt(numExercises, 10);
            const outputFile = 'grading_results.txt'; // Name of the output file
            let exerciseOutput = ''; // To store exercise grading output
            for (let exerciseNumber = 1; exerciseNumber <= numExercises; exerciseNumber++) {
                const studentCodeFilename = `exercise${exerciseNumber}_student.cpp`;

                exerciseOutput += `Grading Exercise ${exerciseNumber}...\n`;
                console.log(`Grading Exercise ${exerciseNumber}...`);

                if (fs.existsSync(studentCodeFilename)) {
                    console.log("Started grading");
                    let marks = gradeExercise(exerciseNumber, studentCodeFilename);
                    if (Number.isInteger(marks)) {
                        exerciseOutput += `Exercise ${exerciseNumber}: Number of Test Cases Passed are : ${marks - 1} \n`;
                    } else{
                        exerciseOutput += `Exercise ${exerciseNumber}: ${marks} \n`
                    }
                } else {
                    exerciseOutput += `No submission for Exercise ${exerciseNumber} \n`;
                }
                if (exerciseNumber === numExercises) {
                    fs.writeFileSync(outputFile, exerciseOutput);
                    rl.close();
                }
            }
        }
        );
    } catch (error) {
        console.log("OOPS!! Error Unknown");
    }
}

main();