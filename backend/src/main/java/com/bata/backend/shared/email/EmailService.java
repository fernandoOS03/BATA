package com.bata.backend.shared.email;

import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;

import jakarta.mail.MessagingException;
import jakarta.mail.internet.MimeMessage;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class EmailService {
	private final JavaMailSender mailSender;
	
	public void sendOrderConfirmation(String to, String userName, Long orderId, String htmlContent) {
        try {
            // Creamos un mensaje MIME (soporta HTML)
            MimeMessage message = mailSender.createMimeMessage();
            MimeMessageHelper helper = new MimeMessageHelper(message, true, "UTF-8");
            
            helper.setFrom("no-reply@bata.com"); 
            helper.setTo(to);
            helper.setSubject("Confirmación de Compra - Pedido #" + orderId + " | BATA");
            helper.setText(htmlContent, true); 
            
            mailSender.send(message);
            System.out.println("Correo enviado exitosamente a: " + to);
            
        } catch (MessagingException e) {
            System.err.println("Error al enviar el correo: " + e.getMessage());
            
        }
    }
	

}
