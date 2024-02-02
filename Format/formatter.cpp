#include <iostream>
#include <sstream>  // Add this line
#include "./pugixml.hpp"

int main() {
    // Your XML string
    const char* xmlString = "<root><element1>value1</element1><element2>value2</element2></root>";

    // Parse the XML string
    pugi::xml_document doc;
    pugi::xml_parse_result result = doc.load_string(xmlString);

    // Check for parsing errors
    if (!result) {
        std::cerr << "Error parsing XML: " << result.description() << std::endl;
        return 1;
    }

    // Output the XML in a human-readable format
    std::stringstream ss;
    doc.save(ss, "    ");  // The second argument is the indentation string (e.g., four spaces)

    std::cout << ss.str() << std::endl;

    return 0;
}
