/* ═══════════════════════════════════════════════════════════════
   42 C TRAINER — script.js
   Author: C Trainer v2.0
   Structure:
     1. DATA — Questions pool (20+)
     2. DATA — Challenges pool (15+)
     3. STATE — Session variables
     4. UTILITIES — Helper functions
     5. QUIZ LOGIC
     6. CHALLENGE LOGIC
     7. RESULTS & COACH LOGIC
     8. NAVIGATION (screen switching)
     9. INIT
═══════════════════════════════════════════════════════════════ */


/* ══════════════════════════════════════════════════════════════
   1. DATA — QUESTION POOL (22 questions)
══════════════════════════════════════════════════════════════ */

const QUESTION_POOL = [

  /* ── BASICS ── */
  {
    topic: "BASICS",
    q: "What is the correct way to declare an integer variable named <code>age</code> with value 21?",
    options: ["int age = 21;", "integer age = 21;", "var age = 21;", "age int = 21;"],
    answer: 0,
    explain: "In C, variables are declared as: type name = value; — so int age = 21; is correct. C has no 'var' keyword."
  },
  {
    topic: "BASICS",
    q: "How many times does this loop execute? <code>for (int i = 0; i < 5; i++)</code>",
    options: ["4", "5", "6", "Infinite"],
    answer: 1,
    explain: "i starts at 0, runs while i < 5 (i = 0,1,2,3,4) — that's exactly 5 iterations."
  },
  {
    topic: "BASICS",
    q: "What does the <code>%d</code> format specifier print?",
    options: ["A float", "A decimal integer", "A character", "A string"],
    answer: 1,
    explain: "%d is for signed decimal integers. Use %f for floats, %c for chars, %s for strings."
  },
  {
    topic: "BASICS",
    q: "What is the output of: <code>printf(\"%d\", 10 / 3);</code>",
    options: ["3.33", "3", "4", "Error"],
    answer: 1,
    explain: "Integer division truncates toward zero: 10 / 3 = 3 in C. To get 3.33, use float: 10.0 / 3."
  },
  {
    topic: "BASICS",
    q: "Which keyword skips the rest of a loop iteration and goes to the next one?",
    options: ["break", "return", "skip", "continue"],
    answer: 3,
    explain: "continue jumps to the next loop iteration. break exits the loop entirely. return exits the function."
  },

  /* ── FUNCTIONS ── */
  {
    topic: "FUNCTIONS",
    q: "What is the return type of a function that returns nothing?",
    options: ["int", "null", "void", "empty"],
    answer: 2,
    explain: "void means 'no value'. A function declared void returns nothing. It's not the same as NULL (which is a null pointer)."
  },
  {
    topic: "FUNCTIONS",
    q: "In C, arguments are passed to functions by:",
    options: ["Reference by default", "Value by default", "Pointer only", "It depends on the type"],
    answer: 1,
    explain: "C passes arguments by VALUE — a copy is made. To modify the original, you must pass a pointer to it."
  },
  {
    topic: "FUNCTIONS",
    q: "What does this function return? <code>int add(int a, int b) { return a + b; }</code> called as <code>add(3, 4)</code>",
    options: ["3", "4", "7", "34"],
    answer: 2,
    explain: "add(3, 4) returns 3 + 4 = 7. The '+' operator adds the two integers."
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
    explain: "static at file scope limits visibility to that translation unit. It's private to that .c file — not exported."
  },

  /* ── ARRAYS & STRINGS ── */
  {
    topic: "ARRAYS & STRINGS",
    q: "Given <code>char s[] = \"hello\";</code>, what is <code>s[5]</code>?",
    options: ["'o'", "'\\\\0'", "undefined", "'h'"],
    answer: 1,
    explain: "\"hello\" has 5 chars (indices 0–4) plus a null terminator '\\0' at index 5. That's how C strings work."
  },
  {
    topic: "ARRAYS & STRINGS",
    q: "What does <code>strlen(\"42\")</code> return?",
    options: ["3", "2", "1", "0"],
    answer: 1,
    explain: "strlen counts characters until '\\0'. \"42\" has 2 characters — '4' and '2'. The null terminator is not counted."
  },
  {
    topic: "ARRAYS & STRINGS",
    q: "Which is the correct way to copy string <code>src</code> into <code>dst</code>?",
    options: ["dst = src;", "strcpy(dst, src);", "dst == src;", "copy(dst, src);"],
    answer: 1,
    explain: "dst = src copies the pointer, not the content! Use strcpy() or memcpy() to copy the actual string bytes."
  },
  {
    topic: "ARRAYS & STRINGS",
    q: "What is <code>arr[3]</code> equivalent to in pointer notation?",
    options: ["*arr + 3", "*(arr + 3)", "&arr[3]", "arr * 3"],
    answer: 1,
    explain: "arr[i] is syntactic sugar for *(arr + i). The compiler translates both identically."
  },

  /* ── POINTERS ── */
  {
    topic: "POINTERS",
    q: "What does the <code>&</code> operator return?",
    options: ["The value of a variable", "The address of a variable", "A bitwise AND", "The size of a variable"],
    answer: 1,
    explain: "& is the address-of operator. &x gives you the memory address where x is stored. The * operator dereferences it."
  },
  {
    topic: "POINTERS",
    q: "If <code>int *p = &x;</code> and <code>x = 10</code>, what is <code>*p</code>?",
    options: ["The address of x", "10", "The address of p", "Undefined"],
    answer: 1,
    explain: "*p dereferences p — it gives the value at the address p holds. Since p = &x and x = 10, *p == 10."
  },
  {
    topic: "POINTERS",
    q: "What causes a segmentation fault (segfault)?",
    options: [
      "Dividing by zero",
      "Using an uninitialized int",
      "Dereferencing a NULL or invalid pointer",
      "Declaring too many variables"
    ],
    answer: 2,
    explain: "Segfaults happen when you access memory you're not allowed to — like NULL (address 0) or freed/uninitialized pointers."
  },
  {
    topic: "POINTERS",
    q: "What does <code>malloc</code> return on failure?",
    options: ["0", "-1", "NULL", "It crashes immediately"],
    answer: 2,
    explain: "malloc returns NULL when allocation fails. Always check! if (!ptr) { /* handle error */ }"
  },
  {
    topic: "POINTERS",
    q: "What is wrong with this code? <code>char *s = \"hello\"; s[0] = 'H';</code>",
    options: [
      "Nothing, it works fine",
      "You can't declare char* like that",
      "String literals are read-only — undefined behavior",
      "s[0] should be *s[0]"
    ],
    answer: 2,
    explain: "String literals live in read-only memory. Modifying them is undefined behavior (often a segfault). Use char s[] = \"hello\"; instead."
  },

  /* ── ARGC / ARGV ── */
  {
    topic: "ARGC / ARGV",
    q: "In <code>int main(int argc, char **argv)</code>, if run as <code>./prog hello 42</code>, what is <code>argc</code>?",
    options: ["2", "3", "1", "4"],
    answer: 1,
    explain: "argc counts ALL arguments including the program name. ./prog hello 42 → argc = 3 (\"./prog\", \"hello\", \"42\")."
  },
  {
    topic: "ARGC / ARGV",
    q: "What type is <code>argv[1]</code>?",
    options: ["int", "char", "char *", "char **"],
    answer: 2,
    explain: "argv is char** — an array of char pointers. argv[1] is one of those pointers — a char* (a C string)."
  },
  {
    topic: "ARGC / ARGV",
    q: "How do you convert <code>argv[1]</code> to an integer?",
    options: ["(int)argv[1]", "argv[1] + 0", "atoi(argv[1])", "int(argv[1])"],
    answer: 2,
    explain: "atoi() converts a string to an int. For better error handling, use strtol(). (int)argv[1] casts the pointer — wrong!"
  },
  {
    topic: "ARGC / ARGV",
    q: "What is <code>argv[argc]</code> guaranteed to be?",
    options: ["Undefined", "NULL", "An empty string", "The last argument"],
    answer: 1,
    explain: "The C standard guarantees argv[argc] == NULL. This is useful for iterating without using argc."
  }
];


