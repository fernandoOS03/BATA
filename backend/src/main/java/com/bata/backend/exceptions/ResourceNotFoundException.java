package com.bata.backend.exceptions;


/*
 * Exception para no se encuentre algo, usuario, producto, direccion : Error : 404
 */
public class ResourceNotFoundException extends RuntimeException {
	
	public ResourceNotFoundException(String mensaje) {
		super(mensaje);
	}
}
