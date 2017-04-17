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
  
  test_it("21202325272829\n", 15, "! #%'()");
  test_it("2a2A2b2B2c2C2d2D2e2E2f2F\n", 25, "**++,,--..//");
  test_it("30313233343536373839\n", 21, "0123456789");
  test_it("3a3A3b3B3c3C3d3D3e3E3f3F\n", 25, "::;;<<==>>??");
  test_it("40414243444546474849\n", 21, "@ABCDEFGHI");
  test_it("4a4A4b4B4c4C4d4D4e4E4f4F\n", 25, "JJKKLLMMNNOO");
  test_it("50515253545556575859\n", 21, "PQRSTUVWXY");
  test_it("5a5A5b5B5d5D5e5E5f5F\n", 21, "ZZ[[]]^^__");
  test_it("60616263646566676869\n", 21, "`abcdefghi");
  test_it("6a6A6b6B6c6C6d6D6e6E6f6F\n", 25, "jjkkllmmnnoo");
  test_it("70717273747576777879\n", 21, "pqrstuvwxy");
  test_it("7a7A7b7B7c7C7d7D7e7E\n", 21, "zz{{||}}~~");

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