/* ══════════════════════════════════════════════════════════════
   2. DATA — CHALLENGE POOL (15 challenges)
══════════════════════════════════════════════════════════════ */

const CHALLENGE_POOL = [
  {
    name: "ft_strlen",
    filename: "ft_strlen.c",
    difficulty: "easy",
    desc: "Write the function <code>ft_strlen</code> that returns the number of characters in a string, without using any standard library string functions.",
    proto: "int\tft_strlen(const char *s);",
    examples: [
      { in: 'ft_strlen("hello")',    out: "5" },
      { in: 'ft_strlen("")',         out: "0" },
      { in: 'ft_strlen("42 school")', out: "9" }
    ],
    hint: "Walk the pointer forward until you hit '\\0'. The count at that point is the length.",
    solution: `int\tft_strlen(const char *s)
{
\tint\tlen;

\tlen = 0;
\twhile (s[len] != '\\0')
\t\tlen++;
\treturn (len);
}`
  },
  {
    name: "ft_putstr",
    filename: "ft_putstr.c",
    difficulty: "easy",
    desc: "Write the function <code>ft_putstr</code> that prints a string to standard output, character by character, using only <code>write(1, &c, 1)</code>.",
    proto: "void\tft_putstr(char *str);",
    examples: [
      { in: 'ft_putstr("hello")',    out: "hello (printed)" },
      { in: 'ft_putstr("42")',       out: "42 (printed)" },
      { in: 'ft_putstr("")',         out: "(nothing)" }
    ],
    hint: "Loop through each character and call write(1, &str[i], 1). Stop at '\\0'.",
    solution: `#include <unistd.h>

void\tft_putstr(char *str)
{
\tint\ti;

\ti = 0;
\twhile (str[i] != '\\0')
\t{
\t\twrite(1, &str[i], 1);
\t\ti++;
\t}
}`
  },
  {
    name: "reverse_string",
    filename: "reverse_string.c",
    difficulty: "easy",
    desc: "Write a function <code>reverse_string</code> that reverses a string in-place (modifies the original) and returns it.",
    proto: "char\t*reverse_string(char *str);",
    examples: [
      { in: '"hello"',   out: '"olleh"' },
      { in: '"42"',      out: '"24"' },
      { in: '"abcde"',   out: '"edcba"' }
    ],
    hint: "Use two indices: left=0, right=len-1. Swap and move inward until they meet.",
    solution: `char\t*reverse_string(char *str)
{
\tint\tleft;
\tint\tright;
\tchar\ttmp;

\tleft = 0;
\tright = 0;
\twhile (str[right])
\t\tright++;
\tright--;
\twhile (left < right)
\t{
\t\ttmp = str[left];
\t\tstr[left] = str[right];
\t\tstr[right] = tmp;
\t\tleft++;
\t\tright--;
\t}
\treturn (str);
}`
  },
  {
    name: "first_last_char",
    filename: "first_last_char.c",
    difficulty: "easy",
    desc: "Write a program that takes a string as argument and prints its first character, a newline, its last character, and a newline. If no argument, print nothing.",
    proto: "int main(int argc, char **argv)",
    examples: [
      { in: '"hello"',   out: "h\no" },
      { in: '"42"',      out: "4\n2" },
      { in: '(no args)', out: "(nothing)" }
    ],
    hint: "argv[1][0] is the first char. Find the last with strlen-1. Check argc >= 2 first.",
    solution: `#include <stdio.h>
#include <string.h>

int\tmain(int argc, char **argv)
{
\tif (argc < 2)
\t\treturn (0);
\tprintf("%c\\n", argv[1][0]);
\tprintf("%c\\n", argv[1][strlen(argv[1]) - 1]);
\treturn (0);
}`
  },
  {
    name: "repeat_alpha",
    filename: "repeat_alpha.c",
    difficulty: "medium",
    desc: "Write a program that takes a string and prints each letter repeated by its position in the alphabet (a=1, b=2...z=26). Non-letter characters are printed as-is.",
    proto: "int main(int argc, char **argv)",
    examples: [
      { in: '"abc"',     out: "abbccc" },
      { in: '"The 42"',  out: "Tttttttttttttttttttthhheeeeeeeeeeeeeeeeeee 42" },
      { in: '"a1b"',     out: "a1bb" }
    ],
    hint: "For each char, determine if it's a letter. If lowercase, repeat it (c-'a'+1) times; if uppercase, (c-'A'+1) times.",
    solution: `#include <stdio.h>

int\tmain(int argc, char **argv)
{
\tint\ti;
\tint\tj;
\tint\trepeat;

\tif (argc != 2)
\t\treturn (0);
\ti = 0;
\twhile (argv[1][i])
\t{
\t\tif (argv[1][i] >= 'a' && argv[1][i] <= 'z')
\t\t\trepeat = argv[1][i] - 'a' + 1;
\t\telse if (argv[1][i] >= 'A' && argv[1][i] <= 'Z')
\t\t\trepeat = argv[1][i] - 'A' + 1;
\t\telse
\t\t\trepeat = 1;
\t\tj = 0;
\t\twhile (j < repeat)
\t\t{
\t\t\tprintf("%c", argv[1][i]);
\t\t\tj++;
\t\t}
\t\ti++;
\t}
\tprintf("\\n");
\treturn (0);
}`
  },
  {
    name: "rot13",
    filename: "rot13.c",
    difficulty: "medium",
    desc: "Write a function <code>rot13</code> that encodes a string using ROT13 cipher. Each letter is replaced by the letter 13 positions after it in the alphabet (wrapping). Non-letters unchanged.",
    proto: "char\t*rot13(char *str);",
    examples: [
      { in: '"Hello"',   out: '"Uryyb"' },
      { in: '"abc"',     out: '"nop"' },
      { in: '"Hello 42"', out: '"Uryyb 42"' }
    ],
    hint: "If char is a letter, check if adding 13 exceeds 'z' or 'Z'. If it does, subtract 13 instead of adding.",
    solution: `char\t*rot13(char *str)
{
\tint\ti;

\ti = 0;
\twhile (str[i])
\t{
\t\tif ((str[i] >= 'a' && str[i] <= 'm') ||
\t\t\t(str[i] >= 'A' && str[i] <= 'M'))
\t\t\tstr[i] += 13;
\t\telse if ((str[i] >= 'n' && str[i] <= 'z') ||
\t\t\t(str[i] >= 'N' && str[i] <= 'Z'))
\t\t\tstr[i] -= 13;
\t\ti++;
\t}
\treturn (str);
}`
  },
  {
    name: "swap",
    filename: "swap.c",
    difficulty: "easy",
    desc: "Write the function <code>swap</code> that swaps the values of two integers using pointers.",
    proto: "void\tswap(int *a, int *b);",
    examples: [
      { in: "a=3, b=7",   out: "a=7, b=3" },
      { in: "a=-1, b=42", out: "a=42, b=-1" },
      { in: "a=0, b=0",   out: "a=0, b=0" }
    ],
    hint: "Use a temporary variable: tmp=*a; *a=*b; *b=tmp;",
    solution: `void\tswap(int *a, int *b)
{
\tint\ttmp;

\ttmp = *a;
\t*a = *b;
\t*b = tmp;
}`
  },
  {
    name: "ft_max",
    filename: "ft_max.c",
    difficulty: "easy",
    desc: "Write the function <code>ft_max</code> that returns the largest of two integers.",
    proto: "int\tft_max(int a, int b);",
    examples: [
      { in: "ft_max(3, 7)",   out: "7" },
      { in: "ft_max(-5, -2)", out: "-2" },
      { in: "ft_max(42, 42)", out: "42" }
    ],
    hint: "A simple ternary: return (a > b) ? a : b; — or use an if/else.",
    solution: `int\tft_max(int a, int b)
{
\tif (a > b)
\t\treturn (a);
\treturn (b);
}`
  },
  {
    name: "print_numbers",
    filename: "print_numbers.c",
    difficulty: "easy",
    desc: "Write a program that prints all numbers from 0 to 9, separated by spaces, followed by a newline.",
    proto: "int main(void)",
    examples: [
      { in: "(run program)", out: "0 1 2 3 4 5 6 7 8 9" }
    ],
    hint: "Loop from 0 to 9. Use write() with '0' + i, and handle the space carefully (no trailing space).",
    solution: `#include <unistd.h>

int\tmain(void)
{
\tint\ti;
\tchar\tc;

\ti = 0;
\twhile (i <= 9)
\t{
\t\tc = '0' + i;
\t\twrite(1, &c, 1);
\t\tif (i < 9)
\t\t\twrite(1, " ", 1);
\t\ti++;
\t}
\twrite(1, "\\n", 1);
\treturn (0);
}`
  },
  {
    name: "ulstr",
    filename: "ulstr.c",
    difficulty: "medium",
    desc: "Write a program that takes a string and switches its case: lowercase becomes uppercase and uppercase becomes lowercase. Prints result + newline. Non-letter chars unchanged.",
    proto: "int main(int argc, char **argv)",
    examples: [
      { in: '"Hello World"', out: '"hELLO wORLD"' },
      { in: '"42 School"',   out: '"42 sCHOOL"' },
      { in: '"abc"',         out: '"ABC"' }
    ],
    hint: "For each char: if 'a'–'z', subtract 32 (or use toupper). If 'A'–'Z', add 32. Print the result.",
    solution: `#include <stdio.h>

int\tmain(int argc, char **argv)
{
\tint\ti;
\tchar\tc;

\tif (argc != 2)
\t\treturn (0);
\ti = 0;
\twhile (argv[1][i])
\t{
\t\tc = argv[1][i];
\t\tif (c >= 'a' && c <= 'z')
\t\t\tc -= 32;
\t\telse if (c >= 'A' && c <= 'Z')
\t\t\tc += 32;
\t\tprintf("%c", c);
\t\ti++;
\t}
\tprintf("\\n");
\treturn (0);
}`
  },
  {
    name: "ft_strcpy",
    filename: "ft_strcpy.c",
    difficulty: "easy",
    desc: "Write the function <code>ft_strcpy</code> that copies the string <code>src</code> into <code>dst</code> (including '\\0') and returns <code>dst</code>.",
    proto: "char\t*ft_strcpy(char *dst, char *src);",
    examples: [
      { in: 'src="hello"',  out: 'dst becomes "hello"' },
      { in: 'src="42"',     out: 'dst becomes "42"' },
      { in: 'src=""',       out: 'dst becomes ""' }
    ],
    hint: "Loop while src[i] != '\\0', copy each byte. Don't forget to copy the null terminator at the end.",
    solution: `char\t*ft_strcpy(char *dst, char *src)
{
\tint\ti;

\ti = 0;
\twhile (src[i] != '\\0')
\t{
\t\tdst[i] = src[i];
\t\ti++;
\t}
\tdst[i] = '\\0';
\treturn (dst);
}`
  },
  {
    name: "ft_isalpha",
    filename: "ft_isalpha.c",
    difficulty: "easy",
    desc: "Write the function <code>ft_isalpha</code> that returns 1 if the character is a letter (a–z or A–Z), 0 otherwise.",
    proto: "int\tft_isalpha(int c);",
    examples: [
      { in: "ft_isalpha('a')",  out: "1" },
      { in: "ft_isalpha('Z')",  out: "1" },
      { in: "ft_isalpha('5')",  out: "0" },
      { in: "ft_isalpha(' ')",  out: "0" }
    ],
    hint: "Check if c is between 'a'–'z' OR between 'A'–'Z'. Return 1 if true, 0 if false.",
    solution: `int\tft_isalpha(int c)
{
\tif ((c >= 'a' && c <= 'z') || (c >= 'A' && c <= 'Z'))
\t\treturn (1);
\treturn (0);
}`
  },
  {
    name: "ft_atoi",
    filename: "ft_atoi.c",
    difficulty: "medium",
    desc: "Write the function <code>ft_atoi</code> that converts a string to an integer, handling optional leading whitespace, an optional sign (+ or -), and digits. Ignore trailing non-digits.",
    proto: "int\tft_atoi(const char *str);",
    examples: [
      { in: '"42"',       out: "42" },
      { in: '"-15"',      out: "-15" },
      { in: '"  +7abc"',  out: "7" },
      { in: '"0"',        out: "0" }
    ],
    hint: "Step 1: skip whitespace. Step 2: check for sign. Step 3: convert digits with result = result*10 + (c-'0').",
    solution: `int\tft_atoi(const char *str)
{
\tint\ti;
\tint\tsign;
\tint\tresult;

\ti = 0;
\tsign = 1;
\tresult = 0;
\twhile (str[i] == ' ' || (str[i] >= 9 && str[i] <= 13))
\t\ti++;
\tif (str[i] == '-' || str[i] == '+')
\t{
\t\tif (str[i] == '-')
\t\t\tsign = -1;
\t\ti++;
\t}
\twhile (str[i] >= '0' && str[i] <= '9')
\t{
\t\tresult = result * 10 + (str[i] - '0');
\t\ti++;
\t}
\treturn (sign * result);
}`
  },
  {
    name: "ft_memset",
    filename: "ft_memset.c",
    difficulty: "medium",
    desc: "Write the function <code>ft_memset</code> that fills the first <code>n</code> bytes of memory area <code>s</code> with the constant byte <code>c</code>. Return a pointer to the memory area.",
    proto: "void\t*ft_memset(void *s, int c, size_t n);",
    examples: [
      { in: 'buf[10], c=\'A\', n=5', out: 'buf = "AAAAA\\0..."' },
      { in: 'buf[4], c=0, n=4',      out: 'buf = {0,0,0,0}' }
    ],
    hint: "Cast s to unsigned char*. Loop n times, setting ptr[i] = (unsigned char)c. Return the original s.",
    solution: `void\t*ft_memset(void *s, int c, unsigned long n)
{
\tunsigned char\t*ptr;
\tunsigned long\ti;

\tptr = (unsigned char *)s;
\ti = 0;
\twhile (i < n)
\t{
\t\tptr[i] = (unsigned char)c;
\t\ti++;
\t}
\treturn (s);
}`
  },
  {
    name: "count_words",
    filename: "count_words.c",
    difficulty: "hard",
    desc: "Write a function <code>count_words</code> that counts the number of words in a string. Words are separated by spaces, tabs, or newlines. Consecutive separators count as one.",
    proto: "int\tcount_words(const char *s);",
    examples: [
      { in: '"hello world"',      out: "2" },
      { in: '"  foo  bar  baz "', out: "3" },
      { in: '"oneword"',          out: "1" },
      { in: '"   "',              out: "0" }
    ],
    hint: "Track whether you're inside a word. Each transition from whitespace→non-whitespace increments the count.",
    solution: `int\tcount_words(const char *s)
{
\tint\tcount;
\tint\tin_word;

\tcount = 0;
\tin_word = 0;
\twhile (*s)
\t{
\t\tif (*s == ' ' || *s == '\\t' || *s == '\\n')
\t\t\tin_word = 0;
\t\telse if (!in_word)
\t\t{
\t\t\tin_word = 1;
\t\t\tcount++;
\t\t}
\t\ts++;
\t}
\treturn (count);
}`
  }
];


