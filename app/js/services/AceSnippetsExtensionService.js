vStudio.services.service('AceSnippetsExtensionService', function($http,$q, AutoCompleteService) {

		var data = {};			
		var promise;

		// Add object properties like this
		this.editor = null;

		this.editorSnippets = null;

		this.snippetManager = null;

		//editor
		this.register = function(options) {
			this.setEditor(options.editor);
		};

		this.setEditor = function (editor) {
			if (!this.editor) {
				this.editor = editor;
			}
		}

		this.getEditor = function () {
			return this.editor;
		}

		this.getEditorSnippets = function () {			
			return this.editorSnippets;
		}
		

		this.getSnippetManagerText = function(){
			if(this.snippetManager){
				
				var snippetManager = this.snippetManager;
				
				var currentSnippetText = "";

				var mode = this.editor.session.$mode;
				var id = this.editor.session.$modeId
				if (id) {
					var m = snippetManager.files[id];
					var newSnippetText = "";

					if(!m){
						return;
					}

					currentSnippetText = m.snippetText;				
				}

				return currentSnippetText;
			}
		}

		this.setSnippetManagerText = function(snippetText){
			var snippetManager = this.snippetManager;

			var mode = this.editor.session.$mode;
			var id = this.editor.session.$modeId
			if (id) {
				var m = snippetManager.files[id];
			
				m.snippetText = snippetText;
				snippetManager.unregister(m.snippets);
				m.snippets = snippetManager.parseSnippetFile(m.snippetText);
				var a = snippetManager.register(m.snippets);
				console.log(a);
			}
		}


		this.loadSnippets = function() {
			this.snippetManager = ace.require("ace/snippets").snippetManager;
			var snippetManager = this.snippetManager;

			var mode = this.editor.session.$mode;
			var id = this.editor.session.$modeId
			if (id) {
				var m = snippetManager.files[id];
				var newSnippetText = "";

				if(!m){
					return;
				}

				var currentSnippetText = m.snippetText;

				this.editorSnippets = m.snippets;

				getAutoCompleteData()
					.then(function(){
						var snippets = AutoCompleteService.getSnippets();
                        if(snippets != null){
                        
                        	angular.forEach(snippets, function(value, key){
                        		newSnippetText += value.content;
                        	});

                        }
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
		
		this.editSnippet = function(snippetName,snippetDesc,snippetText){

			//1. update snippet manager
            var snippetManager = this.snippetManager;

			var mode = this.editor.session.$mode;
			var id = this.editor.session.$modeId
			if (id) {
				var m = snippetManager.files[id];
				var newSnippetValue = m;

				angular.forEach(m.snippets, function(value, key){
					console.log(value.name);
					if(value.name == snippetName){						
						newSnippetValue.snippets[key].content = snippetText;						
						//break;
					}
				});

				snippetManager.unregister(m.snippets);				
				snippetManager.register(newSnippetValue.snippets);

				console.log("a");
			}

			//2. update the server
			AutoCompleteService.updateSnippets();
		}

		this.deleteSnippet = function(snippetName){
            var snippetManager = this.snippetManager;

			var mode = this.editor.session.$mode;
			var id = this.editor.session.$modeId
			if (id) {
				var m = snippetManager.files[id];
				var newSnippetValue = m;

				angular.forEach(m.snippets, function(value, key){
					console.log(value.name);
					if(value.name == snippetName){												
						newSnippetValue.snippets.splice(key,1);
						//break;
					}
				});

				snippetManager.unregister(m.snippets);				
				snippetManager.register(newSnippetValue.snippets);

				var aaa = snippetManager.files[id];

				console.log("a");
			}

			//2. update the server
			AutoCompleteService.deleteSnippet(snippetName);
		}


		this.addSnippet = function(snippetName,snippetDesc,snippetText){
			
			var snippetManager = this.snippetManager;

			var mode = this.editor.session.$mode;
			var id = this.editor.session.$modeId
			if (id) {
				var m = snippetManager.files[id];
				var newSnippetValue = m;

				var currentSnippetText = m.snippetText;
				var newSnippetText = currentSnippetText + snippetText;

				m.snippetText = newSnippetText;
				snippetManager.unregister(m.snippets);
				m.snippets = snippetManager.parseSnippetFile(m.snippetText);
				snippetManager.register(m.snippets);				
			}

			//2. update the server
			//AutoCompleteService.addSnippet(snippetName,snippetDesc,snippetText);
				
		}


		var getAutoCompleteData = function(){
            return AutoCompleteService.getSnippetsData();            
		}


		//this.loadSnippets();
		
	}
);