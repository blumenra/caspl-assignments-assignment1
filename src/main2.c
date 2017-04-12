#include <stdio.h>

extern int calc_div(int x, int k);

int main(int argc, char** argv){

	int x = 0;
	int k = 0;

  	fflush(stdout);

	fscanf(stdin, "%d", &x);
	fscanf(stdin, "%d", &k);
  	
	calc_div(x, k);

	puts("");

	return 0;
}