/* ══════════════════════════════════════════════════════════════
   3. STATE — Session variables
══════════════════════════════════════════════════════════════ */

const STATE = {
  // Quiz
  quizPool:       [],   // 10 shuffled questions
  quizIndex:      0,    // current question index
  quizCorrect:    0,    // correct answers count
  quizAnswered:   false,// has the current question been answered?

  // Challenges
  challengePool:  [],   // 10 shuffled challenges
  challengeIndex: 0,    // current challenge index
  challengeScores:[],   // per-challenge points earned
  selfGrade:      null, // 'perfect' | 'almost' | 'struggled' | 'skipped'

  // Results
  finalQuizScore: 0,    // 0-10
  finalCodeScore: 0,    // 0-100
  finalScore:     0,    // 0-100

  // ── NEW v3.0 ──────────────────────────────────────────────
  // Weakness tracking: mistakes per topic
  topicMistakes:  {},   // { "POINTERS": 2, "BASICS": 1, ... }
  // Challenge weakness tracking: skipped/struggled per challenge
  challengeWeakness: [], // array of { name, topic, score }
  // XP earned this session
  sessionXP:      0,
  // Timers (interval IDs)
  quizTimerID:    null,
  codeTimerID:    null,
  quizSecondsLeft:  300, // 5 minutes
  codeSecondsLeft: 1800  // 30 minutes
};


