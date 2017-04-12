section .rodata
format:
	DD "%d", 10, 0 ;format integer

section .data
error:
	DB "x or k, or both are off range", 30, 0 ;format integer

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

	push dword [ebp+12]  ;send argument k to function 'check'
	push dword [ebp+8]	 ;send argument x to function 'check'

	call check	; return value on dl
	cmp dl, 1
	jnz invalid

	mov ecx, dword [ebp+12]
	mov ebx, 1
	sal ebx, cl
	mov edx, 0
	mov eax, dword [ebp+8]
	idiv ebx



	mov dword [ans], eax
	push dword [ans]
	push format
	call printf
	add esp, 8
	

clear_stack:
	add esp, 8
	popfd		; restore flags register
	popad		; restore registers
	pop ebp
	
	ret

check:
	push ebp
	mov ebp, esp

	cmp dword [ebp+8], 0  ; check if x is negative
	jl invalid_param

	cmp dword [ebp+12], 0 ; check if k is non-positive
	jle invalid_param

	cmp dword [ebp+12], 31; check if k is greater then 31
	ja invalid_param

	mov dl, 1

check_ret:
	
	mov esp, ebp
	pop ebp
	;add esp, 8
	ret


invalid_param:
	mov dl, 0
	jmp check_ret


invalid:
	mov byte [error+29], 10
	push error
	call printf
	add esp, 4
	jmp clear_stack