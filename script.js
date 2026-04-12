/* ═══════════════════════════════════════════════════════════════
   42 C TRAINER — script.js v4.0
   Structure:
     1. DATA — Questions by level (beginner / intermediate / expert)
     2. DATA — Challenges by level
     3. DATA — Test cases for run-code
     4. STATE
     5. UTILITIES (shuffle, showScreen, progress, XP, storage, timer)
     6. EDITOR — syntax highlight sync
     7. CODE RUNNER
     8. ACHIEVEMENTS & WEAKNESS
     9. QUIZ LOGIC
    10. CHALLENGE LOGIC
    11. RESULTS & COACH
    12. NAVIGATION
    13. INIT
═══════════════════════════════════════════════════════════════ */


/* ══════════════════════════════════════════════════════════════
   1. DATA — QUESTIONS BY LEVEL
══════════════════════════════════════════════════════════════ */

const QUESTIONS = {

  beginner: [
    {
      topic: "VARIABLES",
      q: "What is the correct way to declare an integer variable named <code>age</code> with value 21?",
      options: ["int age = 21;", "integer age = 21;", "var age = 21;", "age int = 21;"],
      answer: 0,
      explain: "In C, variables are declared as: type name = value; — so int age = 21; is correct."
    },
    {
      topic: "VARIABLES",
      q: "What does the <code>%d</code> format specifier print?",
      options: ["A float", "A decimal integer", "A character", "A string"],
      answer: 1,
      explain: "%d is for signed decimal integers. Use %f for floats, %c for chars, %s for strings."
    },
    {
      topic: "VARIABLES",
      q: "What is the output of: <code>printf(\"%d\", 10 / 3);</code>",
      options: ["3.33", "3", "4", "Error"],
      answer: 1,
      explain: "Integer division truncates toward zero: 10 / 3 = 3 in C."
    },
    {
      topic: "LOOPS",
      q: "How many times does this loop execute? <code>for (int i = 0; i < 5; i++)</code>",
      options: ["4", "5", "6", "Infinite"],
      answer: 1,
      explain: "i starts at 0, runs while i < 5 (0,1,2,3,4) — exactly 5 iterations."
    },
    {
      topic: "LOOPS",
      q: "Which keyword skips the rest of a loop iteration and continues to the next?",
      options: ["break", "return", "skip", "continue"],
      answer: 3,
      explain: "continue jumps to the next iteration. break exits the loop entirely."
    },
    {
      topic: "LOOPS",
      q: "What does a <code>while (1)</code> loop do?",
      options: ["Runs once", "Never runs", "Runs forever", "Runs 1 time then stops"],
      answer: 2,
      explain: "while (1) is always true — it loops forever until a break or return."
    },
    {
      topic: "FUNCTIONS",
      q: "What is the return type of a function that returns nothing?",
      options: ["int", "null", "void", "empty"],
      answer: 2,
      explain: "void means 'no value'. A function declared void returns nothing."
    },
    {
      topic: "FUNCTIONS",
      q: "In C, arguments are passed to functions by:",
      options: ["Reference by default", "Value by default", "Pointer only", "Depends on type"],
      answer: 1,
      explain: "C passes arguments by VALUE — a copy is made. To modify the original, pass a pointer."
    },
    {
      topic: "ARRAYS",
      q: "Given <code>int arr[5];</code>, what is the index of the last element?",
      options: ["5", "4", "6", "0"],
      answer: 1,
      explain: "Arrays in C are 0-indexed. A 5-element array has indices 0, 1, 2, 3, 4 — last is 4."
    },
    {
      topic: "STRINGS",
      q: "What character terminates every C string?",
      options: ["'.'", "'\\n'", "'\\0'", "' '"],
      answer: 2,
      explain: "C strings end with the null terminator '\\0' (ASCII value 0)."
    },
    {
      topic: "STRINGS",
      q: "What does <code>strlen(\"42\")</code> return?",
      options: ["3", "2", "1", "0"],
      answer: 1,
      explain: "strlen counts characters until '\\0'. \"42\" has 2 characters — '4' and '2'."
    },
    {
      topic: "IF/ELSE",
      q: "What is printed? <code>int x = 5; if (x > 3) printf(\"A\"); else printf(\"B\");</code>",
      options: ["B", "A", "AB", "Nothing"],
      answer: 1,
      explain: "5 > 3 is true, so the if-branch runs and prints A."
    },
    {
      topic: "IF/ELSE",
      q: "What operator checks equality in C?",
      options: ["=", "===", "==", "eq"],
      answer: 2,
      explain: "== checks equality. = is assignment. === doesn't exist in C."
    }
  ],

  intermediate: [
    {
      topic: "POINTERS",
      q: "What does the <code>&</code> operator return?",
      options: ["The value of a variable", "The address of a variable", "A bitwise AND", "The size of a variable"],
      answer: 1,
      explain: "& is the address-of operator. &x gives you the memory address where x is stored."
    },
    {
      topic: "POINTERS",
      q: "If <code>int *p = &x;</code> and <code>x = 10</code>, what is <code>*p</code>?",
      options: ["The address of x", "10", "The address of p", "Undefined"],
      answer: 1,
      explain: "*p dereferences p — gives the value at that address. p = &x and x = 10, so *p == 10."
    },
    {
      topic: "POINTERS",
      q: "What causes a segmentation fault?",
      options: [
        "Dividing by zero",
        "Using an uninitialized int",
        "Dereferencing a NULL or invalid pointer",
        "Declaring too many variables"
      ],
      answer: 2,
      explain: "Segfaults happen when accessing memory you're not allowed to — like NULL or freed pointers."
    },
    {
      topic: "POINTERS",
      q: "What does <code>malloc</code> return on failure?",
      options: ["0", "-1", "NULL", "It crashes immediately"],
      answer: 2,
      explain: "malloc returns NULL when allocation fails. Always check! if (!ptr) { /* handle error */ }"
    },
    {
      topic: "STRINGS",
      q: "What is <code>arr[3]</code> equivalent to in pointer notation?",
      options: ["*arr + 3", "*(arr + 3)", "&arr[3]", "arr * 3"],
      answer: 1,
      explain: "arr[i] is syntactic sugar for *(arr + i). The compiler translates both identically."
    },
    {
      topic: "STRINGS",
      q: "Which is the correct way to copy string <code>src</code> into <code>dst</code>?",
      options: ["dst = src;", "strcpy(dst, src);", "dst == src;", "copy(dst, src);"],
      answer: 1,
      explain: "dst = src copies the pointer only. Use strcpy() to copy the actual string bytes."
    },
    {
      topic: "ARGC/ARGV",
      q: "In <code>int main(int argc, char **argv)</code>, if run as <code>./prog hello 42</code>, what is <code>argc</code>?",
      options: ["2", "3", "1", "4"],
      answer: 1,
      explain: "argc counts ALL arguments including the program name. ./prog hello 42 → argc = 3."
    },
    {
      topic: "ARGC/ARGV",
      q: "What type is <code>argv[1]</code>?",
      options: ["int", "char", "char *", "char **"],
      answer: 2,
      explain: "argv is char** — an array of char pointers. argv[1] is one pointer — a char* (C string)."
    },
    {
      topic: "ARGC/ARGV",
      q: "How do you convert <code>argv[1]</code> to an integer?",
      options: ["(int)argv[1]", "argv[1] + 0", "atoi(argv[1])", "int(argv[1])"],
      answer: 2,
      explain: "atoi() converts a string to int. (int)argv[1] casts the pointer — completely wrong!"
    },
    {
      topic: "FUNCTIONS",
      q: "A function declared <code>static</code> inside a .c file:",
      options: [
        "Can be used in any file",
        "Is visible only within that file",
        "Stores its value between calls",
        "Cannot have parameters"
      ],
      answer: 1,
      explain: "static at file scope limits visibility to that translation unit — private to that .c file."
    },
    {
      topic: "POINTERS",
      q: "What is wrong with: <code>char *s = \"hello\"; s[0] = 'H';</code>?",
      options: [
        "Nothing, it works fine",
        "You can't declare char* like that",
        "String literals are read-only — undefined behavior",
        "s[0] should be *s[0]"
      ],
      answer: 2,
      explain: "String literals live in read-only memory. Use char s[] = \"hello\"; to modify it."
    },
    {
      topic: "MEMORY",
      q: "What function releases memory allocated by <code>malloc</code>?",
      options: ["delete(ptr)", "free(ptr)", "release(ptr)", "dealloc(ptr)"],
      answer: 1,
      explain: "free() releases heap memory. Every malloc must have a matching free to avoid memory leaks."
    },
    {
      topic: "MEMORY",
      q: "What is <code>argv[argc]</code> guaranteed to be?",
      options: ["Undefined", "NULL", "An empty string", "The last argument"],
      answer: 1,
      explain: "The C standard guarantees argv[argc] == NULL. Useful for iterating without using argc."
    }
  ],

  expert: [
    {
      topic: "POINTERS",
      q: "What does <code>int (*f)(int, int);</code> declare?",
      options: [
        "A function returning int*",
        "A pointer to a function taking two ints and returning int",
        "An array of function results",
        "A double pointer to int"
      ],
      answer: 1,
      explain: "int (*f)(int, int) declares a function pointer. The (*f) is the pointer, the rest is the signature."
    },
    {
      topic: "MEMORY",
      q: "What is a use-after-free bug?",
      options: [
        "Calling free() twice on the same pointer",
        "Accessing memory after it has been freed",
        "Forgetting to call free()",
        "Calling malloc with size 0"
      ],
      answer: 1,
      explain: "Use-after-free: accessing memory after free(). Results in undefined behavior, often crashes or exploits."
    },
    {
      topic: "MEMORY",
      q: "What does <code>void *</code> represent?",
      options: ["A void function", "A null pointer", "A generic pointer to any type", "A pointer to nothing"],
      answer: 2,
      explain: "void* is a generic pointer — it holds an address but has no type. Must cast before dereferencing."
    },
    {
      topic: "BIT OPS",
      q: "What is the result of <code>5 & 3</code> in binary?",
      options: ["8", "1", "7", "6"],
      answer: 1,
      explain: "5 = 101, 3 = 011. Bitwise AND: 001 = 1. Only bits set in BOTH operands remain."
    },
    {
      topic: "BIT OPS",
      q: "What does <code>x << 2</code> do?",
      options: ["Divides x by 2", "Multiplies x by 4", "Shifts x left by 2 bits (×4)", "Rotates x left"],
      answer: 2,
      explain: "Left shift by n is equivalent to multiplying by 2^n. x << 2 multiplies x by 4."
    },
    {
      topic: "STRINGS",
      q: "What does <code>memmove</code> do that <code>memcpy</code> does not?",
      options: [
        "memmove is faster",
        "memmove handles overlapping memory regions safely",
        "memmove copies strings with null terminator",
        "memmove allocates memory automatically"
      ],
      answer: 1,
      explain: "memmove safely handles overlapping src/dst. memcpy has undefined behavior with overlapping regions."
    },
    {
      topic: "LOGIC",
      q: "What does this return? <code>int f(int n) { return n <= 1 ? 1 : n * f(n-1); }</code> with <code>f(4)</code>",
      options: ["4", "16", "24", "10"],
      answer: 2,
      explain: "This is recursive factorial. f(4) = 4*3*2*1 = 24."
    },
    {
      topic: "LOGIC",
      q: "What is wrong with this code? <code>char buf[4]; strcpy(buf, \"hello\");</code>",
      options: [
        "strcpy is deprecated",
        "Buffer overflow — 'hello' + null needs 6 bytes, buf only holds 4",
        "char buf[4] is invalid",
        "Nothing wrong"
      ],
      answer: 1,
      explain: "\"hello\" is 5 chars + 1 null = 6 bytes. buf only holds 4. This is a classic buffer overflow."
    },
    {
      topic: "MEMORY",
      q: "What does <code>calloc(10, sizeof(int))</code> do differently than <code>malloc(10 * sizeof(int))</code>?",
      options: [
        "calloc is faster",
        "calloc zero-initializes the allocated memory",
        "calloc doesn't need free()",
        "calloc allocates on the stack"
      ],
      answer: 1,
      explain: "calloc initializes all bytes to 0. malloc gives you uninitialized (garbage) memory."
    },
    {
      topic: "POINTERS",
      q: "What does <code>const int *p</code> mean?",
      options: [
        "p cannot be reassigned",
        "The int pointed to cannot be modified through p",
        "Both p and the int are constant",
        "p must point to a const variable"
      ],
      answer: 1,
      explain: "const int *p: the data pointed to is const (can't modify *p). The pointer p itself can change."
    },
    {
      topic: "LOGIC",
      q: "What prints? <code>int x = 0; printf(\"%d %d\", x++, ++x);</code>",
      options: ["0 2", "1 2", "0 1", "Undefined behavior"],
      answer: 3,
      explain: "Modifying x twice between sequence points is undefined behavior in C. Never rely on this output."
    },
    {
      topic: "BIT OPS",
      q: "How do you check if the N-th bit (0-indexed) of integer <code>x</code> is set?",
      options: ["x & N", "x & (1 << N)", "x | (1 << N)", "x ^ N"],
      answer: 1,
      explain: "x & (1 << N) isolates bit N. If the result is non-zero, bit N is set."
    },
    {
      topic: "MEMORY",
      q: "What is a double free?",
      options: [
        "Allocating memory twice",
        "Calling free() on the same pointer twice",
        "Using two pointers to the same memory",
        "freeing a stack variable"
      ],
      answer: 1,
      explain: "Calling free() twice on the same pointer corrupts the heap allocator — undefined behavior, often crash."
    }
  ]

};


