#include <iostream>
#include <string>

int main(int argc, char* argv[]) {
    if (argc > 1) {
        std::string input = argv[1];  // Take the input from the command-line argument
        std::cout << "You entered: " << input << '\n';
    } else {
        std::cout << "No input provided.\n";
    }
    return 0;
}