/* ══════════════════════════════════════════════════════════════
   4. UTILITIES
══════════════════════════════════════════════════════════════ */

/**
 * Fisher-Yates shuffle — returns a new shuffled array
 * @param {Array} arr
 * @returns {Array}
 */
function shuffle(arr) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

/**
 * Switch visible screen
 * @param {string} id — screen element id
 */
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

/**
 * Animate progress bar
 * @param {string} barId — element id of .progress-fill
 * @param {string} labelId — element id of label span
 * @param {number} pct — percentage 0-100
 */
function setProgress(barId, labelId, pct) {
  const fill  = document.getElementById(barId);
  const label = document.getElementById(labelId);
  if (fill)  fill.style.width  = pct + '%';
  if (label) label.textContent = Math.round(pct) + '%';
}


/* ══════════════════════════════════════════════════════════════
   4b. XP & LEVEL SYSTEM
══════════════════════════════════════════════════════════════ */

const XP_LEVELS = [
  { name: 'BEGINNER',     min: 0   },
  { name: 'INTERMEDIATE', min: 100 },
  { name: 'ADVANCED',     min: 250 },
  { name: 'GOAT 🐐',      min: 500 }
];

/** Get level info from total XP */
function getLevel(xp) {
  let level = XP_LEVELS[0];
  for (const l of XP_LEVELS) {
    if (xp >= l.min) level = l;
  }
  const nextLevel = XP_LEVELS[XP_LEVELS.indexOf(level) + 1];
  const progress  = nextLevel
    ? ((xp - level.min) / (nextLevel.min - level.min)) * 100
    : 100;
  return { name: level.name, progress, nextMin: nextLevel ? nextLevel.min : null };
}

/** Award XP and save */
function awardXP(amount, reason) {
  STATE.sessionXP += amount;
  const stored = loadStorage();
  stored.totalXP = (stored.totalXP || 0) + amount;
  // Don't touch lastScore here — it gets set properly at session end
  saveStorage(stored);
  updateXPBadge();
}

/** Flash the XP badge in top bar */
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

/** Render XP panel on landing screen */
function renderXPPanel() {
  const stored = loadStorage();
  const xp = stored.totalXP || 0;
  const lv = getLevel(xp);

  document.getElementById('xp-level-label').textContent = lv.name;
  document.getElementById('xp-pts').textContent = `${xp} XP`;
  setTimeout(() => {
    document.getElementById('xp-bar-fill').style.width = lv.progress + '%';
  }, 100);

  const hist = document.getElementById('xp-history');
  if (stored.lastScore) {
    hist.textContent = `Last score: ${stored.lastScore}/100 · Sessions: ${stored.sessions || 0}`;
  } else {
    hist.textContent = 'No previous sessions — start your first evaluation!';
  }
}


/* ══════════════════════════════════════════════════════════════
   4c. LOCAL STORAGE
══════════════════════════════════════════════════════════════ */

const LS_KEY = 'c42trainer_v3';

function loadStorage() {
  try {
    return JSON.parse(localStorage.getItem(LS_KEY)) || {};
  } catch { return {}; }
}

function saveStorage(data) {
  try { localStorage.setItem(LS_KEY, JSON.stringify(data)); } catch {}
}

/** Persist end-of-session data */
function persistSession() {
  const stored = loadStorage();
  // NOTE: totalXP is already updated incrementally by awardXP() during the session.
  // We only update non-XP fields here to avoid double-counting.
  stored.lastScore  = STATE.finalScore;
  stored.level      = getLevel(stored.totalXP || 0).name;
  stored.sessions   = (stored.sessions || 0) + 1;
  stored.achievements = buildAchievementStatus(stored);
  saveStorage(stored);
}

/** Check and return earned achievement IDs */
function buildAchievementStatus(stored) {
  const prev = stored.achievements || {};
  const earned = { ...prev };

  if ((stored.sessions || 0) >= 1 || STATE.finalScore >= 0) earned.first_run = true; // always earn on first completion
  if ((stored.lastScore || 0) > 80)               earned.score_80  = true;
  if (STATE.challengeScores.length >= 10 &&
      STATE.challengeScores.every(s => s >= 7))   earned.all_perfect = true;
  if ((stored.totalXP || 0) >= 100)               earned.xp_100    = true;
  if (STATE.quizCorrect === 10)                   earned.perfect_quiz = true;

  return earned;
}


/* ══════════════════════════════════════════════════════════════
   4d. TIMER SYSTEM
══════════════════════════════════════════════════════════════ */

/**
 * Start a countdown timer
 * @param {number}   seconds   — total seconds
 * @param {string}   valId     — id of the <span> showing mm:ss
 * @param {string}   wrapId    — id of the .timer-display wrapper
 * @param {Function} onExpire  — called when reaches 0
 * @returns {number} interval ID
 */
function startTimer(seconds, valId, wrapId, onExpire) {
  let remaining = seconds;
  const valEl  = document.getElementById(valId);
  const wrapEl = document.getElementById(wrapId);

  function tick() {
    const m = Math.floor(remaining / 60);
    const s = remaining % 60;
    valEl.textContent = `${m}:${String(s).padStart(2, '0')}`;

    // Visual warnings
    wrapEl.classList.remove('warning', 'danger');
    if (remaining <= 30)       wrapEl.classList.add('danger');
    else if (remaining <= 90)  wrapEl.classList.add('warning');

    if (remaining <= 0) {
      clearInterval(id);
      onExpire();
    }
    remaining--;
  }

  tick(); // immediate first render
  const id = setInterval(tick, 1000);
  return id;
}

function stopTimer(id) {
  if (id) clearInterval(id);
}


/* ══════════════════════════════════════════════════════════════
   4e. CODE RUNNER (simulated test cases)
══════════════════════════════════════════════════════════════ */

/**
 * Test case definitions per challenge name.
 * Each test: { label, keywords: [], desc }
 * "keywords" = strings that must appear in user's code for pass.
 */
