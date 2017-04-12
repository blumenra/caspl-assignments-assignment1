#include <stdio.h>
#include <math.h>

extern int calc_div(int x, int k);

void test1();
void testParams(int x, int k);
void test2();
void testResult(int x, int k);
int calcResult(int x, int k);

int main(int argc, char** argv){

  	fflush(stdout);

  	test1();
  	test2();

	return 0;
}

void testParams(int x, int k){

	calc_div(x, k);
};

void test1(){
	
	puts("TEST 1:");


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

	puts("\n");
};

void test2(){
	
	puts("TEST 2:\n");

	testResult(5, 1);
	testResult(5, 2);
	testResult(1, 5);
	testResult(0, 10);
	testResult(100, 6);
	testResult(100, 1);
	testResult(8, 3);
	testResult(pow(2, 31), 1); //causes OVERFLOW!! wating for an answer of what is the max value of x
	testResult(pow(2, 31) - 1, 31);
	testResult(pow(2, 30), 20);
};

void testResult(int x, int k){
	
	int res = 0;
	res = calcResult(x, k);
	printf("x: %d\n", x);
	printf("k: %d\n", k);
	printf("Expected result: %d\n", res);
	printf("Actual result:   ");
	calc_div(x, k);
	puts("\n");	
};

int calcResult(int x, int k){
	// pow(2, 4);
	printf("x/(2^k): %d\n", (int) (x/(pow(2, k))));
	return x/(pow(2, k));
};	