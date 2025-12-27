package com.bata.backend.shared.email;

import com.bata.backend.modules.order.entities.OrderEntity;
import com.bata.backend.modules.order.entities.OrderItemEntity;
import org.springframework.stereotype.Component;

import java.math.BigDecimal;

@Component
public class HtmlGenerator {

    public String generateReceiptHtml(OrderEntity order) {
        // 1. Generamos las filas de la tabla (Items)
        StringBuilder itemsHtml = new StringBuilder();

        for (OrderItemEntity item : order.getOrderItems()) {
            // Protección contra nulos
            String productName = item.getVariant().getProduct().getName();
            String variantInfo = item.getVariantDetails(); 
            Integer quantity = item.getQuantity();
            
            // Calculamos subtotal
            BigDecimal price = item.getPrice() != null ? item.getPrice() : BigDecimal.ZERO;
            BigDecimal subtotal = price.multiply(new BigDecimal(quantity));

            itemsHtml.append(String.format("""
                <tr style="border-bottom: 1px solid #eee;">
                    <td style="padding: 10px; color: #333;">
                        <strong>%s</strong><br>
                        <span style="font-size: 12px; color: #777;">%s</span>
                    </td>
                    <td style="padding: 10px; text-align: center; color: #333;">%s</td>
                    <td style="padding: 10px; text-align: right; color: #333;">S/ %s</td>
                </tr>
            """, 
            productName,   
            variantInfo,   
            quantity,    
            subtotal       
            ));
        }

        String userName = (order.getUser() != null) ? order.getUser().getName() : "Cliente";
        String orderId = order.getId().toString();
        String date = (order.getDate() != null) ? order.getDate().toString().substring(0, 10) : "N/A";
        String paymentMethod = (order.getPayment() != null) ? order.getPayment().getPaymentMethod() : "N/A";
        String transactionId = (order.getPayment() != null) ? order.getPayment().getTransactionId() : "-";
        String address = order.getFullAddress(); // Tu método helper
        String total = (order.getTotalAmount() != null) ? order.getTotalAmount().toString() : "0.00";

        
        return String.format("""
            <!DOCTYPE html>
            <html>
            <body style="font-family: Arial, sans-serif; margin: 0; padding: 0; background-color: #f4f4f4;">
                <div style="max-width: 600px; margin: 20px auto; background-color: #ffffff; border: 1px solid #e0e0e0;">
                    
                    <div style="background-color: #da291c; padding: 25px; text-align: center;">
                        <h1 style="color: white; margin: 0;">Bata</h1>
                        <p style="color: white; margin: 5px 0 0; font-size: 14px;">CONFIRMACIÓN DE PEDIDO</p>
                    </div>

                    <div style="padding: 30px;">
                        <p style="color: #333; font-size: 16px;">Hola <strong>%s</strong>,</p>
                        <p style="color: #666;">Gracias por tu compra. Aquí tienes tu recibo.</p>
                        
                        <div style="background-color: #f9f9f9; padding: 20px; margin: 20px 0; border-left: 4px solid #da291c;">
                            <p style="margin: 5px 0;"><strong>Pedido N°:</strong> %s</p>
                            <p style="margin: 5px 0;"><strong>Fecha:</strong> %s</p>
                            <p style="margin: 5px 0;"><strong>Método de Pago:</strong> %s</p>
                            <p style="margin: 5px 0;"><strong>Transacción:</strong> <span style="font-family: monospace;">%s</span></p>
                            <p style="margin: 5px 0;"><strong>Dirección:</strong> %s</p>
                        </div>

                        <table style="width: 100%%; border-collapse: collapse; margin-top: 20px;">
                            <thead>
                                <tr style="background-color: #333; color: white; font-size: 12px; text-transform: uppercase;">
                                    <th style="padding: 10px; text-align: left;">Producto</th>
                                    <th style="padding: 10px;">Cant.</th>
                                    <th style="padding: 10px; text-align: right;">Total</th>
                                </tr>
                            </thead>
                            <tbody>
                                %s 
                            </tbody>
                        </table>

                        <div style="text-align: right; margin-top: 30px; border-top: 2px solid #eee; padding-top: 15px;">
                            <span style="font-size: 14px; color: #666; margin-right: 10px;">TOTAL PAGADO:</span>
                            <span style="font-size: 24px; font-weight: bold; color: #da291c;">S/ %s</span>
                        </div>
                    </div>
                </div>
            </body>
            </html>
        """, 
        userName,       
        orderId,        
        date,    
        paymentMethod,
        transactionId, 
        address,        
        itemsHtml.toString(), 
        total        
        );
    }
}