const TEST_CASES = {
  ft_strlen: [
    { label: "Uses a loop",         keywords: ["while", "for"],         desc: "Solution must loop through characters" },
    { label: "Checks '\\0'",        keywords: ["\\0", "!= 0", "!= '\\0'", "len"],  desc: "Must detect null terminator" },
    { label: "Returns a counter",   keywords: ["return"],               desc: "Must return the computed length" }
  ],
  ft_putstr: [
    { label: "Includes unistd.h",   keywords: ["unistd"],               desc: "Needs #include <unistd.h> for write()" },
    { label: "Calls write()",       keywords: ["write"],                 desc: "Must use write() to output characters" },
    { label: "Loops the string",    keywords: ["while", "for"],         desc: "Must iterate over string characters" }
  ],
  reverse_string: [
    { label: "Two index variables", keywords: ["left", "right", "i", "j"], desc: "Needs two pointers/indices" },
    { label: "Swaps characters",    keywords: ["tmp", "temp", "swap"],  desc: "Must use a temp variable to swap" },
    { label: "Returns string",      keywords: ["return"],               desc: "Must return the modified string" }
  ],
  first_last_char: [
    { label: "Checks argc",         keywords: ["argc"],                 desc: "Must validate argument count" },
    { label: "Accesses argv[1]",    keywords: ["argv"],                 desc: "Must read command-line argument" },
    { label: "Prints characters",   keywords: ["printf", "write", "putchar"], desc: "Must print first and last char" }
  ],
  repeat_alpha: [
    { label: "Checks if letter",    keywords: ["alpha", ">= 'a'", ">= 'A'", "isalpha"], desc: "Must detect alphabetic chars" },
    { label: "Calculates repeat",   keywords: ["- 'a'", "- 'A'"],      desc: "Position computed with char arithmetic" },
    { label: "Inner loop",          keywords: ["while", "for"],        desc: "Uses nested loop for repetition" }
  ],
  rot13: [
    { label: "Handles a-m",         keywords: ["'m'", "'M'", "<= 'm'", "<= 'M'"], desc: "Must handle first half of alphabet" },
    { label: "Applies +13 or -13",  keywords: ["13"],                  desc: "Rotation by 13 positions" },
    { label: "Returns string",      keywords: ["return"],               desc: "Returns the encoded string" }
  ],
  swap: [
    { label: "Uses pointers",       keywords: ["*a", "*b"],             desc: "Must dereference pointer params" },
    { label: "Uses temp variable",  keywords: ["tmp", "temp"],          desc: "Needs a temporary variable for swap" },
    { label: "Assigns both sides",  keywords: ["*a =", "*b ="],        desc: "Both values must be reassigned" }
  ],
  ft_max: [
    { label: "Compares a and b",    keywords: ["a > b", "b > a", "a >= b"], desc: "Must compare the two integers" },
    { label: "Returns a value",     keywords: ["return"],               desc: "Must return the maximum" },
    { label: "No printf",           keywords: [],                       desc: "Function, not a program — no printf needed", inverted: true, inv_keywords: [] }
  ],
  print_numbers: [
    { label: "Loops 0 to 9",        keywords: ["0", "9", "while", "for"],  desc: "Must iterate 10 times" },
    { label: "Outputs digits",      keywords: ["write", "printf", "putchar"], desc: "Must output each digit" },
    { label: "Handles spacing",     keywords: [" "],                    desc: "Digits separated by spaces" }
  ],
  ulstr: [
    { label: "Checks lowercase",    keywords: [">= 'a'", "<= 'z'"],    desc: "Detects lowercase letters" },
    { label: "Checks uppercase",    keywords: [">= 'A'", "<= 'Z'"],    desc: "Detects uppercase letters" },
    { label: "Case conversion",     keywords: ["-= 32", "+= 32", "- 32", "+ 32"], desc: "Converts case with ±32" }
  ],
  ft_strcpy: [
    { label: "Copies bytes",        keywords: ["dst[i]", "dst["],       desc: "Writes into destination array" },
    { label: "Copies null term",    keywords: ["\\0", "'\\0'"],         desc: "Must copy the null terminator" },
    { label: "Returns dst",         keywords: ["return"],               desc: "Returns the destination pointer" }
  ],
  ft_isalpha: [
    { label: "Checks a-z range",    keywords: [">= 'a'", "<= 'z'"],    desc: "Validates lowercase range" },
    { label: "Checks A-Z range",    keywords: [">= 'A'", "<= 'Z'"],    desc: "Validates uppercase range" },
    { label: "Returns 1 or 0",      keywords: ["return (1)", "return 1", "return (0)", "return 0"], desc: "Returns boolean result" }
  ],
  ft_atoi: [
    { label: "Skips whitespace",    keywords: ["' '", "9", "13", "isspace"], desc: "Handles leading whitespace" },
    { label: "Handles sign",        keywords: ["'-'", "sign", "-1"],    desc: "Detects + or - prefix" },
    { label: "Converts digits",     keywords: ["'0'", "- '0'", "* 10"], desc: "Digit conversion formula" }
  ],
  ft_memset: [
    { label: "Casts to uchar*",     keywords: ["unsigned char"],        desc: "Must cast void* to unsigned char*" },
    { label: "Loops n times",       keywords: ["while", "for"],        desc: "Must fill exactly n bytes" },
    { label: "Returns s",           keywords: ["return"],               desc: "Must return the original pointer" }
  ],
  count_words: [
    { label: "Tracks word state",   keywords: ["in_word", "word", "state", "flag"], desc: "Uses a flag to track word state" },
    { label: "Detects whitespace",  keywords: ["' '", "'\\t'", "'\\n'"], desc: "Handles space, tab, newline" },
    { label: "Counts transitions",  keywords: ["count", "++"],          desc: "Increments on each new word" }
  ]
};

/**
 * Simulate running test cases against user's code
 */
function runCode() {
  const code = document.getElementById('code-input').value.trim();
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
    const delay = i * 180;
    setTimeout(() => {
      let ok;
      if (test.inverted) {
        // inverted: pass if NONE of inv_keywords present
        ok = !test.inv_keywords.some(kw => code.includes(kw));
      } else {
        // pass if at least one keyword present
        ok = test.keywords.length === 0 || test.keywords.some(kw => code.includes(kw));
      }

      if (ok) passed++;

      const div = document.createElement('div');
      div.className = `test-case ${ok ? 'pass' : 'fail'}`;
      div.innerHTML = `
        <span class="test-icon">${ok ? '✅' : '❌'}</span>
        <div class="test-info">
          <span class="test-name">TEST ${i + 1}: ${test.label}</span>
          <span class="test-detail">${test.desc}</span>
        </div>
      `;
      casesEl.appendChild(div);

      // Update status after last test
      if (i === tests.length - 1) {
        const allPassed = passed === tests.length;
        statusEl.textContent = `${passed}/${tests.length} PASSED`;
        statusEl.style.color = allPassed ? 'var(--good)' : passed > 0 ? 'var(--warn)' : 'var(--danger)';

        // Auto-set self-grade if not set
        if (!STATE.selfGrade) {
          if (allPassed)       setSelfGrade('perfect');
          else if (passed > 0) setSelfGrade('almost');
          else                 setSelfGrade('struggled');
        }
      }
    }, delay);
  });
}


/* ══════════════════════════════════════════════════════════════
   4f. ACHIEVEMENTS
══════════════════════════════════════════════════════════════ */

const ACHIEVEMENTS_DEF = [
  { id: 'first_run',    icon: '🚀', name: 'FIRST RUN',    desc: 'Completed your first evaluation' },
  { id: 'score_80',     icon: '🎯', name: 'SHARPSHOOTER', desc: 'Scored above 80/100' },
  { id: 'all_perfect',  icon: '💎', name: 'FLAWLESS',     desc: 'All 10 challenges rated Perfect/Almost' },
  { id: 'xp_100',       icon: '⚡', name: '100 XP',       desc: 'Accumulated 100+ total XP' },
  { id: 'perfect_quiz', icon: '🧠', name: 'BIG BRAIN',    desc: 'Got 10/10 on the quiz' }
];

function renderAchievements() {
  const stored = loadStorage();
  // Run build now to include current session
  const earned = buildAchievementStatus(stored);

  const grid = document.getElementById('achievements-grid');
  grid.innerHTML = ACHIEVEMENTS_DEF.map(a => `
    <div class="achievement-pill ${earned[a.id] ? 'earned' : ''}">
      <span class="ach-icon">${a.icon}</span>
      <div class="ach-info">
        <span class="ach-name">${a.name}</span>
        <span class="ach-desc">${a.desc}</span>
      </div>
    </div>
  `).join('');
}


/* ══════════════════════════════════════════════════════════════
   4g. WEAKNESS DETECTION
══════════════════════════════════════════════════════════════ */

/**
 * Map challenge names to conceptual topics for weakness tracking
 */
