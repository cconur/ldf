function doPost(e) {
  var params = e.parameters;
  var name = params.name.join();
  var email = params.email.join();
  var phone = params.phone.join();
  var message = params.message.join();
  var products = params.products.join('\n');
  var nOfProd = Object.keys(params.products).length;
    
  // Get current date and time
  var timestamp = Utilities.formatDate(new Date(), "GMT+1", "dd/MM/yyyy HH:mm:ss");
  var status = "pendiente";

  // Store data in Google Sheet
  var sheet = SpreadsheetApp.getActive().getSheetByName("emails");
  sheet.appendRow([status, timestamp, name, email, phone, message, products]);
  
  sheet.getRange("G:G").splitTextToColumns('\n');

  // Send email
  var message = {
    to: "olgaguti@gmail.com",
    subject: "[Labores de flores] - Nuevo mensaje de: " + name,
    body: "Acabas de recibir un nuevo mensaje:"+"\n\n"+"Día y hora: "+timestamp+"\n\n"+"Nombre: "+name+"\n"+"Dirección de email: "+email+"\n"+"Telefono: "+phone+"\n\n"+"Le interesan estos ("+nOfProd+") productos:"+"\n"+products+"\n\n"+"Con el siguiente mensaje:"+"\n"+message
  }
  MailApp.sendEmail(message);

return ContentService.createTextOutput(JSON.stringify({ 'result': 'success' })).setMimeType(ContentService.MimeType.JSON);
}
