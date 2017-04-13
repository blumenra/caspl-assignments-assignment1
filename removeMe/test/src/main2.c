#include <stdio.h>
#include <math.h>

extern int calc_div(int x, int k);

void test1();
void testParams(int x, int k);
void test2();
void testResult(int x, int k, int testNum);
int calcResult(int x, int k);

int main(int argc, char** argv){

  	fflush(stdout);

  	// test1();
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
	
	int testNum = 1;
	
	puts("TEST 2:\n");

	testResult(5, 1, testNum++); // test 1
	testResult(5, 2, testNum++); // test 2
	testResult(1, 5, testNum++); // test 3
	testResult(0, 10, testNum++); // test 4
	testResult(100, 6, testNum++); // test 5
	testResult(100, 1, testNum++); // test 6
	testResult(8, 3, testNum++); // test 7
	testResult(pow(2, 31) - 1, 31, testNum++); // test 8
	testResult(pow(2, 31) - 1, 1, testNum++); // test 9
	testResult(pow(2, 30), 20, testNum++); // test 10
	testResult(0, 31, testNum++); // test 11
};

void testResult(int x, int k, int testNum){
	
	int res = 0;

	printf("test 2.%d:\n", testNum);
	printf("\t");
	res = calcResult(x, k);
	printf("\tx: %d\n", x);
	printf("\tk: %d\n", k);
	printf("\tExpected result: %d\n", res);
	printf("\tActual result:   ");
	calc_div(x, k);
	puts("\n");	
};

int calcResult(int x, int k){
	// pow(2, 4);
	printf("x/(2^k): %d\n", (int) (x/(pow(2, k))));
	return x/(pow(2, k));
};	