const CHALLENGE_TOPICS = {
  ft_strlen:     'STRINGS',
  ft_putstr:     'I/O',
  reverse_string:'STRINGS',
  first_last_char:'ARGC/ARGV',
  repeat_alpha:  'STRINGS',
  rot13:         'STRINGS',
  swap:          'POINTERS',
  ft_max:        'FUNCTIONS',
  print_numbers: 'LOOPS',
  ulstr:         'STRINGS',
  ft_strcpy:     'STRINGS',
  ft_isalpha:    'BASICS',
  ft_atoi:       'STRINGS',
  ft_memset:     'MEMORY',
  count_words:   'STRINGS'
};

/** Render the weakness section based on quiz mistakes + challenge performance */
function renderWeaknesses() {
  const listEl = document.getElementById('weakness-list');

  // ── Collect topic scores ─────────────────────────────────────
  const topicData = {}; // { TOPIC: { correct, total } }

  // From quiz mistakes
  STATE.quizPool.forEach((q, i) => {
    const t = q.topic;
    if (!topicData[t]) topicData[t] = { correct: 0, total: 0 };
    topicData[t].total++;
    if (i < STATE.quizIndex) { // answered questions
      // We stored mistakes in STATE.topicMistakes during quiz
    }
  });

  // Use STATE.topicMistakes for quiz weakness
  const allTopics = {};

  Object.entries(STATE.topicMistakes || {}).forEach(([topic, mistakes]) => {
    const total = STATE.quizPool.filter(q => q.topic === topic).length;
    if (total > 0) {
      const pct = Math.round(((total - mistakes) / total) * 100);
      allTopics[topic] = pct;
    }
  });

  // From challenge scores
  STATE.challengePool.forEach((ch, i) => {
    const score = STATE.challengeScores[i] ?? 5;
    const topic = CHALLENGE_TOPICS[ch.name] || 'GENERAL';
    const pct   = Math.round((score / 10) * 100);

    if (allTopics[topic] === undefined) {
      allTopics[topic] = pct;
    } else {
      allTopics[topic] = Math.round((allTopics[topic] + pct) / 2);
    }
  });

  if (Object.keys(allTopics).length === 0) {
    listEl.innerHTML = `<p class="weakness-no-issues">✅ Not enough data — complete the full evaluation for detailed analysis.</p>`;
    return;
  }

  // Sort: worst first
  const sorted = Object.entries(allTopics).sort((a, b) => a[1] - b[1]);

  listEl.innerHTML = sorted.map(([topic, pct]) => {
    const cls = pct < 50 ? 'weak' : pct < 75 ? 'medium' : 'strong';
    const label = pct < 50 ? '🔴 Needs work' : pct < 75 ? '🟡 Improving' : '🟢 Strong';
    return `
      <div class="weakness-row">
        <div class="weakness-label">
          <span class="weakness-name" style="color: var(--${cls === 'weak' ? 'danger' : cls === 'medium' ? 'warn' : 'good'})">${topic}</span>
          <span class="weakness-pct">${pct}% — ${label}</span>
        </div>
        <div class="weakness-bar-track">
          <div class="weakness-bar-fill ${cls}" data-width="${pct}" style="width:0%"></div>
        </div>
      </div>
    `;
  }).join('');

  // Trigger bar animations after paint
  setTimeout(() => {
    listEl.querySelectorAll('.weakness-bar-fill[data-width]').forEach(el => {
      el.style.width = el.dataset.width + '%';
    });
  }, 80);
}


/* ══════════════════════════════════════════════════════════════
   5. QUIZ LOGIC
══════════════════════════════════════════════════════════════ */

/** Initialize quiz state and render first question */
function initQuiz() {
  STATE.quizPool      = shuffle(QUESTION_POOL).slice(0, 10);
  STATE.quizIndex     = 0;
  STATE.quizCorrect   = 0;
  STATE.topicMistakes = {};
  STATE.sessionXP     = 0;

  // Start quiz timer (5 minutes)
  stopTimer(STATE.quizTimerID);
  STATE.quizSecondsLeft = 300;
  STATE.quizTimerID = startTimer(
    STATE.quizSecondsLeft,
    'quiz-timer-val',
    'quiz-timer',
    () => { endQuiz(); } // auto-finish on expire
  );

  renderQuestion();
}

/** Render current question */
function renderQuestion() {
  const q      = STATE.quizPool[STATE.quizIndex];
  const idx    = STATE.quizIndex;
  const total  = STATE.quizPool.length;
  const letters = ['A', 'B', 'C', 'D'];

  // Update counters
  document.getElementById('q-counter').textContent     = `Q ${idx + 1}/${total}`;
  document.getElementById('quiz-score-live').textContent = `${STATE.quizCorrect} / 10`;
  setProgress('quiz-progress', 'quiz-progress-label', (idx / total) * 100);

  // Topic badge
  document.getElementById('q-topic').textContent = `// ${q.topic}`;

  // Question text (allows <code> tags)
  document.getElementById('q-text').innerHTML = q.q;

  // Options
  const container = document.getElementById('options-container');
  container.innerHTML = '';
  q.options.forEach((opt, i) => {
    const btn = document.createElement('button');
    btn.className = 'opt-btn';
    btn.innerHTML = `<span class="opt-letter">${letters[i]}</span>${opt}`;
    btn.onclick   = () => handleQuizAnswer(i);
    container.appendChild(btn);
  });

  // Hide explanation & next button
  document.getElementById('explain-box').classList.add('hidden');
  document.getElementById('explain-box').textContent = '';
  document.getElementById('btn-next-q').classList.add('hidden');
  STATE.quizAnswered = false;

  // Card entrance animation
  const card = document.getElementById('question-card');
  card.style.animation = 'none';
  void card.offsetWidth; // reflow
  card.style.animation = 'cardIn .4s ease';
}

/**
 * Handle an answer click
 * @param {number} selected — index of chosen option
 */
function handleQuizAnswer(selected) {
  if (STATE.quizAnswered) return;
  STATE.quizAnswered = true;

  const q       = STATE.quizPool[STATE.quizIndex];
  const buttons = document.querySelectorAll('.opt-btn');
  const correct = q.answer;

  // Disable all buttons
  buttons.forEach(b => b.disabled = true);

  // Mark correct / wrong
  buttons[correct].classList.add('correct');
  if (selected !== correct) {
    buttons[selected].classList.add('wrong');
    // Track mistake for weakness detection
    STATE.topicMistakes[q.topic] = (STATE.topicMistakes[q.topic] || 0) + 1;
  } else {
    STATE.quizCorrect++;
    document.getElementById('quiz-score-live').textContent = `${STATE.quizCorrect} / 10`;
    // Award XP for correct answer
    awardXP(5, 'correct quiz answer');
  }

  // Show explanation
  const exBox = document.getElementById('explain-box');
  exBox.classList.remove('hidden');
  exBox.textContent = '💡 ' + q.explain;

  // Show next button
  document.getElementById('btn-next-q').classList.remove('hidden');
}

/** Move to next question or end quiz */
function nextQuestion() {
  STATE.quizIndex++;
  if (STATE.quizIndex >= STATE.quizPool.length) {
    endQuiz();
  } else {
    renderQuestion();
  }
}

/** Quiz complete — show interlude */
function endQuiz() {
  stopTimer(STATE.quizTimerID);
  STATE.finalQuizScore = STATE.quizCorrect;

  // Interlude messages
  const score = STATE.quizCorrect;
  let msg;
  if (score <= 3)       msg = "Rough start. Don't worry — the code phase is where you prove yourself.";
  else if (score <= 6)  msg = "Decent. Gaps exist. Let's see if your code is stronger than your theory.";
  else if (score <= 8)  msg = "Solid theory. Now show the same energy in the coding phase.";
  else                  msg = "Almost perfect. The theory is clear — time to back it up with code.";

  document.getElementById('quiz-final-score').textContent = `${score}/10`;
  document.getElementById('quiz-grade-msg').textContent   = msg;

  showScreen('screen-quiz-done');
}


