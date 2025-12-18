package com.bata.backend.exceptions.dto.response;

import java.time.LocalDateTime;

public record ErrorResponse(
		int status,           // 400, 404
	    String error,         // "Bad Request"
	    String message,       // "No hay stock suficiente"
	    LocalDateTime timestamp // Para saber cuándo pasó) 
)
{}
