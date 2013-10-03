vStudio.services.service('AceIntellisenseExtensionService', function($http,$q, AutoCompleteService,AceSnippetsExtensionService) {

		var TABLES = "Tables";
		var COLUMNS = "Columns";

		var data = {};					

		// Add object properties like this		
		this.langToolExt = null;

		var colsArray =	[];
	    var tableArray = [];	    

	    var colsObj =	{};
	    var tablesObj = {};	    

		//langToolExt
		this.register = function(options) {
			this.setLangToolExt(options.langToolExt);

			this.langToolExt.addCompleter(verixIntellisenseCompleter);
		};

		this.setLangToolExt = function (langToolExt) {
			if (!this.langToolExt) {
				this.langToolExt = langToolExt;
			}
		}

		this.getLangToolExt = function () {
			return this.langToolExt;
		}		
		

		var getAutoCompleteData = function(){
            return AutoCompleteService.getData();            
		}

		var getIntellisnseData = function(){
			getAutoCompleteData()
				.then(function(){
						console.log("Save the schema");
						
						// Save the schema
						tablesObj 	= AutoCompleteService.getInteliData()[TABLES];
						colsObj 	= AutoCompleteService.getInteliData()[COLUMNS];

		        	});
				}

		var verixIntellisenseCompleter = {			

			getCompletions: function(editor, session, pos, prefix, callback) {
				var line = editor.getSession().getLine(pos.row);
		        
		        // return value - the function return the keywords array
		        var keywords = [];
			        
				var lineArray = line.split(" ");

		        var lineArrayLength = lineArray.length;
		        if (lineArrayLength > 0){		            
		            
		            if(lineArrayLength > 1){
		                
		                var lastWord = lineArray[lineArrayLength - 2].toLowerCase();

		                switch (lastWord)
				        {
				            case "from":
				                if(lineArray[0] == "select"){

				                	var colsName = lineArray[1];
									var selectArray = colsName.split(",");

									//Concatanate the tables list of each column
									var tablesArray = [];
									var colList;
									angular.forEach(selectArray, function(value){										
										if(colsObj[value])
										{
											colList = colsObj[value].ColList;
											tablesArray = tablesArray.concat(colList);	
										}
									});
	                                
	                                keywords = tablesArray;	                                

			                	}else{
			                    	keywords = tablesObj;			                    		                		
			                	}

								keywords = keywords.filter(function(w) {
		                    		return w.lastIndexOf(prefix, 0) == 0;
		                		});
			                	// filter the tables according the prefix

				                break;
				            case "select":
				                keywords = colsObj;

								// filter the cols according the prefix
			                    var filteredColsArray = [];
				                angular.forEach(keywords , function(value, key){
		                            if(key.lastIndexOf(prefix, 0) == 0){
		                                filteredColsArray.push(key);
		                            }
				                });

		                        keywords = filteredColsArray;   
				               	break;
				            case "where":
				               console.log("where");

				               	if(lineArray[lineArrayLength - 4] == "from"){

				               		var tablesNameArray = lineArray[lineArrayLength - 3].split(",");

				               		//Collcet the cols of each table
				               		var colsArray = [];

				               		for(var i = 0; i < tablesNameArray.length; i++){
				               			var colsOfTblArr = tablesObj[tablesNameArray[i]];
				               			colsArray = colsArray.concat(colsOfTblArr);
				               		}

				               		// filter the cols according the prefix
				                    var filteredColsArray = [];
					                angular.forEach(colsArray , function(value, key){
			                            if(value.name.lastIndexOf(prefix, 0) == 0){
			                                filteredColsArray.push(value.name);
			                            }
					                });

		                        	keywords = filteredColsArray;  

				               	}

				               	break;
				            default:
				                keywords = [];
				                break;
				        }


	// 	                if( lastWord == "from"){
	// 	                	if(lineArray[0] == "select"){
	// 	                		var cols = lineArray[1];
	// 							var selectArray = cols.split(",");

	// 							var tables = [];
	// 							angular.forEach(selectArray, function(value){
									
	// 								tables = tables.concat(colsObj[value].ColList);
	// 								//jQuery.extend( tables,)
	// 								// var obj = colsObj[value];
	// 								// tables = obj.ColList;
	// 							});

 //                                // keywords = jQuery.extend({},tables);
 //                                keywords = tables;


	// 	                	}else{
	// 	                    	keywords = tablesObj;
		                    		                		
	// 	                	}
	// 	                }else if(lastWord == "select"){
	// 	                    keywords = colsObj;      

	// 	                    var array = [];

	// 		                keywords = angular.forEach(keywords , function(value, key){
	// //		                	return key.lastIndexOf(prefix, 0) == 0;
	//                             if(key.lastIndexOf(prefix, 0) == 0){
	//                                 array.push(key);
	//                             }
	// 		                });

	//                         keywords = array;              
	// 	                }               

//                         var array = [];

// 		                keywords = angular.forEach(keywords , function(value, key){
// //		                	return key.lastIndexOf(prefix, 0) == 0;
//                             if(key.lastIndexOf(prefix, 0) == 0){
//                                 array.push(key);
//                             }
// 		                });

                        //keywords = array;
		                // keywords = keywords.filter(function(w) {
		                //     return w.lastIndexOf(prefix, 0) == 0;
		                // });

		            }else{
		                keywords = [];
		            }
		        }

		        callback(null, keywords.map(function(word) {
		            return {
		                name: word,
		                value: word,
		                score: 0,
		                meta: "verix"
		            };
		        }));
		    }
		};

		this.loadIntellisense = function(){
			getIntellisnseData();
		}
	}
);