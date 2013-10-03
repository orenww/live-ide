vStudio.services.service('AceSnippetsExtensionService', function($http,$q, AutoCompleteService) {

		var data = {};			
		var promise;

		// Add object properties like this
		this.editor = null;

		this.editorSnippets = null;

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

		
		this.loadSnippets = function() {
			var snippetManager = ace.require("ace/snippets").snippetManager;

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
                            $.each( snippets, function( key, value ) {
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

		var getAutoCompleteData = function(){
            return AutoCompleteService.getData();            
		}


		//this.loadSnippets();
		
	}
);