vStudio.services.service('Constants', function() {
	this.TABLES = "Tables";
	this.COLUMNS = "Columns";


	//Params	
	this.APP_URL = 'mock/app.descriptor.json';
	//this.APP_URL = 'http://localhost:8080/AppDescriptorServlet?appId=app-1'; 

	//this.SCHEMA_URL = 'mock/intellisense.rules.server.json';
	this.SCHEMA_URL = 'mock/intellisense.rules.json';
	//this.SCHEMA_URL = 'http://localhost:8080/DbSchemeServlet';
});