vStudio.services.service('AceExtention', function() {
		// Add object properties like this
		this.editor = null;

		this.setEditor = function (editor) {
			if (!this.editor) {
				this.editor = editor;
			}
		}

		this.getEditor = function () {
			return this.editor;
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

	}
);