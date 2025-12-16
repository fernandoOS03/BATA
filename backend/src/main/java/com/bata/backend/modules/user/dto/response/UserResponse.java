package com.bata.backend.modules.user.dto.response;

import java.time.LocalDate;

public record UserResponse(
		Integer id,
	    String name,
	    String lastName,
	    String dni,
	    LocalDate birthday,
	    
	    //Estos datos vendran de LoginEntity
	    String email, 
	    String role   
		
		
		) 

{}
