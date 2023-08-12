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