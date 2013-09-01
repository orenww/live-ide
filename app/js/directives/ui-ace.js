'use strict';

/* Directives */
vStudio.directives
	.directive('uiAce', function(){
		return {
			restrict: 'EA',
			// require: '?ngModel',
			template: '<div id="editor" data-dummy-action=""></div>',
			replace: true,
			scope: {
				change: '=',
				code: '=',
				uiAceOptions: '=',
				extension: '='
			},

			link: function(scope, element, attrs ) {

				if(scope.contentAttr == null){
					scope.contentAttr = attrs.contentAttr || 'vql';	
				}
				
				// trigger extension
				var eee = ace.require("ace/ext/language_tools");
				var editor = ace.edit("editor");
				//editor.session.setMode("ace/mode/sql");
				//editor.setTheme("ace/theme/tomorrow");

				// enable autocompletion and snippets
				editor.setOptions({
						enableBasicAutocompletion: true,
						enableSnippets: true
				});

				var options = angular.extend({}, scope.uiAceOptions());

				var acee = editor;
				var session = acee.getSession();

				var onChange = function (e) {
					var newValue = session.getValue();
					// Call the user onChange function.
					if(angular.isDefined(scope.change)){
						scope.change(e, acee);
					}

					var aaa = editor.selection.getCursor();
				};

				// Boolean options
				if (angular.isDefined(options.showGutter)) {
					acee.renderer.setShowGutter(options.showGutter);
				}
				if (angular.isDefined(options.useWrapMode)) {
					session.setUseWrapMode(options.useWrapMode);
				}        
				// Basic options
				if (angular.isString(options.theme)) {
					acee.setTheme("ace/theme/" + options.theme);
				}
				if (angular.isString(options.mode)) {
					session.setMode("ace/mode/" + options.mode);
				}
				if (angular.isString(options.fontSize)){
					acee.setFontSize(options.fontSize);
				}
				// plugins
				if (angular.isDefined(attrs.extension)) {
					scope.extension().setEditor(editor);
				}

				// SET CONTENT
				scope.getEditor = function() {
					return acee;
				}
				scope.hasChanged = function(code) {
					return scope.getEditor().getValue() !== code;
				}

				editor.commands.addCommand({
				    name: 'myCommand',
				    bindKey: {win: 'Ctrl-M',  mac: 'Command-M'},
				    exec: function(editor) {
				        //...
				        console.log("addCommand");
				    },
				    readOnly: true // false if this command should not apply in readOnly mode
				});

				// EVENTS
				editor.on('change', onChange);

				editor.onCursorChange()

				editor.getSession().selection.on('changeCursor', function(e) {
					// console.log("bbb");
					var bbb;
				});

				editor.getSession().selection.on('changeSelection', function(e) {
					// console.log("ccc");
					var ccc;
				});
				// session.selection.on('changeCursor', function(e) {
				// 	debugger;
				// });

				session.on('changeCursor', function(e) {
					
				});
			},

			controller: function ($scope) {
				$scope.$watch('code', function (newCode, oldCode) {
						// console.log('newCode', newCode)
						if (newCode && newCode.vqls.dataSelection) {

							if ($scope.hasChanged(newCode.vqls.dataSelection)) {
								var newCodeToInsert = newCode.attrSelected && angular.isDefined(newCode.attrSelected) ? 
									newCode.vqls[newCode.attrSelected] :
									newCode.vqls.dataSelection;

								$scope.getEditor().setValue(newCodeToInsert);
							}
						}
				}, true);
			}
		}
	});
