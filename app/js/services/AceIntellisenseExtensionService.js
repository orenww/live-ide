vStudio.services.service('AceIntellisenseExtensionService', function($http,$q, AutoCompleteService) {

		var data = {};					

		// Add object properties like this		
		this.langToolExt = null;

		var colsArray =	[];
	    var tableArray = [];	    

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
					tableColsMap = AutoCompleteService.getInteliData().tables;
						var tmpObj = {};						 

						$.each( tableColsMap, function( key, value ) {

							if(jQuery.inArray(key, tableArray) == -1){
								

								tableArray.push(key);
			                	tmpObj = value;

			                	$.each( tmpObj.cols, function( key, value ) {
				                    colsArray.push(value);
			                	});	
							}			                
	            		});
		        	});
				}

		var verixIntellisenseCompleter = {			

			getCompletions: function(editor, session, pos, prefix, callback) {
				var line = editor.getSession().getLine(pos.row);
		        
		        var keywords = [];
		        
		        var new_table_obj = {};
			        
				var lineArray = line.split(" ");

		        var lineArrayLength = lineArray.length;
		        if (lineArrayLength > 0){		            
		            
		            if(lineArrayLength > 1){
		                
		                var lastWord = lineArray[lineArrayLength - 2].toLowerCase();

		                if( lastWord == "from"){
		                    keywords = tableArray;    
		                }else if(lastWord == "select"){
		                    keywords = colsArray;                    
		                }               
		                

		                keywords = keywords.filter(function(w) {
		                    return w.lastIndexOf(prefix, 0) == 0;
		                });

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