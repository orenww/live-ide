/*
	@license Angular Treeview version 0.1.4
	ⓒ 2013 AHN JAE-HA http://github.com/eu81273/angular.treeview
	License: MIT


	[TREE attribute]
	angular-treeview: the treeview directive
	tree-model : the tree model on $scope.
	node-id : each node's id
	node-label : each node's label
	node-children: each node's children

	<div
		data-angular-treeview="true"
		data-tree-model="roleList"
		data-node-id="roleId"
		data-node-label="roleName"
		data-node-children="children" >
	</div>

	API:
	====
	to select a node, set the "currentNode" property of the "attrs.treeModel" to
	reference the node, i.e (in a controller):
	$scope.currentNode = myTreeModel.getById("node-uniq-123124");
*/

(function ( angular ) {
	'use strict';

	var app = angular.module( 'angularTreeview', [] );

	app.directive( 'treenode', function(){

		return {
			restrict: 'EA',
			replace: true,
			scope: {
				node: '=',
				nodeSelected: '=',
				onIconClick: '&',
				toggle: '&',
				level: '=',
				showAttrs: '='
			},
			templateUrl: 'lib/angular.treeview/tree-node.html',
			link: function (scope, element, attrs) {
				scope.selected = {};
				// evaluate this only when nodeSelected has been set
				if (scope.nodeSelected.node && scope.nodeSelected.node.id) {
					if (scope.nodeSelected.node.id == scope.node.id) {
						scope.selected = "selected";
					}
				}
				if (scope.nodeSelected && scope.nodeSelected.isAttr) {
					scope.showAttrs.expand = true;
					scope.attrKey = scope.nodeSelected.attrKey;
				}
			}
		};

	});

	app.directive( 'treenodeprops', function(){

		return {
			restrict: 'EA',
			replace: true,
			scope: {
				node: '=',
				nodeSelected: '=',
				level: '=',
				toggle: '&',
				showAttrs: '='
			},
			templateUrl: 'lib/angular.treeview/tree-node-props.html',
			link: function (scope, element, attrs) {
				// var attrSelected = scope.node.attrSelected;
				// if (attrSelected) {
				// 	scope.node.showAttrs = true;
				// }
				if (scope.nodeSelected && scope.nodeSelected.isAttr) {
					scope.showAttrs.expand = true;
					scope.attrKey = scope.nodeSelected.attrKey;
				}
			}
		}

	});

	app.directive( 'uiTree', function( $compile ) {
		return {
			restrict: 'A',
			
			link: function ( scope, element, attrs ) {
				//tree model
				var treeModel = attrs.ngModel;
				
				//node id
				var nodeId = attrs.nodeId || 'id';

				//node label
				var nodeLabel = attrs.nodeLabel || 'label';

				//children
				var nodeChildren = attrs.nodeChildren || 'children';

				var nodeAttrs = attrs.nodeAttrs || 'vqls';

				var treeFilter = attrs.nodeFilter || 'treeFilter';

				var nodeSelected = attrs.nodeSelected;

				// flags that control ui-actions for toggling ui-visibility states
				scope.showAttrs = {
					expand: false,
					folderCollapsed: false
				};

				// level is used for indenting childnodes and keeping the selected style full left-to-right
				var level;
				if (!attrs.level) {
					level = 0;
				}
				if (attrs.level) {
					level = parseInt(attrs.level) + 1;
				}

				/*
				 *	the template for the tree is build with dom nodes 
				 * for maintainable code 
				 *'<ul class="unstyled">' + 
				 *	'<li data-ng-repeat="node in ' + treeModel + ' | filter:' + treeFilter + '" class="tree-node">' + 
				 *		'<div tree-node node="node" toggle="showNodeProperties(node)" icon-click="selectNodeHead(node)" level="' + level + '"></div>'+
				 *		'<div tree-node-props node="node" level="' + level + '" toggle="showNodeProperties(node)"></div>' +
				 *		'<div data-ng-hide="node.collapsed" level="' + level + '" data-tree-model="node.' + nodeChildren + '" data-node-id=' + nodeId + ' data-node-label=' + nodeLabel + ' data-node-children=' + nodeChildren + '></div>' + 
				 *	'</li>' + 
				 *'</ul>';
				 */
				var ul = angular.element('<ul></ul>');
				ul.attr('class', 'unstyled');
				var li = angular.element('<li></li');
				li.attr({
					'ng-repeat': 'node in ' + treeModel + '|filter:' + treeFilter,
					'class': 'tree-node'
				});
				// placeholder for li children
				// to remove a child, simply comment its code: 
				// the angular.element, its 'attr' definition and the push operation
				var liChilds = [];
				
				var treeNodeEl = angular.element('<treenode></treenode>');
				treeNodeEl.attr({
					'node': 'node',
					'node-selected': nodeSelected,
					'toggle': 'showNodeProperties(showAttrs)',
					'on-icon-click': 'selectNodeHead(showAttrs)',
					'level': level,
					'show-attrs': 'showAttrs'
				});
				liChilds.push(treeNodeEl);
				
				var treeNodePropsEl = angular.element('<treenodeprops></treenodeprops>');
				treeNodePropsEl.attr({
					'node': 'node',
					'node-selected': nodeSelected,
					'toggle': 'showNodeProperties(showAttrs)',
					'level': level,
					'show-attrs': 'showAttrs'
				});
				liChilds.push(treeNodePropsEl);
				
				var childNodes = angular.element('<div></div>');
				childNodes.attr({
					'ng-hide': 'showAttrs.folderCollapsed',
					'level': level,
					'ui-tree': '',
					'ng-model': 'node.' + nodeChildren,
					'node-selected': nodeSelected,
					'node-id': nodeId,
					'node-label': nodeLabel,
					'node-children': nodeChildren
				});
				liChilds.push(childNodes);

				// build the whoel template for this directive
				ul.append( li.append(liChilds) );

				//check tree model
				if( treeModel && treeModel.length ) {

					//root node
					if( attrs.angularTreeview ) {

						//if node head clicks,
						scope.selectNodeHead = function( showAttrs ){

							//Collapse or Expand
							showAttrs.folderCollapsed = !showAttrs.folderCollapsed;
						};

						scope.showNodeProperties = function( showAttrs ) {
							showAttrs.expand = !showAttrs.expand;
						};
					}

					// Rendering template created.
					element.html(null).append( $compile( ul )( scope ) );
				}
			}
		};
	});
})( angular );