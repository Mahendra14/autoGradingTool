const fs = require('fs');
const { execSync } = require('child_process');
const readline = require('readline');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});


function compileAndRun(codeFilename, input) {
    try {
        const compileCommand = `g++ .\\${codeFilename} -o ${codeFilename.replace('.cpp', '')}.exe`;
        execSync(compileCommand);
        const runCommand = `.\\${codeFilename.split("\/")[1]}\\${codeFilename.split("\/")[2].replace('.cpp', '')}.exe`;
        const output = execSync(runCommand, { input, encoding: 'utf-8' });
        return output;
    } catch (error) {
        console.log("caught up in error");
        throw new Error("Failed to run the given C++ Code");
    }
}


function gradeExercise(exerciseNumber, studentCodeFilename, studentFolderName) {
    const testCases = fs.readFileSync(`./${studentFolderName}/exercise${exerciseNumber}_input.txt`, 'utf-8').split('\n');
    const expectedOutputs = fs.readFileSync(`./${studentFolderName}/exercise${exerciseNumber}_output.txt`, 'utf-8').split('\n');
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


function main() {

    try {
        rl.question("Enter the number of exercises: ", async (numExercises) => {
            numExercises = parseInt(numExercises, 10);
            const exerciseResultsFolder = `results`;
            fs.mkdirSync(exerciseResultsFolder, { recursive: true });
            let exerciseOutput = ''; 
            const firstName = await new Promise((resolve) => {
                rl.question("Enter your first name: ", (input) => {
                    resolve(input);
                });
            });

            const lastName = await new Promise((resolve) => {
                rl.question("Enter your last name: ", (input) => {
                    resolve(input);
                });
            });

            const studentID = await new Promise((resolve) => {
                rl.question("Enter youExamplegradinr ID: ", (input) => {
                    resolve(input);
                });
            });
            let folderName = `${firstName}_${lastName}_${studentID}`;
            for (let exerciseNumber = 1; exerciseNumber <= numExercises; exerciseNumber++) {
                if (!fs.existsSync(folderName)) {
                    folderName = "Example";
                }
                const studentCodeFilename = `./${folderName}/exercise${exerciseNumber}_student.cpp`;

                exerciseOutput += `Grading Exercise ${exerciseNumber}...\n`;
                console.log(`Grading Exercise ${exerciseNumber}...`);

                if (fs.existsSync(studentCodeFilename)) {
                    console.log("Started grading");
                    let marks = gradeExercise(exerciseNumber, studentCodeFilename, folderName);
                    if (Number.isInteger(marks)) {
                        exerciseOutput += `Exercise ${exerciseNumber}: Number of Test Cases Passed are : ${marks - 1} \n`;
                    } else {
                        exerciseOutput += `Exercise ${exerciseNumber}: ${marks} \n`
                    }
                } else {
                    exerciseOutput += `No submission for Exercise ${exerciseNumber} \n`;
                }
                if (exerciseNumber === numExercises) {
                    let outputFile = `${exerciseResultsFolder}/${folderName}/grading_results.txt`; // Name of the output file
                    if (folderName === "Example") {
                        outputFile = `${exerciseResultsFolder}/grading_results.txt`
                    }
                    if (fs.existsSync(outputFile)) {
                        fs.writeFileSync(outputFile, exerciseOutput);
                    } else {
                        try {
                            fs.mkdirSync(`${exerciseResultsFolder}/${folderName}`);
                            console.log(`Folder "${folderName}" created successfully.`);
                        } catch (error) {
                            console.error(`An error occurred: ${error.message}`);
                        }
                        fs.writeFileSync(outputFile, exerciseOutput);
                    }
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