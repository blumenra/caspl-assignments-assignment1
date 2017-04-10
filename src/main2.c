#include <stdio.h>

// #define	BUFFER_SIZE	(128)

extern int calc_div(int x, int k);

int main(int argc, char** argv){

	int x = 0;
	int k = 0;

  	fflush(stdout);

	fscanf(stdin, "%d", &x);
	fscanf(stdin, "%d", &k);
  	
	calc_div(x, k);

	printf("you entered:\nx = %d\nk = %d\n", x, k);
	return 0;
}