/* ══════════════════════════════════════════════════════════════
   2. DATA — CHALLENGES BY LEVEL
══════════════════════════════════════════════════════════════ */

const CHALLENGES = {

  beginner: [
    {
      name: "ft_putchar",
      filename: "ft_putchar.c",
      difficulty: "easy",
      topic: "I/O",
      desc: "Write a function <code>ft_putchar</code> that prints a single character to standard output using <code>write(1, &c, 1)</code>.",
      proto: "void\tft_putchar(char c);",
      examples: [
        { in: "ft_putchar('A')", out: "A (printed)" },
        { in: "ft_putchar('\\n')", out: "(newline)" }
      ],
      hint: "Use write(1, &c, 1). The first arg is file descriptor (1 = stdout), second is address of char, third is 1 byte.",
      solution: `#include <unistd.h>\n\nvoid\tft_putchar(char c)\n{\n\twrite(1, &c, 1);\n}`
    },
    {
      name: "ft_isalpha",
      filename: "ft_isalpha.c",
      difficulty: "easy",
      topic: "BASICS",
      desc: "Write the function <code>ft_isalpha</code> that returns 1 if the character is a letter (a–z or A–Z), 0 otherwise.",
      proto: "int\tft_isalpha(int c);",
      examples: [
        { in: "ft_isalpha('a')", out: "1" },
        { in: "ft_isalpha('Z')", out: "1" },
        { in: "ft_isalpha('5')", out: "0" }
      ],
      hint: "Check if c is between 'a'–'z' OR between 'A'–'Z' using comparison operators.",
      solution: `int\tft_isalpha(int c)\n{\n\tif ((c >= 'a' && c <= 'z') || (c >= 'A' && c <= 'Z'))\n\t\treturn (1);\n\treturn (0);\n}`
    },
    {
      name: "ft_max",
      filename: "ft_max.c",
      difficulty: "easy",
      topic: "FUNCTIONS",
      desc: "Write the function <code>ft_max</code> that returns the largest of two integers.",
      proto: "int\tft_max(int a, int b);",
      examples: [
        { in: "ft_max(3, 7)", out: "7" },
        { in: "ft_max(-5, -2)", out: "-2" },
        { in: "ft_max(42, 42)", out: "42" }
      ],
      hint: "Use a ternary: return (a > b) ? a : b; — or a simple if/else.",
      solution: `int\tft_max(int a, int b)\n{\n\tif (a > b)\n\t\treturn (a);\n\treturn (b);\n}`
    },
    {
      name: "print_numbers",
      filename: "print_numbers.c",
      difficulty: "easy",
      topic: "LOOPS",
      desc: "Write a program that prints all numbers from 0 to 9 separated by spaces, followed by a newline.",
      proto: "int main(void)",
      examples: [
        { in: "(run program)", out: "0 1 2 3 4 5 6 7 8 9" }
      ],
      hint: "Loop i from 0 to 9. Use write() with '0' + i. Handle spacing carefully — no trailing space.",
      solution: `#include <unistd.h>\n\nint\tmain(void)\n{\n\tint\ti;\n\tchar\tc;\n\n\ti = 0;\n\twhile (i <= 9)\n\t{\n\t\tc = '0' + i;\n\t\twrite(1, &c, 1);\n\t\tif (i < 9)\n\t\t\twrite(1, " ", 1);\n\t\ti++;\n\t}\n\twrite(1, "\\n", 1);\n\treturn (0);\n}`
    },
    {
      name: "ft_strlen",
      filename: "ft_strlen.c",
      difficulty: "easy",
      topic: "STRINGS",
      desc: "Write the function <code>ft_strlen</code> that returns the number of characters in a string, without using any standard library string functions.",
      proto: "int\tft_strlen(const char *s);",
      examples: [
        { in: "ft_strlen(\"hello\")", out: "5" },
        { in: "ft_strlen(\"\")", out: "0" },
        { in: "ft_strlen(\"42 school\")", out: "9" }
      ],
      hint: "Walk a counter forward until you hit '\\0'. That count is the length.",
      solution: `int\tft_strlen(const char *s)\n{\n\tint\tlen;\n\n\tlen = 0;\n\twhile (s[len] != '\\0')\n\t\tlen++;\n\treturn (len);\n}`
    },
    {
      name: "ft_isdigit",
      filename: "ft_isdigit.c",
      difficulty: "easy",
      topic: "BASICS",
      desc: "Write the function <code>ft_isdigit</code> that returns 1 if the character is a digit (0–9), 0 otherwise.",
      proto: "int\tft_isdigit(int c);",
      examples: [
        { in: "ft_isdigit('5')", out: "1" },
        { in: "ft_isdigit('a')", out: "0" },
        { in: "ft_isdigit('0')", out: "1" }
      ],
      hint: "Check if c >= '0' && c <= '9'.",
      solution: `int\tft_isdigit(int c)\n{\n\tif (c >= '0' && c <= '9')\n\t\treturn (1);\n\treturn (0);\n}`
    },
    {
      name: "first_last_char",
      filename: "first_last_char.c",
      difficulty: "easy",
      topic: "ARRAYS",
      desc: "Write a program that takes a string as argument and prints its first character, a newline, its last character, and a newline. If no argument, print nothing.",
      proto: "int main(int argc, char **argv)",
      examples: [
        { in: "\"hello\"", out: "h\no" },
        { in: "\"42\"", out: "4\n2" },
        { in: "(no args)", out: "(nothing)" }
      ],
      hint: "argv[1][0] is the first char. Find the last with strlen-1. Check argc >= 2 first.",
      solution: `#include <stdio.h>\n#include <string.h>\n\nint\tmain(int argc, char **argv)\n{\n\tif (argc < 2)\n\t\treturn (0);\n\tprintf("%c\\n", argv[1][0]);\n\tprintf("%c\\n", argv[1][strlen(argv[1]) - 1]);\n\treturn (0);\n}`
    },
    {
      name: "ft_putstr",
      filename: "ft_putstr.c",
      difficulty: "easy",
      topic: "STRINGS",
      desc: "Write the function <code>ft_putstr</code> that prints a string to standard output, character by character, using only <code>write(1, &c, 1)</code>.",
      proto: "void\tft_putstr(char *str);",
      examples: [
        { in: "ft_putstr(\"hello\")", out: "hello (printed)" },
        { in: "ft_putstr(\"\")", out: "(nothing)" }
      ],
      hint: "Loop through each character and call write(1, &str[i], 1). Stop at '\\0'.",
      solution: `#include <unistd.h>\n\nvoid\tft_putstr(char *str)\n{\n\tint\ti;\n\n\ti = 0;\n\twhile (str[i] != '\\0')\n\t{\n\t\twrite(1, &str[i], 1);\n\t\ti++;\n\t}\n}`
    },
    {
      name: "is_negative",
      filename: "is_negative.c",
      difficulty: "easy",
      topic: "IF/ELSE",
      desc: "Write a function <code>is_negative</code> that prints 'N' if the integer is negative, 'P' otherwise (including 0).",
      proto: "void\tis_negative(int n);",
      examples: [
        { in: "is_negative(-5)", out: "N" },
        { in: "is_negative(0)", out: "P" },
        { in: "is_negative(42)", out: "P" }
      ],
      hint: "if (n < 0) print 'N', else print 'P'. Use write() or printf().",
      solution: `#include <unistd.h>\n\nvoid\tis_negative(int n)\n{\n\tif (n < 0)\n\t\twrite(1, "N", 1);\n\telse\n\t\twrite(1, "P", 1);\n}`
    },
    {
      name: "ft_strcpy",
      filename: "ft_strcpy.c",
      difficulty: "easy",
      topic: "STRINGS",
      desc: "Write the function <code>ft_strcpy</code> that copies the string <code>src</code> into <code>dst</code> (including '\\0') and returns <code>dst</code>.",
      proto: "char\t*ft_strcpy(char *dst, char *src);",
      examples: [
        { in: "src=\"hello\"", out: "dst becomes \"hello\"" },
        { in: "src=\"\"", out: "dst becomes \"\"" }
      ],
      hint: "Loop while src[i] != '\\0', copy each byte. Don't forget to copy the null terminator at the end.",
      solution: `char\t*ft_strcpy(char *dst, char *src)\n{\n\tint\ti;\n\n\ti = 0;\n\twhile (src[i] != '\\0')\n\t{\n\t\tdst[i] = src[i];\n\t\ti++;\n\t}\n\tdst[i] = '\\0';\n\treturn (dst);\n}`
    }
  ],

  intermediate: [
    {
      name: "swap",
      filename: "swap.c",
      difficulty: "medium",
      topic: "POINTERS",
      desc: "Write the function <code>swap</code> that swaps the values of two integers using pointers.",
      proto: "void\tswap(int *a, int *b);",
      examples: [
        { in: "a=3, b=7", out: "a=7, b=3" },
        { in: "a=-1, b=42", out: "a=42, b=-1" }
      ],
      hint: "Use a temporary variable: tmp=*a; *a=*b; *b=tmp;",
      solution: `void\tswap(int *a, int *b)\n{\n\tint\ttmp;\n\n\ttmp = *a;\n\t*a = *b;\n\t*b = tmp;\n}`
    },
    {
      name: "ft_atoi",
      filename: "ft_atoi.c",
      difficulty: "medium",
      topic: "STRINGS",
      desc: "Write the function <code>ft_atoi</code> that converts a string to an integer, handling optional leading whitespace, optional sign (+ or -), and digits.",
      proto: "int\tft_atoi(const char *str);",
      examples: [
        { in: "\"42\"", out: "42" },
        { in: "\"-15\"", out: "-15" },
        { in: "\"  +7abc\"", out: "7" }
      ],
      hint: "Step 1: skip whitespace. Step 2: check for sign. Step 3: convert digits with result = result*10 + (c-'0').",
      solution: `int\tft_atoi(const char *str)\n{\n\tint\ti;\n\tint\tsign;\n\tint\tresult;\n\n\ti = 0;\n\tsign = 1;\n\tresult = 0;\n\twhile (str[i] == ' ' || (str[i] >= 9 && str[i] <= 13))\n\t\ti++;\n\tif (str[i] == '-' || str[i] == '+')\n\t{\n\t\tif (str[i] == '-')\n\t\t\tsign = -1;\n\t\ti++;\n\t}\n\twhile (str[i] >= '0' && str[i] <= '9')\n\t{\n\t\tresult = result * 10 + (str[i] - '0');\n\t\ti++;\n\t}\n\treturn (sign * result);\n}`
    },
    {
      name: "reverse_string",
      filename: "reverse_string.c",
      difficulty: "medium",
      topic: "STRINGS",
      desc: "Write a function <code>reverse_string</code> that reverses a string in-place and returns it.",
      proto: "char\t*reverse_string(char *str);",
      examples: [
        { in: "\"hello\"", out: "\"olleh\"" },
        { in: "\"42\"", out: "\"24\"" }
      ],
      hint: "Use two indices: left=0, right=len-1. Swap and move inward until they meet.",
      solution: `char\t*reverse_string(char *str)\n{\n\tint\tleft;\n\tint\tright;\n\tchar\ttmp;\n\n\tleft = 0;\n\tright = 0;\n\twhile (str[right])\n\t\tright++;\n\tright--;\n\twhile (left < right)\n\t{\n\t\ttmp = str[left];\n\t\tstr[left] = str[right];\n\t\tstr[right] = tmp;\n\t\tleft++;\n\t\tright--;\n\t}\n\treturn (str);\n}`
    },
    {
      name: "rot13",
      filename: "rot13.c",
      difficulty: "medium",
      topic: "STRINGS",
      desc: "Write a function <code>rot13</code> that encodes a string using ROT13 cipher. Each letter is replaced by the letter 13 positions after it (wrapping). Non-letters unchanged.",
      proto: "char\t*rot13(char *str);",
      examples: [
        { in: "\"Hello\"", out: "\"Uryyb\"" },
        { in: "\"abc\"", out: "\"nop\"" }
      ],
      hint: "If char is a letter, check if adding 13 exceeds 'z' or 'Z'. If it does, subtract 13 instead.",
      solution: `char\t*rot13(char *str)\n{\n\tint\ti;\n\n\ti = 0;\n\twhile (str[i])\n\t{\n\t\tif ((str[i] >= 'a' && str[i] <= 'm') ||\n\t\t\t(str[i] >= 'A' && str[i] <= 'M'))\n\t\t\tstr[i] += 13;\n\t\telse if ((str[i] >= 'n' && str[i] <= 'z') ||\n\t\t\t(str[i] >= 'N' && str[i] <= 'Z'))\n\t\t\tstr[i] -= 13;\n\t\ti++;\n\t}\n\treturn (str);\n}`
    },
    {
      name: "repeat_alpha",
      filename: "repeat_alpha.c",
      difficulty: "medium",
      topic: "STRINGS",
      desc: "Write a program that takes a string and prints each letter repeated by its position in the alphabet (a=1, b=2…z=26). Non-letter characters are printed as-is.",
      proto: "int main(int argc, char **argv)",
      examples: [
        { in: "\"abc\"", out: "abbccc" },
        { in: "\"a1b\"", out: "a1bb" }
      ],
      hint: "For each char, determine if it's a letter. If lowercase, repeat (c-'a'+1) times; if uppercase, (c-'A'+1) times.",
      solution: `#include <stdio.h>\n\nint\tmain(int argc, char **argv)\n{\n\tint\ti;\n\tint\tj;\n\tint\trepeat;\n\n\tif (argc != 2)\n\t\treturn (0);\n\ti = 0;\n\twhile (argv[1][i])\n\t{\n\t\tif (argv[1][i] >= 'a' && argv[1][i] <= 'z')\n\t\t\trepeat = argv[1][i] - 'a' + 1;\n\t\telse if (argv[1][i] >= 'A' && argv[1][i] <= 'Z')\n\t\t\trepeat = argv[1][i] - 'A' + 1;\n\t\telse\n\t\t\trepeat = 1;\n\t\tj = 0;\n\t\twhile (j < repeat)\n\t\t{\n\t\t\tprintf("%c", argv[1][i]);\n\t\t\tj++;\n\t\t}\n\t\ti++;\n\t}\n\tprintf("\\n");\n\treturn (0);\n}`
    },
    {
      name: "ulstr",
      filename: "ulstr.c",
      difficulty: "medium",
      topic: "STRINGS",
      desc: "Write a program that switches case of a string: lowercase becomes uppercase and vice versa. Non-letter chars unchanged.",
      proto: "int main(int argc, char **argv)",
      examples: [
        { in: "\"Hello World\"", out: "\"hELLO wORLD\"" },
        { in: "\"42 School\"", out: "\"42 sCHOOL\"" }
      ],
      hint: "For each char: if 'a'–'z', subtract 32. If 'A'–'Z', add 32.",
      solution: `#include <stdio.h>\n\nint\tmain(int argc, char **argv)\n{\n\tint\ti;\n\tchar\tc;\n\n\tif (argc != 2)\n\t\treturn (0);\n\ti = 0;\n\twhile (argv[1][i])\n\t{\n\t\tc = argv[1][i];\n\t\tif (c >= 'a' && c <= 'z')\n\t\t\tc -= 32;\n\t\telse if (c >= 'A' && c <= 'Z')\n\t\t\tc += 32;\n\t\tprintf("%c", c);\n\t\ti++;\n\t}\n\tprintf("\\n");\n\treturn (0);\n}`
    },
    {
      name: "ft_memset",
      filename: "ft_memset.c",
      difficulty: "medium",
      topic: "MEMORY",
      desc: "Write the function <code>ft_memset</code> that fills the first <code>n</code> bytes of memory area <code>s</code> with constant byte <code>c</code>.",
      proto: "void\t*ft_memset(void *s, int c, size_t n);",
      examples: [
        { in: "buf[10], c='A', n=5", out: "buf = \"AAAAA\\0...\"" },
        { in: "buf[4], c=0, n=4", out: "buf = {0,0,0,0}" }
      ],
      hint: "Cast s to unsigned char*. Loop n times, setting ptr[i] = (unsigned char)c. Return the original s.",
      solution: `void\t*ft_memset(void *s, int c, unsigned long n)\n{\n\tunsigned char\t*ptr;\n\tunsigned long\ti;\n\n\tptr = (unsigned char *)s;\n\ti = 0;\n\twhile (i < n)\n\t{\n\t\tptr[i] = (unsigned char)c;\n\t\ti++;\n\t}\n\treturn (s);\n}`
    },
    {
      name: "count_words",
      filename: "count_words.c",
      difficulty: "hard",
      topic: "STRINGS",
      desc: "Write a function <code>count_words</code> that counts the number of words in a string. Words are separated by spaces, tabs, or newlines.",
      proto: "int\tcount_words(const char *s);",
      examples: [
        { in: "\"hello world\"", out: "2" },
        { in: "\"  foo  bar  baz \"", out: "3" },
        { in: "\"   \"", out: "0" }
      ],
      hint: "Track whether you're inside a word. Each transition from whitespace→non-whitespace increments the count.",
      solution: `int\tcount_words(const char *s)\n{\n\tint\tcount;\n\tint\tin_word;\n\n\tcount = 0;\n\tin_word = 0;\n\twhile (*s)\n\t{\n\t\tif (*s == ' ' || *s == '\\t' || *s == '\\n')\n\t\t\tin_word = 0;\n\t\telse if (!in_word)\n\t\t{\n\t\t\tin_word = 1;\n\t\t\tcount++;\n\t\t}\n\t\ts++;\n\t}\n\treturn (count);\n}`
    },
    {
      name: "ft_strrev",
      filename: "ft_strrev.c",
      difficulty: "medium",
      topic: "STRINGS",
      desc: "Write a function <code>ft_strrev</code> that reverses the string <code>str</code> in-place and returns a pointer to the result.",
      proto: "char\t*ft_strrev(char *str);",
      examples: [
        { in: "\"hello\"", out: "\"olleh\"" },
        { in: "\"a\"", out: "\"a\"" }
      ],
      hint: "Find the end, then swap chars from both ends moving inward.",
      solution: `char\t*ft_strrev(char *str)\n{\n\tint\ti;\n\tint\tj;\n\tchar\ttmp;\n\n\ti = 0;\n\tj = 0;\n\twhile (str[j])\n\t\tj++;\n\tj--;\n\twhile (i < j)\n\t{\n\t\ttmp = str[i];\n\t\tstr[i] = str[j];\n\t\tstr[j] = tmp;\n\t\ti++;\n\t\tj--;\n\t}\n\treturn (str);\n}`
    },
    {
      name: "ft_strcmp",
      filename: "ft_strcmp.c",
      difficulty: "medium",
      topic: "STRINGS",
      desc: "Write the function <code>ft_strcmp</code> that compares two strings lexicographically. Returns 0 if equal, positive if s1 > s2, negative if s1 < s2.",
      proto: "int\tft_strcmp(char *s1, char *s2);",
      examples: [
        { in: "\"abc\", \"abc\"", out: "0" },
        { in: "\"b\", \"a\"", out: "positive" },
        { in: "\"a\", \"b\"", out: "negative" }
      ],
      hint: "Loop while both chars are equal and not '\\0'. Return the difference of the first differing chars.",
      solution: `int\tft_strcmp(char *s1, char *s2)\n{\n\tint\ti;\n\n\ti = 0;\n\twhile (s1[i] && s2[i] && s1[i] == s2[i])\n\t\ti++;\n\treturn ((unsigned char)s1[i] - (unsigned char)s2[i]);\n}`
    }
  ],

  expert: [
    {
      name: "ft_memcpy",
      filename: "ft_memcpy.c",
      difficulty: "hard",
      topic: "MEMORY",
      desc: "Write <code>ft_memcpy</code> that copies <code>n</code> bytes from <code>src</code> to <code>dst</code>. Memory areas must not overlap. Returns <code>dst</code>.",
      proto: "void\t*ft_memcpy(void *dst, const void *src, size_t n);",
      examples: [
        { in: "dst=buf, src=\"hello\", n=5", out: "buf = \"hello\"" },
        { in: "n=0", out: "dst unchanged" }
      ],
      hint: "Cast both to unsigned char*. Loop n times copying byte by byte. Return original dst.",
      solution: `void\t*ft_memcpy(void *dst, const void *src, unsigned long n)\n{\n\tunsigned char\t\t*d;\n\tconst unsigned char\t*s;\n\tunsigned long\t\ti;\n\n\tif (!dst && !src)\n\t\treturn (NULL);\n\td = (unsigned char *)dst;\n\ts = (const unsigned char *)src;\n\ti = 0;\n\twhile (i < n)\n\t{\n\t\td[i] = s[i];\n\t\ti++;\n\t}\n\treturn (dst);\n}`
    },
    {
      name: "ft_itoa",
      filename: "ft_itoa.c",
      difficulty: "hard",
      topic: "MEMORY",
      desc: "Write <code>ft_itoa</code> that converts an integer to a string. Use <code>malloc</code> to allocate the result. Handle negative numbers.",
      proto: "char\t*ft_itoa(int n);",
      examples: [
        { in: "42", out: "\"42\"" },
        { in: "-15", out: "\"-15\"" },
        { in: "0", out: "\"0\"" }
      ],
      hint: "Count digits first, malloc the right size, fill from the end. Handle INT_MIN specially.",
      solution: `#include <stdlib.h>\n\nstatic int\tcount_digits(int n)\n{\n\tint\tcount;\n\n\tcount = (n <= 0) ? 1 : 0;\n\twhile (n != 0)\n\t{\n\t\tn /= 10;\n\t\tcount++;\n\t}\n\treturn (count);\n}\n\nchar\t*ft_itoa(int n)\n{\n\tchar\t*str;\n\tint\tlen;\n\tlong\tnum;\n\n\tnum = n;\n\tlen = count_digits(n);\n\tif (n < 0)\n\t\tlen++;\n\tstr = malloc(len + 1);\n\tif (!str)\n\t\treturn (NULL);\n\tstr[len] = '\\0';\n\tif (num < 0)\n\t{\n\t\tstr[0] = '-';\n\t\tnum = -num;\n\t}\n\tif (num == 0)\n\t\tstr[0] = '0';\n\twhile (num > 0)\n\t{\n\t\tstr[--len] = '0' + (num % 10);\n\t\tnum /= 10;\n\t}\n\treturn (str);\n}`
    },
    {
      name: "ft_split",
      filename: "ft_split.c",
      difficulty: "hard",
      topic: "MEMORY",
      desc: "Write <code>ft_split</code> that splits a string by a delimiter char and returns a NULL-terminated array of strings. Use malloc.",
      proto: "char\t**ft_split(const char *s, char c);",
      examples: [
        { in: "\"hello world\", ' '", out: "[\"hello\", \"world\", NULL]" },
        { in: "\"a,,b\", ','", out: "[\"a\", \"b\", NULL]" }
      ],
      hint: "Count words first, malloc the array, then malloc each word. Free on allocation failure.",
      solution: `#include <stdlib.h>\n#include <string.h>\n\nstatic int\tcount_words(const char *s, char c)\n{\n\tint\tcount;\n\tint\tin_word;\n\n\tcount = 0; in_word = 0;\n\twhile (*s)\n\t{\n\t\tif (*s != c && !in_word) { count++; in_word = 1; }\n\t\telse if (*s == c) in_word = 0;\n\t\ts++;\n\t}\n\treturn (count);\n}\n\nchar\t**ft_split(const char *s, char c)\n{\n\tchar\t**res;\n\tint\t\ti;\n\tint\t\tstart;\n\tint\t\twords;\n\n\tif (!s) return (NULL);\n\twords = count_words(s, c);\n\tres = malloc((words + 1) * sizeof(char *));\n\tif (!res) return (NULL);\n\ti = 0;\n\twhile (i < words)\n\t{\n\t\twhile (*s == c) s++;\n\t\tstart = 0;\n\t\twhile (s[start] && s[start] != c) start++;\n\t\tres[i] = malloc(start + 1);\n\t\tif (!res[i]) { while (i--) free(res[i]); free(res); return (NULL); }\n\t\tmemcpy(res[i], s, start);\n\t\tres[i][start] = '\\0';\n\t\ts += start;\n\t\ti++;\n\t}\n\tres[i] = NULL;\n\treturn (res);\n}`
    },
    {
      name: "ft_memmove",
      filename: "ft_memmove.c",
      difficulty: "hard",
      topic: "MEMORY",
      desc: "Write <code>ft_memmove</code> that copies <code>n</code> bytes from <code>src</code> to <code>dst</code>, handling overlapping memory regions correctly.",
      proto: "void\t*ft_memmove(void *dst, const void *src, size_t n);",
      examples: [
        { in: "dst=buf+2, src=buf, n=5", out: "overlap handled correctly" },
        { in: "non-overlapping regions", out: "same as memcpy" }
      ],
      hint: "If dst > src and they overlap, copy backwards. Otherwise copy forwards.",
      solution: `void\t*ft_memmove(void *dst, const void *src, unsigned long n)\n{\n\tunsigned char\t\t*d;\n\tconst unsigned char\t*s;\n\n\tif (!dst && !src)\n\t\treturn (NULL);\n\td = (unsigned char *)dst;\n\ts = (const unsigned char *)src;\n\tif (d > s && d < s + n)\n\t{\n\t\twhile (n--)\n\t\t\td[n] = s[n];\n\t}\n\telse\n\t{\n\t\tunsigned long i = 0;\n\t\twhile (i < n) { d[i] = s[i]; i++; }\n\t}\n\treturn (dst);\n}`
    },
    {
      name: "bit_counter",
      filename: "bit_counter.c",
      difficulty: "hard",
      topic: "BIT OPS",
      desc: "Write a function <code>count_bits</code> that returns the number of bits set to 1 in an unsigned integer.",
      proto: "int\tcount_bits(unsigned int n);",
      examples: [
        { in: "count_bits(7)", out: "3  (111 in binary)" },
        { in: "count_bits(0)", out: "0" },
        { in: "count_bits(255)", out: "8" }
      ],
      hint: "Use n & 1 to check the last bit, then n >>= 1 to shift right. Repeat until n == 0.",
      solution: `int\tcount_bits(unsigned int n)\n{\n\tint\tcount;\n\n\tcount = 0;\n\twhile (n)\n\t{\n\t\tcount += n & 1;\n\t\tn >>= 1;\n\t}\n\treturn (count);\n}`
    },
    {
      name: "ft_strdup",
      filename: "ft_strdup.c",
      difficulty: "hard",
      topic: "MEMORY",
      desc: "Write <code>ft_strdup</code> that allocates memory and copies the string <code>s</code> into it. Returns a pointer to the new string, or NULL on failure.",
      proto: "char\t*ft_strdup(const char *s);",
      examples: [
        { in: "ft_strdup(\"hello\")", out: "new string \"hello\" on heap" },
        { in: "ft_strdup(\"\")", out: "new empty string on heap" }
      ],
      hint: "Use strlen to get the size, malloc len+1, then copy byte by byte with a loop.",
      solution: `#include <stdlib.h>\n\nchar\t*ft_strdup(const char *s)\n{\n\tchar\t*copy;\n\tint\t\tlen;\n\tint\t\ti;\n\n\tlen = 0;\n\twhile (s[len])\n\t\tlen++;\n\tcopy = malloc(len + 1);\n\tif (!copy)\n\t\treturn (NULL);\n\ti = 0;\n\twhile (i < len)\n\t{\n\t\tcopy[i] = s[i];\n\t\ti++;\n\t}\n\tcopy[i] = '\\0';\n\treturn (copy);\n}`
    },
    {
      name: "swap_bits",
      filename: "swap_bits.c",
      difficulty: "hard",
      topic: "BIT OPS",
      desc: "Write a function <code>swap_bits</code> that swaps every pair of bits in a byte and returns the result.",
      proto: "unsigned char swap_bits(unsigned char octet);",
      examples: [
        { in: "swap_bits(0b01000111)", out: "0b10000111 — each pair swapped" },
        { in: "swap_bits(0)", out: "0" }
      ],
      hint: "Extract odd bits with (octet & 0xAA) >> 1 and even bits with (octet & 0x55) << 1. OR them together.",
      solution: `unsigned char\tswap_bits(unsigned char octet)\n{\n\treturn ((octet & 0xAA) >> 1) | ((octet & 0x55) << 1);\n}`
    },
    {
      name: "ft_lstnew",
      filename: "ft_lstnew.c",
      difficulty: "hard",
      topic: "MEMORY",
      desc: "Write <code>ft_lstnew</code> that allocates a new linked list node. The <code>content</code> is set to the given value and <code>next</code> to NULL.",
      proto: "t_list\t*ft_lstnew(void *content);",
      examples: [
        { in: "ft_lstnew(\"hello\")", out: "node with content=\"hello\", next=NULL" },
        { in: "ft_lstnew(NULL)", out: "node with content=NULL, next=NULL" }
      ],
      hint: "malloc a t_list struct, set node->content = content, node->next = NULL. Return the node.",
      solution: `#include <stdlib.h>\n\ntypedef struct s_list\n{\n\tvoid\t\t\t*content;\n\tstruct s_list\t*next;\n} t_list;\n\nt_list\t*ft_lstnew(void *content)\n{\n\tt_list\t*node;\n\n\tnode = malloc(sizeof(t_list));\n\tif (!node)\n\t\treturn (NULL);\n\tnode->content = content;\n\tnode->next = NULL;\n\treturn (node);\n}`
    },
    {
      name: "ft_strtrim",
      filename: "ft_strtrim.c",
      difficulty: "hard",
      topic: "STRINGS",
      desc: "Write <code>ft_strtrim</code> that trims all characters in <code>set</code> from both the start and end of <code>s1</code>. Returns a malloc'd trimmed string.",
      proto: "char\t*ft_strtrim(char const *s1, char const *set);",
      examples: [
        { in: "s1=\"  hello  \", set=\" \"", out: "\"hello\"" },
        { in: "s1=\"xxhelloxx\", set=\"x\"", out: "\"hello\"" }
      ],
      hint: "Find the first char not in set (start), last char not in set (end), malloc the slice.",
      solution: `#include <stdlib.h>\n#include <string.h>\n\nstatic int\tin_set(char c, const char *set)\n{\n\twhile (*set)\n\t\tif (*set++ == c) return (1);\n\treturn (0);\n}\n\nchar\t*ft_strtrim(char const *s1, char const *set)\n{\n\tsize_t\tstart;\n\tsize_t\tend;\n\tchar\t*res;\n\n\tif (!s1 || !set) return (NULL);\n\tstart = 0;\n\tend = strlen(s1);\n\twhile (s1[start] && in_set(s1[start], set)) start++;\n\twhile (end > start && in_set(s1[end - 1], set)) end--;\n\tres = malloc(end - start + 1);\n\tif (!res) return (NULL);\n\tmemcpy(res, s1 + start, end - start);\n\tres[end - start] = '\\0';\n\treturn (res);\n}`
    },
    {
      name: "print_hex",
      filename: "print_hex.c",
      difficulty: "hard",
      topic: "BIT OPS",
      desc: "Write a function <code>print_hex</code> that prints an unsigned int in lowercase hexadecimal using only <code>write()</code>.",
      proto: "void\tprint_hex(unsigned int n);",
      examples: [
        { in: "print_hex(255)", out: "ff" },
        { in: "print_hex(16)", out: "10" },
        { in: "print_hex(0)", out: "0" }
      ],
      hint: "Recurse: print_hex(n / 16), then print '0'–'9' or 'a'–'f' for n % 16.",
      solution: `#include <unistd.h>\n\nvoid\tprint_hex(unsigned int n)\n{\n\tchar\t*hex;\n\tchar\tc;\n\n\thex = "0123456789abcdef";\n\tif (n >= 16)\n\t\tprint_hex(n / 16);\n\tc = hex[n % 16];\n\twrite(1, &c, 1);\n}`
    }
  ]

};


