vStudio.services.service('AceExtention', function() {
		// Add object properties like this
		this.editor = null;
		this.langToolExt = null;

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

		// Add methods like this.  All Person objects will be able to invoke this
		this.loadSnippets = function() {
			var snippetManager = ace.require("ace/snippets").snippetManager;

			var mode = this.editor.session.$mode;
			var id = mode.$id
			if (id) {
				var m = snippetManager.files[id];

				var current = m.snippetText;
				m.snippetText = this.editor.getValue() + current;
				snippetManager.unregister(m.snippets);
				m.snippets = snippetManager.parseSnippetFile(m.snippetText);
				snippetManager.register(m.snippets);
			}
		}

		var verixKeyWordCompleter = {
			getCompletions: function(editor, session, pos, prefix, line, callback) {
		        var tableColsMap = {};
		        var colsArray = [];
		        var tableArray = [];        

		        
		        var new_table_obj = {};
		        if(typeof(Storage)!=="undefined"){         
		            
		            tableColsMap = sessionStorage.getObject('tables');

		            var tmpObj = {};
		            
		            $.each( tableColsMap, function( key, value ) {
		                
		                tableArray.push(key);

		                tmpObj = value;

		                $.each( tmpObj.cols, function( key, value ) {
		                    colsArray.push(value);
		                });

		            });
		        }
		        
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
			this.langToolExt.addCompleter(verixKeyWordCompleter);
		}
	}
);