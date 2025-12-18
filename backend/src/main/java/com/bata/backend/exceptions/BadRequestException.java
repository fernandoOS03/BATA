package com.bata.backend.exceptions;

/*
 * Exception para reglas de negocio, saldo insuficiente, producto, direccion : Error : 400
 */
public class BadRequestException extends RuntimeException {
	public BadRequestException(String mensaje) {
		super(mensaje);
	}

	
}