/* ══════════════════════════════════════════════════════════════
   3. TEST CASES FOR RUN CODE
══════════════════════════════════════════════════════════════ */

const TEST_CASES = {
  ft_putchar:     [{ label: "Calls write()",      keywords: ["write"],              desc: "Must use write()" },
                   { label: "Passes char",         keywords: ["&c", "c"],           desc: "Passes char reference" }],
  ft_isalpha:     [{ label: "Checks a-z",          keywords: [">= 'a'", "<= 'z'"], desc: "Validates lowercase range" },
                   { label: "Checks A-Z",          keywords: [">= 'A'", "<= 'Z'"], desc: "Validates uppercase range" },
                   { label: "Returns 1 or 0",      keywords: ["return"],            desc: "Returns boolean result" }],
  ft_max:         [{ label: "Compares a and b",    keywords: ["a > b", "b > a"],    desc: "Must compare the two integers" },
                   { label: "Returns a value",     keywords: ["return"],            desc: "Must return the maximum" }],
  print_numbers:  [{ label: "Loops 0 to 9",        keywords: ["while", "for"],      desc: "Must iterate 10 times" },
                   { label: "Outputs digits",      keywords: ["write", "printf"],   desc: "Must output each digit" }],
  ft_strlen:      [{ label: "Uses a loop",         keywords: ["while", "for"],      desc: "Solution must loop" },
                   { label: "Checks '\\0'",        keywords: ["\\0", "len"],        desc: "Must detect null terminator" },
                   { label: "Returns counter",     keywords: ["return"],            desc: "Must return the length" }],
  ft_isdigit:     [{ label: "Checks '0'-'9'",      keywords: ["'0'", "'9'"],        desc: "Validates digit range" },
                   { label: "Returns 1 or 0",      keywords: ["return"],            desc: "Returns boolean" }],
  first_last_char:[{ label: "Checks argc",         keywords: ["argc"],              desc: "Must validate argument count" },
                   { label: "Accesses argv[1]",    keywords: ["argv"],              desc: "Must read argument" },
                   { label: "Prints chars",        keywords: ["printf", "write"],   desc: "Must print first and last" }],
  ft_putstr:      [{ label: "Includes unistd.h",  keywords: ["unistd"],            desc: "Needs write()" },
                   { label: "Calls write()",       keywords: ["write"],             desc: "Must use write()" },
                   { label: "Loops string",        keywords: ["while", "for"],      desc: "Must iterate" }],
  is_negative:    [{ label: "Checks n < 0",        keywords: ["< 0", "n < 0"],      desc: "Checks if negative" },
                   { label: "Prints N or P",       keywords: ["N", "P"],            desc: "Must print N or P" }],
  ft_strcpy:      [{ label: "Copies bytes",        keywords: ["dst["],              desc: "Writes into destination" },
                   { label: "Copies null term",    keywords: ["\\0"],               desc: "Must copy null terminator" },
                   { label: "Returns dst",         keywords: ["return"],            desc: "Returns destination" }],
  swap:           [{ label: "Uses pointers",       keywords: ["*a", "*b"],          desc: "Must dereference params" },
                   { label: "Uses temp variable",  keywords: ["tmp", "temp"],       desc: "Needs temp var for swap" },
                   { label: "Assigns both sides",  keywords: ["*a =", "*b ="],      desc: "Both values reassigned" }],
  ft_atoi:        [{ label: "Skips whitespace",    keywords: ["' '", "isspace"],    desc: "Handles leading whitespace" },
                   { label: "Handles sign",        keywords: ["'-'", "sign"],       desc: "Detects +/- prefix" },
                   { label: "Converts digits",     keywords: ["'0'", "* 10"],       desc: "Digit conversion formula" }],
  reverse_string: [{ label: "Two index vars",      keywords: ["left", "right", "i"], desc: "Needs two pointers" },
                   { label: "Swaps characters",    keywords: ["tmp", "temp"],       desc: "Uses temp to swap" },
                   { label: "Returns string",      keywords: ["return"],            desc: "Must return string" }],
  rot13:          [{ label: "Handles a-m",         keywords: ["'m'", "'M'"],        desc: "First half of alphabet" },
                   { label: "Applies ±13",         keywords: ["13"],                desc: "Rotation by 13" },
                   { label: "Returns string",      keywords: ["return"],            desc: "Returns encoded string" }],
  repeat_alpha:   [{ label: "Checks if letter",    keywords: [">= 'a'", ">= 'A'"], desc: "Detects alpha chars" },
                   { label: "Calculates repeat",   keywords: ["- 'a'", "- 'A'"],   desc: "Position with char arithmetic" },
                   { label: "Inner loop",          keywords: ["while", "for"],      desc: "Uses nested loop" }],
  ulstr:          [{ label: "Checks lowercase",    keywords: [">= 'a'", "<= 'z'"], desc: "Detects lowercase" },
                   { label: "Checks uppercase",    keywords: [">= 'A'", "<= 'Z'"], desc: "Detects uppercase" },
                   { label: "Case conversion",     keywords: ["-= 32", "+= 32"],   desc: "Converts case with ±32" }],
  ft_memset:      [{ label: "Casts to uchar*",     keywords: ["unsigned char"],     desc: "Must cast void*" },
                   { label: "Loops n times",       keywords: ["while", "for"],      desc: "Must fill n bytes" },
                   { label: "Returns s",           keywords: ["return"],            desc: "Returns original pointer" }],
  count_words:    [{ label: "Tracks word state",   keywords: ["in_word", "word"],   desc: "Uses flag for word state" },
                   { label: "Detects whitespace",  keywords: ["' '", "'\\t'"],      desc: "Handles space/tab" },
                   { label: "Counts transitions",  keywords: ["count", "++"],       desc: "Increments on new word" }],
  ft_strrev:      [{ label: "Two pointer approach",keywords: ["i", "j"],            desc: "Uses two indices" },
                   { label: "Swaps chars",         keywords: ["tmp", "temp"],       desc: "Needs temp var" }],
  ft_strcmp:      [{ label: "Loops comparison",    keywords: ["while", "for"],      desc: "Must loop both strings" },
                   { label: "Returns difference",  keywords: ["return"],            desc: "Returns char difference" }],
  ft_memcpy:      [{ label: "Casts to uchar*",     keywords: ["unsigned char"],     desc: "Must cast void* types" },
                   { label: "Loops n bytes",       keywords: ["while", "for"],      desc: "Copies n bytes" },
                   { label: "Returns dst",         keywords: ["return"],            desc: "Returns destination" }],
  ft_itoa:        [{ label: "Uses malloc",         keywords: ["malloc"],            desc: "Must allocate memory" },
                   { label: "Handles negatives",   keywords: ["'-'", "< 0", "neg"], desc: "Handles negative numbers" },
                   { label: "Converts digits",     keywords: ["'0'", "% 10"],       desc: "Digit extraction" }],
  ft_split:       [{ label: "Uses malloc",         keywords: ["malloc"],            desc: "Allocates for each word" },
                   { label: "NULL-terminates",     keywords: ["NULL"],              desc: "Terminates array with NULL" },
                   { label: "Handles delimiter",   keywords: ["c", "== c"],         desc: "Uses delimiter param" }],
  ft_memmove:     [{ label: "Casts to uchar*",     keywords: ["unsigned char"],     desc: "Must cast void* types" },
                   { label: "Overlap handling",    keywords: ["d > s", "backward", "n--"], desc: "Handles overlap case" }],
  bit_counter:    [{ label: "Uses bitwise AND",    keywords: ["& 1", "&1"],         desc: "Checks last bit" },
                   { label: "Shifts right",        keywords: [">>", ">>="],         desc: "Shifts to next bit" },
                   { label: "Counts set bits",     keywords: ["count", "++"],       desc: "Accumulates count" }],
  ft_strdup:      [{ label: "Uses malloc",         keywords: ["malloc"],            desc: "Must allocate memory" },
                   { label: "Copies string",       keywords: ["copy[i]", "copy["],  desc: "Copies byte by byte" },
                   { label: "Null terminates",     keywords: ["\\0"],               desc: "Adds null terminator" }],
  swap_bits:      [{ label: "Uses 0xAA",           keywords: ["0xAA", "0xaa"],      desc: "Masks odd bits" },
                   { label: "Uses 0x55",           keywords: ["0x55"],              desc: "Masks even bits" },
                   { label: "Uses shifts",         keywords: [">>", "<<"],          desc: "Applies bit shifts" }],
  ft_lstnew:      [{ label: "Uses malloc",         keywords: ["malloc"],            desc: "Allocates node" },
                   { label: "Sets content",        keywords: ["content"],           desc: "Assigns content field" },
                   { label: "Sets next to NULL",   keywords: ["NULL"],              desc: "next = NULL" }],
  ft_strtrim:     [{ label: "Finds start",         keywords: ["start"],             desc: "Skips leading set chars" },
                   { label: "Finds end",           keywords: ["end"],               desc: "Skips trailing set chars" },
                   { label: "Uses malloc",         keywords: ["malloc"],            desc: "Allocates result" }],
  print_hex:      [{ label: "Uses hex chars",      keywords: ["0123456789", "abcdef", "hex"], desc: "Has hex digit map" },
                   { label: "Handles recursion",   keywords: ["print_hex"],         desc: "Recursive call" },
                   { label: "Calls write",         keywords: ["write"],             desc: "Uses write()" }]
};


