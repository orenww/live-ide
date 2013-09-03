vStudio.services.service('AceExtentionService', function($http,$q, AutoCompleteService) {

		var data = {};			
		var promise;

		// Add object properties like this
		this.editor = null;
		this.langToolExt = null;

		var colsArray =	[];
	    var tableArray = [];

		//editor
		this.setEditor = function (editor) {
			if (!this.editor) {
				this.editor = editor;
			}
		}

		this.getEditor = function () {
			return this.editor;
		}

		//langToolExt
		this.setLangToolExt = function (langToolExt) {
			if (!this.langToolExt) {
				this.langToolExt = langToolExt;
			}
		}

		this.getLangToolExt = function () {
			return this.langToolExt;
		}
		
		this.loadSnippets = function() {
			var snippetManager = ace.require("ace/snippets").snippetManager;

			var mode = this.editor.session.$mode;
			var id = mode.$id
			if (id) {
				var m = snippetManager.files[id];
				var newSnippetText = "";
				var currentSnippetText = m.snippetText;

				getAutoCompleteData()
					.then(function(){
						var snippets = AutoCompleteService.getInteliData().snippets;
						$.each( snippets, function( key, value ) {
			                newSnippetText += value;
			            });
			        })
			        .then(function(){

						newSnippetText = currentSnippetText + newSnippetText;

						m.snippetText = newSnippetText;
						snippetManager.unregister(m.snippets);
						m.snippets = snippetManager.parseSnippetFile(m.snippetText);
						snippetManager.register(m.snippets);
					});
			}			
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
			                
			            tableArray.push(key);

		               tmpObj = value;

		                $.each( tmpObj.cols, function( key, value ) {
		                    colsArray.push(value);
		                });
	            	});
		        });
			}

		var verixKeyWordCompleter = {			

			getCompletions: function(editor, session, pos, prefix, callback) {
				var line = editor.getSession().getLine(pos.row);
		        //var tableColsMap = {};
		        //var colsArray = [];
		        //var tableArray = [];        
		        var keywords = [];
		        
		        var new_table_obj = {};
			        
				var lineArray = line.split(" ");

		        var lineArrayLength = lineArray.length;
		        if (lineArrayLength > 0){
		            // return w.lastIndexOf(prefix, 0) == 0;
		            
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

		this.loadKeywords = function(){
			getIntellisnseData();

			this.langToolExt.addCompleter(verixKeyWordCompleter);			
		}
	}
);