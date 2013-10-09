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
				changedNodes: '=',
				onIconClick: '&',
				onNodeSelected: '&',
				toggle: '&',
				level: '=',
				uiAttrs: '='
			},
			templateUrl: 'lib/angular.treeview/tree-node.html',
			link: function (scope, element, attrs) {
				scope.selected = '';
				scope.changed = '';

				scope.hasChildren = function() {
					return scope.node.children && scope.node.children.length;
				};
				scope.isFolderCollapsed = function (uiAttrs) {
					return scope.hasChildren() && !uiAttrs.expandFolder;
				};

				scope.isFolderExpanded = function (uiAttrs) {
					return scope.hasChildren() && uiAttrs.expandFolder;
				};
				
				scope.onNodeSelection = function (node) {
					scope.onNodeSelected({
						node: node,
						key: false
					});
				};

				if (scope.nodeSelected && scope.nodeSelected.isAttr) {
					var isNodeSelected = scope.nodeSelected.node.id == scope.node.id;
					if (isNodeSelected) {
						scope.uiAttrs.expandProps = true;
						scope.attrKey = scope.nodeSelected.attrKey;
					}
				}

				scope.$watch( 'nodeSelected', function (newSelectedNode, oldVal) {
					if (newSelectedNode.node.id === scope.node.id) {
						scope.selected = 'selected';
					} else {
						scope.selected = '';
					}
				}, true);

				scope.$watch( 'changedNodes', function (newVal, oldVal) {
					if (newVal[scope.node.id] && newVal[scope.node.id].changed) {
						scope.changed = 'changed';
					} else {
						scope.changed = '';
					}
				}, true);
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
				onNodeSelected: '&',
				level: '=',
				toggle: '&',
				uiAttrs: '='
			},
			templateUrl: 'lib/angular.treeview/tree-node-props.html',
			link: function (scope, element, attrs) {
				if (scope.nodeSelected && scope.nodeSelected.isAttr) {
					var isNodeSelected = scope.nodeSelected.node.id == scope.node.id;
					if (isNodeSelected) {
						scope.uiAttrs.expandProps = true;
						scope.attrKey = scope.nodeSelected.attrKey;
					}
				}
				scope.selected = '';

				scope.isSelected = function (key) {
					// var selected = '';
					var isNodeSelected = scope.nodeSelected.node.id == scope.node.id;
					var isCurrentKey = scope.nodeSelected.attrKey === key;
					if (isNodeSelected && isCurrentKey) {
						scope.selected = 'selected';
					} else {
						scope.selected = '';
					}
					return scope.selected;
				}
				
				scope.onNodeSelection = function (node, key) {
					scope.onNodeSelected({
						node: scope.node,
						key: key
					});
				};

				scope.$watch( 'nodeSelected', function (newSelectedNode, oldVal) {
					if (newSelectedNode.node.id === scope.node.id) {
						scope.selected = 'selected';
					} else {
						scope.selected = '';
					}
				}, true);
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
				var changedNodes = attrs.changedNodes;

				var onNodeSelectedCallback = attrs.onNodeSelect || null;

				// flags that control ui-actions for toggling ui-visibility states
				scope.uiAttrs = {
					expandProps: false,
					expandFolder: true,
					toggled: false
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
				 *		'<div tree-node node="node" toggle="showNodeProperties(node)" icon-click="showNodeChildren(node)" level="' + level + '"></div>'+
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
					'changed-nodes': changedNodes,
					'toggle': 'showNodeProperties(uiAttrs)',
					'on-icon-click': 'showNodeChildren(uiAttrs)',
					'on-node-selected': 'callOnNodeSelected(node, "")',
					'level': level,
					'ui-attrs': 'uiAttrs'
				});
				liChilds.push(treeNodeEl);
				
				var treeNodePropsEl = angular.element('<treenodeprops></treenodeprops>');
				treeNodePropsEl.attr({
					'node': 'node',
					'node-selected': nodeSelected,
					'on-node-selected': 'callOnNodeSelected(node, key)',
					'toggle': 'showNodeProperties(uiAttrs)',
					'level': level,
					'ui-attrs': 'uiAttrs'
				});
				liChilds.push(treeNodePropsEl);
				
				var childNodes = angular.element('<div></div>');
				childNodes.attr({
					// 'ng-hide': '!uiAttrs.expandFolder',
					'level': level,
					'ui-tree': '',
					'ng-model': 'node.' + nodeChildren,
					'node-selected': nodeSelected,
					'changed-nodes': changedNodes,
					'node-id': nodeId,
					'node-label': nodeLabel,
					'node-children': nodeChildren
				});
				liChilds.push(childNodes);

				// animation for toggling nodes
				scope.$watch('uiAttrs', function (newval,oldval) {
					if (newval.toggled != oldval.toggled) {
						element.slideToggle(200);
					}
				}, true)

				// build the whoel template for this directive
				ul.append( li.append(liChilds) );

				//check tree model
				if( treeModel && treeModel.length ) {

					//root node
					if( attrs.angularTreeview ) {

						//if node head clicks,
						scope.showNodeChildren = function( uiAttrs ){
							uiAttrs.toggled = !uiAttrs.toggled;
							//Collapse or expandProps
							uiAttrs.expandFolder = !uiAttrs.expandFolder;
						};

						scope.showNodeProperties = function( uiAttrs ) {
							uiAttrs.expandProps = !uiAttrs.expandProps;
						};

						scope.callOnNodeSelected = function (node, key) {
							scope[onNodeSelectedCallback].call(scope, node, key);
						}
					}

					// Rendering template created.
					element.html(null).append( $compile( ul )( scope ) );
				}
			}
		};
	});
})( angular );