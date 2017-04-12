#include <stdio.h>

extern int calc_div(int x, int k);

void testParams(int x, int k);

int main(int argc, char** argv){

  	fflush(stdout);

  	printf("\nExpected good: ");
	testParams(5, 5);
  	printf("\nExpected bad: ");
	testParams(5, -5);
  	printf("\nExpected bad: ");
	testParams(5, -32);
  	printf("\nExpected bad: ");
	testParams(5, 0);
  	printf("\nExpected good: ");
	testParams(5, 1);
  	printf("\nExpected good: ");
	testParams(5, 31);
  	printf("\nExpected bad: ");
	testParams(5, 32);
  	printf("\nExpected bad: ");
	testParams(5, 45);
	
	printf("\nExpected bad: ");
	testParams(-5, 5);
  	printf("\nExpected bad: ");
	testParams(-5, -5);
  	printf("\nExpected bad: ");
	testParams(-5, -32);
  	printf("\nExpected bad: ");
	testParams(-5, 0);
  	printf("\nExpected bad: ");
	testParams(-5, 1);
  	printf("\nExpected bad: ");
	testParams(-5, 31);
  	printf("\nExpected bad: ");
	testParams(-5, 32);
  	printf("\nExpected bad: ");
	testParams(-5, 45);

	printf("\nExpected good: ");
	testParams(0, 5);
  	printf("\nExpected bad: ");
	testParams(0, -5);
  	printf("\nExpected bad: ");
	testParams(0, -32);
  	printf("\nExpected bad: ");
	testParams(0, 0);
  	printf("\nExpected good: ");
	testParams(0, 1);
  	printf("\nExpected good: ");
	testParams(0, 31);
  	printf("\nExpected bad: ");
	testParams(0, 32);
  	printf("\nExpected bad: ");
	testParams(0, 45);

	printf("\nExpected good: ");
	testParams(32, 5);
  	printf("\nExpected bad: ");
	testParams(32, -5);
  	printf("\nExpected bad: ");
	testParams(32, -32);
  	printf("\nExpected bad: ");
	testParams(32, 0);
  	printf("\nExpected good: ");
	testParams(32, 1);
  	printf("\nExpected good: ");
	testParams(32, 31);
  	printf("\nExpected bad: ");
	testParams(32, 32);
  	printf("\nExpected bad: ");
	testParams(32, 45);

	return 0;
}

void testParams(int x, int k){

	calc_div(x, k);
};