/* ══════════════════════════════════════════════════════════════
   4. STATE
══════════════════════════════════════════════════════════════ */

const STATE = {
  selectedLevel:  'beginner', // 'beginner' | 'intermediate' | 'expert'

  quizPool:       [],
  quizIndex:      0,
  quizCorrect:    0,
  quizAnswered:   false,

  challengePool:  [],
  challengeIndex: 0,
  challengeScores:[],
  selfGrade:      null,
  challengeWeakness: [],

  finalQuizScore: 0,
  finalCodeScore: 0,
  finalScore:     0,

  topicMistakes:  {},
  sessionXP:      0,
  quizTimerID:    null,
  codeTimerID:    null
};


/* ══════════════════════════════════════════════════════════════
   5. UTILITIES
══════════════════════════════════════════════════════════════ */

function shuffle(arr) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function showScreen(id) {
  document.querySelectorAll('.screen').forEach(s => {
    s.classList.remove('active');
    s.style.display = 'none';
  });
  const el = document.getElementById(id);
  el.style.display = 'block';
  el.classList.add('active');
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

function setProgress(barId, labelId, pct) {
  const fill  = document.getElementById(barId);
  const label = document.getElementById(labelId);
  if (fill)  fill.style.width  = pct + '%';
  if (label) label.textContent = Math.round(pct) + '%';
}

/* ── XP ─────────────────────────────────────────────────────── */
const XP_LEVELS = [
  { name: 'BEGINNER',     min: 0   },
  { name: 'INTERMEDIATE', min: 100 },
  { name: 'ADVANCED',     min: 250 },
  { name: 'GOAT 🐐',      min: 500 }
];

function getLevel(xp) {
  let level = XP_LEVELS[0];
  for (const l of XP_LEVELS) { if (xp >= l.min) level = l; }
  const nextLevel = XP_LEVELS[XP_LEVELS.indexOf(level) + 1];
  const progress  = nextLevel ? ((xp - level.min) / (nextLevel.min - level.min)) * 100 : 100;
  return { name: level.name, progress, nextMin: nextLevel ? nextLevel.min : null };
}

function awardXP(amount) {
  STATE.sessionXP += amount;
  const stored = loadStorage();
  stored.totalXP = (stored.totalXP || 0) + amount;
  saveStorage(stored);
  updateXPBadge();
}

function updateXPBadge() {
  ['quiz-xp-live', 'code-xp-live'].forEach(id => {
    const el = document.getElementById(id);
    if (el) {
      el.textContent = `+${STATE.sessionXP} XP`;
      el.classList.remove('pop');
      void el.offsetWidth;
      el.classList.add('pop');
    }
  });
}

function renderXPPanel() {
  const stored = loadStorage();
  const xp = stored.totalXP || 0;
  const lv = getLevel(xp);
  document.getElementById('xp-level-label').textContent = lv.name;
  document.getElementById('xp-pts').textContent = `${xp} XP`;
  setTimeout(() => { document.getElementById('xp-bar-fill').style.width = lv.progress + '%'; }, 100);
  const hist = document.getElementById('xp-history');
  if (stored.lastScore) {
    hist.textContent = `Last score: ${stored.lastScore}/100 · Sessions: ${stored.sessions || 0}`;
  } else {
    hist.textContent = 'No previous sessions — start your first evaluation!';
  }
}

/* ── Storage ─────────────────────────────────────────────────── */
const LS_KEY = 'c42trainer_v4';

function loadStorage() {
  try { return JSON.parse(localStorage.getItem(LS_KEY)) || {}; } catch { return {}; }
}

function saveStorage(data) {
  try { localStorage.setItem(LS_KEY, JSON.stringify(data)); } catch {}
}

function persistSession() {
  const stored = loadStorage();
  stored.lastScore  = STATE.finalScore;
  stored.level      = getLevel(stored.totalXP || 0).name;
  stored.sessions   = (stored.sessions || 0) + 1;
  stored.achievements = buildAchievementStatus(stored);
  saveStorage(stored);
}

/* ── Timers ──────────────────────────────────────────────────── */
function startTimer(seconds, valId, wrapId, onExpire) {
  let remaining = seconds;
  const valEl  = document.getElementById(valId);
  const wrapEl = document.getElementById(wrapId);

  function tick() {
    const m = Math.floor(remaining / 60);
    const s = remaining % 60;
    valEl.textContent = `${m}:${String(s).padStart(2, '0')}`;
    wrapEl.classList.remove('warning', 'danger');
    if (remaining <= 30)      wrapEl.classList.add('danger');
    else if (remaining <= 90) wrapEl.classList.add('warning');
    if (remaining <= 0) { clearInterval(id); onExpire(); }
    remaining--;
  }

  tick();
  const id = setInterval(tick, 1000);
  return id;
}

function stopTimer(id) { if (id) clearInterval(id); }


/* ══════════════════════════════════════════════════════════════
   6. EDITOR — Monaco real editor
══════════════════════════════════════════════════════════════ */

let monacoEditor = null;
let monacoReady  = false;

function initEditor() {
  require.config({
    paths: { vs: 'https://cdnjs.cloudflare.com/ajax/libs/monaco-editor/0.47.0/min/vs' }
  });

  require(['vs/editor/editor.main'], function () {
    monacoReady = true;

    monaco.editor.defineTheme('c42dark', {
      base: 'vs-dark',
      inherit: true,
      rules: [
        { token: 'keyword',         foreground: '00c8ff', fontStyle: 'bold' },
        { token: 'keyword.control', foreground: '00c8ff', fontStyle: 'bold' },
        { token: 'identifier',      foreground: 'f8f8f2' },
        { token: 'type',            foreground: '8be9fd' },
        { token: 'number',          foreground: 'ff6b35' },
        { token: 'string',          foreground: 'ffbd2e' },
        { token: 'string.escape',   foreground: 'ffbd2e' },
        { token: 'comment',         foreground: '4a5568', fontStyle: 'italic' },
        { token: 'comment.doc',     foreground: '4a5568', fontStyle: 'italic' },
        { token: 'delimiter',       foreground: 'c084fc' },
        { token: 'delimiter.bracket', foreground: 'c084fc' },
        { token: 'operator',        foreground: 'c084fc' },
        { token: 'macro',           foreground: '39ff14' },
        { token: 'variable',        foreground: 'f8f8f2' },
      ],
      colors: {
        'editor.background':                  '#0a0d12',
        'editor.foreground':                  '#dde6f0',
        'editorLineNumber.foreground':        '#2e3d52',
        'editorLineNumber.activeForeground':  '#5a6a80',
        'editor.lineHighlightBackground':     '#111820',
        'editor.lineHighlightBorder':         '#1c2535',
        'editorCursor.foreground':            '#39ff14',
        'editor.selectionBackground':         '#1c3a2a',
        'editor.inactiveSelectionBackground': '#131f18',
        'editorIndentGuide.background1':      '#1c2535',
        'editorIndentGuide.activeBackground1':'#2e3d52',
        'editorGutter.background':            '#080b0f',
        'scrollbarSlider.background':         '#1c2535aa',
        'scrollbarSlider.hoverBackground':    '#2e3d52aa',
        'editorWidget.background':            '#0d1117',
        'editorWidget.border':                '#1c2535',
      }
    });

    monacoEditor = monaco.editor.create(
      document.getElementById('monaco-editor-container'),
      {
        value: '',
        language: 'c',
        theme: 'c42dark',
        fontSize: 14,
        fontFamily: "'Fragment Mono', 'Cascadia Code', 'Fira Code', monospace",
        fontLigatures: true,
        lineHeight: 22,
        tabSize: 4,
        insertSpaces: false,
        wordWrap: 'off',
        minimap: { enabled: false },
        scrollBeyondLastLine: false,
        renderLineHighlight: 'all',
        cursorBlinking: 'smooth',
        cursorSmoothCaretAnimation: 'on',
        smoothScrolling: true,
        automaticLayout: true,
        padding: { top: 14, bottom: 14 },
        lineNumbers: 'on',
        glyphMargin: false,
        folding: false,
        lineDecorationsWidth: 4,
        renderWhitespace: 'none',
        overviewRulerLanes: 0,
        hideCursorInOverviewRuler: true,
        scrollbar: {
          verticalScrollbarSize: 5,
          horizontalScrollbarSize: 5,
          useShadows: false,
        },
        contextmenu: false,
        fixedOverflowWidgets: true,
      }
    );

    // Show greyed placeholder text until user types
    monacoEditor.onDidChangeModelContent(() => {
      const val = monacoEditor.getValue();
      const placeholder = document.querySelector('.monaco-placeholder');
      if (placeholder) placeholder.style.display = val ? 'none' : 'block';
    });
  });
}

function getEditorValue() {
  return monacoEditor ? monacoEditor.getValue() : '';
}

function clearEditor() {
  if (!monacoEditor) return;
  monacoEditor.setValue('');
  monacoEditor.setScrollPosition({ scrollTop: 0, scrollLeft: 0 });
  monacoEditor.focus();
}


/* ══════════════════════════════════════════════════════════════
   7. CODE RUNNER
══════════════════════════════════════════════════════════════ */

function runCode() {
  const code = getEditorValue().trim();
  const ch   = STATE.challengePool[STATE.challengeIndex];
  const tests = TEST_CASES[ch.name] || [];

  const outputEl = document.getElementById('run-output');
  const casesEl  = document.getElementById('run-cases');
  const statusEl = document.getElementById('run-status');

  outputEl.classList.remove('hidden');
  casesEl.innerHTML = '';

  if (code.length < 10) {
    statusEl.textContent = '⚠ EMPTY';
    statusEl.style.color = 'var(--warn)';
    casesEl.innerHTML = `<div class="test-case fail"><span class="test-icon">⚠</span><div class="test-info"><span class="test-name">NO CODE</span><span class="test-detail">Write something first!</span></div></div>`;
    return;
  }

  let passed = 0;

  tests.forEach((test, i) => {
    setTimeout(() => {
      const ok = test.keywords.length === 0 || test.keywords.some(kw => code.includes(kw));
      if (ok) passed++;

      const div = document.createElement('div');
      div.className = `test-case ${ok ? 'pass' : 'fail'}`;
      div.innerHTML = `
        <span class="test-icon">${ok ? '✅' : '❌'}</span>
        <div class="test-info">
          <span class="test-name">TEST ${i + 1}: ${test.label}</span>
          <span class="test-detail">${test.desc}</span>
        </div>`;
      casesEl.appendChild(div);

      if (i === tests.length - 1) {
        const allPassed = passed === tests.length;
        statusEl.textContent = `${passed}/${tests.length} PASSED`;
        statusEl.style.color = allPassed ? 'var(--good)' : passed > 0 ? 'var(--warn)' : 'var(--danger)';
        if (!STATE.selfGrade) {
          if (allPassed)       setSelfGrade('perfect');
          else if (passed > 0) setSelfGrade('almost');
          else                 setSelfGrade('struggled');
        }
      }
    }, i * 180);
  });
}


/* ══════════════════════════════════════════════════════════════
   8. ACHIEVEMENTS & WEAKNESS
══════════════════════════════════════════════════════════════ */

const ACHIEVEMENTS_DEF = [
  { id: 'first_run',    icon: '🚀', name: 'FIRST RUN',    desc: 'Completed your first evaluation' },
  { id: 'score_80',     icon: '🎯', name: 'SHARPSHOOTER', desc: 'Scored above 80/100' },
  { id: 'all_perfect',  icon: '💎', name: 'FLAWLESS',     desc: 'All 10 challenges rated Perfect/Almost' },
  { id: 'xp_100',       icon: '⚡', name: '100 XP',       desc: 'Accumulated 100+ total XP' },
  { id: 'perfect_quiz', icon: '🧠', name: 'BIG BRAIN',    desc: 'Got 10/10 on the quiz' },
  { id: 'expert_done',  icon: '🔴', name: 'EXPERT MODE',  desc: 'Completed an Expert evaluation' }
];

function buildAchievementStatus(stored) {
  const earned = { ...(stored.achievements || {}) };
  earned.first_run    = true;
  if ((stored.lastScore || 0) > 80)                               earned.score_80     = true;
  if (STATE.challengeScores.length >= 10 &&
      STATE.challengeScores.every(s => s >= 7))                   earned.all_perfect  = true;
  if ((stored.totalXP || 0) >= 100)                               earned.xp_100       = true;
  if (STATE.quizCorrect === 10)                                   earned.perfect_quiz = true;
  if (STATE.selectedLevel === 'expert')                           earned.expert_done  = true;
  return earned;
}

function renderAchievements() {
  const stored = loadStorage();
  const earned = buildAchievementStatus(stored);
  const grid = document.getElementById('achievements-grid');
  grid.innerHTML = ACHIEVEMENTS_DEF.map(a => `
    <div class="achievement-pill ${earned[a.id] ? 'earned' : ''}">
      <span class="ach-icon">${a.icon}</span>
      <div class="ach-info">
        <span class="ach-name">${a.name}</span>
        <span class="ach-desc">${a.desc}</span>
      </div>
    </div>`).join('');
}

const CHALLENGE_TOPICS = {
  ft_putchar:'I/O',ft_isalpha:'BASICS',ft_max:'FUNCTIONS',print_numbers:'LOOPS',
  ft_strlen:'STRINGS',ft_isdigit:'BASICS',first_last_char:'ARRAYS',ft_putstr:'I/O',
  is_negative:'IF/ELSE',ft_strcpy:'STRINGS',swap:'POINTERS',ft_atoi:'STRINGS',
  reverse_string:'STRINGS',rot13:'STRINGS',repeat_alpha:'STRINGS',ulstr:'STRINGS',
  ft_memset:'MEMORY',count_words:'STRINGS',ft_strrev:'STRINGS',ft_strcmp:'STRINGS',
  ft_memcpy:'MEMORY',ft_itoa:'MEMORY',ft_split:'MEMORY',ft_memmove:'MEMORY',
  bit_counter:'BIT OPS',ft_strdup:'MEMORY',swap_bits:'BIT OPS',ft_lstnew:'MEMORY',
  ft_strtrim:'STRINGS',print_hex:'BIT OPS'
};

function renderWeaknesses() {
  const listEl = document.getElementById('weakness-list');
  const allTopics = {};

  Object.entries(STATE.topicMistakes || {}).forEach(([topic, mistakes]) => {
    const total = STATE.quizPool.filter(q => q.topic === topic).length;
    if (total > 0) allTopics[topic] = Math.round(((total - mistakes) / total) * 100);
  });

  STATE.challengePool.forEach((ch, i) => {
    const score = STATE.challengeScores[i] ?? 5;
    const topic = CHALLENGE_TOPICS[ch.name] || 'GENERAL';
    const pct   = Math.round((score / 10) * 100);
    allTopics[topic] = allTopics[topic] === undefined ? pct : Math.round((allTopics[topic] + pct) / 2);
  });

  if (Object.keys(allTopics).length === 0) {
    listEl.innerHTML = `<p class="weakness-no-issues">✅ Not enough data — complete the full evaluation for detailed analysis.</p>`;
    return;
  }

  const sorted = Object.entries(allTopics).sort((a, b) => a[1] - b[1]);

  listEl.innerHTML = sorted.map(([topic, pct]) => {
    const cls   = pct < 50 ? 'weak' : pct < 75 ? 'medium' : 'strong';
    const label = pct < 50 ? '🔴 Needs work' : pct < 75 ? '🟡 Improving' : '🟢 Strong';
    const color = cls === 'weak' ? 'var(--danger)' : cls === 'medium' ? 'var(--warn)' : 'var(--good)';
    return `
      <div class="weakness-row">
        <div class="weakness-label">
          <span class="weakness-name" style="color:${color}">${topic}</span>
          <span class="weakness-pct">${pct}% — ${label}</span>
        </div>
        <div class="weakness-bar-track">
          <div class="weakness-bar-fill ${cls}" data-width="${pct}" style="width:0%"></div>
        </div>
      </div>`;
  }).join('');

  setTimeout(() => {
    listEl.querySelectorAll('.weakness-bar-fill[data-width]').forEach(el => {
      el.style.width = el.dataset.width + '%';
    });
  }, 80);
}


/* ══════════════════════════════════════════════════════════════
   9. QUIZ LOGIC
══════════════════════════════════════════════════════════════ */

function initQuiz() {
  STATE.quizPool      = shuffle(QUESTIONS[STATE.selectedLevel]).slice(0, 10);
  STATE.quizIndex     = 0;
  STATE.quizCorrect   = 0;
  STATE.topicMistakes = {};
  STATE.sessionXP     = 0;

  // Update level badge
  const badge = document.getElementById('quiz-level-badge');
  if (badge) badge.textContent = `QUIZ · ${STATE.selectedLevel.toUpperCase()}`;

  stopTimer(STATE.quizTimerID);
  STATE.quizTimerID = startTimer(300, 'quiz-timer-val', 'quiz-timer', () => endQuiz());

  renderQuestion();
}

function renderQuestion() {
  const q     = STATE.quizPool[STATE.quizIndex];
  const idx   = STATE.quizIndex;
  const total = STATE.quizPool.length;
  const letters = ['A', 'B', 'C', 'D'];

  document.getElementById('q-counter').textContent       = `Q ${idx + 1}/${total}`;
  document.getElementById('quiz-score-live').textContent = `${STATE.quizCorrect} / 10`;
  setProgress('quiz-progress', 'quiz-progress-label', (idx / total) * 100);
  document.getElementById('q-topic').textContent = `// ${q.topic}`;
  document.getElementById('q-text').innerHTML    = q.q;

  const container = document.getElementById('options-container');
  container.innerHTML = '';
  q.options.forEach((opt, i) => {
    const btn = document.createElement('button');
    btn.className = 'opt-btn';
    btn.innerHTML = `<span class="opt-letter">${letters[i]}</span>${opt}`;
    btn.onclick   = () => handleQuizAnswer(i);
    container.appendChild(btn);
  });

  document.getElementById('explain-box').classList.add('hidden');
  document.getElementById('explain-box').textContent = '';
  document.getElementById('btn-next-q').classList.add('hidden');
  STATE.quizAnswered = false;

  const card = document.getElementById('question-card');
  card.style.animation = 'none';
  void card.offsetWidth;
  card.style.animation = 'cardIn .4s ease';
}

function handleQuizAnswer(selected) {
  if (STATE.quizAnswered) return;
  STATE.quizAnswered = true;

  const q       = STATE.quizPool[STATE.quizIndex];
  const buttons = document.querySelectorAll('.opt-btn');
  const correct = q.answer;

  buttons.forEach(b => b.disabled = true);
  buttons[correct].classList.add('correct');

  if (selected !== correct) {
    buttons[selected].classList.add('wrong');
    STATE.topicMistakes[q.topic] = (STATE.topicMistakes[q.topic] || 0) + 1;
  } else {
    STATE.quizCorrect++;
    document.getElementById('quiz-score-live').textContent = `${STATE.quizCorrect} / 10`;
    awardXP(5);
  }

  const exBox = document.getElementById('explain-box');
  exBox.classList.remove('hidden');
  exBox.textContent = '💡 ' + q.explain;
  document.getElementById('btn-next-q').classList.remove('hidden');
}

function nextQuestion() {
  STATE.quizIndex++;
  if (STATE.quizIndex >= STATE.quizPool.length) endQuiz();
  else renderQuestion();
}

function endQuiz() {
  stopTimer(STATE.quizTimerID);
  STATE.finalQuizScore = STATE.quizCorrect;

  const score = STATE.quizCorrect;
  let msg;
  if (score <= 3)      msg = "Rough start. Don't worry — the code phase is where you prove yourself.";
  else if (score <= 6) msg = "Decent. Gaps exist. Let's see if your code is stronger than your theory.";
  else if (score <= 8) msg = "Solid theory. Now show the same energy in the coding phase.";
  else                 msg = "Almost perfect. Time to back it up with code.";

  document.getElementById('quiz-final-score').textContent = `${score}/10`;
  document.getElementById('quiz-grade-msg').textContent   = msg;
  showScreen('screen-quiz-done');
}


/* ══════════════════════════════════════════════════════════════
   10. CHALLENGE LOGIC
══════════════════════════════════════════════════════════════ */

function startChallenges() {
  STATE.challengePool    = shuffle(CHALLENGES[STATE.selectedLevel]).slice(0, 10);
  STATE.challengeIndex   = 0;
  STATE.challengeScores  = [];
  STATE.challengeWeakness = [];
  STATE.selfGrade        = null;

  const badge = document.getElementById('code-level-badge');
  if (badge) badge.textContent = `CHALLENGE · ${STATE.selectedLevel.toUpperCase()}`;

  stopTimer(STATE.codeTimerID);
  STATE.codeTimerID = startTimer(1800, 'code-timer-val', 'code-timer', () => endChallenges());

  showScreen('screen-challenges');
  renderChallenge();
}

function renderChallenge() {
  const ch    = STATE.challengePool[STATE.challengeIndex];
  const idx   = STATE.challengeIndex;
  const total = STATE.challengePool.length;

  document.getElementById('c-counter').textContent       = `C ${idx + 1}/${total}`;
  document.getElementById('code-score-live').textContent =
    `${STATE.challengeScores.reduce((a, b) => a + b, 0)} / 100`;
  setProgress('code-progress', 'code-progress-label', (idx / total) * 100);

  document.getElementById('ch-name').textContent     = ch.name;
  document.getElementById('ch-filename').textContent = ch.filename;

  const diffEl = document.getElementById('ch-diff');
  diffEl.textContent = ch.difficulty.toUpperCase();
  diffEl.className   = 'diff-badge diff-' + ch.difficulty;

  document.getElementById('ch-desc').innerHTML = ch.desc + `<br><br><code>${ch.proto}</code>`;

  const exBlock = document.getElementById('ch-examples');
  exBlock.innerHTML = ch.examples.map(e => `
    <div class="ex-row">
      <span class="ex-label">INPUT</span><span class="ex-val">${e.in}</span>
      <span class="ex-label" style="margin-left:12px">OUTPUT</span><span class="ex-val">${e.out}</span>
    </div>`).join('');

  document.getElementById('ch-hint').innerHTML = `<strong>💡 HINT:</strong> ${ch.hint}`;

  clearEditor();
  document.querySelectorAll('.sg-btn').forEach(b => b.classList.remove('selected'));
  STATE.selfGrade = null;
  document.getElementById('solution-reveal').classList.add('hidden');
  document.getElementById('run-output').classList.add('hidden');

  // Lock NEXT until self-graded; clear any previous warning state
  const nextBtn = document.querySelector('.ch-actions .btn-next');
  if (nextBtn) nextBtn.classList.add('locked');
  const row = document.querySelector('.self-grade-row');
  const msg = document.getElementById('lock-msg');
  if (row) row.classList.remove('needs-grade', 'shake');
  if (msg) msg.classList.remove('visible');

  const card = document.querySelector('.challenge-card');
  card.style.animation = 'none';
  void card.offsetWidth;
  card.style.animation = 'cardIn .4s ease';
}

function setSelfGrade(val) {
  STATE.selfGrade = val;
  document.querySelectorAll('.sg-btn').forEach(b => b.classList.remove('selected'));
  const map = { perfect:'sg-perfect', almost:'sg-almost', struggled:'sg-struggled', skipped:'sg-skipped' };
  document.getElementById(map[val]).classList.add('selected');

  // Unlock NEXT button
  const nextBtn = document.querySelector('.ch-actions .btn-next');
  if (nextBtn) nextBtn.classList.remove('locked');

  // Clear the lock warning
  const row = document.querySelector('.self-grade-row');
  const msg = document.getElementById('lock-msg');
  if (row) row.classList.remove('needs-grade', 'shake');
  if (msg) msg.classList.remove('visible');
}

function toggleSolution() {
  const box = document.getElementById('solution-reveal');
  const pre = document.getElementById('sol-code');
  if (box.classList.contains('hidden')) {
    pre.textContent = STATE.challengePool[STATE.challengeIndex].solution;
    box.classList.remove('hidden');
  } else {
    box.classList.add('hidden');
  }
}

function scoreChallenge() {
  const gradeToPoints = { perfect:10, almost:7, struggled:3, skipped:0, null:5 };
  return gradeToPoints[STATE.selfGrade] ?? 5;
}

function nextChallenge() {
  // ── GATE: must self-grade before advancing ──────────────────
  if (!STATE.selfGrade) {
    const row = document.querySelector('.self-grade-row');
    const msg = document.getElementById('lock-msg');
    if (row) {
      row.classList.add('needs-grade', 'shake');
      setTimeout(() => row.classList.remove('shake'), 420);
    }
    if (msg) msg.classList.add('visible');
    return;
  }

  const pts = scoreChallenge();
  STATE.challengeScores.push(pts);
  if (STATE.selfGrade === 'perfect') awardXP(10);
  else if (STATE.selfGrade === 'almost') awardXP(5);

  const ch = STATE.challengePool[STATE.challengeIndex];
  STATE.challengeWeakness.push({ name: ch.name, topic: CHALLENGE_TOPICS[ch.name] || 'GENERAL', score: pts });

  STATE.challengeIndex++;
  if (STATE.challengeIndex >= STATE.challengePool.length) endChallenges();
  else renderChallenge();
}

function endChallenges() {
  stopTimer(STATE.codeTimerID);
  STATE.finalCodeScore = STATE.challengeScores.reduce((a, b) => a + b, 0);
  const quizPct = (STATE.finalQuizScore / 10) * 50;
  const codePct = (STATE.finalCodeScore / 100) * 50;
  STATE.finalScore = Math.round(quizPct + codePct);
  showResults();
}


/* ══════════════════════════════════════════════════════════════
   11. RESULTS & COACH
══════════════════════════════════════════════════════════════ */

function showResults() {
  showScreen('screen-results');

  const quiz  = STATE.finalQuizScore;
  const code  = STATE.finalCodeScore;
  const total = STATE.finalScore;

  document.getElementById('res-quiz').textContent  = `${quiz}/10`;
  document.getElementById('res-code').textContent  = `${code}/100`;
  document.getElementById('res-final').textContent = `${total}/100`;

  const levelColors = { beginner:'var(--accent-code)', intermediate:'var(--warn)', expert:'var(--danger)' };
  const rltEl = document.getElementById('result-level-tag');
  if (rltEl) {
    rltEl.textContent = `// ${STATE.selectedLevel.toUpperCase()} LEVEL`;
    rltEl.style.color = levelColors[STATE.selectedLevel] || 'var(--text-dim)';
  }

  setTimeout(() => { document.getElementById('final-bar').style.width = total + '%'; }, 200);

  let emoji, ratingText;
  if (total < 40)      { emoji = '💀'; ratingText = 'oh hellll nah twin 💀'; }
  else if (total < 75) { emoji = '😐'; ratingText = 'maybe... 😐'; }
  else                 { emoji = '🐐🔥'; ratingText = 'u r the goat 🐐🔥'; }

  document.getElementById('rating-emoji').textContent = emoji;
  document.getElementById('rating-text').textContent  = ratingText;

  persistSession();
  renderAchievements();
  renderWeaknesses();
  buildCoachSection(total);
}

function buildCoachSection(score) {
  let tierTag, verdict, roadmapSteps, exercises;
  const lvl = STATE.selectedLevel;

  const weakTopics = Object.entries(STATE.topicMistakes || {})
    .filter(([, m]) => m > 0).sort((a, b) => b[1] - a[1]).map(([t]) => t);
  const weakChallenges = (STATE.challengeWeakness || []).filter(c => c.score < 5).map(c => c.name);
  const weakSummary = weakTopics.length > 0
    ? `Based on your answers, your weakest areas are: <strong>${weakTopics.join(', ')}</strong>.`
    : '';

  const levelLabel = { beginner: 'BEGINNER 🟢', intermediate: 'INTERMEDIATE 🟡', expert: 'EXPERT 🔴' }[lvl];

  if (score < 40) {
    tierTag = `// COACH SAYS — BRUTALLY HONEST [${levelLabel}] 🔴`;
    verdict = `${score}/100 at ${lvl} level — that's a hard truth. ${weakSummary} Stop guessing. Rebuild from zero. Every line you write, you should be able to explain why.`;
    roadmapSteps = [
      "Drill the basics until they are automatic. No IDE, no autocomplete.",
      "Write 5 small programs daily — actual C code that compiles and runs.",
      "Learn to read compiler errors. They're telling you exactly what's wrong.",
      lvl === 'beginner' ? "Master for/while loops, if/else, and basic functions before anything else." :
      lvl === 'intermediate' ? "Pointer fundamentals first. Draw memory diagrams for every pointer you use." :
      "Go back to intermediate topics — you're not ready for expert yet.",
      "Do NOT move on to the next level until you can write these from memory: " + (weakChallenges.slice(0, 3).join(', ') || 'ft_strlen, swap, ft_atoi')
    ];
    exercises = lvl === 'beginner'
      ? ['ft_putchar', 'ft_strlen', 'ft_isalpha', 'is_negative', 'print_numbers']
      : lvl === 'intermediate'
      ? ['swap', 'ft_atoi', 'reverse_string', 'ft_strcmp', 'count_words']
      : ['ft_memcpy', 'ft_strdup', 'bit_counter', 'print_hex', 'swap_bits'];

  } else if (score < 75) {
    tierTag = `// COACH SAYS — HONEST AND PUSHING [${levelLabel}] 🟡`;
    verdict = `${score}/100. You're not bad, but you're not solid either. ${weakSummary} The gaps are real — they'll catch you in real 42 evaluations. Stop being comfortable with "it works most of the time."`;
    roadmapSteps = [
      lvl === 'beginner' ? "Consolidate your basics: write every function from memory." :
      lvl === 'intermediate' ? "Pointers are your weak spot. Spend a full week on pointer exercises." :
      "Hard pointer logic and memory management need to be second nature.",
      "Read your code out loud — can you explain every line? If not, you don't understand it yet.",
      "Test edge cases: empty strings, NULL, INT_MIN, INT_MAX, empty arrays.",
      "Debug systematically with printf. Understand the flow before guessing.",
      weakChallenges.length > 0 ? `Redo these until you nail them: ${weakChallenges.slice(0, 4).join(', ')}.` :
        "Practice all challenges again under time pressure."
    ];
    exercises = lvl === 'beginner'
      ? ['ft_strcpy', 'reverse_string', 'ft_isdigit', 'first_last_char', 'ft_putstr']
      : lvl === 'intermediate'
      ? ['rot13', 'repeat_alpha', 'ulstr', 'ft_memset', 'ft_strrev']
      : ['ft_itoa', 'ft_memmove', 'ft_strtrim', 'ft_split', 'ft_lstnew'];

  } else {
    tierTag = `// COACH SAYS — PUSHING HIGHER [${levelLabel}] 🟢`;
    const remainingWeak = weakTopics.length > 0
      ? ` Don't ignore ${weakTopics[0]} — a gap there will cost you in real projects.`
      : ' Your fundamentals are clean across the board — rare.';
    verdict = `${score}/100. Strong work — you actually know what you're doing.${remainingWeak} ` +
      (lvl === 'expert'
        ? 'You\'re ready to build real C projects. Try a mini shell, ft_printf, or a memory allocator.'
        : `You're ready for the next level. ${lvl === 'beginner' ? 'Move to Intermediate.' : 'Move to Expert.'}`);
    roadmapSteps = lvl === 'expert'
      ? [
          "Build a mini shell in C — handle fork(), exec(), waitpid(), redirections.",
          "Implement ft_printf from scratch. It will expose every gap you have.",
          "Dive into low-level: file descriptors, signals, memory-mapped files.",
          "Read the source of quality C projects on GitHub. Steal what's elegant.",
          "Try CTF pwn challenges — they force you to understand C at the assembly level."
        ]
      : [
          `You've mastered ${lvl} level. Move to ${lvl === 'beginner' ? 'Intermediate' : 'Expert'} level.`,
          "Time pressure is real at 42 — practice each exercise until it's automatic.",
          "Start reading man pages: man 3 string, man 3 stdlib are your new best friends.",
          "Review every challenge you struggled with and redo it from memory."
        ];
    exercises = lvl === 'expert'
      ? ['mini shell', 'ft_printf', 'libft full', 'memory allocator', 'CTF pwn challenges']
      : lvl === 'intermediate'
      ? ['move to Expert level', 'ft_split', 'ft_memmove', 'ft_itoa', 'ft_lstnew']
      : ['move to Intermediate level', 'swap', 'ft_atoi', 'reverse_string', 'ft_strcmp'];
  }

  document.getElementById('coach-tier-tag').textContent = tierTag;
  document.getElementById('coach-verdict').innerHTML    = verdict;

  const roadmapEl = document.getElementById('coach-roadmap');
  roadmapEl.innerHTML = `
    <p class="roadmap-title">// YOUR ROADMAP</p>
    <ol class="roadmap-steps">
      ${roadmapSteps.map((step, i) => `
        <li><span class="step-num">0${i + 1}</span>${step}</li>
      `).join('')}
    </ol>`;

  const exEl = document.getElementById('coach-exercises');
  exEl.innerHTML = `
    <p class="exercises-title">// PRACTICE THESE NOW</p>
    <div class="exercise-chips">
      ${exercises.map(ex => `<span class="ex-chip">${ex}</span>`).join('')}
    </div>`;
}


/* ══════════════════════════════════════════════════════════════
   12. NAVIGATION
══════════════════════════════════════════════════════════════ */

function selectLevel(level) {
  STATE.selectedLevel = level;
  initQuiz();
  showScreen('screen-quiz');
}

function trainAgain() {
  stopTimer(STATE.quizTimerID);
  stopTimer(STATE.codeTimerID);

  STATE.quizPool          = [];
  STATE.quizIndex         = 0;
  STATE.quizCorrect       = 0;
  STATE.quizAnswered      = false;
  STATE.challengePool     = [];
  STATE.challengeIndex    = 0;
  STATE.challengeScores   = [];
  STATE.challengeWeakness = [];
  STATE.selfGrade         = null;
  STATE.finalQuizScore    = 0;
  STATE.finalCodeScore    = 0;
  STATE.finalScore        = 0;
  STATE.topicMistakes     = {};
  STATE.sessionXP         = 0;
  STATE.quizTimerID       = null;
  STATE.codeTimerID       = null;

  setProgress('quiz-progress', 'quiz-progress-label', 0);
  setProgress('code-progress', 'code-progress-label', 0);
  document.getElementById('final-bar').style.width = '0%';

  renderXPPanel();
  showScreen('screen-landing');
}


/* ══════════════════════════════════════════════════════════════
   13. INIT
══════════════════════════════════════════════════════════════ */

document.addEventListener('DOMContentLoaded', () => {
  showScreen('screen-landing');
  renderXPPanel();
  initEditor();
});
