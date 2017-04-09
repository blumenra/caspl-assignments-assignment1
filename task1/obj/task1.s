section	.rodata
LC0:
	DB	"%s", 10, 0	; Format string

section .bss
LC1:
	RESB	256

section .text
	align 16
	global my_func
	extern printf

my_func:
	push	ebp
	mov	ebp, esp	; Entry code - set up ebp and esp
	pushad			; Save registers

	mov ecx, dword [ebp+8]	; Get argument (pointer to string)

;       Your code should be here...

	mov edx, LC1

my_loop:
	cmp byte [ecx], 10
	je continue

	mov ax, word [ecx]
	cmp al, '9'
	jbe conv_num_al
	cmp al, 'Z'
	jbe conv_high_al

	sub al, 87 ;it is 'a-z'

cont_loop1:

	cmp ah, '9'
	jbe conv_num_ah
	cmp ah, 'Z'
	jbe conv_high_ah

	sub ah, 87 ;it is 'a-z'

cont_loop2:

	shl al, 4
	or al, ah
	mov byte [edx], al
	inc edx
	add ecx, 2
	jmp my_loop


conv_num_al:
	sub al, 48
	jmp cont_loop1

conv_high_al:
	sub al, 55
	jmp cont_loop1

conv_num_ah:
	sub ah, 48
	jmp cont_loop2

conv_high_ah:
	sub ah, 55
	jmp cont_loop2


continue:
	mov byte [edx], 0

;       Your code should be here...

	push	LC1		; Call printf with 2 arguments: pointer to str
	push	LC0		; and pointer to format string.
	call	printf
	add 	esp, 8		; Clean up stack after call

	popad			; Restore registers
	mov	esp, ebp	; Function exit code
	pop	ebp
	ret