/* ══════════════════════════════════════════════════════════════
   6. CHALLENGE LOGIC
══════════════════════════════════════════════════════════════ */

/** Initialize challenge phase */
function startChallenges() {
  STATE.challengePool    = shuffle(CHALLENGE_POOL).slice(0, 10);
  STATE.challengeIndex   = 0;
  STATE.challengeScores  = [];
  STATE.challengeWeakness = [];
  STATE.selfGrade        = null;

  // Start challenge timer (30 minutes)
  stopTimer(STATE.codeTimerID);
  STATE.codeSecondsLeft = 1800;
  STATE.codeTimerID = startTimer(
    STATE.codeSecondsLeft,
    'code-timer-val',
    'code-timer',
    () => { endChallenges(); } // auto-finish on expire
  );

  showScreen('screen-challenges');
  renderChallenge();
}

/** Render current challenge */
function renderChallenge() {
  const ch  = STATE.challengePool[STATE.challengeIndex];
  const idx = STATE.challengeIndex;
  const total = STATE.challengePool.length;

  // Counters & progress
  document.getElementById('c-counter').textContent       = `C ${idx + 1}/${total}`;
  document.getElementById('code-score-live').textContent =
    `${STATE.challengeScores.reduce((a, b) => a + b, 0)} / 100`;
  setProgress('code-progress', 'code-progress-label', (idx / total) * 100);

  // Name, difficulty, filename
  document.getElementById('ch-name').textContent = ch.name;
  document.getElementById('ch-filename').textContent = ch.filename;

  const diffEl = document.getElementById('ch-diff');
  diffEl.textContent = ch.difficulty.toUpperCase();
  diffEl.className   = 'diff-badge diff-' + ch.difficulty;

  // Description
  document.getElementById('ch-desc').innerHTML = ch.desc +
    `<br><br><code>${ch.proto}</code>`;

  // Examples
  const exBlock = document.getElementById('ch-examples');
  exBlock.innerHTML = ch.examples.map(e => `
    <div class="ex-row">
      <span class="ex-label">INPUT</span>
      <span class="ex-val">${e.in}</span>
      <span class="ex-label" style="margin-left:12px">OUTPUT</span>
      <span class="ex-val">${e.out}</span>
    </div>
  `).join('');

  // Hint
  document.getElementById('ch-hint').innerHTML =
    `<strong>💡 HINT:</strong> ${ch.hint}`;

  // Reset editor
  document.getElementById('code-input').value = '';
  const hl = document.getElementById('code-highlight');
  if (hl) hl.innerHTML = '';

  // Reset self-grade
  document.querySelectorAll('.sg-btn').forEach(b => b.classList.remove('selected'));
  STATE.selfGrade = null;

  // Hide solution and run output
  document.getElementById('solution-reveal').classList.add('hidden');
  document.getElementById('run-output').classList.add('hidden');

  // Card animation
  const card = document.querySelector('.challenge-card');
  card.style.animation = 'none';
  void card.offsetWidth;
  card.style.animation = 'cardIn .4s ease';
}

/**
 * Set self-grade for current challenge
 * @param {'perfect'|'almost'|'struggled'|'skipped'} val
 */
function setSelfGrade(val) {
  STATE.selfGrade = val;
  document.querySelectorAll('.sg-btn').forEach(b => b.classList.remove('selected'));
  const map = {
    perfect:   'sg-perfect',
    almost:    'sg-almost',
    struggled: 'sg-struggled',
    skipped:   'sg-skipped'
  };
  document.getElementById(map[val]).classList.add('selected');
}

/** Show / hide solution */
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

/** Score the current challenge based on self-grade */
function scoreChallenge() {
  const gradeToPoints = {
    perfect:   10,
    almost:    7,
    struggled: 3,
    skipped:   0,
    null:      5   // no grade = partial credit
  };
  return gradeToPoints[STATE.selfGrade] ?? 5;
}

/** Move to next challenge or end phase */
function nextChallenge() {
  // Record score for current challenge
  const pts = scoreChallenge();
  STATE.challengeScores.push(pts);

  // Award XP for perfect challenges
  if (STATE.selfGrade === 'perfect') awardXP(10, 'perfect challenge');
  else if (STATE.selfGrade === 'almost') awardXP(5, 'almost challenge');

  // Track weakness data
  const ch = STATE.challengePool[STATE.challengeIndex];
  STATE.challengeWeakness.push({
    name:  ch.name,
    topic: CHALLENGE_TOPICS[ch.name] || 'GENERAL',
    score: pts
  });

  STATE.challengeIndex++;
  if (STATE.challengeIndex >= STATE.challengePool.length) {
    endChallenges();
  } else {
    renderChallenge();
  }
}

/** Challenge phase complete → compute results */
function endChallenges() {
  stopTimer(STATE.codeTimerID);
  STATE.finalCodeScore = STATE.challengeScores.reduce((a, b) => a + b, 0);

  // Final score: quiz=0-10 → convert to 0-50, code=0-100 → 0-50
  const quizPct  = (STATE.finalQuizScore / 10) * 50;
  const codePct  = (STATE.finalCodeScore / 100) * 50;
  STATE.finalScore = Math.round(quizPct + codePct);

  showResults();
}


/* ══════════════════════════════════════════════════════════════
   7. RESULTS & COACH LOGIC
══════════════════════════════════════════════════════════════ */

/** Render results screen with rating + coach plan */
function showResults() {
  showScreen('screen-results');

  const quiz  = STATE.finalQuizScore;
  const code  = STATE.finalCodeScore;
  const total = STATE.finalScore;

  // Score displays
  document.getElementById('res-quiz').textContent  = `${quiz}/10`;
  document.getElementById('res-code').textContent  = `${code}/100`;
  document.getElementById('res-final').textContent = `${total}/100`;

  // Animate score bar
  setTimeout(() => {
    document.getElementById('final-bar').style.width = total + '%';
  }, 200);

  // ── Rating ───────────────────────────────────────────────────
  let emoji, ratingText;
  if (total < 40) {
    emoji      = '💀';
    ratingText = 'oh hellll nah twin 💀';
  } else if (total < 75) {
    emoji      = '😐';
    ratingText = 'maybe... 😐';
  } else {
    emoji      = '🐐🔥';
    ratingText = 'u r the goat 🐐🔥';
  }
  document.getElementById('rating-emoji').textContent = emoji;
  document.getElementById('rating-text').textContent  = ratingText;

  // ── New systems ───────────────────────────────────────────────
  persistSession();         // save to localStorage
  renderAchievements();     // achievements panel
  renderWeaknesses();       // weakness detection panel
  buildCoachSection(total); // coach (now uses weakness data too)
}

/**
 * Build the personalized coach section
 * @param {number} score — final 0-100
 */
