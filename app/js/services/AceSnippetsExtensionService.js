vStudio.services.service('AceSnippetsExtensionService', function($http,$q, AutoCompleteService) {

		var data = {};			
		var promise;

		// Add object properties like this
		this.editor = null;

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
                        if(snippets != null){
                            $.each( snippets, function( key, value ) {
                                newSnippetText += value;
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
		
	}
);