section .rodata
format:
	DD "%d", 10, 0 ;format integer

error:
	DB "x or k, or both are off range\n", 30, 0 ;format integer

section .bss
ans: 
	RESB 4 ; hold place for integer answer (4 bytes)

section .text
	align 16
	global calc_div
	extern printf

calc_div:
	push ebp
	mov ebp, esp
	pushad		; backup registers
	pushfd		; backup flags

	mov ecx, dword [ebp+8]
	push ecx
	mov ecx, dword [ebp+4]
	push ecx

	call check	; return value on dl
	cmp dl, 1
	jnz invalid

	mov dword [ans], ecx
	push dword [ans]
	push format
	call printf
	
	add esp, 8
	popfd		; restore flags register
	popad		; restore registers
	pop ebp
	
	ret

check:
	mov dl, 0
	ret


invalid:
	push error
	printf