#include <stdio.h>

#define	BUFFER_SIZE	(128)

extern int my_func(char* buf);

void test_it(char* input, int len, char* result);

int main(int argc, char** argv)
{
  fflush(stdout);

  // fgets(buf, BUFFER_SIZE, stdin);

  test_it("33343536\n", 9, "3456");
  test_it("4c656d6f6e\n", 11, "Lemon");
  test_it("373E393D46616C7365\n", 19, "7>9=False");

  return 0;
}

void test_it(char* input, int len, char* result){

	int i;
	char buf[BUFFER_SIZE];

	for(i=0; i < len; i++){

		buf[i] = input[i];
	}
	puts("Test:");
	printf("\tInput: %s\n", input);
	printf("\tExpected: %s\n", result);
	printf("\tGot:      ");
	my_func(buf);
	puts("");

};