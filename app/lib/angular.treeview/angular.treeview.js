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

	app.directive( 'treeNode', function(){

		return {
			restrict: 'A',
			replace: true,
			scope: {
				node: '=',
				iconClick: '&'
			},
			templateUrl: 'lib/angular.treeview/tree-node.html'
		};

	});

	app.directive( 'treeNodeProps', function(){

		return {
			restrict: 'A',
			replace: true,
			scope: {
				node: '=',
				toggle: '&'
			},
			templateUrl: 'lib/angular.treeview/tree-node-props.html'
		};

	})

	app.directive( 'treeModel', function( $compile ) {
		return {
			restrict: 'A',

			link: function ( scope, element, attrs ) {
				//tree model
				var treeModel = attrs.treeModel;

				//node id
				var nodeId = attrs.nodeId || 'id';

				//node label
				var nodeLabel = attrs.nodeLabel || 'label';

				//children
				var nodeChildren = attrs.nodeChildren || 'children';

				var nodeAttrs = attrs.nodeAttrs || 'vqls';

				var treeFilter = attrs.nodeFilter || 'treeFilter';

				var template = 
				'<ul class="unstyled">' + 
					'<li data-ng-repeat="node in ' + treeModel + ' | filter:' + treeFilter + '" class="tree-node">' + 
						'<div tree-node node="node" icon-click="selectNodeHead(node)"></div>'+
						'<div tree-node-props node="node" toggle="showNodeProperties(node)" tree-node-props></div>' +
						'<div data-ng-hide="node.collapsed" data-tree-model="node.' + nodeChildren + '" data-node-id=' + nodeId + ' data-node-label=' + nodeLabel + ' data-node-children=' + nodeChildren + '></div>' + 
					'</li>' + 
				'</ul>';
				
				//check tree model
				if( treeModel && treeModel.length ) {

					//root node
					if( attrs.angularTreeview ) {

						//if node head clicks,
						scope.selectNodeHead = function( selectedNode ){

							//Collapse or Expand
							selectedNode.collapsed = !selectedNode.collapsed;
						};

						scope.showNodeProperties = function( _node ) {
							_node.showAttrs = !_node.showAttrs;
						}
					}
					//Rendering template created.
					element.html(null).append( $compile( template )( scope ) );
				}
			}
		};
	});
})( angular );