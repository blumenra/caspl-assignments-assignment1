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
	cmp byte [ecx], 0
	je continue

	mov al, byte [ecx]
	inc ecx
	mov bl, byte [ecx]
	inc ecx
	shl al, 4
	or al, bl
	mov byte [edx], al
	inc edx
	mov byte [edx], bl
	inc edx
	;add ecx, 2
	jmp my_loop

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

