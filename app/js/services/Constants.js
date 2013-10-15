vStudio.services.service('Constants', function() {
	this.TABLES = "Tables";
	this.COLUMNS = "Columns";


	// Params	
	this.APP_URL = 'mock/app.descriptor.json';
	//this.APP_URL = 'http://localhost:8080/AppDescriptorServlet?appId=app-1'; 

	// DB
	this.DB_STRUCTURE_URL = 'mock/intellisense.rules.server.json';
	// this.DB_STRUCTURE_URL = 'mock/intellisense.rules.json';
	//this.DB_STRUCTURE_URL = 'http://localhost:8080/DbSchemeServlet';
	//this.DB_STRUCTURE_URL = 'mock/db.json';

	// Snippets
	//this.SNIPPETS_URL = 'mock/intellisense.rules.server.json';
	this.SNIPPETS_URL = 'mock/snippets.json';
	//this.SNIPPETS_URL = 'http://localhost:8080/DbSchemeServlet';
});