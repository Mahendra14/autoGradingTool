#include <iostream>

using namespace std;

// int addNumbers(int a, int b) {
//   int sum = a + b;
//   return sum;
// }

// int main() {
//   int num1 = 2;
//   int num2 = 5;

//   int sum = addNumbers(num1, num2);

//   cout << "The sum of " << num1 << " and " << num2 << " is: " << sum << endl;

//   return 0;
// }
int main() {
    int num1, num2;
    std::cin >> num1 >> num2;
    int sum = num1 + num2;
    std::cout << sum << std::endl;
    return 0;
}