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
        const runCommand = `.\\${codeFilename.split("\/")[1]}\\${codeFilename.split("\/")[2].replace('.cpp', '')}.exe`;
        const output = execSync(runCommand, { input, encoding: 'utf-8' });
        return output;
    } catch (error) {
        console.log("caught up in error");
        throw new Error("Failed to run the given C++ Code");
    }
}

// Function to grade an exercise
function gradeExercise(exerciseNumber, studentCodeFilename) {
    const testCases = fs.readFileSync(`./Example/exercise${exerciseNumber}_input.txt`, 'utf-8').split('\n');
    const expectedOutputs = fs.readFileSync(`./Example/exercise${exerciseNumber}_output.txt`, 'utf-8').split('\n');
    let allTestsPassed = true;
    let exerciseMarks = 1;

    try {
        for (let testCaseNumber = 0; testCaseNumber < testCases.length; testCaseNumber++) {
            const testCase = testCases[testCaseNumber].trim().split(' ');
            const input = `${testCase[0]}\n${testCase[1]}`;
            const studentOutput = compileAndRun(studentCodeFilename, input);
            const expOutput = expectedOutputs[testCaseNumber].trim();
            const testPassed = (studentOutput.trim() === expOutput.trim());
            if (!testPassed) {
                console.log(`Exercise ${exerciseNumber}, Test Case ${testCaseNumber + 1}: Failed`);
            } else {
                console.log(`Exercise ${exerciseNumber}, Test Case ${testCaseNumber + 1}: Passed`);
                exerciseMarks++;
            }
        }
    } catch (error) {
        return error;
    }
    return exerciseMarks;
}

// Main function
function main() {

    try {
        rl.question("Enter the number of exercises: ", (numExercises) => {
            numExercises = parseInt(numExercises, 10);
            // Create a new folder for the exercise results
            const exerciseResultsFolder = `results`;
            fs.mkdirSync(exerciseResultsFolder, { recursive: true });
            const outputFile = `${exerciseResultsFolder}/grading_results.txt`; // Name of the output file
            let exerciseOutput = ''; // To store exercise grading output
            for (let exerciseNumber = 1; exerciseNumber <= numExercises; exerciseNumber++) {
                const studentCodeFilename = `./Example/exercise${exerciseNumber}_student.cpp`;

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