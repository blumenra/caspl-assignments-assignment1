section .rodata:
	format: DD "%d", 10, 0

section .bss:
	ans: RESB 4 ; hold place for integer answer

section .text:
	;align 16
	global calc_div
	extern printf

calc_div:

	ret


check:
	ret