function buildCoachSection(score) {
  let tierTag, verdict, roadmapSteps, exercises;

  // Collect weak topics for personalized advice
  const weakTopics = Object.entries(STATE.topicMistakes || {})
    .filter(([, mistakes]) => mistakes > 0)
    .sort((a, b) => b[1] - a[1])
    .map(([topic]) => topic);

  const weakChallenges = (STATE.challengeWeakness || [])
    .filter(c => c.score < 5)
    .map(c => c.name);

  const weakSummary = weakTopics.length > 0
    ? `Based on your answers, your weakest areas are: <strong>${weakTopics.join(', ')}</strong>.`
    : '';

  if (score < 40) {
    /* ────────── LOW ────────── */
    tierTag = '// COACH SAYS — BRUTALLY HONEST 🔴';

    verdict = `Look. ${score}/100 is not where you want to be. And I'm not going to sugarcoat it — ` +
      `you have real gaps in your fundamentals. ${weakSummary} ` +
      `The good news? Fundamentals can be fixed, but only if you stop guessing and start actually understanding. ` +
      `You need to rebuild from zero. No shortcuts. No copy-paste. Every line you write, you should be able to explain why.`;

    roadmapSteps = [
      "Drill variables, data types, and operators until you can write them in your sleep. No IDE autocomplete. No AI help.",
      "Write 5 small programs daily — not copy-paste, not pseudocode. Actual C code that compiles.",
      "Learn to read compiler errors. They're telling you exactly what's wrong. Listen to them.",
      "Master loops: for, while, do-while. Write each one from memory at least 10 times this week.",
      "Functions: understand parameters, return values, and scope before touching anything else.",
      "Do NOT move on until you can write ft_strlen and ft_putchar from memory with zero bugs."
    ];

    // Personalize based on weak topics
    if (weakTopics.includes('POINTERS'))
      roadmapSteps.push("Pointers: draw memory diagrams. Every pointer concept needs a picture before it becomes code.");
    if (weakTopics.includes('ARGC / ARGV'))
      roadmapSteps.push("argc/argv: write 3 programs that parse command-line args today. This is non-negotiable at 42.");

    exercises = [
      "print alphabet (a→z)", "ft_putchar", "ft_strlen", "is_positive",
      "print numbers 0-9", "ft_isalpha", "count vowels", "simple loop drills",
      ...weakChallenges.slice(0, 3)
    ].filter((v, i, a) => a.indexOf(v) === i); // dedupe

  } else if (score < 75) {
    /* ────────── MEDIUM ────────── */
    tierTag = '// COACH SAYS — HONEST AND PUSHING 🟡';

    verdict = `${score}/100. You're not bad, but you're not solid either. ${weakSummary} ` +
      `You know enough to get by, but "getting by" doesn't pass 42 evaluations. ` +
      `The gaps are real — pointers confuse you, edge cases catch you off guard, ` +
      `and your solutions probably work for the happy path but fall apart when tested properly. ` +
      `That changes now. Stop being comfortable.`;

    roadmapSteps = [
      "Pointers are your weak spot. Spend one full week doing nothing but pointer exercises. Draw memory diagrams if needed.",
      "Read your functions out loud — can you explain every line? If not, you don't understand it yet.",
      "Test your own code with edge cases: empty strings, NULL pointers, INT_MIN, INT_MAX. Break it before 42 does.",
      "Practice argc/argv every day. Write programs that handle arguments properly — validation, error cases, everything.",
      "Learn to use valgrind. Every malloc needs a free. Every leak is points off.",
      "Debug by adding printf() calls systematically. Understand the flow before assuming where the bug is."
    ];

    if (weakTopics.includes('ARRAYS & STRINGS'))
      roadmapSteps.push("Strings: you're shaky here. Master ft_strcpy, ft_strcat, ft_strcmp from scratch — no looking.");
    if (weakTopics.includes('FUNCTIONS'))
      roadmapSteps.push("Functions: rewrite every function you know from memory. If you can't, you don't know it.");

    // Add specific challenges they struggled with
    if (weakChallenges.length > 0)
      roadmapSteps.push(`Redo these specific challenges until you nail them: ${weakChallenges.slice(0, 4).join(', ')}.`);

    exercises = [
      "ft_atoi", "ft_strcpy", "swap", "rot13", "repeat_alpha",
      "argc/argv exercises", "ft_memset", "string manipulation", "valgrind practice",
      ...weakChallenges.slice(0, 3)
    ].filter((v, i, a) => a.indexOf(v) === i);

  } else {
    /* ────────── HIGH ────────── */
    tierTag = '// COACH SAYS — PUSHING HIGHER 🟢';

    const remainingWeak = weakTopics.length > 0
      ? ` One note: even at your level, don't ignore ${weakTopics[0]} — a gap there will cost you in real projects.`
      : ' Your fundamentals are clean across the board — rare.';

    verdict = `${score}/100. Strong work — you actually know what you're doing.${remainingWeak} ` +
      `But here's the thing: knowing C basics is just the floor, not the ceiling. ` +
      `If you stop here, you'll plateau fast. The real growth happens when you build things that are ` +
      `complex enough to break you, when you read other people's good code, and when you start ` +
      `optimizing instead of just "making it work." You ready to level up for real?`;

    roadmapSteps = [
      "Build a mini shell in C — handle fork(), exec(), waitpid(), and redirections. It will expose everything you don't know.",
      "Read the source code of projects you admire. Understand every line. Steal what's elegant.",
      "Dive into low-level: file descriptors, processes, signals, memory-mapped files. man 2 is your new bible.",
      "Optimize your existing solutions — reduce memory allocations, cache locality, algorithm complexity.",
      "Contribute to or study open-source C projects on GitHub. Real-world C is very different from exercises.",
      "Try CTF (pwn) challenges. They force you to understand C at the assembly and memory level."
    ];

    exercises = [
      "mini shell", "ft_printf", "libft full", "file descriptor I/O",
      "memory allocator", "CTF pwn challenges", "sorting algorithms", "linked lists"
    ];
  }

  // Inject into DOM
  document.getElementById('coach-tier-tag').textContent = tierTag;
  document.getElementById('coach-verdict').innerHTML    = verdict;

  // Roadmap
  const roadmapEl = document.getElementById('coach-roadmap');
  roadmapEl.innerHTML = `
    <p class="roadmap-title">// YOUR ROADMAP</p>
    <ol class="roadmap-steps">
      ${roadmapSteps.map((step, i) => `
        <li>
          <span class="step-num">0${i + 1}</span>
          ${step}
        </li>
      `).join('')}
    </ol>
  `;

  // Exercises
  const exEl = document.getElementById('coach-exercises');
  exEl.innerHTML = `
    <p class="exercises-title">// PRACTICE THESE NOW</p>
    <div class="exercise-chips">
      ${exercises.map(ex => `<span class="ex-chip">${ex}</span>`).join('')}
    </div>
  `;
}


/* ══════════════════════════════════════════════════════════════
   8. NAVIGATION — Entry points called from HTML
══════════════════════════════════════════════════════════════ */

/** Start a brand new session */
function startSession() {
  initQuiz();
  showScreen('screen-quiz');
}

/** Restart everything — called by "Train Again" */
function trainAgain() {
  // Stop any running timers
  stopTimer(STATE.quizTimerID);
  stopTimer(STATE.codeTimerID);

  // Reset all state
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

  // Reset progress bars
  setProgress('quiz-progress', 'quiz-progress-label', 0);
  setProgress('code-progress', 'code-progress-label', 0);
  document.getElementById('final-bar').style.width = '0%';

  // Refresh XP panel with updated stored data
  renderXPPanel();

  showScreen('screen-landing');
}


/* ══════════════════════════════════════════════════════════════
   9. INIT
══════════════════════════════════════════════════════════════ */

document.addEventListener('DOMContentLoaded', () => {
  // Show landing screen on load
  showScreen('screen-landing');

  // Render XP panel from localStorage on boot
  renderXPPanel();

  // Tab key support inside code editor
  const codeInput = document.getElementById('code-input');

  // ── Syntax highlighting sync ────────────────────────────────
  const codeHighlight = document.getElementById('code-highlight');

  function syncHighlight() {
    const escaped = codeInput.value
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;');
    codeHighlight.innerHTML = escaped;
    if (window.Prism) Prism.highlightElement(codeHighlight);
    codeHighlight.parentElement.scrollTop = codeInput.scrollTop;
  }

  codeInput.addEventListener('input', syncHighlight);
  codeInput.addEventListener('scroll', () => {
    codeHighlight.parentElement.scrollTop = codeInput.scrollTop;
  });
  // ────────────────────────────────────────────────────────────

  codeInput.addEventListener('keydown', (e) => {
    if (e.key === 'Tab') {
      e.preventDefault();
      const start = codeInput.selectionStart;
      const end   = codeInput.selectionEnd;
      codeInput.value =
        codeInput.value.substring(0, start) + '\t' +
        codeInput.value.substring(end);
      codeInput.selectionStart = codeInput.selectionEnd = start + 1;
    }
  });
});
